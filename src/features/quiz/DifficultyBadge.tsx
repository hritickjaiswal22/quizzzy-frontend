import { Badge } from "@/features/ui/badge";

function DifficultyBadge({ difficulty }: { difficulty: number }) {
  function getText() {
    switch (difficulty) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";

      default:
        return "Easy";
    }
  }

  function getVariant() {
    switch (difficulty) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "destructive";

      default:
        return "default";
    }
  }

  return (
    <Badge className="p-2 px-6" variant={getVariant()}>
      {getText()}
    </Badge>
  );
}

export default DifficultyBadge;
