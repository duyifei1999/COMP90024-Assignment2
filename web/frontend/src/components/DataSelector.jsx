import React, { useState } from "react";
import { Select } from "@geist-ui/react";

const DataSelector = ({ addDataToMap }) => {
  const [db, SetDb] = useState(null);
  const [scenario, SetScenario] = useState(null);
  const [saLevel, SetSaLevel] = useState(0);

  const handleCollectionChange = (value) => {
    SetDb(value);
  };

  const handleScenarioChange = (value) => {
    SetScenario(value);
  };

  const handleSaLevelChange = (value) => {
    SetSaLevel(parseInt(value));
  };

  return (
    <div className="data-selector-container">
      <Select
        className="data-selector__select"
        clearable={true}
        placeholder={"Data Collection"}
        onChange={handleCollectionChange}
      >
        <Select.Option value={process.env.REACT_APP_OLD_TWEETS_DB_NAME}>
          Old Tweets
        </Select.Option>
        <Select.Option value={process.env.REACT_APP_NEW_TWEETS_DB_NAME}>
          New Tweets
        </Select.Option>
        <Select.Option value="aurin">AURIN Data</Select.Option>
      </Select>
      <Select
        className="data-selector__select"
        clearable={true}
        placeholder={"Scenario"}
        onChange={handleScenarioChange}
      >
        <Select.Option value="housing">Housing</Select.Option>
        <Select.Option value="language">Language</Select.Option>
      </Select>
      <Select
        className="data-selector__select"
        clearable={true}
        placeholder={"Statistical Area Level"}
        onChange={handleSaLevelChange}
      >
        <Select.Option value="2">Statistical Area Level 2</Select.Option>
        <Select.Option value="3">Statistical Area Level 3</Select.Option>
        <Select.Option value="4">Statistical Area Level 4</Select.Option>
      </Select>
      <button
        className="data-selector__display-button"
        onClick={() => {
          addDataToMap(db, scenario, saLevel);
        }}
        disabled={!db || !scenario || !saLevel}
      >
        DISPLAY
      </button>
    </div>
  );
};

export default DataSelector;
