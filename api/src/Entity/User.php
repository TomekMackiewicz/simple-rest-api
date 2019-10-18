<?php 

declare (strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    const RELATIONSHIP_STATUSES = [
        "single", 
        "in a relationship",
        "engaged",
        "married",
        "it's complicated",
        "in an open relationship",
        "widowed",
        "separated",
        "divorced"
    ];

    const SEXUAL_ORINTATIONS = [
        "asexual",
        "bisexual",
        "heterosexual",
        "homosexual"
    ];

    const EMPLOYMENT_STATUSES = [
        "unemployed",
        "employee",
        "worker",
        "self-employed",
        "independent contractor",
        "freelance",
        "zero hours contract",
        "gig economy",
        'apprentice'
    ];

    const EDUCATION_STATUSES = [
        "undergraduate",
        "graduate"
    ];

    const BOOLEAN_CHOICE = [
        "yes",
        "no"
    ];

    const LANGUAGES = [
        'ab' => 'Abkhazian',
        'aa' => 'Afar',
        'af' => 'Afrikaans',
        'ak' => 'Akan',
        'sq' => 'Albanian',
        'am' => 'Amharic',
        'ar' => 'Arabic',
        'an' => 'Aragonese',
        'hy' => 'Armenian',
        'as' => 'Assamese',
        'av' => 'Avaric',
        'ae' => 'Avestan',
        'ay' => 'Aymara',
        'az' => 'Azerbaijani',
        'bm' => 'Bambara',
        'ba' => 'Bashkir',
        'eu' => 'Basque',
        'be' => 'Belarusian',
        'bn' => 'Bengali',
        'bh' => 'Bihari languages',
        'bi' => 'Bislama',
        'bs' => 'Bosnian',
        'br' => 'Breton',
        'bg' => 'Bulgarian',
        'my' => 'Burmese',
        'ca' => 'Catalan, Valencian',
        'km' => 'Central Khmer',
        'ch' => 'Chamorro',
        'ce' => 'Chechen',
        'ny' => 'Chichewa, Chewa, Nyanja',
        'zh' => 'Chinese',
        'cu' => 'Church Slavonic, Old Bulgarian, Old Church Slavonic',
        'cv' => 'Chuvash',
        'kw' => 'Cornish',
        'co' => 'Corsican',
        'cr' => 'Cree',
        'hr' => 'Croatian',
        'cs' => 'Czech',
        'da' => 'Danish',
        'dv' => 'Divehi, Dhivehi, Maldivian',
        'nl' => 'Dutch, Flemish',
        'dz' => 'Dzongkha',
        'en' => 'English',
        'eo' => 'Esperanto',
        'et' => 'Estonian',
        'ee' => 'Ewe',
        'fo' => 'Faroese',
        'fj' => 'Fijian',
        'fi' => 'Finnish',
        'fr' => 'French',
        'ff' => 'Fulah',
        'gd' => 'Gaelic, Scottish Gaelic',
        'gl' => 'Galician',
        'lg' => 'Ganda',
        'ka' => 'Georgian',
        'de' => 'German',
        'ki' => 'Gikuyu, Kikuyu',
        'el' => 'Greek (Modern)',
        'kl' => 'Greenlandic, Kalaallisut',
        'gn' => 'Guarani',
        'gu' => 'Gujarati',
        'ht' => 'Haitian, Haitian Creole',
        'ha' => 'Hausa',
        'he' => 'Hebrew',
        'hz' => 'Herero',
        'hi' => 'Hindi',
        'ho' => 'Hiri Motu',
        'hu' => 'Hungarian',
        'is' => 'Icelandic',
        'io' => 'Ido',
        'ig' => 'Igbo',
        'id' => 'Indonesian',
        'ia' => 'Interlingua (International Auxiliary Language Association)',
        'ie' => 'Interlingue',
        'iu' => 'Inuktitut',
        'ik' => 'Inupiaq',
        'ga' => 'Irish',
        'it' => 'Italian',
        'ja' => 'Japanese',
        'jv' => 'Javanese',
        'kn' => 'Kannada',
        'kr' => 'Kanuri',
        'ks' => 'Kashmiri',
        'kk' => 'Kazakh',
        'rw' => 'Kinyarwanda',
        'kv' => 'Komi',
        'kg' => 'Kongo',
        'ko' => 'Korean',
        'kj' => 'Kwanyama, Kuanyama',
        'ku' => 'Kurdish',
        'ky' => 'Kyrgyz',
        'lo' => 'Lao',
        'la' => 'Latin',
        'lv' => 'Latvian',
        'lb' => 'Letzeburgesch, Luxembourgish',
        'li' => 'Limburgish, Limburgan, Limburger',
        'ln' => 'Lingala',
        'lt' => 'Lithuanian',
        'lu' => 'Luba-Katanga',
        'mk' => 'Macedonian',
        'mg' => 'Malagasy',
        'ms' => 'Malay',
        'ml' => 'Malayalam',
        'mt' => 'Maltese',
        'gv' => 'Manx',
        'mi' => 'Maori',
        'mr' => 'Marathi',
        'mh' => 'Marshallese',
        'ro' => 'Moldovan, Moldavian, Romanian',
        'mn' => 'Mongolian',
        'na' => 'Nauru',
        'nv' => 'Navajo, Navaho',
        'nd' => 'Northern Ndebele',
        'ng' => 'Ndonga',
        'ne' => 'Nepali',
        'se' => 'Northern Sami',
        'no' => 'Norwegian',
        'nb' => 'Norwegian Bokm?l',
        'nn' => 'Norwegian Nynorsk',
        'ii' => 'Nuosu, Sichuan Yi',
        'oc' => 'Occitan (post 1500)',
        'oj' => 'Ojibwa',
        'or' => 'Oriya',
        'om' => 'Oromo',
        'os' => 'Ossetian, Ossetic',
        'pi' => 'Pali',
        'pa' => 'Panjabi, Punjabi',
        'ps' => 'Pashto, Pushto',
        'fa' => 'Persian',
        'pl' => 'Polish',
        'pt' => 'Portuguese',
        'qu' => 'Quechua',
        'rm' => 'Romansh',
        'rn' => 'Rundi',
        'ru' => 'Russian',
        'sm' => 'Samoan',
        'sg' => 'Sango',
        'sa' => 'Sanskrit',
        'sc' => 'Sardinian',
        'sr' => 'Serbian',
        'sn' => 'Shona',
        'sd' => 'Sindhi',
        'si' => 'Sinhala, Sinhalese',
        'sk' => 'Slovak',
        'sl' => 'Slovenian',
        'so' => 'Somali',
        'st' => 'Sotho, Southern',
        'nr' => 'South Ndebele',
        'es' => 'Spanish, Castilian',
        'su' => 'Sundanese',
        'sw' => 'Swahili',
        'ss' => 'Swati',
        'sv' => 'Swedish',
        'tl' => 'Tagalog',
        'ty' => 'Tahitian',
        'tg' => 'Tajik',
        'ta' => 'Tamil',
        'tt' => 'Tatar',
        'te' => 'Telugu',
        'th' => 'Thai',
        'bo' => 'Tibetan',
        'ti' => 'Tigrinya',
        'to' => 'Tonga (Tonga Islands)',
        'ts' => 'Tsonga',
        'tn' => 'Tswana',
        'tr' => 'Turkish',
        'tk' => 'Turkmen',
        'tw' => 'Twi',
        'ug' => 'Uighur, Uyghur',
        'uk' => 'Ukrainian',
        'ur' => 'Urdu',
        'uz' => 'Uzbek',
        've' => 'Venda',
        'vi' => 'Vietnamese',
        'vo' => 'Volap_k',
        'wa' => 'Walloon',
        'cy' => 'Welsh',
        'fy' => 'Western Frisian',
        'wo' => 'Wolof',
        'xh' => 'Xhosa',
        'yi' => 'Yiddish',
        'yo' => 'Yoruba',
        'za' => 'Zhuang, Chuang',
        'zu' => 'Zulu'
    ];

    const PERSONALITIES = [
        "helpful",
        "adventurous",
        "calm",
        "careless",
        "joyful",
        "demanding",
        "extroverted",
        "honest",
        "generous",
        "witty",
        "introverted",
        "tolerant",
        "full of beans",
        "solitary",
        "nervous",
        "imperious",
        "quiet",
        "restrained",
        "sensitive",
        "shy",
        "sociable",
        "spontaneous",
        "stubborn",
        "suspicious",
        "prudent",
        "lofty",
        "thoughtful",
        "friendly"
    ];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="date")
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Date(
     *   message="validation.invalid_date_format"
     * )
     */
    private $dateOfBirth;

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
    private $location;

    /**
     * @ORM\Column(type="text", nullable=true)
     * 
     * @Assert\Length(
     *   max=1000,
     *   maxMessage="validation.max_length"
     * )
     */
    private $about;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::RELATIONSHIP_STATUSES, 
     *   message="validation.invalid_choice"
     * )
     */
    private $relationshipStatus;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::SEXUAL_ORINTATIONS, 
     *   message="validation.invalid_choice"
     * )
     */
    private $sexualOrientation;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::EMPLOYMENT_STATUSES, 
     *   message="validation.invalid_choice"
     * )
     */
    private $work;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::EDUCATION_STATUSES, 
     *   message="validation.invalid_choice"
     * )
     */
    private $education;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::BOOLEAN_CHOICE, 
     *   message="validation.invalid_choice"
     * )
     */
    private $kids;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Assert\NotBlank(
     *   message="validation.not_blank"
     * )
     * @Assert\Choice(
     *   choices=User::LANGUAGES, 
     *   message="validation.invalid_choice"
     * )
     */
    private $language;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     * @Assert\Choice(
     *   choices=User::LANGUAGES, 
     *   message="validation.invalid_choice"
     * )
     */
    private $secondaryLanguages;

    /**
     * @ORM\Column(type="text", nullable=true)
     * 
     * @Assert\Choice(
     *   choices=User::PERSONALITIES, 
     *   message="validation.invalid_choice"
     * )
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

    public function __construct()
    {
        parent::__construct();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateOfBirth(): ?int
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(int $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

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
