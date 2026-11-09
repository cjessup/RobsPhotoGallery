import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/bio", label: "Bio", end: false },
  { to: "/gallery", label: "Gallery", end: false },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <NavLink to="/" className="brand" end>
        Robert Bower
      </NavLink>
      <nav aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
