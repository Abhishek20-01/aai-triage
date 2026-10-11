'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Patient } from '@/data/patients'

const urgencyConfig = {
  critical: {
    label: 'Critical',
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
    dot: 'bg-red-500',
  },
  high: {
    label: 'High',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
    dot: 'bg-orange-500',
  },
  medium: {
    label: 'Medium',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
    dot: 'bg-yellow-500',
  },
  low: {
    label: 'Low',
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    dot: 'bg-green-500',
  },
}

export default function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled in PatientList
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AarogyaAI</h1>
          <p className="text-sm text-gray-600 mt-1">
            AI-Powered Diagnostic Triage Assistant
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Dr. S. Verma</div>
            <div className="text-xs text-gray-600">Primary Health Center, Rampur</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
            👨‍⚕️
          </div>
        </div>
      </div>
    </header>
  )
}
