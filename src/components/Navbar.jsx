import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-15 flex items-center justify-end py-6">
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href="https://github.com/bryansbtian?tab=repositories">
          <FaGithub />
        </a>

        <a href="https://www.linkedin.com/in/bry189/">
          <FaLinkedin />
        </a>

        <a href="https://www.instagram.com/bryansbtian/">
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
