import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  AlertCircle, 
  Check, 
  Trash2, 
  GraduationCap, 
  BookUser,
  Stamp,
  CreditCard,
  Car,
  FileCheck,
  FileSpreadsheet,
  Award,
  ScrollText,
  Shield,
  FileBadge
} from 'lucide-react';
import { DocumentCategory, DocumentType } from '../types';
import { DOCUMENT_TYPE_CONFIGS } from '../data/documentTypes';
import { GENUINE_PASSPORT_SVG, TAMPERED_MARKSHEET_SVG, GENUINE_DEGREE_SVG, SAMPLE_MATCHING_SELFIE, SAMPLE_MISMATCHING_SELFIE } from '../data/sampleImages';

interface VerifyViewProps {
  onStartVerification: (params: {
    documentImage: string;
    secondFaceImage?: string;
    selectedCategory: DocumentCategory;
    selectedType: DocumentType;
    documentName: string;
    fileSize: string;
    demoPresetId?: 'demo1' | 'demo2' | 'demo3';
  }) => void;
  onLoadDemo: (demoId: 'demo1' | 'demo2' | 'demo3') => void;
}

export const VerifyView: React.FC<VerifyViewProps> = ({
  onStartVerification,
  onLoadDemo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('identity');
  const [selectedType, setSelectedType] = useState<DocumentType>('passport');
  
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  
  const [enableFaceVerification, setEnableFaceVerification] = useState<boolean>(false);
  const [secondFaceImage, setSecondFaceImage] = useState<string | null>(null);
  
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraTarget, setCameraTarget] = useState<'document' | 'face'>('document');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selfieInputRef = useRef<HTMLInputElement | null>(null);

  // Filter types by selected category
  const filteredTypes = DOCUMENT_TYPE_CONFIGS.filter(t => t.category === selectedCategory);

  const handleCategoryChange = (cat: DocumentCategory) => {
    setSelectedCategory(cat);
    const firstType = DOCUMENT_TYPE_CONFIGS.find(t => t.category === cat);
    if (firstType) {
      setSelectedType(firstType.id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentName(file.name);
      setFileSize(`${Math.round(file.size / 1024)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocumentImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSecondFaceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setDocumentName(file.name);
      setFileSize(`${Math.round(file.size / 1024)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocumentImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Webcam capture functions
  const startCamera = async (target: 'document' | 'face') => {
    setCameraTarget(target);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: target === 'document' ? 'environment' : 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      alert('Camera access could not be established. Please upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        if (cameraTarget === 'document') {
          setDocumentImage(dataUrl);
          setDocumentName(`camera_document_${Date.now()}.png`);
          setFileSize('480 KB');
        } else {
          setSecondFaceImage(dataUrl);
          setEnableFaceVerification(true);
        }
      }
    }
    stopCamera();
  };

  // Sample quick loaders
  const loadPresetTemplate = (type: 'passport' | 'marksheet' | 'degree') => {
    if (type === 'passport') {
      setSelectedCategory('identity');
      setSelectedType('passport');
      setDocumentImage(GENUINE_PASSPORT_SVG);
      setDocumentName('sample_genuine_passport.svg');
      setFileSize('420 KB');
      setEnableFaceVerification(true);
      setSecondFaceImage(SAMPLE_MATCHING_SELFIE);
    } else if (type === 'marksheet') {
      setSelectedCategory('educational');
      setSelectedType('marksheet');
      setDocumentImage(TAMPERED_MARKSHEET_SVG);
      setDocumentName('sample_mit_transcript_tampered.svg');
      setFileSize('580 KB');
      setEnableFaceVerification(false);
      setSecondFaceImage(null);
    } else if (type === 'degree') {
      setSelectedCategory('educational');
      setSelectedType('degree_certificate');
      setDocumentImage(GENUINE_DEGREE_SVG);
      setDocumentName('sample_university_degree.svg');
      setFileSize('510 KB');
      setEnableFaceVerification(false);
      setSecondFaceImage(null);
    }
  };

  const handleSubmit = () => {
    if (!documentImage) {
      alert('Please upload or capture a document to verify.');
      return;
    }

    onStartVerification({
      documentImage,
      secondFaceImage: enableFaceVerification && secondFaceImage ? secondFaceImage : undefined,
      selectedCategory,
      selectedType,
      documentName: documentName || 'uploaded_document.png',
      fileSize: fileSize || '350 KB',
    });
  };

  const getDocTypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookUser': return <BookUser className="h-4 w-4" />;
      case 'Stamp': return <Stamp className="h-4 w-4" />;
      case 'CreditCard': return <CreditCard className="h-4 w-4" />;
      case 'Car': return <Car className="h-4 w-4" />;
      case 'FileCheck': return <FileCheck className="h-4 w-4" />;
      case 'GraduationCap': return <GraduationCap className="h-4 w-4" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="h-4 w-4" />;
      case 'Award': return <Award className="h-4 w-4" />;
      case 'ScrollText': return <ScrollText className="h-4 w-4" />;
      case 'FileBadge': return <FileBadge className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Verify Document</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Upload any identity credential or educational document for OCR extraction, tampering analysis, and risk scoring.
        </p>
      </div>

      {/* Demo Quick Samples Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-xs font-semibold text-slate-700">
            Need a test document? Load realistic sample templates:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => loadPresetTemplate('passport')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
          >
            Sample Passport
          </button>
          <button
            type="button"
            onClick={() => loadPresetTemplate('marksheet')}
            className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Tampered Marksheet
          </button>
          <button
            type="button"
            onClick={() => loadPresetTemplate('degree')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
          >
            University Degree
          </button>
        </div>
      </div>

      {/* STEP 1: Category Selection */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
          Step 1: Select Document Category
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Identity & Travel */}
          <button
            type="button"
            onClick={() => handleCategoryChange('identity')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedCategory === 'identity'
                ? 'border-slate-900 bg-[#0f172a] text-white shadow-md'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-lg ${selectedCategory === 'identity' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'}`}>
                <BookUser className="h-5 w-5" />
              </div>
              <div>
                <div className={`font-bold text-sm ${selectedCategory === 'identity' ? 'text-white' : 'text-slate-900'}`}>
                  Identity &amp; Travel Documents
                </div>
                <div className={`text-xs ${selectedCategory === 'identity' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Passports, Visas, National IDs, Driving Licenses
                </div>
              </div>
            </div>
          </button>

          {/* College & Educational */}
          <button
            type="button"
            onClick={() => handleCategoryChange('educational')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedCategory === 'educational'
                ? 'border-slate-900 bg-[#0f172a] text-white shadow-md'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-lg ${selectedCategory === 'educational' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'}`}>
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className={`font-bold text-sm ${selectedCategory === 'educational' ? 'text-white' : 'text-slate-900'}`}>
                  College &amp; Educational Documents
                </div>
                <div className={`text-xs ${selectedCategory === 'educational' ? 'text-slate-300' : 'text-slate-500'}`}>
                  College IDs, Marksheets, Degree Certificates, Diplomas
                </div>
              </div>
            </div>
          </button>

        </div>
      </div>

      {/* STEP 2: Document Type Selector */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
          Step 2: Select Document Type
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {filteredTypes.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={isSelected ? 'text-emerald-400' : 'text-slate-500'}>
                    {getDocTypeIcon(type.iconName)}
                  </span>
                  <span className="font-bold text-xs">{type.name}</span>
                </div>
                <span className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {type.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Document Upload & Preview */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
          Step 3: Upload Document Image or Scan
        </label>

        {!documentImage ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-slate-400 hover:bg-slate-50/50 transition-all shadow-xs"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf,.svg"
              className="hidden"
            />

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 mb-3">
              <Upload className="h-6 w-6 text-slate-700" />
            </div>

            <h3 className="text-sm font-bold text-slate-900">Upload document file</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Drag and drop PNG, JPG, PDF, or SVG files here, or browse from your device.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-[#0f172a] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                Browse File
              </button>

              <button
                type="button"
                onClick={() => startCamera('document')}
                className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Camera className="h-4 w-4 text-slate-500" />
                <span>Use Live Camera</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">{documentName}</span>
                <span className="text-[10px] text-slate-400 font-mono">({fileSize})</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDocumentImage(null);
                  setDocumentName('');
                  setFileSize('');
                }}
                className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex justify-center bg-slate-50 rounded-lg p-3 overflow-hidden border border-slate-200 max-h-80">
              <img
                src={documentImage}
                alt="Document preview"
                className="max-h-72 object-contain rounded shadow-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* STEP 4: Optional Biometric Face Match (Presented Subject Selfie) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <UserCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">Biometric Face Verification (Optional)</div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Compare document photo against live presented subject image
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enableFaceVerification}
              onChange={(e) => setEnableFaceVerification(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {enableFaceVerification && (
          <div className="pt-3 border-t border-slate-100">
            <input
              type="file"
              ref={selfieInputRef}
              onChange={handleSelfieUpload}
              accept="image/*"
              className="hidden"
            />

            {!secondFaceImage ? (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200 gap-4">
                <div className="text-xs text-slate-700">
                  <div className="font-bold text-slate-900">Present comparison subject photo</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Take a live camera selfie or upload a frontal portrait photo of the person presenting the document.
                  </p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => startCamera('face')}
                    className="flex items-center space-x-1 rounded-lg bg-[#0f172a] px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>Take Selfie</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => selfieInputRef.current?.click()}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={secondFaceImage}
                    alt="Comparison Selfie"
                    className="h-12 w-12 rounded-lg object-cover border border-slate-300 shadow-xs"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Presented Subject Image Attached</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">Ready for biometric comparison</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSecondFaceImage(null)}
                  className="text-slate-400 hover:text-rose-600 p-1 text-xs cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Camera Modal Overlay */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] text-white p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {cameraTarget === 'document' ? 'Capture Document Snapshot' : 'Take Comparison Selfie'}
              </h3>
              <button
                type="button"
                onClick={stopCamera}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-4 border-2 border-emerald-400/50 rounded-lg pointer-events-none" />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={captureSnapshot}
                className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5 text-slate-950" />
                <span>Capture Frame</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Action */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Shield className="h-4 w-4 text-emerald-600" />
          <span>OCR extraction, tampering analysis, and risk scoring will be generated.</span>
        </div>

        <button
          type="button"
          id="submit-verify-button"
          onClick={handleSubmit}
          disabled={!documentImage}
          className={`flex items-center space-x-2 rounded-lg px-6 py-3 text-sm font-bold shadow-md transition-all ${
            documentImage
              ? 'bg-[#0f172a] hover:bg-slate-800 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>Start AI Verification Pipeline</span>
        </button>
      </div>

    </div>
  );
};
