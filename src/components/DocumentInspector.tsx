import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Eye, 
  Info, 
  Sparkles 
} from 'lucide-react';
import { TamperingFinding, ExtractedField, BoundingBox } from '../types';

interface DocumentInspectorProps {
  documentImage: string;
  documentName: string;
  tamperingFindings: TamperingFinding[];
  extractedFields: ExtractedField[];
  selectedAnomalyId?: string | null;
  onSelectAnomaly?: (id: string | null) => void;
}

export const DocumentInspector: React.FC<DocumentInspectorProps> = ({
  documentImage,
  documentName,
  tamperingFindings,
  extractedFields,
  selectedAnomalyId,
  onSelectAnomaly,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeLayer, setActiveLayer] = useState<'all' | 'tampering' | 'clean'>('all');
  const [isMagnifierActive, setIsMagnifierActive] = useState<boolean>(false);
  const [magnifierPos, setMagnifierPos] = useState<{ x: number; y: number; relX: number; relY: number }>({
    x: 0,
    y: 0,
    relX: 0,
    relY: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x / rect.width) * 100;
    const relY = (y / rect.height) * 100;

    setMagnifierPos({ x, y, relX, relY });
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.75), 2.5));
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col shadow-sm">
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 gap-2">
        
        {/* Left: Document info & active anomalies count */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-emerald-600" />
            <span>Document Forensic Canvas</span>
          </span>
          {tamperingFindings.length > 0 ? (
            <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{tamperingFindings.length} Tampering Flags</span>
            </span>
          ) : (
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              No Tampering Flags
            </span>
          )}
        </div>

        {/* Right: Layer Controls & Magnifier Toggle */}
        <div className="flex items-center space-x-2">
          
          {/* Layer toggles */}
          <div className="flex items-center rounded-lg bg-slate-200/70 p-0.5 text-xs text-slate-600">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                activeLayer === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              All Overlays
            </button>
            <button
              onClick={() => setActiveLayer('tampering')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                activeLayer === 'tampering' ? 'bg-rose-600 text-white shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Anomalies Only
            </button>
            <button
              onClick={() => setActiveLayer('clean')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                activeLayer === 'clean' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Clean Raw
            </button>
          </div>

          {/* Magnifier loupe button */}
          <button
            onClick={() => setIsMagnifierActive(!isMagnifierActive)}
            title="Toggle Forensic Magnifier Loupe"
            className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 cursor-pointer transition-colors ${
              isMagnifierActive
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px] font-bold">Loupe</span>
          </button>

          {/* Zoom In/Out */}
          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <button
              onClick={() => handleZoom(-0.25)}
              className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-700 w-9 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.25)}
              className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Canvas / Image Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex-1 min-h-[380px] max-h-[500px] overflow-auto bg-[#0f172a] flex items-center justify-center p-4 select-none cursor-crosshair"
      >
        <div 
          className="relative inline-block transition-transform duration-100 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Main Document Image */}
          <img
            src={documentImage}
            alt={documentName}
            className="max-h-[440px] w-auto object-contain rounded shadow-2xl pointer-events-none"
          />

          {/* Tampering Bounding Boxes Overlay */}
          {activeLayer !== 'clean' && tamperingFindings.map((finding) => {
            if (!finding.boundingBox) return null;
            const isSelected = selectedAnomalyId === finding.id;
            const topPct = (finding.boundingBox.ymin / 1000) * 100;
            const leftPct = (finding.boundingBox.xmin / 1000) * 100;
            const heightPct = ((finding.boundingBox.ymax - finding.boundingBox.ymin) / 1000) * 100;
            const widthPct = ((finding.boundingBox.xmax - finding.boundingBox.xmin) / 1000) * 100;

            return (
              <div
                key={finding.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAnomaly?.(isSelected ? null : finding.id);
                }}
                style={{
                  top: `${topPct}%`,
                  left: `${leftPct}%`,
                  height: `${Math.max(heightPct, 4)}%`,
                  width: `${Math.max(widthPct, 4)}%`,
                }}
                className={`absolute z-20 cursor-pointer rounded transition-all ${
                  isSelected
                    ? 'border-2 border-rose-500 bg-rose-500/30 ring-4 ring-rose-500/40 animate-pulse'
                    : 'border-2 border-rose-500/80 bg-rose-500/20 hover:bg-rose-500/40'
                }`}
              >
                {/* Badge Tag */}
                <div className="absolute -top-5 left-0 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md whitespace-nowrap pointer-events-none flex items-center gap-1">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  <span>{finding.confidence}% {finding.severity}</span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Forensic Magnifier Loupe Circle */}
        {isMagnifierActive && (
          <div
            className="pointer-events-none absolute z-30 h-36 w-36 rounded-full border-2 border-emerald-400 bg-slate-950 shadow-2xl overflow-hidden ring-4 ring-emerald-500/20"
            style={{
              top: `${magnifierPos.y - 72}px`,
              left: `${magnifierPos.x - 72}px`,
              backgroundImage: `url(${documentImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${magnifierPos.relX}% ${magnifierPos.relY}%`,
              backgroundSize: `${(zoomLevel * 300)}%`,
            }}
          >
            {/* Loupe crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-px bg-emerald-400/40" />
              <div className="w-full h-px bg-emerald-400/40 absolute" />
            </div>
            <div className="absolute bottom-1 right-2 text-[9px] font-mono text-emerald-300 font-bold bg-slate-900/90 px-1 rounded">
              3x
            </div>
          </div>
        )}

      </div>

      {/* Bottom Forensic Legend */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded bg-rose-500 border border-rose-600" />
            <span className="text-slate-700">Tampering / Manipulation Marker</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded bg-emerald-500 border border-emerald-600" />
            <span className="text-slate-700">Standard Verified Zone</span>
          </span>
        </div>
        <div className="text-[10px] text-slate-400">
          Click any anomaly pin to zoom &amp; inspect forensic justification.
        </div>
      </div>

    </div>
  );
};
