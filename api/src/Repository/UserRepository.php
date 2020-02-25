<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Users for pagination
     * 
     * @param int $size
     * @param string $sort
     * @param string $order
     * @param int $offset
     * @param array $filters
     * @return User[]
     */
    public function findUsers(int $size, string $sort, string $order, int $offset, array $filters)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')->from('App:User', 'u');
        
        if (!empty($filters) && $filters['username']) {
            $qb->andWhere('c.username LIKE :username')
                ->setParameter(":username", '%'.$filters['username'].'%');
        }

        if (!empty($sort) && !empty($order)) {
           $qb->orderBy('u.'.$sort, $order);
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
    public function countUsers()
    {
        return $this->createQueryBuilder('u')
            ->select('count(u.id)')
            ->getQuery()
            ->getSingleScalarResult();        
    }
}
