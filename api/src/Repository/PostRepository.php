<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PostRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Post::class);
    }

    /**
     * Posts for pagination
     * 
     * @param int $size
     * @param string $sort
     * @param string $order
     * @param int $offset
     * @param array $filters
     * @return Post[]
     */
    public function findPosts(int $size, string $sort, string $order, int $offset, array $filters)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('p')->from('App:Post', 'p');
        
        if ($filters['title']) {
            $qb->andWhere('p.title LIKE :title')
                ->setParameter(":title", '%'.$filters['title'].'%');
        }

        if ($filters['author']) {
            $qb->andWhere('p.author = :author')
                ->setParameter(":author", $filters['author']);
        }
        
        $qb->orderBy('p.'.$sort, $order)
            ->setMaxResults($size)
            ->setFirstResult($offset);
        
        return $qb->getQuery()->getResult();
    }
    
    /**
     * @return integer
     */
    public function countPosts()
    {
        return $this->createQueryBuilder('p')
            ->select('count(p.id)')
            ->getQuery()
            ->getSingleScalarResult();        
    }    

    /**
     * Find posts with given id's
     * @param array $ids
     * @return array
     */
    public function findPostsByIds(array $ids)
    {
        return $this->createQueryBuilder('p')
            ->where("p.id IN(:ids)")
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();        
    }
    
}