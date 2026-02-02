// components/join-cause/data.ts
export type ProjectStat = { label: string; value: string };
export type ProjectStatus = "ongoing" | "upcoming";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  stats: ProjectStat[];
  points: string[];
  progress?: number;
  urgent?: boolean;
  featured?: boolean;
  status: ProjectStatus;

  // ✅ NEW: for upcoming projects
  startDate?: string; // ISO format e.g. "2026-03-01"
};

export const projects: Project[] = [
  {
    id: "nicu-upgrade",
    title: "NICU Equipment Upgrade",
    subtitle: "Helping newborns breathe safer, faster, better.",
    image: "/projects/nicu.jpg",
    tags: ["Critical Care", "Neonatal", "Life Support"],
    stats: [
      { label: "Target", value: "₹28L" },
      { label: "Raised", value: "₹11.4L" },
      { label: "Lives Impacted", value: "320+" },
    ],
    points: [
      "New ventilators & monitors for premature babies",
      "Reduce emergency referral burden",
      "Training support for NICU staff",
    ],
    progress: 41,
    urgent: true,
    featured: true,
    status: "ongoing",
  },
  {
    id: "dialysis-support",
    title: "Dialysis Support Fund",
    subtitle: "Monthly treatment assistance for low-income patients.",
    image: "/projects/dialysis.jpg",
    tags: ["Renal Care", "Subsidy", "Community"],
    stats: [
      { label: "Patients/Month", value: "45" },
      { label: "Sessions", value: "900+" },
      { label: "Partnered NGOs", value: "6" },
    ],
    points: [
      "Sponsor sessions for deserving patients",
      "Emergency dialysis coverage",
      "Nutrition & follow-up support",
    ],
    progress: 66,
    featured: true,
    status: "ongoing",
  },
  {
    id: "mobile-health-camp",
    title: "Mobile Health Camps",
    subtitle: "Taking checkups, screening & awareness to villages.",
    image: "/projects/healthcamp.jpg",
    tags: ["Outreach", "Preventive", "Rural Health"],
    stats: [
      { label: "Camps Planned", value: "24" },
      { label: "People Screened", value: "3,800+" },
      { label: "Referrals", value: "410" },
    ],
    points: [
      "Diabetes & BP screening",
      "Women’s health education sessions",
      "Follow-up referrals to hospital care",
    ],
    progress: 52,
    status: "upcoming",
    startDate: "2026-03-01", // ✅ Starting in March 2026
  },
  {
    id: "cancer-screening",
    title: "Cancer Early Screening Drive",
    subtitle: "Early detection saves lives — focus on awareness & tests.",
    image: "/projects/cancer.jpg",
    tags: ["Oncology", "Screening", "Awareness"],
    stats: [
      { label: "Target Screenings", value: "5,000" },
      { label: "Completed", value: "1,640" },
      { label: "High-Risk Found", value: "112" },
    ],
    points: [
      "Subsidized screening packages",
      "Awareness campaigns in schools & offices",
      "Fast-track specialist consultations",
    ],
    progress: 33,
    urgent: true,
    status: "upcoming",
    startDate: "2026-04-10", // ✅ Starting in April 2026
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
