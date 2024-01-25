'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DatasetDetail } from '../../interfaces/dataset';
import '../index.css';

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
              <div className="fetched-data-container container-fluid">
                <div className='container-header border-style'>DETAILS</div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Dataset Title: </div>
                    <div className="api_data col-md-6">{apiData.datasetTitle}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Dataset description: </div>
                  <div className="api_data col-md-6">{apiData.datasetDescription}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Geographical Description: </div>
                    <div className="api_data col-md-6">
                      {apiData.geographicalDescription || 'No geographical description available.'}
                    </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Start date - End Date: </div>
                    <div className="api_data col-md-6">
                      {apiData.temporalCoverage ? (
                        `Start Date: ${apiData.temporalCoverage.startDate} - End Date: ${apiData.temporalCoverage.endDate}`
                      ) : (
                        'Temporal coverage information is not available.'
                      )}
                    </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Dataset References: </div>
                  <div className="api_data col-md-6">
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

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Bibliographic Citation: </div>
                  <div className="api_data col-md-6">
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

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">ContactCuratorOwner | Firstname & LastName: </div>
                  <div className="api_data col-md-6">
                    {apiData.curator.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName + ', '}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">ContactCreator | Firstname & LastName: </div>
                  <div className="api_data col-md-6">
                    {apiData.creator.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName + ', '}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">ContactQuestions | Firstname & LastName</div>
                  <div className="api_data col-md-6">
                    {apiData.contact.map((person, index) => (
                      <div key={index}>
                        <span>First Name: {person.firstName + ', '}</span>
                        <span>Last Name: {person.lastName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='col-md-6 del-padding'>
                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Institution: </div>
                    <div className="api_data col-md-6">{apiData.institutionCode}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Animal Count: </div>
                    <div className="api_data col-md-6">{apiData.animalCount}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Taxon | commonName: </div>
                  <div className="api_data col-md-6">
                    {apiData.taxonomicCoverage.map((taxon, index) => (
                      <div key={index}>
                        <p>Guid: {taxon.guid}</p>
                        <p>Scientific Name: {taxon.scientificName}</p>
                        <p>Common Name: {taxon.commonName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Sensor Type: </div>
                    <div className="api_data col-md-6">{apiData.sensorTypes}</div>
                </div>
                </div>

                <div className="col-md-6 del-padding">
                <div className="fetched-data-row col-md-12 border-style">
                  <div className="title col-md-6">Geographical coverage: </div>
                  <div className="api_data col-md-6">
                    {Object.keys(apiData.geographicalCoverage).map((key, index) => (
                      <div key={index}>
                        <span>{key}: {apiData.geographicalCoverage[key]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                  <p>
                    <div className="title col-md-6">Dataset License: </div>
                    <div className="api_data col-md-6">{apiData.sensorTypes}</div>
                  </p>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Institution codes: </div>
                    <div className="api_data col-md-6">{apiData.institutionCode}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Update frequency: </div>
                    <div className="api_data col-md-6">{apiData.updateFrequency}</div>
                </div>

                <div className="fetched-data-row col-md-12 border-style">
                    <div className="title col-md-6">Version: </div>
                    <div className="api_data col-md-6">{apiData.Version || 'No Version available.'}</div>
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
