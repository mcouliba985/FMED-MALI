<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Repository\ArticlesRepository;
use App\Services\NewsletterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/articles')]
class ArticlesController extends AbstractController
{
    #[Route('/create', name: 'create_article', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger,
    ): Response {
        // Récupérer les données JSON depuis la clé "informations"
        $data = json_decode($request->request->get('informations'), true);
        $file = $request->files->get('source');

        // Vérifier si les données nécessaires sont présentes
        if (empty($data['title']) || empty($data['hook']) || empty($data['content'])) {
            return $this->json(['message' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        // Créer l'article
        $article = new Articles();
        $article->setTitle($data['title']);
        $article->setHook($data['hook']);
        $article->setContent($data['content']);
        $article->setType($data['type'] ?? '');
        $article->setArchive($data['archive'] ?? false);
        $article->setStatus($data['status'] ?? '');
        $article->setCategory($data['category'] ?? '');
        $article->setCreateAt(new \DateTimeImmutable());

        // Gestion du fichier image
        if ($file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            // Déplacer le fichier dans le dossier des uploads
            $file->move($this->getParameter('kernel.project_dir') . '/public/uploads/articles', $newFilename);

            // Mettre à jour les informations de l'image dans l'article
            $article->setImageName($newFilename);
            $article->setImagePath($this->getParameter('back_url') . '/uploads/articles/' . $newFilename);
        }

        // Enregistrer l'article en base de données
        $em->persist($article);
        $em->flush();

        return new JsonResponse([
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'hook' => $article->getHook(),
            'content' => $article->getContent(),
            'type' => $article->getType(),
            'archive' => $article->isArchive(),
            'status' => $article->getStatus(),
            'category' => $article->getCategory(),
            'imageName' => $article->getImageName(),
            'imagePath' => $article->getImagePath(),
            'createAt' => $article->getCreateAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/published', name: 'read_published_articles', methods: ['GET'])]
    public function readPublishArticle(EntityManagerInterface $em): Response
    {
        // Récupérer uniquement les articles avec le statut 'published', triés par date décroissante
        $articles = $em->getRepository(Articles::class)->findBy(
            ['status' => 'published'],
            ['createAt' => 'DESC']
        );

        if (empty($articles)) {
            return $this->json(['message' => 'No published articles found'], Response::HTTP_NOT_FOUND);
        }

        $articlesArray = array_map(fn($article) => [
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'hook' => $article->getHook(),
            'content' => $article->getContent(),
            'type' => $article->getType(),
            'status' => $article->getStatus(),
            'category' => $article->getCategory(),
            'createAt' => $article->getCreateAt()->format('Y-m-d H:i:s'),
            'imageName' => $article->getImageName(),
            'imagePath' => $article->getImagePath(),
        ], $articles);

        return $this->json($articlesArray, Response::HTTP_OK);
    }

    #[Route('', name: 'read_all_articles', methods: ['GET'])]
    public function readAll(EntityManagerInterface $em): Response
    {
        // On récupère les articles triés par date de création décroissante
        $articles = $em->getRepository(Articles::class)->findBy([], ['createAt' => 'DESC']);

        if (empty($articles)) {
            return $this->json(['message' => 'No articles found'], Response::HTTP_NOT_FOUND);
        }

        $articlesArray = array_map(fn($article) => [
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'hook' => $article->getHook(),
            'content' => $article->getContent(),
            'type' => $article->getType(),
            'status' => $article->getStatus(),
            'category' => $article->getCategory(),
            'createAt' => $article->getCreateAt()->format('Y-m-d H:i:s'),
            'imageName' => $article->getImageName(),
            'imagePath' => $article->getImagePath(),
        ], $articles);

        return $this->json($articlesArray, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'read_one_article', methods: ['GET'])]
    public function readOne(int $id, EntityManagerInterface $em): Response
    {
        $article = $em->getRepository(Articles::class)->find($id);

        if (!$article) {
            return $this->json(['message' => 'Article not found'], Response::HTTP_NOT_FOUND);
        }

        $articleData = [
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'hook' => $article->getHook(),
            'content' => $article->getContent(),
            'type' => $article->getType(),
            'status' => $article->getStatus(),
            'category' => $article->getCategory(),
            'createAt' => $article->getCreateAt()->format('Y-m-d H:i:s'),
            'imageName' => $article->getImageName(),
            'imagePath' => $article->getImagePath(),
        ];

        return $this->json($articleData, Response::HTTP_OK);
    }

    #[Route('/{id}/status', name: 'update_status', methods: ['PUT'])]
    public function updateStatus(
        int $id,
        Request $request,
        ArticlesRepository $articlesRepository,
        EntityManagerInterface $em,
        NewsletterService $newsletterService
    ): JsonResponse {
        $article = $articlesRepository->find($id);

        if (!$article) {
            return new JsonResponse(['message' => 'Article non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $newStatus = $data['status'] ?? null;

        $allowedStatuses = ['draft', 'published', 'disabled'];
        if (!in_array($newStatus, $allowedStatuses, true)) {
            return new JsonResponse(['message' => 'Statut invalide'], Response::HTTP_BAD_REQUEST);
        }

        // Mise à jour du statut
        $article->setStatus($newStatus);

        // Envoyer aux abonnés uniquement si l'article est publié
        if ($newStatus === 'published') {
            $newsletterService->sendArticleToSubscribers($article);
        }

        $em->flush();

        return new JsonResponse([
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'status' => $article->getStatus(),
        ], Response::HTTP_OK);
    }
}
