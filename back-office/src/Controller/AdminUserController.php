<?php

// src/Controller/AdminUserController.php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin')]
class AdminUserController extends AbstractController
{
    #[Route('/create', name: 'admin_create', methods: ['POST'])]
    public function createAdmin(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            return new JsonResponse(['error' => 'Email et mot de passe requis'], 400);
        }

        $existing = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existing) {
            return new JsonResponse(['error' => 'Un utilisateur avec cet email existe déjà'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'Admin créé avec succès'], 201);
    }

    #[Route('/delete', name: 'admin_delete', methods: ['DELETE'])]
    public function deleteAdmin(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'])) {
            return new JsonResponse(['error' => 'Email requis'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'Aucun utilisateur trouvé'], 404);
        }

        $em->remove($user);
        $em->flush();

        return new JsonResponse(['message' => 'Admin supprimé avec succès']);
    }
}
