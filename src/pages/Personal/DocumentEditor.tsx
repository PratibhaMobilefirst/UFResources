
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Printer, Download, Eye, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DocumentEditor = () => {
  const { caseId, documentId } = useParams();
  const navigate = useNavigate();
  
  const [documentData, setDocumentData] = useState({
    title: "Sample Legal Document",
    content: "This is a sample legal document content that can be edited...",
    lastModified: new Date().toLocaleDateString(),
  });

  const [activeTab, setActiveTab] = useState("editor");

  const handleInputChange = (field: string, value: string) => {
    setDocumentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving document:", documentData);
    
    toast({
      title: "Success",
      description: "Document saved successfully!",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([documentData.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${documentData.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Success",
      description: "Document downloaded successfully!",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/personal-detail/${caseId}`)}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Document Editor</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleSave} className="bg-[#00426E] hover:bg-[#003058]">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doc-title">Title</Label>
                      <Input
                        id="doc-title"
                        value={documentData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Last Modified</Label>
                      <p className="text-sm text-gray-600">{documentData.lastModified}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Case ID</Label>
                      <p className="text-sm text-gray-600">{caseId}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Document ID</Label>
                      <p className="text-sm text-gray-600">{documentId}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Document Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={documentData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Enter document content here..."
                      rows={25}
                      className="font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{documentData.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-6 rounded-lg border">
                    {documentData.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DocumentEditor;