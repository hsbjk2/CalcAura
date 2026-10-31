import React, { useState } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  FileImage,
  FileCode,
  Printer,
  FolderArchive,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Sheet, Notebook } from './types.ts';
import {
  exportSheetAsPNG,
  exportSheetAsJPG,
  exportSheetAsSVG,
  printNotebook,
  exportNotebookJSON,
  sanitizeFileName
} from './exportUtils.ts';
import { whiteboardSounds } from './soundEffects.ts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSheet: Sheet;
  notebook: Notebook;
}

type ExportFormat = 'png' | 'jpg' | 'transparent-png' | 'svg' | 'pdf' | 'json';
type ExportState = 'idle' | 'generating' | 'success' | 'error';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  activeSheet,
  notebook,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [exportScope, setExportScope] = useState<'current' | 'all'>('current');
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [downloadedFileName, setDownloadedFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const currentBoardTitle = notebook.name || 'CalcAura Whiteboard';
  const safeTitle = sanitizeFileName(currentBoardTitle);

  // Computed preview filename
  const previewFileName =
    selectedFormat === 'pdf'
      ? `${safeTitle}.pdf`
      : selectedFormat === 'svg'
      ? `${safeTitle}.svg`
      : selectedFormat === 'jpg'
      ? `${safeTitle}.jpg`
      : selectedFormat === 'json'
      ? `${safeTitle}_backup.json`
      : `${safeTitle}.png`;

  const handleStartExport = async () => {
    setExportState('generating');
    setErrorMessage('');
    whiteboardSounds.playTapSound();

    try {
      // Small graceful pause so user perceives the preparation state
      await new Promise((r) => setTimeout(r, 400));

      let resultFileName = previewFileName;

      if (selectedFormat === 'png') {
        resultFileName = await exportSheetAsPNG(activeSheet, currentBoardTitle, false);
      } else if (selectedFormat === 'jpg') {
        resultFileName = await exportSheetAsJPG(activeSheet, currentBoardTitle);
      } else if (selectedFormat === 'transparent-png') {
        resultFileName = await exportSheetAsPNG(activeSheet, currentBoardTitle, true);
      } else if (selectedFormat === 'svg') {
        resultFileName = await exportSheetAsSVG(activeSheet, currentBoardTitle);
      } else if (selectedFormat === 'pdf') {
        resultFileName = await printNotebook(notebook);
      } else if (selectedFormat === 'json') {
        resultFileName = await exportNotebookJSON(notebook);
      }

      setDownloadedFileName(resultFileName);
      setExportState('success');
      whiteboardSounds.playPopSound();
    } catch (err: any) {
      console.error('Export error', err);
      setErrorMessage(err?.message || 'Could not complete export. Please try again.');
      setExportState('error');
    }
  };

  const handleReset = () => {
    setExportState('idle');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- STATE 1: IDLE / CONFIGURING --- */}
        {exportState === 'idle' && (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[#7957F5] flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Export Board
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Save your drawing or mathematical notebook
                </p>
              </div>
            </div>

            {/* Board Title Preview */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Export Filename
              </span>
              <span className="text-sm font-bold font-mono text-[#7957F5] dark:text-purple-300 truncate block mt-0.5">
                {previewFileName}
              </span>
            </div>

            {/* Format Selection Grid */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Choose Format
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    id: 'png',
                    title: 'High-Res PNG',
                    desc: 'Crisp image of current sheet',
                    icon: FileImage,
                    badge: '2x Scale',
                  },
                  {
                    id: 'jpg',
                    title: 'JPEG Image',
                    desc: 'High-quality compressed JPG',
                    icon: FileImage,
                    badge: 'Photo',
                  },
                  {
                    id: 'transparent-png',
                    title: 'Transparent PNG',
                    desc: 'Alpha background without canvas paper',
                    icon: Sparkles,
                    badge: 'Alpha',
                  },
                  {
                    id: 'svg',
                    title: 'Vector SVG',
                    desc: 'Scalable paths and shapes',
                    icon: FileCode,
                    badge: 'Vector',
                  },
                  {
                    id: 'pdf',
                    title: 'Print / Multi-Page PDF',
                    desc: 'All notebook sheets in sequence',
                    icon: Printer,
                    badge: `${notebook.sheets.length} Sheets`,
                  },
                ].map((fmt) => {
                  const Icon = fmt.icon;
                  const isSelected = selectedFormat === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => {
                        whiteboardSounds.playTapSound();
                        setSelectedFormat(fmt.id as ExportFormat);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#7957F5]/10 dark:bg-[#7957F5]/20 border-[#7957F5] ring-2 ring-[#7957F5]/30'
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#7957F5]' : 'text-slate-400'}`} />
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                          {fmt.badge}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-white">
                          {fmt.title}
                        </span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {fmt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Backup Notebook Option */}
              <button
                onClick={() => {
                  whiteboardSounds.playTapSound();
                  setSelectedFormat('json');
                }}
                className={`w-full mt-2 p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedFormat === 'json'
                    ? 'bg-[#7957F5]/10 dark:bg-[#7957F5]/20 border-[#7957F5] ring-2 ring-[#7957F5]/30'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderArchive className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-white">
                      Complete Notebook Backup (.JSON)
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                      Preserves all vector strokes, KaTeX equations, and multiple sheets
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Backup
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleStartExport}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-98 text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        )}

        {/* --- STATE 2: GENERATING (Indeterminate loading animation) --- */}
        {exportState === 'generating' && (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in">
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-[#7957F5] animate-spin" />
              <Download className="w-6 h-6 text-[#7957F5] animate-pulse" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Preparing your export...
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              Rendering high-resolution vector strokes and mathematical objects
            </p>
            {/* Indeterminate progress bar */}
            <div className="w-48 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full mt-4 overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#7957F5] to-[#D94BCB] w-24 rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* --- STATE 3: SUCCESS (Only shown after real browser download initiation) --- */}
        {exportState === 'success' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 mb-4 animate-[bounce_0.6s_ease-out]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Your board is ready.
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              <strong className="text-[#7957F5] dark:text-purple-300 font-mono">
                {downloadedFileName}
              </strong>{' '}
              downloaded successfully.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-98 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                Continue Working
              </button>
            </div>
          </div>
        )}

        {/* --- STATE 4: ERROR --- */}
        {exportState === 'error' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-3">
              <AlertCircle className="w-7 h-7" />
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Export Failed
            </h4>
            <p className="text-xs text-rose-500 mt-1 max-w-xs">{errorMessage}</p>

            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#7957F5] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
