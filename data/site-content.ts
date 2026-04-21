import type {
  BlogPost,
  CaseStudy,
  EstimatorConfig,
  FAQItem,
  FooterColumn,
  MarketingPage,
  NavItem,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

export { services, solutionCategories } from "@/data/solution-catalog";
export { industryProfiles } from "@/data/industry-catalog";
export { useCaseGroups, useCaseProfiles } from "@/data/use-case-catalog";
export { resourceGroups, resourceLinks } from "@/data/resource-catalog";

export const siteSettings: SiteSettings = {
  name: "Auxano Solutions Technology Limited",
  shortName: "Auxano Solutions",
  description:
    "End-to-end IT solutions designed, installed, and supported by experts across infrastructure, networking, hardware, software, and managed services.",
  phone: "+234 8062 218 546",
  email: "info@auxanosolutions.net",
  address: "26A Adeshina Street, Off Oluwole Phillips, Obafemi Awolowo Way, Ikeja",
  city: "Lagos",
  country: "Nigeria",
  whatsappSales: process.env.NEXT_PUBLIC_SALES_WHATSAPP ?? "+2348062218546",
  whatsappSupport: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? "+2348062218546",
  hubspotMeetingUrl:
    process.env.HUBSPOT_MEETINGS_URL ?? "https://meetings.hubspot.com/auxano-solutions",
};

export const navigation: NavItem[] = [
  { label: "Solutions", href: "/services", kind: "solutions" },
  { label: "Use Cases", href: "/use-cases", kind: "useCases" },
  { label: "Industries", href: "/industries", kind: "industries" },
  { label: "Case Studies", href: "/case-studies", kind: "link" },
  { label: "Resources", href: "/resources", kind: "resources" },
  { label: "About", href: "/about", kind: "link" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "lagos-head-office-security-modernization",
    title: "Security modernization for a multi-floor Lagos head office",
    client: "Confidential Professional Services Firm",
    industry: "Professional Services",
    location: "Ikeja, Lagos",
    summary:
      "Auxano unified CCTV coverage, access control planning, and network improvements for a busy headquarters environment.",
    challenge:
      "The client needed stronger perimeter visibility, a clearer visitor movement picture, and more confidence in the network serving surveillance endpoints.",
    solution: [
      "Redesigned camera coverage for entrances, lift lobbies, and shared operational zones.",
      "Standardized network cabinet organization and cabling for cleaner surveillance performance.",
      "Prepared phased access-control recommendations and operator handover guidance.",
    ],
    result:
      "The site moved from fragmented monitoring to a cleaner, more accountable security posture with stronger operational visibility.",
    metrics: [
      { value: "38%", label: "Reduction in blind coverage areas" },
      { value: "3 floors", label: "Aligned under one rollout plan" },
      { value: "7 days", label: "Targeted stabilization window after go-live" },
    ],
    relatedServices: [
      "surveillance-system-cctv",
      "door-access-control",
      "network-cabling",
    ],
  },
  {
    slug: "private-clinic-network-refresh",
    title: "Network and continuity refresh for a private healthcare operator",
    client: "Confidential Healthcare Group",
    industry: "Healthcare",
    location: "Lagos, Nigeria",
    summary:
      "A healthcare operator needed stronger network reliability, better monitoring, and clearer business continuity support.",
    challenge:
      "Intermittent network issues were affecting device availability and raising concern around continuity for patient-facing operations.",
    solution: [
      "Mapped the current environment and rebuilt topology documentation.",
      "Introduced network monitoring and improved switching and wireless layout.",
      "Defined continuity priorities and support response expectations for critical workflows.",
    ],
    result:
      "The organization gained a more stable environment, better issue visibility, and a clearer recovery conversation with leadership.",
    metrics: [
      { value: "42%", label: "Fewer repeat connectivity incidents in the first quarter" },
      { value: "24/7", label: "Improved visibility for critical alerts" },
      { value: "1 playbook", label: "Continuity baseline delivered to leadership" },
    ],
    relatedServices: [
      "network-architecture-planning",
      "it-managed-services-staff-outsourcing",
      "it-consultancy-audit-services",
    ],
  },
  {
    slug: "warehouse-rollout-with-centralized-visibility",
    title: "Warehouse rollout with centralized visibility and support readiness",
    client: "Confidential Distribution Business",
    industry: "Distribution & Warehousing",
    location: "Ogun-Lagos corridor",
    summary:
      "Auxano helped a fast-moving operations team connect surveillance, networking, and support readiness into one deployment program.",
    challenge:
      "The client was expanding into a more operationally demanding site and needed coverage, connectivity, and support governance to land together.",
    solution: [
      "Designed CCTV deployment for entry, dispatch, and storage zones.",
      "Structured the network rollout for device density and monitoring visibility.",
      "Created a support model for post-launch issue handling and escalation.",
    ],
    result:
      "The warehouse opened with cleaner technical coordination, better operational assurance, and a more structured handover.",
    metrics: [
      { value: "60+", label: "Endpoints included in the rollout program" },
      { value: "1 launch", label: "Single coordinated deployment window" },
      { value: "100%", label: "Critical areas covered in the final design" },
    ],
    relatedServices: [
      "surveillance-system-cctv",
      "network-design-with-diagram",
      "it-managed-services-staff-outsourcing",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "what-growing-businesses-miss-when-planning-cctv",
    title: "What Growing Businesses Miss When Planning CCTV Deployments",
    category: "Physical Security",
    publishedAt: "2026-03-10",
    readingTime: "6 min read",
    excerpt:
      "Coverage quality depends on network design, operator workflow, retention planning, and post-installation discipline.",
    takeaways: [
      "Coverage without a monitoring workflow creates expensive blind spots.",
      "Storage and retention should be sized before hardware is purchased.",
      "Your network topology shapes CCTV performance more than most teams expect.",
    ],
    body: [
      "Most CCTV projects fail long before installation day. The failure starts when teams think in terms of camera count instead of operational coverage. Entrances, corridors, dispatch lanes, and sensitive areas all require different logic. When that logic is skipped, the final system looks busy but performs poorly during real incidents.",
      "The second blind spot is retention and retrieval. Businesses often buy hardware first, then discover later that the footage archive is too short, too fragmented, or too hard to review quickly. A surveillance system is only useful when operators can trust what was recorded and retrieve it fast.",
      "The third issue is networking. Cameras do not exist outside the network environment. Poor switching, weak uplinks, or unplanned wireless reliance can turn a security project into an ongoing reliability problem. CCTV planning should sit alongside network planning, not after it.",
    ],
  },
  {
    slug: "how-to-budget-managed-it-support-in-nigeria",
    title: "How to Budget Managed IT Support Without Underbuying Reliability",
    category: "Managed Services",
    publishedAt: "2026-03-18",
    readingTime: "7 min read",
    excerpt:
      "Support budgets fail when leadership only prices tickets and ignores visibility, onboarding, continuity, and user enablement.",
    takeaways: [
      "The cheapest support model often moves cost into downtime and escalation.",
      "Endpoint visibility and onboarding discipline matter as much as ticket response time.",
      "Managed support should be budgeted against business interruption, not only headcount.",
    ],
    body: [
      "A common budgeting mistake is treating IT support like a reactive call center. That model ignores the work required to keep devices healthy, users onboarded properly, and risk visible to leadership. Support quality is not only about response speed. It is also about how much operational friction is prevented before users feel it.",
      "Good managed support includes device standards, endpoint visibility, escalation ownership, and repeatable reporting. Without those pieces, your support bill may look smaller on paper while the business absorbs hidden cost through interruptions, shadow fixes, and poor accountability.",
      "When planning budget, leadership should ask a more useful question: what level of interruption can the business tolerate? That answer usually determines whether support should stay basic, move to business-critical coverage, or include a stronger continuity posture.",
    ],
  },
  {
    slug: "network-monitoring-for-multi-site-operations",
    title: "Why Network Monitoring Matters More Once You Have Multiple Sites",
    category: "Networking",
    publishedAt: "2026-03-24",
    readingTime: "5 min read",
    excerpt:
      "Once a business spreads across floors or sites, undocumented network issues become operational problems, not just technical ones.",
    takeaways: [
      "Visibility collapses quickly when branch networks grow without a shared model.",
      "Monitoring improves issue response because teams stop troubleshooting from guesswork.",
      "Documentation and alert tuning matter as much as the monitoring dashboard itself.",
    ],
    body: [
      "Small networks can survive on memory and habit for a while. Multi-site environments cannot. The moment an organization adds floors, branches, or high-dependency endpoints like CCTV and access systems, network problems become harder to isolate and slower to resolve.",
      "Monitoring adds value because it turns symptoms into evidence. Instead of hearing that the internet is slow somewhere, teams can see device status, latency patterns, and repeated failure points. That changes both technical response and leadership confidence.",
      "However, monitoring is not only a tool purchase. It works best when paired with network documentation, clear escalation paths, and realistic thresholds. Otherwise, the dashboard fills up while the team still struggles to act.",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Auxano approached the environment like an operator, not just an installer. That changed the quality of the final result.",
    name: "Operations Lead",
    role: "Facilities and Operations",
    company: "Lagos Head Office Deployment",
  },
  {
    quote:
      "The difference was the clarity. We could see what was being fixed, why it mattered, and what would happen next.",
    name: "Admin Manager",
    role: "Administration",
    company: "Healthcare Network Refresh",
  },
  {
    quote:
      "Support readiness was part of the rollout, not an afterthought. That helped the site settle faster after launch.",
    name: "Site Director",
    role: "Operations",
    company: "Warehouse Expansion Program",
  },
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What kinds of organizations does Auxano serve best?",
    answer:
      "Auxano is strongest where infrastructure, networking, security, licensing, and operational continuity matter at the same time. That includes offices, healthcare operators, campuses, retail environments, warehouses, and growing service businesses.",
  },
  {
    id: "faq-2",
    question: "Can Auxano handle both rollout and ongoing support?",
    answer:
      "Yes. The delivery model is designed to connect supply, deployment, documentation, and post-launch support so the environment does not degrade immediately after go-live.",
  },
  {
    id: "faq-3",
    question: "How does the estimate tool work?",
    answer:
      "The estimator uses company scale, locations, support depth, camera coverage, network complexity, and compliance needs to generate a commercial range that can anchor a consultation and final scope conversation.",
  },
  {
    id: "faq-4",
    question: "Can the site content be updated without a developer?",
    answer:
      "Yes. Solutions, case studies, FAQs, testimonials, blog posts, pricing logic, SEO settings, navigation, and CTA settings are structured for Sanity-based editing.",
  },
  {
    id: "faq-5",
    question: "Do you support consultation-led projects before deployment?",
    answer:
      "Yes. Auxano can lead discovery, audit, architecture planning, project management, and phased technical recommendations before implementation begins.",
  },
  {
    id: "faq-6",
    question: "What happens if HubSpot is unavailable when a lead submits?",
    answer:
      "The backend is structured to preserve the lead and trigger an email fallback, so commercial inquiries are not silently lost.",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Infrastructure", href: "/services#infrastructure" },
      { label: "Networking", href: "/services#networking" },
      { label: "Hardware Systems", href: "/services#hardware-systems" },
      { label: "Software & Licenses", href: "/services#software-licenses" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Use Cases", href: "/use-cases" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/resources" },
      { label: "Estimate Project Cost", href: "/estimate" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Contact Sales", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const marketingPages: MarketingPage[] = [
  {
    slug: "home",
    title: "Infrastructure, Networking, and Managed IT Solutions for Critical Teams",
    description:
      "Auxano Solutions helps businesses design, deploy, and support infrastructure, networking, hardware, software, and managed operations with enterprise-grade clarity.",
    sections: [
      {
        _type: "hero",
        eyebrow: "Enterprise IT And Infrastructure",
        title: "One partner for IT, CCTV, and network infrastructure.",
        description:
          "Design, deployment, and support for business-critical environments.",
        mode: "videoCarousel",
        tags: [
          "Infrastructure",
          "Networking",
          "Hardware Systems",
          "Software & Licenses",
        ],
        metrics: [
          { value: "12+", label: "Years in Business" },
          { value: "500+", label: "Projects delivered" },
          { value: "200+", label: "Clients served" },
          { value: "24/7", label: "Support available" },
        ],
        primaryCta: { label: "Book Consultation", href: "/book-consultation", variant: "primary" },
        secondaryCta: { label: "Estimate Your Project", href: "/estimate", variant: "secondary" },
        slides: [
          {
            id: "hero-slide-1",
            wistiaMediaId: "jucjnef47l",
            headline: "One partner for IT, CCTV, and network infrastructure.",
            description: "Design, deployment, and support for business-critical environments.",
            primaryCta: { label: "Book Consultation", href: "/book-consultation", variant: "primary" },
          },
          {
            id: "hero-slide-2",
            wistiaMediaId: "jucjnef47l",
            headline: "Security systems built for real operations.",
            description: "CCTV, access control, and site visibility planned as one operating layer.",
            primaryCta: { label: "Explore Security Solutions", href: "/use-cases/entryway-security", variant: "primary" },
          },
          {
            id: "hero-slide-3",
            wistiaMediaId: "jucjnef47l",
            headline: "Networks that support the systems riding on them.",
            description: "Structured cabling, switching, monitoring, and multi-site connectivity without guesswork.",
            primaryCta: { label: "Explore Network Infrastructure", href: "/services#networking", variant: "primary" },
          },
          {
            id: "hero-slide-4",
            wistiaMediaId: "jucjnef47l",
            headline: "Managed IT support with clearer ownership.",
            description: "Users, devices, continuity, and escalation handled with enterprise discipline.",
            primaryCta: { label: "Explore Managed IT", href: "/services/it-managed-services-staff-outsourcing", variant: "primary" },
          },
        ],
      },
      {
        _type: "logoStrip",
        title: "Built for critical teams across healthcare, operations, offices, education, retail, and multi-site businesses",
        logos: [
          { name: "Healthcare" },
          { name: "Warehousing" },
          { name: "Professional Services" },
          { name: "Education" },
          { name: "Retail" },
          { name: "Multi-Site Operations" },
        ],
      },
      {
        _type: "serviceShowcase",
        eyebrow: "Our Services",
        title: "Everything your business needs under one roof.",
        description:
          "Explore the core service areas Auxano delivers for modern business environments.",
        items: [
          {
            id: "it-infrastructure",
            title: "IT Infrastructure",
            description:
              "We design and deploy reliable IT infrastructure that powers your entire business—built for performance, scalability, and long-term growth.",
            imageSrc: "/image/card1.png",
            imageAlt: "IT Infrastructure service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services#infrastructure",
          },
          {
            id: "networking",
            title: "Networking",
            description:
              "Fast, secure, and stable network systems designed to keep your business connected at all times.",
            imageSrc: "/image/card1.png",
            imageAlt: "Networking service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services#networking",
          },
          {
            id: "computers-and-servers",
            title: "Computers & Servers",
            description:
              "Reliable hardware solutions tailored to your business performance and storage needs.",
            imageSrc: "/image/card1.png",
            imageAlt: "Computers and servers service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services#hardware-systems",
          },
          {
            id: "software-and-licenses",
            title: "Software & Licenses",
            description:
              "Genuine software solutions that keep your business secure, compliant, and productive.",
            imageSrc: "/image/card1.png",
            imageAlt: "Software and licenses service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services#software-licenses",
          },
          {
            id: "it-management",
            title: "IT Management",
            description:
              "End-to-end IT support that keeps your systems running, secure, and optimized.",
            imageSrc: "/image/card1.png",
            imageAlt: "IT Management service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services/it-managed-services-staff-outsourcing",
          },
          {
            id: "audio-visuals",
            title: "Audio Visuals",
            description:
              "Professional audio-visual systems for communication, presentations, and events.",
            imageSrc: "/image/card1.png",
            imageAlt: "Audio visuals service card placeholder",
            ctaLabel: "Learn more",
            ctaHref: "/services/audio-visual-services-livestreaming",
          },
        ],
      },
      {
        _type: "serviceGrid",
        eyebrow: "Commercial focus",
        title: "The three launch paths leading the site funnel",
        description:
          "The refreshed experience leads with high-intent categories while still exposing the full Auxano service depth.",
        featuredSlugs: [
          "surveillance-system-cctv",
          "network-design-with-diagram",
          "it-managed-services-staff-outsourcing",
        ],
      },
      {
        _type: "networkMapSection",
        eyebrow: "Our Solution",
        title: "Everything your business needs under one roof.",
        description:
          "Tell us what you need. Our certified engineers will assess, design, and deliver on time and on budget.",
        bullets: [],
        nodes: [
          { label: "Core Network", detail: "Switching, design, and monitoring", x: 50, y: 18 },
          { label: "CCTV", detail: "Coverage, storage, retrieval", x: 80, y: 40 },
          { label: "Access", detail: "Entry, permissions, audit", x: 72, y: 72 },
          { label: "Support", detail: "Users, devices, continuity", x: 28, y: 72 },
          { label: "Hardware", detail: "Servers, printers, endpoints", x: 18, y: 40 },
        ],
      },
      {
        _type: "categoryShowcase",
        eyebrow: "",
        title: "Why people choose Auxano Solutions",
        description: "",
        wistiaMediaId: "jucjnef47l",
        items: [
          {
            id: "installed-right",
            label: "Installed Right",
            title: "Surveyed, installed, commissioned, and handed over properly the first time.",
            description:
              "Auxano starts with the real site conditions, plans the installation path, commissions every component properly, and hands the environment over in a state the client can operate with confidence.",
            bullets: [
              "Site survey and installation planning happen before equipment is mounted",
              "Commissioning, testing, and documentation stay inside the delivery scope",
              "Operators receive a cleaner handover with less ambiguity after go-live",
            ],
            ctaLabel: "Explore Infrastructure Services",
            ctaHref: "/services#infrastructure",
          },
          {
            id: "connected-end-to-end",
            label: "Connected End-to-End",
            title: "Cabling, network design, configuration, and documentation built as one connected system.",
            description:
              "Physical runs, network logic, live configuration, and final documentation are delivered together so the environment works as one system instead of a string of disconnected vendor handoffs.",
            bullets: [
              "Structured cabling and active network setup stay under one operating view",
              "IP planning, routing, switching, Wi-Fi, and tuning are shaped around the real site",
              "Diagrams and labelled handover make future troubleshooting faster",
            ],
            ctaLabel: "Explore Networking Services",
            ctaHref: "/services#networking",
          },
          {
            id: "original-equipment",
            label: "Original Equipment",
            title: "Genuine hardware supplied, deployed, and ready for day-one use.",
            description:
              "Auxano supplies genuine devices and prepares them for the live environment so teams receive hardware that is ready to use and easier to support after deployment.",
            bullets: [
              "Authorised supply reduces warranty and authenticity risk",
              "Endpoints, servers, storage, and peripherals are prepared for day-one operations",
              "Deployment standards make growth, repair, and replacement more predictable",
            ],
            ctaLabel: "Explore Hardware Systems",
            ctaHref: "/services#hardware-systems",
          },
          {
            id: "licensed-configured",
            label: "Licensed & Configured",
            title: "Security tools, operating systems, cloud apps, and business software set up properly for live environments.",
            description:
              "Auxano does not stop at procurement. Licensing, activation, security configuration, and business-app setup are completed against the live brief so the software layer is usable after handover.",
            bullets: [
              "Firewall, endpoint, OS, cloud, and app setup are completed for the real environment",
              "Licensing, activation, and compliance records stay clearer from the start",
              "The software layer is left usable, supportable, and ready for handover",
            ],
            ctaLabel: "Explore Software Services",
            ctaHref: "/services#software-licenses",
          },
          {
            id: "support-that-stays",
            label: "Support That Stays",
            title: "Managed support, audits, and project follow-through that continue after installation.",
            description:
              "After installation, Auxano can continue with support, audits, advisory work, and structured project follow-through so the environment does not lose discipline once the rollout ends.",
            bullets: [
              "After-sales support stays tied to the way the environment was delivered",
              "Audits and advisory work expose gaps before they grow into bigger operational issues",
              "Project ownership can continue beyond handover when more phases are needed",
            ],
            ctaLabel: "Explore Managed Services",
            ctaHref: "/services#managed-advisory",
          },
        ],
      },
      {
        _type: "metricBand",
        eyebrow: "Why teams engage",
        title: "Operational confidence improves when the environment is structured, documented, and supportable.",
        description:
          "The site now positions Auxano around disciplined execution and business outcomes instead of generic service claims.",
        metrics: [
          { value: "Clearer", label: "handover and accountability" },
          { value: "Faster", label: "issue isolation and escalation" },
          { value: "Stronger", label: "technical and commercial confidence" },
        ],
      },
      {
        _type: "caseStudyRail",
        eyebrow: "Delivery proof",
        title: "Selected rollout highlights shaped around measurable operational outcomes",
        description:
          "The first release uses concise case study storytelling to prove execution quality, not just capability claims.",
        slugs: [
          "lagos-head-office-security-modernization",
          "private-clinic-network-refresh",
          "warehouse-rollout-with-centralized-visibility",
        ],
      },
      {
        _type: "testimonialRail",
        eyebrow: "Client voice",
        title: "Representative feedback from teams focused on operational reliability",
        description:
          "The testimonial system is ready for real client voice, logos, and titles once final assets are loaded into Sanity.",
      },
      {
        _type: "ctaBand",
        eyebrow: "Lead magnet",
        title: "Use the live estimator to turn project complexity into a clearer commercial starting point.",
        description:
          "The estimator captures service mix, operational scale, site complexity, and support depth before generating a structured quote range.",
        primaryCta: { label: "Open Estimator", href: "/estimate", variant: "primary" },
        secondaryCta: { label: "Talk to Sales", href: "/book-consultation", variant: "secondary" },
        dark: true,
      },
      {
        _type: "faqBlock",
        eyebrow: "FAQs",
        title: "Questions decision-makers ask before they commit",
        description:
          "Answer the commercial, operational, and implementation questions that typically slow down conversion.",
        ids: ["faq-1", "faq-2", "faq-3", "faq-4", "faq-5", "faq-6"],
      },
      {
        _type: "ctaBand",
        eyebrow: "Consultation",
        title: "If the environment is already under strain, start with a scoped consultation.",
        description:
          "Map the current state, tighten the commercial brief, and move into rollout with less ambiguity.",
        primaryCta: { label: "Book Consultation", href: "/book-consultation", variant: "primary" },
        secondaryCta: { label: "Contact Auxano", href: "/contact", variant: "secondary" },
      },
    ],
  },
  {
    slug: "about",
    title: "About Auxano Solutions",
    description:
      "Auxano combines infrastructure delivery, networking, hardware systems, software licensing, and managed advisory support for organizations that need serious operational execution.",
    sections: [
      {
        _type: "richContent",
        eyebrow: "About Auxano",
        title: "A technical delivery partner for organizations that need more than generic IT support.",
        content: [
          "Auxano Solutions Technology Limited works across infrastructure, networking, hardware systems, software licensing, and managed advisory support. The company is built around doing technical work properly from the beginning rather than treating quality as a later correction step.",
          "That operating view matters because surveillance depends on the network, devices depend on clean setup, licensing depends on compliance discipline, and support quality shapes what happens after deployment.",
          "The new website positions Auxano like a serious technical partner: clear, structured, and commercially credible.",
        ],
      },
    ],
  },
];

export const estimatorConfig: EstimatorConfig = {
  companySizes: [
    { id: "small", label: "10-25 staff", multiplierLow: 1, multiplierHigh: 1.1 },
    { id: "mid", label: "26-75 staff", multiplierLow: 1.2, multiplierHigh: 1.35 },
    { id: "large", label: "76-150 staff", multiplierLow: 1.45, multiplierHigh: 1.65 },
    { id: "enterprise", label: "150+ staff", multiplierLow: 1.7, multiplierHigh: 2 },
  ],
  locationBands: [
    { id: "single-site", label: "Single site", multiplierLow: 1, multiplierHigh: 1.05 },
    { id: "two-to-four", label: "2-4 locations", multiplierLow: 1.18, multiplierHigh: 1.3 },
    { id: "multi-site", label: "5+ locations", multiplierLow: 1.38, multiplierHigh: 1.55 },
  ],
  supportTiers: [
    { id: "standard", label: "Standard support coverage", multiplierLow: 1, multiplierHigh: 1.08 },
    {
      id: "business-critical",
      label: "Business-critical coverage",
      multiplierLow: 1.18,
      multiplierHigh: 1.28,
    },
    { id: "24-7", label: "24/7 support expectation", multiplierLow: 1.35, multiplierHigh: 1.5 },
  ],
  cameraBands: [
    { id: "none", label: "No camera scope", low: 0, high: 0 },
    { id: "1-8", label: "1-8 cameras", low: 900000, high: 1600000 },
    { id: "9-24", label: "9-24 cameras", low: 1800000, high: 3600000 },
    { id: "25-60", label: "25-60 cameras", low: 3800000, high: 7200000 },
    { id: "60-plus", label: "60+ cameras", low: 7600000, high: 12800000 },
  ],
  networkScopes: [
    { id: "light", label: "Office refresh", low: 750000, high: 1500000 },
    { id: "medium", label: "Multi-floor or dense endpoint rollout", low: 1800000, high: 3600000 },
    { id: "heavy", label: "Multi-site or complex infrastructure scope", low: 4200000, high: 7800000 },
  ],
  complianceLevels: [
    { id: "none", label: "No compliance uplift", low: 0, high: 0 },
    { id: "basic", label: "Basic audit review", low: 650000, high: 1200000 },
    { id: "regulated", label: "Regulated or board-level review", low: 1450000, high: 2800000 },
  ],
  services: [
    {
      id: "managed-it",
      label: "Managed IT Support",
      baseLow: 1500000,
      baseHigh: 3200000,
      description: "Support model, endpoint visibility, onboarding, reporting, and response structure.",
    },
    {
      id: "cctv",
      label: "CCTV & Surveillance",
      baseLow: 1800000,
      baseHigh: 3400000,
      description: "Coverage planning, deployment, recording, and control-room readiness.",
    },
    {
      id: "network",
      label: "Network Infrastructure",
      baseLow: 1600000,
      baseHigh: 3000000,
      description: "Structured network rollout, switching, wireless, and monitoring setup.",
    },
    {
      id: "audit",
      label: "IT Audit & Compliance",
      baseLow: 900000,
      baseHigh: 1850000,
      description: "Controls review, gap assessment, reporting, and remediation planning.",
    },
    {
      id: "access-control",
      label: "Access Control",
      baseLow: 1250000,
      baseHigh: 2600000,
      description: "Entry management design, hardware planning, and access policy structure.",
    },
    {
      id: "disaster-recovery",
      label: "Business Continuity & DR",
      baseLow: 850000,
      baseHigh: 1750000,
      description: "Critical dependency mapping, recovery planning, and resilience recommendations.",
    },
  ],
  contingencyLow: 1.04,
  contingencyHigh: 1.12,
};
