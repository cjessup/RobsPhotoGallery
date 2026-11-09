import { bioPhotoId, findPhoto, photoSrc } from "../data/photos";
import { useDocumentTitle } from "../useDocumentTitle";

export function BioPage() {
  useDocumentTitle("Bio · Robert Bower");
  const photo = findPhoto(bioPhotoId);

  return (
    <article className="bio">
      {photo ? (
        <img src={photoSrc(photo.photo.id)} alt="Photograph by Robert Bower" />
      ) : null}
      <div className="bio-copy">
        <p className="eyebrow">Photographer</p>
        <h1>Robert Bower</h1>
        <p>
          Robert Bower makes photographs under the name warpedcitrus. The pictures often hold a
          person, a road, or a building inside a much larger scene: desert hills, a dune under a
          wide sky, a pool lit at night, streets and rooms in passing cities.
        </p>
        <p>
          What is here comes from the photographs he has shared publicly. Digital files, prints,
          and postcards of each picture will be offered from the gallery.
        </p>
        <p className="draft">Draft biography. Replace this copy with Robert’s own words.</p>
      </div>
    </article>
  );
}
