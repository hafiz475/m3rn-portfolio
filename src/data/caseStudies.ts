import type { ArtId } from '../components/illustrations/palette';

export interface CaseLink {
  label: string;
  href: string;
}

export type CaseBlock =
  | { type: 'text'; value: string; lead?: string }
  | { type: 'list'; items: string[] }
  | { type: 'iterations'; rows: { version: string; tried: string; result: string; kept?: boolean }[] }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'note'; value: string }
  | { type: 'figure'; art: ArtId; caption: string };

export interface CaseSection {
  heading: string;
  blocks: CaseBlock[];
}

export interface CaseStudy {
  id: string;
  kind: string;
  indexLabel: string;
  project: string;
  blurb: string;
  date: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  links: CaseLink[];
  /** Illustration shown as the case study's cover */
  cover: ArtId;
  sections: CaseSection[];
  principle: string;
}

export interface QuickFix {
  title: string;
  problem: string;
  decision: string;
  result: string;
  tickets?: string[];
}

export interface MoreProject {
  title: string;
  description: string;
  links: CaseLink[];
}

export const PROFILE_LINKS: CaseLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jmdhafizurrahman' },
  { label: 'GitHub', href: 'https://github.com/hafiz475' },
  { label: 'mohammed.hafiz.4755@gmail.com', href: 'mailto:mohammed.hafiz.4755@gmail.com' },
];

