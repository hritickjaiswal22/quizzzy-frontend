import axios from "./axios.config";
import { QuestionType } from "@/types/question.type";

interface AnswerExamResponseType {
  message: string;
  success: boolean;
  nextQuestion?: QuestionType;
  completed: boolean;
}

async function startExam(userId: string) {
  try {
    const { data } = await axios.post("/exams/create", { userId });

    return data.exam;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function answerExam(input: {
  examId: string;
  questionId: string;
  selectedIndex: number;
}): Promise<AnswerExamResponseType> {
  try {
    const { data } = await axios.put("/exams/answer", input);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { startExam, answerExam };
