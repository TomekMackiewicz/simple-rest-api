<?php

declare (strict_types=1);

namespace App\Entity;

use App\Entity\UserTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EducationStatusRepository")
 * @ORM\Table(name="education_statuses")
 * @UniqueEntity(
 *   fields={"label"},
 *   message="validation.unique"
 * )
 */
class EducationStatus extends UserTrait
{
    /**
     * @ORM\Column(type="string", length=255, unique=true)
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
}