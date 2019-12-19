<?php

declare (strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use App\Entity\User;
use App\Entity\Category;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 * @ORM\Table(name="posts")
 * @UniqueEntity(
 *   fields={"title"},
 *   message="validation.unique"
 * )
 * @UniqueEntity(
 *   fields={"slug"},
 *   message="validation.unique"
 * )
 */
class Post
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   min=3,
     *   max=255,
     *   minMessage="validation.min_length",
     *   maxMessage="validation.max_length"
     * )
     */
    private $title;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank(message = "validation.not_blank")
     * @Assert\Regex(
     *   pattern = "/^[a-z0-9]+(?:-[a-z0-9]+)*$/",
     *   match = true,
     *   message = "validation.regex"
     * )
     */
    private $slug;

    /**
     * @var string
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message = "validation.not_blank")
     */
    private $body;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="posts")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $author;

    /**
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="posts")
     * @ORM\JoinTable(name="posts_categories")
     */
    private $categories;

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

    public function __construct() {
        $this->categories = new ArrayCollection();
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
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return \self
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getSlug(): ?string
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     * @return \self
     */
    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getBody(): ?string
    {
        return $this->body;
    }

    /**
     * @param string $body
     * @return \self
     */
    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    /**
     * @return User|null
     */
    public function getAuthor(): ?User
    {
        return $this->author;
    }

    /**
     * @param User $author
     * @return \self
     */
    public function setAuthor(User $author): self
    {
        $this->author = $author;
        
        return $this;
    }
    
    /**
     * @return Collection
     */
    public function getCategories(): ?Collection
    {
        return $this->categories;
    }
    
    /**
     * @param Category $category
     */
    public function addCategory(Category $category)
    {        
        $this->categories->add($category);
    }
    
    /**
     * @param Category $category
     */
    public function removeCategory(Category $category)
    {
        $this->categories->removeElement($category);
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
}