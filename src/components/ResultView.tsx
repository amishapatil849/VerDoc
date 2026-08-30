import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  UserCheck, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Layers,
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';
import { VerificationResult, CheckStatus } from '../types';
import { DocumentInspector } from './DocumentInspector';
import { ReportModal } from './ReportModal';

interface ResultViewProps {
  result: VerificationResult;
  onBackToVerify: () => void;
  onViewHistory: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onBackToVerify,
  onViewHistory,
}) => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isLowRisk = result.riskScore.riskLevel === 'LOW RISK';
  const isHighRisk = result.riskScore.riskLevel === 'HIGH RISK';

  const copyToClipboard = (key: string, text: string | number) => {
    navigator.clipboard.writeText(String(text));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStatusBadge = (status: CheckStatus | string) => {
    switch (status) {
      case 'PASS':
      case 'MATCH':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>{status}</span>
          </span>
        );
      case 'FAIL':
      case 'POSSIBLE MISMATCH':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700 border border-rose-200">
            <XCircle className="h-3.5 w-3.5 text-rose-600" />
            <span>{status}</span>
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span>{status}</span>
          </span>
        );
      case 'MANUAL REVIEW':
      default:
        return (
          <span className="inline-flex items-center space-x-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 border border-slate-200">
            <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>{status}</span>
          </span>
        );
    }
  };

  // Filter extracted fields
  const filteredFields = result.extractedFields.filter(f => 
    f.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    String(f.value).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToVerify}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Verify Another</span>
          </button>
          
          <div className="text-xs font-mono text-slate-500">
            Audit ID: <span className="font-bold text-slate-900">{result.id}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowReportModal(true)}
            id="generate-report-btn"
            className="flex items-center space-x-2 rounded-lg bg-[#0f172a] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4 text-emerald-400" />
            <span>Generate Verification Report</span>
          </button>
        </div>
      </div>

      {/* Primary Result Banner & Risk Score Gauge */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Left: Overall Risk Score Meter */}
          <div className="flex flex-col items-center lg:items-start justify-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Risk Assessment Index
            </span>

            <div className="mt-3 flex items-baseline space-x-2">
              <span className={`text-5xl sm:text-6xl font-black tracking-tight ${
                isLowRisk ? 'text-emerald-600' :
                isHighRisk ? 'text-rose-600' :
                'text-amber-600'
              }`}>
                {result.riskScore.overallScore}
              </span>
              <span className="text-xl font-medium text-slate-400">/ 100</span>
            </div>

            <div className="mt-3">
              <span className={`inline-flex items-center space-x-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide ${
                isLowRisk ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                isHighRisk ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {isLowRisk && <CheckCircle2 className="h-4 w-4" />}
                {isHighRisk && <AlertTriangle className="h-4 w-4" />}
                <span>{result.riskScore.riskLevel}</span>
              </span>
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              {isLowRisk ? '0–30: Minimal risk anomalies' :
               isHighRisk ? '71–100: Critical anomalies detected' :
               '31–70: Secondary manual audit recommended'}
            </div>
          </div>

          {/* Center & Right: Document metadata & Recommendation */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 border border-slate-200 uppercase">
                  {result.documentCategory}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {result.documentTypeLabel}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Issuing Entity: <span className="text-slate-800 font-bold">{result.issuingAuthority || 'Standard Authority'}</span>
              </p>
            </div>

            {/* AI Auditor Recommendation Box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Auditor Recommendation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {result.recommendation}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              {result.disclaimer}
            </p>
          </div>

        </div>
      </div>

      {/* 5 Individual Pipeline Checks Cards */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
          Individual Verification Checks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* OCR Extraction */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">OCR Extraction</span>
              {getStatusBadge(result.pipelineChecks.ocrExtraction.status)}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-3">
              {result.pipelineChecks.ocrExtraction.explanation}
            </p>
          </div>

          {/* Document Validation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Validation</span>
              {getStatusBadge(result.pipelineChecks.documentValidation.status)}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-3">
              {result.pipelineChecks.documentValidation.explanation}
            </p>
          </div>

          {/* Tampering Analysis */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Tampering</span>
              {getStatusBadge(result.pipelineChecks.tamperingAnalysis.status)}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-3">
              {result.pipelineChecks.tamperingAnalysis.explanation}
            </p>
          </div>

          {/* Consistency Check */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Consistency</span>
              {getStatusBadge(result.pipelineChecks.consistencyCheck.status)}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-3">
              {result.pipelineChecks.consistencyCheck.explanation}
            </p>
          </div>

          {/* Face Verification */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Face Biometrics</span>
              {getStatusBadge(result.pipelineChecks.faceVerification.status)}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-3">
              {result.pipelineChecks.faceVerification.explanation}
            </p>
          </div>

        </div>
      </div>

      {/* Main Grid: Document Forensic Inspector (Left) & Tampering Findings (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Document Forensic Inspector Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Interactive Forensic Viewer &amp; Anomaly Overlay
            </h2>
          </div>

          <DocumentInspector
            documentImage={result.documentImage}
            documentName={result.documentName}
            tamperingFindings={result.tamperingFindings}
            extractedFields={result.extractedFields}
            selectedAnomalyId={selectedAnomalyId}
            onSelectAnomaly={(id) => setSelectedAnomalyId(id)}
          />
        </div>

        {/* AI Tampering & Anomaly Findings Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              <span>AI Tampering Findings ({result.tamperingFindings.length})</span>
            </h2>
          </div>

          <div className="flex-1 rounded-xl bg-[#1e293b] text-white p-4 space-y-3 overflow-y-auto max-h-[500px] shadow-sm">
            {result.tamperingFindings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                <ShieldCheck className="h-10 w-10 text-emerald-400" />
                <div className="font-bold text-white text-sm">No Tampering Detected</div>
                <p className="text-xs max-w-xs text-slate-300">
                  Typography, background wave lines, and image compressions appear continuous and authentic.
                </p>
              </div>
            ) : (
              result.tamperingFindings.map((finding) => {
                const isSelected = selectedAnomalyId === finding.id;
                return (
                  <div
                    key={finding.id}
                    onClick={() => setSelectedAnomalyId(isSelected ? null : finding.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500/20 ring-2 ring-rose-500/30'
                        : 'border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                        <span>{finding.what}</span>
                      </span>
                      <span className="rounded bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase">
                        {finding.confidence}% Confidence
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-300">
                      <strong className="text-slate-400">Location:</strong> {finding.where}
                    </div>

                    <div className="mt-1 text-xs text-slate-200 leading-relaxed">
                      <strong className="text-slate-400">Forensic Justification:</strong> {finding.why}
                    </div>

                    {finding.boundingBox && (
                      <div className="mt-2 text-[10px] text-emerald-400 font-medium">
                        {isSelected ? '✓ Highlighted on canvas' : 'Click to highlight coordinate on viewer'}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Marksheet Subject Breakdown (If Available) */}
      {result.subjects && result.subjects.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Subject Marks &amp; Arithmetic Audit</h3>
                <p className="text-xs text-slate-500">Verifies individual subject sum against stated total score</p>
              </div>
            </div>

            {/* Arithmetic check badge */}
            <div className="flex items-center space-x-2">
              {result.validationResults.find(v => v.id.includes('math'))?.status === 'FAIL' ? (
                <span className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                  <span>Arithmetic Discrepancy Flagged</span>
                </span>
              ) : (
                <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Marks Sum Verified</span>
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Code</th>
                  <th className="px-4 py-2.5">Subject Title</th>
                  <th className="px-4 py-2.5 text-center">Max Marks</th>
                  <th className="px-4 py-2.5 text-center">Marks Obtained</th>
                  <th className="px-4 py-2.5 text-center">Grade</th>
                  <th className="px-4 py-2.5 text-center">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.subjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-mono text-slate-500">{sub.code || `SUB-${idx+1}`}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{sub.name}</td>
                    <td className="px-4 py-2.5 text-center text-slate-500">{sub.maxMarks || 100}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-slate-900 font-mono">{sub.marksObtained}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-slate-700">{sub.grade || '-'}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{sub.status || 'PASS'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Extracted OCR Information Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <span>Extracted OCR Data Fields</span>
            </h3>
            <p className="text-xs text-slate-500">Structured field-level optical recognition values and confidence</p>
          </div>

          {/* Search filter input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search extracted fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="px-4 py-3">Field Label</th>
                <th className="px-4 py-3">Extracted Value</th>
                <th className="px-4 py-3">OCR Confidence</th>
                <th className="px-4 py-3">Inspection Status</th>
                <th className="px-4 py-3 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFields.map((field) => (
                <tr key={field.key} className={field.isSuspicious ? 'bg-rose-50/60' : 'hover:bg-slate-50'}>
                  <td className="px-4 py-3 font-semibold text-slate-600">
                    {field.label}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {field.value}
                    {field.notes && (
                      <span className="block text-[10px] text-rose-600 font-normal mt-0.5">{field.notes}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${field.confidence}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-500 text-[11px] font-medium">{field.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {field.isSuspicious ? (
                      <span className="inline-flex rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                        ANOMALY
                      </span>
                    ) : (
                      <span className="inline-flex rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        VERIFIED
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => copyToClipboard(field.key, field.value)}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 cursor-pointer"
                      title="Copy field value"
                    >
                      {copiedKey === field.key ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Biometric Face Verification Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <UserCheck className="h-5 w-5 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">Biometric Face Verification Module</h3>
        </div>

        {result.faceVerification.status === 'UNAVAILABLE' ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 space-y-1">
            <div className="font-bold text-slate-700">Face Verification Unavailable</div>
            <p>{result.faceVerification.explanation}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center rounded-xl border border-slate-200 bg-slate-50 p-4">
            
            {/* Presented Selfie & Status */}
            <div className="flex items-center space-x-4">
              {result.faceVerification.secondFaceImage && (
                <img
                  src={result.faceVerification.secondFaceImage}
                  alt="Presented Subject"
                  className="h-16 w-16 rounded-xl object-cover border border-slate-300 shadow-2xs"
                />
              )}
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold">Match Score</div>
                <div className="text-2xl font-black text-emerald-600">
                  {result.faceVerification.matchScore}%
                </div>
                <div className="mt-1">
                  {getStatusBadge(result.faceVerification.status)}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="md:col-span-2 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900">Biometric Alignment Analysis</div>
              <p className="text-[11px] text-slate-500">{result.faceVerification.explanation}</p>
              {result.faceVerification.biometricNotes && (
                <ul className="text-[10px] text-slate-500 list-disc list-inside pt-1">
                  {result.faceVerification.biometricNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          result={result}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
};
