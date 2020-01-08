<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Post;
use App\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use App\Form\DataTransformer\IdToObjectTransformer;
use Doctrine\ORM\EntityManagerInterface;

class PostType extends AbstractType
{
    private $transformer;

    public function __construct(EntityManagerInterface $em)
    {
        $this->transformer = new IdToObjectTransformer($em, Category::class);
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {     
        $builder
            ->add('title')
            ->add('slug')
            ->add('body')
            ->add('categories', ChoiceType::class, array(
                'choices' => $options['categories'],
                'multiple' => true,
                'expanded' => true,
                'invalid_message' => 'validation.missing'
            ))
            ->add('save', SubmitType::class);
        
        $builder->get('categories')->addModelTransformer($this->transformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
            'categories' => []
        ]);
    }
}
