<?php

namespace App\Entity;

use App\Repository\CarouselSlideRepository;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: CarouselSlideRepository::class)]
class CarouselSlide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $imagePath = null;

    // On passe en type JSON pour stocker plusieurs langues
    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $text = [];

    #[ORM\Column]
    private ?\DateTimeImmutable $createAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): static
    {
        $this->imagePath = $imagePath;
        return $this;
    }

    /**
     * Retourne le texte complet (toutes langues)
     */
    public function getText(): ?array
    {
        return $this->text;
    }

    /**
     * Retourne uniquement le texte dans une langue précise
     */
    public function getTextByLang(string $lang): ?string
    {
        return $this->text[$lang] ?? null;
    }

    /**
     * Définit tout le tableau multi-langue
     */
    public function setText(?array $text): static
    {
        $this->text = $text;
        return $this;
    }

    /**
     * Définit une seule langue
     */
    public function setTextForLang(string $lang, string $value): static
    {
        $this->text[$lang] = $value;
        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeImmutable $createAt): static
    {
        $this->createAt = $createAt;
        return $this;
    }
}

