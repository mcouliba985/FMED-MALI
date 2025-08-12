<?php

namespace App\Controller;

use App\Entity\Testimonials;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/testimonial')]
final class TestimonialController extends AbstractController
{
    #[Route('/create', name: 'create_testimonial', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): Response {
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('file');

        if (empty($data['fullName']) || empty($data['poste']) || empty($data['message'])) {
            return $this->json(['message' => 'Champs requis manquants'], Response::HTTP_BAD_REQUEST);
        }

        $testimonial = new Testimonials();
        $testimonial->setFullName($data['fullName']);  
        $testimonial->setPoste((array) $data['poste']);
        $testimonial->setMessage((array) $data['message']);
        $testimonial->setCreateAt(new \DateTimeImmutable());

        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/testimonials';
            $file->move($destination, $newFilename);

            $testimonial->setImageName($newFilename);
            $testimonial->setImagePath($this->getParameter('back_url') . '/uploads/testimonials/' . $newFilename);
        }

        $em->persist($testimonial);
        $em->flush();

        return new JsonResponse([
            'id' => $testimonial->getId(),
            'fullName' => $testimonial->getFullName(),
            'poste' => $testimonial->getPoste(),
            'message' => $testimonial->getMessage(),
            'imageName' => $testimonial->getImageName(),
            'imagePath' => $testimonial->getImagePath(),
            'createAt' => $testimonial->getCreateAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('', name: 'read_all_testimonials', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        $testimonials = $em->getRepository(Testimonials::class)->findBy([], ['createAt' => 'DESC']);

        if (empty($testimonials)) {
            return $this->json(['message' => 'Aucun témoignage trouvé'], Response::HTTP_NOT_FOUND);
        }

        $testimonialsArray = array_map(fn($testimonial) => [
            'id' => $testimonial->getId(),
            'fullName' => $testimonial->getFullName(),
            'poste' => $testimonial->getPoste(),
            'message' => $testimonial->getMessage(),
            'imageName' => $testimonial->getImageName(),
            'imagePath' => $testimonial->getImagePath(),
            'createAt' => $testimonial->getCreateAt()->format('Y-m-d H:i:s'),
        ], $testimonials);

        return $this->json($testimonialsArray, Response::HTTP_OK);
    }

    #[Route('/delete/{id}', name: 'delete_testimonial', methods: ['DELETE'])]
    public function delete(
        int $id,
        EntityManagerInterface $em
    ): Response {
        $testimonial = $em->getRepository(Testimonials::class)->find($id);

        if (!$testimonial) {
            return $this->json(['message' => 'Témoignage non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $filePath = $testimonial->getImageName()
            ? $this->getParameter('kernel.project_dir') . '/public/uploads/testimonials/' . $testimonial->getImageName()
            : null;

        if ($filePath && file_exists($filePath)) {
            @unlink($filePath);
        }

        $em->remove($testimonial);
        $em->flush();

        return $this->json(['message' => 'Témoignage supprimé avec succès'], Response::HTTP_OK);
    }
}

