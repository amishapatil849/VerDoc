import { VerificationResult, VerificationRecordSummary } from '../types';
import { GENUINE_PASSPORT_SVG, TAMPERED_MARKSHEET_SVG, GENUINE_DEGREE_SVG, SAMPLE_MATCHING_SELFIE, SAMPLE_MISMATCHING_SELFIE } from './sampleImages';

export const DEMO_CASE_1_GENUINE_PASSPORT: VerificationResult = {
  id: 'VER-2026-88194',
  timestamp: '2026-08-30T10:15:30Z',
  documentCategory: 'identity',
  detectedType: 'passport',
  documentTypeLabel: 'Passport (Biometric Travel Document)',
  issuingAuthority: 'Ministry of Foreign & Immigration Affairs',
  issuingCountryOrState: 'Republic of Meridia',
  documentImage: GENUINE_PASSPORT_SVG,
  documentName: 'meridia_passport_adrian_vance.png',
  documentFileSize: '428 KB',
  isDemo: true,

  riskScore: {
    overallScore: 12,
    riskLevel: 'LOW RISK',
    ocrConfidenceFactor: 2,
    validationFailureImpact: 0,
    tamperingIndicatorImpact: 5,
    faceMismatchImpact: 5,
    inconsistencyImpact: 0,
    summaryExplanation: 'Document appears consistent with standard biometric specifications. No major visual or typographical anomalies detected.',
  },

  pipelineChecks: {
    ocrExtraction: {
      name: 'OCR Extraction',
      status: 'PASS',
      explanation: 'All 7 mandatory passport fields plus 2-line ICAO Doc 9303 MRZ zone successfully parsed with 98.4% optical confidence.',
      confidence: 98,
    },
    documentValidation: {
      name: 'Document Validation',
      status: 'PASS',
      explanation: 'Valid validity window (Jan 2022 to Jan 2032). Internal checksums and dates are mathematically consistent.',
      confidence: 99,
    },
    tamperingAnalysis: {
      name: 'Tampering Analysis',
      status: 'PASS',
      explanation: 'Guilloche background lines intact. No font kerning discrepancies, halo artifacts, or pixel splicing detected.',
      confidence: 95,
    },
    consistencyCheck: {
      name: 'Consistency Check',
      status: 'PASS',
      explanation: 'Visual header name matches MRZ machine encoded name (VANCE, ADRIAN ALEXANDER) and nationality code MRD.',
      confidence: 99,
    },
    faceVerification: {
      name: 'Face Verification',
      status: 'PASS',
      explanation: 'Extracted passport facial portrait matches live presented comparison subject with high confidence.',
      confidence: 94,
    },
  },

  extractedFields: [
    { key: 'passport_no', label: 'Passport Number', value: 'M89421054', confidence: 99 },
    { key: 'surname', label: 'Surname', value: 'VANCE', confidence: 99 },
    { key: 'given_names', label: 'Given Names', value: 'ADRIAN ALEXANDER', confidence: 98 },
    { key: 'nationality', label: 'Nationality', value: 'MERIDIAN (MRD)', confidence: 98 },
    { key: 'dob', label: 'Date of Birth', value: '14 MAY 1994', confidence: 99 },
    { key: 'sex', label: 'Gender / Sex', value: 'M', confidence: 99 },
    { key: 'issue_date', label: 'Date of Issue', value: '22 JAN 2022', confidence: 97 },
    { key: 'expiry_date', label: 'Date of Expiry', value: '21 JAN 2032 (Active)', confidence: 98 },
    { key: 'mrz_line1', label: 'MRZ Line 1', value: 'P<MRDVANCE<<ADRIAN<ALEXANDER<<<<<<<<<<<<<<<', confidence: 99 },
    { key: 'mrz_line2', label: 'MRZ Line 2', value: 'M894210544MRD9405148M3201216<<<<<<<<<<<<<<02', confidence: 99 },
  ],

  validationResults: [
    { id: 'val_1', checkName: 'Required Field Completeness', status: 'PASS', explanation: 'All primary identity, nationality, validity, and MRZ fields are present.' },
    { id: 'val_2', checkName: 'Document Expiration Check', status: 'PASS', explanation: 'Document expires on 21 Jan 2032 (5.4 years validity remaining).' },
    { id: 'val_3', checkName: 'Chronological Integrity', status: 'PASS', explanation: 'Issue date (2022) is subsequent to Date of Birth (1994) and precedes Expiry date (2032).' },
    { id: 'val_4', checkName: 'MRZ Checksum Parity', status: 'PASS', explanation: 'Computed check digits match passport number, DOB, and expiration date per ICAO 9303 standard.' },
  ],

  tamperingFindings: [
    {
      id: 'tamp_0',
      what: 'Security Pattern Continuity',
      where: 'Document background canvas',
      why: 'Micro-print guilloche wavy security lines show continuous mathematical continuity without splicing.',
      confidence: 96,
      severity: 'low',
    }
  ],

  faceVerification: {
    faceDetectedInDocument: true,
    documentFaceBox: { ymin: 192, xmin: 62, ymax: 576, xmax: 262 },
    secondFaceProvided: true,
    secondFaceImage: SAMPLE_MATCHING_SELFIE,
    matchScore: 94,
    status: 'MATCH',
    explanation: 'Facial geometry, inter-pupillary distance, jaw curvature, and nose bridge metrics align within 94% biometric tolerance.',
    biometricNotes: [
      'Biometric face bounding box extracted at [ymin:192, xmin:62, ymax:576, xmax:262]',
      'Lighting adjustment applied: uniform illumination verified',
      'No adversarial face morphing or deepfake mask markers detected'
    ]
  },

  recommendation: 'Document appears consistent with standard issuance guidelines. Low screening risk profile. Automatic pass recommended.',
  disclaimer: 'AI-assisted screening output for informational verification assistance. Does not constitute a sovereign government authority certification.'
};

