/**
 * MirrorAI — Shared TypeScript Types
 * Centralized type definitions for the entire application.
 */

// ─── Agent ──────────────────────────────────────────────────────────────────────

export type AgentStatus = 'active' | 'warning' | 'inactive' | 'restricted' | 'suspended';

export interface Agent {
  id: string;
  name: string;
  description: string | null;
  framework: string | null;
  frameworkVersion?: string | null;
  model: string | null;
  modelHash?: string | null;
  configHash?: string | null;
  toolManifestHash?: string | null;
  status: string;
  userId?: string;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
  evaluationCount?: number;
  passport?: {
    status: 'valid' | 'expiring' | 'expired';
    fingerprint: string;
    expiresAt: string;
  };
}

// ─── Evaluation ──────────────────────────────────────────────────────────────────

export type EvaluationType = 'full' | 'incremental' | 'heartbeat' | 'ad-hoc';
export type EvaluationStatus = 'completed' | 'running' | 'failed' | 'queued';

export interface EvaluationScenario {
  name: string;
  passed: boolean;
  detail: string;
}

export interface Evaluation {
  id: string;
  agentId: string;
  agentName: string;
  type: EvaluationType;
  status: EvaluationStatus;
  score: number | null;
  date: string;
  duration: string;
  scenarios: EvaluationScenario[];
}

// ─── Certificate ─────────────────────────────────────────────────────────────────

export type CertificateGrade = 'S' | 'A' | 'B' | 'C' | 'D';
export type CertificateStatus = 'active' | 'expired' | 'revoked';

export interface Certificate {
  id: string;
  certNumber: string;
  agentId: string;
  agentName: string;
  grade: CertificateGrade;
  capabilityLevel: string;
  securityLevel: string;
  status: CertificateStatus;
  issuedAt: string;
  expiresAt: string;
  merkleRoot: string;
  signature: string;
}

// ─── Alert ───────────────────────────────────────────────────────────────────────

export type AlertLevel = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  agentName: string;
  level: AlertLevel;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// ─── API Key ─────────────────────────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
}

// ─── Team ────────────────────────────────────────────────────────────────────────

export type TeamRole = 'owner' | 'admin' | 'member';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar: string;
}

// ─── Billing ─────────────────────────────────────────────────────────────────────

export type InvoiceStatus = 'paid' | 'pending' | 'failed';

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: InvoiceStatus;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalAgents: number;
  activeEvaluations: number;
  avgScore: number;
  totalCertificates: number;
}

export interface StatusDistribution {
  label: string;
  count: number;
  color: string;
}

// ─── User / Auth ─────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: TeamRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── API Responses ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

