'use client'

import { useRouter } from 'next/navigation'
import { Patient } from '@/data/patients'

const urgencyColors = {
  critical: 'bg-red-100 text-red-700 border-red-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-green-100 text-green-700 border-green-300',
}

const urgencyBadgeColors = {
  critical: 'bg-red-600',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
}

export default function PatientList({
  patients,
  searchQuery,
}: {
  patients: Patient[]
  searchQuery: string
}) {
  const router = useRouter()

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const criticalCount = patients.filter((p) => p.urgencyLevel === 'critical').length
  const highCount = patients.filter((p) => p.urgencyLevel === 'high').length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-2xl font-bold text-slate-900">{patients.length}</div>
          <div className="text-xs text-slate-600 mt-1">Total Patients</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
          <div className="text-xs text-red-600 mt-1">Critical</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">{highCount}</div>
          <div className="text-xs text-orange-600 mt-1">High Priority</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">12</div>
          <div className="text-xs text-blue-600 mt-1">Today's Visits</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Patient List ({filteredPatients.length})
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => router.push(`/patient/${patient.id}`)}
              className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-700">
                    {patient.avatar}
                  </div>
                  <div
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${urgencyBadgeColors[patient.urgencyLevel]}`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                      {patient.name}
                    </h3>
                    <span className="text-xs text-slate-500">{patient.age}y</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${urgencyColors[patient.urgencyLevel]}`}
                    >
                      {patient.urgencyLevel}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                    <span>ABHA: {patient.abhaId}</span>
                    <span>•</span>
                    <span>{patient.village}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span>Last visit: {patient.lastVisit}</span>
                    <span>•</span>
                    <span>{patient.totalVisits} visits</span>
                  </div>
                </div>
                <div className="text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
