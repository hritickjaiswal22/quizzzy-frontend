interface QuestionType {
  text: string;
  options: Array<string>;
  correctOptionIndex: number;
  difficulty: number;
  tags: Array<string>;
  id?: string;
}

interface ExamType {
  userId: string;
  questionIds: Array<string>;
  responseIndices: Array<number>;
  date: Date;
  score: number;
  completed: boolean;
  _id: string;
  __typename?: string;
}

export type { QuestionType, ExamType };
