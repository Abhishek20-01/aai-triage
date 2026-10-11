'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { patients, visitsData, generateAIInsight, Visit, LabResult } from '@/data/patients'

const statusBadge = (status: LabResult['status']) => {
  const colors = {
    normal: 'bg-green-100 text-green-700',
    abnormal: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
  }
  return colors[status]
}

const alertIcon = (level: 'critical' | 'high' | 'medium') => {
  if (level === 'critical') return '🔴'
  if (level === 'high') return '🟠'
  return '🟡'
}

export default function PatientDetail() {
  const params = useParams()
  const patientId = params.id as string
  const patient = patients.find((p) => p.id === patientId)
  const visits = visitsData[patientId] || []
  const [showConsent, setShowConsent] = useState(false)

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-slate-900">Patient Not Found</h2>
          <p className="text-slate-600 mt-2">The requested patient record could not be found.</p>
        </div>
      </div>
    )
  }

  const aiInsight = generateAIInsight(patientId, visits, patient)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700">
                {patient.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>{patient.age} years, {patient.gender}</span>
                  <span>•</span>
                  <span>ABHA: {patient.abhaId}</span>
                  <span>•</span>
                  <span>Blood: {patient.bloodGroup}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>📱 {patient.phone}</span>
                  <span>📍 {patient.village}</span>
                  <span>🚨 {patient.emergencyContact}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium border border-red-300">
                {aiInsight.urgencyScore}/10 Urgency Score
              </span>
            </div>
          </div>
        </div>
      </div>

      {aiInsight.criticalAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🚨</div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-900 mb-3">Critical Alerts</h2>
              <div className="space-y-2">
                {aiInsight.criticalAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-white p-3 rounded border border-red-200"
                  >
                    <span className="text-red-600 mt-0.5">●</span>
                    <p className="text-sm text-red-900">{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">AI-Generated Summary</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{aiInsight.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Risk Factors</h3>
          <div className="space-y-2">
            {aiInsight.riskFactors.map((risk, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">⚠️</span>
                <p className="text-sm text-slate-700">{risk}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Chronic Conditions</h3>
          <div className="space-y-2">
            {aiInsight.chronicConditions.map((condition, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">🏥</span>
                <p className="text-sm text-slate-700">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommendations</h2>
        <div className="grid grid-cols-1 gap-2">
          {aiInsight.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-100"
            >
              <span className="text-blue-600 font-bold">{idx + 1}.</span>
              <p className="text-sm text-slate-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Visit History</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {visits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowConsent(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        🔒 Manage ABHA Consent & Privacy
      </button>

      {showConsent && <ConsentModal patient={patient} onClose={() => setShowConsent(false)} />}
    </div>
  )
}

function VisitCard({ visit }: { visit: Visit }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-semibold text-slate-900">{visit.type}</h3>
            <span className="text-xs text-slate-500">{visit.date}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">{visit.facility}</span>
          </div>
          <p className="text-sm text-slate-700 font-medium">{visit.diagnosis}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {visit.symptoms.map((symptom) => (
              <span
                key={symptom}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {expanded ? 'Hide' : 'Details'}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
              Vitals
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(visit.vitals).map(
                ([key, value]) =>
                  value && (
                    <div key={key} className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-xs text-slate-600 capitalize">{key}</div>
                      <div className="text-sm font-medium text-slate-900 mt-0.5">{value}</div>
                    </div>
                  )
              )}
            </div>
          </div>

          {visit.prescriptions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                Prescriptions
              </h4>
              <div className="space-y-2">
                {visit.prescriptions.map((rx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-100"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{rx.medication}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {rx.dosage} • {rx.frequency} • {rx.duration}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{rx.instructions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visit.labResults.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                Lab Results
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-700">Test</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-700">Date</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-700">Value</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-700">Reference</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visit.labResults.map((lab) => (
                      <tr key={lab.test} className="border-b border-slate-100">
                        <td className="py-2 px-3 text-slate-900">{lab.test}</td>
                        <td className="py-2 px-3 text-slate-600">{lab.date}</td>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {lab.value} {lab.unit}
                        </td>
                        <td className="py-2 px-3 text-slate-600">{lab.referenceRange}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(lab.status)}`}
                          >
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
              <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                Doctor's Notes
              </h4>
              <p className="text-sm text-slate-700 bg-yellow-50 p-3 rounded border border-yellow-200">
                {visit.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ConsentModal({ patient, onClose }: { patient: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Consent & Privacy Management</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Patient: {patient.name} ({patient.abhaId})
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                ABHA Consent Framework
              </h4>
              <p className="text-sm text-blue-800">
                This patient has provided consent for access to their health records through the
                Ayushman Bharat Digital Health Mission (ABDM) framework. All access is logged and
                auditable.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Consent Status</h4>
            {[
              { label: 'Health Record Access', status: 'Active', color: 'green' },
              { label: 'Diagnostic Data Sharing', status: 'Active', color: 'green' },
              { label: 'Medication History Access', status: 'Active', color: 'green' },
              { label: 'Research Participation', status: 'Declined', color: 'red' },
              { label: 'SMS/Notification', status: 'Active', color: 'green' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200"
              >
                <span className="text-sm text-slate-700">{item.label}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.color === 'green'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Access Log</h4>
            <div className="space-y-2">
              {[
                { date: '2025-10-10', doctor: 'Dr. S. Verma', action: 'Viewed full record', ip: '10.0.1.45' },
                { date: '2025-10-08', doctor: 'Dr. S. Verma', action: 'Updated consultation notes', ip: '10.0.1.45' },
                { date: '2025-09-24', doctor: 'Dr. S. Verma', action: 'Viewed lab results', ip: '10.0.1.45' },
                { date: '2025-09-10', doctor: 'Dr. R. Gupta', action: 'Accessed via referral', ip: '10.0.2.12' },
              ].map((log, idx) => (
                <div key={idx} className="flex items-center gap-4 p-2 bg-slate-50 rounded text-xs">
                  <span className="text-slate-600 w-28">{log.date}</span>
                  <span className="text-slate-900 font-medium w-40">{log.doctor}</span>
                  <span className="text-slate-700 flex-1">{log.action}</span>
                  <span className="text-slate-500">{log.ip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-semibold text-yellow-900 mb-2">
              Privacy & Compliance Notes
            </h4>
            <ul className="space-y-1 text-xs text-yellow-800 list-disc list-inside">
              <li>All access is logged per ABDM guidelines</li>
              <li>Records are accessed only with patient consent</li>
              <li>Data is encrypted in transit and at rest</li>
              <li>Access is limited to treating physicians only</li>
              <li>Patients can revoke consent at any time</li>
            </ul>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Modify Consent
          </button>
        </div>
      </div>
    </div>
  )
}
