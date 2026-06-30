import React, { forwardRef } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import zestroLogo from '../assets/zestro-logo.png';
import bgImage from '../assets/background.jpg';

/**
 * ReminderCard — Pixel-perfect 1774×887 payment reminder card.
 *
 * IMPORTANT: Make sure 'Poppins' is actually loaded before this is
 * captured (e.g. via html2canvas / dom-to-image). If the font file
 * isn't embedded/loaded yet, the browser silently falls back to a
 * default sans-serif which renders noticeably smaller/tighter —
 * this is the #1 cause of "my output looks compressed" issues.
 *
 * Add this to your index.html <head> (or import via @font-face):
 *   <link rel="preconnect" href="https://fonts.googleapis.com">
 *   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
 *
 * And before calling html2canvas, wait for fonts:
 *   await document.fonts.ready;
 */
const ReminderCard = forwardRef(({ amount, dueDate }, ref) => {

  return (
    <div
      ref={ref}
      id="reminder-card"
      style={{
        position: 'relative',
        width: '1774px',
        height: '887px',
        background: `radial-gradient(ellipse at 105% 115%, rgba(215,225,205,0.40) 0%, transparent 50%), #F7F6F3`,
        fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* ── Background Image ── */}
      <img
        src={bgImage}
        alt="Background Texture"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1, // Full opacity for the user-provided background
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Zestro Logo: absolutely centered vertically on the right ── */}
      <img
        src={zestroLogo}
        alt="Zestro Logo"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: '50%',
          right: '170px',
          transform: 'translateY(-50%)',
          width: '320px',
          height: '320px',
          objectFit: 'contain',
        }}
      />

      {/* ── Left content block ── */}
      <div
        style={{
          position: 'absolute',
          top: '248px',
          left: '205px',
          right: '600px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* PAYMENT REMINDER label */}
        <p
          style={{
            fontSize: '20px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#000000',
            marginBottom: '24px',
            fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
          }}
        >
          PAYMENT REMINDER
        </p>

        {/* Main amount */}
        <p
          style={{
            fontSize: '168px',
            fontWeight: '700',
            color: '#FF7A00',
            lineHeight: '1',
            letterSpacing: '-3px',
            marginBottom: '0',
            fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
          }}
        >
          {formatCurrency(amount)}
        </p>

        {/* DUE DATE section */}
        <div style={{ marginTop: '36px', marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '16px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#000000',
              marginBottom: '8px',
              fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
            }}
          >
            DUE DATE
          </p>
          <p
            style={{
              fontSize: '68px',
              fontWeight: '400',
              color: '#D32F2F',
              lineHeight: '1.1',
              fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
            }}
          >
            {formatDate(dueDate)}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#070707ff',
            width: '100%',
            marginBottom: '24px',
          }}
        />

        {/* Footer */}
        <p
          style={{
            fontSize: '22px',
            fontWeight: '400',
            color: '#000000',
            fontFamily: "'Poppins', 'Inter', Arial, Helvetica, sans-serif",
            letterSpacing: '0.01em',
          }}
        >
          Zestro Foods and Groceries &nbsp;&nbsp;-&nbsp;&nbsp; 8125935719
        </p>
      </div>
    </div>
  );
});

ReminderCard.displayName = 'ReminderCard';

export default ReminderCard;