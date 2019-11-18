<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Category::class);
    }

    /**
     * Categories for pagination
     * 
     * @param int $size
     * @param string $sort
     * @param string $order
     * @param int $offset
     * @param array $filters
     * @return Category[]
     */
    public function findCategories(int $size, string $sort, string $order, int $offset, array $filters)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('c')->from('App:Category', 'c');
        
        if (!empty($filters) && $filters['name']) {
            $qb->andWhere('c.name LIKE :name')
                ->setParameter(":name", '%'.$filters['name'].'%');
        }

        if (!empty($sort) && !empty($order)) {
           $qb->orderBy('c.'.$sort, $order);
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
    public function countCategories()
    {
        return $this->createQueryBuilder('c')
            ->select('count(c.id)')
            ->getQuery()
            ->getSingleScalarResult();        
    }    

    /**
     * Find categories with given id's
     * @param array $ids
     * @return array
     */
    public function findCategoriesByIds(array $ids)
    {
        return $this->createQueryBuilder('c')
            ->where("c.id IN(:ids)")
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();        
    }
}
