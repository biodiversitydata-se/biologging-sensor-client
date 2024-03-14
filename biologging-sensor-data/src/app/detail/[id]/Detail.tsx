import Image from 'next/image';
import React, { } from 'react';
import './detail.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import Link from "next/link";
import { TEST_URL_BASE } from "@/constants";
import orcidLogo from "@/assets/images/orcid.logo.icon.svg";

function Detail({ detail }: { detail: Dataset | null }) {
    console.log('detail', detail);

    const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'test' ? TEST_URL_BASE : '/';

    return (
        <div>
            <div className="container">
                <h5>
                    <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                    <Link href={{
                            pathname: `/`,
                          }}
                            as={baseUrl}
                          > Back</Link>
                </h5>
                <div className='panel panel-default'>
                    <div className='panel-body row'>
                        <div className="col-md-12">
                            <strong className="col-md-6 text-bold">Dataset Title: </strong>
                            <div className="col-md-6">{detail?.datasetTitle}</div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Dataset description: </strong>
                            <div className="col-md-6">{detail?.datasetDescription}</div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Start date - End Date: </strong>
                            <div className="col-md-6">
                                {detail?.temporalCoverage?.startDatetime?.slice(0, 10)} - {detail?.temporalCoverage?.endDateTime && detail.isFinalized ? detail.temporalCoverage.endDateTime.slice(0, 10) : "ongoing"}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Total records: </strong>
                            <div className="col-md-6">
                                {detail?.numberOfRecords?.toLocaleString('en-US').replace(/,/g, ' ')}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Bibliographic Citation: </strong>
                            <div className="col-md-6">
                                {Array.isArray(detail?.bibliographicCitation) && detail.bibliographicCitation.map((citation, index) => (
                                    <div key={index}>
                                        <div>Title: {citation.title}</div>
                                        {citation.DOI && <div>DOI: <a href={citation.DOI}>{citation.DOI}</a></div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Contact Curator Owner: </strong>
                            <div className="col-md-6">
                                {detail?.curator.map((person, index) => (
                                    <div key={index}>
                                        <div>
                                            {person.webpage ? (
                                                <a href={person.webpage}>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </a>
                                            ) : (
                                                <>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </>
                                            )}
                                        </div>
                                        <div>{person.email ? person.email : null}</div>
                                        {person.userid ? <div><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} /><a href={`https://orcid.org/${person.userid}`}>{`https://orcid.org/${person.userid}`}</a></div> : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Contact Creator: </strong>
                            <div className="col-md-6">
                                {detail?.creator.map((person, index) => (
                                    <div key={index}>
                                         <div>
                                            {person.webpage ? (
                                                <a href={person.webpage}>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </a>
                                            ) : (
                                                <>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </>
                                            )}
                                        </div>
                                        <div>{person.email ? person.email : null}</div>
                                        {person.userid ? <div><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} /><a href={`https://orcid.org/${person.userid}`}>{`https://orcid.org/${person.userid}`}</a></div> : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">ContactQuestions:</strong>
                            <div className="col-md-6">
                                {detail?.contact.map((person, index) => (
                                    <div key={index}>
                                        <div>
                                            {person.webpage ? (
                                                <a href={person.webpage}>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </a>
                                            ) : (
                                                <>
                                                    <span>{person.firstName + ', '}</span>
                                                    <span>{person.lastName}</span>
                                                </>
                                            )}
                                        </div>
                                        <div>{person.email ? person.email : null}</div>
                                        {person.userid ? <div><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} /><a href={`https://orcid.org/${person.userid}`}>{`https://orcid.org/${person.userid}`}</a></div> : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                                <strong className="col-md-6">Taxon: </strong>
                                <div className="col-md-6">
                                    {detail?.taxonomicCoverage.map((taxon, index) => (
                                        <div key={index}>
                                            <div>Guid: <a href={`https://species.biodiversitydata.se/species/${taxon.taxonGuid}`}>{`https://species.biodiversitydata.se/species/${taxon.taxonGuid}`}</a></div>
                                            <div>Scientific Name: {taxon.taxonScientificName}</div>
                                            <div>Common Name: {taxon.taxonCommonName}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                                <strong className="col-md-6">Sensor Type:  </strong>
                                <div className="col-md-6">{detail?.valuesMeasured?.join(', ')}</div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                                <strong className="col-md-3">Institution: </strong>
                                <div className="col-md-3">{detail?.institutionCode}</div>
                            </div>

                            <div>
                                <strong className="col-md-3">Animal Count: </strong>
                                <div className="col-md-3">{detail?.animalCount}</div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                                <strong className="col-md-3">Geographical coverage: </strong>
                                <div className="col-md-3">
                                    {detail?.geographicalCoverage?.westBoundCoordinate && <div>West Bound Coordinate: {detail?.geographicalCoverage.westBoundCoordinate}</div>}
                                    {detail?.geographicalCoverage?.eastBoundCoordinate && <div>East Bound Coordinate: {detail?.geographicalCoverage.eastBoundCoordinate}</div>}
                                    {detail?.geographicalCoverage?.northBoundCoordinate && <div>North Bound Coordinate: {detail?.geographicalCoverage.northBoundCoordinate}</div>}
                                    {detail?.geographicalCoverage?.southBoundCoordinate && <div>South Bound Coordinate: {detail?.geographicalCoverage.southBoundCoordinate}</div>}
                                    {detail?.geographicalCoverage?.geographicalDescription && <div>Description: {detail?.geographicalCoverage.geographicalDescription}</div>}
                                </div>
                            </div>

                            <div>
                                <strong className="col-md-3">Dataset License: </strong>
                                <div className="col-md-3">{detail?.license}</div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                                <strong className="col-md-3">Institution codes: </strong>
                                <div className="col-md-3">{detail?.institutionCode}</div>
                            </div>

                            <div>
                                <strong className="col-md-3">Embargo end date place : </strong>
                                <div className="col-md-3">{detail?.embargoEndDate}</div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div>
                               <strong className="col-md-3">Update frequency: </strong>
                               <div className="col-md-3">{detail?.updateFrequency}</div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <strong className="col-md-6">Version: </strong>
                            <div className="col-md-6">{detail?.version || 'No Version available.'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Detail;
