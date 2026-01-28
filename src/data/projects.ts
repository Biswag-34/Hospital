export type ProjectStatus = "ongoing" | "upcoming";
export type ProjectType = "general" | "special";

export type Project = {
  id: string;
  slug: string;

  title: string;
  summary: string;      // 1–2 lines
  highlight: string;    // impact hook like “₹500 feeds 1 patient/day”

  status: ProjectStatus;
  type: ProjectType;    // "special" appears in Special Cause tab

  heroImage: string;
  tags?: string[];

  goalAmount?: number;  // optional
  raisedAmount?: number; // optional
  currency?: "INR" | "USD";

  location?: string;
  endDateLabel?: string; // e.g. “Ends: Feb 20, 2026” or “Starts: Mar 2026”
};

export const PROJECTS: Project[] = [
  {
    id: "p-icu-upgrade",
    slug: "icu-upgrade",
    title: "ICU Upgrade & Monitoring Expansion",
    summary:
      "Upgrading ICU monitoring systems to improve early detection and patient outcomes.",
    highlight: "Your donation supports critical care equipment.",
    status: "ongoing",
    type: "general",
    heroImage: "/projects/icu.jpg",
    tags: ["Critical Care", "Equipment"],
    goalAmount: 1500000,
    raisedAmount: 620000,
    currency: "INR",
    location: "Hospital Campus",
    endDateLabel: "Ends: Mar 2026",
  },
  {
    id: "p-free-camps",
    slug: "free-health-camps",
    title: "Free Community Health Camps",
    summary:
      "Monthly screening camps focused on diabetes, BP, and basic diagnostics.",
    highlight: "₹299 can sponsor 1 screening kit.",
    status: "upcoming",
    type: "general",
    heroImage: "/projects/camp.jpg",
    tags: ["Community", "Prevention"],
    goalAmount: 300000,
    raisedAmount: 0,
    currency: "INR",
    location: "Nearby Communities",
    endDateLabel: "Starts: Feb 2026",
  },
  {
    id: "p-special-child-care",
    slug: "special-child-care-fund",
    title: "Special Cause: Child Care Support Fund",
    summary:
      "Support treatment and nutrition assistance for underprivileged pediatric patients.",
    highlight: "Keep care accessible for children who need it most.",
    status: "ongoing",
    type: "special",
    heroImage: "/projects/children.jpg",
    tags: ["Pediatrics", "Support"],
    goalAmount: 800000,
    raisedAmount: 215000,
    currency: "INR",
    location: "Pediatric Wing",
    endDateLabel: "Ongoing",
  },
  {
    id: "p-special-cancer-screening",
    slug: "special-cancer-screening-drive",
    title: "Special Cause: Cancer Screening Drive",
    summary:
      "Targeted early detection screenings with awareness sessions and follow-up guidance.",
    highlight: "Early detection saves lives—help us reach more people.",
    status: "upcoming",
    type: "special",
    heroImage: "/projects/cancer.jpg",
    tags: ["Screening", "Awareness"],
    goalAmount: 1200000,
    raisedAmount: 0,
    currency: "INR",
    location: "Outreach Program",
    endDateLabel: "Starts: Apr 2026",
  },
];
