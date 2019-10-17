<?php

declare (strict_types=1);

namespace App\Entity;

use App\Entity\UserTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EducationStatusRepository")
 * @ORM\Table(name="education_statuses")
 */
class EducationStatus extends UserTrait
{

}