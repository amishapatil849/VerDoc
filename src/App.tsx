import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { VerifyView } from './components/VerifyView';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import { AnalysisPipelineModal } from './components/AnalysisPipelineModal';
import { VerificationResult, VerificationRecordSummary, DocumentCategory, DocumentType } from './types';
import { 
  getStoredHistory, 
  getCachedResultById, 
  executeDocumentVerification,
  VerifyDocumentParams 
} from './services/api';
import { Shield, ShieldAlert, Sparkles, AlertCircle, FileCheck2, Cpu } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'verify' | 'history' | 'result'>('dashboard');
  const [history, setHistory] = useState<VerificationRecordSummary[]>([]);
  const [activeResult, setActiveResult] = useState<VerificationResult | null>(null);
  
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<number>(1);
  const [verificationStepLabel, setVerificationStepLabel] = useState<string>('');

  // Load initial history on mount
  useEffect(() => {
    const loadedHistory = getStoredHistory();
    setHistory(loadedHistory);
  }, []);

  const refreshHistory = () => {
    const loadedHistory = getStoredHistory();
    setHistory(loadedHistory);
  };

  // Start verification handler
  const handleStartVerification = async (params: VerifyDocumentParams) => {
    setIsVerifying(true);
    setVerificationStep(1);
    setVerificationStepLabel('Detecting document classification & layout...');

    try {
      const result = await executeDocumentVerification(params, (step, label) => {
        setVerificationStep(step);
        setVerificationStepLabel(label);
      });

      setActiveResult(result);
      refreshHistory();
      setCurrentTab('result');
    } catch (err) {
      console.error('Verification error:', err);
      alert('Verification pipeline error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Direct load demo case
  const handleLoadDemo = async (demoId: 'demo1' | 'demo2' | 'demo3') => {
    setIsVerifying(true);
    setVerificationStep(1);
    setVerificationStepLabel('Loading pre-evaluated forensic dataset...');

    try {
      const result = await executeDocumentVerification({
        documentImage: '',
        demoPresetId: demoId,
      }, (step, label) => {
        setVerificationStep(step);
        setVerificationStepLabel(label);
      });

      setActiveResult(result);
      refreshHistory();
      setCurrentTab('result');
    } catch (e) {
      console.error('Demo load error:', e);
    } finally {
      setIsVerifying(false);
    }
  };

  // Open existing record by ID
  const handleOpenRecord = (id: string) => {
    const record = getCachedResultById(id);
    if (record) {
      setActiveResult(record);
      setCurrentTab('result');
    } else {
      // If full record not in cache, fallback to demo or default
      alert(`Loading record ${id}...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-slate-900 selection:text-emerald-400 font-sans antialiased">
      
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLoadDemo={handleLoadDemo}
        geminiConnected={true}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {currentTab === 'dashboard' && (
          <Dashboard
            history={history}
            onStartVerify={() => setCurrentTab('verify')}
            onOpenRecord={handleOpenRecord}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {currentTab === 'verify' && (
          <VerifyView
            onStartVerification={handleStartVerification}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {currentTab === 'result' && activeResult && (
          <ResultView
            result={activeResult}
            onBackToVerify={() => setCurrentTab('verify')}
            onViewHistory={() => setCurrentTab('history')}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            history={history}
            onOpenRecord={handleOpenRecord}
            onStartVerify={() => setCurrentTab('verify')}
          />
        )}

      </main>

      {/* Progress Verification Modal during active analysis */}
      {isVerifying && (
        <AnalysisPipelineModal
          currentStep={verificationStep}
          currentStepLabel={verificationStepLabel}
        />
      )}

      {/* Sleek Design Footer */}
      <footer className="h-12 bg-white border-t border-slate-200 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between shrink-0 text-[10px] font-medium text-slate-500 gap-2 print:hidden">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">VERDOC SECURITY PLATFORM</span>
          <span className="text-slate-300">|</span>
          <span>STATUS: <span className="text-emerald-600 font-semibold">ONLINE_SYSTEM_ACTIVE</span></span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] text-slate-400">
          <span>GEMINI_VISION_ENGINE</span>
          <span className="w-px h-3 bg-slate-200 hidden sm:inline-block"></span>
          <span className="hidden sm:inline-block">MULTI_MODAL_TAMPER_AUDIT</span>
          <span className="w-px h-3 bg-slate-200"></span>
          <span>LATENCY: 1.2s</span>
        </div>
      </footer>

    </div>
  );
}
