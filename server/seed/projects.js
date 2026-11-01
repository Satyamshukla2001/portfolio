// Edit repoUrl / liveUrl here, then run: npm run seed
const G = 'https://github.com/Satyamshukla2001';

module.exports = [
  {
    title: 'Order-It',
    subtitle: 'E-invoicing food delivery platform',
    category: 'fullstack',
    featured: true,
    order: 1,
    summary: 'Full-stack food delivery platform with a React (Vite) web app, an Express and MongoDB API, Stripe payments and a React Native (Expo) mobile app.',
    highlights: [
      'End-to-end order flow with Stripe payment processing and automated e-invoice generation.',
      'Cloudinary for image management, Mailtrap for OTP, order confirmation and invoice emails.'
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Cloudinary', 'React Native'],
    repoUrl: `${G}/FoodOrder_Complete`
  },
  {
    title: 'Employee Attendance & Analytics API',
    subtitle: 'Punch-in/out with audited corrections',
    category: 'fullstack',
    featured: true,
    order: 2,
    summary: 'FastAPI and MongoDB attendance service with punch-in/out, audited corrections, and daily, monthly and department analytics.',
    highlights: [
      'Race-safe one-open-shift rule enforced by a MongoDB partial unique index, with IST work dates.',
      'Time corrections use optimistic concurrency and an append-only audit log.',
      'Aggregation pipelines for daily hours, department summaries and late arrivals.'
    ],
    stack: ['Python', 'FastAPI', 'MongoDB', 'Motor', 'Pydantic', 'Docker', 'Pytest'],
    repoUrl: `${G}/attendance-api`
  },
  {
    title: 'KnowVista',
    subtitle: 'Final year capstone: community and events platform',
    category: 'fullstack',
    featured: true,
    order: 3,
    summary: 'A discussion forum combined with an events module for webinars, hackathons and coding bootcamps.',
    highlights: [
      'JWT authentication, role-based access control and real-time notifications.',
      'Badges, reputation points, upvotes, threaded replies, tagging and search.',
      'Modular REST APIs with Express Router and MongoDB Atlas through Mongoose.'
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'Bootstrap', 'JWT']
  },
  {
    title: 'YOLO Object Detection System',
    subtitle: 'YOLOv3, v4 and v5 benchmark',
    category: 'ai',
    featured: true,
    order: 4,
    summary: 'Real-time object detection that benchmarks YOLOv3, v4 and v5 on COCO and PASCAL VOC, with inference exposed through FastAPI.',
    highlights: [
      'Compared architectures by mAP on two standard datasets.',
      'Inference endpoints let other applications consume detection results.'
    ],
    stack: ['Python', 'YOLO', 'TensorFlow', 'PyTorch', 'FastAPI']
  },
  {
    title: 'IPO Dashboard',
    subtitle: 'Live IPO tracker for web and mobile',
    category: 'mobile',
    order: 5,
    summary: 'Tracks live IPO details, grey market premium and subscription statistics through a Django REST backend and a Flutter app.',
    highlights: ['Containerised with Docker for consistent development and production environments.'],
    stack: ['Django', 'Flutter', 'Dart', 'PostgreSQL', 'Docker', 'REST']
  },
  {
    title: 'Treasury Controller',
    subtitle: 'Crypto treasury decision app',
    category: 'fullstack',
    order: 6,
    summary: 'A rules engine that decides, for each obligation, whether to fund it, convert ETH to USDC, defer it or escalate it.',
    highlights: [
      'Decisions follow priority tiers, reserve limits and an ETH sale cap.',
      'Flask JSON API powers a no-build dashboard for wallet, policy, obligations and ledger.'
    ],
    stack: ['Python', 'Flask', 'REST API', 'JavaScript']
  },
  {
    title: 'House Price Deep EDA',
    subtitle: 'King County housing dataset',
    category: 'data',
    order: 7,
    summary: 'Exploratory analysis and feature engineering on 20,000+ housing records to find the main price drivers.',
    highlights: ['Correlation analysis and regression modelling to rank what moves price.'],
    stack: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Scikit-learn']
  },
  {
    title: 'Currency Converter',
    subtitle: 'Java Swing desktop app',
    category: 'fullstack',
    order: 8,
    summary: 'A simple currency converter in Java with a Swing interface that converts between several predefined currencies.',
    highlights: [],
    stack: ['Java', 'Swing', 'NetBeans'],
    repoUrl: `${G}/CurrencyConverter`
  },
  {
    title: 'Twitter Clone',
    subtitle: 'MERN social feed',
    category: 'fullstack',
    order: 9,
    summary: 'Core Twitter features on the MERN stack: tweet feed, authentication, follow system and a responsive layout.',
    highlights: [],
    stack: ['React', 'Node.js', 'MongoDB', 'CSS']
  }
];
