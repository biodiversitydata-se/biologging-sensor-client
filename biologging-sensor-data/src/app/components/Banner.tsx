const Banner = () => {
  const firstname = localStorage.getItem('firstname');


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
                    <a href="/" className="logo-link" rel="home" itemProp="url">
                      <img className="site-img-logo" src="https://static.biodiversitydata.se/images/sbdi-logo-orginal-large.png"
                        alt="Swedish Biodiversity Data Infrastructure"/>
                    </a>
                  </div>{/* .site-branding */}
                </div>
                <div className="item--inner builder-item--html " data-section="header_html" data-item-id="html">
                  <div className="builder-header-html-item item--html">
                    <p data-i18n="general.orgfullname"></p>
                  </div>
                </div>
              </div>
              <div className="customify-col-6_md-6_sm-6 builder-item builder-first--search_box builder-item--group"
                data-push-left="">
                <div id="header-search-box" className="item--inner builder-item--search_box" data-section="search_box"
                  data-item-id="search_box">
                  <div className="header-search_box-item item--search_box">
                    <form method="get" action="https://species.biodiversitydata.se/search"
                      className="search-form navbar-form navbar-right">
                      {/* <!-- Hide instead of delete to avoid js error --> */}
                      <div className="form-group hide-on-mobile hide-on-tablet ">
                        <input name="q" id="autocompleteHeader" type="text" className="form-control"
                          data-i18n="[placeholder]nav.searchbox"/>
                          <button id="header-search-button" type="submit" className="search-submit" data-toggle="tooltip" data-i18n="[title]nav.searchbox" data-original-title="" title="Search species, datasets, and more...">
                      <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21">
                        <path fill="currentColor" fill-rule="evenodd" d="M12.514 14.906a8.264 8.264 0 0 1-4.322 1.21C3.668 16.116 0 12.513 0 8.07 0 3.626 3.668.023 8.192.023c4.525 0 8.193 3.603 8.193 8.047 0 2.033-.769 3.89-2.035 5.307l4.999 5.552-1.775 1.597-5.06-5.62zm-4.322-.843c3.37 0 6.102-2.684 6.102-5.993 0-3.31-2.732-5.994-6.102-5.994S2.09 4.76 2.09 8.07c0 3.31 2.732 5.993 6.102 5.993z">
                        </path>
                      </svg>
                    </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="auth-header-buttons"
                  className="item--inner builder-item--button hide-on-mobile hide-on-tablet ::loginStatus::"
                  data-section="header_button" data-item-id="button">
                  <a target="_new" href="https://biodiversitydata.se"
                    className="item--button customify-btn customify-builder-btn is-icon-before">
                    <i className="fas fa-external-link-alt"></i>&nbsp; <span data-i18n="nav.link-to-sbdi">Login</span></a>
                  <a target="_new" href="https://docs.biodiversitydata.se/support"
                    className="item--button customify-btn customify-builder-btn is-icon-before">
                    <i className="fas fa-external-link-alt"></i>&nbsp; <span data-i18n="nav.link-to-support">Sign up</span></a>
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
                      alt="Swedish Biodiversity Data Infrastructure"/>
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
                      <li><a href="{{ url_for('main_bp.index') }}">Swedish ASV portal</a> </li>
                      <li><a href="{{ url_for('blast_bp.blast') }}">BLAST search</a></li>
                      <li><a href="{{ url_for('filter_bp.filter') }}">Filter search</a></li>
                      <li><a href="{{ url_for('main_bp.submit') }}">Submit data</a></li>
                      <li><a href="{{ url_for('main_bp.download') }}">Download data</a></li>
                      <li><a href="{{ url_for('main_bp.about') }}">About</a></li>
                      <li>
                        <a href={firstname ? "/logout" : "/login"}>
                          {firstname ? `Log out ${firstname}` : 'Login'}
                        </a>
                      </li>
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
      {/* <!-- Brand and toggle get grouped for better mobile display --> */}
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand hide-on-desktop" href="https://static.biodiversitydata.se" data-i18n="general.orgfullname"></a>
      </div>
  
      {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li className=" hide-on-desktop hide-on-tablet"><a target="_blank" href="https://biodiversitydata.se"><i
                className="fas fa-external-link-alt"></i>&nbsp; <span data-i18n="nav.link-to-sbdi"></span></a></li>
          <li className="hide-on-desktop hide-on-tablet"><a target="_blank" href="https://docs.biodiversitydata.se"><i
                className="fas fa-external-link-alt"></i>&nbsp; <span data-i18n="nav.link-to-docs"></span></a></li>
          <li><a href="{{ url_for('main_bp.index') }}">Swedish ASV portal</a> </li>
          <li><a href="{{ url_for('blast_bp.blast') }}">BLAST search</a></li>
          <li><a href="{{ url_for('filter_bp.filter') }}">Filter search</a></li>
          <li><a href="{{ url_for('main_bp.submit') }}">Submit data</a></li>
          <li><a href="{{ url_for('main_bp.about') }}">About</a></li>
          <li>
            <a href={firstname ? "/logout" : "/login"}>
              {firstname ? `Log out ${firstname}` : 'Login'}
            </a>
          </li>
          <li className="dropdown">
            <ul id="dropdown-auth-menu" className="dropdown-menu ::loginStatus::">
            </ul>
          </li>
        </ul>
      </div>{/* <!-- /.navbar-collapse --> */}
    </div>{/* <!-- /.container-fluid --> */}
  </nav>
  </>
  )
}

  export default Banner;