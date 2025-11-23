export enum TenderStatus {
  NEW = 'NEW',
  SAVED = 'SAVED',
  REVIEWING = 'REVIEWING',
  SUBMITTED = 'SUBMITTED',
  WON = 'WON',
  LOST = 'LOST'
}

export enum AIStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface TenderDocument {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP' | 'OTHER';
  size: string;
  url: string;
  uploadDate: string;
  actualFormat?: string; // e.g., "PDF/A", "PDF/X-3", "PDF 1.4"
  fileSizeBytes?: number; // Actual file size in bytes for validation
}

export interface DocumentFormatRules {
  maxFileSize: string; // e.g., "10MB"
  allowedTypes: string[]; // e.g., ["PDF/A", "PDF/X-3", ".xml"]
  namingConvention?: string; // e.g., "LOT-{number}-{doc-type}.pdf"
  requiredExtensions?: string[]; // e.g., [".pdf", ".xml"]
  prohibitedFormats?: string[]; // e.g., ["PDF/A-1a", "PDF 1.3"]
}

export interface DocumentValidator {
  requiredDocs: string[]; // e.g., ["Financial statements (2021-2023)", "ISO Certificate"]
  formatRules: DocumentFormatRules;
  missingDocs: string[];
  invalidFormats: string[];
  invalidSizes: string[];
  invalidNames: string[];
  complianceScore: number; // 0-100%
  warnings: string[];
  errors: string[];
}

export interface ContactDetails {
  person: string;
  email: string;
  phone: string;
  address?: string;
}

export interface BidChecklist {
  productsAnalyzed: boolean;
  clientContacted: boolean;
  proposalDrafted: boolean;
  followUpScheduled: boolean;
}

export interface PastTender {
  id: string;
  title: string;
  date: string; // Completion Date
  winner: string;
  price: number;
}

// New Interface for Q&A
export interface Clarification {
  id: string;
  question: string;
  rationale: string; // Why we are asking this
  isDraftedByAI: boolean;
}

// New Interface for Go/No-Go
export interface GoNoGoScore {
  capabilities: number; // Can we do it? (0-10)
  financials: number; // Is it profitable? (0-10)
  competition: number; // Can we win? (0-10)
  clientRisk: number; // Do we trust them? (0-10)
  totalScore: number; // Average
  decision: 'GO' | 'NO-GO' | 'REVIEW';
  notes?: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  client: string;
  budget: number;
  currency: string;
  region: string;
  deadline: string; // ISO Date
  publishedDate: string; // ISO Date
  type: 'Works' | 'Supplies' | 'Services';
  branch: string;
  cpvCode: string;
  status: TenderStatus;
  aiStatus: AIStatus;
  summary?: string;
  keyRequirements?: string[];
  keywords?: string[];
  score?: number; // Match score
  userNotes?: string;
  deposit?: string; // Bid security / Wadium
  documents?: TenderDocument[]; // Source documents
  documentUrl?: string; // Main source URL from CSV
  
  // Workspace Features
  contactDetails?: ContactDetails;
  proposalDraft?: string; // AI Generated or User written proposal
  userDocuments?: TenderDocument[]; // User uploaded internal files
  checklist?: BidChecklist; // Bid Workflow Status
  
  // Client Intelligence
  clientHistory?: PastTender[]; // Mocked history of previous tenders
  
  // Advanced Bid Management
  clarifications?: Clarification[];
  goNoGo?: GoNoGoScore;
  
  // Document Compliance
  documentRequirements?: {
    requiredDocs: string[];
    formatRules: DocumentFormatRules;
  };
  
  // Collaboration
  team?: TenderTeam;
  
  // Content Library (stored answers from this tender)
  savedAnswers?: {
    question: string;
    answer: string;
    category: QuestionCategory;
  }[];
  
  // Win/Loss Analysis
  postMortem?: PostMortem;
  
  // CPV Intelligence
  cpvIntelligence?: CPVIntelligence;
  
  // Multi-Language Support
  detectedLanguage?: string; // ISO language code (e.g., 'pl', 'hu', 'ro')
  originalLanguage?: string; // Language of original tender documents
  requiredResponseLanguage?: string; // Language required for submission
  translations?: {
    title?: string;
    description?: string;
    summary?: string;
    proposalDraft?: string;
  };
  culturalCompliance?: CulturalCompliance;
  
  // Pricing Intelligence
  pricingIntel?: PricingIntel;
  proposedPrice?: number; // User's proposed bid price
  
