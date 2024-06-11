import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Content of "About" page
 */
export default function About() {
    return (
        <section className="home about">
            <div className="container">
                <div className="col-md-offset-1 col-md-10">
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <p>SBDI Biologging tools manages data from animal sensor systems.  Biologging research involves the collection of time-series sensor data. The data can be used to create visualisations of e.g. migration tracks, foraging and home range trajectories and/or to characterize behaviour or physiology of animals. The main data providers are currently Lund University (the CAnMove animal movement database) and the Swedish University of Life Sciences (the WRAM wireless remote animal monitoring database).</p>
                        <p>SBDI Biologging is part of the SBDI infrastructure. If you would like to connect using the API follow this link. An example use can be studied in the client repo <a href="https://github.com/biodiversitydata-se/biologging-sensor-client">https://github.com/biodiversitydata-se/biologging-sensor-client</a></p>
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                        <h3>About the API</h3>
                        <p>All the data displayed on this website is obtained via the Biologging Open API <a href="http://canmove-dev.ekol.lu.se:8080/biologgingAPI/v1/docs">http://canmove-dev.ekol.lu.se:8080/biologgingAPI/v1/docs</a></p>
                        <p>Its datamodel is following <a href="https://github.com/biodiversitydata-se/biologging-sensor-datamodel">the format described here.</a></p>
                        <p>If you encounter any problem with the API, please contact us !</p>
                    </div>

                    <div className="row">
                        <h3>Contact us:</h3>
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>
                        <a href="mailto:biologging@biodiversitydata.se"> biologging@biodiversitydata.se</a>
                        <p>Are you a researcher who would like to contribute biologging data? Please contact us.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}