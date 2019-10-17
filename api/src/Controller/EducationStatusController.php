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
use FOS\RestBundle\View\View;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
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
}