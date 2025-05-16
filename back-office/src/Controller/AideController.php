<?php

// src/Controller/API/AideController.php
namespace App\Controller;

use App\Entity\AideSubmission;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;



class AideController extends AbstractController
{
    #[Route('/api/aide/submit', name: 'submit_aide_form', methods: ['POST'])]
    public function submit(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger,
        MailerInterface $mailer
    ): JsonResponse {
        $nom = $request->request->get('name');
        $prenom = $request->request->get('firstName');
        $file = $request->files->get('file');

        if (!$nom || !$prenom || !$file) {
            return $this->json(['message' => 'Champs manquants.'], 400);
        }

        // Gestion du fichier
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/aides';

        try {
            $file->move($uploadDir, $newFilename);
        } catch (FileException $e) {
            return $this->json(['message' => "Erreur lors de l'upload du fichier."], 500);
        }

        $fichierPath = $this->getParameter('back_url') . 'uploads/aides/' . $newFilename;

        // Enregistrement en base de données
        $aide = new AideSubmission();
        $aide->setName($nom);
        $aide->setFirstName($prenom);
        $aide->setFile($fichierPath);
        $aide->setCreatedAt(new \DateTimeImmutable());

        $em->persist($aide);
        $em->flush();

        // Envoi d’email
        $email = (new TemplatedEmail())
            ->from($this->getParameter('mail_system'))
            ->to($this->getParameter('account_mail'))
            ->subject('Nouvelle demande d’inscription au FONSEJ')
            ->text("Nouvelle demande reçue de $prenom $nom. Fichier : $fichierPath")
            ->htmlTemplate('emails/demande_fonsej.html.twig')
            ->context([
                'nom' => $nom,
                'prenom' => $prenom,
                'fichierPath' => $fichierPath,
            ]);

        $email->getHeaders()->addTextHeader('X-Mailer', 'Symfony Mailer');

        $mailer->send($email);

        return $this->json([
            'message' => 'Demande envoyée avec succès.',
            'id' => $aide->getId(),
            'fichierPath' => $fichierPath
        ], 201);
    }
}
