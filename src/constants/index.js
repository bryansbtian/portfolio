import project1 from "../assets/projects/prj1.jpeg";
import project2 from "../assets/projects/prj2.jpeg";
import project3 from "../assets/projects/prj3.jpeg";
import project4 from "../assets/projects/prj4.jpeg";
import project5 from "../assets/projects/prj5.jpeg";
import project6 from "../assets/projects/prj6.jpeg";
import project7 from "../assets/projects/prj7.jpeg";
import project8 from "../assets/projects/prj8.jpeg";
import project9 from "../assets/projects/prj9.jpeg";

export const HERO_CONTENT = `I am a junior student at the University of Michigan majoring in Computer Science and double majoring in Data Science with a strong passion for full-stack web development and software engineering. My skills include programming languages like Python, Java, Javascript, and C++, as well as expertise in technologies such as ReactJS, NodeJS, ExpressJS, MongoDB, HTML5, CSS3, Tailwind CSS, Framer Motion, PyTorch, TensorFlow, ResNet-50, and OpenCV. I enjoy building dynamic and interactive web applications and continuously strive to enhance my knowledge and skills in the tech field.`;

export const ABOUT_TEXT = `I am a motivated and versatile full stack developer who is passionate about building efficient and user-friendly online applications. I've worked with several technologies, including React, Node.js, Express.js, and MongoDB. My interest in web development began with a profound curiosity about how things function, and it has grown into a career in which I always seek to learn and adapt to new difficulties. I thrive in collaborative settings and appreciate resolving challenging problems to produce high-quality results. Aside from coding, I enjoy remaining active by playing basketball, learning new technologies, and contributing to open-source projects.
`;

