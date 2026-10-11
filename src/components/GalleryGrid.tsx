import Image from "next/image";
import { GALLERY } from "@/lib/gallery";

type Tag = "banner" | "letter" | "gift";

export function GalleryGrid({
  filter,
  tag,
  tags,
  limit,
}: {
  filter?: Tag;
  tag?: Tag;
  tags?: Tag[];
  limit?: number;
}) {
  const active = tag ?? filter;
  let items = GALLERY;
  if (tags?.length) {
    items = GALLERY.filter((g) => tags.includes(g.tag));
  } else if (active) {
    items = GALLERY.filter((g) => g.tag === active);
  }
  if (limit != null) items = items.slice(0, limit);

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <figure
          key={item.src}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md shadow-pink/20"
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={800}
            height={1000}
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </figure>
      ))}
    </div>
  );
}
