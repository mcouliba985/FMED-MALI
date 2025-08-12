<?php

namespace App\Entity;

use App\Repository\TestimonialsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TestimonialsRepository::class)]
class Testimonials
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // Garder fullName en string simple
    #[ORM\Column(length: 255)]
    private ?string $fullName = null;

    // Poste multilingue JSON
    #[ORM\Column(type: 'json')]
    private array $poste = [];

    // Message multilingue JSON
    #[ORM\Column(type: 'json')]
    private array $message = [];

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePath = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imageName = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;
        return $this;
    }

    public function getPoste(): array
    {
        return $this->poste;
    }

    public function setPoste(array $poste): static
    {
        $this->poste = $poste;
        return $this;
    }

    public function getMessage(): array
    {
        return $this->message;
    }

    public function setMessage(array $message): static
    {
        $this->message = $message;
        return $this;
    
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): static
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(?string $imageName): static
    {
        $this->imageName = $imageName;

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

