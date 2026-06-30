import React, { useState } from 'react';
import { toPng } from 'html-to-image';

const ReminderForm = ({ onGenerate, onDownload }) => {
  const today = new Date().toISOString().split('T')[0];
  const [amount, setAmount] = useState(96700);
  const [dueDate, setDueDate] = useState(today);

  const handleGenerate = () => {
    onGenerate({ amount, dueDate });
  };

  const handleDownload = () => {
    onDownload();
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-bold mb-6">Zestro Payment Reminder Generator</h2>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          id="dueDate"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-3"
      >
        Generate Reminder
      </button>
      <button
        onClick={handleDownload}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Download PNG
      </button>
    </div>
  );
};

export default ReminderForm;