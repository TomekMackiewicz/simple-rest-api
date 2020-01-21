<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations\Route;
use App\Entity\Post;
use App\Form\PostType;
use App\Service\FormErrorService;

/**
 * @Route("/api/v1/admin/post")
 */
class PostController extends AbstractFOSRestController
{
    /**
     * @var App\Repository\PostRepository 
     */
    private $repository;

    /**
     * @var Doctrine\ORM\EntityManagerInterface 
     */
    private $em;
    private $formErrorService;
    
    public function __construct(EntityManagerInterface $entityManager, FormErrorService $formErrorService) 
    {
        $this->em = $entityManager;
        $this->repository = $this->em->getRepository(Post::class);
        $this->formErrorService = $formErrorService;
    }

    /**
     * @Rest\Get("/{id}")
     * @param int $id
     * @return Response
     */
    public function getAction(int $id)
    {
        $post = $this->repository->findOneBy(['id' => $id]);

        if (!$post) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        return $this->handleView(
            $this->view($post, Response::HTTP_OK)
        );
    }

    /**
     * @Rest\Get("")
     * @param Request
     * @return Response
     */
    public function cgetAction(Request $request)
    {
        $page = (int) $request->query->get('page');
        $size = (int) $request->query->get('size');
        $sort = $request->query->get('sort');
        $order = $request->query->get('order');
        $offset = (int) ($page-1) * $size;
        $filters = json_decode($request->query->get('filters'), true);
        $posts = $this->repository->findPosts($size, $sort, $order, $offset, $filters);
 
        if (!$posts) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        $response['posts'] = $posts;
        $response['count'] = $this->repository->countPosts();

        return $this->handleView(
            $this->view($response, Response::HTTP_OK)
        );
    }

    /**
     * @Rest\Post("")
     * @param Request $request
     * @return Response
     */
    public function postAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $author = $this->getUser();
        $data = $request->request->all();      
        $post = new Post();
        $categories = isset($data['categories']) ? $data['categories'] : null;
        $form = $this->createForm(PostType::class, $post, ['categories' => $categories]);
        $form->submit($data);
 
        if ($form->isSubmitted() && $form->isValid()) {
            $post->setAuthor($author);
            $post->setDateCreated(new \DateTime());
            $this->em->persist($post);
            $this->em->flush();

            return $this->handleView(
                $this->view('post.added', Response::HTTP_CREATED)
            );
        }
        $errors = $this->formErrorService->prepareErrors($form->getErrors(true));

        return $this->handleView(
            $this->view($errors, Response::HTTP_BAD_REQUEST)
        );
    }

    /**
     * @Rest\Patch("/{id}")
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function patchAction(Request $request, int $id)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $author = $this->getUser();
        $data = $request->request->all();        
        $post = $this->repository->find($id);
        $categories = isset($data['categories']) ? $data['categories'] : null;

        if (!$post) {
            return $this->handleView($this->view(null, Response::HTTP_NO_CONTENT));
        }

        $form = $this->createForm(PostType::class, $post, ['categories' => $categories]);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $post->setAuthor($author);
            $post->setDateEdited(new \DateTime());
            $this->em->persist($post);
            $this->em->flush();

            return $this->handleView($this->view('post.edited', Response::HTTP_OK));
        }
        $errors = $this->formErrorService->prepareErrors($form->getErrors(true));

        return $this->handleView(
            $this->view($errors, Response::HTTP_BAD_REQUEST)
        );
    }

    /**
     * @Rest\Delete("")
     * @param Request $request
     * @return Response
     */
    public function deleteAction(Request $request)
    {
        $posts = $this->repository->findPostsByIds($request->request->all());
        if (!$posts) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }
        foreach ($posts as $post) {
            $this->em->remove($post);
            $this->em->flush();
        }

        return $this->handleView(
            $this->view('posts.deleted', Response::HTTP_OK)
        );
    }
}
