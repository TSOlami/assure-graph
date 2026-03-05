export type ControlResult = "Passing" | "Failing" | "Needs attention";
export type EvidenceStatus = "Fresh" | "Expiring" | "Stale";
export type ControlFrequency = "Quarterly" | "Monthly" | "Weekly" | "Continuous";

export interface ControlOwner {
  name: string;
  avatar?: string;
  initials: string;
}

export interface Control {
  key: string;
  id: string;
  name: string;
  description: string;
  aiInfo?: string;
  domain: string;
  owner?: ControlOwner;
  frequency: ControlFrequency;
  risksCount: number;
  policiesCount: number;
  evidenceStatus: EvidenceStatus;
  result: ControlResult;
  hasException?: boolean;
}

export const mockControls: Control[] = [
  {
    key: "1",
    id: "AC-001",
    name: "Password manager records on employee computers",
    description: "Password manager records on employee computers",
    domain: "Physical",
    owner: {
      name: "John A.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      initials: "JA",
    },
    frequency: "Quarterly",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Fresh",
    result: "Passing",
  },
  {
    key: "2",
    id: "AC-002",
    name: "Screensaver lock required on employee computers",
    description: "Screensaver lock required on employee computers",
    aiInfo: "Evidence expires in 5 days – auto-refresh scheduled",
    domain: "IT Infrastructure",
    owner: {
      name: "Samuel A.",
      initials: "SA",
    },
    frequency: "Monthly",
    risksCount: 1,
    policiesCount: 3,
    evidenceStatus: "Expiring",
    result: "Needs attention",
  },
  {
    key: "3",
    id: "SS-015",
    name: "Malware detection software installed on employee computers",
    description: "Malware detection software installed on employee computers",
    aiInfo: "3 devices missing antivirus software. Device IDs: DEV-123, DEV-124, DEV-125",
    domain: "Access Control",
    owner: {
      name: "Grace O.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
      initials: "GO",
    },
    frequency: "Weekly",
    risksCount: 4,
    policiesCount: 1,
    evidenceStatus: "Stale",
    result: "Failing",
    hasException: true,
  },
  {
    key: "4",
    id: "Control-ID",
    name: "Control Description",
    description: "Control Description",
    aiInfo: "Info about control needing attention.",
    domain: "Domain name",
    frequency: "Continuous",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Fresh",
    result: "Passing",
  },
  {
    key: "5",
    id: "Control-ID",
    name: "Control Description",
    description: "Control Description",
    aiInfo: "Info about control failing.",
    domain: "Domain name",
    owner: {
      name: "Joseph W.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joseph",
      initials: "JW",
    },
    frequency: "Quarterly",
    risksCount: 5,
    policiesCount: 3,
    evidenceStatus: "Fresh",
    result: "Passing",
  },
  {
    key: "6",
    id: "CTL-006",
    name: "Employees have unique email accounts",
    description: "Employees have unique email accounts",
    domain: "Domain name",
    frequency: "Continuous",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Fresh",
    result: "Passing",
  },
  {
    key: "7",
    id: "CTL-007",
    name: "Employee background checks",
    description: "Employee background checks",
    domain: "Domain name",
    frequency: "Quarterly",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Expiring",
    result: "Needs attention",
  },
  {
    key: "8",
    id: "CTL-008",
    name: "Records of risk assessments",
    description: "Records of risk assessments",
    domain: "Domain name",
    owner: {
      name: "Philip I.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=philip",
      initials: "PI",
    },
    frequency: "Continuous",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Stale",
    result: "Failing",
  },
  {
    key: "9",
    id: "CTL-009",
    name: "Records of vulnerability scans",
    description: "Records of vulnerability scans",
    domain: "Domain name",
    owner: {
      name: "Mary R.",
      initials: "MR",
    },
    frequency: "Monthly",
    risksCount: 3,
    policiesCount: 2,
    evidenceStatus: "Expiring",
    result: "Needs attention",
  },
];

export const RESULT_STYLES: Record<ControlResult, { text: string; dot: string; icon: string }> = {
  Passing: { text: "text-green-600", dot: "bg-green-500", icon: "text-green-500" },
  Failing: { text: "text-red-600", dot: "bg-red-500", icon: "text-red-500" },
  "Needs attention": { text: "text-amber-600", dot: "bg-amber-500", icon: "text-amber-500" },
};

export const EVIDENCE_STYLES: Record<EvidenceStatus, { text: string; dot: string }> = {
  Fresh: { text: "text-green-600", dot: "bg-green-500" },
  Expiring: { text: "text-amber-600", dot: "bg-amber-500" },
  Stale: { text: "text-red-600", dot: "bg-red-500" },
};

export const CONTROL_STATS = {
  applicable: { current: 64, total: 89 },
  unassigned: 5,
  passing: 43,
  needsAttention: 3,
  failing: 5,
  aiSuggested: 12,
};

export const BUSINESS_TYPES = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail",
  "Education",
  "Government",
];

export const SUBSCRIBED_FRAMEWORKS = ["ISO 27001", "SOC 2", "NIST", "GDPR", "HIPPA"];
export const INDUSTRY_REGULATIONS = ["SOX", "CCPA", "FERPA", "FISMA"];
