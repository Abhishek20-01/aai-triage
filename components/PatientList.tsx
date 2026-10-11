'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Patient } from '@/data/patients'

export default function PatientList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const patients: Patient[] = [
    { id: 'P001', name: 'Rajesh Kumar', age: 52, gender: 'Male', abhaId: 'ABHA-XXXX-XXXX-0001', phone: '+91 98765 43210', village: 'Rampur', bloodGroup: 'B+', allergies: ['Penicillin'], emergencyContact: '+91 87654 32109', registeredAt: '2021-03-15', lastVisit: '2025-10-08', totalVisits: 24, urgencyLevel: 'high', avatar: 'RK' },
    { id: 'P002', name: 'Priya Sharma', age: 28, gender: 'Female', abhaId: 'ABHA-XXXX-XXXX-0002', phone: '+91 91234 56789', village: 'Shivpur', bloodGroup: 'A+', allergies: ['Sulfa drugs'], emergencyContact: '+91 82345 67890', registeredAt: '2022-01-10', lastVisit: '2025-10-10', totalVisits: 12, urgencyLevel: 'medium', avatar: 'PS' },
    { id: 'P003', name: 'Mohammed Ali', age: 65, gender: 'Male', abhaId: 'ABHA-XXXX-XXXX-0003', phone: '+91 93456 78901', village: 'Nagar', bloodGroup: 'O+', allergies: ['None known'], emergencyContact: '+91 94567 89012', registeredAt: '2020-07-22', lastVisit: '2025-10-05', totalVisits: 45, urgencyLevel: 'critical', avatar: 'MA' },
    { id: 'P004', name: 'Sunita Devi', age: 35, gender: 'Female', abhaId: 'ABHA-XXXX-XXXX-0004', phone: '+91 95678 90123', village: 'Chandanpur', bloodGroup: 'AB-', allergies: ['Dust', 'Pollen'], emergencyContact: '+91 96789 01234', registeredAt: '2023-05-18', lastVisit: '2025-09-28', totalVisits: 8, urgencyLevel: 'low', avatar: 'SD' },
    { id: 'P005', name: 'Vikram Singh', age: 48, gender: 'Male', abhaId: 'ABHA-XXXX-XXXX-0005', phone: '+91 97890 12345', village: 'Kotwali', bloodGroup: 'A-', allergies: ['Ibuprofen'], emergencyContact: '+91 88901 23456', registeredAt: '2019-11-30', lastVisit: '2025-10-09', totalVisits: 38, urgencyLevel: 'high', avatar: 'VS' },
    { id: 'P006', name: 'Anjali Mehta', age: 42, gender: 'Female', abhaId: 'ABHA-XXXX-XXXX-0006', phone: '+91 99012 34567', village: 'Gandhinagar', bloodGroup: 'B-', allergies: ['Aspirin'], emergencyContact: '+91 90123 45678', registeredAt: '2022-08-05', lastVisit: '2025-10-07', totalVisits: 16, urgencyLevel: 'medium', avatar: 'AM' },
    { id: 'P007', name: 'Krishna Prasad', age: 70, gender: 'Male', abhaId: 'ABHA-XXXX-XXXX-0007', phone: '+91 88123 45678', village: 'Badepur', bloodGroup: 'O-', allergies: ['None known'], emergencyContact: '+91 79234 56789', registeredAt: '2018-02-14', lastVisit: '2025-10-10', totalVisits: 62, urgencyLevel: 'critical', avatar: 'KP' },
    { id: 'P008', name: 'Lakshmi Iyer', age: 31, gender: 'Female', abhaId: 'ABHA-XXXX-XXXX-0008', phone: '+91 77345 67890', village: 'Temple Road', bloodGroup: 'A+', allergies: ['None known'], emergencyContact: '+91 66456 78901', registeredAt: '2024-01-20', lastVisit: '2025-09-15', totalVisits: 5, urgencyLevel: 'low', avatar: 'LI' },
  ]

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.abhaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.village.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const criticalCount = patients.filter((p) => p.urgencyLevel === 'critical').length
  const highCount = patients.filter((p) => p.urgencyLevel === 'high').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{patients.length}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Cases</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{criticalCount}</p>
            </div>
            <div className="text-4xl">🚨</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{highCount}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today&apos;s Visits</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Patient Registry ({filtered.length})
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {filtered.map((patient) => (
            <div
              key={patient.id}
              onClick={() => router.push(`/patient/${patient.id}`)}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                    {patient.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${patient.urgencyLevel === 'critical' ? 'bg-red-500' : patient.urgencyLevel === 'high' ? 'bg-orange-500' : patient.urgencyLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-gray-900">{patient.name}</h3>
                    <span className="text-sm text-gray-500">{patient.age}y</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${patient.urgencyLevel === 'critical' ? 'bg-red-100 text-red-700 border-red-300' : patient.urgencyLevel === 'high' ? 'bg-orange-100 text-orange-700 border-orange-300' : patient.urgencyLevel === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-green-100 text-green-700 border-green-300'}`}>
                      {patient.urgencyLevel}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-mono text-xs">{patient.abhaId}</span>
                    <span>📍 {patient.village}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                    <span>Last visit: {patient.lastVisit}</span>
                    <span>•</span>
                    <span>{patient.totalVisits} visits</span>
                    <span>•</span>
                    <span>Blood: {patient.bloodGroup}</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
