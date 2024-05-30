import { buttonVariants } from "@/features/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import HistoryComponent from "@/features/history/HistoryComponent";

import { Link } from "react-router-dom";
import { LucideLayoutDashboard } from "lucide-react";

function HistoryPage() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link className={buttonVariants()} to="/">
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto">
          <HistoryComponent />
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoryPage;
