'use client'
import Overview from './Overview'
import './index.css'
import Banner from './components/Banner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
    <Banner/>
    <main>
      <Overview/>
    </main>
    <Footer/>
    </>
  )
}
