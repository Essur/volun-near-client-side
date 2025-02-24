import {
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FooterBottom,
  FooterColumn,
  FooterContainer,
  FooterLink,
  SocialIcons,
  StyledFooter,
} from "../styles/StyledFooter";

const Footer: React.FC = () => {
  return (
    <>
      <StyledFooter>
        <FooterContainer>
          <FooterColumn>
            <h3>Useful info</h3>
          </FooterColumn>

          <FooterColumn>
            <h3>About us</h3>
            <FooterLink to="/about">About</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <h3>Our social</h3>
            <SocialIcons>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaXTwitter />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </SocialIcons>
          </FooterColumn>

          <FooterColumn>
            <h3>Contact us</h3>
            <FooterLink to="mailto:asus15oleg@gmail.com">
              asus15oleg@gmail.com
            </FooterLink>
          </FooterColumn>
        </FooterContainer>

        <FooterBottom>© 2025 VolunNear App</FooterBottom>
      </StyledFooter>
    </>
  );
};

export default Footer;
