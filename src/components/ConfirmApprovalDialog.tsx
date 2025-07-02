
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";

interface Template {
  id: string;
  documentName: string;
  state: string;
  category: string;
  uploadedDate: string;
}

interface ConfirmApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  document: Template;
}

export const ConfirmApprovalDialog = ({
  isOpen,
  onClose,
  onApprove,
  document,
}: ConfirmApprovalDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure, You want to approve?</AlertDialogTitle>
          {/* <AlertDialogDescription>
            You are about to approve the template "{document.documentName}". This action cannot be undone.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex justify-between items-center ">
          <AlertDialogCancel className="px-4">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onApprove} className="bg-green-500 hover:bg-green-600 px-4">
             Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
