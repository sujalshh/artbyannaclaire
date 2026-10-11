export type GalleryTag = "banner" | "letter" | "gift";

export type GalleryItem = {
  src: string;
  alt: string;
  tag: GalleryTag;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/gallery/IMG_5640-1827f23d-ca90-48cc-bd0e-561fb7cf6479.png",
    alt: "Hand-painted birthday banner with disco ball and balloons",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5641-e3ea870a-e888-4bf4-9b34-590eeb5be609.png",
    alt: "Emily 21st birthday painted kraft banner",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5642-712a54e4-17e3-4f72-ad46-bdcdf3838e59.png",
    alt: "Cherry on top coquette banner for Anastasia",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5643-d6ef7461-4b7d-4e1a-8bba-be286576a432.png",
    alt: "Hadley sweet sixteen scalloped banner",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5644-b1e843fd-97b9-4927-a092-3421f9c11ebb.png",
    alt: "Isabella 21st birthday champagne banner",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5646-02621d12-7f36-4a3e-bfab-dfb6da79f65c.png",
    alt: "Amelia first birthday scalloped banner",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5900-5c057304-c9fb-4718-85df-a144952df1b5.png",
    alt: "Margs & Matrimony bachelorette banner — Madeline, Fort Walton Beach",
    tag: "banner",
  },
  {
    src: "/gallery/IMG_5652-7357e7f8-ff4e-4e35-a05d-5cca9819b088.png",
    alt: "Pearl beaded letter S in pastel gems",
    tag: "letter",
  },
  {
    src: "/gallery/IMG_5647-89dffa55-bae2-464e-a06d-190fa12c727c.png",
    alt: "Floral pearl-trim letter M",
    tag: "letter",
  },
  {
    src: "/gallery/IMG_5645-c794612c-2cf0-470c-b389-61509d899d82.png",
    alt: "Pink stripe letter S with bow and pearls",
    tag: "letter",
  },
  {
    src: "/gallery/IMG_5650-77b0fe8e-596b-42a2-a49d-ee465ff7c28c.png",
    alt: "Gingham pearl letter N",
    tag: "letter",
  },
  {
    src: "/gallery/IMG_5639-3c687fa1-01c5-467a-8609-9afcb32c4838.png",
    alt: "Pearl letter A with pink stripes",
    tag: "letter",
  },
  {
    src: "/gallery/IMG_5649-20defd48-41a4-42fd-a1dd-1f8329ee4cb2.png",
    alt: "18 photo collage pearl album",
    tag: "gift",
  },
  {
    src: "/gallery/IMG_5651-b00d288b-cdd8-4e6b-b9d5-5c38ffd05364.png",
    alt: "Custom rhinestone name claw clips",
    tag: "gift",
  },
  {
    src: "/gallery/IMG_5638-3b7fc064-5546-47d4-afd0-ad0b3548e4e8.png",
    alt: "Personalized pearl and rhinestone hair brushes",
    tag: "gift",
  },
];
