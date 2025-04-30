// import React, { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Layout from "@/components/Layout";

// // Simple Tooltip component
// const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <span style={{ position: "relative" }}
//       onMouseEnter={() => setShow(true)}
//       onMouseLeave={() => setShow(false)}
//     >
//       {children}
//       {show && (
//         <span style={{
//           position: "absolute", left: "50%", top: "-2.5em", transform: "translateX(-50%)",
//           background: "#333", color: "#fff", padding: "6px 12px", borderRadius: 4, fontSize: 12, whiteSpace: "nowrap", zIndex: 10
//         }}>{text}</span>
//       )}
//     </span>
//   );
// };

// const features = [
//   { name: "Dashboard", desc: "Access to dashboard panels and metrics", capabilities: ["Not Allowed", "Allowed"] },
//   { name: "Attorney Management", desc: "Manage attorney records", capabilities: ["Not Allowed", "View", "Manage"] },
//   { name: "Campaign Management", desc: "Manage campaigns", capabilities: ["Not Allowed", "View", "Manage", "Create"] },
//   { name: "Clause Management", desc: "Manage clauses", capabilities: ["Not Allowed", "View", "Manage", "Create"] },
//   { name: "Templates", desc: "Manage templates", capabilities: ["Not Allowed", "View", "Manage", "Create"] },
//   { name: "Approve Templates", desc: "Approve submitted templates", capabilities: ["Not Allowed", "Allowed"] },
//   { name: "Report", desc: "Access reports", capabilities: ["Not Allowed", "Allowed"] },
//   { name: "CMS", desc: "Content management system", capabilities: ["Not Allowed", "View", "Manage", "Create"] },
//   { name: "User Access Management", desc: "Manage user access", capabilities: ["Not Allowed", "View Only", "Manage"] },
//   { name: "Follow Me", desc: "Follow user activity", capabilities: ["Not Allowed", "Allow"] },
// ];

// const CreateRole = () => {
//   const [roleName, setRoleName] = useState("");
//   const [permissions, setPermissions] = useState<{ [feature: string]: string }>({});

//   const handleCapabilityChange = (feature: string, capability: string) => {
//     setPermissions((prev) => ({ ...prev, [feature]: capability }));
//   };

//   return (
//     <Layout>
//       <div className="space-y-4">
//         <Card className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Create a role</h2>
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Role Name</label>
//             <input
//               className="border rounded px-3 py-2 w-64"
//               placeholder="Enter role name"
//               value={roleName}
//               onChange={e => setRoleName(e.target.value)}
//             />
//           </div>
//           <div className="border rounded p-4">
//             <div className="font-semibold mb-2">Functionality</div>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2">Feature</th>
//                   <th className="py-2">Capabilities</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {features.map((feature) => (
//                   <tr key={feature.name} className="border-t">
//                     <td className="py-2">
//                       <div className="flex items-center gap-2">
//                         {feature.name}
//                         <Tooltip text={feature.desc}>
//                           <span className="text-blue-500 cursor-pointer">&#9432;</span>
//                         </Tooltip>
//                       </div>
//                     </td>
//                     <td className="py-2">
//                       <div className="flex gap-6">
//                         {feature.capabilities.map((cap) => (
//                           <label key={cap} className="flex items-center gap-1 cursor-pointer">
//                             <input
//                               type="radio"
//                               name={feature.name}
//                               value={cap}
//                               checked={permissions[feature.name] === cap}
//                               onChange={() => handleCapabilityChange(feature.name, cap)}
//                             />
//                             <Tooltip text={`More info about '${cap}'`}>
//                               <span>{cap}</span>
//                             </Tooltip>
//                           </label>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-end gap-2 mt-6">
//             <Button variant="outline">Cancel</Button>
//             <Button className="bg-[#00426E] hover:bg-[#00426E]/90">Create</Button>
//           </div>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default CreateRole;

import Layout from "@/components/Layout";
import { RoleCreationForm } from "@/components/RoleCreationForm";

const CreateRole = () => {
  return (
    <Layout>
      <div className="bg-white rounded-md shadow-sm p-6">
        <RoleCreationForm />
      </div>
    </Layout>
  );
};

export default CreateRole;
