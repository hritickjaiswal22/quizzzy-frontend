import { ExamType } from "@/types/common.type";
import InitialLoader from "@/features/ui/InitialLoader";

import { Rocket, CopyCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";

interface ResponseType {
  getUserExamsHistory: {
    exams: Array<ExamType>;
  };
}

const GET_USERS_EXAMS_HISTORY = gql`
  query Exams {
    getUserExamsHistory {
      exams {
        _id
        completed
        questionIds
        responseIndices
        score
        userId
      }
    }
  }
`;

function HistoryComponent() {
  const { loading, error, data } = useQuery<ResponseType>(
    GET_USERS_EXAMS_HISTORY
  );

  if (loading)
    return (
      <div className="space-y-8">
        <InitialLoader />
      </div>
    );

  if (error)
    <div className="space-y-8">
      <Toaster />
      <h1>There was an error.Please try again</h1>
    </div>;

  return (
    <>
      <div className="space-y-8">
        {data?.getUserExamsHistory.exams.map((exam) => {
          return (
            <div className="flex items-center justify-between" key={exam._id}>
              <div className="flex items-center">
                <CopyCheck className="mr-3" />
              </div>
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  to={`/results/${exam._id}`}
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