export const DEMO_CASE_2_TAMPERED_MARKSHEET: VerificationResult = {
  id: 'VER-2026-90412',
  timestamp: '2026-08-30T11:42:15Z',
  documentCategory: 'educational',
  detectedType: 'marksheet',
  documentTypeLabel: 'Marksheet / Academic Statement of Grades',
  issuingAuthority: 'Metropolitan Institute of Technology',
  issuingCountryOrState: 'Autonomous Examination Board',
  documentImage: TAMPERED_MARKSHEET_SVG,
  documentName: 'mit_sem6_transcript_rohan_sharma.pdf',
  documentFileSize: '612 KB',
  isDemo: true,

  riskScore: {
    overallScore: 87,
    riskLevel: 'HIGH RISK',
    ocrConfidenceFactor: 12,
    validationFailureImpact: 25,
    tamperingIndicatorImpact: 40,
    faceMismatchImpact: 0,
    inconsistencyImpact: 10,
    summaryExplanation: 'Multiple severe visual tampering anomalies and arithmetic score inconsistencies detected. Manual institutional verification strongly recommended.',
  },

  pipelineChecks: {
    ocrExtraction: {
      name: 'OCR Extraction',
      status: 'PASS',
      explanation: '5 course subjects, marks, percentage, and signatures successfully isolated and mapped into tabular structure.',
      confidence: 94,
    },
    documentValidation: {
      name: 'Document Validation',
      status: 'FAIL',
      explanation: 'Severe arithmetic failure: Subject marks sum to 451, but stated total claims 485. Calculated percentage should be 90.2% rather than 97.0%.',
      confidence: 99,
    },
    tamperingAnalysis: {
      name: 'Tampering Analysis',
      status: 'FAIL',
      explanation: 'High confidence font mismatch, localized background halo, and cut-and-paste digital artifacts detected on subject scores CS-602 and CS-604.',
      confidence: 92,
    },
    consistencyCheck: {
      name: 'Consistency Check',
      status: 'WARNING',
      explanation: 'Student name typeface does not match template serif standard. Grade points "O" and "A+" in rows 2 and 4 display non-standard monospace baseline.',
      confidence: 89,
    },
    faceVerification: {
      name: 'Face Verification',
      status: 'MANUAL REVIEW',
      explanation: 'Face verification unavailable — no student photo embedded in marksheet template and no comparison selfie provided.',
    },
  },

  extractedFields: [
    { key: 'student_name', label: 'Student Name', value: 'ROHAN S. SHARMA', confidence: 91, isSuspicious: true, notes: 'Typeface differs from surrounding fields' },
    { key: 'enrollment_no', label: 'Enrollment / Roll No', value: 'MIT/2021/CS/0491', confidence: 97 },
    { key: 'institution', label: 'Institution', value: 'Metropolitan Institute of Technology', confidence: 98 },
    { key: 'degree', label: 'Degree / Program', value: 'B.Tech - Computer Science', confidence: 96 },
    { key: 'semester', label: 'Semester / Session', value: 'Semester VI (Spring 2024)', confidence: 97 },
    { key: 'total_max_marks', label: 'Total Max Marks', value: '500', confidence: 99 },
    { key: 'total_obtained', label: 'Stated Marks Obtained', value: '485 (Tampered)', confidence: 95, isSuspicious: true, notes: 'Actual sum is 451' },
    { key: 'stated_percentage', label: 'Stated Percentage', value: '97.0% (Tampered)', confidence: 94, isSuspicious: true, notes: 'Computed percentage is 90.2%' },
    { key: 'stated_cgpa', label: 'Stated CGPA', value: '9.70', confidence: 92, isSuspicious: true },
    { key: 'result', label: 'Examination Result', value: 'PASS', confidence: 98 },
  ],

  subjects: [
    { code: 'CS-601', name: 'Advanced Algorithms', maxMarks: 100, marksObtained: 88, grade: 'A', status: 'PASS' },
    { code: 'CS-602', name: 'Distributed Cloud Systems', maxMarks: 100, marksObtained: 98, grade: 'O', status: 'PASS' }, // Tampered from 52
    { code: 'CS-603', name: 'Machine Learning & AI', maxMarks: 100, marksObtained: 81, grade: 'A', status: 'PASS' },
    { code: 'CS-604', name: 'Compiler Design & Automata', maxMarks: 100, marksObtained: 94, grade: 'A+', status: 'PASS' }, // Tampered from 64
    { code: 'CS-605', name: 'Computer Networks Lab', maxMarks: 100, marksObtained: 90, grade: 'A+', status: 'PASS' },
  ],

  validationResults: [
    {
      id: 'val_math_1',
      checkName: 'Marks Arithmetic Total Validation',
      status: 'FAIL',
      explanation: 'Subject marks (88 + 98 + 81 + 94 + 90) equal 451, whereas stated Total Obtained is printed as 485. Discrepancy of 34 marks.',
      impactScore: 25,
    },
    {
      id: 'val_pct_2',
      checkName: 'Percentage & CGPA Formula Consistency',
      status: 'FAIL',
      explanation: '451/500 corresponds to 90.20%, but stated percentage claims 97.00% and CGPA 9.70.',
      impactScore: 15,
    },
    {
      id: 'val_font_3',
      checkName: 'Font Uniformity & Typeface Inspection',
      status: 'WARNING',
      explanation: 'Marks "98" and "94" utilize Courier New Monospace, while authentic rows utilize standard Helvetica/Segoe UI.',
      impactScore: 20,
    },
    {
      id: 'val_stamp_4',
      checkName: 'Institutional Seal & Signature Verification',
      status: 'MANUAL REVIEW',
      explanation: 'Digital examination seal displays compression halo and edge blur typical of graphic overlay manipulation.',
      impactScore: 15,
    }
  ],

  tamperingFindings: [
    {
      id: 'tamp_1',
      what: 'Text Manipulation & Score Modification',
      where: 'Subject Row CS-602 Obtained Marks column (460, 276)',
      why: 'Obtained mark "98" shows different pixel rasterization, blurred bounding margin, and baseline elevation mismatch compared to neighbor numbers. Confidence: 92%.',
      confidence: 92,
      severity: 'high',
      boundingBox: { ymin: 445, xmin: 575, ymax: 483, xmax: 625 },
    },
    {
      id: 'tamp_2',
      what: 'Altered Marks & Grade Insertion',
      where: 'Subject Row CS-604 Obtained Marks column (460, 344)',
      why: 'Font face is monospace Courier rather than standard sans-serif; localized color compression noise detected around glyph boundaries. Confidence: 88%.',
      confidence: 88,
      severity: 'high',
      boundingBox: { ymin: 554, xmin: 575, ymax: 593, xmax: 625 },
    },
    {
      id: 'tamp_3',
      what: 'Copy-Pasted Digital Stamp Artifact',
      where: 'Center Bottom Official Exam Division Seal (370, 495)',
      why: 'Digital stamp exhibits rectangular alpha channel clipping and color disparity with surrounding document paper grain.',
      confidence: 79,
      severity: 'medium',
      boundingBox: { ymin: 798, xmin: 462, ymax: 911, xmax: 550 },
    }
  ],

  faceVerification: {
    faceDetectedInDocument: false,
    secondFaceProvided: false,
    status: 'UNAVAILABLE',
    explanation: 'Face verification unavailable — a live/presented-person image is required.',
  },

  recommendation: 'Potential document manipulation detected. Multiple arithmetic and typographical anomalies present. Comprehensive manual verification with institution database is required.',
  disclaimer: 'AI-assisted screening output for informational verification assistance. Does not constitute a sovereign government authority certification.'
};

