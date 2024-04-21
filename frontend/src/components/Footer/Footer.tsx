import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="Footer">
      <div className="footer-right">© כל הזכויות שמורות לטום עמר</div>
      <div className="footer-center">
        <img src={logo} alt="גדוד 373" onClick={() => navigate("/")} />
      </div>
      <div className="footer-left">
        עיצוב ובניית האתר - <a href="https://tomamar.me/">Tom Amar</a>
      </div>
    </div>
  );
};

export default Footer;
