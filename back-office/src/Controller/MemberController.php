<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use App\Entity\Members;




#[Route('/api/members')]
final class MemberController extends AbstractController
{
    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('source');

        if (empty($data['fullName']) || empty($data['email']) || empty($data['phone']) || empty($data['memberType'])) {
            return $this->json(['message' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $member = new Members(); // Ton entité
        $member->setFullName($data['fullName']);
        $member->setEmail($data['email']);
        $member->setPhone($data['phone']);
        $member->setMemberType($data['memberType']);
        $member->setSortOrder($data['sortOrder']);
        $member->setPoste($data['poste'] ?? '');
        $member->setCreeatAt(new \DateTimeImmutable());

        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $file->move($this->getParameter('kernel.project_dir') . '/public/uploads/members', $newFilename);

            $member->setImageName($newFilename);
            $member->setImagePath($this->getParameter('back_url') . '/uploads/members/' . $newFilename);
        }

        $em->persist($member);
        $em->flush();

        return $this->json([
            'id' => $member->getId(),
            'fullName' => $member->getFullName(),
            'email' => $member->getEmail(),
            'phone' => $member->getPhone(),
            'memberType' => $member->getMemberType(),
            'poste' => $member->getPoste(),
            'imageName' => $member->getImageName(),
            'imagePath' => $member->getImagePath(),
            'creeatAt' => $member->getCreeatAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('', name: 'read_all', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): JsonResponse
    {
        $members = $em->getRepository(Members::class)->findBy([], ['sortOrder' => 'ASC']);

        if (empty($members)) {
            return $this->json(['message' => 'No members found'], Response::HTTP_NOT_FOUND);
        }

        $data = array_map(fn($member) => [
            'id' => $member->getId(),
            'fullName' => $member->getFullName(),
            'email' => $member->getEmail(),
            'phone' => $member->getPhone(),
            'memberType' => $member->getMemberType(),
            'poste' => $member->getPoste(),
            'imageName' => $member->getImageName(),
            'imagePath' => $member->getImagePath(),
            'creeatAt' => $member->getCreeatAt()->format('Y-m-d H:i:s'),
        ], $members);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'read_one', methods: ['GET'])]
    public function readOne(int $id, EntityManagerInterface $em): JsonResponse
    {
        $member = $em->getRepository(Members::class)->find($id);

        if (!$member) {
            return $this->json(['message' => 'Member not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id' => $member->getId(),
            'fullName' => $member->getFullName(),
            'email' => $member->getEmail(),
            'phone' => $member->getPhone(),
            'memberType' => $member->getMemberType(),
            'poste' => $member->getPoste(),
            'imageName' => $member->getImageName(),
            'imagePath' => $member->getImagePath(),
            'creeatAt' => $member->getCreeatAt()->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('/{id}/type', name: 'update_type', methods: ['PUT'])]
    public function updateType(
        int $id,
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $member = $em->getRepository(Members::class)->find($id);

        if (!$member) {
            return $this->json(['message' => 'Member not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $newType = $data['memberType'] ?? null;

        if (!$newType) {
            return $this->json(['message' => 'Invalid member type'], Response::HTTP_BAD_REQUEST);
        }

        $member->setMemberType($newType);
        $em->flush();

        return $this->json([
            'id' => $member->getId(),
            'fullName' => $member->getFullName(),
            'memberType' => $member->getMemberType(),
        ]);
    }
}
