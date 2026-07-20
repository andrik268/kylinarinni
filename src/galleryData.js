const galleryPaths = (slug, count) =>
  Array.from({ length: count }, (_, index) => `/gallery/${slug}/${String(index + 1).padStart(2, "0")}.jpg`);

export const serviceGallery = {
  wedding: {
    label: "Свадебные",
    images: galleryPaths("wedding", 23),
  },
  kids: {
    label: "Детские",
    images: galleryPaths("kids", 24),
  },
  wow: {
    label: "3D и антигравитация",
    images: galleryPaths("wow", 10),
  },
  corporate: {
    label: "Корпоративные",
    images: galleryPaths("corporate", 11),
  },
  graduation: {
    label: "Выпускные",
    images: galleryPaths("graduation", 8),
  },
  mens: {
    label: "Мужские",
    images: galleryPaths("mens", 18),
  },
  women: {
    label: "Для дам",
    images: galleryPaths("women", 20),
  },
  family: {
    label: "Гендер пати, выписка, крестины",
    images: galleryPaths("family", 14),
  },
  masterclasses: {
    label: "Мастер-классы",
    images: galleryPaths("masterclasses", 17),
  },
};
