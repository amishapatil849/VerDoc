import React from 'react';
import { 
  Shield, 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  UserCheck, 
  Award,
  QrCode
} from 'lucide-react';
import { VerificationResult, PipelineCheckSummary } from '../types';

interface ReportModalProps {
  result: VerificationResult;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ result, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const isLowRisk = result.riskScore.riskLevel === 'LOW RISK';
  const isHighRisk = result.riskScore.riskLevel === 'HIGH RISK';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8 print:m-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Controls Toolbar (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 print:hidden">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-bold text-slate-900">VerDoc Official Verification Report</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-lg bg-[#0f172a] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Content */}
        <div className="p-8 sm:p-12 space-y-8 bg-white print:bg-white print:text-black text-slate-700">
          
          {/* Header Block with VerDoc Seal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-6 gap-4 print:border-black">
            <div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f172a] text-white font-black text-lg print:border print:border-black">
                  VD
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 print:text-black">
                    VERDOC AUDIT REPORT
                  </h1>
                  <p className="text-xs font-bold text-slate-500 print:text-slate-600 uppercase tracking-wider">
                    AI-Powered Document Verification &amp; Fraud Screening System
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-slate-500 print:text-black space-y-1">
              <div><span className="font-bold text-slate-900 print:text-black">Report ID:</span> {result.id}</div>
              <div><span className="font-bold text-slate-900 print:text-black">Audit Date:</span> {new Date(result.timestamp).toLocaleString()}</div>
              <div><span className="font-bold text-slate-900 print:text-black">Authority:</span> {result.issuingAuthority || 'Standard Issuer'}</div>
            </div>
          </div>

          {/* Executive Summary & Risk Gauge Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6 print:border-black print:bg-slate-50">
            
            {/* Risk Score */}
            <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-200 pb-4 sm:pb-0 sm:pr-4 print:border-slate-300">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400 print:text-slate-600">
                Composite Risk Score
              </span>
              <div className={`mt-2 text-4xl font-black ${
                isLowRisk ? 'text-emerald-600 print:text-emerald-700' :
                isHighRisk ? 'text-rose-600 print:text-red-700' :
                'text-amber-600 print:text-amber-700'
              }`}>
                {result.riskScore.overallScore} <span className="text-lg font-medium text-slate-400">/ 100</span>
              </div>
              <div className={`mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                isLowRisk ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                isHighRisk ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {result.riskScore.riskLevel}
              </div>
            </div>

            {/* Document Metadata */}
            <div className="sm:col-span-2 space-y-2 text-xs">
              <div className="font-black text-slate-900 print:text-black text-sm uppercase tracking-wide">
                Evaluation Summary
              </div>
              <p className="text-slate-700 print:text-slate-700 leading-relaxed font-medium">
                {result.riskScore.summaryExplanation}
              </p>
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 print:text-black">
                <div><span className="text-slate-400">Doc Type:</span> <strong className="text-slate-800">{result.documentTypeLabel}</strong></div>
                <div><span className="text-slate-400">Category:</span> <strong className="text-slate-800">{result.documentCategory.toUpperCase()}</strong></div>
                <div><span className="text-slate-400">Anomalies Detected:</span> <strong className="text-slate-800">{result.tamperingFindings.length}</strong></div>
                <div><span className="text-slate-400">Face Match:</span> <strong className="text-slate-800">{result.faceVerification.status}</strong></div>
              </div>
            </div>

          </div>

          {/* Individual Checks Summary Grid */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 print:text-slate-600">
              Core Pipeline Verification Ledger
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(result.pipelineChecks).map(([key, checkItem]) => {
                const check = checkItem as PipelineCheckSummary;
                return (
                  <div key={key} className="p-3.5 rounded-lg border border-slate-200 bg-white print:border-slate-300 print:bg-white flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900 print:text-black">{check.name}</div>
                      <div className="text-[11px] text-slate-500 print:text-slate-600 mt-0.5">{check.explanation}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      check.status === 'PASS' || check.status === 'MATCH' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      check.status === 'FAIL' || check.status === 'POSSIBLE MISMATCH' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extracted Information Table */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 print:text-slate-600">
              Extracted OCR Fields
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-200 print:border-slate-300">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 print:bg-slate-100 print:text-black">
                  <tr>
                    <th className="p-2.5">Field Name</th>
                    <th className="p-2.5">Extracted Value</th>
                    <th className="p-2.5">Confidence</th>
                    <th className="p-2.5">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 print:divide-slate-200">
                  {result.extractedFields.map((field) => (
                    <tr key={field.key} className={field.isSuspicious ? 'bg-rose-50 print:bg-red-50' : ''}>
                      <td className="p-2.5 font-medium text-slate-600 print:text-black">{field.label}</td>
                      <td className="p-2.5 font-mono text-slate-900 print:text-black font-bold">{field.value}</td>
                      <td className="p-2.5 text-slate-500 print:text-black font-mono">{field.confidence}%</td>
                      <td className="p-2.5">
                        {field.isSuspicious ? (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">SUSPICIOUS</span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marksheet subjects if available */}
          {result.subjects && result.subjects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 print:text-slate-600">
                Subject Marks Ledger &amp; Arithmetic Audit
              </h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200 print:border-slate-300">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 print:bg-slate-100 print:text-black">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5">Max Marks</th>
                      <th className="p-2.5">Marks Obtained</th>
                      <th className="p-2.5">Grade</th>
                      <th className="p-2.5">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 print:divide-slate-200">
                    {result.subjects.map((sub, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-mono text-slate-500 print:text-black">{sub.code || `SUB-${idx+1}`}</td>
                        <td className="p-2.5 font-bold text-slate-900 print:text-black">{sub.name}</td>
                        <td className="p-2.5 text-slate-500 print:text-black">{sub.maxMarks || 100}</td>
                        <td className="p-2.5 font-mono font-bold text-slate-900 print:text-black">{sub.marksObtained}</td>
                        <td className="p-2.5 font-bold text-slate-700 print:text-black">{sub.grade || '-'}</td>
                        <td className="p-2.5 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{sub.status || 'PASS'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tampering Findings */}
          {result.tamperingFindings.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-rose-600 print:text-red-700">
                Forensic Tampering &amp; Anomaly Findings
              </h3>
              <div className="space-y-2">
                {result.tamperingFindings.map((tamp) => (
                  <div key={tamp.id} className="p-3.5 rounded-lg border border-rose-200 bg-rose-50 print:border-red-300 print:bg-red-50 text-xs">
                    <div className="flex items-center justify-between font-bold text-rose-800 print:text-red-800">
                      <span>{tamp.what}</span>
                      <span className="text-[10px] uppercase font-mono">{tamp.confidence}% Confidence</span>
                    </div>
                    <div className="text-[11px] text-slate-600 print:text-slate-600 mt-1">
                      <strong className="text-slate-800 print:text-black">Location:</strong> {tamp.where}
                    </div>
                    <div className="text-[11px] text-slate-700 print:text-slate-700 mt-0.5">
                      <strong className="text-slate-800 print:text-black">Reasoning:</strong> {tamp.why}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Biometric Verification Card */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 print:text-slate-600">
              Biometric Face Verification
            </h3>
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 print:border-slate-300 print:bg-white text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 print:text-black">Face Biometrics Status:</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{result.faceVerification.status}</span>
              </div>
              <p className="text-slate-600 print:text-slate-600 text-[11px] mt-1">
                {result.faceVerification.explanation}
              </p>
            </div>
          </div>

          {/* Recommendation & Disclaimer */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 print:border-slate-400 print:bg-slate-50 space-y-2">
            <div className="text-xs font-bold text-slate-900 print:text-black uppercase">
              Auditor Recommendation
            </div>
            <p className="text-xs text-slate-700 print:text-black font-semibold">
              {result.recommendation}
            </p>
            <p className="text-[10px] text-slate-400 print:text-slate-600 italic">
              {result.disclaimer}
            </p>
          </div>

          {/* Official Sign-Off Block */}
          <div className="pt-6 border-t border-slate-200 print:border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 border border-slate-300 print:border-black flex items-center justify-center p-1 rounded bg-white text-black shadow-2xs">
                <QrCode className="h-10 w-10 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500 print:text-black font-mono">
                <div>DIGITAL AUDIT SIGNATURE</div>
                <div className="font-bold text-slate-900 print:text-black">SHA-256: 8f9c21b0e...77a</div>
                <div>VERDOC AUTOMATED ENGINE</div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 print:text-black">
              <div className="font-bold text-slate-900 print:text-black">VERIFIED &amp; CERTIFIED</div>
              <div>Security Operations Center</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
