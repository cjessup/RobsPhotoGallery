import { Link } from "react-router-dom";
import { findPhoto, heroPhotoId, homePhotoIds, photoAlt, photoSrc } from "../data/photos";
import { useDocumentTitle } from "../useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Robert Bower");
  const hero = findPhoto(heroPhotoId);
  const supporting = homePhotoIds
    .map((id) => findPhoto(id))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (!hero) return null;

  return (
    <>
      <section className="hero">
        <img
          src={photoSrc(hero.photo.id)}
          alt={photoAlt(hero.photo)}
          style={{ objectPosition: "center 32%" }}
        />
        <div className="hero-copy">
          <p className="eyebrow">Photographer · warpedcitrus</p>
          <h1>Robert Bower</h1>
        </div>
      </section>
      <section className="home-intro">
        <p>A few photographs from the archive. The gallery holds the rest, one picture at a time.</p>
        <Link to="/gallery" className="text-link">
          Enter the gallery
        </Link>
      </section>
      <section className="feature-row" aria-label="Selected photographs">
        {supporting.map((item) => (
          <Link key={item.photo.id} to={`/gallery/${item.photo.id}`} className="feature-tile">
            <img
              src={photoSrc(item.photo.id)}
              alt={photoAlt(item.photo)}
              style={
                item.photo.id === "68507b7db504694f0ee522d1"
                  ? { objectPosition: "center 28%" }
                  : undefined
              }
            />
          </Link>
        ))}
      </section>
    </>
  );
}
