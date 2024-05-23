import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";

import { HelpCircle, BrainCircuit, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
        <Dialog>
          <DialogTrigger>
            <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800">
              What is this
              <HelpCircle className="w-5 h-5 ml-1" />
            </span>
          </DialogTrigger>
          <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Welcome to Quizzzy!
              </DialogTitle>
              <DialogDescription>
                <span className="block my-2 mt-4 ">
                  Are you tired of mundane and repetitive quizzes? Say goodbye
                  to the ordinary and embrace the extraordinary with Quizmefy!
                  Our platform is revolutionizing the quiz and trivia
                  experience.
                </span>
                <hr />
                <span className="my-2 font-semibold">
                  <span className="text-base font-semibold">Built with</span>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <Card
          className="hover:cursor-pointer hover:opacity-75"
          onClick={() => {
            navigate("/quiz");
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-2xl font-bold">Quiz me!</CardTitle>
            <BrainCircuit size={28} strokeWidth={2.5} />
          </CardHeader>
          <CardContent>
            <span className="block text-sm text-muted-foreground">
              Challenge yourself to a quiz with a topic of your choice.
            </span>
          </CardContent>
        </Card>

        <Card
          className="hover:cursor-pointer hover:opacity-75"
          onClick={() => {
            navigate("/history");
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <History size={28} strokeWidth={2.5} />
          </CardHeader>
          <CardContent>
            <span className="block text-sm text-muted-foreground">
              View past quiz attempts.
            </span>
          </CardContent>
        </Card>
        {/* <QuizMeCard />
    <HistoryCard /> */}
      </div>
    </main>
  );
}

export default Dashboard;
