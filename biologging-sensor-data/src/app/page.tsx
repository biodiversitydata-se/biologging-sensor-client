'use client'
import Detail from './pages/Detail'
import Overview from './pages/Overview'
import './index.css'
import Banner from './components/Banner'

export default function Home() {
  return (
    <>
    <Banner/>
    <main>
      <Detail/>
    </main>
    </>
  )
}
