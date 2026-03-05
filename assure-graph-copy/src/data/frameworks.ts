export interface Framework {
  id: string;
  name: string;
  shortName: string;
  completedRequirements: number;
  totalRequirements: number;
  completionPercent: number;
  aiMapped: number;
  aiConfidence: number;
  controlsMapped: number;
  sharedRequirements: number;
  trend: { direction: "up" | "down"; value: string; label: string };
  reuseRate: number;
  color: string;
  bgColor: string;
  borderColor: string;
  progressColor: string;
  iconBg: string;
}

export interface MappingSuggestion {
  id: string;
  code: string;
  title: string;
  framework: string;
  frameworkBadge: string;
  suggestedEvidence: string;
  confidence: number;
  autoApply: boolean;
}

export interface FrameworkPairData {
  label: string;
  value: number;
  color: string;
}

export const FRAMEWORKS: Framework[] = [
  {
    id: "iso-27001",
    name: "ISO 27001:2022",
    shortName: "ISO",
    completedRequirements: 956,
    totalRequirements: 1056,
    completionPercent: 75,
    aiMapped: 812,
    aiConfidence: 91,
    controlsMapped: 89,
    sharedRequirements: 245,
    trend: { direction: "up", value: "100%", label: "vs Last month" },
    reuseRate: 78,
    color: "#f05a35",
    bgColor: "bg-brand-0-5",
    borderColor: "border-brand-2",
    progressColor: "bg-brand-5",
    iconBg: "bg-blue-600",
  },
  {
    id: "soc-2",
    name: "SOC 2",
    shortName: "SOC 2",
    completedRequirements: 102,
    totalRequirements: 987,
    completionPercent: 35,
    aiMapped: 78,
    aiConfidence: 87,
    controlsMapped: 67,
    sharedRequirements: 189,
    trend: { direction: "down", value: "12%", label: "vs Last month" },
    reuseRate: 78,
    color: "#22c55e",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    progressColor: "bg-green-500",
    iconBg: "bg-green-600",
  },
  {
    id: "nist",
    name: "NIST",
    shortName: "NIST",
    completedRequirements: 87,
    totalRequirements: 837,
    completionPercent: 15,
    aiMapped: 65,
    aiConfidence: 84,
    controlsMapped: 45,
    sharedRequirements: 156,
    trend: { direction: "up", value: "40%", label: "vs Last month" },
    reuseRate: 78,
    color: "#a855f7",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    progressColor: "bg-purple-500",
    iconBg: "bg-purple-600",
  },
];

export const MAPPING_SUGGESTIONS: MappingSuggestion[] = [
  {
    id: "1",
    code: "A.12.3",
    title: "Backup copies",
    framework: "ISO 27001:2022",
    frameworkBadge: "ISO 27001:2022",
    suggestedEvidence: "AWS Backup logs, Azure Backup reports",
    confidence: 94,
    autoApply: true,
  },
  {
    id: "2",
    code: "CC6.1",
    title: "Logical access security",
    framework: "SOC2",
    frameworkBadge: "SOC2",
    suggestedEvidence: "AWS Backup logs, Azure Backup reports",
    confidence: 94,
    autoApply: true,
  },
  {
    id: "3",
    code: "AC-2",
    title: "Account management",
    framework: "NIST",
    frameworkBadge: "NIST",
    suggestedEvidence: "AWS Backup logs, Azure Backup reports",
    confidence: 94,
    autoApply: true,
  },
];

export const FRAMEWORK_PAIRS: FrameworkPairData[] = [
  { label: "ISO + SOC 2", value: 65, color: "#3b82f6" },
  { label: "ISO + NIST", value: 28, color: "#3b82f6" },
  { label: "SOC 2 + NIST", value: 72, color: "#3b82f6" },
  { label: "ALL 3", value: 22, color: "#1e3a5f" },
];

export const CROSS_FRAMEWORK_STATS = {
  sharedRequirements: 584,
  evidenceReuse: 78,
  hoursSaved: 201,
};

export const EVIDENCE_REUSE = {
  reused: 75,
  newRequired: 25,
};
