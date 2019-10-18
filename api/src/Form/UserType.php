<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dateOfBirth', DateType::class, [
                'widget' => 'single_text',
                'invalid_message' => 'validation.invalid_date_format'
            ])
            ->add('location')
            ->add('about')
            ->add('relationshipStatus', ChoiceType::class, [
                'choices' => User::RELATIONSHIP_STATUSES,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('sexualOrientation', ChoiceType::class, [
                'choices' => User::SEXUAL_ORINTATIONS,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('work', ChoiceType::class, [
                'choices' => User::EMPLOYMENT_STATUSES,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('education', ChoiceType::class, [
                'choices' => User::EDUCATION_STATUSES,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('kids', ChoiceType::class, [
                'choices' => User::BOOLEAN_CHOICE,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('language', ChoiceType::class, [
                'choices' => User::LANGUAGES,
                'invalid_message' => 'validation.invalid_choice'
            ])
            ->add('secondaryLanguages', ChoiceType::class, [
                'choices' => User::LANGUAGES,
                'invalid_message' => 'validation.invalid_choice',
                'expanded' => false,
                'multiple' => true
            ])
            ->add('personality')
            ->add('friends')
            ->add('animals')
            ->add('favouriteDish')
            ->add('favouriteCuisine')
            ->add('favouriteDrink')
            ->add('favouriteMusic')
            ->add('hobby')
            ->add('favouriteSport')
            ->add('favouriteBook')
            ->add('favouriteMovie')
            ->add('favouriteTvShow')
            ->add('favouriteColour')
            ->add('ethnicity')
            ->add('shape')
            ->add('height')
            ->add('eyeColour')
            ->add('tattoos')
            ->add('dressingStyle')
            ->add('favouriteAspect')
            ->add('generalLook')
            ->add('habitat')
            ->add('cotenants')
            ->add('income')
            ->add('car')
            ->add('smoking')
            ->add('drinking')
            ->add('sport')
            ->add('traveling')
        ;
    }

    public function getParent()
    {
        return 'FOS\UserBundle\Form\Type\RegistrationFormType';
    }

    public function getBlockPrefix()
    {
        return 'app_user';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false
        ]);
    }
}
