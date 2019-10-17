<?php

declare(strict_types=1);

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\EducationStatus;

class EducationStatusType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('label')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => EducationStatus::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            //'csrf_field_name' => '_token',
            //'csrf_token_id'   => 'task_item'
        ]);
    }
}
