<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\UserBundle\Form\Factory\FormFactory;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\User;

/**
 * @Route("/api/v1/users")
 */
class UserController extends AbstractFOSRestController
{
    private $formFactory;
    private $userManager;
    private $dispatcher;
    private $repository;
    
    public function __construct(
        FormFactory $formFactory, 
        UserManagerInterface $userManager, 
        EventDispatcherInterface $dispatcher, 
        EntityManagerInterface $entityManager
    ) {
        $this->formFactory = $formFactory;
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->repository = $entityManager->getRepository(User::class);
    }

    /**
     * @Rest\Get("/{id}")
     * @param int $id
     * @return Response
     */
    public function getAction(int $id)
    {
        $user = $this->repository->findOneBy(['id' => $id]);
        if (!$user) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        return $this->handleView($this->view($user, Response::HTTP_OK));
    }

    /**
     * @Rest\Get("")
     * @return Response
     */
    public function cgetAction()
    {
        $users = $this->repository->findAll();
        if (!$users) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        return $this->handleView($this->view($users, Response::HTTP_OK));
    }

    /**
     * Register new user.
     * 
     * @Route("/register", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function registerAction(Request $request)
    {         
        $user = $this->userManager->createUser();
        $user->setEnabled(true);
        $form = $this->formFactory->createForm(['csrf_protection' => false]);
        $form->setData($user);
        $form->submit($request->request->all());
        
        if (!$form->isValid()) {
            return $this->handleView(
                $this->view($form->getErrors(true), Response::HTTP_BAD_REQUEST)
            );
        }

        $this->userManager->updateUser($user);

        return $this->handleView(
            $this->view('user.registered', Response::HTTP_CREATED)
        );
    }
}