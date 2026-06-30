import { useState, useRef } from 'react';
import ReminderCard from './components/ReminderCard';
import ReminderForm from './components/ReminderForm';
import './index.css';

function App() {
  const today = new Date().toISOString().split('T')[0];
  const [amount, setAmount] = useState(96700);
  const [dueDate, setDueDate] = useState(today);
  const cardRef = useRef(null);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#07080c] text-white">
      {/* ── Ambient aurora background ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#5DAF3E] opacity-25 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#FF7A29] opacity-20 blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full bg-[#3E8BFF] opacity-20 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
      </div>

      {/* ── Left Panel: Form (glass) ──────────────────────────────── */}
      <aside className="relative z-10 w-[30%] min-w-[300px] max-w-[440px] h-full flex-shrink-0 p-5">
        <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
          <ReminderForm
            amount={amount}
            dueDate={dueDate}
            onAmountChange={setAmount}
            onDueDateChange={setDueDate}
            cardRef={cardRef}
          />
        </div>
      </aside>

      {/* ── Right Panel: Preview ──────────────────────────────────── */}
      <main className="relative z-10 flex-1 h-full flex flex-col py-5 pr-5">
        <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5DAF3E] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5DAF3E]" />
              </span>
              <span className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.2em]">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono text-white/40">
                1774 × 887
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden p-10">
            <ScaledCardWrapper>
              <ReminderCard ref={cardRef} amount={amount} dueDate={dueDate} />
            </ScaledCardWrapper>
          </div>

          {/* Footer hints */}
          <div className="flex items-center justify-center gap-5 py-3.5 border-t border-white/[0.06]">
            <Hint icon="⌨" text="Edit fields to update live" />
            <span className="text-white/10">·</span>
            <Hint icon="↓" text="Download saves a 2× resolution PNG" />
          </div>
        </div>
      </main>
    </div>
  );
}

function ScaledCardWrapper({ children }) {
  const CARD_W = 1774;
  const CARD_H = 887;

  return (
    <div
      className="relative rounded-2xl"
      style={{
        width: `min(calc(70vw - 6rem), calc((100vh - 12rem) * ${CARD_W / CARD_H}))`,
        height: `min(calc((70vw - 6rem) * ${CARD_H / CARD_W}), calc(100vh - 12rem))`,
        boxShadow:
          '0 30px 80px -20px rgba(93,175,62,0.25), 0 20px 50px -15px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          transformOrigin: 'center center',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          const scale = Math.min(
            parent.clientWidth / CARD_W,
            parent.clientHeight / CARD_H
          );
          el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Hint({ icon, text }) {
  return (
    <span className="flex items-center gap-2 text-white/40 text-xs">
      <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] text-white/60">
        {icon}
      </span>
      {text}
    </span>
  );
}

export default App;
