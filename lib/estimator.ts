import type {
  EstimateAnswers,
  EstimateLineItem,
  EstimateResult,
  EstimatorBand,
  EstimatorConfig,
  EstimatorMultiplier,
  EstimatorService,
} from "@/lib/types";

function findMultiplier(items: EstimatorMultiplier[], id: string) {
  return items.find((item) => item.id === id) ?? items[0];
}

function findBand(items: EstimatorBand[], id: string) {
  return items.find((item) => item.id === id) ?? items[0];
}

function findService(items: EstimatorService[], id: string) {
  return items.find((item) => item.id === id);
}

function buildLineItem(
  service: EstimatorService,
  companySize: EstimatorMultiplier,
  locationBand: EstimatorMultiplier,
  supportTier: EstimatorMultiplier,
): EstimateLineItem {
  return {
    id: service.id,
    label: service.label,
    low:
      service.baseLow *
      companySize.multiplierLow *
      locationBand.multiplierLow *
      supportTier.multiplierLow,
    high:
      service.baseHigh *
      companySize.multiplierHigh *
      locationBand.multiplierHigh *
      supportTier.multiplierHigh,
    description: service.description,
  };
}

export function calculateEstimate(
  config: EstimatorConfig,
  answers: EstimateAnswers,
): EstimateResult {
  const companySize = findMultiplier(config.companySizes, answers.companySize);
  const locationBand = findMultiplier(config.locationBands, answers.locationBand);
  const supportTier = findMultiplier(config.supportTiers, answers.supportTier);
  const cameraBand = findBand(config.cameraBands, answers.cameraBand);
  const networkScope = findBand(config.networkScopes, answers.networkScope);
  const complianceLevel = findBand(config.complianceLevels, answers.complianceLevel);

  const lineItems = answers.serviceMix
    .map((serviceId) => findService(config.services, serviceId))
    .filter((service): service is EstimatorService => Boolean(service))
    .map((service) => buildLineItem(service, companySize, locationBand, supportTier));

  if (answers.serviceMix.includes("cctv")) {
    lineItems.push({
      id: "camera-scope",
      label: "Camera deployment scope",
      low: cameraBand.low,
      high: cameraBand.high,
      description: cameraBand.note ?? "Coverage, mounting, and retention sizing.",
    });
  }

  if (answers.serviceMix.includes("network")) {
    lineItems.push({
      id: "network-scope",
      label: "Network rollout scope",
      low: networkScope.low,
      high: networkScope.high,
      description:
        networkScope.note ?? "Structured cabling, switching, wireless, and monitoring scope.",
    });
  }

  if (answers.complianceLevel !== "none") {
    lineItems.push({
      id: "compliance-scope",
      label: "Compliance and audit uplift",
      low: complianceLevel.low,
      high: complianceLevel.high,
      description:
        complianceLevel.note ??
        "Assessment, documentation, executive reporting, and corrective planning.",
    });
  }

  const subtotalLow = lineItems.reduce((sum, item) => sum + item.low, 0);
  const subtotalHigh = lineItems.reduce((sum, item) => sum + item.high, 0);

  const low = Math.round(subtotalLow * config.contingencyLow);
  const high = Math.round(subtotalHigh * config.contingencyHigh);

  const complexityScore =
    answers.serviceMix.length +
    (answers.locationBand === "multi-site" ? 1 : 0) +
    (answers.complianceLevel === "regulated" ? 1 : 0) +
    (answers.supportTier === "24-7" ? 1 : 0);

  const timeline =
    complexityScore >= 5
      ? "6-10 weeks estimated delivery window"
      : complexityScore >= 3
        ? "4-8 weeks estimated delivery window"
        : "2-5 weeks estimated delivery window";

  const recommendation =
    answers.serviceMix.length >= 3
      ? "Run the work as a phased program with one technical owner across rollout and support."
      : answers.serviceMix.includes("managed-it")
        ? "Pair the support scope with environment hardening and reporting from day one."
        : "Start with the infrastructure layer, then formalize support and governance immediately after rollout.";

  return {
    low,
    high,
    timeline,
    recommendation,
    lineItems,
  };
}
