import { getUserExams } from "@/api/quiz";
import type { RootState } from "@/store";
import { ExamType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";
import { useMutation } from "react-query";

import { Rocket, CopyCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";

function HistoryComponent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [exams, setExams] = useState<Array<ExamType>>([]);

  const { mutate, isLoading, isError } = useMutation(getUserExams);

  useEffect(() => {
    mutate(user?.userId || "", {
      onSuccess: (exams: Array<ExamType>) => {
        setExams(exams);
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error?.response?.data?.message || "Network error.", {
          position: "top-right",
        });
      },
    });
  }, []);

  if (isLoading)
    return (
      <div className="space-y-8">
        <InitialLoader />
      </div>
    );

  if (isError)
    <div className="space-y-8">
      <Toaster />
      <h1>There was an error.Please try again</h1>
    </div>;

  return (
    <>
      <div className="space-y-8">
        {exams.map((exam) => {
          return (
            <div className="flex items-center justify-between" key={exam.id}>
              <div className="flex items-center">
                <CopyCheck className="mr-3" />
              </div>
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  to={`/results/${exam.id}`}
                >
                  Get Detailed Result
                </Link>
                <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                  <Rocket className="w-4 h-4 mr-1" />
                  Score : {exam.score}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                    {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                  </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HistoryComponent;
