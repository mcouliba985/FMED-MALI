<?php

namespace App\Controller;

use App\Entity\NewsletterSubscriber;
use App\Repository\NewsletterSubscriberRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/newsletter')]
class NewsletterController extends AbstractController
{
    #[Route('', name: 'api_newsletter_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $subscribers = $em->getRepository(NewsletterSubscriber::class)->findAll();

        $data = [];
        foreach ($subscribers as $subscriber) {
            $data[] = [
                'id' => $subscriber->getId(),
                'email' => $subscriber->getEmail(),
                'createdAt' => $subscriber->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($data, 200);
    }

    #[Route('/create', name: 'api_newsletter_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return new JsonResponse(['error' => 'Email requis.'], 400);
        }

        $existing = $em->getRepository(NewsletterSubscriber::class)->findOneBy(['email' => $email]);
        if ($existing) {
            return new JsonResponse(['message' => 'Email déjà inscrit.'], 409);
        }

        $subscriber = new NewsletterSubscriber();
        $subscriber->setEmail($email);
        $subscriber->setCreatedAt(new \DateTimeImmutable());  // ➕ Initialise la date
        $em->persist($subscriber);
        $em->flush();

        return new JsonResponse([
            'message' => 'Inscription réussie.',
            'subscriber' => [
                'id' => $subscriber->getId(),
                'email' => $subscriber->getEmail(),
                'createdAt' => $subscriber->getCreatedAt()->format('Y-m-d H:i:s'),
            ]
        ], 201);
    }

    #[Route('/{id}', name: 'api_newsletter_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $subscriber = $em->getRepository(NewsletterSubscriber::class)->find($id);

        if (!$subscriber) {
            return new JsonResponse(['error' => 'Abonné non trouvé.'], 404);
        }

        $em->remove($subscriber);
        $em->flush();

        return new JsonResponse(['message' => 'Abonné supprimé.']);
    }

    #[Route('/{id}', name: 'api_newsletter_update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $subscriber = $em->getRepository(NewsletterSubscriber::class)->find($id);
        if (!$subscriber) {
            return new JsonResponse(['error' => 'Abonné non trouvé.'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return new JsonResponse(['error' => 'Email requis pour mise à jour.'], 400);
        }

        $subscriber->setEmail($email);
        $em->flush();

        return new JsonResponse([
            'message' => 'Email mis à jour.',
            'subscriber' => [
                'id' => $subscriber->getId(),
                'email' => $subscriber->getEmail(),
                'createdAt' => $subscriber->getCreatedAt()->format('Y-m-d H:i:s'),
            ]
        ]);
    }

    
    #[Route('/newsletter/unsubscribe/{id}', name: 'newsletter_unsubscribe')]
    public function unsubscribe(int $id, NewsletterSubscriberRepository $repo, EntityManagerInterface $em): Response
    {
        $subscriber = $repo->find($id);

        if ($subscriber) {
            $em->remove($subscriber);
            $em->flush();

            return new Response('Vous avez bien été désabonné.');
        }

        return new Response('Abonné introuvable.', 404);
    }
}
