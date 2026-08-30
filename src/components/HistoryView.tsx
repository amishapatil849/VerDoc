import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ArrowUpDown,
  BookUser,
  GraduationCap
} from 'lucide-react';
import { VerificationRecordSummary } from '../types';

interface HistoryViewProps {
  history: VerificationRecordSummary[];
  onOpenRecord: (id: string) => void;
  onStartVerify: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onOpenRecord,
  onStartVerify,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Filter records
  const filteredRecords = history.filter((record) => {
    const matchesSearch = 
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.documentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || record.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || record.documentCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `verdoc_verification_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportAsCSV = () => {
    const headers = ['Audit ID', 'Timestamp', 'Document Name', 'Type', 'Category', 'Risk Score', 'Status', 'Tampering Count'];
    const rows = history.map(r => [
      r.id,
      r.timestamp,
      `"${r.documentName}"`,
      r.documentType,
      r.documentCategory,
      r.riskScore,
      r.status,
      r.tamperingCount
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `verdoc_audit_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Verification &amp; Audit History</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Search, filter, and inspect previous AI document fraud screenings and verification logs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportAsCSV}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportAsJSON}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Audit ID, Document Title or Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none shadow-2xs"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-slate-800 focus:outline-none shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW RISK">Low Risk (0-30)</option>
            <option value="MEDIUM RISK">Medium Risk (31-70)</option>
            <option value="HIGH RISK">High Risk (71-100)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-slate-800 focus:outline-none shadow-2xs cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="identity">Identity &amp; Travel</option>
            <option value="educational">College &amp; Educational</option>
          </select>
        </div>

      </div>

      {/* History Records Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="px-4 py-3.5">Audit ID</th>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Document Details</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Risk Score</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Tampering</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-600">No verification records found matching your filters.</p>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onOpenRecord(item.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                      {item.id}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{item.documentName}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{item.documentType.replace('_', ' ')}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center space-x-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                        {item.documentCategory === 'identity' ? (
                          <>
                            <BookUser className="h-3 w-3 mr-1 text-slate-600" />
                            <span>Identity</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-3 w-3 mr-1 text-slate-600" />
                            <span>Educational</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold">
                      <span className={
                        item.riskScore > 70 ? 'text-rose-600 font-extrabold' :
                        item.riskScore > 30 ? 'text-amber-600 font-extrabold' :
                        'text-emerald-600 font-extrabold'
                      }>
                        {item.riskScore} <span className="text-slate-400 font-normal">/ 100</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        item.status === 'LOW RISK' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.status === 'MEDIUM RISK' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {item.tamperingCount > 0 ? (
                        <span className="text-rose-600 font-bold">{item.tamperingCount} Detected</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">0 Flags</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRecord(item.id);
                        }}
                        className="inline-flex items-center space-x-1 rounded-lg bg-[#0f172a] px-2.5 py-1 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
