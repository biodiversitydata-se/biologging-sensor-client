import { useEffect, useState } from "react";
import { filterDatasets } from "@/api/dataset/api";
import { AxiosError } from "axios";
import { Dataset } from "@/api/dataset/dataset";
import { DetailLink } from "@/components/links";

/**
 * MyDatasets page, providing list of datasets editable by the user
 */
export default function MyDatasets() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selected, setSelected] = useState<Dataset>();

  useEffect(() => {
    const dataFetch = async () => {
      // 👇 Get token (adjust depending on your app)
      const token = JSON.parse(localStorage.getItem("token") || "{}");

      const result = await filterDatasets({
        curator: String(token.sbdiId)
      });

      if (result instanceof AxiosError) return;

      setDatasets(result.results);
    };

    dataFetch();
  }, []);

  return (
    <section className="home about">
      <div className="container">
        <div className="col-md-offset-1 col-md-10">
          <div className="row bottom-margin">
            <h3>My Datasets (my SBDI Id is referenced as curator)</h3>

            {/* 👇 simple rendering */}
            {datasets?.length === 0 ? (
              <p>No datasets found</p>
            ) : (
              <ul>
                {datasets?.map((dataset) => (
                  <li key={dataset.datasetID}>
                    <DetailLink datasetId={dataset.datasetID}>
                      {dataset.datasetTitle || dataset.datasetID}
                    </DetailLink>
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}