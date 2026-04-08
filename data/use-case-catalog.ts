import type {
  UseCaseGroup,
  UseCaseGroupId,
  UseCaseProfile,
} from "@/lib/types";

type UseCaseSeed = Omit<UseCaseProfile, "href">;

function buildUseCase(useCase: UseCaseSeed): UseCaseProfile {
  return {
    ...useCase,
    href: `/use-cases/${useCase.slug}`,
  };
}

function buildGroup(
  id: UseCaseGroupId,
  label: string,
  description: string,
  sections: UseCaseGroup["sections"],
): UseCaseGroup {
  return {
    id,
    label,
    href: `/use-cases#${id}`,
    description,
    sections,
  };
}

export const useCaseGroups: UseCaseGroup[] = [
  buildGroup(
    "security-operations",
    "Security / Operations",
    "Access control, surveillance visibility, and site response paths for live environments.",
    [
      { id: "access-and-entry", title: "Access & Entry" },
      { id: "visibility-and-response", title: "Visibility & Response" },
    ],
  ),
  buildGroup(
    "infrastructure-connectivity",
    "Infrastructure / Connectivity",
    "Network, cabling, server-room, and communications use cases for reliable site operations.",
    [
      { id: "site-foundation", title: "Site Foundation" },
      { id: "connectivity-and-communications", title: "Connectivity & Communications" },
    ],
  ),
  buildGroup(
    "managed-it",
    "Managed IT",
    "Operational support models for users, devices, and day-to-day technical continuity.",
    [
      { id: "support-coverage", title: "Support Coverage" },
      { id: "device-lifecycle", title: "Device Lifecycle" },
    ],
  ),
  buildGroup(
    "advisory-compliance",
    "Advisory / Compliance",
    "Audit, hardening, licensing, and delivery governance for higher-risk technical decisions.",
    [
      { id: "risk-and-compliance", title: "Risk & Compliance" },
      { id: "transformation-and-delivery", title: "Transformation & Delivery" },
    ],
  ),
];

