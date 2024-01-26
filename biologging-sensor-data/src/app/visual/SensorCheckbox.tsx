import React from 'react';

interface SensorCheckboxProps {
  sensorID: string;
  isChecked: boolean;
  onChange: (sensorID: string, isChecked: boolean) => void;
}

const SensorCheckbox: React.FC<SensorCheckboxProps> = ({ sensorID, isChecked, onChange }) => {
  console.log("sensorID:", sensorID);
  console.log("isChecked:", isChecked);

  return (
    <label>
      <input
        type="checkbox"
        value={sensorID}
        checked={isChecked}
        onChange={(e) => onChange(sensorID, e.target.checked)}
      />
      {sensorID}
    </label>
  );
};

export default SensorCheckbox;
