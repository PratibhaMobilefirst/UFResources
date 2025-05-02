import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewPasswordPage from "./pages/NewPasswordPage";
import ForgetPage from "./pages/ForgetPage";
import SuccessPopuppage from "./pages/SuccessPopuppage";
import AttorneyManagement from "./pages/Attorney Management/AttorneyManagement";
import AttorneyDetailPage from "./pages/Attorney Management/AttorneyDetailPage";
import CaseDetailPage from "./pages/Attorney Management/CaseDetailPage";
import ContentManagement from "./pages/ContentManagement/ContentManagement";
import PrivateRoutes from "./utils/PrivateRoute";
import LoginFormPage from "./pages/LoginFormPage";
import UserManagement from "./pages/UserManagement/UserManagement";
import UserManagementForm from "./pages/UserManagement/UserManagementForm";
import CreateRole from "./pages/UserManagement/CreateRole";
import RoleCreationPage from "./pages/UserManagement/RoleCreationPage";
import { ReportPage } from "./pages/Report Management/Report";
import ApproveTemplatePage from "./pages/ApproveTemplate/ApproveTemplatePage";
import TemplateManagementPage from "./pages/TemplateManagement/TemplateManagementPage";
import TemplateDetailPage from "./pages/TemplateManagement/TemplateDetailPage";
import CreateTemplatePage from "./pages/TemplateManagement/CreateTemplatePage";
import ClauseManagementPage from "./pages/Clause Management/ClauseManagementPage";
import TemplateEditorPage from "./pages/Upload Template/TemplateEditorPagr";
import UploadTemplate from "./pages/Upload Template/UploadTemplate";
import CampaignManagement from "./pages/Campaign Management/CampaignManagementPage";
import CreateCampaign from "./pages/Campaign Management/CreateCampaign";
import CampaignQuestionnaire from "./pages/Campaign Management/CampaignQuestionaries";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LoginFormPage />} />
          <Route path="/forgot-password" element={<ForgetPage />} />
          <Route path="/set-password" element={<NewPasswordPage />} />
          <Route path="/success-popup" element={<SuccessPopuppage />} />

          {/* private routes */}
          <Route
            path="/attorney-management"
            element={
              <PrivateRoutes>
                <AttorneyManagement />
              </PrivateRoutes>
            }
          />
          <Route
            path="/attorney-detail/:id"
            element={
              <PrivateRoutes>
                <AttorneyDetailPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/attorney-case-detail/:attorneyId/:caseId"
            element={
              <PrivateRoutes>
                <CaseDetailPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/content-management"
            element={
              <PrivateRoutes>
                <ContentManagement />
              </PrivateRoutes>
            }
          />

          <Route
            path="/user-management"
            element={
              <PrivateRoutes>
                <UserManagement />
              </PrivateRoutes>
            }
          />
          <Route
            path="/user-management-form"
            element={
              <PrivateRoutes>
                <UserManagementForm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/role-creation"
            element={
              <PrivateRoutes>
                <CreateRole />
              </PrivateRoutes>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoutes>
                <ReportPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/clause-management"
            element={
              <PrivateRoutes>
                <ClauseManagementPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/approve-template"
            element={
              <PrivateRoutes>
                <ApproveTemplatePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/template-management"
            element={
              <PrivateRoutes>
                <TemplateManagementPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/template-management/:id"
            element={
              <PrivateRoutes>
                <TemplateDetailPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/template-management/create"
            element={
              <PrivateRoutes>
                <CreateTemplatePage />
              </PrivateRoutes>
            }
          />


            <Route path="/upload-template" element={<UploadTemplate />} />
            <Route path="/template-editor" element={<TemplateEditorPage />} />
            <Route path="/campaign-management" element={<CampaignManagement />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/create-campaign/questionnaire" element={<CampaignQuestionnaire />} />
         <Route path="*" element={<NotFound />} />
        
        
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
