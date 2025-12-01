"use client";
import { useEffect, useState } from "react";
import { HomeLink, DatasetsLink, VisualisationLink } from "./links";
import { CLIENT_URL } from "@/config/constants";

import useToken from '../app/login/useToken';


//const Banner = () => {
export default function Banner() {
  /*
  //const currentUrl = typeof window !== "undefined" ? window.location.href : CLIENT_URL;  
  const loginAuthUrl = "https://auth.biodiversitydata.se/cas/login?service=" + CLIENT_URL + "%2Flogin";
  //const loginAuthUrl = "https://auth.biodiversitydata.se/cas/login?service=" + encodeURIComponent(currentUrl);
  //const [loginAuthUrl, setLoginAuthUrl] = useState("");
  */
  const logoutAuthUrl = "https://auth.biodiversitydata.se/cas/logout";

  const [loginAuthUrl, setLoginAuthUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { token, setToken } = useToken();

  const handleLogout = () => {
    console.log("logout => clean token et redirect");
    // 1️⃣ Remove token from localStorage and state
    localStorage.removeItem('token');
    setToken(null);

    // 2️⃣ Redirect to CAS logout endpoint
    // Many CAS servers allow a "service" query param to redirect back to your site.
    const redirectAfterLogout = window.location.origin;
    const logoutUrl = `${logoutAuthUrl}?service=${encodeURIComponent(redirectAfterLogout)}`;

    window.location.href = logoutUrl;
  };

  useEffect(() => {

    if (typeof window !== "undefined") {
      const returnUrl = window.location.href;
      const casService = `${CLIENT_URL}/login?returnUrl=${encodeURIComponent(returnUrl)}`;

      const finalUrl =
        "https://auth.biodiversitydata.se/cas/login?service=" +
        encodeURIComponent(casService);

      setLoginAuthUrl(finalUrl);
    }    
    /*
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const casUrl =
        "https://auth.biodiversitydata.se/cas/login?service=" +
        encodeURIComponent(currentUrl);

      setLoginAuthUrl(casUrl);
    }*/

    console.log("banneruseeffect");
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
                {token ? (
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User pages <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/myDatasets">My datasets</a></li>
                      <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <a href={loginAuthUrl}>Login</a>
                  </li>
                )}
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
};

