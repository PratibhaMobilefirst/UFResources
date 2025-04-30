import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9\-]{10,15}$/, "Enter a valid phone number")
    .required("Mobile number is required"),
  role: Yup.string().required("Role is required"),
});

const UserManagementForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobile: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission logic here
    },
  });

  return (
    <Layout>
      <div className="mt-1 bg-white rounded-lg shadow p-8 mx-auto max-w-6xl h-full">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Add New User</h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name<span className="text-red-500">*</span></Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-xs">{formik.errors.firstName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  placeholder="Enter Middle Name"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.middleName && formik.errors.middleName && (
                  <div className="text-red-500 text-xs">{formik.errors.middleName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name<span className="text-red-500">*</span></Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role<span className="text-red-500">*</span></Label>
                <Select
                  value={formik.values.role}
                  onValueChange={(value) => formik.setFieldValue("role", value)}
                >
                  <SelectTrigger
                    onBlur={() => formik.setFieldTouched("role", true)}
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <div className="text-red-500 text-xs">{formik.errors.role}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email ID<span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs">{formik.errors.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile No.<span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    +1
                  </span>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="555-231-4758"
                    className="rounded-l-none"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-red-500 text-xs">{formik.errors.mobile}</div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#00426E] hover:bg-[#00426E]/90"
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagementForm;