'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import ConsentModal from '@/components/ConsentModal'

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  abhaId: string
  phone: string
  village: string
  bloodGroup: string
  allergies: string[]
  emergencyContact: string
  registeredAt: string
  lastVisit: string
  totalVisits: number
  urgencyLevel: string
  avatar: string
}

interface Visit {
  id: string
  date: string
  type: string
  facility: string
  doctor: string
  diagnosis: string
  symptoms: string[]
  vitals: Record<string, string>
  notes: string
  prescriptions: Array<{
    medication: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }>
  labResults: Array<{
    test: string
    date: string
    value: string
    unit?: string
    status: string
    referenceRange: string
  }>
  followUpDate?: string
}

interface AIInsight {
  summary: string
  criticalAlerts: string[]
  riskFactors: string[]
  medicationIssues: string[]
  chronicConditions: string[]
  recommendations: string[]
  urgencyScore: number
}

export default function PatientDetail() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string
  const [patient, setPatient] = useState<Patient | null>(null)
  const [visits, setVisits] = useState<Visit[]>([])
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null)
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null)
  const [showConsent, setShowConsent] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const [patientRes, insightRes] = await Promise.all([
          fetch(`/api/patients/${patientId}`),
          fetch(`/api/patients/${patientId}/insights/${patientId}`),
        ])

        if (patientRes.ok) {
          const data = await patientRes.json()
          setPatient(data.patient)
          setVisits(data.visits)
          setAiInsight(data.aiInsight)
        }
      } catch (error) {
        console.error('Error fetching patient:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [patientId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚙️</div>
          <p className="text-gray-600">Loading patient data...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900">Patient Not Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto pt-20">
        <div className="px-8 py-6">
          {aiInsight && <PatientDetailContent patient={patient} visits={visits} aiInsight={aiInsight} expandedVisit={expandedVisit} setExpandedVisit={setExpandedVisit} onConsentClick={() => setShowConsent(true)} />}
          {showConsent && <ConsentModal patient={patient} onClose={() => setShowConsent(false)} />}
        </div>
      </main>
    </div>
  )
}

function PatientDetailContent({ patient, visits, aiInsight, expandedVisit, setExpandedVisit, onConsentClick }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {patient.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="font-medium">{patient.age} years, {patient.gender}</span>
                <span className="text-gray-400">•</span>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{patient.abhaId}</span>
                <span className="text-gray-400">•</span>
                <span>Blood: {patient.bloodGroup}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span>📱 {patient.phone}</span>
                <span>📍 {patient.village}</span>
                <span>🚨 Emergency: {patient.emergencyContact}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600">Urgency Score</div>
            <div className="text-4xl font-bold text-red-600">{aiInsight.urgencyScore}/10</div>
          </div>
        </div>
      </div>

      {aiInsight.criticalAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🚨</div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-red-900 mb-3">Critical Alerts</h2>
              <div className="space-y-2">
                {aiInsight.criticalAlerts.map((alert: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-red-200 shadow-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-red-900 font-medium">{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          AI-Generated Clinical Summary
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-200">
          {aiInsight.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Risk Factors
          </h3>
          <div className="space-y-3">
            {aiInsight.riskFactors.map((risk: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-orange-600 mt-0.5">▸</span>
                <p className="text-sm text-gray-700">{risk}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">🏥</span>
            Chronic Conditions
          </h3>
          <div className="space-y-3">
            {aiInsight.chronicConditions.map((condition: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-blue-600 mt-0.5">▸</span>
                <p className="text-sm text-gray-700">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Clinical Recommendations
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {aiInsight.recommendations.map((rec: string, idx: number) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 flex-1">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Visit History ({visits.length} visits)</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {visits.map((visit: Visit) => (
            <VisitCard key={visit.id} visit={visit} expanded={expandedVisit === visit.id} onToggle={() => setExpandedVisit(expandedVisit === visit.id ? null : visit.id)} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-300 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          Allergies & Safety Alerts
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {patient.allergies.map((allergy) => (
            <span key={allergy} className="px-4 py-2 bg-red-100 text-red-900 rounded-lg border border-red-300 font-medium text-sm">
              ⚠️ {allergy}
            </span>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800 font-medium">🚨 Emergency Contact: {patient.emergencyContact}</p>
        </div>
      </div>

      <button
        onClick={onConsentClick}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">🔒</span>
        Manage ABHA Consent & Privacy Settings
      </button>
    </div>
  )
}

function VisitCard({ visit, expanded, onToggle }: { visit: Visit; expanded: boolean; onToggle: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'normal':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-300">
              {visit.type}
            </span>
            <span className="text-sm text-gray-600 font-medium">{visit.date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{visit.facility}</span>
          </div>
          <p className="text-base font-semibold text-gray-900">{visit.diagnosis}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {visit.symptoms.map((symptom) => (
              <span key={symptom} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                {symptom}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onToggle}
          className="ml-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors border border-blue-200"
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {expanded && (
        <div className="mt-6 space-y-6 fade-in">
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Vitals
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(visit.vitals)
                .filter(([_, value]) => value)
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 capitalize font-medium">{key}</div>
                    <div className="text-sm font-semibold text-gray-900 mt-1">{value}</div>
                  </div>
                ))}
            </div>
          </div>

          {visit.prescriptions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Prescriptions
              </h4>
              <div className="space-y-2">
                {visit.prescriptions.map((rx: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{rx.medication}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {rx.dosage} • {rx.frequency} • {rx.duration}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 italic">{rx.instructions}</div>
                    </div>
                    <div className="text-2xl">💊</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visit.labResults.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Lab Results
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Test</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Reference Range</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visit.labResults.map((lab) => (
                      <tr key={lab.test} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{lab.test}</td>
                        <td className="py-3 px-4 text-gray-600">{lab.date}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">
                          {lab.value} {lab.unit}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{lab.referenceRange}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lab.status)}`}>
                            {lab.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {visit.notes && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Doctor&apos;s Clinical Notes
              </h4>
              <p className="text-sm text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200 italic">
                {visit.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
