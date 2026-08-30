import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck2, 
  Search, 
  ArrowUpRight, 
  FileText, 
  Sparkles, 
  Clock, 
  Eye, 
  CheckCircle, 
  GraduationCap, 
  BookUser,
  Activity
} from 'lucide-react';
import { VerificationRecordSummary } from '../types';

interface DashboardProps {
  history: VerificationRecordSummary[];
  onStartVerify: () => void;
  onOpenRecord: (id: string) => void;
  onLoadDemo: (demoId: 'demo1' | 'demo2' | 'demo3') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  history,
  onStartVerify,
  onOpenRecord,
  onLoadDemo,
}) => {
  const totalChecked = history.length;
  const lowRiskCount = history.filter(h => h.status === 'LOW RISK').length;
  const mediumRiskCount = history.filter(h => h.status === 'MEDIUM RISK').length;
  const highRiskCount = history.filter(h => h.status === 'HIGH RISK').length;

  const identityCount = history.filter(h => h.documentCategory === 'identity').length;
  const educationalCount = history.filter(h => h.documentCategory === 'educational').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner / Hero Overview */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-md text-white">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <Activity className="h-3.5 w-3.5" />
            <span>AI-Assisted Screening &amp; Tamper Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Document Verification &amp; Fraud Detection
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Screen passports, visas, national IDs, and educational certificates for digital tampering, 
            font manipulation, arithmetic discrepancies, and biometric face match.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              id="dashboard-start-verification-btn"
              onClick={onStartVerify}
              className="flex items-center space-x-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-all cursor-pointer"
            >
              <FileCheck2 className="h-4 w-4 text-slate-950" />
              <span>Verify New Document</span>
            </button>

            <button
              id="dashboard-launch-demo-btn"
              onClick={() => onLoadDemo('demo2')}
              className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Load High-Risk Demo Case</span>
            </button>
          </div>
        </div>

        {/* Decorative subtle gradient */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Checked */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Total Checked</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900">{totalChecked}</span>
            <span className="text-xs text-slate-500">audits logged</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
            <span className="text-emerald-700 font-semibold">{identityCount} Identity</span>
            <span>•</span>
            <span className="text-slate-700 font-semibold">{educationalCount} Educational</span>
          </div>
        </div>

        {/* Verified Documents (Low Risk) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Verified (Low Risk)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-600">{lowRiskCount}</span>
            <span className="text-xs text-slate-500">
              ({totalChecked ? Math.round((lowRiskCount / totalChecked) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium">
            Score 0 – 30 • Authentic documents
          </div>
        </div>

        {/* In Review (Medium Risk) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Manual Review</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-amber-600">{mediumRiskCount}</span>
            <span className="text-xs text-slate-500">
              ({totalChecked ? Math.round((mediumRiskCount / totalChecked) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-medium">
            Score 31 – 70 • Secondary checks needed
          </div>
        </div>

        {/* High Risk (Flagged) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">High Risk (Flagged)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-rose-600">{highRiskCount}</span>
            <span className="text-xs text-slate-500">
              ({totalChecked ? Math.round((highRiskCount / totalChecked) * 100) : 0}%)
            </span>
          </div>
          <div className="mt-2 text-[11px] text-rose-700 font-medium">
            Score 71 – 100 • Critical anomalies
          </div>
        </div>

      </div>

      {/* Categories Showcase & Quick Scenarios */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Category A: Identity & Travel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                <BookUser className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Identity &amp; Travel Documents</h2>
                <span className="text-[11px] text-slate-500">Passports, Visas, National IDs, Driving Licenses</span>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>ICAO Doc 9303 MRZ line &amp; checksum verification</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Guilloche wave pattern &amp; ghost photo integrity</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Biometric face matching with presented selfie</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onStartVerify}
            className="mt-5 inline-flex items-center justify-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            <span>Scan Identity Document</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category B: College & Educational */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                <GraduationCap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">College &amp; Educational Documents</h2>
                <span className="text-[11px] text-slate-500">Marksheets, Degrees, Diplomas, Bonafide IDs</span>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Marksheet arithmetic total, percentage &amp; CGPA audit</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Font substitution &amp; score alteration patch detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Copied digital stamps &amp; signatory forensics</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onStartVerify}
            className="mt-5 inline-flex items-center justify-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            <span>Scan Educational Document</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick Demo Launchers */}
        <div className="bg-[#1e293b] text-white rounded-xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <Sparkles className="h-4 w-4" />
              <h2 className="text-sm font-bold text-white">Interactive Evaluation</h2>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Test the end-to-end verification pipeline immediately with pre-loaded scenarios.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onLoadDemo('demo1')}
                className="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-400">Demo 1: Genuine Passport</div>
                  <div className="text-[10px] text-slate-400">Clean biometric page (12/100)</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={() => onLoadDemo('demo2')}
                className="w-full text-left p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-rose-400">Demo 2: Tampered Marksheet</div>
                  <div className="text-[10px] text-slate-400">Altered marks &amp; math discrepancy (87/100)</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
              </button>

              <button
                onClick={() => onLoadDemo('demo3')}
                className="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-400">Demo 3: Degree Certificate</div>
                  <div className="text-[10px] text-slate-400">Authentic University Parchment (14/100)</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Verification Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Audit Stream</h2>
            <p className="text-base font-bold text-slate-900">Recent Verification Activity</p>
          </div>
          <button
            onClick={onStartVerify}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Upload Document</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-bold">Audit ID</th>
                <th className="px-4 py-3 font-bold">Document Name &amp; Type</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Risk Score</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Tampering</th>
                <th className="px-4 py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.slice(0, 6).map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => onOpenRecord(item.id)}
                >
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{item.documentName}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">{item.documentType.replace('_', ' ')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold ${
                      item.documentCategory === 'identity'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {item.documentCategory === 'identity' ? 'Identity' : 'Educational'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold">
                    <span className={
                      item.riskScore > 70 ? 'text-rose-600 font-extrabold' :
                      item.riskScore > 30 ? 'text-amber-600 font-extrabold' :
                      'text-emerald-600 font-extrabold'
                    }>
                      {item.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      item.status === 'LOW RISK' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'MEDIUM RISK' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {item.tamperingCount > 0 ? (
                      <span className="text-rose-600 font-bold">{item.tamperingCount} Anomaly</span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">0 Detected</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRecord(item.id);
                      }}
                      className="inline-flex items-center space-x-1 text-slate-700 hover:text-emerald-600 font-bold"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
