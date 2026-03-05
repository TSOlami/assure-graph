export type PersonnelRole = "owner" | "admin" | "manager" | "member" | "viewer";
export type PersonnelStatus = "active" | "inactive" | "pending";
export type PersonnelDepartment =
  | "Engineering"
  | "Security"
  | "Legal & Compliance"
  | "Finance"
  | "Human Resources"
  | "Operations"
  | "Sales"
  | "Marketing";

export interface Personnel {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: PersonnelRole;
  department: PersonnelDepartment;
  status: PersonnelStatus;
  lastActive?: string;
  joinedAt: string;
  phone?: string;
  jobTitle?: string;
}

export const ROLES: PersonnelRole[] = ["owner", "admin", "manager", "member", "viewer"];

export const DEPARTMENTS: PersonnelDepartment[] = [
  "Engineering",
  "Security",
  "Legal & Compliance",
  "Finance",
  "Human Resources",
  "Operations",
  "Sales",
  "Marketing",
];

export const ROLE_LABELS: Record<PersonnelRole, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  member: "Member",
  viewer: "Viewer",
};

export const ROLE_DESCRIPTIONS: Record<PersonnelRole, string> = {
  owner: "Full access to all settings and data. Can manage billing.",
  admin: "Can manage team members, integrations, and most settings.",
  manager: "Can manage assigned team members and view all compliance data.",
  member: "Can view and contribute to assigned controls and evidence.",
  viewer: "Read-only access to assigned areas.",
};

export const ROLE_COLORS: Record<PersonnelRole, string> = {
  owner: "bg-purple-50 text-purple-700 border border-purple-200",
  admin: "bg-brand-0-5 text-brand-5 border border-brand-1",
  manager: "bg-blue-50 text-blue-700 border border-blue-200",
  member: "bg-slate-50 text-slate-600 border border-slate-200",
  viewer: "bg-green-50 text-green-700 border border-green-200",
};

export const STATUS_COLORS: Record<PersonnelStatus, string> = {
  active: "bg-green-50 text-green-700",
  inactive: "bg-slate-100 text-slate-500",
  pending: "bg-amber-50 text-amber-600",
};

export const STATUS_DOT_COLORS: Record<PersonnelStatus, string> = {
  active: "bg-green-500",
  inactive: "bg-slate-400",
  pending: "bg-amber-500",
};

export const mockPersonnel: Personnel[] = [
  {
    id: "1",
    name: "Sophia Reynolds",
    email: "sophia.reynolds@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
    role: "owner",
    department: "Engineering",
    status: "active",
    lastActive: "2 mins ago",
    joinedAt: "2024-01-15",
    phone: "+1 (555) 001-0001",
    jobTitle: "Chief Technology Officer",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.johnson@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    role: "admin",
    department: "Security",
    status: "active",
    lastActive: "1 hour ago",
    joinedAt: "2024-02-10",
    phone: "+1 (555) 001-0002",
    jobTitle: "Security Operations Manager",
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.patel@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    role: "manager",
    department: "Legal & Compliance",
    status: "active",
    lastActive: "3 hours ago",
    joinedAt: "2024-03-05",
    phone: "+1 (555) 001-0003",
    jobTitle: "Compliance Manager",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david.chen@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    role: "member",
    department: "Finance",
    status: "active",
    lastActive: "Yesterday",
    joinedAt: "2024-04-20",
    phone: "+1 (555) 001-0004",
    jobTitle: "Financial Analyst",
  },
  {
    id: "5",
    name: "Olivia Thompson",
    email: "olivia.thompson@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    role: "member",
    department: "Human Resources",
    status: "active",
    lastActive: "2 days ago",
    joinedAt: "2024-05-12",
    phone: "+1 (555) 001-0005",
    jobTitle: "HR Specialist",
  },
  {
    id: "6",
    name: "Ethan Williams",
    email: "ethan.williams@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan",
    role: "viewer",
    department: "Operations",
    status: "inactive",
    lastActive: "2 weeks ago",
    joinedAt: "2024-06-08",
    phone: "+1 (555) 001-0006",
    jobTitle: "Operations Analyst",
  },
  {
    id: "7",
    name: "Aisha Okafor",
    email: "aisha.okafor@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
    role: "manager",
    department: "Engineering",
    status: "active",
    lastActive: "4 hours ago",
    joinedAt: "2024-07-22",
    phone: "+1 (555) 001-0007",
    jobTitle: "Engineering Manager",
  },
  {
    id: "8",
    name: "James Martinez",
    email: "james.martinez@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    role: "member",
    department: "Sales",
    status: "pending",
    lastActive: undefined,
    joinedAt: "2025-01-10",
    phone: "+1 (555) 001-0008",
    jobTitle: "Account Executive",
  },
  {
    id: "9",
    name: "Zoe Kim",
    email: "zoe.kim@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zoe",
    role: "admin",
    department: "Security",
    status: "active",
    lastActive: "30 mins ago",
    joinedAt: "2024-08-14",
    phone: "+1 (555) 001-0009",
    jobTitle: "Security Engineer",
  },
  {
    id: "10",
    name: "Noah Anderson",
    email: "noah.anderson@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah",
    role: "member",
    department: "Marketing",
    status: "pending",
    lastActive: undefined,
    joinedAt: "2025-01-25",
    phone: "+1 (555) 001-0010",
    jobTitle: "Marketing Specialist",
  },
  {
    id: "11",
    name: "Lena Müller",
    email: "lena.muller@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena",
    role: "member",
    department: "Legal & Compliance",
    status: "active",
    lastActive: "5 hours ago",
    joinedAt: "2024-09-02",
    phone: "+49 30 1234 5678",
    jobTitle: "Compliance Analyst",
  },
  {
    id: "12",
    name: "Carlos Rivera",
    email: "carlos.rivera@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    role: "viewer",
    department: "Sales",
    status: "inactive",
    lastActive: "1 month ago",
    joinedAt: "2024-10-18",
    phone: "+1 (555) 001-0012",
    jobTitle: "Sales Representative",
  },
];
