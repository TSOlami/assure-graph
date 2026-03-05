export type VulnCriticality = "Low" | "Medium" | "High" | "Critical";
export type VulnStatus = "Open" | "In-progress" | "Resolved";

export interface Vulnerability {
  key: string;
  name: string;
  criticality: VulnCriticality;
  aiRiskScore: string;
  affectedAssets: string[];
  cveId: string | null;
  status: VulnStatus;
  estFixTime: string | null;
}

export const VULN_CRITICALITY_STYLES: Record<VulnCriticality, { text: string }> = {
  Low: { text: "text-green-600" },
  Medium: { text: "text-amber-600" },
  High: { text: "text-orange-600" },
  Critical: { text: "text-red-600" },
};

export const VULN_STATUS_STYLES: Record<VulnStatus, { text: string; bg: string; border: string; icon: "check" | "progress" | "open" }> = {
  Resolved: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200", icon: "check" },
  "In-progress": { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: "progress" },
  Open: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: "open" },
};

export const mockVulnerabilities: Vulnerability[] = [
  {
    key: "1",
    name: "SQL Injection in Customer Portal",
    criticality: "Low",
    aiRiskScore: "12%",
    affectedAssets: ["Webserver", "Database"],
    cveId: null,
    status: "Resolved",
    estFixTime: null,
  },
  {
    key: "2",
    name: "Outdated OpenSSL Version",
    criticality: "Medium",
    aiRiskScore: "28%",
    affectedAssets: ["API Gateway"],
    cveId: null,
    status: "In-progress",
    estFixTime: "2 days",
  },
  {
    key: "3",
    name: "Weak TLS Configuration",
    criticality: "Critical",
    aiRiskScore: "65%",
    affectedAssets: ["Webserver", "Database"],
    cveId: "CVE-2025-1234",
    status: "Open",
    estFixTime: "1 Week",
  },
  {
    key: "4",
    name: "Vulnerability",
    criticality: "High",
    aiRiskScore: "15%",
    affectedAssets: ["Webserver", "Database"],
    cveId: null,
    status: "Open",
    estFixTime: "1 week",
  },
  {
    key: "5",
    name: "Vulnerability",
    criticality: "Medium",
    aiRiskScore: "10%",
    affectedAssets: ["Load Balancer"],
    cveId: null,
    status: "In-progress",
    estFixTime: "3 days",
  },
];

export const VULN_STATS = {
  total: 45,
  critical: 3,
  high: 12,
  medium: 18,
  low: 7,
  resolved: 14,
};
