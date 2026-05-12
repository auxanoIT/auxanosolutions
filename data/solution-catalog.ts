import type { Service, ServiceCategory, SolutionCategory } from "@/lib/types";

type ServiceSeed = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  navDescription: string;
  highlights: string[];
  capabilities: string[];
  deliverables: string[];
  industries: string[];
  detailEyebrow?: string;
  detailTitle?: string;
  detailDescription?: string;
  capabilitySections?: Service["capabilitySections"];
};

const categoryCardImages: Record<ServiceCategory, { src: string; alt: string }> = {
  Infrastructure: {
    src: "/placeholders/infrastructure-card.svg",
    alt: "Infrastructure service placeholder graphic",
  },
  Networking: {
    src: "/placeholders/networking-card.svg",
    alt: "Networking service placeholder graphic",
  },
  "Hardware Systems": {
    src: "/placeholders/hardware-systems-card.svg",
    alt: "Hardware systems service placeholder graphic",
  },
  "Software & Licenses": {
    src: "/placeholders/software-licenses-card.svg",
    alt: "Software and licenses service placeholder graphic",
  },
  "Managed & Advisory": {
    src: "/placeholders/managed-advisory-card.svg",
    alt: "Managed and advisory service placeholder graphic",
  },
};

function buildService(seed: ServiceSeed): Service {
  return {
    ...seed,
    positioning: seed.description,
    outcome: seed.summary,
    heroLabel: seed.navDescription,
    serviceMixId: seed.slug,
    navImage: categoryCardImages[seed.category],
  };
}

export const solutionCategories: SolutionCategory[] = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    formalTitle: "IT Infrastructure Services",
    description:
      "Physical security, cabling, data centre readiness, site automation, and core deployment services built to standard.",
    anchorId: "infrastructure",
    href: "/services#infrastructure",
    featuredTitle: "Infrastructure that is designed, installed, and handed over correctly.",
    featuredDescription:
      "From access control and CCTV through structured cabling and data-centre readiness, this category covers the physical and operational backbone of critical environments.",
    featuredImage: {
      src: "/placeholders/infrastructure-large.svg",
      alt: "Infrastructure category placeholder image",
    },
    serviceSlugs: [
      "door-access-control",
      "surveillance-system-cctv",
      "structured-lan-cabling",
      "data-centre-services",
      "automated-gates-sliding-doors",
      "sales-of-it-hardware",
      "repair-of-it-hardware",
      "sales-of-data-centre-consumables",
      "audio-visual-services-livestreaming",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    formalTitle: "Networking Services",
    description:
      "Design, architecture, cabling, configuration, equipment supply, and IP telephony for environments that need speed and structure.",
    anchorId: "networking",
    href: "/services#networking",
    featuredTitle: "Networks planned and configured with long-term clarity.",
    featuredDescription:
      "This category covers network strategy, documentation, installation, performance, and business communications so the environment scales cleanly.",
    featuredImage: {
      src: "/placeholders/networking-large.svg",
      alt: "Networking category placeholder image",
    },
    serviceSlugs: [
      "network-design-with-diagram",
      "network-architecture-planning",
      "network-cabling",
      "network-configurations",
      "sales-of-network-equipment",
      "office-telephone-system-ip-pbx",
    ],
  },
  {
    id: "hardware-systems",
    label: "Hardware Systems",
    formalTitle: "Computers, Servers & Printers",
    description:
      "Original hardware, professional setup, storage, printers, and repair support for user and server environments.",
    anchorId: "hardware-systems",
    href: "/services#hardware-systems",
    featuredTitle: "Hardware supply and setup that stays supportable after day one.",
    featuredDescription:
      "This category covers end-user devices, server systems, storage, print infrastructure, and the professional setup needed to make them reliable.",
    featuredImage: {
      src: "/placeholders/hardware-systems-large.svg",
      alt: "Hardware systems category placeholder image",
    },
    serviceSlugs: [
      "desktop-laptop-sales",
      "computer-installation-setup",
      "server-sales-repair",
      "server-storage-provisioning-deployment",
      "printer-sales-installation",
    ],
  },
  {
    id: "software-licenses",
    label: "Software & Licenses",
    formalTitle: "Software & Licenses",
    description:
      "Genuine licenses, compliant deployment, and secure configuration across firewall, antivirus, operating systems, databases, cloud, and business apps.",
    anchorId: "software-licenses",
    href: "/services#software-licenses",
    featuredTitle: "Licensed, compliant, and configured for real environments.",
    featuredDescription:
      "This category covers the software layer of the environment, from security and operating systems to cloud subscriptions and application licensing.",
    featuredImage: {
      src: "/placeholders/software-licenses-large.svg",
      alt: "Software and licenses category placeholder image",
    },
    serviceSlugs: [
      "firewall-sales-licenses",
      "antivirus-licenses",
      "windows-operating-system-licenses",
      "server-operating-system-licenses",
      "database-software-licenses",
      "cloud-services-licenses",
      "applications-licenses",
    ],
  },
  {
    id: "managed-advisory",
    label: "Managed & Advisory",
    formalTitle: "Other IT Services",
    description:
      "Technical support, managed services, audit-led advice, staffing support, and project leadership for organizations that need more than procurement.",
    anchorId: "managed-advisory",
    href: "/services#managed-advisory",
    featuredTitle: "Operational support and advisory that hold the environment together.",
    featuredDescription:
      "This category covers ongoing technical support, managed operations, consultancy, audits, staffing support, and structured project delivery.",
    featuredImage: {
      src: "/placeholders/managed-advisory-large.svg",
      alt: "Managed and advisory category placeholder image",
    },
    serviceSlugs: [
      "it-technical-services",
      "it-managed-services-staff-outsourcing",
      "it-consultancy-audit-services",
      "it-project-management",
    ],
  },
];

