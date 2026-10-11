'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatsCard from './StatsCard'
import { Patient } from '@/data/patients'

export default function Sidebar({ onConsentClick }: { onConsentClick: () => void }) {
  const router = useRouter()

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🏥
          </div>
          <div>
            <h1 className="text-xl font-bold">AarogyaAI</h1>
            <p className="text-xs text-slate-400">Triage Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => router.push('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-lg"
        >
          <span className="text-lg">📊</span>
          Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <span className="text-lg">👥</span>
          Patients
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <span className="text-lg">🩺</span>
          Consultations
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
          <span className="text-lg">📋</span>
          Reports
        </button>
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-3">
        <button
          onClick={onConsentClick}
          className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
        >
          <span className="text-lg">🔒</span>
          Consent Management
        </button>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm">
            👨‍⚕️
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Dr. S. Verma</p>
            <p className="text-xs text-slate-400">PHC Rampur</p>
          </div>
        </div>
      </div>
    </div>
  )
}
