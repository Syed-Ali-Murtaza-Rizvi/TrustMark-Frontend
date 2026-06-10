import { Link } from "react-router-dom";
import logo from "../../assets/footer.png";

const SUPPORT_EMAIL = "TrustMark@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SUPPORT_EMAIL)}`;

const Footer = () => {
  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
           {/* <div className="w-full bg-white h-18 shadow-md flex items-center justify-between px-4"> */}
                {/* Logo */}
                <div>
                <img
                  src={logo}
                  alt="TrustMark Logo"
                  className="w-40 h-27 object-contain cursor-pointer "
                /></div>
          <p>Modern attendance management for the digital age</p>
        </div>

        {/* PRODUCT */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="#features" onClick={scrollToSection("features")}>
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={scrollToSection("pricing")}>
                Pricing
              </a>
            </li>
            
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="#">About Us</Link></li>
            
            <li>
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </a>
            </li>
            
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© 2026 TrustMark. All rights reserved.</span>

        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;