<?php

namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/events')]
class EventController extends AbstractController
{
    private function normalizeLangArray($value): array
    {
        if (!is_array($value)) {
            return ['fr' => $value ?? '', 'en' => ''];
        }
        return array_merge(['fr' => '', 'en' => ''], $value);
    }

    #[Route('/create', name: 'create_event', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): Response {
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('image');

        if (empty($data['title']) || empty($data['category']) || empty($data['eventDate']) || empty($data['location'])) {
            return $this->json(['message' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $event = new Event();
        $event->setTitle($this->normalizeLangArray($data['title']));
        $event->setHook($this->normalizeLangArray($data['hook'] ?? []));
        $event->setContent($this->normalizeLangArray($data['content'] ?? []));
        $event->setCategory($data['category']);
        $event->setStatus($data['status'] ?? 'draft');
        $event->setEventDate(new \DateTime($data['eventDate']));
        $event->setLocation($this->normalizeLangArray($data['location']));
        $event->setProgram($data['program'] ?? []);
        $event->setLatitude($data['latitude'] ?? null);
        $event->setLongitude($data['longitude'] ?? null);

        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $file->move($this->getParameter('kernel.project_dir') . '/public/uploads/events', $newFilename);

            $event->setImageName($newFilename);
            $event->setImagePath($this->getParameter('back_url') . '/uploads/events/' . $newFilename);
        }

        $em->persist($event);
        $em->flush();

        return $this->json($this->formatEvent($event), Response::HTTP_CREATED);
    }

    #[Route('/edit/{id}', name: 'edit_event', methods: ['POST'])]
    public function edit(
        int $id,
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): Response {
        $event = $em->getRepository(Event::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('image');

        $event->setTitle($this->normalizeLangArray($data['title'] ?? $event->getTitle()));
        $event->setHook($this->normalizeLangArray($data['hook'] ?? $event->getHook()));
        $event->setContent($this->normalizeLangArray($data['content'] ?? $event->getContent()));
        $event->setCategory($data['category'] ?? $event->getCategory());
        $event->setStatus($data['status'] ?? $event->getStatus());
        if (!empty($data['eventDate'])) {
            $event->setEventDate(new \DateTime($data['eventDate']));
        }
        $event->setLocation($this->normalizeLangArray($data['location'] ?? $event->getLocation()));
        $event->setProgram($data['program'] ?? $event->getProgram());
        $event->setLatitude($data['latitude'] ?? $event->getLatitude());
        $event->setLongitude($data['longitude'] ?? $event->getLongitude());

        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/events';
            $file->move($uploadDir, $newFilename);

            if ($event->getImageName()) {
                $oldImagePath = $uploadDir . '/' . $event->getImageName();
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $event->setImageName($newFilename);
            $event->setImagePath($this->getParameter('back_url') . '/uploads/events/' . $newFilename);
        }

        $em->flush();

        return $this->json($this->formatEvent($event), Response::HTTP_OK);
    }

    #[Route('', name: 'read_all_events', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        $events = $em->getRepository(Event::class)->findBy([], ['createAt' => 'DESC']);
        return $this->json(array_map([$this, 'formatEvent'], $events), Response::HTTP_OK);
    }

    #[Route('/published', name: 'read_published_events', methods: ['GET'])]
    public function readPublished(EntityManagerInterface $em): Response
    {
        $events = $em->getRepository(Event::class)->findBy(['status' => 'published'], ['createAt' => 'DESC']);
        return $this->json(array_map([$this, 'formatEvent'], $events), Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'read_one_event', methods: ['GET'])]
    public function readOne(int $id, EntityManagerInterface $em): Response
    {
        $event = $em->getRepository(Event::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }
        return $this->json($this->formatEvent($event), Response::HTTP_OK);
    }

    #[Route('/{id}/status', name: 'update_event_status', methods: ['PUT'])]
    public function updateStatus(
        int $id,
        Request $request,
        EventRepository $eventRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $event = $eventRepository->find($id);
        if (!$event) {
            return new JsonResponse(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $newStatus = $data['status'] ?? null;

        $allowedStatuses = ['draft', 'published', 'cancelled'];
        if (!in_array($newStatus, $allowedStatuses, true)) {
            return new JsonResponse(['message' => 'Invalid status'], Response::HTTP_BAD_REQUEST);
        }

        $event->setStatus($newStatus);
        $em->flush();

        return new JsonResponse(['id' => $event->getId(), 'status' => $event->getStatus()], Response::HTTP_OK);
    }

    #[Route('/delete/{id}', name: 'delete_event', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): Response
    {
        $event = $em->getRepository(Event::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $imagePath = $event->getImageName()
            ? $this->getParameter('kernel.project_dir') . '/public/uploads/events/' . $event->getImageName()
            : null;

        if ($imagePath && file_exists($imagePath)) {
            @unlink($imagePath);
        }

        $em->remove($event);
        $em->flush();

        return $this->json(['message' => 'Event deleted successfully'], Response::HTTP_OK);
    }

    private function formatEvent(Event $event): array
    {
        return [
            'id' => $event->getId(),
            'title' => $event->getTitle(),
            'hook' => $event->getHook(),
            'content' => $event->getContent(),
            'status' => $event->getStatus(),
            'category' => $event->getCategory(),
            'createAt' => $event->getCreateAt()->format('Y-m-d H:i:s'),
            'eventDate' => $event->getEventDate()->format('Y-m-d'),
            'location' => $event->getLocation(),
            'program' => $event->getProgram(),
            'latitude' => $event->getLatitude(),
            'longitude' => $event->getLongitude(),
            'imageName' => $event->getImageName(),
            'imagePath' => $event->getImagePath(),
        ];
    }
}
