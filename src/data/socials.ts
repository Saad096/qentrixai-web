import { publicEnv } from "@/lib/env";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  type LucideIcon,
} from "lucide-react";

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
  label: string;
};

export function getSocialLinks(): SocialLink[] {
  const s = publicEnv.socials;
  const links: SocialLink[] = [
    { name: "LinkedIn", url: s.linkedin, icon: Linkedin, label: "LinkedIn" },
    { name: "Instagram", url: s.instagram, icon: Instagram, label: "Instagram" },
    { name: "Facebook", url: s.facebook, icon: Facebook, label: "Facebook" },
    { name: "GitHub", url: s.github, icon: Github, label: "GitHub" },
    { name: "WhatsApp", url: s.whatsapp, icon: MessageCircle, label: "WhatsApp" },
    { name: "Email", url: `mailto:${publicEnv.profile.email}`, icon: Mail, label: "Email" },
  ];
  return links.filter((l) => l.url && l.url.trim().length > 0);
}
