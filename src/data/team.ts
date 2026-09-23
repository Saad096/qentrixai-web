import { publicEnv } from "@/lib/env";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  background: string;
  bio: string;
  image: string;
  linkedin?: string;
  skills: string[];
};

export const team: TeamMember[] = [
  {
    slug: "saad-alam",
    name: "Saad Alam",
    role: "CEO & AI Lead",
    background: "AI & Data Science",
    bio: "AI & Data Science Consultant specialising in GenAI, Agentic AI, RAG systems, Voice AI, MLOps and production AI platforms. 5+ years across enterprise AI delivery, multi-agent frameworks, voice automation, document intelligence and meeting AI.",
    image: "/team/saad-alam.jpeg",
    linkedin: publicEnv.team.saadLinkedIn || publicEnv.socials.linkedin,
    skills: [
      "GenAI",
      "Agentic AI",
      "LangGraph",
      "RAG",
      "Voice AI",
      "MLOps",
      "Python / FastAPI",
      "AWS · GCP · Azure",
    ],
  },
  {
    slug: "shahid-nawaz",
    name: "Shahid Nawaz",
    role: "CTO",
    background: "Blockchain & Platform Engineering",
    bio: "Technology leader focused on blockchain architecture, secure platforms and scalable engineering systems. Owns platform direction, security posture and engineering quality bar at QentrixAI.",
    image: "/team/shahid-nawaz.jpeg",
    linkedin: publicEnv.team.shahidLinkedIn,
    skills: [
      "Solidity / EVM",
      "Distributed Systems",
      "Security Architecture",
      "Node.js · Go",
      "Cryptography",
      "Platform Engineering",
    ],
  },
  {
    slug: "shafaat-ullah",
    name: "Shafaat Ullah",
    role: "Cloud & DevOps Lead",
    background: "Cloud Infrastructure & SRE",
    bio: "Cloud and DevOps specialist focused on scalable infrastructure, deployment automation, CI/CD, Docker and production reliability. Owns delivery infrastructure across client engagements.",
    image: "/team/shafaat-ullah.jpeg",
    linkedin: publicEnv.team.shafaatLinkedIn,
    skills: [
      "Docker · Kubernetes",
      "AWS · GCP · Azure",
      "CI/CD",
      "Nginx",
      "Terraform",
      "Observability",
    ],
  },
  {
    slug: "mawra-muneer",
    name: "Mawra Muneer",
    role: "Business Analyst Consultant",
    background: "Business Analysis & Delivery",
    bio: "Business analyst consultant focused on requirement discovery, product documentation, client communication and solution alignment. Translates messy business reality into clear specs and outcomes engineering can ship against.",
    image: "/team/mawra-muneer.webp",
    linkedin: publicEnv.team.mawraLinkedIn,
    skills: [
      "Discovery & Requirements",
      "Product Documentation",
      "Stakeholder Management",
      "Process Mapping",
      "UAT & Delivery",
    ],
  },
];
