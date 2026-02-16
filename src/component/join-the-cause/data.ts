// components/join-cause/data.ts

/* ================= TYPES ================= */

export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectStatus = "ongoing" | "upcoming";

export type CostLine = {
  label: string;
  minLakh: number;
  maxLakh: number;
  note?: string;
};

export type Project = {
  id: string;

  /* basic info */
  title: string;
  subtitle: string;
  image: string;
  tags: string[];

  /* display */
  stats: ProjectStat[];
  points: string[];

  /* state */
  status: ProjectStatus;
  urgent?: boolean;
  featured?: boolean;
  progress?: number;
  startDate?: string;

  /* type */
  kind?: "cause" | "bucket" | "infrastructure";

  /* =================
     DONATION BUCKET DATA
     ================= */

  budget?: {
    totalMinLakh: number;
    totalMaxLakh: number;
    breakdown: CostLine[];
  };

  amc?: {
    min: number;
    max: number;
  };

  specs?: {
    label: string;
    value: string;
  }[];

  transparency?: string[];
};

/* ================= DATA ================= */
/**
 * REAL DATA ONLY
 * Sources:
 * 1) Lift Request Letter (Ref: AVS:073:2025-26, Date: 02/02/2026)
 * 2) Anthargange Rural Hospital & Research Center Appeal (Ref: AVS:074:2025-26, Date: 02/02/2026)
 */

