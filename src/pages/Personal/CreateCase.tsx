import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import BackArrow from "../../asset/img/Group 37878.svg";
import {
  usePersonalAttorneyStates,
  usePersonalCategoriesByState,
  usePersonalCreateCase,
  usePersonalEngagementTemplates,
} from "@/hooks/UsePersonal";
import { useAuthStore } from "@/store/authStore";

interface CreateCaseForm {
  caseName: string;
  clientName: string;
  stateId: string;
  categoryId: string;
  engagementTemplate: string;
}

const CreateCase = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  console.log({ user }, "user");
  const { data: statesData, isLoading: statesLoading } =
    usePersonalAttorneyStates();
  const [selectedStateId, setSelectedStateId] = useState<string>("");

  const { data: categoriesData, isLoading: categoriesLoading } =
    usePersonalCategoriesByState(selectedStateId);

  const { data: engagementData, isLoading: engagementLoading } =
    usePersonalEngagementTemplates(selectedStateId);
  const { mutate: createCase, isPending: createCaseLoading } =
    usePersonalCreateCase();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCaseForm>();

  const onSubmit = (formData: CreateCaseForm) => {
    console.log("Creating case:", formData);
    // navigate("/personal");
    // Call API to create case
    createCase(
      {
        attorneyId: user?.id,
        caseName: formData.caseName,
        clientName: formData.clientName,
        stateId: formData.stateId,
        categoryId: formData.categoryId,
        engagementLetterTemplateId: formData.engagementTemplate,
      },
      {
        onSuccess: () => navigate("/personal"),
      }
    );
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="w-full p-8">
            <CardHeader>
              <div className="flex items-center ">
                <button
                  className="flex items-center mr-2"
                  onClick={() => navigate(-1)}
                >
                  <img src={BackArrow} alt="" className="w-5 h-5" />
                </button>
                <span className="text-[22px] font-[500]">Create Case</span>
              </div>
              <hr />
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6 w-full">
                  {/* Case Name */}
                  <div className="w-80">
                    <label htmlFor="caseName" className="text-sm font-medium">
                      Case Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="caseName"
                      {...register("caseName", {
                        required: "Case Name is required",
                      })}
                      placeholder="Enter your case name"
                    />
                    {errors.caseName && (
                      <p className="text-red-500 text-xs">
                        {errors.caseName.message}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div className="w-80">
                    <label className="block text-sm font-medium mb-2">
                      Select State <span className="text-red-500">*</span>
                    </label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStateId(value);
                        setValue("stateId", value);
                      }}
                      defaultValue=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ maxHeight: "40vh", overflowY: "scroll" }}
                      >
                        {!statesLoading &&
                          statesData?.data?.map((state) => (
                            <SelectItem
                              key={state.stateId}
                              value={state.stateId}
                            >
                              {state.stateName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {errors.stateId && (
                      <p className="text-red-500 text-xs">State is required</p>
                    )}
                  </div>

                  {/* Client Name */}
                  <div className="w-80">
                    <label htmlFor="clientName" className="text-sm font-medium">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="clientName"
                      {...register("clientName", {
                        required: "Client Name is required",
                      })}
                      placeholder="Enter your client name"
                    />
                    {errors.clientName && (
                      <p className="text-red-500 text-xs">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="w-80">
                    <label className="block text-sm font-medium mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Select
                      onValueChange={(value) => setValue("categoryId", value)}
                      disabled={!selectedStateId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {!categoriesLoading &&
                          categoriesData?.data?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.templateName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <p className="text-red-500 text-xs">
                        Category is required
                      </p>
                    )}
                  </div>

                  {/* Engagement Letter Template */}
                  <div className="w-80">
                    <label className="block text-sm font-medium mb-2">
                      Select Engagement Letter Template{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setValue("engagementTemplate", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {!engagementLoading &&
                          engagementData?.data?.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.documentName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {errors.engagementTemplate && (
                      <p className="text-red-500 text-xs">
                        Template is required
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      disabled={createCaseLoading}
                      type="submit"
                      className="bg-[#00426E] hover:bg-[#003058] text-white px-12 py-2 font-medium"
                    >
                      {createCaseLoading ? "Creating..." : "Create Case"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCase;
