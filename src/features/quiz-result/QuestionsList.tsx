import { QuestionType } from "@/types/common.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/ui/table";
type Props = {
  questions: QuestionType[];
  responseIndices: Array<number>;
  percentageCorrect: number;
};

const QuestionsList = ({
  questions,
  responseIndices,
  percentageCorrect,
}: Props) => {
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>

          <TableHead className="w-[10px] text-right">Accuracy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map(({ correctOptionIndex, options, text }, index) => {
            const isCorrect = correctOptionIndex == responseIndices[index];
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {text} <br />
                  <br />
                  <span className="font-semibold">
                    {options[correctOptionIndex]}
                  </span>
                </TableCell>
                <TableCell
                  className={`${
                    isCorrect ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {options[responseIndices[index]]}
                </TableCell>

                <TableCell className="text-right">
                  {percentageCorrect}
                </TableCell>
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
