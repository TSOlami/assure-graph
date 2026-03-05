export type IntegrationCategory =
  | "all"
  | "business-suite"
  | "cloud-services"
  | "developer-tools"
  | "task-management"
  | "others";

export type IntegrationStatus = "connected" | "not-connected";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: Exclude<IntegrationCategory, "all">;
  status: IntegrationStatus;
  logoUrl: string;
  lastSync: string | null;
  connectedAt?: string;
  syncFrequency?: string;
  apiKeyLabel?: string;
  oauthSupported?: boolean;
}

export interface IntegrationMetric {
  label: string;
  value: string;
  variant: "default" | "brand" | "green";
  icon?: string;
}

export const INTEGRATION_CATEGORIES: {
  id: IntegrationCategory;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "business-suite", label: "Business suite" },
  { id: "cloud-services", label: "Cloud services" },
  { id: "developer-tools", label: "Developer tools" },
  { id: "task-management", label: "Task management" },
  { id: "others", label: "Others" },
];

export const INTEGRATIONS: Integration[] = [
  {
    id: "google-workspace",
    name: "Google Workspace",
    description:
      "Sync users, groups, and organizational data to power access reviews. Pull security settings for stronger identity governance and compliance.",
    category: "business-suite",
    status: "not-connected",
    logoUrl: "/integrations/google.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    description:
      "Import directory data, identities, and policy settings for governance and compliance from your Microsoft ecosystem.",
    category: "business-suite",
    status: "not-connected",
    logoUrl: "/integrations/microsoft-365.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "zoho-workplace",
    name: "Zoho Workplace",
    description:
      "Connect user accounts and activity logs to strengthen access visibility. Enhance workflows by centralizing identity and activity data.",
    category: "business-suite",
    status: "not-connected",
    logoUrl: "/integrations/zoho-workplace.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "aws",
    name: "AWS",
    description:
      "Automatically map AWS evidence to relevant controls. Pull cloud configuration, security events, and evidence for continuous monitoring.",
    category: "cloud-services",
    status: "not-connected",
    logoUrl: "/integrations/aws.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "azure",
    name: "Azure",
    description:
      "Connect Azure resources, identity management, and cloud posture signals. Ingest configurations, identity data, and compliance signals.",
    category: "cloud-services",
    status: "not-connected",
    logoUrl: "/integrations/azure.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    description:
      "Sync DNS rules, security configurations, and firewall activity for enhanced visibility from your Cloudflare environment.",
    category: "cloud-services",
    status: "not-connected",
    logoUrl: "/integrations/cloudflare.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    description:
      "Pull assets, IAM configurations, and audit logs directly into ControlGraph AI. Get real-time visibility into cloud posture.",
    category: "cloud-services",
    status: "not-connected",
    logoUrl: "/integrations/google-cloud.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "github",
    name: "GitHub",
    description:
      "Ingest repository settings, branch protections, and pipeline events. Automatically generate audit evidence from code activity.",
    category: "developer-tools",
    status: "not-connected",
    logoUrl: "/integrations/github.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "gitlab",
    name: "GitLab",
    description:
      "Connect repositories, CI/CD pipelines, and access controls. Automate compliance workflows by mapping GitLab events directly to controls.",
    category: "developer-tools",
    status: "not-connected",
    logoUrl: "/integrations/gitlab.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    description:
      "Integrate pipelines, permissions, and project settings from your DevOps environment. Enable continuous evidence collection.",
    category: "developer-tools",
    status: "not-connected",
    logoUrl: "/integrations/azure-devops.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "jira",
    name: "Jira",
    description:
      "Integrate tickets, workflows, and project activities into your compliance processes. Automate issue tracking, and link remediation to controls.",
    category: "task-management",
    status: "not-connected",
    logoUrl: "/integrations/jira.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "asana",
    name: "Asana",
    description:
      "Connect tasks, projects, and team workflows to your GRC program. Track remediation progress, assign control owners, and automate operations.",
    category: "task-management",
    status: "not-connected",
    logoUrl: "/integrations/asana.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "trello",
    name: "Trello",
    description:
      "Sync boards and cards to streamline compliance task management. Link activities to risks, controls, and evidence for clearer audit traceability.",
    category: "task-management",
    status: "not-connected",
    logoUrl: "/integrations/trello.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "slack",
    name: "Slack",
    description:
      "Enable real-time alerts, approvals, and compliance messages directly in Slack channels.",
    category: "others",
    status: "not-connected",
    logoUrl: "/integrations/slack.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "notion",
    name: "Notion",
    description:
      "Import policies, documentation, and structured pages into your governance library.",
    category: "others",
    status: "not-connected",
    logoUrl: "/integrations/notion.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description:
      "Connect CRM data and workflows for compliance visibility across your sales and customer operations.",
    category: "business-suite",
    status: "not-connected",
    logoUrl: "/integrations/salesforce.svg",
    lastSync: null,
    apiKeyLabel: "API Key",
  },
];

export const INTEGRATION_METRICS: IntegrationMetric[] = [
  { label: "Connected Sources", value: "5/9", variant: "default" },
  { label: "Evidence Auto-Collected", value: "156", variant: "default" },
  { label: "Controls Covered", value: "75", variant: "default" },
  { label: "AI Mapped Controls", value: "56", variant: "brand" },
  { label: "Avg. Data Quality", value: "94%", variant: "green" },
  { label: "Last Sync Status", value: "Healthy", variant: "green", icon: "check-circle" },
];
