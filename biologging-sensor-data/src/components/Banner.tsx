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
      <header id="masthead" className="site-header header-v1">
        <div id="masthead-inner" className="site-header-inner">
          <div className="header-main header--row layout-full-contained" id="cb-row--header-main" data-row-id="main"
            data-show-on="desktop mobile">
            <div className="header--row-inner header-main-inner light-mode">
              <div className="customify-container">
                <div className="customify-grid cb-row--desktop hide-on-mobile hide-on-tablet customify-grid-middle">
                  <div className="customify-col-6_md-6_sm-6 builder-item builder-first--logo builder-item--group"
                    data-push-left="">
                    <div className="item--inner builder-item--logo" data-section="title_tagline" data-item-id="logo">
                      <div className="site-branding logo-bottom">
                        <a href="https://biodiversitydata.se/" className="logo-link" rel="home" itemProp="url">
                          <img className="site-img-logo" src="https://static.biodiversitydata.se/images/sbdi-logo-orginal-large.png"
                            alt="Swedish Biodiversity Data Infrastructure" />
                        </a>
                      </div>{/* .site-branding */}
                    </div>
                    <div className="item--inner builder-item--html " data-section="header_html" data-item-id="html">
                      <div className="builder-header-html-item item--html">
                        <p data-i18n="general.orgfullname">Swedish Biodiversity Data Infrastructure</p>
                      </div>
                    </div>
                  </div>
                  <div className="customify-col-6_md-6_sm-6 builder-first--search_box builder-item--group"
                    data-push-left="">
                    <div id="auth-header-buttons"
                      className="item--inner builder-item--button hide-on-mobile hide-on-tablet ::loginStatus::"
                      data-section="header_button" data-item-id="button">
                      <a target="_new" href="https://biodiversitydata.se"
                        className="item--button customify-btn customify-builder-btn is-icon-before">
                        <i className="fas fa-external-link-alt"></i>&nbsp; <span data-i18n="nav.link-to-sbdi">SBDI Home</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cb-row--mobile hide-on-desktop customify-grid customify-grid-middle">
                <div className="customify-col-12_md-12_sm-12 builder-item builder-first--logo" data-push-left="">
                  <div className="item--inner builder-item--logo" data-section="title_tagline" data-item-id="logo">
                    <div className="site-branding logo-bottom">
                      <a href="https://biodiversitydata.se" className="logo-link" rel="home" itemProp="url">
                        <img className="site-img-logo" src="https://static.biodiversitydata.se/images/sbdi-logo-orginal-large.png"
                          alt="Swedish Biodiversity Data Infrastructure" />
                      </a>
                    </div> {/* .site-branding */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom header--row layout-full-contained hide-on-mobile hide-on-tablet" id="cb-row--header-bottom"
          data-row-id="bottom" data-show-on="desktop mobile">
          <div className="header--row-inner header-bottom-inner">
            <div className="customify-container">
              <div className="customify-grid cb-row--desktop hide-on-mobile hide-on-tablet customify-grid-middle">
                <div className="customify-col-12_md-12_sm-12 builder-item builder-first--primary-menu" data-push-left="">
                  <div className="item--inner builder-item--primary-menu has_menu" data-section="header_menu_primary"
                    data-item-id="primary-menu">
                    <nav id="site-navigation-bottom-desktop"
                      className="site-navigation primary-menu primary-menu-bottom nav-menu-desktop primary-menu-desktop style-plain">
                      <ul id="menu-nested-pages-main-menu" className="primary-menu-ul menu nav-menu">
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
                          
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                            <a href="/myDatasets" ><span
                                className="link-before">User pages<span className="nav-icon-angle">&nbsp;</span></span></a>
                            <ul className="sub-menu sub-lv-0">
                              {/*<li>
                                <a href="/myDatasets" >My datasets</a>
                              </li>*/}
                              <li className="menu-item menu-item-type-custom"><a onClick={handleLogout}><span className="link-before">Logout</span></a></li>
                              
                            </ul>
                          </li>
                        ) : (
                          <li>
                            <a href={loginAuthUrl}>Login</a>
                          </li>
                        )}

                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- Mobile Navbar  --> */}

      <nav className="navbar navbar-default hide-on-desktop">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand hide-on-desktop" href="https://static.biodiversitydata.se" data-i18n="general.orgfullname"></a>
          </div>

          {isOpen && (
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                {/* ...your links... */}

                <li>
                  <HomeLink>Swedish Biologging Portal</HomeLink>
                </li>
                <li>
                  <DatasetsLink>Dataset Listing</DatasetsLink>
                </li>
                <li>
                  <VisualisationLink datasetId="all">Dataset Visualisation</VisualisationLink>
                </li>
                {token ? (
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <li>
                    <a href={loginAuthUrl}>Login</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  )
};

