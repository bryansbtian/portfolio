import project1 from "../assets/projects/prj1.jpeg";
import project2 from "../assets/projects/prj2.jpeg";
import project3 from "../assets/projects/prj3.jpeg";
import project4 from "../assets/projects/prj4.jpeg";

export const HERO_CONTENT = `I am a junior student at the University of Michigan majoring in Computer Science with a strong passion for full-stack web development. My skills include programming languages like Python, Java, and C++, as well as expertise in web technologies such as ReactJS, NodeJS, ExpressJS, MongoDB, HTML5, CSS3, Tailwind CSS, Framer Motion, and JavaScript. I enjoy building dynamic and interactive web applications and continuously strive to enhance my knowledge and skills in the tech field.`;

export const ABOUT_TEXT = `I am a motivated and versatile full stack developer who is passionate about building efficient and user-friendly online applications. I've worked with several technologies, including React, Node.js, Express.js, and MongoDB. My interest in web development began with a profound curiosity about how things function, and it has grown into a career in which I always seek to learn and adapt to new difficulties. I thrive in collaborative settings and appreciate resolving challenging problems to produce high-quality results. Aside from coding, I enjoy remaining active by playing basketball, learning new technologies, and contributing to open-source projects.
`;

export const EXPERIENCES = [
  {
    year: "Jun 2024 - Sep 2024",
    role: "Web Developer Intern",
    company: "Dark Paladin Pictures",
    description: `Optimized website performance, scalability, and security through code refactoring. Developed and maintained front-end and back-end components of web applications, focusing on seamless user experiences and functionality. Supported the ongoing development and maintenance of a broadcasting website.`,
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    year: "Nov 2023 - Jun 2024",
    role: "Theater Tech I",
    company: "Shoreline Community College",
    description: `Set up and maintained lighting and sound systems to ensure proper functionality. Provided technical support for various theater-related software and programs while managing and updating digital equipment to maintain security and operational efficiency.`,
    technologies: [],
  },
];

export const PROJECTS = [
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "Developed a full-featured eCommerce website with a user-friendly interface, integrated shopping cart, and responsive design.",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Portfolio Website",
    image: project2,
    description:
      "Created a portfolio website to display projects created.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript", "React.js", "Framer Motion"],
  },
  {
    title: "Self Watering Plant System",
    image: project3,
    description:
      "Created an automated self-watering plant system that monitors soil moisture levels and waters plants as needed. The system uses sensors to detect when water is required and activates a pump to deliver the right amount, ensuring plants remain healthy with minimal manual intervention.",
    technologies: ["ArduinoUno", "C++"],
  },
  {
    title: "Smart Blind Stick",
    image: project4,
    description:
      "Developed a smart blind stick with sensors for obstacle detection and navigation assistance. The stick provides real-time alerts by buzzing, enhancing safety and mobility for visually impaired individuals.",
    technologies: ["ArduinoUno", "C++"],
  },
];

export const CONTACT = {
  address: "Ann Arbor, Michigan 48105",
  phoneNo: "+1 (206) 931-3369",
  email: "bryan.sebastian189@gmail.com",
};
