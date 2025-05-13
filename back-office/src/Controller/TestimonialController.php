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
        // Récupérer les données JSON depuis la clé "informations"
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('file');

        // Vérifier que les champs requis sont présents
        if (empty($data['fullName']) || empty($data['poste']) || empty($data['message'])) {
            return $this->json(['message' => 'Champs requis manquants'], Response::HTTP_BAD_REQUEST);
        }

        // Créer le témoignage
        $testimonial = new Testimonials();
        $testimonial->setFullName($data['fullName']);
        $testimonial->setPoste($data['poste']);
        $testimonial->setMessage($data['message']);
        $testimonial->setCreateAt(new \DateTimeImmutable());

        // Gérer l'image si elle est présente
        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            // Déplacer le fichier dans le dossier public/uploads/testimonials
            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/testimonials';
            $file->move($destination, $newFilename);

            $testimonial->setImageName($newFilename);
            $testimonial->setImagePath($this->getParameter('back_url') . '/uploads/testimonials/' . $newFilename);
        }

        // Sauvegarder en base de données
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
        // On récupère les témoignages triés par date de création décroissante
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
}
