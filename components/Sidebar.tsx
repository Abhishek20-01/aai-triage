'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar({
  onConsentClick,
}: {
  onConsentClick: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { label: 'Dashboard', icon: '📊', href: '/' },
    { label: 'Patients', icon: '👥', href: '/' },
    { label: 'Consultations', icon: '🩺', href: '/' },
    { label: 'Reports', icon: '📋', href: '/' },
  ]

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xl font-bold">
            🏥
          </div>
          <div>
            <h1 className="text-lg font-bold">AarogyaAI</h1>
            <p className="text-xs text-slate-400">Triage Assistant</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 text-white text-sm rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-400"
          />
          <span className="absolute right-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href || (item.href === '/' && pathname === '/')
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onConsentClick}
          className="w-full flex items-center gap-2 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <span>🔒</span>
          Consent Management
        </button>
        <div className="mt-3 flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">
            👨‍⚕️
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">Dr. S. Verma</p>
            <p className="text-xs text-slate-400">PHC Rampur</p>
          </div>
        </div>
      </div>
    </div>
  )
}
