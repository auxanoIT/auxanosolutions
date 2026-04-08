import {
  Building,
  Building2,
  Church,
  Factory,
  GraduationCap,
  Hospital,
  Hotel,
  Landmark,
  Network,
  Store,
  Wallet,
  Warehouse,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

import type { IndustryIconName } from "@/lib/types";

const iconMap = {
  corporate: Building2,
  healthcare: Hospital,
  education: GraduationCap,
  government: Landmark,
  finance: Wallet,
  warehouse: Warehouse,
  manufacturing: Factory,
  retail: Store,
  hospitality: Hotel,
  property: Building,
  religious: Church,
  multisite: Network,
} satisfies Record<IndustryIconName, ComponentType<LucideProps>>;

type IndustryIconProps = LucideProps & {
  name: IndustryIconName;
};

export function IndustryIcon({ name, ...props }: IndustryIconProps) {
  const Icon = iconMap[name];

  return <Icon {...props} />;
}
