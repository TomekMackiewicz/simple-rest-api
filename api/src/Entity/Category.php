<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use App\Entity\Post;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 * @ORM\Table(name="categories")
 * @UniqueEntity(
 *   fields={"name"},
 *   message="validation.unique"
 * )
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message = "validation.required")
     */
    private $name;

    /**
     * @var \DateTime
     * @ORM\Column(name="date_created", type="datetime", nullable=true)
     */
    private $dateCreated;

    /**
     * @var \DateTime
     * @ORM\Column(name="date_edited", type="datetime", nullable=true)
     */
    private $dateEdited;
    
    /**
     * @ORM\ManyToMany(targetEntity="Post", mappedBy="categories")
     */
    private $posts;

    public function __construct() {
        $this->posts = new ArrayCollection();
    }
    
    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return \self
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    /**
     * @param \DateTimeInterface $dateCreated
     * @return \self
     */
    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;
        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getDateEdited(): ?\DateTimeInterface
    {
        return $this->dateEdited;
    }

    /**
     * @param \DateTimeInterface $dateEdited
     * @return \self
     */
    public function setDateEdited(\DateTimeInterface $dateEdited): self
    {
        $this->dateEdited = $dateEdited;
        return $this;
    }

    /**
     * @return Collection
     */
    public function getPosts(): ?Collection
    {
        return $this->posts;
    }     
    
}