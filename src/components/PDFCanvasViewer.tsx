import React, { useEffect, useRef, useState } from "react";
import axiosWithToken from "@/api/axiosWithToken";

interface PDFCanvasViewerProps {
  documentId: string;
  apiType: "legacy" | "personal";
}

const PDFCanvasViewer: React.FC<PDFCanvasViewerProps> = ({
  documentId,
  apiType,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlob = async () => {
      try {
        const endpoint =
          apiType === "legacy"
            ? `/upload-documents/preview-document-v2`
            : `/private-attorney/preview-case-document`;

        const response = await axiosWithToken.get(
          `${endpoint}?documentId=${documentId}`,
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (err) {
        console.error("Error fetching PDF blob:", err);
        setError("Failed to load document.");
      }
    };

    if (documentId) {
      fetchBlob();
    }

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [documentId, apiType]);

  if (!documentId) return <div>No document ID provided</div>;

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      {error ? (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          {error}
        </div>
      ) : !blobUrl ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
      ) : (
        <iframe
          ref={iframeRef}
          src={blobUrl}
          title="Document Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      )}
    </div>
  );
};

export default PDFCanvasViewer;
