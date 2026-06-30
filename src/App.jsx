import { useState, useRef } from 'react';
import ReminderCard from './components/ReminderCard';
import ReminderForm from './components/ReminderForm';
import './index.css';

/**
 * App — Root component for Zestro Payment Reminder Generator.
 * 
 * Layout:
 *   Left  (30%) — ReminderForm: inputs + action buttons
 *   Right (70%) — Card preview panel: live-updating ReminderCard
 * 
 * State is lifted here so both panels stay in sync.
 * cardRef is passed to ReminderCard (via forwardRef) and to ReminderForm for download.
 */
function App() {
  const today = new Date().toISOString().split('T')[0];
  const [amount, setAmount] = useState(96700);
  const [dueDate, setDueDate] = useState(today);
  const cardRef = useRef(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0f1117]">
      {/* ── Left Panel: Form (30%) ───────────────────────────────────── */}
      <div className="w-[30%] min-w-[280px] max-w-[420px] h-full overflow-hidden flex-shrink-0">
        <ReminderForm
          amount={amount}
          dueDate={dueDate}
          onAmountChange={setAmount}
          onDueDateChange={setDueDate}
          cardRef={cardRef}
        />
      </div>

      {/* ── Right Panel: Preview (70%) ───────────────────────────────── */}
      <div className="flex-1 h-full flex flex-col bg-[#0f1117] overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#1a1d2b] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5DAF3E] animate-pulse" />
            <span className="text-[#5a5f70] text-xs font-medium uppercase tracking-widest">
              Live Preview
            </span>
          </div>
          <span className="text-[#2a2d3e] text-xs font-mono">1774 × 887 px</span>
        </div>

        {/* Card canvas area */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-8">
          {/*
            Scale the 1500×500 card to fit within the panel.
            Using CSS transform scale — the card renders at full 1500×500 resolution
            but is visually shrunk to fit. html-to-image captures at full resolution.
          */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* Subtle grid background for canvas feel */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 50% 50%, rgba(93,175,62,0.03) 0%, transparent 70%),
                  linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 32px 32px, 32px 32px',
              }}
            />

            {/* Scale wrapper — shrinks 1500px card to fit available width */}
            <ScaledCardWrapper>
              <ReminderCard
                ref={cardRef}
                amount={amount}
                dueDate={dueDate}
              />
            </ScaledCardWrapper>
          </div>
        </div>

        {/* Bottom hint bar */}
        <div className="flex items-center justify-center gap-6 py-3 border-t border-[#1a1d2b] flex-shrink-0">
          <Hint icon="⌨" text="Edit fields on the left to update" />
          <span className="text-[#1e2130] text-xs">·</span>
          <Hint icon="↓" text="Download saves a 2× resolution PNG" />
        </div>
      </div>
    </div>
  );
}

/**
 * ScaledCardWrapper — Measures available space and scales the card to fit.
 * The card is always rendered at its true 1500×500 DOM size (for html-to-image),
 * but CSS transform scales it visually within the container.
 */
function ScaledCardWrapper({ children }) {
  const CARD_W = 1774;
  const CARD_H = 887;

  // Use CSS container queries / calc to derive the scale factor.
  // We target a max visual width of ~(100vw * 0.7 - 4rem) and max height of ~(100vh - 10rem).
  return (
    <div
      className="relative"
      style={{
        // Set the outer container to the card's visual (scaled) size using vw-based calc
        width: `min(calc(70vw - 4rem), calc((100vh - 10rem) * ${CARD_W / CARD_H}))`,
        height: `min(calc((70vw - 4rem) * ${CARD_H / CARD_W}), calc(100vh - 10rem))`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          transform: `translate(-50%, -50%) scale(var(--card-scale, 1))`,
          transformOrigin: 'center center',
          // CSS custom property computed via inline style below
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          const parentW = parent.clientWidth;
          const parentH = parent.clientHeight;
          const scaleX = parentW / CARD_W;
          const scaleY = parentH / CARD_H;
          const scale = Math.min(scaleX, scaleY);
          el.style.setProperty('--card-scale', scale.toFixed(4));
          el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Small hint chip for the bottom bar */
function Hint({ icon, text }) {
  return (
    <span className="flex items-center gap-1.5 text-[#3a3d4e] text-xs">
      <span className="text-[#4a4d5e]">{icon}</span>
      {text}
    </span>
  );
}

export default App;
