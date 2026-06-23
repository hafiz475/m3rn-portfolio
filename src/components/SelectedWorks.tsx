import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Globe, Brain, Bot, Droplet, Calculator } from 'lucide-react';

import imgNippon from '../assets/proj_nippon_paints.png';
import imgBuckman from '../assets/proj_buckman_chemical.png';
import imgBizmagnets from '../assets/proj_bizmagnets.png';
import imgChatops from '../assets/proj_chatops_health.png';
import imgDirection7 from '../assets/proj_direction7.png';
import imgCarzmoto from '../assets/proj_carzmoto.png';
import imgAiJob from '../assets/proj_ai_job.png';
import imgChatbot from '../assets/proj_smart_chatbot.png';
import imgWatermap from '../assets/proj_watermap.png';
import imgHissab from '../assets/proj_hissab.png';

// Company logo imports
import logoNippon from '../assets/nippon.png';
import logoBuckman from '../assets/buckman.png';
import logoBizmagnets from '../assets/bizmagnets.png';
import logoChatops from '../assets/chatops.png';
import logoCarzmoto from '../assets/carzmoto.png';

interface Project {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  tech: string[];
  description: string;
  longDescription: string;
  quote: string;
  highlights: string[];
  liveLink?: string;
  githubLink?: string;
  logo?: string;
  placeholderIcon?: React.ComponentType<any>;
  neonColor?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Nippon Paints — Ninja CRM",
    subtitle: "Enterprise E-Commerce",
    category: "Enterprise E-Commerce",
    year: "2021–2022",
    image: imgNippon,
    logo: logoNippon,
    tech: ["React", "Redux", "Kendo UI", "SCSS", "Razorpay"],
    description: "Built enterprise e-commerce workflows including cart, checkout, payments, and order management for a high-traffic retail paint platform.",
    longDescription: `Nippon Paints is one of the largest paint manufacturers in Asia, and the Ninja CRM platform was designed to digitize their entire field sales and retail operations. As a frontend developer at Ideassion Technology Solutions, I was responsible for architecting and developing the complete checkout, cart, payment integration, and order management flows for the high-traffic e-commerce platform using React, Redux, Kendo React, JavaScript, and SCSS.
\nThe platform featured a sophisticated tab-based checkout journey with Redux state management that tracked every stage of the purchase funnel — from product selection through address validation, payment processing via Razorpay, and order confirmation. I designed responsive SCSS styling with Kendo React's enterprise component library to ensure pixel-perfect rendering across all device types, contributing to an estimated 20% increase in transaction completion rates.
\nOne of the most fascinating engineering challenges was integrating a computer vision module built with Python. The system used AI to segment house components — walls, doors, windows, trims — from uploaded photographs. Customers could then change the color of individual components and preview exactly how their house would look after painting. This AR-like experience was seamlessly embedded into the CRM, allowing field sales representatives to demo paint colors on-site using just a tablet.
\nThe billing module enabled field agents to capture house measurement details, generate instant quotations, and process orders directly from the CRM tablet interface. This eliminated paper-based workflows and reduced order processing time by over 40%.`,
    quote: "Paint is not just color — it's the language of transformation. We gave every homeowner the power to see their future before a single brushstroke.",
    highlights: [
      "Streamlined checkout journey with tab navigation and Redux state management",
      "Integrated Razorpay payment gateway with robust error handling",
      "Computer vision module for AI-powered house component color visualization",
      "Tablet-based CRM for field sales billing and order processing",
      "Contributed to ~20% increase in transaction completion rate",
      "Served high-traffic retail operations across India"
    ],
    liveLink: "https://ninjablaze.nipponpaint.co.in/#/",
  },
  {
    title: "Buckman Chemical — Ackumen™",
    subtitle: "Industrial IoT",
    category: "Industrial IoT Dashboard",
    year: "2023",
    image: imgBuckman,
    logo: logoBuckman,
    tech: ["React", "Redux-Saga", "Material UI", ".NET", "PostgreSQL", "Azure"],
    description: "Developed real-time industrial monitoring dashboards for cooling systems with predictive analytics and live sensor visualization.",
    longDescription: `Buckman is a global specialty chemical company headquartered in Memphis, Tennessee, serving industries including pulp & paper, water treatment, leather processing, and industrial cooling. Their Ackumen™ platform is a cutting-edge digital IoT solution that provides real-time monitoring, predictive maintenance, and performance optimization for industrial cooling towers and water treatment systems worldwide.
\nAs a frontend engineer at Ideassion Technology Solutions, I owned the architecture and development of the real-time monitoring dashboards that processed thousands of sensor data points daily. The technology stack comprised React with Redux-Saga for complex asynchronous data orchestration, Material UI and Bootstrap for the design system, a .NET backend, PostgreSQL database, and Azure cloud infrastructure.
\nThe platform encompassed multiple sophisticated modules including Absorbency Aid monitoring, Beamhouse process tracking, Boilout cycle management, Busan 1078 bactericide dosing control, Charge Control systems, Chelants/Metals Management dashboards, Defoamer monitoring for both BSW Wash Aids and Paper Machine applications, and comprehensive cooling tower performance analytics. Each module featured live sensor feeds, historical trend charts, threshold alerts, and predictive maintenance indicators.
\nI enhanced the asynchronous data flows using Redux-Saga's generator-based side effect management, which improved dashboard response times by 40%. The saga middleware pattern enabled complex data orchestration — polling IoT endpoints, debouncing sensor updates, managing WebSocket reconnections, and coordinating multi-step API sequences — all while maintaining a responsive and flicker-free user experience.
\nWorking with an 8-person cross-functional team, I designed intuitive sensor-driven interfaces that helped plant operators make critical decisions about chemical dosing, system maintenance scheduling, and performance optimization in real-time industrial environments.`,
    quote: "In industrial operations, every millisecond of delayed data can cost thousands. We engineered dashboards that made complex sensor telemetry feel effortless.",
    highlights: [
      "Real-time monitoring dashboards processing thousands of sensor data points daily",
      "Redux-Saga middleware improving dashboard response time by 40%",
      "Modules for Absorbency Aid, Beamhouse, Defoamers, Cooling Tower analytics",
      "Predictive maintenance indicators with threshold-based alerting",
      "Built on .NET backend, PostgreSQL, and Azure cloud infrastructure",
      "Cross-functional team of 8 engineers delivering enterprise IoT solutions"
    ],
    liveLink: "https://www.buckman.com/applications/",
  },
  {
    title: "BizMagnets SaaS",
    subtitle: "Customer Engagement",
    category: "SaaS Platform",
    year: "2024–Present",
    image: imgBizmagnets,
    logo: logoBizmagnets,
    tech: ["React", "TypeScript", "Redux Thunk", "Socket.IO", "Vite"],
    description: "Engineered scalable CRM modules including shared inbox, chatbot builder, campaigns, ticketing, and real-time messaging.",
    longDescription: `BizMagnets is a comprehensive SaaS platform that empowers businesses to manage their entire customer engagement lifecycle through WhatsApp-based communication workflows. As the Senior Frontend Engineer, I own the architecture and development of the core platform using React, TypeScript, Vite, and Redux Thunk — powering 100+ business clients and 8,000+ end-user interactions monthly across high-volume customer engagement workflows.
\nI defined the scalable frontend architecture patterns, reusable component library, and Redux-based state management conventions that were adopted across all product modules. The platform's module ecosystem spans shared inbox management, campaign orchestration, lead capture workflows, ticketing systems, and a sophisticated no-code chatbot builder — each designed for maximum reusability and minimal coupling.
\nThe drag-and-drop no-code chatbot workflow builder was built entirely from scratch. It enables businesses to visually design conversational flows using a node-based editor with conditional branching, API integrations, media attachments, and template message triggers. This module alone reduced manual bot configuration time by 60%, allowing non-technical team members to deploy complex automation sequences within minutes.
\nReal-time communication is powered by Socket.IO, reliably supporting 2,000+ concurrent live connections daily. The architecture uses memoization strategies, lazy-loaded module boundaries, and optimized Redux state updates to ensure smooth real-time message delivery without UI jank or memory leaks. I spearheaded frontend performance initiatives including code splitting, tree shaking, and bundle size optimization that cut component re-render latency by 35% and significantly boosted Core Web Vitals scores.
\nI established frontend testing standards using Jest and @testing-library/react, implementing comprehensive unit and component test coverage for critical workflows. Additionally, I mentor 2 junior frontend engineers through daily code reviews, knowledge-sharing sessions, and PR approval workflows.`,
    quote: "Great SaaS is invisible infrastructure — it disappears into the workflow. We built BizMagnets so businesses could focus on conversations, not configuration.",
    highlights: [
      "Powering 100+ business clients and 8K+ monthly end-user interactions",
      "Built drag-and-drop no-code chatbot builder reducing config time by 60%",
      "Real-time Socket.IO messaging supporting 2,000+ daily live connections",
      "Cut component re-render latency by 35% through performance optimization",
      "Established Jest + Testing Library testing standards across modules",
      "Mentoring 2 junior engineers through code reviews and knowledge sharing"
    ],
    liveLink: "https://app.bizmagnets.ai/",
  },
  {
    title: "ChatsOps Health",
    subtitle: "Healthcare Platform",
    category: "Healthcare Workflow",
    year: "2024–Present",
    image: imgChatops,
    logo: logoChatops,
    tech: ["React", "TypeScript", "Jenkins", "GitLab", "Nginx", "DigitalOcean"],
    description: "Built hospital workflow solutions for patient discharge, escalations, and real-time coordination across healthcare teams.",
    longDescription: `ChatsOps Health is a healthcare communication platform designed to streamline hospital workflows, particularly focused on patient discharge coordination, clinical escalations, and real-time team handoff processes. As part of the founding engineering team at BizMagnets, I owned the delivery of real-time workflow systems now deployed across 80+ hospitals.
\nThe platform addresses one of healthcare's most persistent bottlenecks: discharge coordination delays. In a typical hospital, discharge involves multiple departments — physicians, nursing staff, pharmacy, billing, transport, and housekeeping — each with their own communication silos. ChatsOps Health unifies these teams through structured real-time workflows that track every patient's discharge journey from physician order to final departure.
\nI delivered approximately 70% of the core production frontend modules as part of the founding engineering team. The system features real-time status boards showing patient flow across departments, automated escalation triggers when discharge milestones are delayed, and notification systems that alert relevant team members at each stage of the process. These interventions reduced discharge coordination delays by 30% across deployed hospitals.
\nThe technology infrastructure leverages React with TypeScript for type-safe frontend development, while the DevOps pipeline uses GitLab for version control, Jenkins for continuous integration and deployment automation, and production hosting on DigitalOcean with Nginx reverse proxy configuration. I managed the complete CI/CD pipeline, ensuring zero-downtime deployments and rapid iteration cycles that healthcare clients demand.
\nWorking in healthcare technology required exceptional attention to reliability, data sensitivity, and user experience design for clinical staff who operate under extreme time pressure. Every interface decision was optimized for speed and clarity — minimal clicks, maximum context, and instant feedback.`,
    quote: "In hospitals, every minute saved in discharge coordination is a minute gained for patient care. We built systems that let clinicians focus on healing.",
    highlights: [
      "Deployed across 80+ hospitals for patient discharge coordination",
      "Reduced discharge coordination delays by 30%",
      "Delivered 70% of core production frontend modules as founding engineer",
      "Managed CI/CD pipelines with GitLab, Jenkins, and DigitalOcean",
      "Automated escalation triggers for delayed discharge milestones",
      "Optimized clinical UX for healthcare staff under time pressure"
    ],
    liveLink: "https://chatops.health/",
  },
  {
    title: "Direction7",
    subtitle: "Founder Project",
    category: "B2B/B2C Marketplace",
    year: "2023",
    image: imgDirection7,
    placeholderIcon: Globe,
    neonColor: "text-cyan-400 border-cyan-500/30 shadow-cyan-500/20 bg-cyan-950/20",
    tech: ["MERN", "Firebase", "Cloudflare S3", "DigitalOcean", "PM2", "Nginx"],
    description: "Built a B2B/B2C platform connecting businesses, transport, products, and services through one intelligent digital ecosystem.",
    longDescription: `Direction7 is my flagship founder project — a full-stack B2B/B2C marketplace platform designed to connect businesses, transport providers, products, and services through a single intelligent digital ecosystem. The vision was to create a unified directory and transaction platform where any business, regardless of size, could establish a digital presence, list services, and connect with customers and partners.
\nThe platform was architected using the MERN stack (MongoDB, Express.js, React, Node.js) with Firebase for authentication and real-time features, Cloudflare S3 for edge-optimized asset storage and CDN delivery, and production deployment on DigitalOcean with PM2 process management and Nginx reverse proxy configuration.
\nI designed the entire system architecture from database schema design through API layer development to frontend implementation. The platform features user and business registration flows, service listing and search with category filtering, real-time messaging between buyers and sellers, review and rating systems, and an admin dashboard for platform management.
\nThe cloud infrastructure was engineered for production reliability — PM2 ensures zero-downtime restarts and automatic crash recovery, Nginx handles SSL termination and load distribution, and Cloudflare S3 provides global edge caching for static assets. This infrastructure setup supports horizontal scaling as the platform grows.
\nBuilding Direction7 taught me the full lifecycle of product development — from market research and UI/UX design through backend architecture, database optimization, cloud deployment, and production monitoring. It's the project that transformed me from a frontend developer into a full-stack product engineer.`,
    quote: "Direction7 was born from a simple idea: every business deserves a digital direction. Building it taught me that the best products solve real problems with elegant engineering.",
    highlights: [
      "Full-stack MERN architecture with Firebase authentication",
      "Cloudflare S3 edge caching for global asset delivery",
      "Production deployment on DigitalOcean with PM2 and Nginx",
      "B2B/B2C marketplace with service listings and real-time messaging",
      "Designed complete system from database schema to cloud infrastructure",
      "Founder-led product development across the entire stack"
    ],
    liveLink: "https://www.direction7.com",
    githubLink: "https://github.com/hafiz475/crazMotors",
  },
  {
    title: "CarzMoto",
    subtitle: "Automotive Services",
    category: "Automotive E-Commerce",
    year: "2024",
    image: imgCarzmoto,
    logo: logoCarzmoto,
    tech: ["Next.js", "MERN Stack", "Responsive Design"],
    description: "Complete digital presence and billing system for a premium car accessories provider in Chennai.",
    longDescription: `CarzMoto is a comprehensive digital solution built for my friend Abdul Jaffar's premium car accessories business located at Kithabath Khan Street, Triplicane, Chennai. The business provides A-to-Z car accessories and modification services — from LED lights, seat covers, and repainting to stickering, add-ons, wheel upgrades, and complete interior/exterior customization for all car brands.
\nThe project involved building both a professional website and a full billing management system. The website was developed using Next.js for server-side rendering and SEO optimization, ensuring the business ranks well in local Chennai search results. The design showcases the premium quality of CarzMoto's work with high-impact imagery, service catalogs, customer testimonials, and contact information including their operating hours (Monday–Sunday, 10:00 AM – 12:00 PM) and phone number (+91 80725 74682).
\nThe billing system was built on the MERN stack, providing Abdul Jaffar and his team with a streamlined workflow for creating invoices, tracking orders, managing inventory, and maintaining customer records. The system generates professional invoices with itemized service details, tax calculations, and payment tracking — replacing the manual paper-based billing that the shop previously relied on.
\nThe responsive design ensures the billing interface works seamlessly on tablets, allowing staff to create invoices on the shop floor while working on vehicles. This eliminated the need to walk back to a desktop computer for each transaction, significantly improving operational efficiency.
\nBuilding CarzMoto reinforced my belief that technology should serve real-world businesses. Seeing Abdul Jaffar's team transition from handwritten receipts to a professional digital billing system was one of the most rewarding experiences in my development career.`,
    quote: "The best technology is the kind that makes a friend's business run smoother. CarzMoto proved that even a local shop deserves world-class digital tools.",
    highlights: [
      "Next.js website with SSR for local SEO optimization",
      "MERN stack billing system for invoice generation and order tracking",
      "Tablet-optimized responsive design for shop floor billing",
      "Service catalog showcasing A-to-Z car accessories and modifications",
      "Replaced paper-based billing with professional digital invoicing",
      "Serving car enthusiasts across Chennai from Triplicane headquarters"
    ],
    liveLink: "https://hafiz475.github.io/carzmoto_site/",
  },
  {
    title: "AI Job Recommendation",
    subtitle: "AI Platform",
    category: "Artificial Intelligence",
    year: "2024",
    image: imgAiJob,
    placeholderIcon: Brain,
    neonColor: "text-fuchsia-400 border-fuchsia-500/30 shadow-fuchsia-500/20 bg-fuchsia-950/20",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Gemini / OpenAI"],
    description: "AI-powered platform that analyzes resumes and recommends suitable career opportunities with explainable matching.",
    longDescription: `The AI Job Recommendation System is a full-stack AI-powered platform that transforms how job seekers discover career opportunities. The system accepts resume uploads in PDF, DOCX, or TXT formats, uses AI to extract skills, experience levels, education background, and role keywords, then generates personalized job recommendations with detailed explanations for why each role matches the candidate's profile.
\nThe architecture follows a clean separation of concerns: a React + TypeScript frontend provides the user interface with glassmorphism design, smooth animations, and responsive layouts. The FastAPI + Python backend handles resume parsing, AI integration, and recommendation logic. PostgreSQL stores user profiles, parsed resume data, and recommendation history for persistent access.
\nThe AI integration supports both Google Gemini and OpenAI as interchangeable providers. Carefully crafted prompts handle three distinct analysis phases: Resume Analysis extracts structured data from unstructured resume text, Job Matching generates relevant role recommendations ranked by compatibility, and Skill Gap Analysis identifies matching strengths and areas for professional development.
\nThe matching algorithm goes beyond simple keyword overlap. It considers semantic similarity between skills and job requirements, experience level appropriateness, industry relevance, and career trajectory alignment. Each recommendation includes a compatibility percentage score and a human-readable explanation that helps candidates understand exactly why a role was suggested.
\nThe frontend features a premium dark theme with glassmorphism effects, purple and cyan gradient accents, and smooth component transitions. The upload flow provides real-time feedback through an animated analysis loader, and results are presented in a dashboard layout with filterable recommendation cards.`,
    quote: "The gap between talent and opportunity isn't skills — it's visibility. AI can bridge that gap by seeing patterns that humans miss in a stack of resumes.",
    highlights: [
      "Resume parsing supporting PDF, DOCX, and TXT formats",
      "Dual AI provider support: Google Gemini and OpenAI",
      "Semantic matching beyond simple keyword overlap",
      "Compatibility scores with human-readable explanations",
      "FastAPI backend with PostgreSQL for persistent data",
      "Premium glassmorphism UI with animated analysis flow"
    ],
    liveLink: "https://ai-job-recommendation-system-omega.vercel.app/",
    githubLink: "https://github.com/hafiz475/AI-Job-Recommendation-System",
  },
  {
    title: "Smart Assistant Chatbot",
    subtitle: "AI Chatbot",
    category: "AI & DevOps",
    year: "2024",
    image: imgChatbot,
    placeholderIcon: Bot,
    neonColor: "text-green-400 border-green-500/30 shadow-green-500/20 bg-green-950/20",
    tech: ["Next.js", "Express.js", "Gemini AI", "PostgreSQL", "Docker", "Nginx"],
    description: "Production-ready AI chatbot with conversation history, notes system, and full cloud deployment infrastructure.",
    longDescription: `The Smart Assistant Chatbot is a production-ready AI conversation platform built with a modern full-stack architecture. Unlike simple chat wrappers, this project was designed as a complete production system — featuring persistent conversation history, a notes system for saving important information, PWA support for mobile installation, and comprehensive DevOps infrastructure including Docker containerization, CI/CD pipelines, and multiple cloud deployment configurations.
\nThe frontend is built with Next.js 16 using the App Router for server-side rendering and optimized page loading. The UI is designed with Ant Design components and features a conversation sidebar for managing multiple chat threads, a rich message display with code syntax highlighting, and a notes panel for organizing extracted insights.
\nThe Express.js backend provides a robust API layer with comprehensive security features: rate limiting to prevent abuse, CORS protection for cross-origin safety, Helmet security headers, input validation, SQL injection protection, and XSS prevention. PostgreSQL stores conversation history, user preferences, and saved notes with full CRUD operations.
\nThe AI integration uses Google Gemini for natural language understanding and response generation. The system maintains conversation context across messages, enabling coherent multi-turn dialogues that reference previous interactions.
\nWhat makes this project stand out is the production infrastructure. The Docker Compose configuration orchestrates the full stack — frontend, backend, database, and Nginx reverse proxy — in a single deployment command. CI/CD pipelines automate testing and deployment, while configuration files for Railway, Render, and Vercel enable one-click cloud deployment across multiple platforms. The project includes detailed deployment documentation covering VPS setup on DigitalOcean and AWS.`,
    quote: "Building an AI chatbot is easy. Building one that's production-ready — with security, persistence, and zero-downtime deployments — is where real engineering begins.",
    highlights: [
      "Next.js 16 frontend with App Router and server-side rendering",
      "Comprehensive security: rate limiting, CORS, Helmet, XSS prevention",
      "Docker Compose orchestration for full-stack deployment",
      "CI/CD pipelines with Railway, Render, and Vercel configurations",
      "Persistent conversation history with PostgreSQL",
      "PWA-ready for mobile and desktop installation"
    ],
    githubLink: "https://github.com/hafiz475/Smart-Assistant-Chatbot-.git",
  },
  {
    title: "WaterMap",
    subtitle: "Founder's App",
    category: "B2B Logistics",
    year: "2023",
    image: imgWatermap,
    placeholderIcon: Droplet,
    neonColor: "text-blue-400 border-blue-500/30 shadow-blue-500/20 bg-blue-950/20",
    tech: ["MERN Stack", "Google Maps API", "Real-time Tracking"],
    description: "B2B water supply logistics platform connecting water industries with wholesalers and retailers across Chennai.",
    longDescription: `WaterMap was a founder-led B2B logistics platform designed to digitize the water supply chain in Chennai, India. Co-founded with a friend, the platform aimed to connect pure water industries (suppliers) with wholesalers and retailers through an intelligent routing and order management system.
\nThe business model was simple: source pure drinking water from certified water treatment plants, then distribute it through a network of wholesalers and retailers across Chennai's neighborhoods. At its peak, the operation reached 10 wholesalers and 5 retailers, operating for 5 months before market conditions led to its closure.
\nThe platform was built on the MERN stack with Google Maps API integration for delivery route optimization and real-time order tracking. The system featured separate dashboards for suppliers, wholesalers, and retailers — each with role-specific views showing inventory levels, pending orders, delivery schedules, and payment tracking.
\nThe supplier dashboard managed production batch tracking, quality certification uploads, and distribution scheduling. Wholesaler interfaces handled bulk order placement, inventory management, and downstream retailer fulfillment. Retailer views showed simplified ordering, delivery tracking, and customer complaint management.
\nThough the business ultimately didn't sustain, WaterMap was an invaluable learning experience in full-stack product development, logistics system design, and the harsh realities of startup economics. The technical architecture — handling real-time inventory synchronization across multiple supply chain nodes — pushed my understanding of distributed data consistency and eventually informed my approach to building real-time systems at BizMagnets.
\nThe project taught me that great engineering alone doesn't guarantee business success, but the technical skills and entrepreneurial mindset it built have shaped every product decision I've made since.`,
    quote: "WaterMap didn't survive the market, but the engineering and entrepreneurial lessons it taught me flow through every product I build today.",
    highlights: [
      "B2B logistics connecting water industries with wholesalers and retailers",
      "Google Maps API integration for delivery route optimization",
      "Multi-role dashboards for suppliers, wholesalers, and retailers",
      "Real-time inventory synchronization across supply chain nodes",
      "Reached 10 wholesalers and 5 retailers in Chennai",
      "Founder-led full-stack development and operations for 5 months"
    ],
    githubLink: "https://github.com/hafiz475/waterMap",
  },
  {
    title: "Hissab",
    subtitle: "Billing SaaS",
    category: "Small Business Tool",
    year: "2023",
    image: imgHissab,
    placeholderIcon: Calculator,
    neonColor: "text-orange-400 border-orange-500/30 shadow-orange-500/20 bg-orange-950/20",
    tech: ["MERN Stack", "Firebase", "PDFKit", "WhatsApp API"],
    description: "Complete billing platform with invoice generation, WhatsApp sharing, cloud storage, and multi-currency support.",
    longDescription: `Hissab (meaning "account" in Urdu/Hindi) is a billing and invoice management application designed specifically for small businesses and individual entrepreneurs who need a simple, powerful way to create professional invoices and share them instantly with customers via WhatsApp.
\nThe platform was born from observing how small shopkeepers and service providers in Chennai struggle with billing — most rely on handwritten receipts or basic spreadsheets that lack professional formatting, tax calculations, and digital sharing capabilities. Hissab solves this by providing a clean, intuitive interface where users can create itemized invoices, apply tax rates, track payment status, and generate PDF bills with a single click.
\nBuilt on the MERN stack with Firebase for authentication and cloud storage, the application features a comprehensive billing workflow: create customer profiles, add line items with descriptions and quantities, apply GST and other tax calculations, generate formatted PDF invoices using PDFKit, and share the completed bill directly to the customer's WhatsApp number with a pre-formatted message.
\nThe WhatsApp integration is particularly valuable for the target market. Small business owners in India communicate primarily through WhatsApp, so the ability to generate a professional PDF invoice and send it directly to a customer's chat — without requiring email addresses or printing — dramatically simplifies the billing process.
\nThe dashboard provides business analytics including monthly revenue trends, outstanding payment tracking, customer purchase history, and tax summary reports. Firebase cloud storage ensures all invoices are safely backed up and accessible from any device.
\nHissab represents my philosophy of building technology that empowers underserved markets. The most impactful software isn't always the most complex — sometimes it's a simple tool that replaces a stack of paper receipts with a professional digital workflow.`,
    quote: "Hissab proved that the most impactful software isn't the most complex — it's the simple tool that replaces a stack of paper receipts with a professional digital workflow.",
    highlights: [
      "PDF invoice generation with PDFKit and professional formatting",
      "One-click WhatsApp sharing with pre-formatted messages",
      "GST and multi-tax calculation support",
      "Firebase cloud storage for invoice backup and cross-device access",
      "Business analytics: revenue trends, payment tracking, tax summaries",
      "Designed for small businesses and individual entrepreneurs"
    ],
  },
];

