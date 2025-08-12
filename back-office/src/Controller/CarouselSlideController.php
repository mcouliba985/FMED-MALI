<?php

// src/Controller/CarouselSlideController.php

namespace App\Controller;

use App\Entity\CarouselSlide;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/carousel')]
class CarouselSlideController extends AbstractController
{
    #[Route('/create', name: 'create_carousel_slide', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $text = json_decode($request->request->get('text'), true);  // directement le champ texte
        $file = $request->files->get('image');  // fichier image

        if (empty($text)) {
            return $this->json(['message' => 'Texte requis'], Response::HTTP_BAD_REQUEST);
        }

        if (!$file) {
            return $this->json(['message' => 'Image requise'], Response::HTTP_BAD_REQUEST);
        }

        $slide = new CarouselSlide();
        $slide->setText($text);
        $slide->setCreateAt(new \DateTimeImmutable());

        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/carousel';
        $file->move($destination, $newFilename);

        $slide->setImagePath($this->getParameter('back_url') . '/uploads/carousel/' . $newFilename);

        $em->persist($slide);
        $em->flush();

        return $this->json([
            'id' => $slide->getId(),
            'text' => $slide->getText(),
            'imagePath' => $slide->getImagePath(),
            'createAt' => $slide->getCreateAt()->format('Y-m-d H:i:s')
        ], Response::HTTP_CREATED);
    }

    #[Route('', name: 'read_all_carousel_slides', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        $slides = $em->getRepository(CarouselSlide::class)->findBy([], ['createAt' => 'ASC']);

        $array = array_map(fn($s) => [
            'id' => $s->getId(),
            'text' => $s->getText(),
            'imagePath' => $s->getImagePath(),
            'createAt' => $s->getCreateAt()->format('Y-m-d H:i:s'),
        ], $slides);

        return $this->json($array, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'delete_carousel_slide', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): Response
    {
        $slide = $em->getRepository(CarouselSlide::class)->find($id);
        if (!$slide) {
            return $this->json(['message' => 'Slide non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($slide);
        $em->flush();

        return $this->json(['message' => 'Supprimé avec succès'], Response::HTTP_OK);
    }

    #[Route('/update/{id}', name: 'update_carousel_slide', methods: ['POST'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $text = json_decode($request->request->get('text'), true);
        $file = $request->files->get('image');

        $slide = $em->getRepository(CarouselSlide::class)->find($id);

        if (!$slide) {
            return $this->json(['message' => 'Slide non trouvé'], Response::HTTP_NOT_FOUND);
        }

        if (!empty($text)) {
            $slide->setText($text);   
        }

        if ($file) {
            // 🔥 Supprimer l'ancienne image si elle existe
            $oldImagePath = $slide->getImagePath();
            if ($oldImagePath) {
                // Extraire le chemin absolu
                $oldFilePath = str_replace($this->getParameter('back_url'), $this->getParameter('kernel.project_dir') . '/public', $oldImagePath);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            // Enregistrer la nouvelle image
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/carousel';
            $file->move($destination, $newFilename);

            $slide->setImagePath($this->getParameter('back_url') . '/uploads/carousel/' . $newFilename);
        }

        $em->flush();

        return $this->json([
            'id' => $slide->getId(),
            'text' => $slide->getText(),
            'imagePath' => $slide->getImagePath(),
            'createAt' => $slide->getCreateAt()->format('Y-m-d H:i:s')
        ], Response::HTTP_OK);
    }
}
