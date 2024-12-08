export interface Question {
  quizID: string;
  title: string;
  type: string;
  question: string;
  points: number;
  answers: {
    [key: string]: string;
  };
  correctAnswer: string;
  correctAnswers?: string[];
  description?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
}