export const useCaseProfiles: UseCaseProfile[] = [
  buildUseCase({
    slug: "entryway-security",
    title: "Entryway Security",
    shortDescription:
      "Blend access control, surveillance, and entry policy into a cleaner front-door operating model.",
    heroTitle:
      "Entry points need more than locks. They need visibility, control, and usable audit trails.",
    heroDescription:
      "Entryway security combines door access control, camera coverage, and network-ready deployment so reception teams, operators, and leadership can manage movement with less ambiguity.",
    group: "security-operations",
    menuSection: "access-and-entry",
    icon: "entryway-security",
    primaryServiceSlugs: [
      "door-access-control",
      "surveillance-system-cctv",
      "network-cabling",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "government",
      "healthcare",
      "real-estate-property-management",
    ],
    challengePoints: [
      "Visitors, staff, and service access often share the same entry logic even when the risk profile is different.",
      "Front-desk teams need faster answers when incidents happen at reception or shared entry points.",
      "Entry systems fail commercially when access policy, surveillance coverage, and cabling are handled as separate jobs.",
    ],
    environmentExamples: [
      "Head offices and reception-led environments",
      "Clinics, restricted departments, and controlled areas",
      "Managed buildings with shared entrances",
    ],
    relatedCaseStudySlug: "lagos-head-office-security-modernization",
    ctaLabel: "Book an Entryway Security Consultation",
  }),
  buildUseCase({
    slug: "cctv-monitoring-incident-review",
    title: "CCTV Monitoring & Incident Review",
    shortDescription:
      "Design surveillance systems around review speed, operational visibility, and usable incident footage.",
    heroTitle:
      "A camera system only matters when teams can review incidents quickly and trust the footage.",
    heroDescription:
      "This use case focuses on surveillance coverage, recorder sizing, retrieval workflow, and post-launch support so CCTV becomes an operational tool instead of dormant hardware.",
    group: "security-operations",
    menuSection: "visibility-and-response",
    icon: "cctv-monitoring",
    primaryServiceSlugs: [
      "surveillance-system-cctv",
      "network-configurations",
      "it-technical-services",
    ],
    relevantIndustrySlugs: [
      "retail",
      "warehousing-logistics",
      "corporate-offices",
      "manufacturing",
    ],
    challengePoints: [
      "Coverage plans often ignore how footage will actually be reviewed during live incidents.",
      "Weak recorder sizing and poor network tuning make retrieval slower than operators expect.",
      "Without clear handover and support ownership, surveillance systems degrade quickly after launch.",
    ],
    environmentExamples: [
      "Control-room and back-office review setups",
      "Retail floors and branch operations",
      "Operational compounds and dispatch zones",
    ],
    relatedCaseStudySlug: "warehouse-rollout-with-centralized-visibility",
    ctaLabel: "Book a CCTV Monitoring Consultation",
  }),
  buildUseCase({
    slug: "parking-lot-compound-surveillance",
    title: "Parking Lot & Compound Surveillance",
    shortDescription:
      "Extend surveillance planning beyond interiors to vehicle zones, gates, and site-wide movement paths.",
    heroTitle:
      "External areas need the same surveillance discipline as the building itself.",
    heroDescription:
      "Compound surveillance covers vehicle movement, parking visibility, boundary monitoring, and coverage continuity across outdoor zones where incidents are harder to reconstruct later.",
    group: "security-operations",
    menuSection: "visibility-and-response",
    icon: "parking-lot-surveillance",
    primaryServiceSlugs: [
      "surveillance-system-cctv",
      "network-design-with-diagram",
      "automated-gates-sliding-doors",
    ],
    relevantIndustrySlugs: [
      "warehousing-logistics",
      "healthcare",
      "real-estate-property-management",
      "hospitality",
    ],
    challengePoints: [
      "External blind spots create the biggest confidence gap during vehicle incidents and perimeter disputes.",
      "Outdoor deployments need stronger power, retention, and cabling planning than interior installs.",
      "Operators need one view of entry lanes, parking zones, and boundary movement instead of fragmented feeds.",
    ],
    environmentExamples: [
      "Staff and visitor parking zones",
      "Compounds with shared vehicle access",
      "Dispatch yards and open operational sites",
    ],
    relatedCaseStudySlug: "warehouse-rollout-with-centralized-visibility",
    ctaLabel: "Book a Compound Surveillance Consultation",
  }),
  buildUseCase({
    slug: "perimeter-gate-automation",
    title: "Perimeter & Gate Automation",
    shortDescription:
      "Unify motorized entry, access rules, and surveillance at the site perimeter.",
    heroTitle:
      "Gate automation works best when entry control, safety logic, and visibility are planned together.",
    heroDescription:
      "This use case combines automated gates, access control logic, and surveillance awareness so sites can manage vehicle and pedestrian entry without creating new operational confusion.",
    group: "security-operations",
    menuSection: "access-and-entry",
    icon: "perimeter-gate-automation",
    primaryServiceSlugs: [
      "automated-gates-sliding-doors",
      "door-access-control",
      "surveillance-system-cctv",
    ],
    relevantIndustrySlugs: [
      "real-estate-property-management",
      "warehousing-logistics",
      "corporate-offices",
      "healthcare",
    ],
    challengePoints: [
      "Sites often automate gates without tightening who is allowed through and how events are reviewed later.",
      "Perimeter systems need safer fallback, override, and power planning than basic entry hardware.",
      "Vehicle entry, visitor access, and common-area surveillance should not depend on separate operator workflows.",
    ],
    environmentExamples: [
      "Commercial compounds and managed estates",
      "Warehouse yards and service gates",
      "Office campuses with controlled vehicle entry",
    ],
    ctaLabel: "Book a Gate Automation Consultation",
  }),
  buildUseCase({
    slug: "office-network-rollout",
    title: "Office Network Rollout",
    shortDescription:
      "Plan and deliver office connectivity around users, endpoints, coverage, and long-term supportability.",
    heroTitle:
      "Office networks need to be designed as operating systems, not stitched together room by room.",
    heroDescription:
      "This use case brings design, cabling, switching, wireless coverage, and configuration into one rollout path so office environments can scale without recurring instability.",
    group: "infrastructure-connectivity",
    menuSection: "site-foundation",
    icon: "office-network-rollout",
    primaryServiceSlugs: [
      "network-design-with-diagram",
      "network-configurations",
      "structured-lan-cabling",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "education",
      "healthcare",
      "financial-services",
    ],
    challengePoints: [
      "Office expansions expose weak topology decisions and undocumented cabling very quickly.",
      "User complaints usually surface before teams can see where switching, wireless, or addressing is failing.",
      "Rollouts become expensive when design, procurement, and configuration are not sequenced properly.",
    ],
    environmentExamples: [
      "Head offices and branch fit-outs",
      "Multi-floor professional services environments",
      "Administrative and mixed-user office spaces",
    ],
    ctaLabel: "Book an Office Network Consultation",
  }),
  buildUseCase({
    slug: "structured-cabling-site-expansion",
    title: "Structured Cabling & Site Expansion",
    shortDescription:
      "Expand sites with certified cabling, cleaner routing, and documentation that still makes sense later.",
    heroTitle:
      "Site expansion is where poor cabling discipline becomes a long-term support problem.",
    heroDescription:
      "This use case focuses on horizontal and backbone cabling, certification, cabinet organization, and as-built documentation so growing environments stay reliable and supportable.",
    group: "infrastructure-connectivity",
    menuSection: "site-foundation",
    icon: "structured-cabling",
    primaryServiceSlugs: [
      "structured-lan-cabling",
      "network-cabling",
      "network-architecture-planning",
    ],
    relevantIndustrySlugs: [
      "education",
      "manufacturing",
      "hospitality",
      "corporate-offices",
    ],
    challengePoints: [
      "Expansion work often inherits undocumented pathways and inconsistent labeling from earlier phases.",
      "The network becomes harder to troubleshoot when new floors or buildings are added without certification.",
      "Poor cable management affects more than aesthetics. It slows support, upgrades, and incident isolation.",
    ],
    environmentExamples: [
      "New office floors and annexes",
      "Campuses and multi-building facilities",
      "Operational sites adding new zones or rooms",
    ],
    ctaLabel: "Book a Cabling Expansion Consultation",
  }),
  buildUseCase({
    slug: "multi-site-connectivity-standardization",
    title: "Multi-site Connectivity Standardization",
    shortDescription:
      "Bring branches or dispersed locations under one clearer connectivity model.",
    heroTitle:
      "Multi-site growth gets expensive when every location evolves on its own network logic.",
    heroDescription:
      "This use case helps growing organizations standardize topology, connectivity priorities, support expectations, and communications workflows across multiple locations.",
    group: "infrastructure-connectivity",
    menuSection: "connectivity-and-communications",
    icon: "multi-site-connectivity",
    primaryServiceSlugs: [
      "network-architecture-planning",
      "office-telephone-system-ip-pbx",
      "it-managed-services-staff-outsourcing",
    ],
    relevantIndustrySlugs: [
      "multi-site-smes",
      "healthcare",
      "retail",
      "corporate-offices",
    ],
    challengePoints: [
      "Branch growth creates inconsistency when each site uses different equipment, addressing, and support logic.",
      "Leadership needs better visibility across locations than ad-hoc troubleshooting can provide.",
      "Connectivity and communications should scale together once a business starts operating across sites.",
    ],
    environmentExamples: [
      "Multi-branch SMEs and service businesses",
      "Healthcare groups with more than one location",
      "Retail and admin teams spread across several sites",
    ],
    relatedCaseStudySlug: "private-clinic-network-refresh",
    ctaLabel: "Book a Multi-site Connectivity Consultation",
  }),
  buildUseCase({
    slug: "server-room-data-centre-readiness",
    title: "Server Room & Data Centre Readiness",
    shortDescription:
      "Prepare critical infrastructure rooms around power, cooling, racks, storage, and uptime discipline.",
    heroTitle:
      "Critical rooms need reliability planning before business systems depend on them.",
    heroDescription:
      "This use case covers racks, power resilience, environmental control, storage readiness, and monitoring so server rooms and data-centre spaces can support live business workloads properly.",
    group: "infrastructure-connectivity",
    menuSection: "site-foundation",
    icon: "server-room-readiness",
    primaryServiceSlugs: [
      "data-centre-services",
      "server-sales-repair",
      "server-storage-provisioning-deployment",
    ],
    relevantIndustrySlugs: [
      "financial-services",
      "healthcare",
      "government",
      "corporate-offices",
    ],
    challengePoints: [
      "Business-critical rooms fail when power, cooling, security, and storage are treated as separate purchases.",
      "Server environments need more than hardware supply. They need a stable operating baseline and handover model.",
      "Recovery planning becomes harder when infrastructure rooms are built without monitoring and documentation discipline.",
    ],
    environmentExamples: [
      "Server rooms inside head offices",
      "Small data-centre and comms spaces",
      "Sites hosting shared storage and core business systems",
    ],
    ctaLabel: "Book a Data Centre Readiness Consultation",
  }),
  buildUseCase({
    slug: "ip-pbx-internal-communications",
    title: "IP PBX & Internal Communications",
    shortDescription:
      "Modernize internal calling and branch communications around IP telephony instead of legacy phone sprawl.",
    heroTitle:
      "Internal communications improve when voice is planned as part of the network, not added after it.",
    heroDescription:
      "This use case combines IP PBX design, call-flow setup, switching readiness, and user rollout so teams can communicate more clearly across desks, floors, and branches.",
    group: "infrastructure-connectivity",
    menuSection: "connectivity-and-communications",
    icon: "ip-pbx-communications",
    primaryServiceSlugs: [
      "office-telephone-system-ip-pbx",
      "network-configurations",
      "sales-of-network-equipment",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "healthcare",
      "hospitality",
      "education",
    ],
    challengePoints: [
      "Voice quality suffers when telephony is deployed without proper switching and network readiness.",
      "Businesses lose clarity when call routing, queues, and escalation paths are still informal.",
      "Branch or multi-floor operations need a communications model that stays supportable after rollout.",
    ],
    environmentExamples: [
      "Office front desks and internal departments",
      "Hospitality and guest-facing operations",
      "Multi-floor teams that rely on internal extensions",
    ],
    ctaLabel: "Book an IP PBX Consultation",
  }),
  buildUseCase({
    slug: "managed-it-support-for-growing-teams",
    title: "Managed IT Support for Growing Teams",
    shortDescription:
      "Give growing teams a clearer support model before technical friction becomes operational drag.",
    heroTitle:
      "Managed support should reduce interruption, not just answer tickets after the fact.",
    heroDescription:
      "This use case packages support coverage, endpoint visibility, escalation ownership, and operational reporting for teams that need more reliability than ad-hoc IT support can deliver.",
    group: "managed-it",
    menuSection: "support-coverage",
    icon: "managed-it-support",
    primaryServiceSlugs: [
      "it-managed-services-staff-outsourcing",
      "it-technical-services",
      "antivirus-licenses",
    ],
    relevantIndustrySlugs: [
      "multi-site-smes",
      "corporate-offices",
      "healthcare",
      "retail",
    ],
    challengePoints: [
      "Growing teams usually outgrow reactive support before leadership realizes how much interruption it is causing.",
      "Support quality depends on visibility, onboarding standards, and escalation ownership, not just response speed.",
      "Commercial confidence improves when leadership can see what is being managed, patched, and followed up.",
    ],
    environmentExamples: [
      "SMEs moving beyond ad-hoc support",
      "Professional teams with shared office infrastructure",
      "Operations that need predictable monthly IT ownership",
    ],
    relatedCaseStudySlug: "private-clinic-network-refresh",
    ctaLabel: "Book a Managed IT Consultation",
  }),
  buildUseCase({
    slug: "it-staff-outsourcing-onsite-support",
    title: "IT Staff Outsourcing & On-site Support",
    shortDescription:
      "Embed technical support capacity where the business needs hands-on execution and faster response.",
    heroTitle:
      "Some environments do not need another vendor list. They need dependable hands-on technical coverage.",
    heroDescription:
      "This use case focuses on staffed support coverage, on-site engineer presence, escalation backing, and operational coordination for environments that need physical technical presence.",
    group: "managed-it",
    menuSection: "support-coverage",
    icon: "it-staff-outsourcing",
    primaryServiceSlugs: [
      "it-managed-services-staff-outsourcing",
      "it-project-management",
      "it-technical-services",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "healthcare",
      "education",
      "government",
    ],
    challengePoints: [
      "Critical environments cannot always rely on remote-only support when issues are physical or time-sensitive.",
      "Staff augmentation fails when there is no backed-up escalation path or operational reporting model.",
      "On-site coverage should improve accountability, not simply add another person to absorb unresolved issues.",
    ],
    environmentExamples: [
      "Offices with high user density",
      "Healthcare and education environments with live support pressure",
      "Teams that need resident or scheduled engineer presence",
    ],
    ctaLabel: "Book an On-site Support Consultation",
  }),
  buildUseCase({
    slug: "endpoint-deployment-user-readiness",
    title: "Endpoint Deployment & User Readiness",
    shortDescription:
      "Deliver devices ready for work with setup, migration, licensing, and cleaner user handover.",
    heroTitle:
      "Endpoint rollout succeeds when devices arrive ready for users, not waiting for follow-up fixes.",
    heroDescription:
      "This use case combines procurement, setup, operating-system licensing, profile migration, and user-readiness checks so device rollouts stop generating avoidable day-one friction.",
    group: "managed-it",
    menuSection: "device-lifecycle",
    icon: "endpoint-deployment",
    primaryServiceSlugs: [
      "desktop-laptop-sales",
      "computer-installation-setup",
      "windows-operating-system-licenses",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "education",
      "retail",
      "multi-site-smes",
    ],
    challengePoints: [
      "Device projects slow down when procurement, setup, and user migration happen as disconnected steps.",
      "Users lose confidence fast when new endpoints arrive with incomplete access, missing apps, or weak hardening.",
      "Business rollout quality depends on handover discipline, not just how quickly hardware was sourced.",
    ],
    environmentExamples: [
      "New-hire and team refresh programs",
      "Branch device standardization projects",
      "Office moves and workstation replacement cycles",
    ],
    ctaLabel: "Book an Endpoint Rollout Consultation",
  }),
  buildUseCase({
    slug: "break-fix-recovery-preventive-maintenance",
    title: "Break-Fix Recovery & Preventive Maintenance",
    shortDescription:
      "Recover failed endpoints and systems faster while reducing repeated hardware and support incidents.",
    heroTitle:
      "Break-fix support is more valuable when it feeds a smarter maintenance model afterward.",
    heroDescription:
      "This use case covers diagnostics, repair, server remediation, field support, and preventive maintenance planning for teams that need to restore service without repeating the same failures.",
    group: "managed-it",
    menuSection: "device-lifecycle",
    icon: "break-fix-recovery",
    primaryServiceSlugs: [
      "repair-of-it-hardware",
      "server-sales-repair",
      "it-technical-services",
    ],
    relevantIndustrySlugs: [
      "retail",
      "healthcare",
      "corporate-offices",
      "manufacturing",
    ],
    challengePoints: [
      "Repeated hardware failure usually signals a maintenance and standards problem, not only a repair problem.",
      "Downtime becomes more expensive when devices, printers, or servers fail without a prepared support path.",
      "Businesses need diagnostic clarity before parts are bought or replacement decisions are made.",
    ],
    environmentExamples: [
      "Teams with aging device fleets",
      "Operational offices that cannot absorb long downtime",
      "Mixed hardware environments with recurring failures",
    ],
    ctaLabel: "Book a Recovery Consultation",
  }),
  buildUseCase({
    slug: "it-audit-compliance-readiness",
    title: "IT Audit & Compliance Readiness",
    shortDescription:
      "Assess controls, documentation, and technical gaps before risk or compliance pressure escalates.",
    heroTitle:
      "Audit readiness starts with technical clarity, not last-minute paperwork.",
    heroDescription:
      "This use case helps organizations review infrastructure, controls, licensing, and policy gaps so leadership can move into audits, procurement, or remediation with better evidence.",
    group: "advisory-compliance",
    menuSection: "risk-and-compliance",
    icon: "it-audit-compliance",
    primaryServiceSlugs: [
      "it-consultancy-audit-services",
      "firewall-sales-licenses",
      "server-operating-system-licenses",
    ],
    relevantIndustrySlugs: [
      "financial-services",
      "healthcare",
      "government",
      "education",
    ],
    challengePoints: [
      "Teams often know something is weak, but not which gaps matter most commercially or operationally.",
      "Compliance conversations get harder when controls, licensing, and system ownership are poorly documented.",
      "Objective audit work is most useful when it leads directly into a remediation path leadership can understand.",
    ],
    environmentExamples: [
      "Board-level risk review and remediation planning",
      "Pre-procurement infrastructure audits",
      "Compliance-driven control and documentation checks",
    ],
    ctaLabel: "Book an Audit Readiness Consultation",
  }),
  buildUseCase({
    slug: "firewall-endpoint-security-hardening",
    title: "Firewall & Endpoint Security Hardening",
    shortDescription:
      "Strengthen network-edge and endpoint protections before security drift becomes business risk.",
    heroTitle:
      "Security hardening works when edge controls and device protection are treated as one operating layer.",
    heroDescription:
      "This use case combines firewall supply and configuration, endpoint protection rollout, and operating-system posture improvements so businesses can reduce exposure without guesswork.",
    group: "advisory-compliance",
    menuSection: "risk-and-compliance",
    icon: "firewall-hardening",
    primaryServiceSlugs: [
      "firewall-sales-licenses",
      "antivirus-licenses",
      "server-operating-system-licenses",
    ],
    relevantIndustrySlugs: [
      "financial-services",
      "healthcare",
      "government",
      "multi-site-smes",
    ],
    challengePoints: [
      "Security tooling loses value when policy, renewal, and deployment hygiene drift out of sync.",
      "Endpoint visibility and firewall posture should reinforce each other, not be managed as separate conversations.",
      "Hardening is most effective when tied to real operational risk rather than generic checklist language.",
    ],
    environmentExamples: [
      "Security refresh programs for growing businesses",
      "Branch or multi-site environments with shared internet exposure",
      "Regulated teams tightening device and edge controls",
    ],
    ctaLabel: "Book a Security Hardening Consultation",
  }),
  buildUseCase({
    slug: "cloud-transition-license-governance",
    title: "Cloud Transition & License Governance",
    shortDescription:
      "Move subscriptions, users, and workloads into a cleaner cloud and licensing model.",
    heroTitle:
      "Cloud transitions fail less when migration and license governance move together.",
    heroDescription:
      "This use case helps teams structure Microsoft 365, Google Workspace, Azure, AWS, and application licensing changes around business continuity, clarity, and renewal control.",
    group: "advisory-compliance",
    menuSection: "transformation-and-delivery",
    icon: "cloud-transition",
    primaryServiceSlugs: [
      "cloud-services-licenses",
      "applications-licenses",
      "windows-operating-system-licenses",
    ],
    relevantIndustrySlugs: [
      "corporate-offices",
      "education",
      "healthcare",
      "multi-site-smes",
    ],
    challengePoints: [
      "Cloud moves become messy when users, devices, and licenses are migrated without clear ownership.",
      "Renewal sprawl creates avoidable cost and visibility problems once subscriptions start scaling.",
      "Licensing governance matters most when the environment is actively changing, not only at renewal time.",
    ],
    environmentExamples: [
      "Microsoft 365 and Google Workspace migrations",
      "Application license rationalization projects",
      "Growing businesses standardizing cloud subscriptions",
    ],
    ctaLabel: "Book a Cloud Transition Consultation",
  }),
  buildUseCase({
    slug: "technology-project-delivery-vendor-oversight",
    title: "Technology Project Delivery & Vendor Oversight",
    shortDescription:
      "Coordinate technical delivery, vendor inputs, and commercial risk across larger change programs.",
    heroTitle:
      "Complex technology work lands better when someone owns coordination before issues escalate.",
    heroDescription:
      "This use case covers scoped project leadership, architecture review, vendor coordination, and delivery oversight so infrastructure and transformation projects stay commercially and technically aligned.",
    group: "advisory-compliance",
    menuSection: "transformation-and-delivery",
    icon: "technology-project-delivery",
    primaryServiceSlugs: [
      "it-project-management",
      "network-architecture-planning",
      "it-consultancy-audit-services",
    ],
    relevantIndustrySlugs: [
      "government",
      "healthcare",
      "corporate-offices",
      "manufacturing",
    ],
    challengePoints: [
      "Vendor-led delivery often leaves ownership gaps between design, procurement, and handover.",
      "Large technical projects drift when risk, sequencing, and decision points are not made visible early enough.",
      "Leadership needs a clearer commercial picture of delivery risk, not just technical progress updates.",
    ],
    environmentExamples: [
      "Infrastructure refresh and relocation programs",
      "Multi-vendor rollout or upgrade initiatives",
      "Technical projects needing stronger governance and reporting",
    ],
    relatedCaseStudySlug: "warehouse-rollout-with-centralized-visibility",
    ctaLabel: "Book a Project Delivery Consultation",
  }),
];
