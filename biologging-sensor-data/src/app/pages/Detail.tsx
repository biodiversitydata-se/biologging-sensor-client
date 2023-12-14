import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DatasetDetail } from '../interfaces/dataset';

function Detail() {
  const [apiData, setApiData] = useState<DatasetDetail | null>(null);
  const apiUrl = 'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/dataset/LU_trackingradar_Lundfixed_2006-13';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setApiData(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="additional-box">
          {apiData ? (
            <div>
              <div className="fetched-data-container">
                <h6>DETAILS</h6>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Dataset Title</h2>
                    <h2 className="api_data">{apiData.datasetTitle}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Dataset description</h2>
                  <h2 className="api_data">{apiData.datasetDescription}</h2>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Institution</h2>
                    <h2 className="api_data">{apiData.institutionCode}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Animal Count</h2>
                    <h2 className="api_data">{apiData.animalCount}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Start date - End Date</h2>
                  <p>
                    <h2 className="api_data">
                      {apiData.temporalCoverage ? (
                        `Start Date: ${apiData.temporalCoverage.startDate} - End Date: ${apiData.temporalCoverage.endDate}`
                      ) : (
                        'Temporal coverage information is not available.'
                      )}
                    </h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Geographical Description</h2>
                    <h2 className="api_data">
                      {apiData.geographicalDescription || 'No geographical description available.'}
                    </h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Taxon | commonName</h2>
                  <h2 className="api_data">
                    {apiData.taxonomicCoverage.map((taxon, index) => (
                      <div key={index}>
                        <p>Guid: {taxon.guid}</p>
                        <p>Scientific Name: {taxon.scientificName}</p>
                        <p>Common Name: {taxon.commonName}</p>
                      </div>
                    ))}
                  </h2>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">SensorType</h2>
                    <h2 className="api_data">{apiData.sensorTypes}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">contactCuratorOwner | Firstname & LastName</h2>
                  <h2 className="api_data">
                    {apiData.curator.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </h2>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">contactCreator | Firstname & LastName</h2>
                  <h2 className="api_data">
                    {apiData.creator.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </h2>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">contactQuestions | Firstname & LastName</h2>
                  <h2 className="api_data">
                    {apiData.contact.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </h2>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Geographical coverage</h2>
                  <h2 className="api_data">
                    {Object.keys(apiData.geographicalCoverage).map((key, index) => (
                      <div key={index}>
                        <span>{key}: {apiData.geographicalCoverage[key]}</span>
                      </div>
                    ))}
                  </h2>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Dataset License</h2>
                    <h2 className="api_data">{apiData.sensorTypes}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Institution codes</h2>
                    <h2 className="api_data">{apiData.institutionCode}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Dataset References</h2>
                  <div className="api_data">
                    {Object.entries(apiData.bibliographicCitation).map(([key, value], index) => (
                      <div key={index}>
                        <span>{key}: </span>
                        {key === 'URL' ? (
                          <a href={value} target="_blank" rel="noopener noreferrer">
                            {value}
                          </a>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Update frequency</h2>
                    <h2 className="api_data">{apiData.updateFrequency}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <p>
                    <h2 className="title">Version</h2>
                    <h2 className="api_data">{apiData.Version || 'No Version available.'}</h2>
                  </p>
                </div>

                <div className="fetched-data-row">
                  <h2 className="title">Bibliographic Citation</h2>
                  <div className="api_data">
                    {Object.entries(apiData.bibliographicCitation).map(([key, value], index) => (
                      <div key={index}>
                        <span>{key}: </span>
                        {key === 'URL' ? (
                          <a href={value} target="_blank" rel="noopener noreferrer">
                            {value}
                          </a>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* <pre>{JSON.stringify(apiData, null, 2)}</pre> */}
              </div>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Detail;
