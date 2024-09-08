import logo from '../assets/logo.jpeg'
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';


const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <a href="/"><img className='mx-2 w-10' src={logo} alt="" /></a>
        </div>
        <div className="m-8 flex items-center justify-center gap-4 text-2xl">
            <a href='https://github.com/bryansbtian?tab=repositories'><FaGithub /></a>
            <a href='https://www.linkedin.com/in/bry189/'><FaLinkedin /></a>
            <a href='https://www.instagram.com/bryansbtian/'><FaInstagram /></a>
        </div>
    </nav>
  );
};

export default Navbar