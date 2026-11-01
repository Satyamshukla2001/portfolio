// Static content. Projects fall back to this list when the API is unreachable.
export const profile = {
  name: 'Satyam Shukla',
  roles: ['full-stack products', 'REST APIs that hold up', 'object detection models', 'Flutter and React interfaces'],
  location: 'Lucknow, India',
  email: 'satyamshukla0021@gmail.com',
  github: 'https://github.com/Satyamshukla2001',
  linkedin: 'https://www.linkedin.com/in/satyam-shukla-45bb30220',
  intro:
    'I build things end to end: the API and database underneath, the React or Flutter screen on top, and the machine learning when a product needs to see or predict something.',
  about: [
    'I graduated in Computer Science and Engineering in 2025 from SR Institute of Management & Technology, Lucknow, and have since worked across fintech, e-commerce and AI internships.',
    'My favourite problems sit where backend rules meet real usage: preventing two open shifts at the same moment, turning an order into an invoice, or comparing three YOLO versions on the same dataset.',
    'I was a first round runner-up in the Flipkart Grid 6.0 AI/ML hackathon among 10,000+ participants. I am open to SDE, full-stack and AI/ML roles.'
  ]
};

export const experience = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Bluestock Fintech',
    period: '2024',
    where: 'Remote, Lucknow',
    points: [
      'Designed a server health monitoring system in Django that improved alert response time and observability for edge servers.',
      'Built REST APIs with Express.js and Python for real-time communication and configuration updates between services.',
      'Worked across teams to bring in new backend technologies and cut deployment friction.'
    ]
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Web Stack Academy',
    period: '2024',
    where: 'Remote, Lucknow',
    points: [
      'Built a food delivery app with user authentication, cart management and order tracking.',
      'Integrated Cloudinary for media and Mailtrap for OTP and order confirmation emails.',
      'Implemented an e-invoicing module and CRUD APIs tested in Postman.'
    ]
  },
  {
    role: 'AI with Microsoft Azure Intern',
    company: 'Wayspire EdTech Pvt. Ltd.',
    period: '2024',
    where: 'Remote, Lucknow',
    points: [
      'Ran data preprocessing, exploratory analysis and visualisation with Pandas, NumPy and Seaborn.',
      'Built a real-time object detection system with YOLOv5, tested on COCO and custom datasets.',
      'Applied regression models in Scikit-learn to predict outcomes.'
    ]
  }
];

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'Python', 'SQL', 'Dart', 'Java'] },
  { group: 'Web and APIs', items: ['React', 'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Vite', 'REST', 'JWT'] },
  { group: 'Mobile', items: ['Flutter', 'React Native'] },
  { group: 'AI and data', items: ['PyTorch', 'TensorFlow', 'YOLO', 'Scikit-learn', 'Pandas', 'NumPy', 'Seaborn'] },
  { group: 'Data stores', items: ['MongoDB Atlas', 'PostgreSQL', 'SQLite'] },
  { group: 'Tooling', items: ['Git', 'Docker', 'Postman', 'Pytest', 'Stripe', 'Cloudinary'] }
];

export const achievements = [
  { title: 'Flipkart Grid 6.0, AI/ML track', text: 'First round runner-up among 10,000+ participants nationwide.' },
  { title: 'TVS Credit E.P.I.C 6.0', text: 'Selected participant in a national entrepreneurship and innovation challenge.' },
  { title: 'EMERTXE quiz', text: 'First place in an embedded systems quiz.' },
  { title: "Technostrophe '24", text: 'Participant in a competitive tech challenge on Unstop.' }
];

