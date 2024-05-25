import { getUserExams } from "@/api/quiz";
import type { RootState } from "@/store";
import { ExamType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";

import { Rocket, CopyCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HistoryComponent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [exams, setExams] = useState<Array<ExamType>>([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const data = await getUserExams(user?.userId || "");

        setExams(data.exams);
      } catch (error) {
        console.error(error);
      }
    }

    getHistory();
  }, []);

  return exams.length > 0 ? (
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
  ) : (
    <div className="space-y-8">
      <InitialLoader />
    </div>
  );
}

export default HistoryComponent;
