export interface Applicant {
  id: number;
  name: string;
  appliedFor: string;
  status: 'In Training' | 'Passed Quiz' | 'Failed' | 'Pending Review';
  quizScore: number | null; // Null if not taken yet
}