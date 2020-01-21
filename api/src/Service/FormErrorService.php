<?php

declare(strict_types=1);

namespace App\Service;

class FormErrorService
{
    public function prepareErrors($formErrors)
    {
        $errors = [];
        foreach ($formErrors as $error) {
            if ($error->getOrigin()) {
                $errors['formErrors'][$error->getOrigin()->getName()][] = $error->getMessage();
            }
        }

        return $errors;
    }
}