export const CASE_STUDY_PRINCIPLES = [
  { title: 'Find the dead end first.', body: 'Start from the moment a real person gets stuck, not from the feature list.' },
  { title: 'One source of truth.', body: 'If two parts of a screen can disagree, sooner or later they will.' },
  { title: 'Controls keep their promises.', body: "If it looks clickable, it works. If it can't work, it doesn't look clickable." },
  { title: "Claim only what's measured.", body: "Outcomes here are what shipped. Where there's no user data yet, I say so." },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sirat',
    kind: 'Client project',
    indexLabel: 'Client',
    project: 'Sirat',
    blurb: 'Sirat, a counselling practice website',
    date: '2026',
    title: 'A booking journey for people who are struggling',
    summary:
      "The booking page was a dead end at the moment someone reached out for help. I replaced it with a gentle six-step intake that asks only what's needed and never sends anything without the person seeing it first.",
    role: 'Design and build, solo.',
    stack: ['Next.js 16', 'React', 'TypeScript', 'Sass', 'Tailwind CSS', 'Framer Motion', 'Lottie', 'Lucide React', 'Vercel'],
    links: [
      { label: 'Live site', href: 'https://www.sirat.co.in/' },
      { label: 'Code', href: 'https://github.com/hafiz475/amina-fathima-psychology' },
    ],
    cover: 'sirat',
    sections: [
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'text',
            value:
              "The Book page was a placeholder that pointed to a contact form, and the form didn't send anything. A person looking for counselling hit a dead end.",
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'A six-step guided intake with warm step names (“A gentle beginning”) and a reassurance note on every step (“You do not need clinical words”).',
              'Only the essentials are required, and two whole steps can be skipped, so nobody feels pushed to disclose.',
              "An “I'm not sure yet” option, so people don't have to diagnose themselves.",
              'Follow-up questions change with the chosen service, and workplace requests branch again for HR or managers. One form serves individuals, couples, EAP clients and organisations. Changing the service clears the old answers.',
              'Duty of care: choosing crisis support shows an emergency notice and makes urgency required.',
              "Privacy first, with no backend. A review screen comes first, and WhatsApp opens only when the person chooses. If no number is set, the site offers Copy instead of opening a contact picker, so details can't go to the wrong person.",
              'Copy that sets expectations: “This is a request, not an instant confirmation” and “No payment is collected here”.',
              "Accessible by default: focus moves to each step's heading, the first error gets focus, steps are marked for screen readers, motion can be reduced, and touch targets are at least 44 px.",
            ],
          },
          {
            type: 'figure',
            art: 'fig-sirat-review',
            caption: 'Nothing leaves the site until the person has seen their answers and chosen how to send them.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'text',
            value:
              'The dead end became a guided path that works for four kinds of client, with nothing sensitive sent silently. Along the way, a long wall of service cards became a keyboard- and swipe-friendly topic explorer on mobile.',
          },
          { type: 'note', value: 'This is a design result. The site has no analytics yet, so there are no completion numbers.' },
        ],
      },
      {
        heading: 'Trade-off',
        blocks: [
          {
            type: 'text',
            value:
              "Answers are lost if the page refreshes. That's deliberate, because nothing is stored, but it costs something on a six-step form. Next: connect the practice's WhatsApp number and add step-level drop-off tracking.",
          },
        ],
      },
    ],
    principle: 'When someone is struggling, every question has to earn its place.',
  },
  {
    id: 'direction7-messages',
    kind: 'My product',
    indexLabel: 'My product',
    project: 'Direction7 · Messages',
    blurb: 'Direction7, a local-commerce platform',
    date: 'Sep 2026',
    title: 'Counts you can trust: the inbox as a work queue',
    summary:
      'The header badges were expensive to draw, and the obvious paging shortcut would have made every tab number wrong. I fixed the first and held back the second.',
    role: 'Product owner and engineer, working with AI coding agents.',
    stack: ['React', 'Next.js', 'Redux Toolkit', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Socket.IO'],
    links: [],
    cover: 'direction7-messages',
    sections: [
      {
        heading: 'Context',
        blocks: [
          {
            type: 'text',
            value:
              "The Messages page is each business's work queue: Pending, Responded and Sent tabs; request tabs for connections, suppliers, fulfilment, delivery and partners; and Accept, Decline, Cancel and Disconnect actions.",
          },
        ],
      },
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'text',
            value: 'To draw two small badges in the header, unread and pending, the app downloaded the entire inbox every time.',
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'text',
            lead: 'Shipped: count on the server.',
            value:
              "Testing against a real service caught a case where the badge counted a message the inbox never showed (company names containing a dot). So the count now runs the inbox's own query, and the two can't disagree.",
          },
          {
            type: 'figure',
            art: 'fig-d7-single-source',
            caption: 'The header badges and the inbox tabs now read the same server query.',
          },
          {
            type: 'text',
            lead: 'Deliberately not shipped: a “Load older” button.',
            value:
              'Every tab number and unread dot is counted from the loaded messages, so partial loading would show wrong numbers until the user scrolled back. Doing it properly means the server sorts messages into tabs and returns per-tab counts with the first page. I chose to wait until inbox volume needs it rather than ship numbers that lie.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'text',
            value:
              'On real data, the new server count matched the old count for all 14 sellers, and the header no longer downloads the inbox to draw two badges.',
          },
        ],
      },
    ],
    principle: "In a work queue, the numbers are part of the design. Don't ship a half-solution that makes them wrong.",
  },
  {
    id: 'bizmagnets-bot-builder',
    kind: 'Team project',
    indexLabel: 'Team, B2B SaaS',
    project: 'BizMagnets.ai · Bot builder',
    blurb: 'BizMagnets.ai, WhatsApp engagement for 100+ businesses',
    date: '2024–2026',
    title: 'A chatbot builder that hides the JSON',
    summary:
      'Every WhatsApp chatbot used to be developer-written JSON. We turned it into a canvas that non-technical clients can use, with guardrails that stop them breaking a live bot.',
    role: 'Frontend lead. I lead the five-person frontend team that builds it.',
    stack: ['React', 'TypeScript', 'React Flow', 'Redux Toolkit', 'TanStack Query', 'Monaco Editor', 'Socket.IO', 'Vite'],
    links: [],
    cover: 'bizmagnets-bot-builder',
    sections: [
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'text',
            value:
              'Businesses need chatbots that ask questions, branch on answers, call outside tools and hand off to a person. Setting one up meant waiting for a developer.',
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'A drag-and-drop canvas with a grouped element palette. Searching opens every category at once, so all matches show together.',
              'No Save button. Changes save automatically 300 ms after the last edit.',
              'Draft and live side by side: a read-only view of the published version sits next to the working draft.',
              "Errors where they happen: a node with a problem gets a red marker, and publishing stays blocked until it's fixed.",
              'Guardrails: a “Jump to flow” step can’t point to an unpublished flow, and nodes can be locked.',
              'Every integration step (Shopify, Google Sheets, Razorpay, Zoho, HubSpot and more) has its own success and failure branch.',
              'A template library, so nobody starts from a blank canvas.',
            ],
          },
          {
            type: 'figure',
            art: 'fig-bot-draft-live',
            caption: 'The published bot stays read-only beside the draft, and a red marker blocks publishing until it is fixed.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [{ type: 'text', value: 'Non-technical clients now build their own bots, and client setup time fell by 60%.' }],
      },
    ],
    principle: 'Hide the format, keep the guardrails.',
  },
  {
    id: 'help-knowledge-map',
    kind: 'Personal project',
    indexLabel: 'Personal',
    project: 'Help',
    blurb: 'Help, a visual map for learning JavaScript, Node.js and CS',
    date: 'Oct 2026',
    title: 'Making a dense knowledge map readable',
    summary:
      'A visual map for learning JavaScript, Node.js and computer science turned into a tangle as topics grew. One simple rule fixed it, and kept working as the map grew sevenfold.',
    role: 'Design and build, solo.',
    stack: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Canvas', 'Lucide React', 'GitHub Pages'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/help/' },
      { label: 'Code', href: 'https://github.com/hafiz475/help' },
    ],
    cover: 'help-knowledge-map',
    sections: [
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'list',
            items: [
              'Every concept had its own node and thread. A nine-stage topic, such as the BullMQ job lifecycle, fanned into nine overlapping threads.',
              'Cards collided as the map grew, and 324 px cards cut names off mid-word.',
              'A legend, a Details toggle and a Help modal competed with the content, and scrolling the notebook also zoomed the map.',
            ],
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'One rule: a node with three children or fewer keeps them as keywords; more than three become one ordered card.',
              'At most three threads per node, one thread to the parent, and no concept drawn twice.',
              'Cards widened to 500 px so rows fit 50 characters, with collision checks when placing them.',
              'Threads coloured by depth, and tapping a card opens its explanation in the notebook. Notebook scrolling no longer moves the map.',
              'Removed the per-card subtitle, the floating legend, the Details toggle and the Help modal.',
              'Rejected: hiding level three behind Details. It tidied the map, but hid the content learners came for.',
            ],
          },
          {
            type: 'figure',
            art: 'fig-help-rule',
            caption: 'One rule: up to three children stay keywords; more than three become one ordered card.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'text',
            value:
              'The map grew from 2 topic webs to 14, and the seven added in late October reused the card rule with no new UI. No node draws more than three threads, and cards no longer overlap. A computer-science tree now places 113 topics in eight layers, 14 of them live.',
          },
          { type: 'note', value: 'Not yet measured with learners.' },
        ],
      },
      {
        heading: 'Next',
        blocks: [
          {
            type: 'text',
            value:
              "With the legend gone, colour is the only cue for depth, which fails WCAG 1.4.1. Map nodes aren't reachable by keyboard yet, and removing Help also removed the only explanation of the gestures. These are next.",
          },
        ],
      },
    ],
    principle: 'Past three, an ordered list beats a fan.',
  },
  {
    id: 'carz-moto',
    kind: 'Client project',
    indexLabel: 'Client',
    project: 'CARZ MOTO',
    blurb: 'CARZ MOTO, a car-interiors business in Chennai',
    date: 'Oct 2026',
    title: 'From an ad to a WhatsApp chat in one tap',
    summary:
      'A one-page site for a Chennai car-interiors business has one job: turn a stranger from a Facebook or Instagram ad into a WhatsApp chat. I audited every step of that path and fixed what got in the way.',
    role: 'UX audit and fixes.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Icons', 'Meta Pixel', 'GitHub Pages'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/carzmoto_site/' },
      { label: 'Code', href: 'https://github.com/hafiz475/carzmoto_site' },
    ],
    cover: 'carz-moto',
    sections: [
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'text',
            value:
              "Visitors don't know the shop, “premium” reads as expensive, and forms feel like a commitment. On top of that, every WhatsApp button opened an empty chat, so the shop couldn't tell what a lead wanted. Two footer links led nowhere, and lead tracking wasn't connected yet.",
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'WhatsApp is the only lead channel: 12 entry points, a floating button within thumb reach, and no form.',
              'Each button opens WhatsApp with its own message, such as “Hi CARZ MOTO, I’d like a quote for Ambient Lighting.” One shared helper replaced a link that had been copied into nine files.',
              'Every lead event records which button produced it, so the business can see which offers actually pull.',
              'Sections answer doubts in order: a ₹1,999 starting price early, local reviews, then free fitting and a one-year warranty.',
              "Removed false promises: a magnifier icon and pointer cursor suggested a zoom that didn't exist. Gallery labels are now always visible on phones.",
              "Reduced motion, visible keyboard focus, and a menu button that announces whether it's open.",
            ],
          },
          {
            type: 'figure',
            art: 'fig-carz-intent',
            caption: 'One helper builds every WhatsApp link, so each button tells the shop what the visitor wanted.',
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'stats',
            items: [
              { value: '12', label: 'issues found' },
              { value: '8', label: 'fixed' },
              { value: '4', label: 'need the business' },
            ],
          },
          {
            type: 'text',
            value:
              'The four open items need facts only the business has: its tracking ID, opening hours, social links and real install photos. No conversion gain is claimed until tracking has two to four weeks of data.',
          },
        ],
      },
    ],
    principle: 'Every button should tell the business what the visitor wanted.',
  },
  {
    id: 'my-life-journey',
    kind: 'Personal project',
    indexLabel: 'Personal',
    project: 'My Life Journey',
    blurb: 'My Life Journey, an interactive 3D resume',
    date: 'Dec 2025 – Jan 2026',
    title: 'Designing a “you can click this” signal for a 3D world',
    summary:
      'An interactive 3D resume: visitors fly through a storm, land on an island and walk into my room, where each object opens part of my story. A 3D scene has no blue links, so clickability had to be designed from scratch.',
    role: 'Design and build, solo, over seven weeks.',
    stack: ['React', 'Three.js', 'React Three Fiber', 'Drei', 'React Spring', 'GSAP', 'Postprocessing', 'Lottie', 'Sass', 'Vite', 'Blender'],
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/MY_LIFE_JOURNEY_3d/' },
      { label: 'Code', href: 'https://github.com/hafiz475/MY_LIFE_JOURNEY_3d' },
    ],
    cover: 'my-life-journey',
    sections: [
      {
        heading: 'Problem',
        blocks: [
          {
            type: 'text',
            value:
              'Visitors either missed the interactive objects or opened scenes by accident. The whole windmill and the whole seaplane were clickable, so dragging to turn the camera often triggered navigation.',
          },
        ],
      },
      {
        heading: 'Iterations',
        blocks: [
          {
            type: 'iterations',
            rows: [
              { version: 'v1', tried: 'Ten large glowing spheres, each a different colour', result: 'Noisy. The colours meant nothing.' },
              { version: 'v2', tried: 'Small, uniform silver dots with a faint pulse', result: 'Too subtle. Nobody noticed them.' },
              {
                version: 'v3',
                tried: 'Small white dots with a pulsing cyan glow, and dimmer daytime light behind them',
                result: 'Visible without clutter. Kept.',
                kept: true,
              },
            ],
          },
          {
            type: 'figure',
            art: 'fig-mlj-iterations',
            caption: 'The three versions on the same scene. Only v3 is visible without adding clutter.',
          },
        ],
      },
      {
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'One signal across the whole site: a pulsing cyan dot always means “you can interact with this”.',
              'Only the dot is clickable, not the whole object, so people can explore freely without misclicks.',
              'Hotspots appear only when they can be used. The windmill lights up after the seaplane lands, which guides the order without instructions.',
              'On phones: swipes need at least 50 px and lock for 1.2 seconds, so one swipe never skips two scenes. Text moves below the plane on narrow screens.',
            ],
          },
        ],
      },
      {
        heading: 'Outcome',
        blocks: [
          {
            type: 'text',
            value:
              'Accidental navigation stopped, and a visitor who learns the signal in the first scene can use it everywhere. The full journey now works on phones, tablets and desktops.',
          },
          {
            type: 'note',
            value:
              'Not yet tested with users. Next: five usability tests to check whether first-time visitors find the dots unaided, and a skip-intro for recruiters in a hurry.',
          },
        ],
      },
    ],
    principle: 'When nothing is clickable by default, one consistent signal has to do all the work.',
  },
];

