import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { BioPage } from "./pages/BioPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { PhotoPage } from "./pages/PhotoPage";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

function NotFound() {
  return (
    <section className="page-intro">
      <h1>Page not found</h1>
      <p>
        <Link to="/" className="text-link">
          Return home
        </Link>
      </p>
    </section>
  );
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <div className="site">
        <SiteHeader />
        <main id="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bio" element={<BioPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:id" element={<PhotoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
