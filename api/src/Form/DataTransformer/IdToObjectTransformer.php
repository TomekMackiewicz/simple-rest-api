<?php

declare(strict_types=1);

namespace App\Form\DataTransformer;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class IdToObjectTransformer implements DataTransformerInterface
{
    private $entityManager;
    private $class;

    public function __construct(EntityManagerInterface $entityManager, $class)
    {
        $this->entityManager = $entityManager;
        $this->class = $class;
    }

    /**
     * Transforms an object to a number
     *
     * @param  ArrayCollection|null $collection
     * @return integer
     */
    public function transform($collection)
    {
        if (empty($collection)) {
            return null;
        }
        
        $objects = $collection->toArray();
        
        $ids = [];        
        foreach ($objects as $object) {
            $ids[] = $object->getId();
        }
 
        return $ids;
    }

    /**
     * Transforms an integer to an object
     *
     * @param  array
     * @return array|null
     * @throws TransformationFailedException if object is not found
     */
    public function reverseTransform($ids)
    {       
        if (empty($ids[0])) {
            return [];
        }
         
        $objects = $this->entityManager->getRepository($this->class)->findById($ids);
        
        if (empty($objects[0])) {
            throw new TransformationFailedException(sprintf(
                'Objects does not exists',
                $objects
            ));
        }
        
        return $objects;
    }
}
