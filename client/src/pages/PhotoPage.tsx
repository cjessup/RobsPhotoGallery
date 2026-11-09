import { useEffect, useRef, type TouchEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PurchaseOptions } from "../components/PurchaseOptions";
import {
  findPhoto,
  galleryPageForIndex,
  photoAlt,
  photoSrc,
  photos,
} from "../data/photos";
import { useDocumentTitle } from "../useDocumentTitle";

export function PhotoPage() {
  const { id } = useParams();
  const found = id ? findPhoto(id) : null;
  const navigate = useNavigate();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const title = found
    ? `${found.photo.caption || "Photograph"} · Robert Bower`
    : "Photograph · Robert Bower";
  useDocumentTitle(title);

  const index = found?.index ?? -1;
  const prev = index > 0 ? photos[index - 1] : null;
  const next = index >= 0 && index < photos.length - 1 ? photos[index + 1] : null;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON" || tag === "A" || tag === "LABEL") {
          return;
        }
      }
      if (event.key === "ArrowLeft" && prev) navigate(`/gallery/${prev.id}`);
      if (event.key === "ArrowRight" && next) navigate(`/gallery/${next.id}`);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, next, prev]);

  if (!found) {
    return (
      <section className="page-intro">
        <h1>Photograph not found</h1>
        <p>
          <Link to="/gallery" className="text-link">
            Back to the gallery
          </Link>
        </p>
      </section>
    );
  }

  const { photo } = found;
  const page = galleryPageForIndex(index);

  function onTouchStart(event: TouchEvent) {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0 && prev) navigate(`/gallery/${prev.id}`);
    if (dx < 0 && next) navigate(`/gallery/${next.id}`);
  }

  return (
    <article className="photo-page">
      <p className="back-row">
        <Link to={page === 1 ? "/gallery" : `/gallery?page=${page}`}>Back to gallery</Link>
      </p>
      <div className="photo-layout">
        <div>
          <figure
            className="photo-frame"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img src={photoSrc(photo.id)} alt={photoAlt(photo)} />
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
          <div className="photo-nav">
            {prev ? (
              <Link to={`/gallery/${prev.id}`}>Previous</Link>
            ) : (
              <span className="nav-edge">Previous</span>
            )}
            <p>
              {index + 1} of {photos.length}
            </p>
            {next ? (
              <Link to={`/gallery/${next.id}`}>Next</Link>
            ) : (
              <span className="nav-edge next-edge">Next</span>
            )}
          </div>
        </div>
        <PurchaseOptions key={photo.id} />
      </div>
    </article>
  );
}
