/** Photographs from Robert Bower's public VSCO profile, warpedcitrus. Captions are his. */
export type Photo = {
  id: string;
  caption: string;
};

export const photos: Photo[] = [
  { id: "68507b7db504694f0ee522d1", caption: "" },
  { id: "605eca357d62b96e009ab484", caption: "Throwback pt. 13" },
  { id: "605eb322c527f26808c51a85", caption: "Throwback pt. 9" },
  { id: "605ea6f3bd7c6d6503c57039", caption: "Throwback pt. 5" },
  { id: "605ea430bd7c6d6503c57034", caption: "Throwback to a much needed New York trip" },
  { id: "5e6022cb84d0fc7807f3b531", caption: "" },
  {
    id: "64cc1f185b940d15025e8cef",
    caption:
      "I’ve got a lot of film/photos I wanna post on here/Instagram, just haven’t had the energy. Gonna try to get some stuff up soon tho :,)",
  },
  { id: "605ecabf7d62b96e009ab485", caption: "Throwback pt. 14" },
  { id: "605eb3b9c527f26808c51a86", caption: "Throwback pt. 10" },
  { id: "605ea7a7bd7c6d6503c5703a", caption: "Throwback pt. 6" },
  { id: "605ea4edbd7c6d6503c57035", caption: "Throwback pt. 2" },
  { id: "5e60251984d0fc7807f3b536", caption: "" },
  { id: "5e6023aa84d0fc7807f3b533", caption: "" },
  { id: "5e60220d84d0fc7807f3b52f", caption: "" },
  { id: "605ecc357d62b96e009ab487", caption: "" },
  { id: "605ec9597d62b96e009ab483", caption: "Throwback pt. 12" },
  { id: "605eb1e8c527f26808c51a83", caption: "Throwback pt. 7" },
  { id: "605ea596bd7c6d6503c57037", caption: "Throwback pt. 3" },
  { id: "605da67e9fcb5d2407739761", caption: "" },
  { id: "5e60242d84d0fc7807f3b534", caption: "" },
  { id: "5e60226884d0fc7807f3b530", caption: "" },
  { id: "605ecba57d62b96e009ab486", caption: "Head in the clouds" },
  { id: "605ec8707d62b96e009ab482", caption: "Throwback pt. 11" },
  { id: "605eb28dc527f26808c51a84", caption: "Throwback pt. 8" },
  { id: "605ea64cbd7c6d6503c57038", caption: "Throwback pt. 4" },
  { id: "605da6ff9fcb5d2407739762", caption: "" },
  { id: "5e6024ab84d0fc7807f3b535", caption: "" },
  { id: "5e60233e84d0fc7807f3b532", caption: "" },
];

export const PAGE_SIZE = 12;

export const heroPhotoId = "5e6022cb84d0fc7807f3b531";
export const homePhotoIds = ["5e6023aa84d0fc7807f3b533", "68507b7db504694f0ee522d1"];
export const bioPhotoId = "605da6ff9fcb5d2407739762";

export function photoSrc(id: string) {
  return `/photos/${id}.jpg`;
}

export function photoAlt(photo: Photo) {
  return photo.caption || "Photograph by Robert Bower";
}

export function findPhoto(id: string) {
  const index = photos.findIndex((photo) => photo.id === id);
  if (index === -1) return null;
  return { photo: photos[index], index };
}

export function galleryPageForIndex(index: number) {
  return Math.floor(index / PAGE_SIZE) + 1;
}
