const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div>
            Copyright &copy; 2020-{new Date().getFullYear()} – <span>Swedish Biodiversity Data Infrastructure</span>
          </div>
          <div>
            <a href="https://biodiversitydata.se/accessibility/">Accessibility</a><br />
            <a href="https://biodiversitydata.se/privacy-policy/">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;