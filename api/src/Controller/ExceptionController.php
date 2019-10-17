<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use FOS\RestBundle\Util\ExceptionValueMap;

class ExceptionController extends AbstractFOSRestController
{
    /**
     * @var ExceptionValueMap
     */
    private $exceptionCodes;    
    
    public function __construct(ExceptionValueMap $exceptionCodes) 
    {
        $this->exceptionCodes = $exceptionCodes;
    }
    
    /**
     * Converts an Exception to a Response.
     * 
     * @param \Exception|\Throwable $exception
     * @return Response
     */
    public function showAction($exception)
    {
        $code = $this->getStatusCode($exception);
        
        return $this->handleView(
            $this->view($exception, $code)
        );
    }   
    /**
     * Determines the status code to use for the response.
     *
     * @param \Exception $exception
     *
     * @return int
     */
    protected function getStatusCode(\Exception $exception)
    {
        if ($statusCode = $this->exceptionCodes->resolveException($exception)) {
            return $statusCode;
        }
        // Default
        if ($exception instanceof HttpExceptionInterface) {
            return $exception->getStatusCode();
        }
        return 500;
    }    
  
}