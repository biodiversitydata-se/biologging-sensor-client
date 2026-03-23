import { useEffect, useState } from "react";
import { filterDatasets } from "@/api/dataset/api";
import { AxiosError } from "axios";
import { Dataset } from "@/api/dataset/dataset";
import { DetailLink } from "@/components/links";

/**
 * MyDatasets page, providing list of datasets editable by the user
 */
export default function MyDatasets() {
  const [data, setData] = useState<Dataset[]>([]);
  const [selected, setSelected] = useState<Dataset>();

  useEffect(() => {
    const dataFetch = async () => {
      // 👇 Get token (adjust depending on your app)
      const token = JSON.parse(localStorage.getItem("token") || "{}");

      const result = await filterDatasets({
        //curator: token.sbdiId
        curator: "14"
      });

      if (result instanceof AxiosError) return;

      setData(result.results);
    };

    dataFetch();
  }, []);

  return (
    <section className="home about">
      <div className="container">
        <div className="col-md-offset-1 col-md-10">
          <div className="row bottom-margin">
            <h3>My Datasets</h3>

            {/* 👇 simple rendering */}
            {data.length === 0 ? (
              <p>No datasets found</p>
            ) : (
              <ul>
                {data.map((dataset) => (
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