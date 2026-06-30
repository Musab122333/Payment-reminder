import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import zestroLogo from '../assets/zestro-logo.png';

const ReminderCard = ({ amount, dueDate }) => {
  return (
    <div
      id="reminder-card"
      className="relative w-[1500px] h-[500px] bg-[#F7F6F3]"
      style={{
        background: `radial-gradient(at bottom right, rgba(232,237,229,0.05) 0%, transparent 50%), #F7F6F3`,
      }}
    >
      <img
        src={zestroLogo}
        alt="Zestro Logo"
        className="absolute top-[28px] right-[28px] w-[64px] h-[64px]"
      />

      <div className="absolute top-[70px] left-[70px]">
        <p className="uppercase text-[12px] tracking-[0.2em] text-[#B0B0B0]">
          Payment Reminder
        </p>
        <p className="text-[92px] font-bold text-[#FF7A00] leading-none">
          {formatCurrency(amount)}
        </p>

        <div className="mt-8">
          <p className="uppercase text-[14px] text-[#9A9A9A]">Due Date</p>
          <p className="text-[48px] font-normal text-[#D32F2F]">
            {formatDate(dueDate)}
          </p>
        </div>
      </div>

      <div className="absolute bottom-[70px] left-[70px] right-[70px]">
        <div className="h-[1px] bg-[#DCDCDC] w-[40%] mb-4"></div>
        <p className="text-[16px] text-[#C0C0C0]">
          Zestro Foods and Groceries · 8125935719
        </p>
      </div>
    </div>
  );
};

export default ReminderCard;