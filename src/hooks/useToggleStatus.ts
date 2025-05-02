import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStateStatus } from "@/api/statesApi";
import { toggleCategoryStatus } from "@/api/categoryApi";
import { useToast } from "@/components/ui/use-toast";

export const useToggleStateStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleStateStatus,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "State status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update state status",
        variant: "destructive",
      });
    },
  });
};

export const useToggleCategoryStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCategoryStatus,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Category status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update category status",
        variant: "destructive",
      });
    },
  });
}; 