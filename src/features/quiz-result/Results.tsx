import { buttonVariants } from "@/features/ui/button";
import AccuracyCard from "./AccuracyCard";
import ResultsCard from "./ResultsCard";
import QuestionsList from "./QuestionsList";
import { getResults, ResultsResponseType } from "@/api/quiz";
import { ExamType, QuestionType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";

import { Link, useParams } from "react-router-dom";
import { LucideLayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";

function Results() {
  const { examId } = useParams();
  const [questions, setQuestions] = useState<Array<QuestionType>>([]);
  const [exam, setExam] = useState<null | ExamType>(null);

  const { mutate, isLoading, isError } = useMutation(getResults);

  useEffect(() => {
    mutate(examId || "", {
      onSuccess: ({ exam, questions }: ResultsResponseType) => {
        setExam(exam);
        setQuestions(questions);
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error?.response?.data?.message || "Network error.", {
          position: "top-right",
        });
      },
    });
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

  if (isLoading)
    return (
      <div className="p-8 mx-auto max-w-7xl">
        <InitialLoader />
      </div>
    );

  if (isError)
    <div className="p-8 mx-auto max-w-7xl">
      <Toaster />
      <h1>There was an error.Please try again.</h1>
    </div>;

  return (
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
          responseIndices={exam?.responseIndices || []}
          percentageCorrect={accuracy}
        />
      </div>
    </>
  );
}

export default Results;
