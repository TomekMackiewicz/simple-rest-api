<?php

declare(strict_types=1);

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Setting;

class SettingService
{
    /**
     * @var App\Repository\SettingRepository 
     */
    private $repository;

    public function __construct(EntityManagerInterface $entityManager) 
    {
        $this->em = $entityManager;
        $this->repository = $this->em->getRepository(Setting::class);
    }

    public function getSettings()
    {
        return $this->repository->findSettings();
    }
}