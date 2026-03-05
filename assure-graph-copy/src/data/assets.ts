export type AssetCriticality = "Low" | "Medium" | "High" | "Critical";
export type AssetStatus = "Compliant" | "At-Risk" | "Not Compliant";

export interface AssetOwner {
  name: string;
  avatar?: string;
  initials: string;
}

export interface Asset {
  key: string;
  name: string;
  type: string;
  owner?: AssetOwner;
  criticality: AssetCriticality;
  aiRiskScore: string;
  controls: number;
  status: AssetStatus;
}

export const ASSET_CRITICALITY_STYLES: Record<AssetCriticality, { text: string }> = {
  Low: { text: "text-green-600" },
  Medium: { text: "text-amber-600" },
  High: { text: "text-orange-600" },
  Critical: { text: "text-red-600" },
};

export const ASSET_STATUS_STYLES: Record<AssetStatus, { text: string; bg: string; border: string; dot: string; icon: string }> = {
  Compliant: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500", icon: "text-green-500" },
  "At-Risk": { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", icon: "text-amber-500" },
  "Not Compliant": { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", icon: "text-red-500" },
};

export const mockAssets: Asset[] = [
  {
    key: "1",
    name: "Production Database Server",
    type: "Server",
    owner: {
      name: "John A.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      initials: "JA",
    },
    criticality: "Low",
    aiRiskScore: "12%",
    controls: 12,
    status: "Compliant",
  },
  {
    key: "2",
    name: "Customer Data Warehouse",
    type: "Database",
    owner: {
      name: "Samuel A.",
      initials: "SA",
    },
    criticality: "Medium",
    aiRiskScore: "28%",
    controls: 12,
    status: "At-Risk",
  },
  {
    key: "3",
    name: "Asset Name",
    type: "Workstation",
    owner: {
      name: "Grace O.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
      initials: "GO",
    },
    criticality: "Critical",
    aiRiskScore: "65%",
    controls: 12,
    status: "Not Compliant",
  },
  {
    key: "4",
    name: "Asset Name",
    type: "Type",
    criticality: "High",
    aiRiskScore: "15%",
    controls: 12,
    status: "Compliant",
  },
  {
    key: "5",
    name: "Asset Name",
    type: "Type",
    owner: {
      name: "Joseph W.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joseph",
      initials: "JW",
    },
    criticality: "Medium",
    aiRiskScore: "10%",
    controls: 12,
    status: "At-Risk",
  },
];

export const ASSET_STATS = {
  totalAssets: 234,
  compliant: 198,
  atRisk: 52,
  notCompliant: 12,
  criticalAssets: 45,
};
