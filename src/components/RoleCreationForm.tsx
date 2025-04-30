
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

// Define the permission types
type Permission = 'Not Allowed' | 'View' | 'Manage' | 'Create';
type FunctionalityPermission = Record<string, Permission>;

// Define the form state structure
interface RoleFormState {
  roleName: string;
  roleDescription: string;
  permissions: {
    [key: string]: Permission;
  }
}

export const RoleCreationForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Initial permissions configuration based on the image
  const initialPermissions: Record<string, Permission> = {
    dashboard: 'Not Allowed',
    attorneyManagement: 'Not Allowed',
    campaignManagement: 'Not Allowed',
    contentManagement: 'Not Allowed',
    templates: 'Not Allowed',
    approveTemplates: 'Not Allowed',
    support: 'Not Allowed',
    crm: 'Not Allowed',
    webAccessManagement: 'Not Allowed',
    followUp: 'Not Allowed',
  };

  // Form state
  const [formData, setFormData] = useState<RoleFormState>({
    roleName: '',
    roleDescription: '',
    permissions: initialPermissions,
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle permission changes
  const handlePermissionChange = (functionality: string, permission: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [functionality]: permission
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Role created:', formData);
    // In a real application, you would save the role and navigate
    navigate('/user-management');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#00426E]">Create a role</h2>
          <p className="text-gray-500 text-sm mt-1">Set up role information</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Role Name & Description */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              name="roleName"
              value={formData.roleName}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="roleDescription">Role Description</Label>
            <Input
              id="roleDescription"
              name="roleDescription"
              value={formData.roleDescription}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        {/* Functionality Permissions */}
        <div>
          <h3 className="font-semibold mb-4">Functionalities</h3>
          
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              {Object.entries(initialPermissions).map(([functionality, _]) => (
                <div key={functionality} className="mb-8">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-4 font-medium capitalize">
                      {functionality.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="col-span-8">
                      <RadioGroup 
                        value={formData.permissions[functionality]} 
                        onValueChange={(value) => handlePermissionChange(functionality, value as Permission)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center space-x-2 w-40">
                            <RadioGroupItem id={`${functionality}-not-allowed`} value="Not Allowed" className="text-[#00426E]" />
                            <Label htmlFor={`${functionality}-not-allowed`}>Not Allowed</Label>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center space-x-2 w-40">
                            <RadioGroupItem id={`${functionality}-view`} value="View" className="text-[#00426E]" />
                            <Label htmlFor={`${functionality}-view`}>View</Label>
                          </div>
                        </div>
                        {['attorneyManagement', 'campaignManagement', 'contentManagement', 'templates', 'crm'].includes(functionality) && (
                          <>
                            <div className="flex items-center">
                              <div className="flex items-center space-x-2 w-40">
                                <RadioGroupItem id={`${functionality}-manage`} value="Manage" className="text-[#00426E]" />
                                <Label htmlFor={`${functionality}-manage`}>Manage</Label>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center space-x-2 w-40">
                                <RadioGroupItem id={`${functionality}-create`} value="Create" className="text-[#00426E]" />
                                <Label htmlFor={`${functionality}-create`}>Create</Label>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/user-management')}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            style={{ backgroundColor: '#00426E' }}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};