export const QUICK_FIXES: QuickFix[] = [
  {
    title: 'Back should go back',
    problem: 'Back showed a step from a form deleted months earlier, or changed the address but left the form on screen.',
    decision: 'The address is the only record of where the user is, and picking a vehicle is a normal page change.',
    result: 'Back works from both buttons. The dead step was deleted, and two tests fail against the old page.',
  },
  {
    title: 'A button that looks enabled must work',
    problem: 'Add to Cart looked enabled but did nothing for products with no stock number, while the cart treated them as unlimited.',
    decision: 'No stock number means zero, and the button visibly says so. A first add takes the amount asked for, up to stock.',
    result: 'Look and behaviour match, and the cart and product agree.',
    tickets: ['DEL-553', 'ANA-345', 'INV-153'],
  },
  {
    title: 'One thing, one name',
    problem: 'One feature had two names in eight places, and “delivery map” undersold what it does.',
    decision: '“Partner Ecosystem Map” everywhere. Old links redirect and keep their settings.',
    result: 'No broken links, and the redirect tests caught a crash on odd addresses.',
    tickets: ['DEL-592', 'DEL-593'],
  },
  {
    title: 'Cards that were never drawn',
    problem:
      'On ten dashboards, cards had no background or border. The styles used colour names the theme never defined, and CSS drops those rules silently.',
    decision: 'Point every use at a real theme colour, give dividers explicit light and dark values, and load the font once.',
    result: 'Cards render as designed in both themes. “Only the theme’s own colour names exist” is now a written rule.',
  },
  {
    title: "Opening a chat shouldn't download the whole chat",
    problem: 'Every chat loaded its full history, and switching quickly could show a reply in the wrong conversation.',
    decision: 'Open with the newest 50 messages, never move the reader, and discard replies for chats that are no longer open.',
    result: 'The cross-chat race is gone, and a chat opens with one page.',
    tickets: ['COMM-938 to COMM-942'],
  },
];

