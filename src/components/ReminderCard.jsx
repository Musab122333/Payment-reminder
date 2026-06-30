import React, { forwardRef } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import zestroLogo from '../assets/zestro-logo.svg';

/**
 * ReminderCard — Pixel-perfect payment reminder card (1500×500px).
 * Uses forwardRef so the parent can hold a DOM ref for html-to-image capture.
 * All styles are inline to ensure reliable rendering when captured as PNG.
 */
const ReminderCard = forwardRef(({ amount, dueDate }, ref) => {
  const styles = {
    card: {
      position: 'relative',
      width: '1500px',
      height: '500px',
      background: `radial-gradient(ellipse at 110% 130%, rgba(210,220,200,0.35) 0%, transparent 55%), #F7F6F3`,
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
      overflow: 'hidden',
      flexShrink: 0,
    },
    logo: {
      position: 'absolute',
      top: '28px',
      right: '28px',
      width: '120px',
      height: '120px',
      objectFit: 'contain',
    },
    contentBlock: {
      position: 'absolute',
      top: '64px',
      left: '72px',
      right: '200px',
    },
    reminderLabel: {
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#B0B0B0',
      marginBottom: '12px',
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
    },
    amount: {
      fontSize: '92px',
      fontWeight: '700',
      color: '#FF7A00',
      lineHeight: '1',
      marginBottom: '0px',
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
      letterSpacing: '-2px',
    },
    dueDateSection: {
      marginTop: '28px',
    },
    dueDateLabel: {
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: '#9A9A9A',
      marginBottom: '4px',
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
    },
    dueDateValue: {
      fontSize: '48px',
      fontWeight: '400',
      color: '#D32F2F',
      lineHeight: '1.1',
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
    },
    footerBlock: {
      position: 'absolute',
      bottom: '52px',
      left: '72px',
      right: '72px',
    },
    divider: {
      height: '1px',
      backgroundColor: '#DCDCDC',
      width: '40%',
      marginBottom: '18px',
    },
    footerText: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#C0C0C0',
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
      letterSpacing: '0.02em',
    },
  };

  return (
    <div ref={ref} style={styles.card} id="reminder-card">
      {/* Top-right: Zestro Logo */}
      <img
        src={zestroLogo}
        alt="Zestro Logo"
        style={styles.logo}
        crossOrigin="anonymous"
      />

      {/* Top-left: Main content block */}
      <div style={styles.contentBlock}>
        {/* PAYMENT REMINDER label */}
        <p style={styles.reminderLabel}>PAYMENT REMINDER</p>

        {/* Main amount */}
        <p style={styles.amount}>{formatCurrency(amount)}</p>

        {/* Due date section */}
        <div style={styles.dueDateSection}>
          <p style={styles.dueDateLabel}>DUE DATE</p>
          <p style={styles.dueDateValue}>{formatDate(dueDate)}</p>
        </div>
      </div>

      {/* Bottom-left: Divider + Footer */}
      <div style={styles.footerBlock}>
        <div style={styles.divider} />
        <p style={styles.footerText}>
          Zestro Foods and Groceries &nbsp;·&nbsp; 8125935719
        </p>
      </div>
    </div>
  );
});

ReminderCard.displayName = 'ReminderCard';

export default ReminderCard;