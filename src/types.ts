/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BrandClarityData {
  companyName: string;
  targetAudience: string;
  coreProblem: string;
  productService: string;
  idealCustomer: string;
  brandPromise: string;
  brandVoice: string;
  biggestGap: string;
  vision12m: string;
  vision3y: string;
  monthlyAdBudget: string;
}

export interface ScorecardMetric {
  id: string;
  label: string;
  score: number;
  notes: string;
}

export interface CompetitorData {
  name: string;
  pricing: string;
  channel: string;
  frequency: string;
  hasAds: boolean;
  websiteScore: number;
  engagement: string;
  usp: string;
  weakness: string;
  // Ratings for exercise
  contentRating: number;
  pricingRating: number;
  trustRating: number;
  onlineRating: number;
  supportRating: number;
  socialRating: number;
}

export interface PriorityTask {
  id: string;
  title: string;
  defaultPriority: 'HIGH' | 'MEDIUM' | 'LOW' | 'DEPENDS';
  clientPriority: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendation: string;
}

export interface WeeklyProgressRow {
  weekName: string;
  actions: string;
  wins: string;
  challenges: string;
  focus: string;
}

export interface PlaybookState {
  brandClarity: BrandClarityData;
  scorecard: ScorecardMetric[];
  competitors: CompetitorData[];
  tasks: PriorityTask[];
  weeklyProgress: WeeklyProgressRow[];
  comments: string;
  diagnosticAnswers?: string[];
}

export interface ClientAccount {
  id: string;
  clientName: string;
  contactPerson: string;
  email: string;
  status: 'running' | 'starting soon' | 'ended';
  createdAt: string;
  playbookState: PlaybookState;
  completedAt?: string;
  historyLog?: string[];
}

