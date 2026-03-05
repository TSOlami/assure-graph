export type RiskScore = "Critical" | "High" | "Medium" | "Low";
export type RiskStatus = "Mitigated" | "Accepted" | "Open" | "Transferred";
export type RiskCategory =
  | "Information Security"
  | "Third-Party Risk"
  | "Cybersecurity"
  | "Compliance";

export interface Risk {
  key: string;
  id: string;
  name: string;
  description: string;
  category: RiskCategory;
  score: number;
  scoreLabel: RiskScore;
  status: RiskStatus;
  controlsCount: number;
  likelihood: number;
  impact: number;
  aiTreatment: string;
  aiConfidence: number;
}

export const SCORE_STYLES: Record<
  RiskScore,
  { text: string; bg: string }
> = {
  Critical: { text: "text-red-600", bg: "bg-red-50" },
  High: { text: "text-orange-600", bg: "bg-orange-50" },
  Medium: { text: "text-amber-600", bg: "bg-amber-50" },
  Low: { text: "text-green-600", bg: "bg-green-50" },
};

export const STATUS_STYLES: Record<
  RiskStatus,
  { text: string; dot: string; icon: string }
> = {
  Mitigated: {
    text: "text-green-600",
    dot: "bg-green-500",
    icon: "text-green-500",
  },
  Accepted: {
    text: "text-blue-600",
    dot: "bg-blue-500",
    icon: "text-blue-500",
  },
  Open: { text: "text-red-600", dot: "bg-red-500", icon: "text-red-500" },
  Transferred: {
    text: "text-amber-600",
    dot: "bg-amber-500",
    icon: "text-amber-500",
  },
};

export const RISK_STATS = {
  totalRisks: 89,
  critical: 5,
  high: 12,
  medium: 28,
  low: 44,
  mitigated: 34,
};

export const RISK_DISTRIBUTION = {
  lowRisk: 3,
  mediumRisk: 58,
  highRisk: 25,
  criticalRisk: 3,
  ncClosed: 75,
};

export const RISK_CATEGORIES = [
  { name: "Infosec", value: 75, color: "#22c55e" },
  { name: "Cyber", value: 45, color: "#ef4444" },
  { name: "Compliance", value: 65, color: "#3b82f6" },
  { name: "Others", value: 30, color: "#f59e0b" },
];

export const AI_RECOMMENDATIONS = [
  "Link 5 unmapped risks to controls",
  "Review 3 accepted risks for re-assessment",
  "Schedule quarterly risk review",
];

export const mockRisks: Risk[] = [
  {
    key: "1",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Risk of unauthorized personnel accessing sensitive customer PII due to inadequate access controls.",
    category: "Information Security",
    score: 15,
    scoreLabel: "Critical",
    status: "Mitigated",
    controlsCount: 12,
    likelihood: 3,
    impact: 5,
    aiTreatment: "Mitigate",
    aiConfidence: 92,
  },
  {
    key: "2",
    id: "R-002",
    name: "Unauthorized Access to Customer Data",
    description:
      "Third-party vendors with access to sensitive systems without adequate security controls.",
    category: "Third-Party Risk",
    score: 8,
    scoreLabel: "Medium",
    status: "Accepted",
    controlsCount: 12,
    likelihood: 2,
    impact: 4,
    aiTreatment: "Accept",
    aiConfidence: 85,
  },
  {
    key: "3",
    id: "R-002",
    name: "Unauthorized Access to Customer Data",
    description:
      "Cyber attacks targeting critical infrastructure and customer-facing systems.",
    category: "Cybersecurity",
    score: 10,
    scoreLabel: "High",
    status: "Open",
    controlsCount: 12,
    likelihood: 4,
    impact: 5,
    aiTreatment: "Mitigate",
    aiConfidence: 88,
  },
  {
    key: "4",
    id: "Risk ID",
    name: "Unauthorized Access to Customer Data",
    description:
      "Non-compliance with regulatory requirements leading to legal and financial penalties.",
    category: "Compliance",
    score: 5,
    scoreLabel: "Low",
    status: "Transferred",
    controlsCount: 12,
    likelihood: 1,
    impact: 5,
    aiTreatment: "Transfer",
    aiConfidence: 78,
  },
  {
    key: "5",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Medium severity information security risk requiring ongoing monitoring.",
    category: "Information Security",
    score: 8,
    scoreLabel: "Medium",
    status: "Mitigated",
    controlsCount: 12,
    likelihood: 2,
    impact: 4,
    aiTreatment: "Mitigate",
    aiConfidence: 90,
  },
  {
    key: "6",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Low severity information security risk with acceptable risk level.",
    category: "Information Security",
    score: 4,
    scoreLabel: "Low",
    status: "Accepted",
    controlsCount: 12,
    likelihood: 1,
    impact: 4,
    aiTreatment: "Accept",
    aiConfidence: 94,
  },
  {
    key: "7",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Third-party risk with medium severity requiring vendor assessment.",
    category: "Third-Party Risk",
    score: 8,
    scoreLabel: "Medium",
    status: "Mitigated",
    controlsCount: 12,
    likelihood: 2,
    impact: 4,
    aiTreatment: "Mitigate",
    aiConfidence: 87,
  },
  {
    key: "8",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "High severity cybersecurity risk with active threat indicators.",
    category: "Cybersecurity",
    score: 10,
    scoreLabel: "High",
    status: "Open",
    controlsCount: 12,
    likelihood: 4,
    impact: 5,
    aiTreatment: "Mitigate",
    aiConfidence: 91,
  },
  {
    key: "9",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Medium severity third-party risk transferred to insurance provider.",
    category: "Third-Party Risk",
    score: 8,
    scoreLabel: "Medium",
    status: "Transferred",
    controlsCount: 12,
    likelihood: 2,
    impact: 4,
    aiTreatment: "Transfer",
    aiConfidence: 82,
  },
  {
    key: "10",
    id: "R-001",
    name: "Unauthorized Access to Customer Data",
    description:
      "Information security risk related to data encryption at rest.",
    category: "Information Security",
    score: 6,
    scoreLabel: "Medium",
    status: "Mitigated",
    controlsCount: 12,
    likelihood: 2,
    impact: 3,
    aiTreatment: "Mitigate",
    aiConfidence: 89,
  },
];
