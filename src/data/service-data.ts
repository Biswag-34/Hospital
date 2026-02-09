// src/data/service-data.ts
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Brain,
  Footprints,
  Droplets,
  Baby,
  Home,
  Hand,
  Ribbon,
  Video,
} from "lucide-react";

export type SubService = {
  title: string;
  points: string[];
};

export type Service = {
  id: string;
  label: string; // short label shown on node
  title: string; // card title
  icon: LucideIcon;

  // About paragraph (concise)
  summary: string;

  // 3–4 mini cards: title + bullet points
  subServices: SubService[];

  // Commitment strip (concise)
  commitmentShort: string;

  // Used as background image for desktop right card + mobile expanded card
  image: string;

  // Optional CTA
  ctaLabel?: string;
  ctaHref?: string;
};

export const SERVICES: Service[] = [
  {
    id: "eye-care",
    label: "Eye Care",
    title: "Cataract Surgery & Comprehensive Eye Care",
    icon: Eye,
    summary:
      "Affordable, high-quality cataract surgery and eye care with special focus on elderly patients, persons with disabilities, and economically weaker rural communities.",
    subServices: [
      {
        title: "Cataract Surgery",
        points: [
          "Manual Small Incision Cataract Surgery (SICS)",
          "Intraocular lens (IOL) implantation",
          "Safe and standardized surgical protocols",
          "Pre-op evaluation, counselling, and post-op follow-up",
        ],
      },
      {
        title: "Comprehensive Eye Care",
        points: [
          "Eye OPD for common eye conditions",
          "Screening for glaucoma and diabetic eye disease",
          "Refraction services and spectacle prescription",
          "Management of infections and minor eye disorders",
        ],
      },
      {
        title: "Community Screening & Outreach",
        points: [
          "Regular village-level eye screening camps",
          "Early detection of cataract and vision problems",
          "Referral and coordination for surgery",
          "Post-surgery follow-up camps",
        ],
      },
      {
        title: "Care for Vulnerable Populations",
        points: [
          "Special attention to elderly patients",
          "Eye care for persons with disabilities",
          "Cataract treatment for mentally challenged patients",
          "Free or highly subsidized surgeries for the needy",
        ],
      },
    ],
    commitmentShort:
      "Safe, effective and affordable eye care—no patient denied due to financial or social barriers.",
    image: "/services/eye-care.jpg",
    ctaLabel: "Book Eye OPD",
    ctaHref: "/contact",
  },

  {
    id: "mental-health",
    label: "Mental Health",
    title: "Mental Health, Intellectual Disability & De-addiction",
    icon: Brain,
    summary:
      "Long-term, compassionate and affordable care for congenitally mentally ill and intellectually disabled patients requiring continuous support.",
    subServices: [
      {
        title: "Congenital Mental Illness & ID Care",
        points: [
          "Evaluation and diagnosis of intellectual disability",
          "Autism spectrum disorder care",
          "Lifelong psychiatric management",
          "Behavioral therapy, structured routines, life-skills training",
        ],
      },
      {
        title: "Therapy & Family Support",
        points: [
          "Occupational therapy and life-skills training",
          "Parent and caregiver counselling",
          "Routine-based care planning",
        ],
      },
      {
        title: "General Psychiatry",
        points: [
          "Treatment of depression, anxiety, psychotic disorders",
          "Chronic mental illness management",
          "Emergency psychiatric care",
          "Integrated medical and psychiatric treatment",
        ],
      },
      {
        title: "De-addiction",
        points: [
          "Alcohol and substance use disorder treatment",
          "Medically supervised detoxification",
          "Psychological counselling and relapse prevention",
          "Family-based recovery programs",
        ],
      },
    ],
    commitmentShort:
      "Lifelong care with dignity and compassion—highest standard mental healthcare at the lowest possible cost.",
    image: "/services/mental-health.jpg",
    ctaLabel: "Talk to a Counsellor",
    ctaHref: "/contact",
  },

  {
    id: "wound-care",
    label: "Wound Care",
    title: "Wound Care, Diabetic Foot & Amputee Rehabilitation",
    icon: Footprints,
    summary:
      "Specialized wound care and diabetic foot services focused on early treatment, limb salvage and rehabilitation to prevent disability and livelihood loss.",
    subServices: [
      {
        title: "Diabetic Foot & Limb Salvage",
        points: [
          "Evaluation and grading of diabetic foot ulcers",
          "Infection control and surgical debridement",
          "Limb-sparing procedures and minor amputations",
          "Continuous wound monitoring and follow-up",
        ],
      },
      {
        title: "Advanced Wound Care",
        points: [
          "Treatment of chronic non-healing wounds",
          "Pressure sores and venous ulcers",
          "Modern wound dressing techniques",
          "Infection prevention and healing support",
        ],
      },
      {
        title: "Prosthetic & Amputee Rehabilitation",
        points: [
          "Below-knee and above-knee prosthetic limbs",
          "Prosthetic fitting and gait training",
          "Rehabilitation and mobility support",
          "Psychological counselling for amputees",
        ],
      },
      {
        title: "Preventive Foot Care",
        points: [
          "Customized diabetic footwear and insoles",
          "Offloading devices to prevent recurrence",
          "Foot hygiene education and long-term care",
        ],
      },
    ],
    commitmentShort:
      "Save limbs when possible and restore mobility when unavoidable—affordable, continuous care under one roof.",
    image: "/services/wound-care.jpg",
    ctaLabel: "Book Foot Check",
    ctaHref: "/contact",
  },

  {
    id: "dialysis",
    label: "Dialysis",
    title: "Dialysis & Renal Care",
    icon: Droplets,
    summary:
      "Affordable dialysis and comprehensive renal care for chronic kidney disease patients—life-saving treatment close to home.",
    subServices: [
      {
        title: "Hemodialysis Services",
        points: [
          "Maintenance hemodialysis",
          "Emergency dialysis support",
          "Trained dialysis technicians and nursing care",
          "Strict infection control and safety protocols",
        ],
      },
      {
        title: "Comprehensive Renal Care",
        points: [
          "Medical management of kidney disease",
          "Diabetes and blood pressure control",
          "Anemia and electrolyte management",
          "Infection prevention and vaccination support",
        ],
      },
      {
        title: "Nutrition & Counselling",
        points: [
          "Renal diet counselling",
          "Medication and fluid adherence guidance",
          "Psychological support for chronic illness",
        ],
      },
    ],
    commitmentShort:
      "Life-sustaining dialysis at the lowest possible cost—reducing burden and ensuring continuity for rural patients.",
    image: "/services/dialysis.jpg",
    ctaLabel: "Dialysis Enquiry",
    ctaHref: "/contact",
  },

  {
    id: "cleft-care",
    label: "Cleft Care",
    title: "Cleft Lip & Cleft Palate Care",
    icon: Baby,
    summary:
      "Comprehensive cleft treatment so children receive timely and affordable care for these correctable conditions.",
    subServices: [
      {
        title: "Cleft Surgery",
        points: [
          "Primary cleft lip repair",
          "Cleft palate repair",
          "Secondary corrective procedures",
          "Safe pediatric anesthesia and post-operative care",
        ],
      },
      {
        title: "Pre-op & Nutrition Support",
        points: [
          "Feeding counselling for infants",
          "Growth and nutritional monitoring",
          "Pediatric evaluation before surgery",
        ],
      },
      {
        title: "Speech Therapy & Rehabilitation",
        points: [
          "Speech assessment and therapy",
          "Hearing screening and referral",
          "Long-term developmental follow-up",
        ],
      },
    ],
    commitmentShort:
      "Early correction, rehabilitation and social reintegration—especially for economically weaker backgrounds.",
    image: "/services/cleft-care.jpg",
    ctaLabel: "Cleft Consultation",
    ctaHref: "/contact",
  },

  {
    id: "home-visits",
    label: "Home Visits",
    title: "Home Visits & Mobile Hospital Services",
    icon: Home,
    summary:
      "Home-based medical services and mobile outreach for elderly, disabled, chronically ill, or patients unable to travel.",
    subServices: [
      {
        title: "Home Visit Services",
        points: [
          "Doctor and nurse home visits",
          "Follow-up for elderly and bedridden patients",
          "Post-operative and post-discharge monitoring",
          "Medication review and basic procedures",
        ],
      },
      {
        title: "Home-based Support",
        points: [
          "Palliative and supportive care at home",
          "Continuity and dignity for immobile patients",
        ],
      },
      {
        title: "Mobile Hospital & Outreach",
        points: [
          "Mobile medical units for remote villages",
          "Screening for chronic diseases and disabilities",
          "Mental health and geriatric outreach",
          "Referral and transport coordination",
        ],
      },
      {
        title: "Follow-up & Coordination",
        points: [
          "Follow-up care for previously treated patients",
          "Linking outreach to hospital services",
        ],
      },
    ],
    commitmentShort:
      "Healthcare should reach the patient—continuity, dignity and accessibility for rural and immobile patients.",
    image: "/services/home-visits.jpg",
    ctaLabel: "Request a Home Visit",
    ctaHref: "/contact",
  },

  {
    id: "deformities",
    label: "Deformities",
    title: "Hand & Foot Deformities Correction",
    icon: Hand,
    summary:
      "Evaluation, correction and rehabilitation of hand and foot deformities to restore function, mobility and independence.",
    subServices: [
      {
        title: "Hand Deformity Correction",
        points: [
          "Congenital hand deformity evaluation",
          "Contracture and deformity correction",
          "Post-traumatic hand deformities",
          "Functional rehabilitation and therapy",
        ],
      },
      {
        title: "Foot Deformity Correction",
        points: [
          "Congenital foot deformities",
          "Deformities due to nerve injury or disease",
          "Post-infection and post-traumatic deformities",
          "Surgical correction and rehabilitation",
        ],
      },
      {
        title: "Rehabilitation & Support",
        points: [
          "Physiotherapy and occupational therapy",
          "Splints, orthoses and assistive devices",
          "Long-term functional follow-up",
        ],
      },
    ],
    commitmentShort:
      "Restore function and independence through affordable correction and rehabilitation—especially for rural patients.",
    image: "/services/deformities.jpg",
    ctaLabel: "Ortho Evaluation",
    ctaHref: "/contact",
  },

  {
    id: "cancer-care",
    label: "Cancer Care",
    title: "Cancer Screening & Palliative Care Unit",
    icon: Ribbon,
    summary:
      "Early cancer screening and compassionate palliative care focused on detection, symptom relief and quality of life.",
    subServices: [
      {
        title: "Cancer Screening",
        points: [
          "Screening for common cancers",
          "Early detection and referral",
          "Community-based awareness programs",
          "Follow-up and diagnostic coordination",
        ],
      },
      {
        title: "Palliative Care",
        points: [
          "Pain and symptom management",
          "Support for advanced cancer patients",
          "Psychological and emotional support",
          "Family counselling and caregiver guidance",
        ],
      },
      {
        title: "Home-based Palliative Support",
        points: ["Home-based palliative care support", "Continuity for patients and families"],
      },
    ],
    commitmentShort:
      "Early detection where cure is possible—and comfort where it is not—ensuring dignity and relief from suffering.",
    image: "/services/cancer-care.jpg",
    ctaLabel: "Screening Enquiry",
    ctaHref: "/contact",
  },

  {
    id: "telemedicine",
    label: "Telemedicine",
    title: "Telemedicine & Rural Healthcare Integration",
    icon: Video,
    summary:
      "Telemedicine and digital health to bridge the gap between rural communities and specialist care.",
    subServices: [
      {
        title: "Telemedicine Services",
        points: [
          "Remote consultations with specialists",
          "Follow-up for chronic illnesses",
          "Mental health and counselling services",
          "Second opinions and continuity of care",
        ],
      },
      {
        title: "Rural Integration",
        points: [
          "Link village-level health workers with specialists",
          "Digital follow-up for treated patients",
          "Support for primary health centers and outreach camps",
          "Integration with mobile hospital services",
        ],
      },
    ],
    commitmentShort:
      "Timely expert care to the last mile—reduced travel burden and continuous medical support for rural populations.",
    image: "/services/telemedicine.jpg",
    ctaLabel: "Start Tele-Consult",
    ctaHref: "/contact",
  },
];
