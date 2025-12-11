"use client";
import { useEffect, useState } from "react";
import { HomeLink, VisualisationLink } from "./links";
import { CLIENT_URL } from "@/config/constants";

import useToken from '../app/login/useToken';


//const Banner = () => {
export default function Banner() {

  const logoutAuthUrl = "https://auth.biodiversitydata.se/cas/logout";

  const [loginAuthUrl, setLoginAuthUrl] = useState("");
  
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

    /* MATOMO statistics, with buildCOmpile ignoring paramaters (ts-ignore => don't remove !!)*/ 

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
                      <li><a style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</a></li>
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

