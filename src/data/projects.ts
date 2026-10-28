import type { ArtId } from '../components/illustrations/palette';
import type { CaseLink } from './caseStudies';

import siratDesktop from '../assets/projects/sirat-desktop.webp';
import siratPhone from '../assets/projects/sirat-phone.webp';
import agentsDesktop from '../assets/projects/bizmagnets-agents-desktop.webp';
import agentsPhone from '../assets/projects/bizmagnets-agents-phone.webp';
import aiJobDesktop from '../assets/projects/ai-job-desktop.webp';
import aiJobPhone from '../assets/projects/ai-job-phone.webp';
import carzDesktop from '../assets/projects/carzmoto-desktop.webp';
import carzPhone from '../assets/projects/carzmoto-phone.webp';
import helpDesktop from '../assets/projects/help-desktop.webp';
import helpPhone from '../assets/projects/help-phone.webp';
import odysseyDesktop from '../assets/projects/hafiz-odyssey-desktop.webp';
import odysseyPhone from '../assets/projects/hafiz-odyssey-phone.webp';
import mark47Desktop from '../assets/projects/mark47-desktop.webp';
import mljDesktop from '../assets/projects/my-life-journey-desktop.webp';
import seaviewDesktop from '../assets/projects/parallax-seaview-desktop.webp';

export interface ProjectVisual {
  /** Desktop screenshot (16:10) shown in the detail view */
  desktop: string;
  /** Phone screenshot used on the portrait card; falls back to the desktop shot */
  phone?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  /** One line for cards */
  summary: string;
  overview: string;
  built: string[];
  highlights?: { value: string; label: string }[];
  /** Caveat shown under the highlights, e.g. where figures come from */
  note?: string;
  stack: string[];
  links: CaseLink[];
  caseStudyId?: string;
  screenshot?: ProjectVisual;
  art?: ArtId;
}

