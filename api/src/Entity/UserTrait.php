<?php

declare (strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

abstract class UserTrait
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Length(
     *   min=3,
     *   max=255,
     *   minMessage="validation.min_length",
     *   maxMessage="validation.max_length"
     * )
     */
    protected $label;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }
}