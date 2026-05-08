import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { filterDatasets, getDocumentsByDataset } from "@/api/dataset/api";
import { Dataset } from "@/api/dataset/dataset";

// Adjust the import below depending on your actual document type location
// import { Document } from "@/api/document/document";

import { DetailLink } from "@/components/links";

/**
 * MyDocuments page
 * - Lists user datasets in a dropdown
 * - Displays documents belonging to the selected dataset
 */
export default function MyDocuments() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  /**
   * Fetch datasets owned by current user
   */
  useEffect(() => {
    const dataFetch = async () => {
      const token = JSON.parse(localStorage.getItem("token") || "{}");

      const result = await filterDatasets({
        curator: String(token.sbdiId)
      });

      if (result instanceof AxiosError) return;

      setDatasets(result.results);
    };

    dataFetch();
  }, []);

  /**
   * Fetch documents when dataset changes
   */
  useEffect(() => {
    if (!selectedDatasetId) {
      setDocuments([]);
      return;
    }

    const fetchDocuments = async () => {
      setLoadingDocuments(true);

      const result = await getDocumentsByDataset(selectedDatasetId);

      if (result instanceof AxiosError) {
        setLoadingDocuments(false);
        return;
      }

      // Adjust depending on your API response shape
      setDocuments(result.results || result);

      setLoadingDocuments(false);
    };

    fetchDocuments();
  }, [selectedDatasetId]);

  return (
    <section className="home about">
      <div className="container">
        <div className="col-md-offset-1 col-md-10">
          <div className="row bottom-margin">
            <h3>Pick one of your dataset to list your documents</h3>

            {/* Dataset selector */}
            {datasets?.length === 0 ? (
              <p>No datasets found</p>
            ) : (
              <div style={{ marginBottom: "20px" }}>

                <select
                  id="dataset-select"
                  className="form-control"
                  value={selectedDatasetId}
                  onChange={(e) => setSelectedDatasetId(e.target.value)}
                >
                  <option value="">-- Choose a dataset --</option>

                  {datasets?.map((dataset) => (
                    <option
                      key={dataset.datasetID}
                      value={dataset.datasetID}
                    >
                      {dataset.datasetTitle || dataset.datasetID}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Documents list */}
            {selectedDatasetId && (
              <div>
                <h4>Documents</h4>

                {loadingDocuments ? (
                  <p>Loading documents...</p>
                ) : documents.length === 0 ? (
                  <p>No documents found in this dataset</p>
                ) : (
                  <ul>
                    {documents.map((document: any) => (
                      <li
                        key={
                          document.documentID ||
                          document.id ||
                          document.filename
                        }
                      >
                        {/* Adjust fields depending on your API */}
                        {document.title ||
                          document.filename ||
                          document.documentID}

                        {/* Optional dataset detail link */}
                        {" - "}
                        <DetailLink datasetId={selectedDatasetId}>
                          View Dataset
                        </DetailLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}