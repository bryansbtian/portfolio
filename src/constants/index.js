import project1 from "../assets/projects/prj1.jpeg";
import project2 from "../assets/projects/prj2.jpeg";
import project3 from "../assets/projects/prj3.jpeg";
import project4 from "../assets/projects/prj4.jpeg";
import project5 from "../assets/projects/prj5.jpeg";

export const HERO_CONTENT = `I am a junior student at the University of Michigan majoring in Computer Science and double majoring in Data Science with a strong passion for full-stack web development and software engineering. My skills include programming languages like Python, Java, Javascript, and C++, as well as expertise in technologies such as ReactJS, NodeJS, ExpressJS, MongoDB, HTML5, CSS3, Tailwind CSS, Framer Motion, PyTorch, TensorFlow, ResNet-50, and OpenCV. I enjoy building dynamic and interactive web applications and continuously strive to enhance my knowledge and skills in the tech field.`;

export const ABOUT_TEXT = `I am a motivated and versatile full stack developer who is passionate about building efficient and user-friendly online applications. I've worked with several technologies, including React, Node.js, Express.js, and MongoDB. My interest in web development began with a profound curiosity about how things function, and it has grown into a career in which I always seek to learn and adapt to new difficulties. I thrive in collaborative settings and appreciate resolving challenging problems to produce high-quality results. Aside from coding, I enjoy remaining active by playing basketball, learning new technologies, and contributing to open-source projects.
`;

export const EXPERIENCES = [
  {
    year: "Jun 2024 - Sep 2024",
    role: "Full Stack Software Engineer Intern",
    company: "Dark Paladin Pictures",
    description: `Optimized full-stack application performance by refactoring website code and implementing efficient workflows,
achieving a 30% reduction in page load time while bolstering security measures to safeguard user data. Developed RESTful APIs to integrate front-end applications with back-end services, improving data flow efficiency. Collaborated with cross-functional teams, including marketing and product, to design and deploy robust web features, aligning with business objectives and user requirements.`,
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    year: "Nov 2023 - Jun 2024",
    role: "Theater Tech I",
    company: "Shoreline Community College",
    description: `Enhanced technical operations by deploying a ticketing system for software issues, resulting in over 100 resolved inquiries per month and enabling the production team to focus on creative tasks rather than technical challenges. Secured digital equipment through regular updates and maintenance, ensuring operational safety.`,
    technologies: [],
  },
];

export const PROJECTS = [
  {
    title: "Stock Market Prediction",
    image: project1,
    description:
      "Designed a machine learning model to predict stock trends by analyzing historical data and simulating market scenarios, empowering users with strategic financial insights.",
    technologies: ["Python", "Pandas", "Scikit-Learn"],
  },
  {
    title: "Car Brand Classification",
    image: project2,
    description:
      "Developed a machine learning model using Convolutional Neural Networks (CNNs) and transfer learning with the ResNet-50 architecture to classify car brands from images.",
    technologies: ["Python", "PyTorch", "TensorFlow", "ResNet-50", "OpenCV"],
  },
  {
    title: "E-commerce Website",
    image: project3,
    description:
      "Developed a full-featured e-commerce website with a user-friendly interface, integrated shopping cart, and responsive design.",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Self Watering Plant System",
    image: project4,
    description:
      "Created an automated self-watering plant system that monitors soil moisture levels and waters plants as needed. The system uses sensors to detect when water is required and activates a pump to deliver the right amount, ensuring plants remain healthy with minimal manual intervention.",
    technologies: ["ArduinoUno", "C++"],
  },
  {
    title: "Smart Blind Stick",
    image: project5,
    description:
      "Developed a smart blind stick with sensors for obstacle detection and navigation assistance. The stick provides real-time alerts by buzzing, enhancing safety and mobility for visually impaired individuals.",
    technologies: ["ArduinoUno", "C++"],
  },
];

export const CONTACT = {
  address: "Ann Arbor, Michigan 48105",
  phoneNo: "+1 (206) 931-3369",
  email: "bryansusanto22@gmail.com",
};
