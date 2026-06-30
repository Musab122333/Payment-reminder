// src/components/ReminderForm.jsx
import { toPng } from 'html-to-image';
import zestroLogo from '../assets/zestro-logo.png';

export default function ReminderForm({
  amount,
  dueDate,
  onAmountChange,
  onDueDateChange,
  cardRef,
}) {
  const handleDownload = async () => {
    if (!cardRef?.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `zestro-reminder-${dueDate}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="flex h-full flex-col p-7 text-white">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5DAF3E] to-[#3a8a26] shadow-[0_4px_16px_-4px_rgba(93,175,62,0.6)]">
          <img src={zestroLogo} alt="" className="h-5 w-5 object-contain" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
          Zestro
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold leading-tight text-white">
        Payment <br />
        <span className="bg-gradient-to-r from-[#5DAF3E] to-[#9BE07A] bg-clip-text text-transparent">
          Reminder Generator
        </span>
      </h1>
      <p className="mt-2 text-sm text-white/50 leading-relaxed">
        Fill in the details below to generate a professional payment reminder image.
      </p>

      {/* Fields */}
      <div className="mt-8 space-y-5">
        <Field label="Amount (₹)" hint="Enter amount in Indian Rupees">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-lg font-semibold text-white placeholder-white/30 outline-none backdrop-blur-xl transition focus:border-[#5DAF3E]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#5DAF3E]/20"
          />
        </Field>

        <Field label="Due Date" hint="Payment due by this date">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base font-medium text-white outline-none backdrop-blur-xl transition focus:border-[#5DAF3E]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#5DAF3E]/20 [color-scheme:dark]"
          />
        </Field>
      </div>

      {/* Info card */}
      <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs leading-relaxed text-white/45 backdrop-blur-xl">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5DAF3E] mr-2 align-middle animate-pulse" />
        Card preview updates <span className="text-[#9BE07A] font-medium">live</span> as you type. Click{' '}
        <span className="font-semibold text-white/70">Download PNG</span> to save the full-resolution card.
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="space-y-2.5 pt-6">
        <button
          type="button"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
        >
          ✦ Generate Reminder
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="group relative w-full overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,122,41,0.7)] transition hover:shadow-[0_15px_40px_-10px_rgba(255,122,41,0.9)] active:scale-[0.98]"
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-[#FF7A29] via-[#FF5E3A] to-[#FF4D6D]"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF7A29] opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative">↓ Download PNG</span>
        </button>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
        {label}
      </label>
      {children}
      <p className="mt-1.5 text-[11px] text-white/35">{hint}</p>
    </div>
  );
}
