import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CreateClauseFormProps {
  onBack: () => void;
}

export function CreateClauseForm({ onBack }: CreateClauseFormProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="text-blue-600 flex items-center hover:text-blue-700"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-base">Create a New Clause</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Clause Name</label>
            <Input 
              placeholder="Enter clause name" 
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select State</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Template Category</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Here" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="will">Will</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button className="bg-blue-600 text-white">
              Go to Editor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}