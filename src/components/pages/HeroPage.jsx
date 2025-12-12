import "./HeroPage.css";
import Logo from "../../assets/Logo.svg";

const Navbar = ({ scrolled = false }) => {
  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <img src={Logo} loading="lazy" alt="Logo" />
          <p className="nav-logo-text">
            <span>Sidick</span>Sino
          </p>
        </div>
      </nav>
      <img src={Logo} loading="lazy" alt="Logo" />
    </>
  );
};

export default Navbar;