const G = 'https://github.com/Satyamshukla2001';
export const fallbackProjects = [
  { _id: 'p1', title: 'Order-It', subtitle: 'E-invoicing food delivery platform', category: 'fullstack', featured: true,
    summary: 'Full-stack food delivery platform with a React (Vite) web app, an Express and MongoDB API, Stripe payments and a React Native (Expo) mobile app.',
    highlights: ['End-to-end order flow with Stripe payments and automated e-invoice generation.', 'Cloudinary for images, Mailtrap for OTP, confirmation and invoice emails.'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Cloudinary', 'React Native'], repoUrl: `${G}/FoodOrder_Complete` },
  { _id: 'p2', title: 'Employee Attendance & Analytics API', subtitle: 'Punch-in/out with audited corrections', category: 'fullstack', featured: true,
    summary: 'FastAPI and MongoDB attendance service with punch-in/out, audited corrections, and daily, monthly and department analytics.',
    highlights: ['Race-safe one-open-shift rule enforced by a MongoDB partial unique index.', 'Corrections use optimistic concurrency and an append-only audit log.', 'Aggregation pipelines for daily hours, department summaries and late arrivals.'],
    stack: ['Python', 'FastAPI', 'MongoDB', 'Motor', 'Pydantic', 'Docker', 'Pytest'], repoUrl: `${G}/attendance-api` },
  { _id: 'p3', title: 'KnowVista', subtitle: 'Final year capstone: community and events platform', category: 'fullstack', featured: true,
    summary: 'A discussion forum combined with an events module for webinars, hackathons and coding bootcamps.',
    highlights: ['JWT authentication, role-based access control and real-time notifications.', 'Badges, reputation, upvotes, threaded replies, tagging and search.', 'Modular REST APIs with Express Router and MongoDB Atlas.'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'Bootstrap', 'JWT'] },
  { _id: 'p4', title: 'YOLO Object Detection System', subtitle: 'YOLOv3, v4 and v5 benchmark', category: 'ai', featured: true,
    summary: 'Real-time object detection that benchmarks YOLOv3, v4 and v5 on COCO and PASCAL VOC, with inference exposed through FastAPI.',
    highlights: ['Compared architectures by mAP on two standard datasets.', 'Inference endpoints let other applications consume detections.'],
    stack: ['Python', 'YOLO', 'TensorFlow', 'PyTorch', 'FastAPI'] },
  { _id: 'p5', title: 'IPO Dashboard', subtitle: 'Live IPO tracker for web and mobile', category: 'mobile',
    summary: 'Tracks live IPO details, grey market premium and subscription statistics through a Django REST backend and a Flutter app.',
    highlights: ['Containerised with Docker for consistent environments.'], stack: ['Django', 'Flutter', 'Dart', 'PostgreSQL', 'Docker', 'REST'] },
  { _id: 'p6', title: 'Treasury Controller', subtitle: 'Crypto treasury decision app', category: 'fullstack',
    summary: 'A rules engine that decides, for each obligation, whether to fund it, convert ETH to USDC, defer it or escalate it.',
    highlights: ['Decisions follow priority tiers, reserve limits and an ETH sale cap.', 'Flask JSON API powers a no-build dashboard.'], stack: ['Python', 'Flask', 'REST API', 'JavaScript'] },
  { _id: 'p7', title: 'House Price Deep EDA', subtitle: 'King County housing dataset', category: 'data',
    summary: 'Exploratory analysis and feature engineering on 20,000+ housing records to find the main price drivers.',
    highlights: ['Correlation analysis and regression modelling.'], stack: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Scikit-learn'] },
  { _id: 'p8', title: 'Currency Converter', subtitle: 'Java Swing desktop app', category: 'fullstack',
    summary: 'A simple currency converter in Java with a Swing interface that converts between several predefined currencies.',
    highlights: [], stack: ['Java', 'Swing', 'NetBeans'], repoUrl: `${G}/CurrencyConverter` },
  { _id: 'p9', title: 'Twitter Clone', subtitle: 'MERN social feed', category: 'fullstack',
    summary: 'Core Twitter features on the MERN stack: tweet feed, authentication, follow system and a responsive layout.',
    highlights: [], stack: ['React', 'Node.js', 'MongoDB', 'CSS'] }
];
