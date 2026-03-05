export type AuditStatus = "In-progress" | "Planning" | "Completed";

export interface Audit {
  id: string;
  code: string;
  name: string;
  framework: string;
  frameworkIcon: "soc2" | "iso27001" | "gdpr";
  status: AuditStatus;
  progress: number;
  controls: { completed: number; total: number };
  findings: number;
  aiMapped: number;
  startDate: string;
  endDate: string;
  auditor: string;
  auditorCount: number;
}

export const AUDITS: Audit[] = [
  {
    id: "1",
    code: "AUD-2025-001",
    name: "SOC 2 Type II - H1 2025",
    framework: "SOC 2",
    frameworkIcon: "soc2",
    status: "In-progress",
    progress: 67,
    controls: { completed: 60, total: 89 },
    findings: 8,
    aiMapped: 156,
    startDate: "Feb 1, 2025",
    endDate: "Feb 28, 2025",
    auditor: "Pee Sarhmy",
    auditorCount: 2,
  },
  {
    id: "2",
    code: "AUD-2025-002",
    name: "ISO 27001 Surveillance Audit",
    framework: "ISO 27001",
    frameworkIcon: "iso27001",
    status: "Planning",
    progress: 25,
    controls: { completed: 0, total: 89 },
    findings: 0,
    aiMapped: 203,
    startDate: "Feb 1, 2025",
    endDate: "Feb 28, 2025",
    auditor: "Pee Sarhmy",
    auditorCount: 2,
  },
  {
    id: "3",
    code: "AUD-2025-001",
    name: "CDPR Compliance Review",
    framework: "GDPR",
    frameworkIcon: "gdpr",
    status: "In-progress",
    progress: 45,
    controls: { completed: 20, total: 45 },
    findings: 3,
    aiMapped: 78,
    startDate: "Feb 1, 2025",
    endDate: "Feb 28, 2025",
    auditor: "Pee Sarhmy",
    auditorCount: 2,
  },
  {
    id: "4",
    code: "AUD-2025-002",
    name: "SOC 2 Type II - H2 2024",
    framework: "SOC 2",
    frameworkIcon: "soc2",
    status: "Completed",
    progress: 100,
    controls: { completed: 89, total: 89 },
    findings: 12,
    aiMapped: 142,
    startDate: "Feb 1, 2025",
    endDate: "Feb 28, 2025",
    auditor: "Pee Sarhmy",
    auditorCount: 2,
  },
];

export type FindingSeverity = "Critical" | "High" | "Medium" | "Low";
export type FindingStatus = "Open" | "In-progress" | "Resolved";

export interface Finding {
  id: string;
  code: string;
  title: string;
  control: string;
  severity: FindingSeverity;
  status: FindingStatus;
  dueDate: string;
  owner?: string;
  ownerAvatar?: string;
  aiSuggested?: boolean;
  aiGenerated?: boolean;
}

export const FINDINGS: Finding[] = [
  {
    id: "1",
    code: "FND-002",
    title: "Outdated Security Policy Document",
    control: "AC-003",
    severity: "Low",
    status: "Resolved",
    dueDate: "25-01-2025",
    owner: "John A.",
    ownerAvatar: "john",
  },
  {
    id: "2",
    code: "FND-001",
    title: "Missing MFA on 3 Admin Accounts",
    control: "PL-003",
    severity: "Medium",
    status: "In-progress",
    dueDate: "05-04-2025",
    owner: "Samuel A.",
    aiSuggested: true,
  },
  {
    id: "3",
    code: "FND-001",
    title: "Missing MFA on 3 Admin Accounts",
    control: "IF-003",
    severity: "Critical",
    status: "Open",
    dueDate: "01-06-2025",
    owner: "Grace O.",
    ownerAvatar: "grace",
    aiSuggested: true,
  },
  {
    id: "4",
    code: "FND-003",
    title: "Finding Description",
    control: "AC-003",
    severity: "High",
    status: "Open",
    dueDate: "18-06-2025",
    aiGenerated: true,
  },
  {
    id: "5",
    code: "FND-004",
    title: "Finding Description",
    control: "AC-003",
    severity: "Medium",
    status: "In-progress",
    dueDate: "28-06-2025",
    owner: "Joseph W.",
    ownerAvatar: "joseph",
  },
];

export type DocumentCategory = "All Document" | "Policies" | "Access Control" | "Security" | "Infrastructure" | "Compliance";
export type DocumentSource = "Okta" | "Manual Upload" | "Qualys" | "Azure" | "Outlook";

export interface Document {
  id: string;
  name: string;
  code?: string;
  category: DocumentCategory;
  source: DocumentSource;
  sourceIcon: string;
  size: string;
  uploaded: string;
  type: "pdf" | "txt" | "doc";
  aiTagged?: boolean;
}

