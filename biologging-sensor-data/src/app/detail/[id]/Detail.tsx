import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './detail.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import orcidLogo from "@/assets/images/orcid.logo.icon.svg";
import { OverviewLink } from '@/components/links';
import copy from 'copy-to-clipboard'; 
import { AxiosError } from 'axios';

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
    
    useEffect(() => {
        if (detail instanceof AxiosError) {
            setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
        } else if (detail instanceof AxiosError && detail.response?.status === 404) {
            setError('Records not found. Please try again later.');
        } else {
            setError(null);
        }
    }, [detail]);

    if (error) {
        return (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#6691A4', color: '#fff', padding: '20px', borderRadius: '5px', zIndex: 999 }}>
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                <div className="col-md-12" style={{ marginBottom: '20px' }}>
                    <h2 className="col-md-12">{detail?.datasetTitle}</h2>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px', marginTop: '40px' }}>
                    <div className="col-md-8">
                        <small className="col-md-12">description: </small>
                        <strong className="col-md-12">{detail?.datasetDescription}</strong>
                        <div>
                            <small className="col-md-12">Taxon: </small>
                            <div >
                                {detail?.taxonomicCoverage ? (
                                    detail.taxonomicCoverage.map((taxon, index) => (
                                        <div key={index}>
                                            <strong className="col-md-12">Scientific Name: {taxon.taxonScientificName}</strong>
                                            <strong className="col-md-12">Common Name: <a href={`https://species.biodiversitydata.se/species/${taxon.taxonGuid}`}>{taxon.taxonCommonName}</a></strong>
                                        </div>
                                    ))
                                ) : (
                                    <div>No taxonomic coverage available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Instrument Type: </small>
                            <div>
                                {detail?.instrumentTypes ? (
                                    detail.instrumentTypes.map((instrument, index) => (
                                        <div key={index}>
                                            <strong className="col-md-12">{instrument}</strong>
                                        </div>
                                    ))
                                ) : (
                                    <div>No instrument types available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Sensor Type:  </small>
                            <strong className="col-md-12 capitalize">{detail?.valuesMeasured?.join(', ')}</strong>
                        </div>
                        <div>
                            <small className="col-md-12">No. of animals: </small>
                            <strong className="col-md-12">{detail?.animalCount}</strong>
                        </div>

                        <div>
                            <small className="col-md-12">Total records: </small>
                            <div className="col-md-12">
                                <strong>{detail?.numberOfRecords?.toLocaleString('en-US').replace(/,/g, ' ')}</strong>
                            </div>
                        </div>

                        <div>
                            <div className='col-md-3'>
                                <small>Start Date: </small>
                                <div className='strong'>
                                    {detail?.temporalCoverage?.startDatetime?.slice(0, 10)}
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <small>End Date: </small>
                                <div className='strong'>
                                    {detail?.temporalCoverage?.endDateTime && detail.isFinalized ? detail.temporalCoverage.endDateTime.slice(0, 10) : "ongoing"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img className="col-md-12" src={detail?.pictureUrl ?? ""} alt="" width={350} />
                    </div>
                </div>   

                <div className='row container-wrraper' style={{ marginBottom: '20px' }}>
                    <div className="col-md-12">
                        <small className="col-md-12">Bibliographic Citation: </small>
                        <div className="col-md-12">
                            {Array.isArray(detail?.bibliographicCitation) && detail.bibliographicCitation.map((citation, index) => (
                                <div key={index}>
                                    <div className='strong'>Title: {citation.title}</div>
                                    {citation.DOI && <div className='strong'>DOI: <a href={citation.DOI}>{citation.DOI}</a></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px' }}>
                    
                        <div className="col-md-10">
                            <small className="col-md-12">Curator Owner: </small>
                            <div>
                                {detail?.curator && detail.curator.map((person, index) => (
                                <strong key={index}>
                                    <strong className='col-md-2'>
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
                                    </strong>
                    
                                    {person.userid ? (
                                        <div className='col-md-5'>
                                            <Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />
                                            <a href={`https://orcid.org/${person.userid}`}>{`https://orcid.org/${person.userid}`}</a>
                                        </div>
                                    ) : null}
                                    
                                    <strong className='col-md-5'>{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy"  style={{ marginLeft: '15px' }} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                    </svg></strong>
                                </strong>
                                ))}
                            </div>
    
                            <small className="col-md-12">Creator: </small>
                            <div>
                                {detail?.creator.map((person, index) => (
                                    <strong key={index}>
                                        <strong className="col-md-2">
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
                                        </strong>
                                        {person.userid ? <a href={`https://orcid.org/${person.userid}`} className="col-md-5"><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />{`https://orcid.org/${person.userid}`}</a> : null}
                                        <strong className="col-md-4">{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy"  style={{ marginLeft: '15px', cursor: 'pointer' }} viewBox="0 0 16 16" onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }}>
                                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                            </svg></strong>
                                        </strong>
                                ))}
                            </div>
        
                            <small className="col-md-12">Contact for questions:</small>
                            <strong>
                                {detail?.contact.map((person, index) => (
                                    <div key={index}>
                                        <strong className="col-md-2">
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
                                        </strong>
                                        {person.userid ? <a href={`https://orcid.org/${person.userid}`} className="col-md-5"><Image src={orcidLogo} alt="logo" style={{ marginRight: '5px' }} width={18} height={18} />{`https://orcid.org/${person.userid}`}</a> : null}
                                        <strong className="col-md-4">{person.email ? person.email : null}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy"  style={{ marginLeft: '15px', cursor: 'pointer' }} viewBox="0 0 16 16"  onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }}>
                                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                            </svg></strong>
                                    </div>
                                ))}
                            </strong>
                        
                            <small className="col-md-12">Institution: </small>
                            <strong className="col-md-12">{detail?.institutionCode}</strong>
                        </div>
                        <div className="col-md-2">
                            <p className="strong" style={{margin: "0 auto"}}>{copyMessage}</p>
                        </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px' }}>
                    <div className="col-md-12">
                        <small className="col-md-12">Geographical Coverage: </small>
                        <div className="col-md-12">
                            {detail?.geographicalCoverage?.geographicalDescription && <div>{detail?.geographicalCoverage.geographicalDescription}</div>}
                        </div>
                        <div className="col-md-12">
                            {detail?.geographicalCoverage?.westBoundCoordinate && <div className='col-md-3'><small>West Bound Coordinate:</small><div>{detail?.geographicalCoverage.westBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.eastBoundCoordinate && <div className='col-md-3'><small>East Bound Coordinate:</small><div>{detail?.geographicalCoverage.eastBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.northBoundCoordinate && <div className='col-md-3'><small>North Bound Coordinate:</small><div>{detail?.geographicalCoverage.northBoundCoordinate}</div></div>}
                            {detail?.geographicalCoverage?.southBoundCoordinate && <div className='col-md-3'><small>South Bound Coordinate:</small><div>{detail?.geographicalCoverage.southBoundCoordinate}</div></div>}
                        </div>
                    </div>
                </div>

                <div className='row container-wrraper' style={{ marginBottom: '20px'}}>
                    <div className="col-md-12">
                        {detail?.samplingDescription && <div className='col-md-3'><small>Sampling Description:</small><div>{detail?.samplingDescription}</div></div>}
                        {detail?.qualityControl && <div className='col-md-3'><small>Quality Control:</small><div>{detail?.qualityControl}</div></div>}
                        {detail?.relatedIdentifier && <div className='col-md-3'><small>Related Identifier:</small><div>{detail?.relatedIdentifier}</div></div>}
                        {detail?.relationType && <div className='col-md-3'><small>Relation Type:</small><div>{detail?.relationType}</div></div>}
                    </div>
                    <div className="col-md-12">
                        {<div className='col-md-3'><small>License:</small><div>{detail?.license}</div></div>}
                        {<div className='col-md-3'><small>Version:</small><div>{detail?.version || 'No Version available.'}</div></div>}
                        {<div className='col-md-3'><small>Embargo end date place:</small><div>{detail?.embargoEndDate}</div></div>}
                        {<div className='col-md-3'>
                            <small>Last Updated | UpdateFrequency:</small>
                            <div>
                                {detail?.dateUpdated ? detail.dateUpdated.slice(0, 10) + ' | ' + detail?.updateFrequency : 'No date available'}
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='row container-wrraper'>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            {detail?.versions.map((keyword, index) => (
                                <span key={index}>Ver: <a href={`http://canmove-dev.ekol.lu.se/biologgingPublicArchives/${detail.datasetID}/${detail.datasetID}_json_${keyword.number.replace('.', '_')}.zip`} download>{keyword.number}</a></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