export const PROJECTS: Project[] = [
  {
    id: 'bizmagnets',
    title: 'BizMagnets.ai',
    subtitle: 'WhatsApp engagement SaaS',
    period: 'Feb 2024 – present',
    role: 'Frontend Lead (senior full-stack). I lead a five-person frontend team and work roughly half frontend, half Node.js backend.',
    summary: 'WhatsApp customer engagement for 100+ businesses.',
    overview:
      'Campaigns, a shared agent inbox, ticketing, chatbots, templates, analytics and commerce, all on the WhatsApp Business Platform. I lead the frontend and build across the React apps and the Node.js services behind them.',
    built: [
      'Split one large bundle into 85 lazy-loaded routes, so boot loads one page instead of 75, and introduced independently deployable micro-frontends.',
      'A no-code chatbot builder and WhatsApp Flow builder with drag-and-drop nodes, autosave and publish guardrails.',
      'An agent inbox that renders rich WhatsApp messages (quick replies, list pickers, media, Flow responses), tuned with memoisation, virtualisation and code splitting.',
      'Reports over 10M+ rows moved to background server jobs, so the browser never loads them.',
      'Backend: webhook ingestion with per-contact ordering, BullMQ scheduling and rate limits, one adapter layer over three WhatsApp providers, and keyset pagination for 100,000-contact broadcasts.',
      'Team practice: daily stand-ups, weekly code reviews, WCAG 2.1 AA review checks, and Conventional Commits adoption from 0% to 93%+ across about 12 developers.',
    ],
    highlights: [
      { value: '85', label: 'lazy-loaded routes' },
      { value: '50 → 1', label: 'template requests per lookup' },
      { value: '45 → 4 min', label: 'to start a 100k-contact broadcast' },
    ],
    note: 'Internal product, so no public link. Figures are from internal measurements.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Redux Toolkit',
      'TanStack Query',
      'React Flow',
      'Monaco Editor',
      'Socket.IO',
      'Recharts',
      'Bootstrap 5',
      'Node.js',
      'Express',
      'BullMQ',
      'Redis',
      'PostgreSQL',
      'MySQL',
      'Jenkins',
    ],
    links: [],
    caseStudyId: 'bizmagnets-bot-builder',
    art: 'bizmagnets-bot-builder',
  },
  {
    id: 'sirat',
    title: 'Sirat',
    subtitle: 'Counselling practice website',
    period: '2026',
    role: 'Design and build, solo.',
    summary: 'A calm website and guided booking intake for a counselling psychologist.',
    overview:
      'A website for a counselling psychology practice: services, approach, credentials, resources and a way to ask for a session. The hard part was the booking journey, written for people who may be struggling when they reach it.',
    built: [
      'A six-step guided intake whose questions change for individuals, couples, EAP clients and organisations.',
      'Privacy first with no backend: a review screen comes before anything is sent, and WhatsApp opens only when the person chooses.',
      'Choosing crisis support shows an emergency notice and makes urgency required.',
      'A keyboard- and swipe-friendly topic explorer instead of a long wall of service cards on mobile.',
      'Accessible by default: managed focus, screen-reader step labels, reduced motion and 44 px touch targets.',
      'Deployed on Vercel with a custom domain.',
    ],
    stack: ['Next.js 16', 'React', 'TypeScript', 'Sass', 'Tailwind CSS', 'Framer Motion', 'Lottie', 'Lucide React', 'Vercel'],
    links: [
      { label: 'Live site', href: 'https://www.sirat.co.in/' },
      { label: 'Code', href: 'https://github.com/hafiz475/amina-fathima-psychology' },
    ],
    caseStudyId: 'sirat',
    screenshot: { desktop: siratDesktop, phone: siratPhone },
  },
  {
    id: 'direction7',
    title: 'Direction7',
    subtitle: 'Local-commerce platform · my product',
    period: '2026',
    role: 'Product owner and engineer, working with AI coding agents.',
    summary: 'Inventory, billing, suppliers, delivery and business messaging for local stores.',
    overview:
      'Direction7 connects local businesses with their suppliers, delivery partners and customers. It covers inventory, billing, tax, logistics and driver workflows, chat, business networking and a storefront, and is moving from a MERN monolith to Express services behind an API gateway.',
    built: [
      'TypeScript and Node.js services behind an API gateway, with 180+ REST endpoints.',
      'Redis and BullMQ for caching, delayed jobs and background work, Kafka for events, and Socket.IO for realtime notifications.',
      'A Messages work queue with Pending, Responded and Sent tabs and request flows for connections, suppliers, fulfilment, delivery and partners.',
      "Header badges counted on the server with the inbox's own query, so the numbers always match the list.",
      'Fixes pinned by tests: cart and stock rules, Back navigation, one name per feature, and chats that open with the newest 50 messages.',
    ],
    note: 'In active development; some services and workers are not production-complete yet.',
    stack: [
      'React',
      'Next.js',
      'Redux Toolkit',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Redis',
      'BullMQ',
      'Kafka',
      'Socket.IO',
      'Cloudflare R2',
      'Docker',
      'Nginx',
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
    ],
    links: [],
    caseStudyId: 'direction7-messages',
    art: 'direction7-messages',
  },
  {
    id: 'bizmagnets-agents',
    title: 'AI Sales Agent site',
    subtitle: 'agents.bizmagnets.ai',
    period: '2025 – present',
    role: 'Frontend and full-stack developer at BizMagnets.',
    summary: 'SEO-first site for WhatsApp AI sales agents that sync orders to Tally.',
    overview:
      "The public site for BizMagnets' AI sales agents, which present a catalogue, check stock and take orders on WhatsApp, then sync them to Tally. Built for search, fast pages and content the marketing team can update.",
    built: [
      'Next.js App Router with React 19 and TypeScript; product, industry and solution pages built from reusable sections.',
      'A world map drawn with D3 (d3-geo) and TopoJSON.',
      'Google Tag Manager and Meta Pixel with controlled script loading that does not break hydration.',
      'GitLab CI/CD to Vercel with staging and production.',
      'Trained a non-engineering go-to-market colleague in Git, npm and GitLab; they now open reviewed merge requests.',
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'D3', 'TopoJSON', 'Lucide React', 'Google Tag Manager', 'Meta Pixel', 'GitLab CI/CD', 'Vercel'],
    links: [
      { label: 'Live site', href: 'https://agents.bizmagnets.ai/' },
      { label: 'Code', href: 'https://github.com/hafiz475/bizmagnets-website' },
    ],
    screenshot: { desktop: agentsDesktop, phone: agentsPhone },
  },
  {
    id: 'chatops-health',
    title: 'ChatOps.health',
    subtitle: 'Hospital discharge coordination',
    period: 'At BizMagnets',
    role: 'Frontend: dashboards, workflow screens, API integration and realtime status. Backend services were built with the wider team.',
    summary: 'Live discharge queues, SLA timers and escalations for hospitals.',
    overview:
      'Discharging a patient needs sign-off from several departments. ChatOps.health turns that into live queues with owners, timers and escalations, so delays are visible while there is still time to act.',
    built: [
      'Realtime dashboards across eight departments: work queues, task owners, live SLA status and escalations.',
      'Case review screens that put source documents, WhatsApp submissions, record details, change history and an audit timeline side by side.',
      'An admin UI for hospital routing, parallel clearances and two-level escalations, replacing hand-edited configuration.',
      'Redis-backed SLA timers wired into the escalation flow.',
    ],
    highlights: [
      { value: '8', label: 'departments on one board' },
      { value: '18% → 4%', label: 'SLA breach rate' },
    ],
    note: 'Internal product, so no public link. The breach rate is team-reported.',
    stack: ['Socket.IO', 'NestJS', 'Redis', 'BullMQ', 'PostgreSQL', 'node-cron', 'AWS S3', 'WhatsApp Business API'],
    links: [],
    art: 'chatops-health',
  },
  {
    id: 'my-life-journey',
    title: 'My Life Journey',
    subtitle: 'Interactive 3D resume',
    period: 'Dec 2025 – Jan 2026',
    role: 'Design and build, solo, over seven weeks.',
    summary: 'Fly through a storm, land on an island and explore my story in 3D.',
    overview:
      'An explorable 3D resume. Visitors fly a seaplane through a storm, land on an island and walk into my room, where each object opens part of my story.',
    built: [
      'Real-time 3D scenes, camera moves and scene transitions in React Three Fiber.',
      'One interaction signal everywhere: a pulsing cyan dot means “you can click this”.',
      'Hotspots appear only when they can be used, which guides the order without instructions.',
      "Small games inspired by pinball, Flappy Bird and a Rubik's Cube.",
      'Rain, ambient sound and post-processing for atmosphere; on phones, swipes lock for 1.2 s so one swipe never skips two scenes.',
    ],
    stack: ['React', 'Three.js', 'React Three Fiber', 'Drei', 'React Spring', 'GSAP', 'Postprocessing', 'Lottie', 'Sass', 'React Router', 'Vite', 'Blender'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/MY_LIFE_JOURNEY_3d/' },
      { label: 'Code', href: 'https://github.com/hafiz475/MY_LIFE_JOURNEY_3d' },
    ],
    caseStudyId: 'my-life-journey',
    screenshot: { desktop: mljDesktop },
  },
  {
    id: 'vamosys',
    title: 'VAMOSYS',
    subtitle: 'Fleet telematics · GPS VTS Pro',
    period: 'At BizMagnets',
    role: 'Frontend engineer on the Angular dashboards.',
    summary: 'Live tracking, geofences and route history for 15,000+ vehicles.',
    overview:
      'A fleet-tracking platform serving more than 15,000 vehicles: live positions, route history, geofences, telemetry, alerts and dashcam streams.',
    built: [
      'Angular dashboards for live tracking, route history, geofencing, telemetry charts, alerts, dashcam viewing and exports.',
      'Deferred Google Maps key access until configuration was ready, fixing cold-start failures across six map modules.',
      'Geofence loading cut from five to ten duplicate requests to one per session.',
      'Fixed a marker-cluster lifecycle bug that forced a full page reload after 14 clicks.',
    ],
    highlights: [
      { value: '15,000+', label: 'vehicles on the platform' },
      { value: '5–10 → 1', label: 'geofence requests per session' },
    ],
    note: 'Internal product, so no public link.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'NGXS', 'Google Maps', 'Socket.IO'],
    links: [],
    art: 'vamosys',
  },
  {
    id: 'carz-moto',
    title: 'CARZ MOTO',
    subtitle: 'Car-interiors business, Chennai',
    period: '2026',
    role: 'Website, UX audit and fixes.',
    summary: 'A one-page site that turns ad clicks into WhatsApp chats.',
    overview:
      'A one-page site for a Chennai car-interiors shop. Its one job is to turn a stranger from a Facebook or Instagram ad into a WhatsApp conversation. A separate repository holds the shop’s billing app.',
    built: [
      'WhatsApp is the only lead channel: 12 entry points and a floating button within thumb reach, with no form.',
      'Each button opens WhatsApp with its own pre-filled message, built by one shared helper that replaced a link copied into nine files.',
      'Lead events record which button produced them, ready for Meta Pixel once the shop’s ID is connected.',
      'Sections answer doubts in order: a ₹1,999 starting price, local reviews, then free fitting and a one-year warranty.',
      'Reduced motion, visible keyboard focus and an accessible menu button.',
    ],
    highlights: [
      { value: '12', label: 'UX issues found' },
      { value: '8', label: 'fixed' },
      { value: '4', label: 'waiting on the business' },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Icons', 'Meta Pixel', 'GitHub Pages'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/carzmoto_site/' },
      { label: 'Code', href: 'https://github.com/hafiz475/carzmoto_site' },
      { label: 'Billing app code', href: 'https://github.com/hafiz475/carzMoto' },
    ],
    caseStudyId: 'carz-moto',
    screenshot: { desktop: carzDesktop, phone: carzPhone },
  },
  {
    id: 'ai-job',
    title: 'JobMatch AI',
    subtitle: 'AI job recommendation system',
    period: 'Mar 2026',
    role: 'Full-stack, solo, built with AI coding agents.',
    summary: 'Upload a resume and get job matches that explain themselves.',
    overview:
      "Upload a resume as PDF, DOCX or TXT and get job recommendations with a match score, the skills you have, the skills you're missing, and why.",
    built: [
      'Resume parsing for PDF, DOCX and TXT with pdfplumber, PyPDF2 and python-docx.',
      'Analysis with Google Gemini or OpenAI, chosen by configuration rather than hard-coded keys.',
      'FastAPI endpoints with Pydantic validation; PostgreSQL through SQLAlchemy with Alembic migrations.',
      'A React and TypeScript front end with clear upload, loading, error and results states.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'Pydantic', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Google Gemini', 'OpenAI', 'pdfplumber', 'Vercel'],
    links: [
      { label: 'Live', href: 'https://ai-job-recommendation-system-omega.vercel.app/' },
      { label: 'Code', href: 'https://github.com/hafiz475/AI-Job-Recommendation-System' },
    ],
    screenshot: { desktop: aiJobDesktop, phone: aiJobPhone },
  },
  {
    id: 'help',
    title: 'Help',
    subtitle: 'JavaScript & Node.js knowledge map',
    period: 'Oct 2026',
    role: 'Design and build, solo.',
    summary: 'A visual map for learning JavaScript, Node.js and computer science.',
    overview:
      'Topics as a connected map instead of a long lesson. Tap a card to open its explanation in the notebook, and follow threads to related ideas.',
    built: [
      'One readability rule: up to three children stay keywords; more become one ordered card.',
      'At most three threads per node, coloured by depth, with collision checks when placing cards.',
      'Grew from 2 topic webs to 14 with no new UI.',
      'A computer-science tree that places 113 topics in eight layers.',
      'Spider, Tree and Group views, keyword search and a dark theme.',
    ],
    highlights: [
      { value: '2 → 14', label: 'topic webs' },
      { value: '113', label: 'CS topics in eight layers' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Canvas', 'Lucide React', 'GitHub Pages'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/help/' },
      { label: 'Code', href: 'https://github.com/hafiz475/help' },
    ],
    caseStudyId: 'help-knowledge-map',
    screenshot: { desktop: helpDesktop, phone: helpPhone },
  },
  {
    id: 'direction7-billing',
    title: 'Direction7 Billing',
    subtitle: 'Restaurant billing & inventory MVP',
    period: 'Jun 2023 – Jan 2024',
    role: 'Freelance full-stack developer, working remotely across a 12-hour time difference.',
    summary: 'Billing, stock and WhatsApp receipts for seven food businesses in California.',
    overview:
      'A mobile-friendly billing and inventory app for independent food businesses in Santa Clara, California: food trucks, a chaat vendor, a chai shop and a sweet shop.',
    built: [
      'Mobile-number login, inventory and billing delivered in about two months, and launched in the third.',
      'Completing a bill deducts the sold quantities from stock, so sales and inventory stay in sync.',
      'Receipts shared through pre-filled WhatsApp links, with no paid messaging API.',
      'One reusable PDF invoice template, generated in background workers with PDFKit and Sharp, used by all seven businesses.',
    ],
    highlights: [
      { value: '7', label: 'food businesses' },
      { value: '~8,500', label: 'bills in the first five months' },
      { value: '$10', label: 'per store per month' },
    ],
    note: 'Client project. The source code is not public.',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'PDFKit', 'Sharp', 'Cloudflare R2', 'DigitalOcean'],
    links: [],
    art: 'direction7-billing',
  },
  {
    id: 'iron-man-workshop',
    title: 'Iron Man Workshop',
    subtitle: 'Interactive 3D environment',
    period: 'Dec 2025 – Jan 2026',
    role: 'Design and build, solo.',
    summary: 'A Stark-style workshop that tells my story in 3D.',
    overview:
      'An Iron Man-inspired workshop rendered in the browser. Holographic panels walk through my life log, from football to mechanical engineering to software.',
    built: [
      'Real-time rendering with Three.js and React Three Fiber, with layered models, lighting and materials.',
      'Holographic life-log panels and an assembly-floor toggle.',
      'Post-processing and Framer Motion transitions for a cinematic feel.',
    ],
    stack: ['React 19', 'Three.js', 'React Three Fiber', 'Drei', 'Postprocessing', 'Framer Motion', 'Sass', 'Vite'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/project_mark47/' },
      { label: 'Code', href: 'https://github.com/hafiz475/project_mark47' },
    ],
    screenshot: { desktop: mark47Desktop },
  },
  {
    id: 'smart-assistant',
    title: 'Smart Assistant',
    subtitle: 'Gemini-powered chatbot',
    period: 'Mar 2026',
    role: 'Full-stack, solo.',
    summary: 'An AI chat assistant with saved conversations and notes.',
    overview:
      'A chatbot with persistent conversations and a notes system. Prompt suggestions replace the blank first screen, and any answer can be saved to notes and exported.',
    built: [
      'Next.js client with Ant Design, Markdown answers and syntax-highlighted code.',
      'Express API calling Gemini, with conversations and notes stored in PostgreSQL.',
      'Helmet, CORS, rate limiting, request validation and JWT auth on the API.',
      'Installable as a PWA, with Docker, Docker Compose and Nginx configuration for deployment.',
    ],
    note: 'No live demo yet; the code is public.',
    stack: ['Next.js 16', 'React', 'Ant Design', 'React Markdown', 'TypeScript', 'Node.js', 'Express', 'Google Gemini', 'PostgreSQL', 'JWT', 'Winston', 'Docker', 'Nginx', 'PWA'],
    links: [{ label: 'Code', href: 'https://github.com/hafiz475/Smart-Assistant-Chatbot-' }],
    art: 'smart-assistant',
  },
  {
    id: 'hafiz-odyssey',
    title: 'Hafiz Odyssey',
    subtitle: 'Cinematic engineering portfolio',
    period: 'Jun 2026',
    role: 'Design and build, solo.',
    summary: 'From mechanical engineering to product engineering, told cinematically.',
    overview:
      'A cinematic portfolio about moving from mechanical engineering to product engineering and entrepreneurship, with a 3D skills orbit, a career timeline, a founder lab and an AI section.',
    built: [
      'A 3D particle skills orbit built with React Three Fiber.',
      'Career timeline, product dashboard, founder lab and AI sections in one scroll story.',
      'Smooth scrolling with Lenis and GSAP-driven reveals.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Three.js', 'React Three Fiber', 'Drei', 'GSAP', 'Lenis', 'Framer Motion', 'Tailwind CSS', 'Lucide React'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/hafiz-odyssey/' },
      { label: 'Code', href: 'https://github.com/hafiz475/hafiz-odyssey' },
    ],
    screenshot: { desktop: odysseyDesktop, phone: odysseyPhone },
  },
  {
    id: 'caly',
    title: 'Caly',
    subtitle: 'Appointment scheduling engine',
    period: 'At BizMagnets',
    role: 'Backend and WhatsApp booking integration.',
    summary: 'Slots, bookings and Google Calendar sync, booked inside WhatsApp.',
    overview:
      'Scheduling for businesses that take bookings over WhatsApp: availability rules, slot generation, conflict-free booking and calendar sync.',
    built: [
      'A slot engine using weekday availability, durations, buffers and half-open intervals, across 42 REST endpoints.',
      'Redis locks and layered conflict checks to prevent double bookings, with short holds that release themselves.',
      'Google Calendar sync with Meet links, OAuth token refresh and idempotent updates.',
      'Booking and rescheduling inside WhatsApp Flows, with timezone-aware reminders.',
    ],
    highlights: [
      { value: '1,200 → 80 ms', label: 'slot lookup' },
      { value: '15 / week → 0', label: 'double bookings over six months' },
    ],
    note: 'Internal product, so no public link. Figures are from internal measurements.',
    stack: ['Node.js', 'TypeScript', 'NestJS', 'Fastify', 'Redis', 'Drizzle', 'Prisma', 'Google Calendar API', 'WhatsApp Flows', 'Luxon'],
    links: [],
    art: 'caly',
  },
  {
    id: 'fittracker',
    title: 'FitTracker',
    subtitle: 'Fitness tracking dashboard',
    period: 'Mar 2026',
    role: 'Full-stack, solo.',
    summary: 'Workouts, meals, BMI and progress in one dashboard.',
    overview:
      "A MERN fitness app to log workouts, plan meals, track BMI and progress, and get reminders. One dashboard shows today's status, and empty states always offer the next action.",
    built: [
      'Workout logging, meal planning and BMI tracking.',
      'Progress charts for weight and BMI with Chart.js.',
      'Scheduled reminders with node-cron.',
      'Express API with JWT auth, bcrypt password hashing and request validation; MongoDB through Mongoose.',
    ],
    stack: ['React', 'Vite', 'React Router', 'Ant Design', 'Chart.js', 'Axios', 'Day.js', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'node-cron'],
    links: [
      { label: 'Live', href: 'https://fittracker-chi.vercel.app/' },
      { label: 'Code', href: 'https://github.com/hafiz475/fittracker' },
    ],
    art: 'fittracker',
  },
  {
    id: 'parallax-seaview',
    title: 'Parallax Seaview',
    subtitle: 'Motion and depth experiment',
    period: 'Nov 2025 – Jan 2026',
    role: 'Design and build, solo.',
    summary: 'A seaside scene that moves through the day as you scroll.',
    overview: 'A layered seaside scene that travels through the day as you scroll, with planes, ships and ambient sound.',
    built: [
      'Layered scenes that create depth through relative movement.',
      'Noisy trackpad scrolling becomes one scene per gesture: small scrolls are ignored and input locks during the 1.4-second crossfade.',
      'GSAP timelines for motion and Howler for audio.',
    ],
    stack: ['React 19', 'GSAP', 'Howler', 'Vite', 'GitHub Pages'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/Parallax_Seaview/' },
      { label: 'Code', href: 'https://github.com/hafiz475/Parallax_Seaview' },
    ],
    screenshot: { desktop: seaviewDesktop },
  },
  {
    id: 'neo-ninja',
    title: 'Neo Ninja',
    subtitle: 'Nippon Paint · tablet quotation app',
    period: 'Ideassion · 2022–23',
    role: 'One of four frontend engineers in a team of about 12.',
    summary: 'Measure, quote, sign and take payment in one home visit.',
    overview:
      'Sales reps used to take about three days to turn a home visit into a priced quote. Neo Ninja lets them capture rooms, calculate paint, present the quote, get a signature and start payment in the same visit.',
    built: [
      'A 3×3 room selector, from hall to staircase, and accordion forms for length × breadth × height, colours and package tiers.',
      'Paint quantity and price inputs that turn room sizes into estimates.',
      'Quote state kept in React Context with local and session storage, so an accidental tablet refresh loses nothing.',
      'A Razorpay module for full payment or up to three instalments, with a payment-status dashboard and push alerts.',
    ],
    highlights: [
      { value: '1 h → 30 min', label: 'estimate for a 1,200 sq ft home' },
      { value: '15 → 50', label: 'reps using it within a month' },
    ],
    note: 'Client project for Nippon Paint, so no public link. The sales team also reported lead conversion rising from about 10% to nearly 50%.',
    stack: ['React', 'JavaScript', 'React Context', 'KendoReact', 'Material UI', 'SCSS', 'Razorpay', 'Firebase Cloud Messaging', 'Recharts', 'Figma'],
    links: [],
    art: 'neo-ninja',
  },
  {
    id: 'ackumen',
    title: 'Ackumen',
    subtitle: 'Buckman · cooling-tower monitoring',
    period: 'Ideassion · 2022–23',
    role: 'Frontend maintenance engineer on a live industrial IoT platform.',
    summary: 'Live cooling-tower chemistry and alarms for industrial sites.',
    overview:
      'A live dashboard for cooling-tower chemistry and operations: conductivity, pH, ORP, temperatures, flow, fan vibration and motor current, streamed from sensors.',
    built: [
      'Maintained four production pages: Dashboard, Cooling Tower Detail, Alarms and Predictive.',
      'Fixed a race where switching towers quickly let an older response overwrite the newest readings, using Redux-Saga takeLatest.',
      'A reusable useRealtimeData hook for Socket.IO subscribe, reconnect and cleanup.',
      'Team practices: lightweight metric tiles, central sensor thresholds, memoised charts, and live data kept separate from history.',
    ],
    highlights: [{ value: '~40%', label: 'faster dashboard response, measured in the Network tab' }],
    note: 'Client project for Buckman, so no public link.',
    stack: ['React', 'Redux-Saga', 'Socket.IO', 'KendoReact', 'Material UI', 'Bootstrap', 'SCSS', 'Recharts', 'Webpack'],
    links: [],
    art: 'ackumen',
  },
];
