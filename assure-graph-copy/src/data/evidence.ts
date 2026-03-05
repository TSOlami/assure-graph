export type EvidenceFreshness = "Fresh" | "Expiring" | "Stale";
export type EvidenceClassification = "Internal" | "Public" | "Restricted" | "Confidential";
export type EvidenceCollectionType = "Manual" | "Auto";
export type EvidenceApprovalStatus = "Approved" | "Pending";
export type ReviewCycle = "Annually" | "Semi-Annually" | "Quarterly" | "Monthly";

export interface EvidenceOwner {
  name: string;
  avatar?: string;
  initials: string;
}

export interface EvidenceItem {
  id: string;
  documentName: string;
  fileType: "pdf" | "docx" | "txt";
  collectionType: EvidenceCollectionType;
  classification: EvidenceClassification;
  owner?: EvidenceOwner;
  freshness: EvidenceFreshness;
  aiQuality: number;
  reuse: number;
  status: EvidenceApprovalStatus;
  lastVerified?: string;
  relatedControls?: string[];
  satisfiesRequirements?: string[];
  applicableFrameworks?: string[];
}

export const FRESHNESS_STYLES: Record<EvidenceFreshness, { text: string; dot: string; bg: string; border: string; icon: string }> = {
  Fresh: { text: "text-green-600", dot: "bg-green-500", bg: "bg-green-50", border: "border-green-200", icon: "text-green-500" },
  Expiring: { text: "text-amber-600", dot: "bg-amber-500", bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500" },
  Stale: { text: "text-red-600", dot: "bg-red-500", bg: "bg-red-50", border: "border-red-200", icon: "text-red-500" },
};

export const CLASSIFICATION_STYLES: Record<EvidenceClassification, { text: string; bg: string; border: string }> = {
  Internal: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  Public: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  Restricted: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  Confidential: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
};

export const STATUS_STYLES: Record<EvidenceApprovalStatus, { text: string; dot: string }> = {
  Approved: { text: "text-green-600", dot: "bg-green-500" },
  Pending: { text: "text-red-500", dot: "bg-red-500" },
};

export const EVIDENCE_STATS = {
  total: 156,
  fresh: 125,
  expiring: 12,
  stale: 8,
  aiMapped: 142,
  autoCollected: 89,
};

export const mockEvidence: EvidenceItem[] = [
  {
    id: "EV-001",
    documentName: "Statement of Applicability",
    fileType: "pdf",
    collectionType: "Manual",
    classification: "Internal",
    owner: { name: "Samuel A.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samuel", initials: "SA" },
    freshness: "Fresh",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "2 days ago",
    relatedControls: ["DCF-49", "DCF-48", "DCF-69"],
    satisfiesRequirements: ["ISO 27001:2022", "SOC 2"],
    applicableFrameworks: ["SOC 2", "ISO 27001", "NIST", "GDPR", "HIPAA"],
  },
  {
    id: "EV-002",
    documentName: "ISMS Scope Document",
    fileType: "docx",
    collectionType: "Manual",
    classification: "Public",
    owner: { name: "Grace O.", initials: "GO" },
    freshness: "Expiring",
    aiQuality: 91,
    reuse: 4,
    status: "Pending",
    lastVerified: "25 days ago",
    relatedControls: ["DCF-12", "DCF-15"],
    satisfiesRequirements: ["ISO 27001:2022"],
    applicableFrameworks: ["ISO 27001", "NIST"],
  },
  {
    id: "EV-003",
    documentName: "Information Security Policy",
    fileType: "pdf",
    collectionType: "Auto",
    classification: "Restricted",
    freshness: "Stale",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "60 days ago",
    relatedControls: ["DCF-31", "DCF-32", "DCF-45"],
    satisfiesRequirements: ["SOC 2", "NIST"],
    applicableFrameworks: ["SOC 2", "NIST", "GDPR"],
  },
  {
    id: "EV-004",
    documentName: "Management Review Meeting",
    fileType: "pdf",
    collectionType: "Auto",
    classification: "Confidential",
    owner: { name: "Joseph W.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joseph", initials: "JW" },
    freshness: "Fresh",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "1 day ago",
    relatedControls: ["DCF-55", "DCF-56"],
    satisfiesRequirements: ["ISO 27001:2022"],
    applicableFrameworks: ["ISO 27001"],
  },
  {
    id: "EV-005",
    documentName: "ISMS Scope Document",
    fileType: "pdf",
    collectionType: "Manual",
    classification: "Public",
    freshness: "Fresh",
    aiQuality: 91,
    reuse: 4,
    status: "Pending",
    lastVerified: "3 days ago",
    relatedControls: ["DCF-12"],
    satisfiesRequirements: ["ISO 27001:2022"],
    applicableFrameworks: ["ISO 27001", "NIST"],
  },
  {
    id: "EV-006",
    documentName: "Information Security Policy",
    fileType: "pdf",
    collectionType: "Auto",
    classification: "Confidential",
    owner: { name: "John A.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", initials: "JA" },
    freshness: "Fresh",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "5 days ago",
    relatedControls: ["DCF-31", "DCF-32"],
    satisfiesRequirements: ["SOC 2"],
    applicableFrameworks: ["SOC 2", "GDPR"],
  },
  {
    id: "EV-007",
    documentName: "ISMS Scope Document",
    fileType: "pdf",
    collectionType: "Manual",
    classification: "Internal",
    owner: { name: "Mary R.", initials: "MR" },
    freshness: "Expiring",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "20 days ago",
    relatedControls: ["DCF-12", "DCF-15"],
    satisfiesRequirements: ["ISO 27001:2022"],
    applicableFrameworks: ["ISO 27001"],
  },
  {
    id: "EV-008",
    documentName: "ISMS Scope Document",
    fileType: "pdf",
    collectionType: "Manual",
    classification: "Restricted",
    owner: { name: "Sarah O.", initials: "SO" },
    freshness: "Stale",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "45 days ago",
    relatedControls: ["DCF-12"],
    satisfiesRequirements: ["ISO 27001:2022"],
    applicableFrameworks: ["ISO 27001"],
  },
  {
    id: "EV-009",
    documentName: "Information Security Policy",
    fileType: "pdf",
    collectionType: "Auto",
    classification: "Confidential",
    owner: { name: "Philip I.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=philip", initials: "PI" },
    freshness: "Expiring",
    aiQuality: 91,
    reuse: 4,
    status: "Pending",
    lastVerified: "30 days ago",
    relatedControls: ["DCF-31"],
    satisfiesRequirements: ["SOC 2"],
    applicableFrameworks: ["SOC 2"],
  },
  {
    id: "EV-010",
    documentName: "Information Security Policy",
    fileType: "pdf",
    collectionType: "Auto",
    classification: "Restricted",
    owner: { name: "Mary R.", initials: "MR" },
    freshness: "Stale",
    aiQuality: 91,
    reuse: 4,
    status: "Approved",
    lastVerified: "50 days ago",
    relatedControls: ["DCF-31", "DCF-32"],
    satisfiesRequirements: ["SOC 2", "NIST"],
    applicableFrameworks: ["SOC 2", "NIST"],
  },
];

export const FRESHNESS_ITEMS = [
  { name: "ISMS Scope Document", lastVerified: "25 days ago", status: "Expiring" as const },
  { name: "Device Compliance Policy", lastVerified: "45 days ago", status: "Expiring" as const },
  { name: "Correction Action", lastVerified: "60 days ago", status: "Stale" as const },
];

export const MAPPING_SUGGESTIONS = [
  { name: "Statement of Applicability", framework: "NIST", confidence: 94 },
  { name: "Information Security Policy", framework: "SOC 2", confidence: 96 },
  { name: "Risk Assessment Report", framework: "PCI DSS", confidence: 93 },
];
