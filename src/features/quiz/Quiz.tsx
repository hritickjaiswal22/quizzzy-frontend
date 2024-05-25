import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import { Button } from "@/features/ui/button";
import type { RootState } from "@/store";
import { startExam, answerExam } from "@/api/quiz";
import { QuestionType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";
import DifficultyBadge from "./DifficultyBadge";
import Wrapper from "./Wrapper";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const TOTAL_QUESTIONS = 20;

function Quiz() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [examId, setExamId] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(-1);

  useEffect(() => {
    async function createExam() {
      setIsLoading(true);
      try {
        const exam = await startExam(user?.userId || "");

        setExamId(exam.examId);
        setQuestion(exam.nextQuestion);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user && user.userId) createExam();
  }, []);

  async function handleNext() {
    if (examId && question) {
      setIsLoading(true);
      try {
        const { completed, nextQuestion } = await answerExam({
          examId: examId,
          questionId: question?.id || "",
          selectedIndex: selectedChoiceIndex,
        });

        if (completed) {
          navigate(`/results/${examId}`);
        } else {
          setQuestionNumber((prev) => prev + 1);
          setQuestion(nextQuestion || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setSelectedChoiceIndex(-1);
      }
    }
  }

  return question ? (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              Test1
            </span>
          </p> */}
          {/* <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            Test12
          </div> */}
          <div className="flex self-start mt-3 text-slate-400">
            <DifficultyBadge difficulty={question.difficulty} />
          </div>
        </div>
        {/* <MCQCounter
                correct_answers={stats.correct_answers}
                wrong_answers={stats.wrong_answers}
              />  */}
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionNumber}</div>
            <div className="text-base text-slate-400">{TOTAL_QUESTIONS}</div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {question.text}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {question.options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoiceIndex === index ? "default" : "outline"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoiceIndex(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isLoading}
          onClick={() => {
            handleNext();
          }}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <InitialLoader />
    </Wrapper>
  );
}

export default Quiz;