export const DEMO_CASE_3_GENUINE_DEGREE: VerificationResult = {
  id: 'VER-2026-77301',
  timestamp: '2026-08-29T16:20:00Z',
  documentCategory: 'educational',
  detectedType: 'degree_certificate',
  documentTypeLabel: 'Degree Certificate (Conferred Parchment)',
  issuingAuthority: 'National University of Technology',
  issuingCountryOrState: 'Academic Senate & Accreditation Council',
  documentImage: GENUINE_DEGREE_SVG,
  documentName: 'degree_certificate_elena_rostova.png',
  documentFileSize: '540 KB',
  isDemo: true,

  riskScore: {
    overallScore: 14,
    riskLevel: 'LOW RISK',
    ocrConfidenceFactor: 3,
    validationFailureImpact: 0,
    tamperingIndicatorImpact: 6,
    faceMismatchImpact: 5,
    inconsistencyImpact: 0,
    summaryExplanation: 'Academic degree credentials exhibit high visual fidelity, uniform calligraphic typesetting, valid serial numbering format, and uncorrupted gold foil seal geometry.',
  },

  pipelineChecks: {
    ocrExtraction: {
      name: 'OCR Extraction',
      status: 'PASS',
      explanation: 'Graduate name, degree program, conferred date, honors, and certificate serial number extracted with 97.8% optical confidence.',
      confidence: 98,
    },
    documentValidation: {
      name: 'Document Validation',
      status: 'PASS',
      explanation: 'Certificate serial code format NUT-2023-BSC matches university standard registry syntax.',
      confidence: 96,
    },
    tamperingAnalysis: {
      name: 'Tampering Analysis',
      status: 'PASS',
      explanation: 'Uniform vector resolution across text, ornamental borders, and dual signatory blocks.',
      confidence: 94,
    },
    consistencyCheck: {
      name: 'Consistency Check',
      status: 'PASS',
      explanation: 'Dean and Chancellor titles, conferral phrasing, and historical calendar date (June 24, 2023) are internally consistent.',
      confidence: 97,
    },
    faceVerification: {
      name: 'Face Verification',
      status: 'UNAVAILABLE',
      explanation: 'Face verification unavailable — a live/presented-person image is required.',
    },
  },

  extractedFields: [
    { key: 'graduate_name', label: 'Graduate / Student Name', value: 'ELENA MARIE ROSTOVA', confidence: 99 },
    { key: 'institution', label: 'Issuing Institution', value: 'National University of Technology', confidence: 99 },
    { key: 'degree_conferred', label: 'Degree Conferred', value: 'Bachelor of Science in Software Engineering', confidence: 98 },
    { key: 'honors', label: 'Honors / Distinction', value: 'First Class Honors and Academic Distinction', confidence: 97 },
    { key: 'date_conferred', label: 'Date Conferred', value: '24 June 2023', confidence: 98 },
    { key: 'certificate_no', label: 'Certificate / Serial Number', value: 'NUT-2023-BSC-883492', confidence: 98 },
    { key: 'signatories', label: 'Signatories', value: 'Prof. Arthur Pendelton (Dean) & Dr. Katherine Vance (President)', confidence: 96 },
  ],

  validationResults: [
    { id: 'deg_val_1', checkName: 'Certificate Number Syntax', status: 'PASS', explanation: 'Conforms to institutional standard (NUT-[YEAR]-[PROGRAM]-[ID]).' },
    { id: 'deg_val_2', checkName: 'Academic Calendar Validity', status: 'PASS', explanation: 'Conferral date aligns with standard summer convocation schedule.' },
    { id: 'deg_val_3', checkName: 'Signatory Authority Presence', status: 'PASS', explanation: 'Dual countersignature from Dean and Academic President verified.' },
  ],

  tamperingFindings: [
    {
      id: 'deg_tamp_1',
      what: 'Embossed Seal Continuity',
      where: 'Lower left gold seal element',
      why: 'Golden medallion radial serrations and typography are authentic without overlay pixelation.',
      confidence: 95,
      severity: 'low',
    }
  ],

  faceVerification: {
    faceDetectedInDocument: false,
    secondFaceProvided: false,
    status: 'UNAVAILABLE',
    explanation: 'Face verification unavailable — a live/presented-person image is required.',
  },

  recommendation: 'Document appears consistent. Low risk score. Proceed with standard credential verification procedures.',
  disclaimer: 'AI-assisted screening output for informational verification assistance. Does not constitute a sovereign government authority certification.'
};

