import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './detail.css';
import orcidLogo from "@/assets/images/orcid.logo.icon.svg";
import copy from 'copy-to-clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dataset, Taxon } from '@/api/dataset/dataset';

/**
 * Main content of detail page
 */
function Detail({ detail }: { detail: Dataset | null }) {
    const [copyMessage, setCopyMessage] = useState('');
    const [isCopied, setIsCopied] = useState(false);

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
                <div className="col-md-12 bottom-margin">
                    <h2 className="col-md-12">{detail?.datasetTitle}</h2>
                </div>

                <div className='row container-wraper margin-top'>
                    <div className="col-md-8">
                        <small className="col-md-12">Description: </small>
                        <span className="col-md-12">{detail?.datasetDescription}</span>
                        <div>
                            <small className="col-md-12 mt-3p">Taxon: </small>
                            <div>
                                {detail?.taxonomicCoverage ? (
                                    detail.taxonomicCoverage.map((taxon: Taxon, index: number) => (
                                        <div key={index}>
                                            <span className="col-md-12">Scientific name: {taxon.taxonScientificName}</span>
                                            <span className="col-md-12 pb-3p">Common Name: <a href={`https://species.biodiversitydata.se/species/${taxon.taxonGuid}`}>{taxon.taxonCommonName}</a></span>
                                        </div>
                                    ))
                                ) : (
                                    <div className='pb-3p'>No taxonomic coverage available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Instrument type: </small>
                            <div>
                                {detail?.instrumentTypes ? (
                                    detail.instrumentTypes.map((instrument, index) => (
                                        <div key={index}>
                                            <span className="col-md-12 pb-3p">{instrument}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className='pb-3p'>No instrument types available.</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <small className="col-md-12">Sensor type:  </small>
                            <span className="col-md-12 capitalize pb-3p">{detail?.valuesMeasured?.join(', ')}</span>
                        </div>
                        <div>
                            <small className="col-md-12">No. of animals: </small>
                            <span className="col-md-12 pb-3p" >{detail?.animalCount}</span>
                        </div>

                        <div>
                            <small className="col-md-12">Total records: </small>
                            <div className="col-md-12 pb-3p">
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
                        <Image className="col-md-12" src={detail?.pictureUrl ?? ""} alt="" width={350} />
                    </div>
                </div>

                <div className='row container-wraper'>
                    <div className="col-md-12">
                        <small className="col-md-12">Bibliographic citation: </small>
                        <div className="col-md-12">
                            {Array.isArray(detail?.bibliographicCitation) && detail.bibliographicCitation.map((citation, index) => (
                                <div className='pb-3p' key={index}>
                                    <div className='span'>Title: {citation.title}</div>
                                    {citation.DOI && <div className='span'>DOI: <a href={citation.DOI}>{citation.DOI}</a></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='row container-wraper'>

                    <div className="col-md-10">
                        <small className="col-md-12">Curator owner: </small>
                        <div>
                            {detail?.curator && detail.curator.map((person, index) => (
                                <span key={index}>
                                    <span className='col-md-2 pb-3p'>
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

                                    {person.ORCID ? (
                                        <div className='col-md-5'>
                                            <Image src={orcidLogo} alt="logo" width={18} height={18} />
                                            <a href={`https://orcid.org/${person.ORCID}`}>{`https://orcid.org/${person.ORCID}`}</a>
                                        </div>
                                    ) : null}

                                    <span className='col-md-5'>
                                        {person.email ? person.email : null}
                                        <FontAwesomeIcon icon={faCopy} className='copyIcon' onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }} />
                                    </span>
                                </span>
                            ))}
                        </div>

                        <small className="col-md-12">Creator: </small>
                        <div>
                            {detail?.creator.map((person, index) => (
                                <span key={index}>
                                    <span className="col-md-2 pb-3p">
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
                                    {person.ORCID ? <a href={`https://orcid.org/${person.ORCID}`} className="col-md-5"><Image src={orcidLogo} alt="logo" width={18} height={18} />{`https://orcid.org/${person.ORCID}`}</a> : null}
                                    <span className="col-md-4">
                                        {person.email ? person.email : null}
                                        <FontAwesomeIcon icon={faCopy} className='copyIcon' onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }} />
                                    </span>
                                </span>
                            ))}
                        </div>

                        <small className="col-md-12">Contact for questions:</small>
                        <span>
                            {detail?.contact.map((person, index) => (
                                <div key={index}>
                                    <span className="col-md-2 pb-3p">
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
                                    {person.ORCID ? <a href={`https://orcid.org/${person.ORCID}`} className="col-md-5"><Image src={orcidLogo} alt="logo" width={18} height={18} />{`https://orcid.org/${person.ORCID}`}</a> : null}
                                    <span className="col-md-4">
                                        {person.email ? person.email : null}
                                        <FontAwesomeIcon icon={faCopy} className='copyIcon' onClick={() => { copy(person.email); setCopyMessage('Email copied!'); setIsCopied(true); }} />
                                    </span>
                                </div>
                            ))}
                        </span>

                        <small className="col-md-12">Institution: </small>
                        <span className="col-md-12">{detail?.institutionCode}</span>
                    </div>
                    <div className="col-md-2">
                        <p className="span copy-msg">{copyMessage}</p>
                    </div>
                </div>

                <div className='row container-wraper'>
                    <div className="col-md-12">
                        <small className="col-md-12">Geographical coverage: </small>
                        <div className="col-md-12">
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

                <div className='row container-wraper'>
                    <div className="col-md-12 pb-3p">
                        {detail?.samplingDescription && <div className='col-md-3'><small>Sampling description:</small><div>{detail?.samplingDescription}</div></div>}
                        {detail?.qualityControl && <div className='col-md-3'><small>Quality control:</small><div>{detail?.qualityControl}</div></div>}
                        {detail?.relatedIdentifier && <div className='col-md-3'><small>Related identifier:</small><div>{detail?.relatedIdentifier}</div></div>}
                        {detail?.relationType && <div className='col-md-3'><small>Relation type:</small><div>{detail?.relationType}</div></div>}
                    </div>
                    <div className="col-md-12">
                        {<div className='col-md-3'><small>License:</small><div>{detail?.license}</div></div>}
                        {<div className='col-md-3'><small>Embarge end date:</small><div>{detail?.embargoEndDate}</div></div>}
                        {<div className='col-md-3'>
                            <small>Last updated | Update frequency:</small>
                            <div>
                                {detail?.dateUpdated ? detail.dateUpdated.slice(0, 10) + ' | ' + detail?.updateFrequency : 'No date available'}
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='row container-wraper pb-3p'>
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
