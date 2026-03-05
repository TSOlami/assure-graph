export type TestResult = "Pass" | "Failed" | "Pending";
export type TestActivity = "Enabled" | "Disabled";
export type AlertSeverity = "critical" | "warning" | "info" | "success";

export interface MonitoringTest {
  id: string;
  name: string;
  subtext?: string;
  testId: string;
  activity: TestActivity;
  result: TestResult;
  aiRisk: number;
  linkedFrameworks: string[];
  lastTested: string;
  controlId: string;
  evidenceId: string;
  aiPrediction: {
    confidence: number;
    severity: "critical" | "warning" | "stable";
    message: string;
    showMore?: boolean;
  };
}

export interface AIAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  affectedControls: string[];
  confidence: number;
  hasAutoFix: boolean;
}

export interface FailedTestBreakdown {
  label: string;
  count: number;
  color: string;
}

export const MONITORING_STATS = {
  compliant: "76%",
  testPassed: 56,
  testPending: 56,
  aiPredictedIssues: 3,
};

export const CHART_DATA = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 60 },
  { month: "May", value: 55 },
  { month: "Jun", value: 65 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 78 },
  { month: "Oct", value: 85 },
  { month: "Nov", value: 75 },
  { month: "Dec", value: 76 },
];

export const MOCK_TESTS: MonitoringTest[] = [
  {
    id: "1",
    name: "Password manager records on employee computers",
    testId: "DCF-49",
    activity: "Enabled",
    result: "Pass",
    aiRisk: 12,
    linkedFrameworks: ["SOC 2", "NIST", "ISO 27001"],
    lastTested: "03.02.2025 06:55",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 95,
      severity: "stable",
      message: "Stable - no issues excepted.",
    },
  },
  {
    id: "2",
    name: "Screensaver lock required on employee computers",
    subtext: "Waiting for evidence upload from IT team",
    testId: "DCF-49",
    activity: "Disabled",
    result: "Pending",
    aiRisk: 28,
    linkedFrameworks: ["SOC 2", "NIST"],
    lastTested: "19.02.2025 16:31",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 87,
      severity: "warning",
      message: "At risk - evidence overdue",
      showMore: true,
    },
  },
  {
    id: "3",
    name: "Malware detection software installed on employee computers",
    subtext: "3 devices missing antivirus software. Device IDs: DEV-123, DEV-124, DEV-125",
    testId: "DCF-49",
    activity: "Enabled",
    result: "Failed",
    aiRisk: 65,
    linkedFrameworks: ["ISO 27001", "SOC 2"],
    lastTested: "07.04.2025 13:04",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 8,
      severity: "critical",
      message: "Critical - immediate action required",
      showMore: true,
    },
  },
  {
    id: "4",
    name: "Security patches auto-applied on employee computers",
    testId: "DCF-49",
    activity: "Enabled",
    result: "Pass",
    aiRisk: 77,
    linkedFrameworks: ["SOC 2"],
    lastTested: "01.06.2025 09:40",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 91,
      severity: "stable",
      message: "Stable - no issues excepted.",
    },
  },
  {
    id: "5",
    name: "MFA on identity provider",
    testId: "DCF-49",
    activity: "Disabled",
    result: "Pass",
    aiRisk: 28,
    linkedFrameworks: ["NIST"],
    lastTested: "07.06.2025 07:07",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 90,
      severity: "stable",
      message: "Stable - no issues excepted.",
    },
  },
  {
    id: "6",
    name: "Employees have unique email accounts",
    testId: "DCF-49",
    activity: "Enabled",
    result: "Pass",
    aiRisk: 28,
    linkedFrameworks: ["SOC 2", "NIST", "ISO 27001"],
    lastTested: "28.06.2025 02:44",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 93,
      severity: "stable",
      message: "Stable - no issues excepted.",
    },
  },
  {
    id: "7",
    name: "Employee background checks",
    testId: "DCF-49",
    activity: "Disabled",
    result: "Pending",
    aiRisk: 8,
    linkedFrameworks: ["ISO 27001", "NIST"],
    lastTested: "15.08.2025 15:18",
    controlId: "DCF-49",
    evidenceId: "EVD-49",
    aiPrediction: {
      confidence: 85,
      severity: "warning",
      message: "At risk - evidence overdue",
      showMore: true,
    },
  },
];

export const MOCK_ALERTS: AIAlert[] = [
  {
    id: "1",
    severity: "critical",
    title: "3 controls likely to fail in the next 14 days",
    description: "Review HR access control immediately",
    affectedControls: ["DCF-49", "DCF-03", "DCF-31"],
    confidence: 91,
    hasAutoFix: false,
  },
  {
    id: "2",
    severity: "warning",
    title: "Evidence freshness declining for HR controls",
    description: "Refresh employee access reviews",
    affectedControls: ["DCF-49", "DCF-03"],
    confidence: 82,
    hasAutoFix: true,
  },
  {
    id: "3",
    severity: "success",
    title: "Cloud security posture improved by 12%",
    description: "Keep up the good work",
    affectedControls: [],
    confidence: 95,
    hasAutoFix: false,
  },
  {
    id: "4",
    severity: "info",
    title: "AWS integration detected configuration drift",
    description: "Run automated remediation",
    affectedControls: ["DCF-49", "DCF-03"],
    confidence: 91,
    hasAutoFix: true,
  },
];

export const FAILED_TESTS_BREAKDOWN: FailedTestBreakdown[] = [
  { label: "Critical", count: 3, color: "bg-red-500" },
  { label: "High", count: 12, color: "bg-brand-5" },
  { label: "Medium", count: 15, color: "bg-amber-400" },
  { label: "Low", count: 12, color: "bg-blue-400" },
];

export const AI_SIDEBAR_ALERTS = [
  {
    id: "1",
    severity: "critical" as AlertSeverity,
    icon: "critical",
    title: "3 controls likely to fail in the next 3 days",
    description: "Review HR access control immediately",
    confidence: 91,
  },
  {
    id: "2",
    severity: "warning" as AlertSeverity,
    icon: "warning",
    title: "Evidence freshness is declining in 2 HR controls",
    description: "REfresh employee access review",
    confidence: 82,
    hasAutoFix: true,
  },
  {
    id: "3",
    severity: "success" as AlertSeverity,
    icon: "success",
    title: "Cloud security posture improved by 12%",
    description: "Keep the good work",
    confidence: 95,
  },
];
