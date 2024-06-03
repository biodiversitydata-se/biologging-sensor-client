import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './detail.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import orcidLogo from "@/assets/images/orcid.logo.icon.svg";
import copy from 'copy-to-clipboard';

function Detail({ detail }: { detail: Dataset | null }) {
    const [copyMessage, setCopyMessage] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setCopyMessage('');
                setIsCopied(false);
            }, 2000);
        }
    }, [isCopied]);


    return (
        <div>
            <div className="container">
                <div className="col-md-12" style={{ marginBottom: '20px' }}>
                    <h2 className="col-md-12">{detail?.datasetTitle}</h2>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', marginTop: '40px', paddingTop: '3%', paddingBottom: '3%' }}>
                    <div className="col-md-8">
                        <small className="col-md-12">Description: </small>
                        <span className="col-md-12">{detail?.datasetDescription}</span>
                        <div>
                            <small className="col-md-12" style={{ marginTop: '3%' }}>Taxon: </small>
                            <div>
                                {detail?.taxonomicCoverage ? (
                                    detail.taxonomicCoverage.map((taxon, index) => (
                                        <div key={index}>
                                            <span className="col-md-12">Scientific name: {taxon.taxonScientificName}</span>
                                            <span className="col-md-12" style={{ paddingBottom: '3%' }}>Common Name: <a href={`https://species.biodiversitydata.se/species/${taxon.taxonGuid}`}>{taxon.taxonCommonName}</a></span>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ paddingBottom: '3%' }}>No taxonomic coverage available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Instrument type: </small>
                            <div>
                                {detail?.instrumentTypes ? (
                                    detail.instrumentTypes.map((instrument, index) => (
                                        <div key={index}>
                                            <span className="col-md-12" style={{ paddingBottom: '3%' }}>{instrument}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ paddingBottom: '3%' }}>No instrument types available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Sensor type:  </small>
                            <span className="col-md-12 capitalize" style={{ paddingBottom: '3%' }}>{detail?.valuesMeasured?.join(', ')}</span>
                        </div>
                        <div>
                            <small className="col-md-12">No. of animals: </small>
                            <span className="col-md-12" style={{ paddingBottom: '3%' }}>{detail?.animalCount}</span>
                        </div>

                        <div>
                            <small className="col-md-12">Total records: </small>
                            <div className="col-md-12" style={{ paddingBottom: '3%' }}>
                                <span>{detail?.numberOfRecords?.toLocaleString('en-US').replace(/,/g, ' ')}</span>
                            </div>
                        </div>

                        <div>
                            <div className='col-md-3'>
                                <small>Start date: </small>
                                <div>
                                    {detail?.temporalCoverage?.startDatetime?.slice(0, 10)}
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <small>End date: </small>
                                <div>
                                    {detail?.temporalCoverage?.endDateTime && detail.isFinalized ? detail.temporalCoverage.endDateTime.slice(0, 10) : "ongoing"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img className="col-md-12" src={detail?.pictureUrl ?? ""} alt="" width={350} />
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', paddingTop: '3%', paddingBottom: '3%' }}>
                    <div className="col-md-12">
                        <small className="col-md-12">Bibliographic citation: </small>
                        <div className="col-md-12">
                            {Array.isArray(detail?.bibliographicCitation) && detail.bibliographicCitation.map((citation, index) => (
                                <div key={index} style={{ paddingBottom: '3%' }}>
                                    <div className='span'>Title: {citation.title}</div>
                                    {citation.DOI && <div className='span'>DOI: <a href={citation.DOI}>{citation.DOI}</a></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', paddingTop: '3%', paddingBottom: '3%' }}>

                    <div className="col-md-10">
                        <small className="col-md-12">Curator owner: </small>
                        <div>
                            {detail?.curator && detail.curator.map((person, index) => (
                                <span key={index}>
                                    <span className='col-md-2' style={{ paddingBottom: '3%' }}>
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
                                    </span>

                                    {person.userid ? (
                                        <div className='col-md-5'>
                                            <Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />
                                            <a href={`https://orcid.org/${person.userid}`}>{`https://orcid.org/${person.userid}`}</a>
                                        </div>
                                    ) : null}

                                    <span className='col-md-5'>{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" style={{ marginLeft: '15px', cursor: 'pointer' }} viewBox="0 0 16 16" onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }}>
                                        <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                    </svg></span>
                                </span>
                            ))}
                        </div>

                        <small className="col-md-12">Creator: </small>
                        <div>
                            {detail?.creator.map((person, index) => (
                                <span key={index}>
                                    <span className="col-md-2" style={{ paddingBottom: '3%' }}>
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
                                    </span>
                                    {person.userid ? <a href={`https://orcid.org/${person.userid}`} className="col-md-5"><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />{`https://orcid.org/${person.userid}`}</a> : null}
                                    <span className="col-md-4">{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" style={{ marginLeft: '15px', cursor: 'pointer' }} viewBox="0 0 16 16" onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }}>
                                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                    </svg></span>
                                </span>
                            ))}
                        </div>

                        <small className="col-md-12">Contact for questions:</small>
                        <span>
                            {detail?.contact.map((person, index) => (
                                <div key={index}>
                                    <span className="col-md-2" style={{ paddingBottom: '3%' }}>
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
                                    </span>
                                    {person.userid ? <a href={`https://orcid.org/${person.userid}`} className="col-md-5"><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />{`https://orcid.org/${person.userid}`}</a> : null}
                                    <span className="col-md-4">{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" style={{ marginLeft: '15px', cursor: 'pointer' }} viewBox="0 0 16 16" onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }}>
                                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                    </svg></span>
                                </div>
                            ))}
                        </span>

                        <small className="col-md-12">Institution: </small>
                        <span className="col-md-12">{detail?.institutionCode}</span>
                    </div>
                    <div className="col-md-2">
                        <p className="span" style={{ margin: "0 auto" }}>{copyMessage}</p>
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', paddingTop: '3%', paddingBottom: '3%' }}>
                    <div className="col-md-12">
                        <small className="col-md-12">Geographical coverage: </small>
                        <div className="col-md-12" style={{ paddingBottom: '3%' }}>
                            {detail?.geographicalCoverage?.geographicalDescription && <div>{detail?.geographicalCoverage.geographicalDescription}</div>}
                        </div>
                        <div>
                            {detail?.geographicalCoverage?.westBoundCoordinate && <div className='col-md-3'><small>West Bound Coordinate:</small><div>{detail?.geographicalCoverage.westBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.eastBoundCoordinate && <div className='col-md-3'><small>East Bound Coordinate:</small><div>{detail?.geographicalCoverage.eastBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.northBoundCoordinate && <div className='col-md-3'><small>North Bound Coordinate:</small><div>{detail?.geographicalCoverage.northBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.southBoundCoordinate && <div className='col-md-3'><small>South Bound Coordinate:</small><div>{detail?.geographicalCoverage.southBoundCoordinate}</div></div>}
                        </div>
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', paddingTop: '3%', paddingBottom: '3%' }}>
                    <div className="col-md-12" style={{ paddingBottom: '3%' }}>
                        {detail?.samplingDescription && <div className='col-md-3'><small>Sampling description:</small><div>{detail?.samplingDescription}</div></div>}
                        {detail?.qualityControl && <div className='col-md-3'><small>Quality control:</small><div>{detail?.qualityControl}</div></div>}
                        {detail?.relatedIdentifier && <div className='col-md-3'><small>Related identifier:</small><div>{detail?.relatedIdentifier}</div></div>}
                        {detail?.relationType && <div className='col-md-3'><small>Relation type:</small><div>{detail?.relationType}</div></div>}
                    </div>
                    <div className="col-md-12">
                        {<div className='col-md-3'><small>License:</small><div>{detail?.license}</div></div>}
                        {<div className='col-md-3'><small>Version:</small><div>{detail?.version || 'No Version available.'}</div></div>}
                        {<div className='col-md-3'><small>Embarge end date:</small><div>{detail?.embargoEndDate}</div></div>}
                        {<div className='col-md-3'>
                            <small>Last updated | Update frequency:</small>
                            <div>
                                {detail?.dateUpdated ? detail.dateUpdated.slice(0, 10) + ' | ' + detail?.updateFrequency : 'No date available'}
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='row container-wrraper' style={{ paddingTop: '3%', paddingBottom: '3%' }}>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            {detail?.versions.map((keyword, index) => (
                                <span key={index} className='col-md-1'>Ver: <a href={`http://canmove-dev.ekol.lu.se/biologgingPublicArchives/${detail.datasetID}/${detail.datasetID}_json_${keyword.number.replace('.', '_')}.zip`} download>{keyword.number}</a></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
