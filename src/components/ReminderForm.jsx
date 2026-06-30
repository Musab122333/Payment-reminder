import React, { useState } from 'react';
import { toPng } from 'html-to-image';

/**
 * ReminderForm — Premium dark-sidebar panel with form inputs and action buttons.
 * Handles live state updates (no "Generate" click needed for preview) but keeps
 * Generate button per spec. Download uses html-to-image toPng.
 */
const ReminderForm = ({ amount, dueDate, onAmountChange, onDueDateChange, cardRef }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async () => {
    if (!cardRef?.current) return;
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1,
        width: 1500,
        height: 500,
      });
      const link = document.createElement('a');
      link.download = `payment-reminder-${today}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      setDownloadError('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <aside className="flex flex-col h-full bg-[#13151f] border-r border-[#1e2130]">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-6 border-b border-[#1e2130]">
        {/* Zestro wordmark */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#5DAF3E] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-[10px] leading-none">Z</span>
          </div>
          <span className="text-[#5DAF3E] font-bold text-sm tracking-wider uppercase">Zestro</span>
        </div>
        <h1 className="text-white font-semibold text-lg leading-snug mt-3">
          Payment Reminder<br />
          <span className="text-[#5DAF3E]">Generator</span>
        </h1>
        <p className="text-[#5a5f70] text-xs mt-2 leading-relaxed">
          Fill in the details below to generate a professional payment reminder image.
        </p>
      </div>

      {/* ── Form Fields ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2"
          >
            Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF7A00] font-bold text-lg select-none">
              ₹
            </span>
            <input
              type="number"
              id="amount"
              min="0"
              step="1"
              value={amount}
              onChange={(e) => onAmountChange(Number(e.target.value))}
              className="w-full bg-[#1a1d2b] border border-[#2a2d3e] text-white text-lg font-semibold
                         pl-10 pr-4 py-3 rounded-xl
                         focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]/30
                         transition-all duration-200 placeholder-[#3a3d4e]
                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="96700"
            />
          </div>
          <p className="text-[#3a3d4e] text-xs mt-1.5 ml-1">
            Enter amount in Indian Rupees
          </p>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="w-full bg-[#1a1d2b] border border-[#2a2d3e] text-white text-base font-medium
                       px-4 py-3 rounded-xl
                       focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]/30
                       transition-all duration-200
                       [color-scheme:dark]"
          />
          <p className="text-[#3a3d4e] text-xs mt-1.5 ml-1">
            Payment due by this date
          </p>
        </div>

        {/* Preview info badge */}
        <div className="bg-[#1a1d2b] border border-[#1e2130] rounded-xl px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5DAF3E] mt-1.5 flex-shrink-0 animate-pulse" />
            <p className="text-[#4a5060] text-xs leading-relaxed">
              Card preview updates&nbsp;<span className="text-[#5DAF3E] font-medium">live</span> as you type.
              Click <span className="text-white font-medium">Download PNG</span> to save the full-resolution card.
            </p>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ───────────────────────────────────────────── */}
      <div className="px-8 py-7 border-t border-[#1e2130] space-y-3">
        {/* Generate (visual confirmation, preview already live) */}
        <button
          id="generate-btn"
          type="button"
          onClick={() => { }} // Preview is already live; button kept per spec
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm
                     bg-[#1e2130] border border-[#2a2d3e] text-[#8b9098]
                     hover:bg-[#22263a] hover:border-[#FF7A00]/40 hover:text-white
                     active:scale-[0.98]
                     transition-all duration-200 cursor-pointer"
        >
          ✦ Generate Reminder
        </button>

        {/* Download */}
        <button
          id="download-btn"
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white
                     bg-gradient-to-r from-[#FF7A00] to-[#FF9A30]
                     hover:from-[#e86d00] hover:to-[#FF8C10]
                     active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-lg shadow-[#FF7A00]/20
                     transition-all duration-200 cursor-pointer"
        >
          {isDownloading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating PNG…
            </span>
          ) : (
            '↓ Download PNG'
          )}
        </button>

        {/* Error message */}
        {downloadError && (
          <p className="text-[#D32F2F] text-xs text-center mt-1">{downloadError}</p>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div className="px-8 pb-6 text-center">
        <p className="text-[#2a2d3e] text-[10px] tracking-wide">
          ZESTRO FOODS AND GROCERIES · 2026
        </p>
      </div>
    </aside>
  );
};

export default ReminderForm;