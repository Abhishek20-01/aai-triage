import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import PatientList from '@/components/PatientList'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'AarogyaAI Triage - Dashboard',
  description: 'AI-powered diagnostic triage assistant for Ayushman Bharat Health Records',
}

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="px-8 py-6">
          <PatientList />
        </div>
      </main>
    </div>
  )
}
