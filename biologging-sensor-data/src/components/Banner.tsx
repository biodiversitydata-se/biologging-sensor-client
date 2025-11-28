"use client";
import { useEffect } from "react";
import { HomeLink, VisualisationLink } from "./links";

const Banner = () => {

  useEffect(() => {

    /* MATOMO statistics, with buildCOmpile ignoring paramaters (ts-ignore => don't remove !!)*/ 

    /*
    // @ts-ignore
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    (function() {
      // @ts-ignore
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      // @ts-ignore
      g.async=true; g.src='https://matomo.biodiversitydata.se/js/container_YZLb7LKK.js'; s.parentNode.insertBefore(g,s);
    })();
    */

    // @ts-ignore
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="//matomo.biodiversitydata.se/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '11']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      // @ts-ignore
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();    
    /* end of MATOMO plugin */
  }, []);

  /*
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//matomo.biodiversitydata.se/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '11']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
  */
  return (
    <>
      <header>

        {/* Banner */}
        <div className="container">
          <div className="banner">
            <a href="https://biodiversitydata.se/" title="Swedish Biodiversity Data Infrastructure">
              <img src="https://bioatlas.biodiversitydata.se/app/themes/sbdi/assets/images/SBDI-rgb.svg" alt="Swedish Biodiversity Data Infrastructure" />
            </a>
            <p>Swedish Biodiversity Data Infrastructure</p>
            <a className="hidden-xs" href="https://biodiversitydata.se/explore-data/">
              <i className="fas fa-arrow-circle-right"></i>&nbsp;All SBDI tools
            </a>
          </div>
        </div>

        {/* Navbar */}
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li> 
                  <HomeLink>Swedish Biologging Portal</HomeLink>
                </li>
                <li> 
                  <a href="/datasetOverview" >Dataset Listing</a>
                  {/* to make sure css is reloaded for table <DatasetsLink>Dataset Listing</DatasetsLink> */}
                </li>
                <li> 
                  <VisualisationLink datasetId="all">Dataset Visualisation</VisualisationLink>
                </li>
                <li className="visible-xs-inline">
                  <a href="https://biodiversitydata.se/explore-data/">All SBDI tools</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </header>
    </>
  )
}

export default Banner;