export const services: Service[] = [
  buildService({
    slug: "door-access-control",
    title: "Door Access Control",
    category: "Infrastructure",
    summary: "Control who enters intelligently with centralized access management, audit trails, and clean handover.",
    description:
      "Deploy biometric and card-based entry systems with centralized control, access logging, and site-specific configuration that integrates cleanly with wider security operations.",
    navDescription: "Biometric, card, and centralized entry control for accountable movement.",
    highlights: [
      "Biometric and proximity card systems",
      "Centralized dashboard control and revocation",
      "Entry and exit audit trails",
      "Integrated CCTV-aware deployment planning",
    ],
    capabilities: [
      "Reader and lock deployment planning",
      "Access policy and permission mapping",
      "Commissioning, testing, and staff handover",
    ],
    deliverables: [
      "Access design and zone plan",
      "Configured dashboard and credential policy",
      "Operator handover and usage guidance",
    ],
    industries: ["Corporate offices", "Healthcare", "Education", "Warehousing"],
    detailEyebrow: "Door access control capabilities",
    detailTitle: "Door access systems built around control, proof, and clean daily operation.",
    detailDescription:
      "This delivery model turns the PDF promise into a practical access-control scope: credential strategy, centralized administration, traceable entry records, and integration with the wider security environment.",
    capabilitySections: [
      {
        id: "credential-entry",
        navLabel: "Credentials",
        title: "Biometric and card access that fits the site.",
        lead:
          "Fingerprint, facial recognition, and proximity cards should reduce friction at the door without weakening operational control.",
        body: [
          "Auxano aligns reader choice, lock type, traffic volume, and entry policy before devices are installed. That keeps the door experience fast for approved users while preserving stricter control for sensitive spaces.",
          "The outcome is not just hardware on the wall. It is a credential model that matches the way people actually move through the building.",
        ],
        points: [
          "Fingerprint, facial, and proximity-card options",
          "Reader placement matched to entry flow",
          "Role-based credential strategy",
          "Site-specific access policy planning",
        ],
        image: {
          src: "/image/service-details/door-access-credentials.webp",
          alt: "Professional access control reader and credential verification at a modern office entrance",
        },
      },
      {
        id: "centralized-access",
        navLabel: "Control",
        title: "Centralized management for grants, revocations, and cleaner accountability.",
        lead:
          "Every access decision should be easier to administer from one place than through fragmented manual handoffs.",
        body: [
          "Access rights can be issued, changed, or revoked from a unified dashboard, which matters when employees move roles, vendors finish work, or temporary passes must expire on time.",
          "That central view also helps the business keep the door layer aligned with HR changes, operational roles, and site policies.",
        ],
        points: [
          "Single dashboard for permission management",
          "Faster revocation for exited or changed users",
          "Cleaner temporary and visitor access rules",
          "Reduced dependency on manual coordination",
        ],
        image: {
          src: "/image/service-details/door-access-dashboard.webp",
          alt: "Security administrator managing access permissions from a centralized dashboard",
        },
      },
      {
        id: "entry-audit-trail",
        navLabel: "Audit trail",
        title: "Automatic entry and exit logs that support review instead of guesswork.",
        lead:
          "An access system earns trust when the record of movement is clear, searchable, and usable during review.",
        body: [
          "Door events should support incident review, compliance questions, and basic operational accountability without requiring teams to reconstruct events from memory.",
          "Auxano scopes logs, schedules, and operator expectations so the audit trail is not simply enabled, but usable.",
        ],
        points: [
          "Automatic user and event logs",
          "Clear movement records for investigation",
          "Better support for compliance reviews",
          "Practical handover for operators",
        ],
        image: {
          src: "/image/service-details/door-access-audit.webp",
          alt: "Access control event log review on a workstation in a secure operations room",
        },
      },
      {
        id: "security-integration",
        navLabel: "Integration",
        title: "Access control tied back to the wider surveillance picture.",
        lead:
          "The front door becomes more valuable when entry events and security visibility are planned together.",
        body: [
          "The PDF calls out CCTV integration for a reason: access events become stronger when teams can connect a door action to the relevant video context.",
          "Auxano plans the handoff between access control and surveillance so the security stack works as one coordinated environment rather than isolated tools.",
        ],
        points: [
          "CCTV-aware deployment planning",
          "Better context around entry events",
          "Sharper post-incident review",
          "Staff handover on the complete workflow",
        ],
        image: {
          src: "/image/service-details/door-access-integration.webp",
          alt: "Integrated office security setup combining door access control and CCTV monitoring",
        },
      },
    ],
  }),
  buildService({
    slug: "surveillance-system-cctv",
    title: "Surveillance System (CCTV)",
    category: "Infrastructure",
    summary: "See everything and protect what matters with properly surveyed, installed, and supported CCTV systems.",
    description:
      "Deliver HD and 4K surveillance systems with remote viewing, storage sized to retention requirements, and coverage planning across offices, warehouses, estates, schools, and operational sites.",
    navDescription: "CCTV systems planned for coverage, retention, and operational review.",
    highlights: [
      "HD, 4K, indoor, outdoor, and PTZ deployment",
      "Remote live and recorded viewing",
      "Storage sized to retention needs",
      "Full site survey through maintenance support",
    ],
    capabilities: [
      "Coverage design for operational blind spots",
      "Recorder and storage architecture",
      "Commissioning and post-install support",
    ],
    deliverables: [
      "Survey-backed coverage plan",
      "Installed camera and recording system",
      "Maintenance recommendation and handover",
    ],
    industries: ["Retail", "Warehousing", "Education", "Commercial offices"],
    detailEyebrow: "CCTV capabilities",
    detailTitle: "Surveillance designed for visibility, retention, and usable response.",
    detailDescription:
      "The PDF positions CCTV as a full-service scope, not a camera-only purchase. The page now explains the operating logic behind coverage design, remote review, storage sizing, and lifecycle support.",
    capabilitySections: [
      {
        id: "camera-coverage",
        navLabel: "Coverage",
        title: "HD and 4K camera design based on the environment, not a generic count.",
        lead:
          "Indoor, outdoor, PTZ, low-light, and day-night needs should be chosen from the risk picture of the site.",
        body: [
          "Auxano starts with line of sight, activity zones, entrances, blind spots, and review expectations. That keeps the solution focused on evidence quality and operational awareness.",
          "The aim is camera placement that protects what matters without wasting budget on poor angles or duplicated coverage.",
        ],
        points: [
          "Indoor, outdoor, PTZ, and day-night coverage",
          "Risk-led placement and camera selection",
          "Sharper protection of entrances and blind spots",
          "Cleaner alignment with site operations",
        ],
        image: {
          src: "/image/service-details/cctv-camera-coverage.webp",
          alt: "Modern CCTV camera network covering a commercial building entrance and perimeter",
        },
      },
      {
        id: "remote-visibility",
        navLabel: "Remote view",
        title: "Live and recorded footage available wherever oversight is needed.",
        lead:
          "Remote visibility matters when managers, security leads, or owners need evidence without being physically on site.",
        body: [
          "The viewing experience is configured around practical use: secure remote access, intuitive playback, and the ability to check both current activity and prior events quickly.",
          "That makes surveillance more useful for everyday operations and incident response alike.",
        ],
        points: [
          "Live and recorded footage access",
          "Usable playback across common devices",
          "Faster incident verification",
          "Remote oversight for distributed teams",
        ],
        image: {
          src: "/image/service-details/cctv-remote-viewing.webp",
          alt: "Operations manager reviewing live CCTV footage on laptop and mobile device",
        },
      },
      {
        id: "retention-storage",
        navLabel: "Storage",
        title: "Recorder and storage sizing tied to the retention window the business actually needs.",
        lead:
          "A surveillance project is incomplete if footage quality is high but retention planning is weak.",
        body: [
          "Auxano aligns NVR or DVR capacity with camera count, resolution, frame needs, and the number of days footage must remain available.",
          "That keeps storage expectations realistic and protects against discovering too late that the evidence window is shorter than required.",
        ],
        points: [
          "NVR and DVR sizing",
          "Retention planning by camera load",
          "Capacity aligned with review requirements",
          "Reduced storage guesswork",
        ],
        image: {
          src: "/image/service-details/cctv-storage-retention.webp",
          alt: "Security recording hardware and storage dashboard representing CCTV footage retention planning",
        },
      },
      {
        id: "survey-to-support",
        navLabel: "Lifecycle",
        title: "Site survey, installation, commissioning, and maintenance handled as one chain.",
        lead:
          "The PDF makes the point clearly: one team should own the route from survey to long-term support.",
        body: [
          "That single delivery chain reduces design drift, missed handover details, and fragmented accountability after installation.",
          "It also gives the client a clearer path for additions, troubleshooting, and maintenance planning after go-live.",
        ],
        points: [
          "Survey-backed deployment plan",
          "Installation and commissioning in one scope",
          "Maintenance direction after launch",
          "Stronger ownership across the project",
        ],
        image: {
          src: "/image/service-details/cctv-survey-support.webp",
          alt: "Field engineer commissioning a commercial surveillance system on site",
        },
      },
    ],
  }),
  buildService({
    slug: "structured-lan-cabling",
    title: "Structured LAN Cabling",
    category: "Infrastructure",
    summary: "Structured copper and fibre cabling installed, tested, documented, and built for long-term reliability.",
    description:
      "Install Cat6, Cat6A, and fibre runs with clean cable management, certified testing, and as-built documentation so the network layer is dependable and supportable.",
    navDescription: "Certified cabling with clean routing, testing, and documentation.",
    highlights: [
      "Cat6, Cat6A, and fibre deployments",
      "Labelled, trunked, and routed cable management",
      "Fluke-certified testing and proof reports",
      "As-built drawings on completion",
    ],
    capabilities: [
      "Horizontal and backbone cabling",
      "Cable pathway and cabinet organization",
      "Testing, labeling, and documentation",
    ],
    deliverables: [
      "Installed structured cabling system",
      "Certification reports",
      "As-built and handover documentation",
    ],
    industries: ["Corporate offices", "Data rooms", "Healthcare", "Education"],
    detailEyebrow: "Structured LAN cabling capabilities",
    detailTitle: "Structured cabling built to be testable, traceable, and supportable.",
    detailDescription:
      "The PDF emphasizes that cabling should not be improvised. This flow turns that into a commercial standard: correct media selection, disciplined routing, certification, and handover documentation.",
    capabilitySections: [
      {
        id: "right-media",
        navLabel: "Media",
        title: "Cat6, Cat6A, and fibre chosen for the actual load and distance.",
        lead:
          "The right cable in the right place first time prevents expensive compromises later.",
        body: [
          "Auxano selects copper or fibre based on endpoint demand, backbone needs, equipment layout, and future expandability rather than habit.",
          "That keeps the network foundation ready for both current traffic and the upgrades that arrive after occupancy or expansion.",
        ],
        points: [
          "Cat6, Cat6A, and fibre deployment",
          "Data and voice readiness",
          "Distance and bandwidth considered early",
          "Cleaner growth path for the site",
        ],
        image: {
          src: "/image/service-details/lan-media-selection.webp",
          alt: "Structured Cat6A and fibre cabling prepared for installation in a business facility",
        },
      },
      {
        id: "cable-management",
        navLabel: "Cable routing",
        title: "Labelled, trunked, and properly routed cabling that remains maintainable.",
        lead:
          "Cabling quality is visible long after installation when support teams can understand the environment at a glance.",
        body: [
          "Route discipline, cabinet order, labeling, and physical neatness reduce fault-finding time and create a more professional technical environment.",
          "This is where long-term supportability is either won or lost.",
        ],
        points: [
          "Neat containment and trunking",
          "Readable labels and patching discipline",
          "Reduced troubleshooting friction",
          "More professional rack and room presentation",
        ],
        image: {
          src: "/image/service-details/lan-cable-management.webp",
          alt: "Neatly managed structured network cabling in a business communications rack",
        },
      },
      {
        id: "certified-testing",
        navLabel: "Testing",
        title: "Every run tested and documented before the job is treated as complete.",
        lead:
          "Proof matters more than assumptions when the physical layer is meant to support serious operations.",
        body: [
          "The PDF specifically references Fluke-certified testing. That proof closes the gap between an installed cable and a verified cable.",
          "Testing reports help commissioning teams, internal IT, and future contractors understand exactly what was delivered.",
        ],
        points: [
          "Fluke-certified testing where required",
          "Evidence-backed pass and fail review",
          "Fewer hidden deployment risks",
          "Stronger handover confidence",
        ],
        image: {
          src: "/image/service-details/lan-certification-testing.webp",
          alt: "Technician using a cable certification tester on structured LAN cabling",
        },
      },
      {
        id: "as-built-documentation",
        navLabel: "Documentation",
        title: "As-built drawings and handover records that make the network easier to own.",
        lead:
          "Nothing is guessed. Everything is easier to support because the final environment is documented.",
        body: [
          "As-built drawings, endpoint references, and handover notes help future expansion, fault response, and audit readiness.",
          "That turns the installation into a maintainable asset rather than a hidden dependency only the original installer understands.",
        ],
        points: [
          "As-built drawings",
          "Clear handover records",
          "Better support for future changes",
          "More disciplined ownership after completion",
        ],
        image: {
          src: "/image/service-details/lan-as-built-documentation.webp",
          alt: "Structured cabling documentation and as-built network drawings reviewed by project engineers",
        },
      },
    ],
  }),
  buildService({
    slug: "data-centre-services",
    title: "Data Centre Services",
    category: "Infrastructure",
    summary: "Server room and data-centre infrastructure built for reliability, resilience, power protection, and uptime.",
    description:
      "Design and implement racks, power, cooling, UPS, environmental monitoring, and physical security layers that keep critical infrastructure stable from day one.",
    navDescription: "Server-room and data-centre environments built around uptime.",
    highlights: [
      "Rack, power, and cooling design",
      "UPS and surge protection planning",
      "Environmental monitoring and alerts",
      "Physical security readiness",
    ],
    capabilities: [
      "Room build-out and hardware layout",
      "Power resilience planning",
      "Monitoring and alarm setup",
    ],
    deliverables: [
      "Data-centre readiness plan",
      "Installed rack and environmental systems",
      "Reliability and monitoring handover",
    ],
    industries: ["Enterprise offices", "Financial services", "Healthcare", "Operations-heavy SMEs"],
    detailEyebrow: "Data centre service capabilities",
    detailTitle: "Infrastructure readiness shaped around uptime, protection, and environmental control.",
    detailDescription:
      "The PDF frames data centre work as a reliability discipline. This page now expands the four pillars behind that promise: room build-out, power continuity, cooling, and environmental monitoring.",
    capabilitySections: [
      {
        id: "server-room-buildout",
        navLabel: "Build-out",
        title: "Server rooms designed around racks, power, cooling, and physical protection.",
        lead:
          "The room itself is part of the infrastructure and should be engineered with the same care as the equipment inside it.",
        body: [
          "Auxano aligns rack layout, working clearance, power routes, cooling considerations, and controlled access before deployment gets crowded or difficult to maintain.",
          "That produces a cleaner technical environment and lowers the risk of costly rework later.",
        ],
        points: [
          "Rack and equipment layout",
          "Physical security readiness",
          "Maintainable service clearances",
          "Stronger foundation for uptime planning",
        ],
        image: {
          src: "/image/service-details/data-centre-buildout.webp",
          alt: "Professional server room build-out with racks, power, and security planning",
        },
      },
      {
        id: "power-management",
        navLabel: "Power",
        title: "UPS and power management sized to keep critical equipment protected.",
        lead:
          "Outages and surges should be design inputs, not surprises discovered after failure.",
        body: [
          "The power strategy accounts for UPS coverage, surge protection, and operational continuity around the equipment that cannot be allowed to drop without consequence.",
          "That helps clients make better resilience decisions before the infrastructure becomes business-critical.",
        ],
        points: [
          "UPS planning",
          "Surge and outage protection",
          "Priority equipment mapping",
          "Cleaner resilience decisions",
        ],
        image: {
          src: "/image/service-details/data-centre-power.webp",
          alt: "UPS and power distribution equipment protecting a business server room",
        },
      },
      {
        id: "precision-cooling",
        navLabel: "Cooling",
        title: "Cooling strategies that preserve equipment health and operating stability.",
        lead:
          "Temperature drift shortens equipment life and weakens reliability before it becomes obvious.",
        body: [
          "Auxano plans thermal control around the room footprint, equipment density, airflow, and the expected operational profile of the space.",
          "That avoids the pattern of installing equipment first and discovering environmental limits after the fact.",
        ],
        points: [
          "Precision cooling considerations",
          "Airflow awareness around rack layout",
          "Reduced heat-related risk",
          "Better long-term equipment protection",
        ],
        image: {
          src: "/image/service-details/data-centre-cooling.webp",
          alt: "Cooling infrastructure maintaining a professional server room environment",
        },
      },
      {
        id: "environmental-monitoring",
        navLabel: "Monitoring",
        title: "Environmental alerts for temperature, humidity, and intrusion risks.",
        lead:
          "A data centre should report its own early-warning signals before a small issue becomes downtime.",
        body: [
          "The PDF highlights temperature, humidity, and intrusion alerts. Those signals create a tighter operating loop around infrastructure health and physical risk.",
          "Monitoring extends the service from build quality into ongoing awareness.",
        ],
        points: [
          "Temperature and humidity awareness",
          "Intrusion alerting",
          "Faster escalation when conditions drift",
          "More complete uptime governance",
        ],
        image: {
          src: "/image/service-details/data-centre-monitoring.webp",
          alt: "Environmental monitoring dashboard for server room temperature humidity and intrusion alerts",
        },
      },
    ],
  }),
  buildService({
    slug: "automated-gates-sliding-doors",
    title: "Automated Gates & Sliding Doors",
    category: "Infrastructure",
    summary: "Secure, smart entry with automated gates, barriers, and doors designed for safe and seamless operation.",
    description:
      "Deploy swing and sliding gates, boom barriers, and automated doors with app or remote control, anti-crush sensors, backup logic, and operator safeguards.",
    navDescription: "Motorized entry systems with safety, backup, and control built in.",
    highlights: [
      "Swing, sliding, and barrier automation",
      "Remote, app, or card-based control",
      "Anti-crush sensors and manual override",
      "Power backup included in planning",
    ],
    capabilities: [
      "Entry automation design and installation",
      "Safety configuration and testing",
      "Operator training and support",
    ],
    deliverables: [
      "Installed automated entry system",
      "Safety and override testing",
      "Operational handover checklist",
    ],
    industries: ["Commercial offices", "Estates", "Warehousing", "Healthcare"],
  }),
  buildService({
    slug: "sales-of-it-hardware",
    title: "Sales of IT Hardware",
    category: "Infrastructure",
    summary: "Original, warranted desktops, laptops, servers, peripherals, and accessories sourced for immediate deployment.",
    description:
      "Supply genuine hardware from authorized distributors, including user devices, servers, UPS units, storage, and supporting peripherals for business environments.",
    navDescription: "Original business hardware sourced, warranted, and ready to deploy.",
    highlights: [
      "Desktops, laptops, and workstations",
      "Servers from authorized distributors",
      "Peripherals, UPS, storage, and accessories",
      "Bulk procurement and tagged delivery",
    ],
    capabilities: [
      "Specification guidance by role and budget",
      "Authorized sourcing and warranty control",
      "Bulk procurement coordination",
    ],
    deliverables: [
      "Procurement recommendation",
      "Supplied and tagged hardware",
      "Warranty-backed fulfillment",
    ],
    industries: ["Professional services", "Healthcare", "Education", "Retail"],
  }),
  buildService({
    slug: "repair-of-it-hardware",
    title: "Repair of IT Hardware",
    category: "Infrastructure",
    summary: "Fast, transparent hardware repair and preventive maintenance to return devices and systems to service.",
    description:
      "Support laptops, desktops, servers, printers, and failed storage with diagnostics, part replacement, data recovery support, and preventive care planning.",
    navDescription: "Diagnostics, repair, recovery, and preventive maintenance for failed hardware.",
    highlights: [
      "Laptop and desktop component repair",
      "Server and printer diagnostics",
      "Data recovery support",
      "Preventive maintenance scheduling",
    ],
    capabilities: [
      "Fault isolation and part replacement",
      "Repair estimates before work begins",
      "Preventive maintenance planning",
    ],
    deliverables: [
      "Diagnostic report",
      "Repair recommendation and parts plan",
      "Restored device or system handover",
    ],
    industries: ["Corporate offices", "Retail", "Education", "Healthcare"],
  }),
  buildService({
    slug: "sales-of-data-centre-consumables",
    title: "Sales of Data Centre Consumables",
    category: "Infrastructure",
    summary: "Supply the critical consumables and rack accessories needed to keep infrastructure deployments clean and supportable.",
    description:
      "Provide patch cables, rack hardware, SFP modules, cable-management kits, and operational accessories with fast supply and volume pricing.",
    navDescription: "Patching, rack hardware, and connectivity consumables supplied without delay.",
    highlights: [
      "Patch cables and fibre accessories",
      "Rack hardware and mounting components",
      "SFP modules and transceivers",
      "Cable management and cleaning kits",
    ],
    capabilities: [
      "Consumable sourcing and stocking support",
      "Volume procurement",
      "Data-centre accessory fulfillment",
    ],
    deliverables: [
      "Supply list confirmation",
      "Consumables delivery",
      "Volume pricing support",
    ],
    industries: ["Data centres", "Enterprise offices", "ISPs", "Operations teams"],
  }),
  buildService({
    slug: "audio-visual-services-livestreaming",
    title: "Audio Visual Services & Livestreaming",
    category: "Infrastructure",
    summary: "Conference-room AV, event production, LED display, and professional livestreaming delivered end to end.",
    description:
      "Design and run AV systems for meeting rooms, launches, conferences, ceremonies, and livestreamed events with full setup and live operations support.",
    navDescription: "AV and livestreaming delivery for rooms, events, and public moments.",
    highlights: [
      "Conference room AV and video conferencing",
      "Event PA, displays, and live production",
      "Multi-camera livestreaming",
      "LED video wall support",
    ],
    capabilities: [
      "AV design and event setup",
      "Live production management",
      "Breakdown and post-event support",
    ],
    deliverables: [
      "AV equipment and setup plan",
      "Live operation support",
      "Pack-down and handover",
    ],
    industries: ["Corporate events", "Education", "Religious organizations", "Professional services"],
  }),
  buildService({
    slug: "network-design-with-diagram",
    title: "Network Design with Diagram",
    category: "Networking",
    summary: "Start with the right network design, documentation, IP planning, and bill of materials before deployment begins.",
    description:
      "Carry out site surveys and produce logical and physical diagrams, IP plans, and equipment schedules so later implementation is disciplined and supportable.",
    navDescription: "Site-survey-led network design with professional diagrams and BOMs.",
    highlights: [
      "Physical assessment and requirements review",
      "Logical and physical network diagrams",
      "Structured IP planning and service design",
      "Detailed bill of materials",
    ],
    capabilities: [
      "Network discovery and planning workshops",
      "Documentation and diagram production",
      "Capacity and bill-of-materials definition",
    ],
    deliverables: [
      "Network design pack",
      "Logical and physical diagrams",
      "Procurement-ready equipment schedule",
    ],
    industries: ["Corporate offices", "Healthcare", "Retail", "Education"],
  }),
  buildService({
    slug: "network-architecture-planning",
    title: "Network Architecture Planning",
    category: "Networking",
    summary: "Align your network architecture with business strategy, resilience, and migration requirements before you invest.",
    description:
      "Assess the current state, identify gaps and risks, recommend the right architecture, and produce a migration roadmap that avoids disruption.",
    navDescription: "Architecture guidance for resilient LAN, WAN, SD-WAN, and hybrid environments.",
    highlights: [
      "Current-state audit and gap analysis",
      "Architecture recommendation and tradeoff review",
      "Redundancy and resilience planning",
      "Migration roadmap development",
    ],
    capabilities: [
      "Risk and architecture assessment",
      "Migration sequencing and planning",
      "Independent technical recommendation",
    ],
    deliverables: [
      "Architecture recommendation report",
      "Risk and gap register",
      "Migration roadmap",
    ],
    industries: ["Enterprise offices", "Multi-site businesses", "Healthcare", "Professional services"],
  }),
  buildService({
    slug: "network-cabling",
    title: "Network Cabling",
    category: "Networking",
    summary: "Copper and fibre network cabling installed, certified, labelled, and documented to standard.",
    description:
      "Deliver horizontal and backbone cabling, data-centre patching, trunking, and proof-of-performance testing with as-built documentation at handover.",
    navDescription: "Copper and fibre network cabling with certification and as-built proof.",
    highlights: [
      "Horizontal and backbone deployments",
      "Data-centre rack and patch organization",
      "Conduit and trunking installation",
      "Fluke-certified reports",
    ],
    capabilities: [
      "Cabling deployment and route planning",
      "Rack and pathway organization",
      "Testing and proof documentation",
    ],
    deliverables: [
      "Installed network cabling",
      "Certification report",
      "As-built documentation",
    ],
    industries: ["Corporate offices", "Warehousing", "Education", "Retail"],
  }),
  buildService({
    slug: "network-configurations",
    title: "Network Configurations",
    category: "Networking",
    summary: "Configure enterprise, SMB, and home-office networks for performance, security, and operational reliability.",
    description:
      "Handle VLANs, QoS, routing, guest WiFi, VPNs, printers, and secure wireless deployments with full documentation and backup of configurations.",
    navDescription: "Network configuration for enterprise, SMB, and home-office environments.",
    highlights: [
      "Enterprise-grade VLAN and QoS configuration",
      "SMB firewall, WiFi, and VPN setup",
      "Home and hybrid-work network optimization",
      "Config backup and full documentation",
    ],
    capabilities: [
      "Routing and wireless setup",
      "Firewall, VPN, and guest access policies",
      "Configuration backup and handover",
    ],
    deliverables: [
      "Configured network environment",
      "Backup of device configurations",
      "Documentation and support notes",
    ],
    industries: ["Corporate offices", "Retail", "Professional services", "Hybrid teams"],
  }),
  buildService({
    slug: "sales-of-network-equipment",
    title: "Sales of Network Equipment",
    category: "Networking",
    summary: "Genuine firewalls, routers, switches, access points, and network accessories sourced to the right spec.",
    description:
      "Supply branded network hardware across firewall, switching, wireless, and fibre connectivity layers with recommendation support when requirements are unclear.",
    navDescription: "Firewalls, switching, wireless, and network accessories sourced to spec.",
    highlights: [
      "Firewall, router, and switch procurement",
      "Wireless access point sourcing",
      "SFP modules and media converter supply",
      "Specification guidance to budget",
    ],
    capabilities: [
      "Equipment sizing and recommendation",
      "Brand and model selection guidance",
      "Procurement and fulfillment support",
    ],
    deliverables: [
      "Equipment specification list",
      "Supplied network hardware",
      "Budget-aligned sourcing recommendation",
    ],
    industries: ["Corporate offices", "Healthcare", "Education", "Retail"],
  }),
  buildService({
    slug: "office-telephone-system-ip-pbx",
    title: "Office Telephone System (IP PBX)",
    category: "Networking",
    summary: "Modern IP telephony that cuts call costs and improves business communications across locations and users.",
    description:
      "Deploy on-prem or cloud-hosted IP PBX systems with SIP trunking, desk phones, softphones, and business features like call queues and voicemail-to-email.",
    navDescription: "IP telephony with SIP, softphones, call queues, and cost savings.",
    highlights: [
      "IP PBX deployment and migration",
      "SIP trunking and call cost reduction",
      "Desk phones and mobile softphones",
      "Queues, recording, voicemail, and auto-attendant",
    ],
    capabilities: [
      "Telephony design and user rollout",
      "Call flow configuration",
      "Feature enablement and training",
    ],
    deliverables: [
      "Configured PBX platform",
      "Phone and softphone rollout",
      "Call flow and support handover",
    ],
    industries: ["Professional services", "Corporate offices", "Healthcare", "Education"],
  }),
  buildService({
    slug: "desktop-laptop-sales",
    title: "Desktop & Laptop Sales",
    category: "Hardware Systems",
    summary: "The right desktops, laptops, and workstations matched to role, budget, and business need.",
    description:
      "Supply desktops, laptops, and workstations from HP, Dell, Lenovo, and Apple with accessory bundles and bulk procurement readiness.",
    navDescription: "Business and role-matched desktop and laptop procurement.",
    highlights: [
      "Business and consumer device tiers",
      "Role-based specification guidance",
      "Bulk procurement readiness",
      "Accessory and docking support",
    ],
    capabilities: [
      "Device recommendation by workload",
      "Bulk supply coordination",
      "Authorized procurement and warranty support",
    ],
    deliverables: [
      "Procurement recommendation",
      "Supplied devices and accessories",
      "Warranty-backed fulfillment",
    ],
    industries: ["Professional services", "Education", "Healthcare", "Retail"],
  }),
  buildService({
    slug: "computer-installation-setup",
    title: "Computer Installation and Setup",
    category: "Hardware Systems",
    summary: "Devices delivered, configured, secured, and ready for users from day one.",
    description:
      "Handle OS setup, software installation, email and printer configuration, security hardening, and data migration so devices are deployment-ready on arrival.",
    navDescription: "OS, app, email, security, and migration setup for ready-to-work devices.",
    highlights: [
      "Operating system and business app setup",
      "Network, email, and printer integration",
      "Security hardening and update policy",
      "Data migration from old devices",
    ],
    capabilities: [
      "User-ready deployment setup",
      "Migration and profile transfer",
      "Security baseline configuration",
    ],
    deliverables: [
      "Configured end-user device",
      "Data migration completion",
      "Deployment and support notes",
    ],
    industries: ["Corporate offices", "Retail", "Education", "Healthcare"],
  }),
  buildService({
    slug: "server-sales-repair",
    title: "Server Sales and Repair",
    category: "Hardware Systems",
    summary: "Reliable servers supplied, installed, diagnosed, repaired, and maintained around your workload needs.",
    description:
      "Provide tower, rack, and blade servers with RAID, OS deployment, replacement parts, and fault resolution for business-critical infrastructure.",
    navDescription: "Server procurement, repair, RAID setup, and operating system deployment.",
    highlights: [
      "New server supply and sizing",
      "Hardware repair and replacement",
      "RAID setup and resilience planning",
      "Windows, Linux, and VMware deployment",
    ],
    capabilities: [
      "Server workload sizing",
      "Hardware fault remediation",
      "OS deployment and hardening",
    ],
    deliverables: [
      "Installed or restored server system",
      "RAID and OS configuration",
      "Support and maintenance notes",
    ],
    industries: ["Enterprise offices", "Healthcare", "Financial services", "Education"],
  }),
  buildService({
    slug: "server-storage-provisioning-deployment",
    title: "Server Storage Provisioning & Deployment",
    category: "Hardware Systems",
    summary: "Scalable, protected NAS and SAN storage built with recovery and capacity planning from the start.",
    description:
      "Deploy storage platforms for file sharing, backup, virtualization, and database performance with RAID and recovery strategy embedded in the design.",
    navDescription: "NAS, SAN, RAID, and storage growth planning with recovery in mind.",
    highlights: [
      "NAS and SAN platform deployment",
      "RAID configuration and recovery planning",
      "Capacity forecasting",
      "Backup-aligned storage architecture",
    ],
    capabilities: [
      "Storage sizing and platform selection",
      "RAID and redundancy configuration",
      "Recovery-aware deployment",
    ],
    deliverables: [
      "Provisioned storage platform",
      "Redundancy and recovery setup",
      "Capacity and support guidance",
    ],
    industries: ["Healthcare", "Enterprise offices", "Creative teams", "Professional services"],
  }),
  buildService({
    slug: "printer-sales-installation",
    title: "Printer Sales & Installation",
    category: "Hardware Systems",
    summary: "Printers supplied, installed, networked, and tested before handover.",
    description:
      "Support multifunction, label, receipt, and office printers across Windows, Mac, and mobile workflows with shared deployment and print management guidance.",
    navDescription: "Printers supplied, networked, and integrated into business workflows.",
    highlights: [
      "Laser, inkjet, and multifunction devices",
      "Label and receipt printer deployment",
      "Cross-platform network setup",
      "Print management support",
    ],
    capabilities: [
      "Printer selection and supply",
      "Network integration and testing",
      "Print policy and support setup",
    ],
    deliverables: [
      "Installed and tested printers",
      "Network print configuration",
      "User and support notes",
    ],
    industries: ["Retail", "Warehousing", "Corporate offices", "Healthcare"],
  }),
  buildService({
    slug: "firewall-sales-licenses",
    title: "Firewall Sales and Licenses",
    category: "Software & Licenses",
    summary: "Your first line of defence supplied, licensed, and configured for your environment rather than left at defaults.",
    description:
      "Source firewall platforms and license renewals, then configure them around network structure, user behavior, and the actual risk profile of the business.",
    navDescription: "Firewall licensing and deployment configured for real operational risk.",
    highlights: [
      "Firewall procurement and renewals",
      "Platform fit across major vendors",
      "Environment-specific configuration",
      "Expiry and protection continuity tracking",
    ],
    capabilities: [
      "Firewall recommendation and supply",
      "License renewal management",
      "Security policy configuration",
    ],
    deliverables: [
      "Licensed firewall platform",
      "Configured security ruleset",
      "Renewal and support guidance",
    ],
    industries: ["Professional services", "Healthcare", "Education", "Retail"],
  }),
  buildService({
    slug: "antivirus-licenses",
    title: "Antivirus Licenses",
    category: "Software & Licenses",
    summary: "Endpoint protection licensed, deployed, configured, and actively managed across the device fleet.",
    description:
      "Provide centrally managed antivirus and ransomware protection across user and business devices with deployment included, not left to the client.",
    navDescription: "Endpoint protection licensing with deployment and central visibility.",
    highlights: [
      "Vendor fit by budget and risk profile",
      "Central management console setup",
      "Ransomware protection coverage",
      "Deployment included across the fleet",
    ],
    capabilities: [
      "Endpoint security rollout",
      "Central monitoring setup",
      "License and coverage management",
    ],
    deliverables: [
      "Licensed antivirus deployment",
      "Monitoring console readiness",
      "Coverage and renewal guidance",
    ],
    industries: ["Corporate offices", "Retail", "Education", "Healthcare"],
  }),
  buildService({
    slug: "windows-operating-system-licenses",
    title: "Windows Operating System Licenses",
    category: "Software & Licenses",
    summary: "Genuine Windows licensing for individuals, teams, and organizations with clean compliance records.",
    description:
      "Supply Windows editions and volume licensing options with organization-linked documentation and audit visibility where needed.",
    navDescription: "Genuine Windows licensing with business compliance documentation.",
    highlights: [
      "Home, Pro, and Business editions",
      "Volume licensing options",
      "Compliance documentation",
      "License audit visibility",
    ],
    capabilities: [
      "OS license sourcing and allocation",
      "Compliance documentation support",
      "Volume licensing guidance",
    ],
    deliverables: [
      "Registered OS licenses",
      "Compliance record support",
      "Organization-ready documentation",
    ],
    industries: ["Corporate offices", "Education", "Healthcare", "Professional services"],
  }),
  buildService({
    slug: "server-operating-system-licenses",
    title: "Server Operating System Licenses",
    category: "Software & Licenses",
    summary: "Server operating systems licensed, deployed, hardened, and aligned to the infrastructure role they must support.",
    description:
      "Handle Windows Server, Ubuntu, Red Hat, and VMware licensing plus installation, Active Directory services, and platform hardening.",
    navDescription: "Server OS licensing with deployment, hardening, and infrastructure services.",
    highlights: [
      "Windows Server and Linux options",
      "VMware and virtualization support",
      "AD, DNS, DHCP, and Group Policy setup",
      "Hardening and deployment included",
    ],
    capabilities: [
      "Platform selection and licensing",
      "Server OS installation and configuration",
      "Directory and service setup",
    ],
    deliverables: [
      "Licensed and configured server OS",
      "Core services deployment",
      "Security and support notes",
    ],
    industries: ["Enterprise offices", "Healthcare", "Financial services", "Education"],
  }),
  buildService({
    slug: "database-software-licenses",
    title: "Database Software Licenses",
    category: "Software & Licenses",
    summary: "The right database platforms licensed, deployed, tuned, and backed up for business-critical workloads.",
    description:
      "Support SQL Server, open-source relational databases, and NoSQL stacks with setup, tuning, and recovery-aware configuration.",
    navDescription: "Database licensing and deployment aligned to performance and recovery.",
    highlights: [
      "Relational and NoSQL database support",
      "Performance-aware deployment",
      "Backup and recovery setup",
      "Platform fit by workload",
    ],
    capabilities: [
      "Database platform selection",
      "Deployment and tuning",
      "Backup and restore strategy setup",
    ],
    deliverables: [
      "Licensed and configured database platform",
      "Backup policy and recovery setup",
      "Operational support guidance",
    ],
    industries: ["Healthcare", "Professional services", "Financial services", "Operations-heavy SMEs"],
  }),
  buildService({
    slug: "cloud-services-licenses",
    title: "Cloud Services Licenses",
    category: "Software & Licenses",
    summary: "Cloud subscriptions and platform services managed by a team that can actually configure and optimize them.",
    description:
      "Support Microsoft 365, Google Workspace, Azure, and AWS subscriptions with migration, configuration, renewal tracking, and cost visibility.",
    navDescription: "Cloud licensing, migration, and environment configuration for business teams.",
    highlights: [
      "Microsoft 365 and Google Workspace",
      "Azure and AWS subscription support",
      "Migration and environment setup",
      "Renewal and spend visibility",
    ],
    capabilities: [
      "Cloud platform onboarding",
      "Tenant setup and migration",
      "Subscription and renewal management",
    ],
    deliverables: [
      "Configured cloud environment",
      "Migration completion where required",
      "Subscription and support guidance",
    ],
    industries: ["Professional services", "Education", "Healthcare", "Retail"],
  }),
  buildService({
    slug: "applications-licenses",
    title: "Applications Licenses",
    category: "Software & Licenses",
    summary: "Business software licensed properly so teams can operate without compliance gaps or procurement friction.",
    description:
      "Source Microsoft Office, Adobe, Autodesk, remote access tools, accounting apps, and other business software with deployment-ready licensing guidance.",
    navDescription: "Application licensing for office, creative, engineering, and business workflows.",
    highlights: [
      "Office, design, and engineering applications",
      "Remote access and PDF tools",
      "Accounting and specialist software",
      "Broad sourcing coverage on request",
    ],
    capabilities: [
      "Application license sourcing",
      "Role-based recommendation support",
      "Deployment readiness planning",
    ],
    deliverables: [
      "Licensed application package",
      "Procurement and deployment notes",
      "Renewal visibility where applicable",
    ],
    industries: ["Professional services", "Creative teams", "Engineering firms", "Corporate offices"],
  }),
  buildService({
    slug: "it-technical-services",
    title: "IT Technical Services",
    category: "Managed & Advisory",
    summary: "Hands-on technical support on-site or remote for hardware, software, network, and system administration issues.",
    description:
      "Provide help desk, field support, system administration, and break/fix assistance for teams that need fast intervention without unnecessary complexity.",
    navDescription: "On-site and remote technical support for live operational issues.",
    highlights: [
      "Help desk and escalation support",
      "On-site engineer dispatch",
      "System administration coverage",
      "Break/fix support without long-term lock-in",
    ],
    capabilities: [
      "Remote and field issue resolution",
      "Account, device, and server administration",
      "Ad-hoc technical support coverage",
    ],
    deliverables: [
      "Support intervention and resolution",
      "Issue notes and recommendations",
      "Operational follow-up guidance",
    ],
    industries: ["Corporate offices", "Retail", "Education", "Healthcare"],
  }),
  buildService({
    slug: "it-managed-services-staff-outsourcing",
    title: "IT Managed Services & IT Staff Outsourcing",
    category: "Managed & Advisory",
    summary: "A predictable, SLA-backed managed service model with monitoring, security support, staffing, and leadership coverage.",
    description:
      "Operate as the client’s external IT department or embed dedicated engineers on site, backed by proactive monitoring, reporting, and managed security disciplines.",
    navDescription: "Managed IT operations, staff augmentation, and SLA-backed support coverage.",
    highlights: [
      "24/7 monitoring and alerting",
      "Managed security and patch oversight",
      "Dedicated engineer outsourcing",
      "IT manager-as-a-service support",
    ],
    capabilities: [
      "SLA-backed operational support",
      "On-site and off-site team coverage",
      "Monthly reporting and review cadence",
    ],
    deliverables: [
      "Managed support operating model",
      "Monitoring and security coverage",
      "Reporting and staffing structure",
    ],
    industries: ["Professional services", "Healthcare", "Retail", "Education"],
  }),
  buildService({
    slug: "it-consultancy-audit-services",
    title: "IT Consultancy & Audit Services",
    category: "Managed & Advisory",
    summary: "Independent technical advice, infrastructure audits, cybersecurity reviews, and policy guidance before major decisions are made.",
    description:
      "Assess infrastructure, cabling, cybersecurity posture, and vendor proposals with objective recommendations, documented findings, and policy support.",
    navDescription: "Independent audits and consultancy before procurement or transformation.",
    highlights: [
      "Infrastructure and cybersecurity audit",
      "Policy development and governance support",
      "Vendor assessment without sales bias",
      "Risk, gap, and control recommendations",
    ],
    capabilities: [
      "Audit execution and findings review",
      "Policy and governance advice",
      "Vendor and proposal assessment",
    ],
    deliverables: [
      "Audit or consultancy report",
      "Gap and remediation guidance",
      "Decision-support recommendations",
    ],
    industries: ["Financial services", "Healthcare", "Professional services", "Education"],
  }),
  buildService({
    slug: "it-project-management",
    title: "IT Project Management",
    category: "Managed & Advisory",
    summary: "Complex technical projects scoped, coordinated, risk-managed, and handed over properly.",
    description:
      "Lead planning, vendor coordination, risk management, and post-implementation review so multi-party technology work lands on time and to specification.",
    navDescription: "Structured project management for complex technical delivery.",
    highlights: [
      "Planning, scoping, and timeline control",
      "Vendor and stakeholder coordination",
      "Risk management before escalation",
      "Post-implementation review and handover",
    ],
    capabilities: [
      "Project planning and governance",
      "Multi-vendor coordination",
      "Delivery tracking and handover control",
    ],
    deliverables: [
      "Project scope and delivery plan",
      "Risk register and coordination cadence",
      "Post-implementation review and handover",
    ],
    industries: ["Enterprise offices", "Healthcare", "Education", "Operations-heavy SMEs"],
  }),
];
