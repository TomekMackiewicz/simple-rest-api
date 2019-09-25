<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class)
//            ->add('age')
//            ->add('location')
//            ->add('about')
//            ->add('relationshipStatus')
//            ->add('sexualOrientation')
//            ->add('work')
//            ->add('education')
//            ->add('kids')
//            ->add('language')
//            ->add('secondaryLanguages')
//            ->add('zodiac')
//            ->add('personality')
//            ->add('friends')
//            ->add('animals')
//            ->add('favouriteDish')
//            ->add('favouriteCuisine')
//            ->add('favouriteDrink')
//            ->add('favouriteMusic')
//            ->add('hobby')
//            ->add('favouriteSport')
//            ->add('favouriteBook')
//            ->add('favouriteMovie')
//            ->add('favouriteTvShow')
//            ->add('favouriteColour')
//            ->add('ethnicity')
//            ->add('shape')
//            ->add('height')
//            ->add('eyeColour')
//            ->add('tattoos')
//            ->add('dressingStyle')
//            ->add('favouriteAspect')
//            ->add('generalLook')
//            ->add('habitat')
//            ->add('cotenants')
//            ->add('income')
//            ->add('car')
//            ->add('smoking')
//            ->add('drinking')
//            ->add('sport')
//            ->add('traveling')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => false
        ]);
    }
}
