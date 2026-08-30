export type DocumentCategory = 'identity' | 'educational';

export type DocumentType =
  // Identity & Travel
  | 'passport'
  | 'visa'
  | 'national_id'
  | 'driving_license'
  | 'permit'
  // Educational
  | 'college_id'
  | 'marksheet'
  | 'degree_certificate'
  | 'diploma_certificate'
  | 'academic_certificate'
  | 'bonafide_certificate'
  | 'transfer_certificate'
  | 'other';

export type VerificationStatus = 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';
export type CheckStatus = 'PASS' | 'WARNING' | 'FAIL' | 'MANUAL REVIEW' | 'MATCH' | 'POSSIBLE MISMATCH' | 'UNAVAILABLE';

export interface BoundingBox {
  ymin: number; // 0 to 1000
  xmin: number; // 0 to 1000
  ymax: number; // 0 to 1000
  xmax: number; // 0 to 1000
}

export interface TamperingFinding {
  id: string;
  what: string;
  where: string;
  why: string;
  confidence: number; // 0 - 100
  severity: 'low' | 'medium' | 'high';
  boundingBox?: BoundingBox;
}

export interface MarksheetSubject {
  code?: string;
  name: string;
  maxMarks?: number;
  marksObtained: number;
  grade?: string;
  status?: string;
}

export interface ExtractedField {
  key: string;
  label: string;
  value: string | number;
  confidence: number; // 0 - 100
  isSuspicious?: boolean;
  notes?: string;
}

export interface ValidationItem {
  id: string;
  checkName: string;
  status: CheckStatus;
  explanation: string;
  fieldAffected?: string;
  impactScore?: number; // Added to risk
}

export interface FaceVerificationResult {
  faceDetectedInDocument: boolean;
  documentFaceBox?: BoundingBox;
  documentFaceImage?: string; // Data URL / crop
  secondFaceProvided: boolean;
  secondFaceImage?: string; // Data URL
  matchScore?: number; // 0 - 100
  status: 'MATCH' | 'POSSIBLE MISMATCH' | 'UNAVAILABLE' | 'NO_FACE_DETECTED';
  explanation: string;
  biometricNotes?: string[];
}

export interface RiskScoreBreakdown {
  overallScore: number; // 0 - 100
  riskLevel: VerificationStatus;
  ocrConfidenceFactor: number;
  validationFailureImpact: number;
  tamperingIndicatorImpact: number;
  faceMismatchImpact: number;
  inconsistencyImpact: number;
  summaryExplanation: string;
}

export interface PipelineCheckSummary {
  name: string;
  status: CheckStatus;
  explanation: string;
  confidence?: number;
}

export interface VerificationResult {
  id: string;
  timestamp: string;
  documentCategory: DocumentCategory;
  detectedType: DocumentType;
  documentTypeLabel: string;
  issuingAuthority?: string;
  issuingCountryOrState?: string;
  documentImage: string; // Base64 / URL
  documentName: string;
  documentFileSize?: string;
  
  // Pipeline Results
  riskScore: RiskScoreBreakdown;
  pipelineChecks: {
    ocrExtraction: PipelineCheckSummary;
    documentValidation: PipelineCheckSummary;
    tamperingAnalysis: PipelineCheckSummary;
    consistencyCheck: PipelineCheckSummary;
    faceVerification: PipelineCheckSummary;
  };

  extractedFields: ExtractedField[];
  subjects?: MarksheetSubject[]; // Specifically for marksheets
  rawOcrText?: string;
  
  validationResults: ValidationItem[];
  tamperingFindings: TamperingFinding[];
  faceVerification: FaceVerificationResult;

  recommendation: string;
  disclaimer: string;
  isDemo?: boolean;
}

export interface VerificationRecordSummary {
  id: string;
  timestamp: string;
  documentName: string;
  documentType: DocumentType;
  documentCategory: DocumentCategory;
  riskScore: number;
  status: VerificationStatus;
  tamperingCount: number;
  validationPassRatio: string;
  verifiedBy: string;
}

export interface DocumentTypeConfig {
  id: DocumentType;
  name: string;
  category: DocumentCategory;
  description: string;
  iconName: string;
  expectedFields: string[];
}
