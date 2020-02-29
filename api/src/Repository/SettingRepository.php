<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Setting;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class SettingRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Setting::class);
    }

    /**
     * Get all settings
     * 
     * @return Setting[]
     */
    public function findSettings()
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('s')->from('App:Setting', 's');
        $data = $qb->getQuery()->getResult();
        
        return $this->prepareSettings($data);
    }
    
    /**
     * Transform to assoc array
     * 
     * @param array $data
     * @return array
     */
    private function prepareSettings($data)
    {
        $result = [];
        foreach ($data as $element) {
            $key = $element->getName();
            $result[$key] = $element;
        }
        
        return $result;
    }

}