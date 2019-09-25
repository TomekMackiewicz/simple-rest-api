<?php 

declare (strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(
 *   fields={"email"},
 *   message="validation.unique.email"
 * )
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=32)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Type(
     *   type="string",
     *   message="validation.type.string"
     * )
     * @Assert\Length(
     *   min=2,
     *   max=32,
     *   minMessage="validation.min_length {{ limit }}",
     *   maxMessage="validation.max_length {{ limit }}"
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $age;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $location;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $about;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $relationshipStatus;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sexualOrientation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $work;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $education;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $kids;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $language;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $secondaryLanguages;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $zodiac;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $personality;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $friends;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $animals;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteDish;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteCuisine;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteDrink;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteMusic;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $hobby;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteSport;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteBook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteMovie;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteTvShow;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteColour;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $ethnicity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $shape;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $height;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $eyeColour;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tattoos;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $dressingStyle;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $favouriteAspect;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $generalLook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $habitat;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $cotenants;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $income;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $car;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smoking;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $drinking;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $sport;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $traveling;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getAbout(): ?string
    {
        return $this->about;
    }

    public function setAbout(?string $about): self
    {
        $this->about = $about;

        return $this;
    }

    public function getRelationshipStatus(): ?string
    {
        return $this->relationshipStatus;
    }

    public function setRelationshipStatus(string $relationshipStatus): self
    {
        $this->relationshipStatus = $relationshipStatus;

        return $this;
    }

    public function getSexualOrientation(): ?string
    {
        return $this->sexualOrientation;
    }

    public function setSexualOrientation(string $sexualOrientation): self
    {
        $this->sexualOrientation = $sexualOrientation;

        return $this;
    }

    public function getWork(): ?string
    {
        return $this->work;
    }

    public function setWork(string $work): self
    {
        $this->work = $work;

        return $this;
    }

    public function getEducation(): ?string
    {
        return $this->education;
    }

    public function setEducation(string $education): self
    {
        $this->education = $education;

        return $this;
    }

    public function getKids(): ?string
    {
        return $this->kids;
    }

    public function setKids(string $kids): self
    {
        $this->kids = $kids;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getSecondaryLanguages(): ?string
    {
        return $this->secondaryLanguages;
    }

    public function setSecondaryLanguages(?string $secondaryLanguages): self
    {
        $this->secondaryLanguages = $secondaryLanguages;

        return $this;
    }

    public function getZodiac(): ?string
    {
        return $this->zodiac;
    }

    public function setZodiac(?string $zodiac): self
    {
        $this->zodiac = $zodiac;

        return $this;
    }

    public function getPersonality(): ?string
    {
        return $this->personality;
    }

    public function setPersonality(?string $personality): self
    {
        $this->personality = $personality;

        return $this;
    }

    public function getFriends(): ?string
    {
        return $this->friends;
    }

    public function setFriends(?string $friends): self
    {
        $this->friends = $friends;

        return $this;
    }

    public function getAnimals(): ?string
    {
        return $this->animals;
    }

    public function setAnimals(?string $animals): self
    {
        $this->animals = $animals;

        return $this;
    }

    public function getFavouriteDish(): ?string
    {
        return $this->favouriteDish;
    }

    public function setFavouriteDish(?string $favouriteDish): self
    {
        $this->favouriteDish = $favouriteDish;

        return $this;
    }

    public function getFavouriteCuisine(): ?string
    {
        return $this->favouriteCuisine;
    }

    public function setFavouriteCuisine(?string $favouriteCuisine): self
    {
        $this->favouriteCuisine = $favouriteCuisine;

        return $this;
    }

    public function getFavouriteDrink(): ?string
    {
        return $this->favouriteDrink;
    }

    public function setFavouriteDrink(?string $favouriteDrink): self
    {
        $this->favouriteDrink = $favouriteDrink;

        return $this;
    }

    public function getFavouriteMusic(): ?string
    {
        return $this->favouriteMusic;
    }

    public function setFavouriteMusic(?string $favouriteMusic): self
    {
        $this->favouriteMusic = $favouriteMusic;

        return $this;
    }

    public function getHobby(): ?string
    {
        return $this->hobby;
    }

    public function setHobby(?string $hobby): self
    {
        $this->hobby = $hobby;

        return $this;
    }

    public function getFavouriteSport(): ?string
    {
        return $this->favouriteSport;
    }

    public function setFavouriteSport(?string $favouriteSport): self
    {
        $this->favouriteSport = $favouriteSport;

        return $this;
    }

    public function getFavouriteBook(): ?string
    {
        return $this->favouriteBook;
    }

    public function setFavouriteBook(?string $favouriteBook): self
    {
        $this->favouriteBook = $favouriteBook;

        return $this;
    }

    public function getFavouriteMovie(): ?string
    {
        return $this->favouriteMovie;
    }

    public function setFavouriteMovie(?string $favouriteMovie): self
    {
        $this->favouriteMovie = $favouriteMovie;

        return $this;
    }

    public function getFavouriteTvShow(): ?string
    {
        return $this->favouriteTvShow;
    }

    public function setFavouriteTvShow(?string $favouriteTvShow): self
    {
        $this->favouriteTvShow = $favouriteTvShow;

        return $this;
    }

    public function getFavouriteColour(): ?string
    {
        return $this->favouriteColour;
    }

    public function setFavouriteColour(?string $favouriteColour): self
    {
        $this->favouriteColour = $favouriteColour;

        return $this;
    }

    public function getEthnicity(): ?string
    {
        return $this->ethnicity;
    }

    public function setEthnicity(?string $ethnicity): self
    {
        $this->ethnicity = $ethnicity;

        return $this;
    }

    public function getShape(): ?string
    {
        return $this->shape;
    }

    public function setShape(?string $shape): self
    {
        $this->shape = $shape;

        return $this;
    }

    public function getHeight(): ?string
    {
        return $this->height;
    }

    public function setHeight(?string $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getEyeColour(): ?string
    {
        return $this->eyeColour;
    }

    public function setEyeColour(?string $eyeColour): self
    {
        $this->eyeColour = $eyeColour;

        return $this;
    }

    public function getTattoos(): ?string
    {
        return $this->tattoos;
    }

    public function setTattoos(?string $tattoos): self
    {
        $this->tattoos = $tattoos;

        return $this;
    }

    public function getDressingStyle(): ?string
    {
        return $this->dressingStyle;
    }

    public function setDressingStyle(?string $dressingStyle): self
    {
        $this->dressingStyle = $dressingStyle;

        return $this;
    }

    public function getFavouriteAspect(): ?string
    {
        return $this->favouriteAspect;
    }

    public function setFavouriteAspect(?string $favouriteAspect): self
    {
        $this->favouriteAspect = $favouriteAspect;

        return $this;
    }

    public function getGeneralLook(): ?string
    {
        return $this->generalLook;
    }

    public function setGeneralLook(?string $generalLook): self
    {
        $this->generalLook = $generalLook;

        return $this;
    }

    public function getHabitat(): ?string
    {
        return $this->habitat;
    }

    public function setHabitat(?string $habitat): self
    {
        $this->habitat = $habitat;

        return $this;
    }

    public function getCotenants(): ?string
    {
        return $this->cotenants;
    }

    public function setCotenants(?string $cotenants): self
    {
        $this->cotenants = $cotenants;

        return $this;
    }

    public function getIncome(): ?string
    {
        return $this->income;
    }

    public function setIncome(?string $income): self
    {
        $this->income = $income;

        return $this;
    }

    public function getCar(): ?string
    {
        return $this->car;
    }

    public function setCar(?string $car): self
    {
        $this->car = $car;

        return $this;
    }

    public function getSmoking(): ?string
    {
        return $this->smoking;
    }

    public function setSmoking(?string $smoking): self
    {
        $this->smoking = $smoking;

        return $this;
    }

    public function getDrinking(): ?string
    {
        return $this->drinking;
    }

    public function setDrinking(?string $drinking): self
    {
        $this->drinking = $drinking;

        return $this;
    }

    public function getSport(): ?string
    {
        return $this->sport;
    }

    public function setSport(?string $sport): self
    {
        $this->sport = $sport;

        return $this;
    }

    public function getTraveling(): ?string
    {
        return $this->traveling;
    }

    public function setTraveling(?string $traveling): self
    {
        $this->traveling = $traveling;

        return $this;
    }
}
