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
use App\Form\UserUpdateType;
use App\Service\FormErrorService;
use App\Service\SettingService;

/**
 * @Route("/api/v1/users")
 */
class UserController extends AbstractFOSRestController
{
    private $formFactory;
    private $userManager;
    private $dispatcher;
    private $repository;
    private $formErrorService;
    private $settingService;
    
    public function __construct(
        FormFactory $formFactory, 
        UserManagerInterface $userManager, 
        EventDispatcherInterface $dispatcher, 
        EntityManagerInterface $entityManager,
        FormErrorService $formErrorService,
        SettingService $settingService   
    ) {
        $this->formFactory = $formFactory;
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->repository = $entityManager->getRepository(User::class);
        $this->formErrorService = $formErrorService;
        $this->settingService = $settingService;
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
        $users = $this->repository->findUsers($size, $sort, $order, $offset, $filters);
 
        if (!$users) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        $response['users'] = $users;
        $response['count'] = $this->repository->countUsers();

        return $this->handleView(
            $this->view($response, Response::HTTP_OK)
        );
    }

    /**
     * Register new user.
     * 
     * @Route("/register", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function registerAction(Request $request) // TODO: post action!
    {         
        $settings = $this->settingService->getSettings();
        $user = $this->userManager->createUser();
        $user->setEnabled($settings['user_start_active']->getValue());
        $form = $this->formFactory->createForm(['csrf_protection' => false]); // TODO: user type
        $form->setData($user);
        $form->submit($request->request->all());
        
        if (!$form->isValid()) {
            $errors = $this->formErrorService->prepareErrors($form->getErrors(true));

            return $this->handleView(
                $this->view($errors, Response::HTTP_BAD_REQUEST)
            );
        }

        $this->userManager->updateUser($user);

        return $this->handleView(
            $this->view('user.registered', Response::HTTP_CREATED)
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
        $user = $this->repository->find($id);
        if (!$user) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        $form = $this->createForm(UserUpdateType::class, $user);
        $form->submit($data, false);

        if (!$form->isValid()) {
            $errors = $this->formErrorService->prepareErrors($form->getErrors(true));

            return $this->handleView(
                $this->view($errors, Response::HTTP_BAD_REQUEST)
            );
        }

        $this->userManager->updateUser($user);

        return $this->handleView(
            $this->view('user.updated', Response::HTTP_CREATED)
        );
    }

    /**
     * @Rest\Delete("")
     * @param Request $request
     * @return Response
     */
    public function deleteAction(Request $request)
    {
        $users = $this->repository->findUsersByIds($request->request->all());
        if (!$users) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        foreach ($users as $user) {
            $this->userManager->deleteUser($user);
        }

        return $this->handleView(
            $this->view('users.deleted', Response::HTTP_OK)
        );
    }
}