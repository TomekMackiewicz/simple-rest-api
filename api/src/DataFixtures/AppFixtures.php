<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Setting;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $userStartActive = new Setting();
        $userStartActive->setSection('user');
        $userStartActive->setName('user_start_active');
        $userStartActive->setValue('1');
        $manager->persist($userStartActive);

        $notificationTimeActive = new Setting();
        $notificationTimeActive->setSection('notification');
        $notificationTimeActive->setName('notification_time_active');
        $notificationTimeActive->setValue('5');
        $manager->persist($notificationTimeActive);

        $manager->flush();
    }
}
