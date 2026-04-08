import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  serviceInterest: z.string().min(2),
  message: z.string().min(10),
  context: z.enum(["contact", "consultation"]),
  turnstileToken: z.string().optional(),
});

export const estimateSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  companySize: z.string().min(1),
  locationBand: z.string().min(1),
  supportTier: z.string().min(1),
  cameraBand: z.string().min(1),
  networkScope: z.string().min(1),
  complianceLevel: z.string().min(1),
  serviceMix: z.array(z.string()).min(1),
  notes: z.string().optional(),
  turnstileToken: z.string().optional(),
});