  // ESPD Integration
  espdData?: ESPDData; // Filled ESPD for this tender
  espdStatus?: 'not_started' | 'in_progress' | 'completed' | 'validated';
}

// Smart Filters Types
export interface SmartFilters {
  matchScore: {
    min: number;
    max: number;
  };
  deadlineMin: number; // Minimum days remaining
  requiredCerts: 'hasAll' | 'missing' | 'any';
  existingClientOnly: boolean;
  localPresenceRequired: boolean;
  excludeCompetitors: string[]; // Competitor names to exclude
  excludeRegions?: string[]; // Regions to exclude
  excludeBranches?: string[]; // Branches to exclude
}

// ESPD (European Single Procurement Document) Types
export interface ESPDLegalData {
  officialName: string;
  nationalId: string; // NIP/KRS in Poland, etc.
  vatNumber?: string;
  registrationNumber?: string;
  legalForm: string;
  registeredAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  website?: string;
}

export interface ESPDFinancials {
  annualTurnover: {
    year1: number;
    year2: number;
    year3: number;
    currency: string;
  };
  balanceSheetTotal: {
    year1: number;
    year2: number;
    year3: number;
    currency: string;
  };
  insuranceCoverage: {
    professionalLiability: number;
    generalLiability: number;
    currency: string;
  };
  bankReferences?: string[];
  financialStatements: {
    year: number;
    documentUrl?: string;
    audited: boolean;
  }[];
}

export interface ESPDCertification {
  type: string; // ISO 9001, ISO 27001, etc.
  number: string;
  issuer: string;
  issueDate: string; // ISO Date
  expiryDate: string; // ISO Date
  status: 'valid' | 'expiring_soon' | 'expired';
  documentUrl?: string;
}

export interface ESPDReference {
  id: string;
  projectTitle: string;
  client: string;
  clientContact?: string;
  value: number;
  currency: string;
  startDate: string; // ISO Date
  endDate: string; // ISO Date
  description: string;
  outcomes: string;
  cpvCode?: string;
  relevantFor?: string[]; // Keywords, CPV codes
}

export interface ESPDExclusionGrounds {
  // Part I: Grounds for exclusion
  bankruptcy: boolean;
  windingUp: boolean;
  insolvency: boolean;
  conviction: boolean;
  taxObligations: boolean;
  socialSecurityObligations: boolean;
  environmentalObligations: boolean;
  laborLawViolations: boolean;
  // Self-declarations
  declarations: {
    ground: string;
    applicable: boolean;
    details?: string;
  }[];
}

export interface ESPDSelectionCriteria {
  economicFinancialStanding: {
    minTurnover?: number;
    minBalanceSheet?: number;
    insuranceRequired?: boolean;
    bankGuarantee?: boolean;
  };
  technicalProfessionalAbility: {
    requiredExperience?: number; // Years
    requiredProjects?: number; // Number of similar projects
    requiredCertifications?: string[];
    requiredTeamSize?: number;
  };
  qualityAssurance: {
    qualityManagementSystem: boolean;
    environmentalManagement: boolean;
    certifications?: string[];
  };
}

export interface ESPDCompanyProfile {
  legalData: ESPDLegalData;
  financials: ESPDFinancials;
  certifications: ESPDCertification[];
  references: ESPDReference[];
  exclusionGrounds: ESPDExclusionGrounds;
  selectionCriteria: ESPDSelectionCriteria;
  lastUpdated: string; // ISO Date
  version: number;
}

export interface ESPDValidationIssue {
  section: string;
  field: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  required: boolean;
}

export interface ESPDValidationReport {
  isValid: boolean;
  completionPercentage: number; // 0-100
  issues: ESPDValidationIssue[];
  missingSections: string[];
  expiringItems: {
    type: 'certification' | 'insurance' | 'reference';
    name: string;
    expiryDate: string;
    daysUntilExpiry: number;
  }[];
}

export interface ESPDUpdateTrigger {
  id: string;
  type: 'certification_expiry' | 'insurance_expiry' | 'financial_update' | 'reference_update';
  message: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string; // ISO Date
  daysUntilDue: number;
  actionRequired: string;
  relatedItem?: string;
}

export interface ESPDData {
  tenderId: string;
  profile: ESPDCompanyProfile;
  tenderSpecific: {
    // Tender-specific modifications
    additionalReferences?: ESPDReference[];
    specificCertifications?: string[];
    customDeclarations?: string[];
  };
  validation: ESPDValidationReport;
  updateTriggers: ESPDUpdateTrigger[];
  generatedAt: string; // ISO Date
  xmlData?: string; // Generated ESPD XML
}

