export const sectionIds = ['projects', 'skills', 'about', 'contact'];

export const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'custom', label: 'Custom Build' },
  { id: 'wordpress', label: 'WordPress' }
];

export const webProjects = [
  {
    slug: 'goldenislandtours',
    size: 'large',
    category: ['custom'],
    title: 'goldenislandtours.com',
    subtitle: 'Tourism platform for a Sri Lankan tour operator',
    year: '2025',
    type: 'Custom build',
    role: 'Solo developer — design, build, and deploy',
    description:
      'Hand-coded tourism site with per-destination weather, interactive maps, and an email booking flow.',
    overview:
      'A production tourism website built entirely from scratch — no framework and no page builder — so the whole experience stays fast on mobile data, which is how most visitors arrive. It covers the full tour catalogue, live conditions at each destination, map-based discovery, and a booking request flow that lands directly in the operator’s inbox.',
    highlights: [
      'Built the complete front end in semantic HTML, CSS, and vanilla JavaScript, keeping the payload small and avoiding framework overhead on a content-driven site.',
      'Integrated the Google Maps JavaScript API so each destination renders an interactive map with custom markers rather than a static image.',
      'Wired a weather API into every destination page to show real-time conditions, with graceful fallbacks when the request fails or rate-limits.',
      'Implemented an email-based booking flow that validates input client-side and delivers structured enquiries to the operator.',
      'Handled SEO end to end: semantic structure, meta and Open Graph tags, sitemap, and compressed responsive images.'
    ],
    stack: [
      { group: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6)'] },
      { group: 'APIs', items: ['Google Maps JavaScript API', 'Weather API'] },
      { group: 'Practices', items: ['Responsive design', 'Technical SEO', 'Image optimisation'] }
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Google Maps API', 'SEO'],
    liveUrl: 'https://goldenislandtours.com',
    repoUrl: null,
    image: '/uploads/images/Sites/site1.webp'
  },
  {
    slug: 'techanologia',
    size: 'medium',
    category: ['wordpress'],
    title: 'techanologia.com',
    subtitle: 'Private LMS for A/L technology students',
    year: '2025',
    type: 'WordPress build',
    role: 'Solo developer — architecture, build, and hardening',
    description:
      'A private learning platform with role-based access control, encrypted data, and API integrations.',
    overview:
      'A closed learning management system for advanced-level technology students in Sri Lanka. The brief was security-first: course material had to reach enrolled students only, and student data had to be protected end to end to satisfy the institution’s requirements.',
    highlights: [
      'Architected role-based access control so students, instructors, and administrators each see only the content and actions their role permits.',
      'Configured secure course delivery so lesson material is gated behind enrolment rather than served from public URLs.',
      'Set up encryption for data in transit and at rest to meet the institution’s data-handling requirements.',
      'Integrated third-party APIs for enrolment and content workflows, reducing manual administration.',
      'Extended WordPress with custom configuration and plugin work instead of accepting stock behaviour where it did not fit the model.'
    ],
    stack: [
      { group: 'Platform', items: ['WordPress', 'PHP', 'MySQL'] },
      { group: 'Features', items: ['LMS', 'Role-based access control', 'API integrations'] },
      { group: 'Security', items: ['Data encryption', 'Gated content delivery'] }
    ],
    tags: ['WordPress', 'LMS', 'API Integrations', 'RBAC', 'Data Encryption'],
    liveUrl: 'https://techanologia.com',
    repoUrl: null,
    image: '/uploads/images/Sites/site2.webp'
  },
  {
    slug: 'ecobhoomikl',
    size: 'medium',
    category: ['wordpress', 'ecommerce'],
    title: 'ecobhoomikl.com',
    subtitle: 'Landscaping site with a live WooCommerce store',
    year: '2024',
    type: 'WordPress + WooCommerce',
    role: 'Solo developer — build and store setup',
    description:
      'A landscaping business site combining services, gallery, and a working online store.',
    overview:
      'A site for a professional landscaping company that had to do two jobs at once: present the business — services, portfolio gallery, and background — and run a real storefront where customers browse products and order directly, without being handed off to a third-party marketplace.',
    highlights: [
      'Set up WooCommerce end to end: product catalogue, cart, checkout, and order handling.',
      'Built a filterable project gallery so past landscaping work reads as a portfolio rather than a photo dump.',
      'Structured the information architecture so the marketing pages and the store share one navigation without competing.',
      'Customised the theme and templates so the store matched the brand instead of the stock WooCommerce look.',
      'Tuned the site for mobile, where most of the traffic browses the gallery.'
    ],
    stack: [
      { group: 'Platform', items: ['WordPress', 'WooCommerce', 'PHP'] },
      { group: 'Features', items: ['E-commerce', 'Product catalogue', 'Filterable gallery'] },
      { group: 'Practices', items: ['Theme customisation', 'Responsive design'] }
    ],
    tags: ['WordPress', 'WooCommerce', 'E-commerce', 'Gallery'],
    liveUrl: 'https://ecobhoomikl.com',
    repoUrl: null,
    image: '/uploads/images/Sites/site3.webp'
  }
];

export const applicationProjects = [
  {
    slug: 'focus',
    size: 'large',
    title: 'Focus',
    subtitle: 'Distraction-free deep work app for macOS',
    year: '2025',
    type: 'Native macOS app',
    role: 'Solo developer — design and build',
    description:
      'A native macOS app for deep work sessions, built around a deliberately minimal interface.',
    overview:
      'A native macOS application for staying in a focused work session. The design constraint was subtraction: every control that did not directly serve starting, running, or ending a session was cut, so the app never becomes the distraction it is meant to prevent.',
    highlights: [
      'Written in Swift as a native macOS application rather than a wrapped web view, so it launches instantly and stays light on memory.',
      'Designed a minimal session interface that follows macOS conventions — native controls, system typography, and light/dark appearance support.',
      'Built the session timing and state handling so a run survives window changes and desktop switching.',
      'Packaged and distributed the app as a downloadable macOS build.'
    ],
    stack: [
      { group: 'Language', items: ['Swift'] },
      { group: 'Platform', items: ['macOS', 'Native UI frameworks'] },
      { group: 'Practices', items: ['App packaging', 'Human Interface Guidelines'] }
    ],
    tags: ['macOS', 'Swift', 'Productivity', 'Native'],
    image: '/uploads/images/Apps/app1.webp',
    repoUrl: 'https://github.com/lelumjayasooriya/Focus',
    downloadUrl:
      'https://mysliit-my.sharepoint.com/:u:/g/personal/it24101153_my_sliit_lk/IQB7z-EnikFtR6S9qEI6qOY3Aa5A5SF45ruvfJVY3mkcOuE?e=tAEbwu'
  },
  {
    slug: 'currencylk',
    size: 'medium',
    title: 'CurrencyLK',
    subtitle: 'Live Sri Lankan exchange rates in the menu bar',
    year: '2025',
    type: 'Native macOS app',
    role: 'Solo developer — design and build',
    description:
      'A lightweight menu bar app surfacing real-time Sri Lankan currency exchange rates.',
    overview:
      'A native macOS menu bar utility that keeps live Sri Lankan exchange rates one click away. It runs quietly in the background with no dock icon and no window to manage — the entire interface is the menu bar popover.',
    highlights: [
      'Built as a menu bar–only Swift application, so it stays resident without occupying the dock or a window.',
      'Fetches live exchange rate data on a schedule and handles offline and failed-request states without blocking the UI.',
      'Designed a compact popover that presents rates legibly in a very small amount of screen space.',
      'Packaged and distributed the app as a downloadable macOS build.'
    ],
    stack: [
      { group: 'Language', items: ['Swift'] },
      { group: 'Platform', items: ['macOS', 'Menu bar app', 'Native UI frameworks'] },
      { group: 'Practices', items: ['REST API consumption', 'Async data handling'] }
    ],
    tags: ['macOS', 'Swift', 'Finance', 'Native'],
    image: '/uploads/images/Apps/app2.webp',
    repoUrl: null,
    downloadUrl:
      'https://mysliit-my.sharepoint.com/:u:/g/personal/it24101153_my_sliit_lk/IQDEcMD8B9aKQpQjpWRSzacyAcFGwfXcj-XR4LiUdGk1BEM?e=sEVoSo'
  }
];

export const githubProfileUrl = 'https://github.com/lelumjayasooriya';

// Listed newest first. `language` is the repository's primary language on GitHub.
export const githubRepos = [
  {
    name: 'RescueSriLanka',
    year: '2026',
    description:
      'AI-powered disaster response and resource coordination system for Sri Lanka, with an ASP.NET Core API, a React admin dashboard, and a Flutter app.',
    language: 'C#',
    url: 'https://github.com/IT24101153/RescueSriLanka-SEF_KDY_SE_02'
  },
  {
    name: 'KadeYamu',
    year: '2026',
    description: 'Android app for managing grocery lists and shopping at neighbourhood stores.',
    language: 'Kotlin',
    url: 'https://github.com/lelumjayasooriya/KadeYamu'
  },
  {
    name: 'Focus',
    year: '2026',
    description: 'Native macOS app with a minimal, distraction-free interface for deep work sessions.',
    language: 'Swift',
    url: 'https://github.com/lelumjayasooriya/Focus'
  },
  {
    name: 'Saranya-Jewellery',
    year: '2025',
    description:
      'Full-stack MERN management system for a jewellery business: inventory, orders, loyalty programs, and staff portals.',
    language: 'JavaScript',
    url: 'https://github.com/IT24101153/Saranya-Jewellery'
  },
  {
    name: 'CleanXpert',
    year: '2024',
    description: 'First-year project: a mobile app for controlling an automated home vacuum cleaner.',
    language: 'Java',
    url: 'https://github.com/lelumjayasooriya/CleanXpert'
  }
];

export const heroProfile = {
  name: 'Lelum Jayasooriya',
  verified: true,
  title: 'Web & Application Software Developer',
  ctaLabel: 'Get in touch',
  ctaTarget: '#contact',
  image: '/uploads/images/hero.webp'
};

export const aboutIntro = {
  heading: 'A developer at the intersection of design and code.',
  body: [
    'I am Lelum Jayasooriya, a software developer who builds for the web and for macOS. I care about the parts users feel — how fast a page loads, how obvious the next step is, how an interface behaves when the network drops.',
    'I learn by shipping. Everything on this site is something I designed, built, and put in front of real users, from hand-coded sites and WordPress platforms to native Swift applications.'
  ]
};

// Each line is { indent, tokens }, and each token is [type, value].
// Token types: tag | key | str | text | punc | comment
export const cleanCodeCard = {
  title: 'Clean code',
  snippets: [
    {
      language: 'React',
      lines: [
        {
          indent: 0,
          tokens: [
            ['key', 'function'],
            ['text', ' TagList'],
            ['punc', '({ tags }: '],
            ['text', 'Props'],
            ['punc', ') {']
          ]
        },
        {
          indent: 1,
          tokens: [['key', 'return'], ['text', ' tags'], ['punc', '.map((tag) => (']]
        },
        {
          indent: 2,
          tokens: [
            ['tag', '<Tag'],
            ['text', ' key'],
            ['punc', '={tag}'],
            ['text', ' label'],
            ['punc', '={tag} '],
            ['tag', '/>']
          ]
        },
        { indent: 1, tokens: [['punc', '))']] },
        { indent: 0, tokens: [['punc', '}']] }
      ]
    },
    {
      language: 'Swift',
      lines: [
        {
          indent: 0,
          tokens: [['key', 'let'], ['text', ' principles'], ['punc', ' = [']]
        },
        { indent: 1, tokens: [['str', '"Type-safe by default."'], ['punc', ',']] },
        { indent: 1, tokens: [['str', '"Small, testable units."'], ['punc', ',']] },
        { indent: 1, tokens: [['str', '"No force unwrapping."']] },
        { indent: 0, tokens: [['punc', ']']] }
      ]
    }
  ]
};

export const durationCard = {
  title: 'Development duration',
  from: 'Months',
  to: 'Weeks'
};

export const pixelPerfectCard = {
  eyebrow: 'Design → Code',
  title: 'Pixel-Perfect Development.',
  footnote: 'Built to match the design, down to the last pixel.'
};

export const aboutCards = [
  {
    title: 'Build to Ship',
    description: 'I finish what I start. Every project here is live, downloadable, or in daily use.'
  },
  {
    title: 'Engineering Standards',
    description: 'Readable code, sensible structure, and modern tooling — written to be handed over.'
  },
  {
    title: 'Always Learning',
    description: 'Comfortable moving between stacks and picking up whatever the problem actually needs.'
  }
];

export const toolGroups = [
  {
    title: 'Languages',
    wide: true,
    tools: [
      { id: 'js', name: 'JavaScript' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'swift', name: 'Swift' },
      { id: 'dart', name: 'Dart' },
      { id: 'python', name: 'Python' },
      { id: 'csharp', name: 'C#' },
      { id: 'cpp', name: 'C++' },
      { id: 'c', name: 'C' }
    ]
  },
  {
    title: 'Frontend',
    tools: [
      { id: 'react', name: 'React' },
      { id: 'next', name: 'Next.js' },
      { id: 'vue', name: 'Vue' },
      { id: 'tailwind', name: 'Tailwind' }
    ]
  },
  {
    title: 'Backend',
    tools: [
      { id: 'node', name: 'Node.js' },
      { id: 'postgres', name: 'PostgreSQL' },
      { id: 'wordpress', name: 'WordPress' }
    ]
  },
  {
    title: 'Application',
    tools: [
      { id: 'macos', name: 'macOS' },
      { id: 'ios', name: 'iOS' },
      { id: 'android', name: 'Android' },
      { id: 'windows', name: 'Windows' },
      { id: 'flutter', name: 'Flutter' },
      { id: 'reactnative', name: 'React Native' },
      { id: 'chrome', name: 'Chrome Extensions' }
    ]
  },
  {
    title: 'DevOps',
    tools: [
      { id: 'aws', name: 'AWS' },
      { id: 'azure', name: 'Azure Cloud' },
      { id: 'docker', name: 'Docker' },
      { id: 'git', name: 'Git' },
      { id: 'github', name: 'GitHub' }
    ]
  }
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/lelumjayasooriya' },
  { label: 'LinkedIn', href: 'https://lk.linkedin.com/in/lelumjayasooriya' },
  { label: 'X', href: 'https://x.com/LelumJay' }
];
