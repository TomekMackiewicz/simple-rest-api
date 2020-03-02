<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations\Route;
use App\Entity\Setting;
use App\Form\SettingType;
use App\Service\FormErrorService;

/**
 * @Route("/api/v1/admin/setting")
 */
class SettingController extends AbstractFOSRestController
{
    /**
     * @var App\Repository\SettingRepository 
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
        $this->repository = $this->em->getRepository(Setting::class);
        $this->formErrorService = $formErrorService;
    }

    /**
     * @Rest\Get("/{name}")
     * @param string $name
     * @return Response
     */
    public function getAction(string $name)
    {        
        $setting = $this->repository->findOneBy(['name' => $name]);

        if (!$setting) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        return $this->handleView(
            $this->view($setting, Response::HTTP_OK)
        );
    }

    /**
     * @Rest\Get("")
     * @param Request
     * @return Response
     */
    public function cgetAction(Request $request)
    {        
        $settings = $this->repository->findSettings();

        if (!$settings) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        return $this->handleView(
            $this->view($settings, Response::HTTP_OK)
        );
    }

    /**
     * @Rest\Patch("/{name}")
     * @param Request $request
     * @param string $name
     * @return Response
     */
    public function patchAction(Request $request, string $name)
    {
        $data = $request->request->all();        
        $setting = $this->repository->findOneBy(['name' => $name]);

        if (!$setting) {
            return $this->handleView(
                $this->view(null, Response::HTTP_NO_CONTENT)
            );
        }

        $form = $this->createForm(SettingType::class, $setting);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->em->persist($setting);
            $this->em->flush();

            return $this->handleView(
                $this->view('setting.edited', Response::HTTP_OK)
            );
        }
        $errors = $this->formErrorService->prepareErrors($form->getErrors(true));
        
        return $this->handleView(
            $this->view($errors, Response::HTTP_BAD_REQUEST)
        );
    }

}