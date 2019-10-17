<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations\Route;
use App\Entity\EducationStatus;
use App\Form\EducationStatusType;

/**
 * @Route("/api/v1/education-status")
 */
class EducationStatusController extends AbstractFOSRestController
{
    /**
     * @var App\Repository\EducationStatusRepository 
     */
    private $repository;
    /**
     *
     * @var Doctrine\ORM\EntityManagerInterface 
     */
    private $em;
    
    public function __construct(EntityManagerInterface $entityManager) 
    {
        $this->em = $entityManager;
        $this->repository = $this->em->getRepository(EducationStatus::class);
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

        return $this->handleView(
            $this->view($user, Response::HTTP_OK)
        );
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

        return $this->handleView(
            $this->view($users, Response::HTTP_OK)
        );
    }

    /**
     * @Rest\Post("")
     * @param Request $request
     * @return Response
     */
    public function postAction(Request $request)
    {
        $educationStatus = new EducationStatus();
        $form = $this->createForm(EducationStatusType::class, $educationStatus);
        $form->submit($request->request->all());
        if ($form->isSubmitted() && $form->isValid()) {
            $this->em->persist($educationStatus);
            $this->em->flush();

            return $this->handleView(
                $this->view('educationStatus.added', Response::HTTP_CREATED)
            );
        }

        return $this->handleView(
            $this->view($form->getErrors(true), Response::HTTP_BAD_REQUEST)
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
        $data = $request->request->all();        
        $educationStatus = $this->repository->find($id);
        if (!$educationStatus) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }
        $form = $this->createForm(EducationStatusType::class, $educationStatus);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->em->persist($educationStatus);
            $this->em->flush();

            return $this->handleView(
                $this->view('education-status.edited', Response::HTTP_OK)
            );
        }

        return $this->handleView(
            $this->view($form->getErrors(true), Response::HTTP_BAD_REQUEST)
        );
    }

    /**
     * @Rest\Delete("")
     * @param Request $request
     * @return Response
     */
    public function deleteAction(Request $request)
    {
        $educationStatuses = $this->repository->findEducationStatusesByIds($request->request->all());
        if (!$educationStatuses) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }
        foreach ($educationStatuses as $educationStatus) {
            $this->em->remove($educationStatus);
            $this->em->flush();
        }

        return $this->handleView(
            $this->view('categories.deleted', Response::HTTP_OK)
        );
    }
}