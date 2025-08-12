<?php

namespace App\Controller;

use App\Entity\YoutubeManage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/youtube')]
class YoutubeManageController extends AbstractController
{
    #[Route('/create', name: 'create_youtube_manage', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em,
        SluggerInterface $slugger): Response
    {
        $hook = json_decode($request->request->get('hook'), true);
        $content = json_decode($request->request->get('content'), true);
        $youtubeLink = $request->request->get('youtubeLink');
        $file = $request->files->get('image');

        if (!is_array($hook) || !is_array($content) || empty($youtubeLink)) {
            return $this->json(['message' => 'Hook et Content doivent être en JSON {fr:..., en:...}'], Response::HTTP_BAD_REQUEST);
        }

        if (!$file) {
            return $this->json(['message' => 'Image requise'], Response::HTTP_BAD_REQUEST);
        }

        $youtube = new YoutubeManage();
        $youtube->setHook($hook);
        $youtube->setContent($content);
        $youtube->setYoutubeLink($youtubeLink);

        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/youtube';
        $file->move($destination, $newFilename);

        $youtube->setImagePath($this->getParameter('back_url') . '/uploads/youtube/' . $newFilename);
        $youtube->setImageName($newFilename);

        $em->persist($youtube);
        $em->flush();

        return $this->json([
            'id' => $youtube->getId(),
            'hook' => $youtube->getHook(),
            'content' => $youtube->getContent(),
            'youtubeLink' => $youtube->getYoutubeLink(),
            'imagePath' => $youtube->getImagePath(),
            'imageName' => $youtube->getImageName()
        ], Response::HTTP_CREATED);
    }

    #[Route('', name: 'read_all_youtube_manage', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        $entries = $em->getRepository(YoutubeManage::class)->findAll();

        $array = array_map(fn($item) => [
            'id' => $item->getId(),
            'hook' => $item->getHook(),  // { fr: "...", en: "..." }
            'content' => $item->getContent(),
            'youtubeLink' => $item->getYoutubeLink(),
            'imagePath' => $item->getImagePath(),
            'imageName' => $item->getImageName()
        ], $entries);

        return $this->json($array, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'delete_youtube_manage', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): Response
    {
        $entry = $em->getRepository(YoutubeManage::class)->find($id);
        if (!$entry) {
            return $this->json(['message' => 'Élément non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Supprimer le fichier image associé
        $oldImagePath = $entry->getImagePath();
        if ($oldImagePath) {
            $oldFilePath = str_replace($this->getParameter('back_url'), $this->getParameter('kernel.project_dir') . '/public', $oldImagePath);
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
        }

        $em->remove($entry);
        $em->flush();

        return $this->json(['message' => 'Supprimé avec succès'], Response::HTTP_OK);
    }

    #[Route('/update/{id}', name: 'update_youtube_manage', methods: ['POST'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $hook = json_decode($request->request->get('hook'), true);
        $content = json_decode($request->request->get('content'), true);
        $youtubeLink = $request->request->get('youtubeLink');
        $file = $request->files->get('image');

        $entry = $em->getRepository(YoutubeManage::class)->find($id);
        if (!$entry) {
            return $this->json(['message' => 'Élément non trouvé'], Response::HTTP_NOT_FOUND);
        }

        if (!empty($hook)) {
            $entry->setHook($hook);
        }
        if (!empty($content)) {
            $entry->setContent($content);
        }
        if (!empty($youtubeLink)) {
            $entry->setYoutubeLink($youtubeLink);
        }

        if ($file) {
            // Supprimer l'ancienne image
            $oldImagePath = $entry->getImagePath();
            if ($oldImagePath) {
                $oldFilePath = str_replace($this->getParameter('back_url'), $this->getParameter('kernel.project_dir') . '/public', $oldImagePath);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads/youtube';
            $file->move($destination, $newFilename);

            $entry->setImagePath($this->getParameter('back_url') . '/uploads/youtube/' . $newFilename);
            $entry->setImageName($newFilename);
        }

        $em->flush();

        return $this->json([
            'id' => $entry->getId(),
            'hook' => $entry->getHook(),
            'content' => $entry->getContent(),
            'youtubeLink' => $entry->getYoutubeLink(),
            'imagePath' => $entry->getImagePath(),
            'imageName' => $entry->getImageName()
        ], Response::HTTP_OK);
    }
}
