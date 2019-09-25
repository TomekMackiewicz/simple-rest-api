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
use App\Entity\User;
//use App\Form\UserType;

/**
 * @Route("/api/v1/users")
 */
class UserController extends AbstractFOSRestController
{
    private $formFactory;
    private $userManager;
    private $dispatcher;
    /**
     * @var App\Repository\UserRepository 
     */
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
     * Register new user.
     * 
     * @Route("", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function registerAction(Request $request)
    {         
        $user = $this->userManager->createUser();
        $user->setEnabled(true);
        $event = new GetResponseUserEvent($user, $request);
        $this->dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);
        if (null !== $event->getResponse()) {            
            return $event->getResponse();
        }
        $form = $this->formFactory->createForm([
            'csrf_protection' => false
        ]);
        $form->setData($user);         
        $form->submit($request->request->all());
        
        if (!$form->isValid()) {
            $event = new FormEvent($form, $request);
            $this->dispatcher->dispatch(FOSUserEvents::REGISTRATION_FAILURE, $event);
                        
            return new View($form->getErrors(true), Response::HTTP_BAD_REQUEST);
        }
        $event = new FormEvent($form, $request);
        $this->dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);
        if ($event->getResponse()) {             
            return $event->getResponse();
        }
        $this->userManager->updateUser($user);
        $response = new JsonResponse([
            'msg' => 'user.register.success',
            'token' => $this->get('lexik_jwt_authentication.jwt_manager')
                ->create($user),
        ], JsonResponse::HTTP_CREATED, [
                'Location' => $this->generateUrl(
                    'app_profile_get',
                    [ 'user' => $user->getId() ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                )
            ]
        );
        $this->dispatcher->dispatch(
            FOSUserEvents::REGISTRATION_COMPLETED,
            new FilterUserResponseEvent($user, $request, $response)
        );
        return $response;
    }
}