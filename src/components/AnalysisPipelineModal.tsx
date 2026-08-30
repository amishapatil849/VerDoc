import React from 'react';
import { 
  FileSearch, 
  Binary, 
  ShieldAlert, 
  UserCheck, 
  Gauge, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Scan
} from 'lucide-react';

interface AnalysisPipelineModalProps {
  currentStep: number;
  currentStepLabel: string;
}

export const AnalysisPipelineModal: React.FC<AnalysisPipelineModalProps> = ({
  currentStep,
  currentStepLabel,
}) => {
  const steps = [
    { num: 1, name: 'Document Detection', desc: 'Identify type (Passport, ID, Marksheet, Degree)', icon: FileSearch },
    { num: 2, name: 'OCR Extraction', desc: 'Extract identity & educational data fields', icon: Binary },
    { num: 3, name: 'Document Validation', desc: 'Verify chronological, arithmetic & syntax rules', icon: ShieldAlert },
    { num: 4, name: 'Tampering Analysis', desc: 'Inspect fonts, pixel halos, stamps & signatures', icon: Scan },
    { num: 5, name: 'Biometric Face Match', desc: 'Compare portrait against presented person selfie', icon: UserCheck },
    { num: 6, name: 'Composite Risk Scoring', desc: 'Synthesize 0–100 risk score and recommendations', icon: Gauge },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-600" />
            <span>VerDoc AI Screening Pipeline</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">Analyzing Document...</h2>
          <p className="text-xs text-slate-500 font-mono">
            {currentStepLabel || 'Running multi-stage neural verification checks'}
          </p>
        </div>

        {/* Step Progression List */}
        <div className="space-y-2.5">
          {steps.map((step) => {
            const Icon = step.icon;
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isPending = currentStep < step.num;

            return (
              <div
                key={step.num}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-slate-800 bg-slate-50 ring-1 ring-slate-800 shadow-xs'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-slate-100 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#0f172a] text-white animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <div className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : isDone ? 'text-emerald-800' : 'text-slate-500'}`}>
                      {step.num}. {step.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{step.desc}</div>
                  </div>
                </div>

                <div>
                  {isDone && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      COMPLETED
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded border border-slate-300 animate-pulse">
                      PROCESSING
                    </span>
                  )}
                  {isPending && (
                    <span className="text-[10px] font-bold text-slate-400">
                      QUEUED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar Scanner Animation Indicator */}
        <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-[#0f172a] transition-all duration-300 rounded-full"
            style={{ width: `${Math.min((currentStep / 6) * 100, 100)}%` }}
          />
        </div>

      </div>
    </div>
  );
};
