import { buttonVariants } from "@/features/ui/button";
import AccuracyCard from "./AccuracyCard";
import ResultsCard from "./ResultsCard";
import QuestionsList from "./QuestionsList";
import { getResults } from "@/api/quiz";
import { ExamType, QuestionType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";

import { Link, useParams } from "react-router-dom";
import { LucideLayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Results() {
  const { examId } = useParams();
  const [questions, setQuestions] = useState<Array<QuestionType>>([]);
  const [exam, setExam] = useState<null | ExamType>(null);

  useEffect(() => {
    async function getExamResults() {
      try {
        const { exam, questions } = await getResults(examId || "");

        setExam(exam);
        setQuestions(questions);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Network error.", {
          position: "top-right",
        });
      }
    }

    getExamResults();
  }, []);

  function calculateAccuracy() {
    if (exam && questions.length) {
      let count = 0;

      questions.forEach((question, i) => {
        if (question.correctOptionIndex == exam.responseIndices[i]) count++;
      });

      return (count / questions.length) * 100;
    }
    return 0;
  }

  const accuracy = calculateAccuracy();

  return exam && questions.length ? (
    <>
      <Toaster />
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link to="/" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          {/* <TimeTakenCard
        timeEnded={new Date(game.timeEnded ?? 0)}
        timeStarted={new Date(game.timeStarted ?? 0)}
      /> */}
        </div>
        <QuestionsList
          questions={questions}
          responseIndices={exam.responseIndices}
          percentageCorrect={accuracy}
        />
      </div>
    </>
  ) : (
    <div className="p-8 mx-auto max-w-7xl">
      <InitialLoader />
    </div>
  );
}

export default Results;
