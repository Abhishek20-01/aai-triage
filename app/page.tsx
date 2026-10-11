'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import PatientList from '@/components/PatientList'
import { patients } from '@/data/patients'

export default function Home() {
  const [showConsent, setShowConsent] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onConsentClick={() => setShowConsent(true)} />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">
                Welcome back, Dr. S. Verma — Primary Health Center, Rampur
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">Today</div>
                <div className="text-xs text-slate-600">October 10, 2025</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                👨‍⚕️
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">
          <PatientList patients={patients} searchQuery="" />
        </div>
      </main>
    </div>
  )
}
