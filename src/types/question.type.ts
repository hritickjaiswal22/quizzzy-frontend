interface QuestionType {
  text: string;
  options: Array<string>;
  correctOptionIndex: number;
  difficulty: number;
  id: string;
}

export type { QuestionType };