export const projects: Project[] = [
  /* =======================
     1) Hospital Passenger Lift (Donation Bucket)
     ======================= */
  {
    id: "hospital-passenger-lift",
    title: "Hospital Passenger Lift",
    subtitle:
      "Disability-friendly access across floors for elderly, disabled patients, and emergency transfers.",
    image: "/projects/lift.jpg",
    tags: ["Accessibility", "Infrastructure", "Patient Safety"],

    stats: [
      { label: "Total Estimate", value: "₹12.8L–₹16L" },
      { label: "AMC / year", value: "₹60k–₹1L" },
      { label: "Capacity", value: "8 persons" },
    ],

    points: [
      "Improves access for elderly & disabled patients",
      "Faster, safer movement during emergencies",
      "Essential infrastructure for a functional hospital",
    ],

    status: "ongoing",
    urgent: true,
    featured: true,
    kind: "bucket",

    budget: {
      totalMinLakh: 12.8,
      totalMaxLakh: 16.0,
      breakdown: [
        { label: "Lift equipment & installation", minLakh: 10.0, maxLakh: 12.0 },
        { label: "Lift shaft finishing & civil interface", minLakh: 1.5, maxLakh: 2.0 },
        { label: "Electrical works & power backup interface", minLakh: 0.8, maxLakh: 1.2 },
        { label: "Testing, commissioning & statutory approvals", minLakh: 0.5, maxLakh: 0.8 },
      ],
    },

    amc: { min: 60000, max: 100000 },

    specs: [
      { label: "Type", value: "Hospital Passenger Lift" },
      { label: "Capacity", value: "8 persons (≈ 544–630 kg)" },
      { label: "Floors Served", value: "Ground + Upper Floors (up to 3–4 stops)" },
      { label: "Door Type", value: "Automatic, center-opening" },
      { label: "Speed", value: "1.0 m/sec" },
      { label: "Power Supply", value: "3 Phase" },
      { label: "Compliance", value: "IS standards / hospital safety norms" },
    ],

    transparency: [
      "Pricing shown as a range because final cost depends on brand and statutory approvals.",
      "Donors will receive updates from purchase → installation → commissioning.",
    ],
  },

  /* =======================
     2) Furniture & Essential Equipment Budget – ₹1 Crore (Donation Bucket)
     Source: Anthargange Rural Hospital & Research Center Appeal.pdf
     ======================= */
  {
    id: "furniture-essential-equipment-1cr",
    title: "Furniture & Essential Equipment (₹1 Crore)",
    subtitle:
      "Essential beds, ICU support, emergency care, OPD and accessibility equipment to operationalize a 50-bedded rural hospital.",
    image: "/projects/equipment.jpg",
    tags: ["Essential Equipment", "Critical Care", "Emergency", "Accessibility"],

    stats: [
      { label: "Total Budget", value: "₹99.35L (~₹1 Cr)" },
      { label: "Inpatient Beds", value: "50 beds" },
      { label: "ICU / HDU", value: "8 beds (Phase 1)" },
    ],

    points: [
      "Enables safe inpatient care, emergency services & ICU support",
      "Supports OPD functionality with essential examination setups",
      "Improves mobility and dignity for disabled & rural patients",
    ],

    status: "ongoing",
    urgent: true,
    featured: true,
    kind: "bucket",

    budget: {
      // Grand total stated in the PDF: ₹99,35,000 (rounded to ₹1 Cr for proposal)
      totalMinLakh: 99.35,
      totalMaxLakh: 99.35,
      breakdown: [
        // A–H section subtotals from the PDF
        { label: "Inpatient Wards (50 beds) — subtotal", minLakh: 18.0, maxLakh: 18.0 },
        { label: "ICU / HDU (8 beds – Phase 1) — subtotal", minLakh: 33.0, maxLakh: 33.0 },
        { label: "Emergency & Casualty — subtotal", minLakh: 7.35, maxLakh: 7.35 },
        { label: "Nursing Stations & Ward Support — subtotal", minLakh: 6.0, maxLakh: 6.0 },
        { label: "Monitoring & Patient Care Equipment — subtotal", minLakh: 12.0, maxLakh: 12.0 },
        { label: "OPD & Examination Areas — subtotal", minLakh: 5.0, maxLakh: 5.0 },
        { label: "Reception & Administration — subtotal", minLakh: 3.0, maxLakh: 3.0 },
        { label: "Disability & Patient Mobility Support — subtotal", minLakh: 3.0, maxLakh: 3.0 },
      ],
    },

    specs: [
      { label: "Hospital Type", value: "50-bedded Secondary Care Hospital" },
      { label: "ICU/HDU Phase", value: "Phase 1 (8 ICU/HDU beds)" },
      { label: "Ventilators", value: "3 units" },
      { label: "Multipara Monitors", value: "8 (ICU) + 6 (Ward)" },
      { label: "Emergency Readiness", value: "Crash cart + stretchers + wheelchairs + monitors" },
      { label: "Patient Mobility", value: "Wheelchairs + walkers + commode chairs + transfer aids" },
    ],

    transparency: [
      "This is a need-based essentials budget to make the hospital functional (not luxury spend).",
      "The proposal states a consolidated budget of ₹99,35,000 (rounded to ₹1 Crore for proposal purposes).",
      "Donors can be updated as procurement is completed area-by-area (wards → ICU → emergency → OPD).",
    ],
  },
  /* ==========================================
     DONATION BUCKET #2 — CSR REHAB + O&P UNIT
     ========================================== */
  {
    id: "advanced-rehab-assistive-unit",
    title: "Advanced Physiotherapy, Rehabilitation & Assistive Devices Unit",
    subtitle:
      "Integrated rural rehab + neuro-rehab + orthotics/prosthetics manufacturing — built as a self-sustaining, inclusive model.",
    image: "/projects/rehab-unit.jpg", // put a real image in public/projects/
    tags: ["Rehabilitation", "Orthotics & Prosthetics", "Disability Inclusion", "Rural Healthcare"],

    stats: [
      { label: "CSR Budget", value: "₹25L (All-inclusive)" },
      { label: "Area", value: "2,000–2,500 sq.ft." },
      { label: "Direct Beneficiaries", value: "6,000–8,000 / year" },
    ],

    points: [
      "Physiotherapy + neuro-rehabilitation services under one roof",
      "In-house manufacturing of orthotics, prosthetics, footwear & rehab aids",
      "Train & employ persons with disabilities to fabricate assistive devices",
    ],

    // Proposal + implementation plan exists; treat as upcoming unless you've already started execution.
    status: "upcoming",
    featured: true,
    kind: "bucket",

    budget: {
      // Proposal states CSR model “INR 25 Lakhs Total / All Inclusive” :contentReference[oaicite:8]{index=8}
      totalMinLakh: 25.0,
      totalMaxLakh: 25.0,
      breakdown: [
        {
          label: "Infrastructure & Civil Works (Subtotal)",
          minLakh: 10.0,
          maxLakh: 12.0,
          note:
            "Includes flooring/ramps/partitions, electricals/lighting/power points, pediatric & neuro-rehab interiors, O&P workspace setup.",
        },
        {
          label: "Physiotherapy, Rehabilitation & Manufacturing Equipment (Subtotal)",
          minLakh: 10.0,
          maxLakh: 12.0,
          note:
            "Includes electrotherapy (IFT/US/TENS/Laser), exercise/gait tools, pediatric CP/balance tools, CPM/walkers/parallel bars, footwear/insole machines, orthotic tools/workstations.",
        },
        {
          label: "Cleaning, Hygiene & Infection Control (Subtotal)",
          minLakh: 3.0,
          maxLakh: 3.0,
          note:
            "Deep cleaning & sanitation setup, housekeeping equipment/consumables (1 year), biomedical waste handling & hygiene compliance.",
        },

        // Optional: richer line-level detail (keeps your UI transparent)
        { label: "• Rehab hall modifications (flooring/ramps/partitions)", minLakh: 5.0, maxLakh: 5.0 },
        { label: "• Electricals/lighting/power backup points", minLakh: 2.0, maxLakh: 2.0 },
        { label: "• Pediatric & neuro-rehab friendly interiors", minLakh: 2.0, maxLakh: 2.0 },
        { label: "• O&P & footwear workspace setup", minLakh: 2.0, maxLakh: 3.0 },

        { label: "• Electrotherapy units (IFT/Ultrasound/TENS/Laser)", minLakh: 3.0, maxLakh: 3.0 },
        { label: "• Exercise therapy & gait training equipment", minLakh: 2.5, maxLakh: 2.5 },
        { label: "• Pediatric CP rehab & balance training tools", minLakh: 2.0, maxLakh: 2.0 },
        { label: "• CPM unit, walkers, parallel bars, mobility aids", minLakh: 1.5, maxLakh: 1.5 },
        { label: "• Footwear & insole making machines", minLakh: 2.0, maxLakh: 2.0 },
        { label: "• Orthotic fabrication tools & workstations", minLakh: 1.0, maxLakh: 1.0 },

        { label: "• Deep cleaning & sanitation setup (initial)", minLakh: 1.0, maxLakh: 1.0 },
        { label: "• Housekeeping equipment & consumables (1 year)", minLakh: 1.5, maxLakh: 1.5 },
        { label: "• Biomedical waste handling & hygiene compliance", minLakh: 0.5, maxLakh: 0.5 },
      ],
    },

    specs: [
      { label: "Area", value: "~2,000–2,500 sq.ft." },
      { label: "Go-live timeline", value: "Full operationalization within 6 months" },
      { label: "Direct beneficiaries", value: "6,000–8,000 patients/year" },
      { label: "Indirect beneficiaries", value: "Families, caregivers, rural communities" },

      { label: "Key zones", value: "Electrotherapy, Exercise/Gait, Neuro-rehab, Pediatric rehab, Geriatric/Spine, ADL training" },
      {
        label: "Advanced equipment (examples)",
        value:
          "Robotic gait trainer/body-weight treadmill, FES, advanced IFT/ultrasound/laser, balance/proprioception trainers, pediatric CP rehab equipment, CPM units",
      },
      {
        label: "O&P / footwear unit",
        value:
          "Orthotic lab, prosthetic assembly, customized footwear & insoles, diabetic foot offloading devices",
      },
      {
        label: "Products manufactured (examples)",
        value:
          "AFO/KAFO/spinal braces, below/above-knee prosthesis, CP splints, diabetic footwear/insoles, walking aids/adaptive devices",
      },
      {
        label: "Unique feature",
        value:
          "Persons with disabilities trained, certified, and employed to manufacture devices",
      },
      {
        label: "Sustainability model",
        value:
          "Affordable therapy charges (cross-subsidized), sale of orthotics/prosthetics/footwear, long-term CSR partnership & hospital revenue support, reduced dependency on external suppliers",
      },
      {
        label: "CSR alignment & impact",
        value:
          "Disability inclusion & empowerment, rural healthcare strengthening, skill development & livelihood generation",
      },
    ],

    transparency: [
      "CSR Model is planned as ₹25 Lakhs all-inclusive, with modular funding options available.",
      "Implementation plan: Month 1–2 infra & procurement → Month 3–4 training → Month 5 pilot → Month 6 full-scale operations.",
      "We will publish periodic updates on progress (setup, procurement, training, pilot launch, and full operations).",
    ],
  },
];



/* ================= HELPERS ================= */

export const featuredProjects = projects.filter((p) => p.featured);

export const ongoingProjects = projects.filter((p) => p.status === "ongoing");

export const upcomingProjects = projects.filter((p) => p.status === "upcoming");

export const donationBuckets = projects.filter((p) => p.kind === "bucket");

/* ✅ NEW: tag helpers */
export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort((a, b) => a.localeCompare(b));