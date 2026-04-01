import {
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: <FaInstagram/>, href:"#"},
  { icon: <FaFacebookF/>, href:"#"},
  { icon: <FaXTwitter/>, href:"#"},
  { icon: <FaLinkedin/>, href:"#"},
  { icon: <FaYoutube/>, href:"#"},
]

export const Footer = () => {
  return (
    <footer className=" border-t-1 border-black w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 text-left">
            <Link to="about" className="text-muted-foreground hover:text-primary">About us</Link>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3>Our social</h3>
            <div  className="flex flex-row gap-4 mt-2">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-muted-foreground hover:text-primary">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1 text-right">
            <h3>Contact us</h3>
            <Link to="mailto:" className="text-muted-foreground hover:text-primary"></Link>
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-center">
          <p className="text-sm text-muted-foreground">© 2026 VolunNear</p>
        </div>
      </div>
    </footer>
  )
}