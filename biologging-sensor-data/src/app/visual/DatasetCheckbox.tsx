import React from 'react';

interface DatasetCheckboxProps {
  dataset: {
    datasetID: string;
    datasetTitle: string;
    recordID: string | undefined;
    projectID: string | undefined;
  };
  isChecked: boolean;
  onChange: (selected: string[], isChecked: boolean) => void;
}

const DatasetCheckbox: React.FC<DatasetCheckboxProps> = ({ dataset, isChecked, onChange }) => {
  console.log("datasetID:", dataset.datasetID);
  console.log("isChecked:", isChecked);

  return (
    <label>
      <input
        type="checkbox"
        value={dataset.datasetID}
        checked={isChecked}
        onChange={(e) => onChange([dataset.datasetID], e.target.checked)}
      />
      {dataset.datasetTitle}
    </label>
  );
};

export default DatasetCheckbox;
