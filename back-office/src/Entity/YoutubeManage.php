<?php

namespace App\Entity;

use App\Repository\YoutubeManageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: YoutubeManageRepository::class)]
class YoutubeManage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'json')]
    private array $hook = [];  // { "fr": "...", "en": "..." }

    #[ORM\Column(type: 'json')]
    private array $content = [];  // { "fr": "...", "en": "..." }

    #[ORM\Column(length: 255)]
    private ?string $youtubeLink = null;

    #[ORM\Column(length: 255)]
    private ?string $imagePath = null;

    #[ORM\Column(length: 255)]
    private ?string $imageName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHook(?string $locale = null): mixed
    {
        return $locale ? ($this->hook[$locale] ?? null) : $this->hook;
    }

    public function setHook(array $hook): static
    {
        $this->hook = $hook;
        return $this;
    }

    public function getContent(?string $locale = null): mixed
    {
        return $locale ? ($this->content[$locale] ?? null) : $this->content;
    }

    public function setContent(array $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getYoutubeLink(): ?string
    {
        return $this->youtubeLink;
    }

    public function setYoutubeLink(string $youtubeLink): static
    {
        $this->youtubeLink = $youtubeLink;
        return $this;
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

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(string $imageName): static
    {
        $this->imageName = $imageName;
        return $this;
    }
}