export const EXPERIENCES = [
  {
    year: "May 2025 - Aug 2025",
    role: "Risk Assurance - Data Analytics Intern ",
    company: "PricewaterhouseCoopers",
    description: `Developed a Generative AI-based financial analytics system for a leading Southeast Asian state enterprise bank, integrating large language models (LLMs) to summarize complex transactional trends and highlight anomalies in financial positions. Supported backend implementation of Model Context Protocol (MCP) tools and custom servers to orchestrate secure, modular execution of AI workflows, enabling scalable prompt-response pipelines across diverse financial data use cases. Streamlined daily insight generation by engineering asynchronous task execution and automating financial summary generation, improving data turnaround time and enhancing interpretability for both regional and national reporting levels.`,
    technologies: [
      "Python",
      "Large Language Models (LLM)",
      "Model Context Protocol (MCP)",
      "Generative AI",
      "Workflow Automation",
      "Financial Risk Analysis",
    ],
  },
  {
    year: "Jan 2025 - May 2025",
    role: "Research Assistant",
    company: "University of Michigan",
    description: `Conducted research on data privacy and anonymization techniques for large language models (LLMs), focusing on protecting user data through efficient, local on-device processing. Collaborated on methods to anonymize prompts and prevent exposure of sensitive user information, ensuring compliance with privacy standards. Explored strategies to generate datasets that balance utility and privacy, identifying and mitigating risks tied to prompt structures and usage patterns.`,
    technologies: [
      "Python",
      "Data Privacy",
      "Large Language Models (LLM)",
      "Anonymization Techniques",
    ],
  },
  {
    year: "Jan 2025 - Apr 2025",
    role: "Software Engineer Intern",
    company: "Cryonix AI",
    description: `Developed and optimized machine learning models to enhance AI-driven applications' accuracy and efficiency. Implemented and integrated APIs to enable seamless data exchange between AI models and front-end applications. Conducted research on emerging AI technologies to drive innovation and improve company products.`,
    technologies: ["HTML", "CSS", "Python Flask"],
  },
  {
    year: "Sep 2024 - Dec 2024",
    role: "Frontend Software Engineer Intern",
    company: "SocialTech Labs",
    description: `Developed a real-time live streaming feature using SwiftUI, enabling seamless video broadcasting and interactive audience engagement. Built interactive SwiftUI components such as live chat overlays, reaction animations, and dynamic audience polls to enhance user participation. Integrated RESTful APIs to support smooth video streaming, real-time comments, and viewer analytics, optimizing performance for a scalable and engaging user experience.`,
    technologies: [
      "SwiftUI",
      "RESTful APIs",
      "Amazon Web Services",
      "HTTP Live Streaming",
    ],
  },
  {
    year: "Jun 2024 - Sep 2024",
    role: "Full Stack Software Engineer Intern",
    company: "Dark Paladin Pictures",
    description: `Optimized full-stack application performance by refactoring website code and implementing efficient workflows,
achieving a 30% reduction in page load time while bolstering security measures to safeguard user data. Developed RESTful APIs to integrate front-end applications with back-end services, improving data flow efficiency. Collaborated with cross-functional teams, including marketing and product, to design and deploy robust web features, aligning with business objectives and user requirements.`,
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
    ],
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
    title: "Facial Emotion Detector",
    image: project6,
    description:
      "Developed a real-time facial emotion detection system using Convolutional Neural Networks (CNNs) to classify emotions from facial expressions captured via webcam. Utilized OpenCV for face detection and TensorFlow for accurate emotion predictions across seven categories.",
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "Haar Cascade Classifiers",
    ],
  },
  {
    title: "Mood Tracker App",
    image: project8,
    description:
      "Developed a React.js-based mood tracking application with an Express.js backend, enabling users to log daily emotions and notes seamlessly. Integrated machine learning for predictive mood insights and weekly summaries, enhancing user self-awareness. Designed a responsive and interactive interface for a smooth tracking experience.",
    technologies: [
      "React.js",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Python",
      "RESTful APIs",
    ],
  },
  {
    title: "Financial Data Filtering App",
    image: project7,
    description:
      "Developed a React.js-based financial data filtering app with a dynamic UI, enabling users to sort and analyze financial data. Integrated Financial Modeling Prep API for real-time data and leveraged React Table & Tailwind CSS for seamless interaction.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Financial Modeling Prep API",
    ],
  },
  {
    title: "Stock Market Prediction",
    image: project5,
    description:
      "Designed a machine learning model to predict stock trends by analyzing historical data and simulating market scenarios, empowering users with strategic financial insights.",
    technologies: ["Python", "Pandas", "Scikit-Learn"],
  },
  {
    title: "Weather App",
    image: project9,
    description:
      "Developed a responsive weather application integrating the OpenWeather API to provide real-time forecasts, historical weather data, and environmental metrics. Implemented features like current weather conditions with visual icons, 5-day forecasts, air quality index breakdown, sunrise/sunset times, and hourly temperature predictions, ensuring an intuitive and data-rich user experience.",
    technologies: ["HTML", "CSS", "JavaScript", "OpenWeather API", "Fetch API"],
  },
  {
    title: "Car Brand Classification",
    image: project4,
    description:
      "Developed a machine learning model using Convolutional Neural Networks (CNNs) and transfer learning with the ResNet-50 architecture to classify car brands from images.",
    technologies: ["Python", "PyTorch", "TensorFlow", "ResNet-50", "OpenCV"],
  },
  {
    title: "E-commerce Website",
    image: project3,
    description:
      "Developed a full-featured e-commerce website with a user-friendly interface, integrated shopping cart, and responsive design.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    title: "Smart Blind Stick",
    image: project1,
    description:
      "Developed a smart blind stick with sensors for obstacle detection and navigation assistance. The stick provides real-time alerts by buzzing, enhancing safety and mobility for visually impaired individuals.",
    technologies: ["ArduinoUno", "C++"],
  },
  {
    title: "Self Watering Plant System",
    image: project2,
    description:
      "Created an automated self-watering plant system that monitors soil moisture levels and waters plants as needed. The system uses sensors to detect when water is required and activates a pump to deliver the right amount, ensuring plants remain healthy with minimal manual intervention.",
    technologies: ["ArduinoUno", "C++"],
  },
];

export const CONTACT = {
  address: "Ann Arbor, Michigan 48105",
  phoneNo: "+1 (206) 931-3369",
  email: "bryansusanto22@gmail.com",
};