export const INITIAL_VERIFICATION_HISTORY: VerificationRecordSummary[] = [
  {
    id: 'VER-2026-90412',
    timestamp: '2026-08-30T11:42:15Z',
    documentName: 'mit_sem6_transcript_rohan_sharma.pdf',
    documentType: 'marksheet',
    documentCategory: 'educational',
    riskScore: 87,
    status: 'HIGH RISK',
    tamperingCount: 3,
    validationPassRatio: '1/4 Passed',
    verifiedBy: 'System AI Auditor',
  },
  {
    id: 'VER-2026-88194',
    timestamp: '2026-08-30T10:15:30Z',
    documentName: 'meridia_passport_adrian_vance.png',
    documentType: 'passport',
    documentCategory: 'identity',
    riskScore: 12,
    status: 'LOW RISK',
    tamperingCount: 0,
    validationPassRatio: '4/4 Passed',
    verifiedBy: 'System AI Auditor',
  },
  {
    id: 'VER-2026-77301',
    timestamp: '2026-08-29T16:20:00Z',
    documentName: 'degree_certificate_elena_rostova.png',
    documentType: 'degree_certificate',
    documentCategory: 'educational',
    riskScore: 14,
    status: 'LOW RISK',
    tamperingCount: 0,
    validationPassRatio: '3/3 Passed',
    verifiedBy: 'Security Officer #4',
  },
  {
    id: 'VER-2026-64102',
    timestamp: '2026-08-29T13:05:10Z',
    documentName: 'schengen_tourist_visa_scan.jpg',
    documentType: 'visa',
    documentCategory: 'identity',
    riskScore: 48,
    status: 'MEDIUM RISK',
    tamperingCount: 1,
    validationPassRatio: '3/4 Passed',
    verifiedBy: 'System AI Auditor',
  },
  {
    id: 'VER-2026-51294',
    timestamp: '2026-08-28T09:40:00Z',
    documentName: 'stanford_student_id_card.png',
    documentType: 'college_id',
    documentCategory: 'educational',
    riskScore: 22,
    status: 'LOW RISK',
    tamperingCount: 0,
    validationPassRatio: '3/3 Passed',
    verifiedBy: 'Security Officer #2',
  },
  {
    id: 'VER-2026-40192',
    timestamp: '2026-08-27T18:12:44Z',
    documentName: 'dl_california_driver_lic.jpg',
    documentType: 'driving_license',
    documentCategory: 'identity',
    riskScore: 78,
    status: 'HIGH RISK',
    tamperingCount: 2,
    validationPassRatio: '2/4 Passed',
    verifiedBy: 'System AI Auditor',
  }
];