const TOTAL = PROJECTS.length;
const ANGLE_STEP = (2 * Math.PI) / TOTAL;
const AUTO_SPEED = 0.0015;

export const SelectedWorks: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const targetAngle = useRef(0);
  const currentAngle = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current) {
        targetAngle.current -= AUTO_SPEED;
      }
      // Smooth lerp towards target
      currentAngle.current += (targetAngle.current - currentAngle.current) * 0.06;

      const R = isMobile ? 320 : 550;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const raw = currentAngle.current + i * ANGLE_STEP;
        // Normalize to [-π, π]
        let norm = ((raw % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

        const x = R * Math.sin(norm);
        const y = R * (1 - Math.cos(norm));
        const rot = norm * (180 / Math.PI);
        const absNorm = Math.abs(norm);
        const maxVisible = Math.PI * 0.52;

        const opacity = absNorm > maxVisible ? 0 : 1 - (absNorm / maxVisible) * 0.7;
        const scale = absNorm > maxVisible ? 0.75 : 1 - (absNorm / maxVisible) * 0.12;
        const zi = Math.round((1 - absNorm / Math.PI) * 20);

        card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(0, opacity));
        card.style.zIndex = String(zi);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  const jumpBy = useCallback((dir: number) => {
    targetAngle.current += dir * ANGLE_STEP;
  }, []);

  return (
    <section id="work" className="bg-transparent py-20 md:py-28 select-none text-left relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center">

        {/* Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="flex flex-col gap-3 max-w-lg">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-bold">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-medium leading-none">
              Featured <span className="italic font-serif">projects</span>
            </h2>
          </div>
        </div>

        {/* Arc Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: isMobile ? 320 : 420 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Cards origin point — center-top of the arc area */}
          <div className="absolute left-1/2 top-0" style={{ width: 0, height: 0 }}>
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                onClick={() => setSelectedProject(project)}
                className="absolute cursor-pointer group/card"
                style={{
                  width: isMobile ? 180 : 240,
                  height: isMobile ? 260 : 340,
                  top: 0,
                  left: 0,
                  willChange: 'transform, opacity',
                  transformOrigin: 'center top',
                }}
              >
                <div className="w-full h-full rounded-2xl md:rounded-[1.4rem] overflow-hidden border border-stroke/60 shadow-xl bg-bg relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-center gap-3">
                    {/* Logo/Icon Container */}
                    {project.logo ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center border border-white/20 bg-white shadow-md p-1">
                        <img src={project.logo} alt="" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      project.placeholderIcon && (
                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border backdrop-blur-sm shadow-md shadow-black/40 ${project.neonColor}`}>
                          <project.placeholderIcon className="w-4 h-4" />
                        </div>
                      )
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs md:text-sm font-semibold text-white leading-snug">{project.title}</h3>
                      <p className="text-[10px] md:text-xs text-white/60 italic mt-0.5">{project.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-6">
          <button onClick={() => jumpBy(1)} className="w-11 h-11 rounded-full border border-stroke bg-surface/50 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all duration-300 cursor-pointer" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => jumpBy(-1)} className="w-11 h-11 rounded-full border border-stroke bg-surface/50 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all duration-300 cursor-pointer" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expanded Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-start justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-surface/30 border border-stroke rounded-[2rem] overflow-hidden shadow-2xl cursor-default my-8 md:my-12"
            >
              {/* Hero Image */}
              <div className="w-full aspect-[16/8] border-b border-stroke overflow-hidden relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-text-primary cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Year & Category Badges on image */}
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-white bg-white/15 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                    {selectedProject.year}
                  </span>
                  <span className="text-[10px] font-mono text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-10 flex flex-col gap-6 text-left">

                {/* Title Block */}
                <div className="flex items-center gap-4">
                  {selectedProject.logo ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/20 bg-white shadow-md p-1.5">
                      <img src={selectedProject.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    selectedProject.placeholderIcon && (
                      <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border backdrop-blur-sm shadow-md shadow-black/40 p-2.5 ${selectedProject.neonColor}`}>
                        <selectedProject.placeholderIcon className="w-6 h-6" />
                      </div>
                    )
                  )}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted block font-mono">{selectedProject.subtitle}</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-text-primary mt-0.5 leading-tight">{selectedProject.title}</h3>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-text-primary/80 font-mono py-1.5 px-3 rounded-lg bg-black/40 border border-stroke"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-accent/40 pl-5 py-2">
                  <p className="text-sm text-text-primary/70 italic font-body leading-relaxed">
                    "{selectedProject.quote}"
                  </p>
                </blockquote>

                {/* Long Description */}
                <div className="text-muted text-sm font-body leading-[1.85] whitespace-pre-line">
                  {selectedProject.longDescription}
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-3 border-t border-stroke pt-6">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-mono font-bold">Key Highlights</span>
                  <ul className="flex flex-col gap-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-primary/85 font-body">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-stroke">
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-surface/50 hover:bg-stroke/40 border border-stroke text-text-primary text-xs font-medium px-5 py-3 rounded-xl transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                      GitHub Repo
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-text-primary hover:bg-muted text-bg text-xs font-semibold px-5 py-3 rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
