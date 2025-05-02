import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NewPasswordPage from "./pages/NewPasswordPage";
import ForgetPage from "./pages/ForgetPage";
import SuccessPopuppage from "./pages/SuccessPopuppage";
import PrivateRoutes from "./utils/PrivateRoute";
import LoginFormPage from "./pages/LoginFormPage";
import CaseDetail from "./pages/Legal Assurance Plan/CaseDetail";
import LegalProfile from "./pages/LegalProfile";
import CreateEngagementLetter from "./pages/Legal Assurance Plan/CreateEngagementLetter";
import TemplateEditorPage from "./pages/Upload Template/TemplateEditorPagr";


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
            path="/case"
            element={
              <PrivateRoutes>
                <LegalProfile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/case/:id"
            element={
              <PrivateRoutes>
                <CaseDetail />
              </PrivateRoutes>
            }
          />
          <Route
            path="/case/:id/create-engagement-letter"
            element={
              <PrivateRoutes>
                <CreateEngagementLetter />
              </PrivateRoutes>
            }
          />

<Route
            path="/case/:id/upload"
            element={
              <PrivateRoutes>
                <TemplateEditorPage />
              </PrivateRoutes>
            }
          />
            <Route path="*" element={<NotFound />} />
        
        
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
