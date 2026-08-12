import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import {
  filterDatasets,
  getDocumentsByDataset,
  uploadDocument,
  deleteDocument,
} from "@/api/dataset/api";
import { Dataset } from "@/api/dataset/dataset";

export default function MyDocuments() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("");

  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  //const [uploadResponse, setUploadResponse] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  /**
   * Load datasets
   */
  useEffect(() => {
    const fetchDatasets = async () => {
      const token = JSON.parse(
        localStorage.getItem("token") || "{}"
      );

      const result = await filterDatasets({
        curator: String(token.sbdiId),
      });

      if (result instanceof AxiosError) {
        return;
      }

      setDatasets(result.results || []);
    };

    fetchDatasets();
  }, []);

  /**
   * Load documents for selected dataset
   */
  useEffect(() => {
    if (!selectedDatasetId) {
      setDocuments([]);
      return;
    }

    const fetchDocuments = async () => {
      setLoadingDocuments(true);

      const result = await getDocumentsByDataset(
        selectedDatasetId
      );

      if (!(result instanceof AxiosError)) {
        setDocuments(result.results || result);
      }

      setLoadingDocuments(false);
    };

    fetchDocuments();
  }, [selectedDatasetId]);

  /**
   * Upload selected file
   */
  const handleUpload = async () => {
    if (!selectedDatasetId) {
      alert("Please select a dataset.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File exceeds 50 MB limit.");
      return;
    }

    setUploading(true);
    setStatusMessage("");
    setStatusType("");

    try {
      /*const response = await uploadDocument(
        selectedDatasetId,
        selectedFile
      );
      setUploadResponse(response);*/
      await uploadDocument(
        selectedDatasetId,
        selectedFile
      );

      setStatusMessage("File uploaded successfully!");
      setStatusType("success");
      
      const docsResult = await getDocumentsByDataset(
        selectedDatasetId
      );

      if (!(docsResult instanceof AxiosError)) {
        setDocuments(docsResult.results || docsResult);
      }

      setSelectedFile(null);
    } catch (error) {
      setStatusMessage("Error uploading the file.");
      setStatusType("error");
    } finally {
      setUploading(false);
    }
  };

  /**
   * Delete document
   */
  const handleDeleteDocument = async (document: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(document.documentID);

      setStatusMessage("Document deleted successfully!");
      setStatusType("success");

      const docsResult = await getDocumentsByDataset(
        selectedDatasetId
      );

      if (!(docsResult instanceof AxiosError)) {
        setDocuments(docsResult.results || docsResult);
      }
    } catch (error) {
      setStatusMessage("Error deleting the document. "+error);
      setStatusType("error");
    }
  };

  return (
    <section className="home about">
      <div className="container">
        <div className="col-md-offset-1 col-md-10">
          <div className="row bottom-margin">
            <h3>
              Pick one of your datasets to list its documents
            </h3>

            {datasets.length === 0 ? (
              <p>No datasets found.</p>
            ) : (
              <div style={{ marginBottom: "20px" }}>
                <select
                  id="dataset-select"
                  className="form-control"
                  value={selectedDatasetId}
                  onChange={(e) =>
                    setSelectedDatasetId(e.target.value)
                  }
                >
                  <option value="">
                    -- Choose a dataset --
                  </option>

                  {datasets.map((dataset) => (
                    <option
                      key={dataset.datasetID}
                      value={dataset.datasetID}
                    >
                      {dataset.datasetTitle ||
                        dataset.datasetID}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedDatasetId && (
              <>
                <h4>Documents</h4>

                {loadingDocuments ? (
                  <p>Loading documents...</p>
                ) : documents.length === 0 ? (
                  <p>No documents found.</p>
                ) : (
                  <ul>
                    {documents.map(
                      (document: any, index: number) => (
                        <li
                          key={`${document.documentFilename}-${index}`}
                          style={{ marginBottom: "20px" }}
                        >
                          <strong>
                            {document.documentTitle}
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteDocument(document)
                            }
                            title="Delete document"
                            aria-label={`Delete ${document.documentTitle}`}
                            style={{
                              marginLeft: "10px",
                              border: "none",
                              background: "transparent",
                              color: "#dc3545",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                          >
                            🗑️
                          </button>

                          {document.documentDescription && (
                            <>
                              <br />
                              {document.documentDescription}
                            </>
                          )}

                          <br />
                          File:{" "}
                          {document.documentFilename}

                          {document.documentFileformat && (
                            <>
                              {" "}
                              (
                              {
                                document.documentFileformat
                              }
                              )
                            </>
                          )}

                          {document.documentUploadDate && (
                            <>
                              <br />
                              Uploaded:{" "}
                              {new Date(
                                document.documentUploadDate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                )}

                <hr />

                <h4>Add Document</h4>

                <div
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      if (
                        file.size >
                        MAX_FILE_SIZE
                      ) {
                        alert(
                          "Maximum file size is 50 MB."
                        );
                        return;
                      }

                      setSelectedFile(file);
                    }}
                  />
                </div>

                {selectedFile && (
                  <p>
                    Selected file:{" "}
                    <strong>
                      {selectedFile.name}
                    </strong>
                    {" ("}
                    {(
                      selectedFile.size /
                      1024 /
                      1024
                    ).toFixed(2)}
                    {" MB)"}
                  </p>
                )}

                <button
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={
                    !selectedDatasetId ||
                    !selectedFile ||
                    uploading
                  }
                >
                  {uploading
                    ? "Uploading..."
                    : "Add Document"}
                </button>

                {statusMessage && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "12px",
                      borderRadius: "4px",
                      backgroundColor:
                        statusType === "success" ? "#d4edda" : "#f8d7da",
                      color:
                        statusType === "success" ? "#155724" : "#721c24",
                      border: `1px solid ${
                        statusType === "success" ? "#c3e6cb" : "#f5c6cb"
                      }`,
                    }}
                  >
                    {statusMessage}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}