export type VendorCriticality = "Low" | "Medium" | "High" | "Critical";

export type DataAccessType = "PII" | "Customer" | "PCI";

export interface Vendor {
  key: string;
  name: string;
  vendorId: string;
  category: string;
  criticality: VendorCriticality;
  riskScore: number;
  maxRiskScore: number;
  dataAccess: DataAccessType[];
  assessmentDue: string;
  piiAccess: boolean;
  customerData: boolean;
  soxRelevant: number;
  creditCardData: boolean;
  aiRecommendedActions: string[];
}

export const CRITICALITY_STYLES: Record<VendorCriticality, { text: string; bg: string; border: string }> = {
  Low: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  Medium: { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  High: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  Critical: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export const DATA_ACCESS_STYLES: Record<DataAccessType, { text: string; bg: string }> = {
  PII: { text: "text-purple-700", bg: "bg-purple-100" },
  Customer: { text: "text-blue-700", bg: "bg-blue-100" },
  PCI: { text: "text-amber-700", bg: "bg-amber-100" },
};

export const mockVendors: Vendor[] = [
  {
    key: "1",
    name: "Salesforce",
    vendorId: "VND-001",
    category: "CRM",
    criticality: "Low",
    riskScore: 15,
    maxRiskScore: 100,
    dataAccess: ["PII", "Customer"],
    assessmentDue: "25-01-2025",
    piiAccess: true,
    customerData: true,
    soxRelevant: 18,
    creditCardData: false,
    aiRecommendedActions: [
      "Schedule annual assessment",
      "Review data processing agreement",
    ],
  },
  {
    key: "2",
    name: "Stripes",
    vendorId: "VND-002",
    category: "Payment Processor",
    criticality: "Medium",
    riskScore: 35,
    maxRiskScore: 100,
    dataAccess: ["PII", "Customer", "PCI"],
    assessmentDue: "05-04-2025",
    piiAccess: true,
    customerData: true,
    soxRelevant: 24,
    creditCardData: true,
    aiRecommendedActions: [
      "Review PCI compliance certification",
      "Update vendor risk assessment",
    ],
  },
  {
    key: "3",
    name: "Zendesk",
    vendorId: "VND-003",
    category: "Support",
    criticality: "Critical",
    riskScore: 92,
    maxRiskScore: 100,
    dataAccess: ["PII", "Customer"],
    assessmentDue: "01-06-2025",
    piiAccess: true,
    customerData: true,
    soxRelevant: 12,
    creditCardData: false,
    aiRecommendedActions: [
      "Immediate security review required",
      "Escalate to vendor management team",
    ],
  },
  {
    key: "4",
    name: "Vendor Name",
    vendorId: "Vendor ID",
    category: "Category Name",
    criticality: "High",
    riskScore: 75,
    maxRiskScore: 100,
    dataAccess: ["PII", "Customer", "PCI"],
    assessmentDue: "18-06-2025",
    piiAccess: true,
    customerData: true,
    soxRelevant: 15,
    creditCardData: true,
    aiRecommendedActions: [
      "Schedule quarterly review",
      "Update data handling procedures",
    ],
  },
  {
    key: "5",
    name: "Vendor Name",
    vendorId: "Vendor ID",
    category: "Category Name",
    criticality: "Medium",
    riskScore: 38,
    maxRiskScore: 100,
    dataAccess: ["PII", "Customer"],
    assessmentDue: "28-06-2025",
    piiAccess: true,
    customerData: true,
    soxRelevant: 8,
    creditCardData: false,
    aiRecommendedActions: [
      "Monitor compliance status",
      "Review access permissions",
    ],
  },
];

export const VENDOR_STATS = {
  totalVendors: 45,
  critical: 8,
  high: 12,
  medium: 18,
  low: 7,
  assessmentDue: 6,
};
