<?php

namespace App\Controller;

use App\Entity\Benevole;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/donors')]
final class DonorController extends AbstractController
{
    #[Route('/create', name: 'create_donor', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): Response {
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('file');

        if (empty($data['firstName']) || empty($data['lastName']) || empty($data['email'])) {
            return $this->json(['message' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $donor = new Benevole();
        $donor->setType($data['type'] ?? '');
        $donor->setFirstName($data['firstName']);
        $donor->setLastName($data['lastName']);
        $donor->setEmail($data['email']);
        $donor->setPhone($data['phone'] ?? '');
        $donor->setAddress($data['address'] ?? '');
        $donor->setDonationFrequency($data['donationFrequency'] ?? '');
        $donor->setPaymentMethod($data['paymentMethod'] ?? '');
        $donor->setProfession($data['profession'] ?? '');
        $donor->setMotivation($data['motivation'] ?? '');
        $donor->setCreateAt(new \DateTimeImmutable());

        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $file->move($this->getParameter('kernel.project_dir') . '/public/uploads/donors', $newFilename);

            $donor->setFileName($newFilename);
            $donor->setFilePath($this->getParameter('back_url') . '/uploads/donors/' . $newFilename);
        }

        $em->persist($donor);
        $em->flush();

        return new JsonResponse([
            'id' => $donor->getId(),
            'firstName' => $donor->getFirstName(),
            'lastName' => $donor->getLastName(),
            'email' => $donor->getEmail(),
            'phone' => $donor->getPhone(),
            'type' => $donor->getType(),
            'address' => $donor->getAddress(),
            'donationFrequency' => $donor->getDonationFrequency(),
            'paymentMethod' => $donor->getPaymentMethod(),
            'profession' => $donor->getProfession(),
            'motivation' => $donor->getMotivation(),
            'fileName' => $donor->getFileName(),
            'filePath' => $donor->getFilePath(),
            'createAt' => $donor->getCreateAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('', name: 'read_all_donors', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        // On récupère les enregistrements triés par date de création décroissante
        $donors = $em->getRepository(Benevole::class)->findBy([], ['createAt' => 'DESC']);

        if (empty($donors)) {
            return $this->json(['message' => 'No donors found'], Response::HTTP_NOT_FOUND);
        }

        $donorsArray = array_map(fn($donor) => [
            'id' => $donor->getId(),
            'type' => $donor->getType(),
            'firstName' => $donor->getFirstName(),
            'lastName' => $donor->getLastName(),
            'email' => $donor->getEmail(),
            'phone' => $donor->getPhone(),
            'address' => $donor->getAddress(),
            'donationFrequency' => $donor->getDonationFrequency(),
            'paymentMethod' => $donor->getPaymentMethod(),
            'profession' => $donor->getProfession(),
            'motivation' => $donor->getMotivation(),
            'fileName' => $donor->getFileName(),
            'filePath' => $donor->getFilePath(),
            'createAt' => $donor->getCreateAt()->format('Y-m-d H:i:s'),
        ], $donors);

        return $this->json($donorsArray, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'read_one_donor', methods: ['GET'])]
    public function readOne(int $id, EntityManagerInterface $em): Response
    {
        $donor = $em->getRepository(Benevole::class)->find($id);

        if (!$donor) {
            return $this->json(['message' => 'Donor not found'], Response::HTTP_NOT_FOUND);
        }

        $donorArray = [
            'id' => $donor->getId(),
            'type' => $donor->getType(),
            'firstName' => $donor->getFirstName(),
            'lastName' => $donor->getLastName(),
            'email' => $donor->getEmail(),
            'phone' => $donor->getPhone(),
            'address' => $donor->getAddress(),
            'donationFrequency' => $donor->getDonationFrequency(),
            'paymentMethod' => $donor->getPaymentMethod(),
            'profession' => $donor->getProfession(),
            'motivation' => $donor->getMotivation(),
            'fileName' => $donor->getFileName(),
            'filePath' => $donor->getFilePath(),
            'createAt' => $donor->getCreateAt()->format('Y-m-d H:i:s'),
        ];

        return $this->json($donorArray, Response::HTTP_OK);
    }
}
