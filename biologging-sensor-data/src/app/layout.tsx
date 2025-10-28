import './index.css';
import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import "leaflet/dist/leaflet.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biologging Sensor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        {/* LA base-branding styles */}
        <base href="/" />
        <link rel="stylesheet" type="text/css" href="https://bioatlas.biodiversitydata.se/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://bioatlas.biodiversitydata.se/css/bootstrap-theme.min.css" />
        <link rel="stylesheet" type="text/css" href="https://bioatlas.biodiversitydata.se/css/ala-styles.min.css" />
        <link rel="stylesheet" type="text/css" href="https://bioatlas.biodiversitydata.se/css/font-awesome.min.css" />

        {/* SBDI theme styles */}
        <link rel="stylesheet" href="https://bioatlas.biodiversitydata.se/app/themes/sbdi/css/styles.css" />
        <link rel="stylesheet" href="https://bioatlas.biodiversitydata.se/app/themes/sbdi/css/z-override-style.css" />

        {/* SBDI favicon and manifest */}
        <link rel="icon" href="https://bioatlas.biodiversitydata.se/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="https://bioatlas.biodiversitydata.se/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://bioatlas.biodiversitydata.se/favicon-180x180.png" />
        <link rel="manifest" href="https://bioatlas.biodiversitydata.se/site.webmanifest" />

        {/* LA base-branding dependencies */}
        <script src="https://bioatlas.biodiversitydata.se/js/jquery.min.js" />
        <script src="https://bioatlas.biodiversitydata.se/js/bootstrap.js" />

      </head>
      <body>
        <Banner />
        <div className='main-content'>
          {children}
        </div>
        <Footer />
        {/* no need anymore to include bootstrap here if already imported by ALA ?
        <script async src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> */}
      </body>
    </html>
  )
}
