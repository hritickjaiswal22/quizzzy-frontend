interface QuestionType {
  text: string;
  options: Array<string>;
  correctOptionIndex: number;
  difficulty: number;
  id?: string;
}

interface ExamType {
  userId: string;
  questionIds: Array<string>;
  responseIndices: Array<number>;
  date: Date;
  score: number;
  completed: boolean;
  id: string;
}

export type { QuestionType, ExamType };
