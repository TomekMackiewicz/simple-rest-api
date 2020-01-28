<?php 

declare (strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @UniqueEntity(
 *   fields={"username"},
 *   message="validation.unique",
 *   groups = {"Default", "Edit"}
 * )
 * @UniqueEntity(
 *   fields={"email"},
 *   message="validation.unique",
 *   groups = {"Default", "Edit"}
 * ) 
 */
class User extends BaseUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   min=3,
     *   max=180,
     *   minMessage="validation.min_length",
     *   maxMessage="validation.max_length"
     * )
     */
    protected $username;

    /**
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   min=3,
     *   max=180,
     *   minMessage="validation.min_length",
     *   maxMessage="validation.max_length"
     * )
     */
    protected $usernameCanonical;

    /**
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   max=180,
     *   maxMessage="validation.max_length"
     * )
     * @Assert\Email(
     *   message="validation.regex.email"
     * )
     */
    protected $email;

    /**
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   max=180,
     *   maxMessage="validation.max_length"
     * )
     * @Assert\Email(
     *   message="validation.regex.email"
     * )
     */
    protected $emailCanonical;

    /**
     * @Assert\NotBlank(message="validation.not_blank")
     * @Assert\Length(
     *   min=6,
     *   minMessage="validation.min_length",
     *   groups = {"Default"}
     * )
     */
    protected $plainPassword;
    
    public function __construct()
    {
        parent::__construct();
    }
}
