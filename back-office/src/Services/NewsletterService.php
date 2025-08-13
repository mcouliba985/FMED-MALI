<?php
namespace App\Services;

use App\Entity\Articles;
use App\Entity\NewsletterSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class NewsletterService
{
    private $em;
    private $mailer;
    private $router;

    public function __construct(EntityManagerInterface $em, MailerInterface $mailer, UrlGeneratorInterface $router)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->router = $router;
    }

    public function sendArticleToSubscribers(Articles $article): void
    {
        $subscribers = $this->em->getRepository(NewsletterSubscriber::class)->findAll();

        // Récupération sécurisée du titre
        $title = $article->getTitle();
        if (is_array($title)) {
            $title = $title['fr'] ?? reset($title);  // FR sinon première dispo
        }

        foreach ($subscribers as $subscriber) {
            $unsubscribeUrl = $this->router->generate('newsletter_unsubscribe', [
                'id' => $subscriber->getId(),
            ], UrlGeneratorInterface::ABSOLUTE_URL);

            $email = (new TemplatedEmail())
                ->from('info@fmed.ml')
                ->to($subscriber->getEmail())
                ->subject('📰 Nouvel article : ' . $title)
                ->htmlTemplate('newsletter/newsletter_article.html.twig')
                ->context([
                    'article' => $article,
                    'unsubscribeUrl' => $unsubscribeUrl,
                ]);

            $email->getHeaders()->addTextHeader('X-Mailer', 'Symfony Mailer');

            $this->mailer->send($email);
        }
    }
}
