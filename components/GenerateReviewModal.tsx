
import React, { useState } from 'react';
import { Employee } from '../types';
import { generatePerformanceReview } from '../services/geminiService';
import Modal from './Modal';
import Button from './Button';
import { SparklesIcon } from './icons';

interface GenerateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const GenerateReviewModal: React.FC<GenerateReviewModalProps> = ({ isOpen, onClose, employee }) => {
  const [notes, setNotes] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!employee || !notes) return;
    setIsLoading(true);
    setError('');
    setGeneratedReview('');
    try {
      const review = await generatePerformanceReview(employee, notes);
      setGeneratedReview(review);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNotes('');
    setGeneratedReview('');
    setError('');
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Generate Review for ${employee?.name}`}
      footer={
        <Button onClick={handleClose}>Close</Button>
      }
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Performance Notes</label>
          <textarea
            id="notes"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="e.g., Exceeded sales targets by 20% in Q2, demonstrated excellent leadership in the recent project, needs to improve time management on administrative tasks."
          />
        </div>
        <Button onClick={handleGenerate} disabled={isLoading || !notes}>
          {isLoading ? 'Generating...' : <> <SparklesIcon className="mr-2 h-5 w-5" /> Generate with AI </>}
        </Button>
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
        {generatedReview && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border">
            <h4 className="font-semibold text-text mb-2">Generated Review Summary</h4>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: generatedReview.replace(/\n/g, '<br />') }} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GenerateReviewModal;
