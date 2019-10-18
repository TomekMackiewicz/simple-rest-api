<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\EducationStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EducationStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EducationStatus::class);
    }

    /**
     * EducationStatuses for pagination
     * 
     * @param int $size
     * @param string $sort
     * @param string $order
     * @param int $offset
     * @param array $filters
     * @return EducationStatus[]
     */
    public function findEducationStatuses(int $size, string $sort, string $order, int $offset, array $filters)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('e')->from('App:EducationStatus', 'e');
        
        if (!empty($filters) && $filters['label']) {
            $qb->andWhere('e.label LIKE :label')
                ->setParameter(":label", '%'.$filters['label'].'%');
        }
        if (!empty($sort) && !empty($order)) {
           $qb->orderBy('e.'.$sort, $order);
        }
        if (!empty($size)) {
           $qb->setMaxResults($size); 
        }
        if (!empty($offset)) {
           $qb->setFirstResult($offset);
        }            
        
        return $qb->getQuery()->getResult();
    }
    
    /**
     * @return integer
     */
    public function countEducationStatuses()
    {
        return $this->createQueryBuilder('e')
            ->select('count(e.id)')
            ->getQuery()
            ->getSingleScalarResult();        
    }    
    /**
     * Find EducationStatuses with given id's
     * @param array $ids
     * @return array
     */
    public function findEducationStatusesByIds(array $ids)
    {
        return $this->createQueryBuilder('e')
            ->where("e.id IN(:ids)")
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();        
    }
}