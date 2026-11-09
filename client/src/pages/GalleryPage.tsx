import { Link, useSearchParams } from "react-router-dom";
import { PAGE_SIZE, photoSrc, photos } from "../data/photos";
import { useDocumentTitle } from "../useDocumentTitle";

function parsePage(value: string | null, pageCount: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return 1;
  return Math.min(parsed, pageCount);
}

export function GalleryPage() {
  useDocumentTitle("Gallery · Robert Bower");
  const [searchParams] = useSearchParams();
  const pageCount = Math.max(1, Math.ceil(photos.length / PAGE_SIZE));
  const page = parsePage(searchParams.get("page"), pageCount);
  const start = (page - 1) * PAGE_SIZE;
  const visible = photos.slice(start, start + PAGE_SIZE);

  return (
    <section className="gallery">
      <header className="page-intro">
        <h1>Gallery</h1>
        <p>
          {photos.length} photographs. Open one to look closer, then move to the next. Pages are
          below the grid.
        </p>
      </header>
      <ul className="photo-grid">
        {visible.map((photo, offset) => {
          const number = start + offset + 1;
          return (
            <li key={photo.id}>
              <Link to={`/gallery/${photo.id}`} className="photo-tile">
                <span className="frame">
                  <img src={photoSrc(photo.id)} alt="" />
                </span>
                <span className="tile-label">
                  {photo.caption || `Photograph ${number}`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <nav className="pager" aria-label="Gallery pages">
        {page > 1 ? (
          <Link to={page === 2 ? "/gallery" : `/gallery?page=${page - 1}`}>Previous</Link>
        ) : (
          <span className="pager-edge" aria-hidden="true">
            Previous
          </span>
        )}
        {Array.from({ length: pageCount }, (_, index) => {
          const number = index + 1;
          const to = number === 1 ? "/gallery" : `/gallery?page=${number}`;
          return number === page ? (
            <span key={number} className="current" aria-current="page">
              {number}
            </span>
          ) : (
            <Link key={number} to={to}>
              {number}
            </Link>
          );
        })}
        {page < pageCount ? (
          <Link to={`/gallery?page=${page + 1}`}>Next</Link>
        ) : (
          <span className="pager-edge" aria-hidden="true">
            Next
          </span>
        )}
      </nav>
    </section>
  );
}
