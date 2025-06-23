import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentTypeCardProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const DocumentTypeCard = ({
  title,
  isSelected,
  onClick,
  icon,
}: DocumentTypeCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-3">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              isSelected ? "bg-blue-100" : "bg-gray-100"
            )}
          >
            {icon || (
              <FileText
                className={cn(
                  "w-6 h-6",
                  isSelected ? "text-blue-600" : "text-gray-600"
                )}
              />
            )}
          </div>
          <h3
            className={cn(
              "text-sm font-medium text-center",
              isSelected ? "text-blue-700" : "text-gray-700"
            )}
          >
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};