export interface ESPDManager {
  companyProfile: ESPDCompanyProfile;
  autoFill: (tender: Tender) => ESPDData;
  validateCompliance: (espdData: ESPDData) => ESPDValidationReport;
  updateTriggers: ESPDUpdateTrigger[];
  generateXML: (espdData: ESPDData) => string;
}

// Pricing Intelligence Types
export interface PriceRange {
  min: number;
  max: number;
  average: number;
  median: number;
}

export interface SimilarTender {
  id: string;
  client: string;
  title: string;
  cpvCode: string;
  awarded: number; // Final awarded price
  lowestBid: number;
  highestBid: number;
  winner: string;
  ourBid?: number; // If we bid on this
  result?: 'Won' | 'Lost';
  date: string; // ISO Date
}

export interface PricingRiskAnalysis {
  tooLow: {
    risk: string;
    probability: number; // 0-100
    impact: 'Low' | 'Medium' | 'High';
  };
  tooHigh: {
    risk: string;
    probability: number;
    impact: 'Low' | 'Medium' | 'High';
  };
  optimal: {
    description: string;
    winProbability: number; // 0-100
  };
}

export interface AIPricingSuggestion {
  sweetSpot: number; // Recommended bid price
  winProbability: number; // 0-100%
  competitiveRange: PriceRange;
  riskAnalysis: PricingRiskAnalysis;
  reasoning: string;
  confidence: number; // 0-100, how confident is the AI
}

export interface PricingIntel {
  tender: Tender;
  estimatedBudget: number; // Tender's budget estimate
  historicalData: {
    similarTenders: SimilarTender[];
    averageWinPrice: number;
    priceDistribution: {
      percentile25: number;
      percentile50: number; // Median
      percentile75: number;
    };
  };
  aiSuggestion: AIPricingSuggestion;
  marketPosition?: {
    ourPosition: 'Low' | 'Medium' | 'High';
    recommendedPosition: 'Low' | 'Medium' | 'High';
    priceGap?: number; // Difference from sweet spot
  };
}

// Multi-Language Types
export type SupportedLanguage = 'en' | 'pl' | 'hu' | 'ro' | 'de' | 'fr' | 'es' | 'it' | 'cs' | 'sk';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface CulturalCompliance {
  requiresNotarizedTranslation: boolean;
  requiresSwornTranslator: boolean;
  documentTranslationRules: {
    type: string; // e.g., "Financial statements", "Certificates"
    requiresNotarization: boolean;
    requiresSwornTranslator: boolean;
    deadline?: string; // If translation has separate deadline
  }[];
  languageSpecificRequirements: string[];
  complianceScore: number; // 0-100
  warnings: string[];
  errors: string[];
}

// Post-Mortem Analysis Types
export interface TenderFeedback {
  technicalScore: number; // 0-100
  priceScore: number; // 0-100
  totalScore: number; // 0-100
  winnerPrice: number;
  ourPrice: number;
  assessorComments: string;
  evaluationDate?: string; // ISO Date
  evaluationCriteria?: {
    criterion: string;
    ourScore: number;
    maxScore: number;
    comments?: string;
  }[];
}

export interface PostMortemAnalysis {
  priceGap?: string; // e.g., "15% too expensive"
  technicalWeaknesses: string[];
  technicalStrengths?: string[];
  suggestedImprovements: string[];
  winFactors?: string[]; // If won, what made us win
  lossFactors: string[]; // If lost, why we lost
  scoreBreakdown?: {
    technical: { score: number; maxScore: number; percentage: number };
    price: { score: number; maxScore: number; percentage: number };
    other?: { score: number; maxScore: number; percentage: number };
  };
}

export interface CompetitorIntel {
  winner: string;
  theirStrength: string[];
  theirPrice?: number;
  nextTimeStrategy: string;
  competitorProfile?: {
    size?: string;
    experience?: string;
    certifications?: string[];
  };
}

export interface PostMortem {
  tender: Tender;
  result: 'Won' | 'Lost';
  feedback?: TenderFeedback;
  analysis: PostMortemAnalysis;
  lessonsLearned: string;
  competitorIntel?: CompetitorIntel;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}

export type CompanySize = 'Freelancer' | 'Micro (<10)' | 'SME (10-250)' | 'Enterprise (250+)';
export type GeoScope = 'PL' | 'EU' | 'Global';

