import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import LegacyAssurancePlanPage from "./pages/LegacyAssurancePlan/LegacyAssurancePlan";
import { LegacyAssuranceDetail } from "./pages/LegacyAssurancePlan/LegacyAssuranceDetail";

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
          <Route path="/attorney-management" element={<AttorneyManagement />} />

          <Route
            path="/legacy-assurance-plan"
            element={<LegacyAssurancePlanPage />}
          />
          <Route
            path="/legacy-assurance-plan-detail/:id"
            element={<LegacyAssuranceDetail />}
          />
          <Route path="/attorney-detail/:id" element={<AttorneyDetailPage />} />
          <Route
            path="/attorney-case-detail/:attorneyId/:caseId"
            element={<CaseDetailPage />}
          />
          <Route path="/content-management" element={<ContentManagement />} />
          {/* <Route path="/user-management" element={<UserManagement />} /> */}
          <Route path="/user-management" element={<LoginFormPage />} />
          <Route
            path="/user-management-form"
            element={<UserManagementForm />}
          />
          <Route path="/role-creation" element={<CreateRole />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/clause-management" element={<ClauseManagementPage />} />
          {/* <Route path="/role-creation" element={<RoleCreationPage />} /> */}
          {/* <Route path="/role-creation" element={<RoleCreationPage />} /> */}
          <Route path="/approve-template" element={<ApproveTemplatePage />} />
          <Route
            path="/template-management"
            element={<TemplateManagementPage />}
          />
          <Route
            path="/template-management/:id"
            element={<TemplateDetailPage />}
          />
          <Route
            path="/template-management/create"
            element={<CreateTemplatePage />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