export const DOCUMENT_CATEGORIES: { label: DocumentCategory; count: number }[] = [
  { label: "All Document", count: 425 },
  { label: "Policies", count: 15 },
  { label: "Access Control", count: 45 },
  { label: "Security", count: 10 },
  { label: "Infrastructure", count: 21 },
  { label: "Compliance", count: 149 },
];

export const DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Statement of Applicability",
    category: "Access Control",
    source: "Okta",
    sourceIcon: "okta",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "txt",
    aiTagged: true,
  },
  {
    id: "2",
    name: "ISMS Scope Document",
    category: "Policies",
    source: "Manual Upload",
    sourceIcon: "upload",
    size: "854 KB",
    uploaded: "Mar 31, 2025",
    type: "txt",
    aiTagged: true,
  },
  {
    id: "3",
    name: "Information Security Policy",
    code: "DOC-001",
    category: "Security",
    source: "Manual Upload",
    sourceIcon: "upload",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "pdf",
  },
  {
    id: "4",
    name: "Management Review Meeting",
    code: "DOC-002",
    category: "Infrastructure",
    source: "Qualys",
    sourceIcon: "qualys",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "pdf",
  },
  {
    id: "5",
    name: "ISMS Scope Document",
    category: "Compliance",
    source: "Manual Upload",
    sourceIcon: "upload",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "txt",
    aiTagged: true,
  },
  {
    id: "6",
    name: "Information Security Policy",
    code: "DOC-001",
    category: "Access Control",
    source: "Azure",
    sourceIcon: "azure",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "pdf",
  },
  {
    id: "7",
    name: "ISMS Scope Document",
    category: "Security",
    source: "Outlook",
    sourceIcon: "outlook",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "txt",
    aiTagged: true,
  },
  {
    id: "8",
    name: "ISMS Scope Document",
    category: "Access Control",
    source: "Manual Upload",
    sourceIcon: "upload",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "txt",
    aiTagged: true,
  },
  {
    id: "9",
    name: "Information Security Policy",
    code: "DOC-001",
    category: "Security",
    source: "Manual Upload",
    sourceIcon: "upload",
    size: "2.4 MB",
    uploaded: "Mar 31, 2025",
    type: "pdf",
  },
];

export type IssueType = "Finding" | "Observation" | "Non-Compliance";
export type IssueStatus = "Open" | "In-progress" | "Resolved";

export interface Issue {
  id: string;
  title: string;
  description?: string;
  type: IssueType;
  severity: FindingSeverity;
  owner: string;
  ownerAvatar?: string;
  dueDate: string;
  relatedControl: string;
  status: IssueStatus;
  aiSuggested?: boolean;
  aiGenerated?: boolean;
}

export const ISSUES: Issue[] = [
  {
    id: "1",
    title: "Missing MFA on privileged accounts",
    description: "Implement Okta MFA for all admin accounts within 5 days",
    type: "Finding",
    severity: "Low",
    owner: "John A.",
    ownerAvatar: "john",
    dueDate: "25-01-2025",
    relatedControl: "DCF-00",
    status: "Resolved",
    aiSuggested: true,
  },
  {
    id: "2",
    title: "Incomplete access review documentation",
    type: "Observation",
    severity: "Medium",
    owner: "Samuel A.",
    dueDate: "05-04-2025",
    relatedControl: "DCF-00",
    status: "In-progress",
    aiGenerated: true,
  },
  {
    id: "3",
    title: "Missing MFA on 3 Admin Accounts",
    description: "Implement Okta MFA for all admin accounts within 5 days",
    type: "Non-Compliance",
    severity: "Critical",
    owner: "Grace O.",
    ownerAvatar: "grace",
    dueDate: "01-06-2025",
    relatedControl: "DCF-00",
    status: "Open",
    aiSuggested: true,
  },
  {
    id: "4",
    title: "Issue description",
    type: "Observation",
    severity: "High",
    owner: "",
    dueDate: "18-06-2025",
    relatedControl: "DCF-00",
    status: "Open",
    aiGenerated: true,
  },
  {
    id: "5",
    title: "Issue description",
    type: "Finding",
    severity: "Medium",
    owner: "Joseph W.",
    ownerAvatar: "joseph",
    dueDate: "28-06-2025",
    relatedControl: "DCF-00",
    status: "In-progress",
    aiGenerated: true,
  },
];

export interface Report {
  id: string;
  title: string;
  frequency: string;
  lastRun: string;
  badge: "AI Generated" | "Manual";
}

export const REPORTS: Report[] = [
  {
    id: "1",
    title: "Executive Compliance Summary Report",
    frequency: "Daily",
    lastRun: "3 hours ago",
    badge: "AI Generated",
  },
  {
    id: "2",
    title: "Control Test Result",
    frequency: "Monthly",
    lastRun: "3 hours ago",
    badge: "Manual",
  },
  {
    id: "3",
    title: "Evidence Freshness Report",
    frequency: "Monthly",
    lastRun: "3 hours ago",
    badge: "AI Generated",
  },
];