export interface UserProfile {
  // Basic Info
  companyName?: string;
  vatNumber?: string; // VAT/Tax ID number
  role?: string;
  companySize?: CompanySize;
  signature?: string; // E-signature image data (base64)
  
  // Strategy
  interestedBranches: string[];
  targetRegions: string[]; // Polish regions
  targetEUCountries?: string[]; // EU countries if geoScope is EU
  geoScope?: GeoScope;
  minBudget?: number;
  
  // AI Calibration
  keywords: string[];
  companyBio?: string; // The "Base Draft" text for AI
}

// Collaboration Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'bidManager' | 'technical' | 'finance' | 'legal' | 'approver' | 'viewer';
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export type AssignmentStatus = 'NotStarted' | 'InProgress' | 'Review' | 'Approved' | 'Rejected';

export interface Assignment {
  id: string;
  section: string; // e.g., "Technical specifications", "Financial proposal", "Legal compliance"
  assignedTo: User;
  deadline: string; // ISO Date
  status: AssignmentStatus;
  lastNag: string; // ISO Date - When last reminder was sent
  nagCount: number; // How many times we've nagged them
  notes?: string;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  section?: string; // Which part of the proposal this relates to
  assignmentId?: string; // If commenting on an assignment
  createdAt: string; // ISO Date
  updatedAt?: string; // ISO Date
  replies?: Comment[];
  resolved?: boolean;
}

export interface DocumentVersion {
  id: string;
  version: number; // 1, 2, 3...
  documentName: string; // e.g., "Technical_Proposal_v2.pdf"
  uploadedBy: User;
  uploadedAt: string; // ISO Date
  changes?: string; // What changed in this version
  approvedBy?: User[];
  status: 'draft' | 'review' | 'approved' | 'rejected';
  url?: string;
}

export interface TenderTeam {
  roles: {
    bidManager: User;
    technical: User[];
    finance: User;
    legal: User;
    approver: User;
  };
  assignments: Assignment[];
  commentThread: Comment[];
  versionControl: DocumentVersion[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: any; // React.ReactNode - but avoiding React import in types file
}

// CPV Intelligence Types
export interface PriceRange {
  min: number;
  max: number;
  average: number;
  currency: string;
}

export interface CPVRequirements {
  mandatoryCerts: string[];
  experienceNeeded: string; // e.g., "3 similar projects, €500k+"
  financialThresholds: {
    minTurnover: number;
    insuranceCoverage: number;
  };
  technicalRequirements?: string[];
  legalRequirements?: string[];
}

export interface CPVMarketIntel {
  avgWinRate: number; // Percentage
  typicalPrices: PriceRange;
  mainCompetitors: string[];
  trendingKeywords: string[];
  marketSize?: number; // Total market value
  competitionLevel: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface CPVIntelligence {
  code: string; // e.g., "72000000-5"
  description: string; // e.g., "IT services"
  category: string; // e.g., "Services"
  requirements: CPVRequirements;
  marketIntel: CPVMarketIntel;
  matchScore: number; // 0-100, how well company profile fits
  gaps: string[]; // Missing requirements
  strengths?: string[]; // What we have that matches
}

// Content Library Types
export type QuestionCategory = 'Company' | 'Technical' | 'Experience' | 'Financial' | 'Quality' | 'Methodology';

export interface BestAnswer {
  id: string;
  text: string;
  usedInTender: string; // Tender ID or title
  result: 'Won' | 'Lost' | 'Pending';
  score?: number; // If available, the evaluation score
  date: string; // ISO Date
  tenderTitle?: string;
}

export interface QuestionBankItem {
  id: string;
  question: string;
  category: QuestionCategory;
  bestAnswers: BestAnswer[];
  aiSuggestion?: string; // AI-adapted answer for current tender
  usageCount: number; // How many times this question has been asked
  lastUsed?: string; // ISO Date
}

export interface CaseStudy {
  id: string;
  project: string;
  client: string;
  value: number;
  currency: string;
  relevantFor: string[]; // CPV codes, keywords, branches
  outcomes: string;
  date: string; // ISO Date
  duration?: string; // e.g., "12 months"
  technologies?: string[];
  challenges?: string[];
  achievements?: string[];
}

export interface CompanyBoilerplate {
  certifications: string;
  teamBios: string;
  financials: string;
  references: string;
  qualityManagement?: string;
  methodology?: string;
  healthSafety?: string;
  environmental?: string;
}

export interface ContentLibrary {
  questionBank: QuestionBankItem[];
  caseStudies: CaseStudy[];
  companyBoilerplate: CompanyBoilerplate;
}