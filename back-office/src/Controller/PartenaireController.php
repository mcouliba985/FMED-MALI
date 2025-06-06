<?php

namespace App\Controller;

use App\Entity\Partenaire;
use App\Repository\PartenaireRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/partenaires')]
class PartenaireController extends AbstractController
{
    #[Route('', name: 'read_all_partenaire', methods: ['GET'])]
    public function index(PartenaireRepository $repo): JsonResponse
    {
        $partenaires = $repo->findAll();

        $data = array_map(function (Partenaire $p) {
            return [
                'id' => $p->getId(),
                'logoPath' => $p->getLogoPath(),
                'fullName' => $p->getFullName(),
                'link' => $p->getLink(),
            ];
        }, $partenaires);

        return $this->json($data);
    }

    #[Route('/create', name: 'create_partenaire', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {
        $file = $request->files->get('logo');

        if (!$file) {
            return $this->json(['message' => 'No file provided'], Response::HTTP_BAD_REQUEST);
        }

        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/partenaires';
        $file->move($uploadDir, $newFilename);

        $logoPath = $this->getParameter('back_url') . '/uploads/partenaires/' . $newFilename;

        $partenaire = new Partenaire();
        $partenaire->setLogoPath($logoPath);
        $partenaire->setCreatedAt(new \DateTimeImmutable());
        $partenaire->setUpdatedAt(new \DateTimeImmutable());

        $em->persist($partenaire);
        $em->flush();

        return $this->json([
            'id' => $partenaire->getId(),
            'logoPath' => $logoPath,
        ], Response::HTTP_CREATED);
    }

    #[Route('/delete/{id}', name: 'delete_partenaire', methods: ['DELETE'])]
    public function delete(
        int $id,
        PartenaireRepository $repo,
        EntityManagerInterface $em
    ): JsonResponse {
        $partenaire = $repo->find($id);
        if (!$partenaire) {
            return $this->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($partenaire);
        $em->flush();

        return $this->json(['message' => 'Deleted'], Response::HTTP_OK);
    }

    #[Route('/update/{id}', name: 'update_partenaire', methods: ['POST'])]
    public function update(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger,
        int $id
    ): JsonResponse {
        $partenaire = $em->getRepository(Partenaire::class)->find($id);

        if (!$partenaire) {
            return $this->json(['message' => 'Partenaire introuvable'], Response::HTTP_NOT_FOUND);
        }

        $file = $request->files->get('logo');
        $fullName = $request->request->get('fullName');
        $link = $request->request->get('link');

        // Mise à jour du logo si un fichier est fourni
        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/partenaires';
            $file->move($uploadDir, $newFilename);

            $logoPath = $this->getParameter('back_url') . '/uploads/partenaires/' . $newFilename;
            $partenaire->setLogoPath($logoPath);
        }

        // Mise à jour des autres champs
        if ($fullName !== null) {
            $partenaire->setFullName($fullName);
        }

        if ($link !== null) {
            $partenaire->setLink($link);
        }

        $partenaire->setUpdatedAt(new \DateTimeImmutable());

        $em->flush();

        return $this->json([
            'id' => $partenaire->getId(),
            'logoPath' => $partenaire->getLogoPath(),
            'fullName' => $partenaire->getFullName(),
            'link' => $partenaire->getLink(),
            'updatedAt' => $partenaire->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ]);
    }
}