export const MORE_PROJECTS: MoreProject[] = [
  {
    title: 'AI Job Recommendation System',
    description:
      "Every match explains itself: a score, the skills you have, the skills you're missing, and why. Built with AI coding agents.",
    links: [
      { label: 'Live', href: 'https://ai-job-recommendation-system-omega.vercel.app/' },
      { label: 'Code', href: 'https://github.com/hafiz475/AI-Job-Recommendation-System' },
    ],
  },
  {
    title: 'Smart Assistant Chatbot',
    description: 'Prompt suggestions replace the blank first screen, and any answer can be saved to notes and exported.',
    links: [{ label: 'Code', href: 'https://github.com/hafiz475/Smart-Assistant-Chatbot-' }],
  },
  {
    title: 'FitTracker',
    description: "One dashboard for today's status. Empty states always offer the next action, such as “Log your first workout”.",
    links: [
      { label: 'Live', href: 'https://fittracker-chi.vercel.app/' },
      { label: 'Code', href: 'https://github.com/hafiz475/fittracker' },
    ],
  },
  {
    title: 'Parallax Seaview',
    description:
      'Noisy trackpad scrolling becomes one scene per gesture: small scrolls are ignored and input locks during the 1.4-second crossfade.',
    links: [
      { label: 'Live', href: 'https://hafiz475.github.io/Parallax_Seaview/' },
      { label: 'Code', href: 'https://github.com/hafiz475/Parallax_Seaview' },
    ],
  },
];
