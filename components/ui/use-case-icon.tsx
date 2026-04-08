import {
  BriefcaseBusiness,
  Cable,
  CarFront,
  ClipboardCheck,
  CloudCog,
  Cctv,
  DoorOpen,
  Headset,
  MonitorCheck,
  Network,
  PhoneCall,
  Server,
  ShieldCheck,
  UserRoundCog,
  Waypoints,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

import type { UseCaseIconName } from "@/lib/types";

const iconMap = {
  "entryway-security": DoorOpen,
  "cctv-monitoring": Cctv,
  "parking-lot-surveillance": CarFront,
  "perimeter-gate-automation": ShieldCheck,
  "office-network-rollout": Network,
  "structured-cabling": Cable,
  "multi-site-connectivity": Waypoints,
  "server-room-readiness": Server,
  "ip-pbx-communications": PhoneCall,
  "managed-it-support": Headset,
  "it-staff-outsourcing": UserRoundCog,
  "endpoint-deployment": MonitorCheck,
  "break-fix-recovery": Wrench,
  "it-audit-compliance": ClipboardCheck,
  "firewall-hardening": ShieldCheck,
  "cloud-transition": CloudCog,
  "technology-project-delivery": BriefcaseBusiness,
} satisfies Record<UseCaseIconName, ComponentType<LucideProps>>;

type UseCaseIconProps = LucideProps & {
  name: UseCaseIconName;
};

export function UseCaseIcon({ name, ...props }: UseCaseIconProps) {
  const Icon = iconMap[name];

  return <Icon {...props} />;
}
