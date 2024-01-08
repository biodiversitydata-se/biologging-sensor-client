'use client'
import Image from "next/image";
import Detail from "./pages/Detail";
import Overview from './pages/Overview'
import './index.css'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <Detail/>
    </main>
  )
}
