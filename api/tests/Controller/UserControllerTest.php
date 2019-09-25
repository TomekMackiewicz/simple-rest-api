<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use App\Kernel;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
//use Symfony\Component\Console\Input\ArrayInput;
use GuzzleHttp\Client;

class UserControllerTest extends WebTestCase
{
    protected static $kernel;
    private $apiUrl;
    private $client;
    private static $application;

    public function __construct()
    {
        parent::__construct();
        self::$kernel = new Kernel('test', true);
        self::$kernel->boot();
        self::$application = new Application(self::$kernel);
        $this->client = new Client();
        $this->apiUrl = self::$kernel->getContainer()->getParameter('base_url');
    }

    public function testGetUserEmptyResult(): void
    {
        
        $response = $this->client->get($this->apiUrl.'/user/1', ['http_errors' => false]);
        $this->assertEquals(204, $response->getStatusCode());
    }
    
//    public function testAddNewUserWithEmptyName() : void
//    {
//        $response = $this->client->post($this->apiUrl.'/user', [
//            'json' => [
//                'name' => '' 
//             ],
//            'http_errors' => false
//        ]);
//        $msg = json_decode((string) $response->getBody(), true);
//        $this->assertEquals(201, $response->getStatusCode());
//        $this->assertEquals('game.added', $msg);        
//    }

//    public function testAddNewUser(): void
//    {
//        $date = new \DateTime();
//        $response = $this->client->post($this->apiUrl.'/games', [
//            'json' => [
//                'date' => $date->format('Y-m-d'),
//                'location' => 'Test location',
//                'game_type' => '1',
//                'host_team' => '1',
//                'guest_team' => '1',
//                'host_score' => '1',
//                'guest_score' => '1' 
//             ],
//            'http_errors' => false
//        ]);
//        $msg = json_decode((string) $response->getBody(), true);
//        $this->assertEquals(201, $response->getStatusCode());
//        $this->assertEquals('game.added', $msg);
//    }
}