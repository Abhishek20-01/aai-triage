'use client'

import { Patient } from '@/data/patients'

export default function ConsentModal({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Consent & Privacy Management</h2>
            <p className="text-sm text-gray-600 mt-1">ABHA-linked Health Records — ABDM Compliance</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Patient: {patient.name} ({patient.abhaId})
            </h3>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-lg">🔐</span>
                ABHA Consent Framework
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                This patient has provided informed consent for access to their health records through the
                Ayushman Bharat Digital Health Mission (ABDM) framework. All access is logged, auditable, and
                compliant with the Digital Personal Data Protection Act (DPDPA).
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Consent Permissions</h4>
            {[
              { label: 'Health Record Access', status: 'Active', description: 'Full access to ABHA-linked health records' },
              { label: 'Diagnostic Data Sharing', status: 'Active', description: 'Lab results and diagnostic reports' },
              { label: 'Medication History Access', status: 'Active', description: 'Current and past prescriptions' },
              { label: 'Research Participation', status: 'Declined', description: 'Anonymous data for research' },
              { label: 'SMS/Notification', status: 'Active', description: 'Appointment reminders and health alerts' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-xs font-medium ${
                    item.status === 'Active'
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Access Audit Log</h4>
            <div className="space-y-2">
              {[
                { date: '2025-10-10', doctor: 'Dr. S. Verma', action: 'Viewed full patient record', facility: 'PHC Rampur' },
                { date: '2025-10-08', doctor: 'Dr. S. Verma', action: 'Updated consultation notes', facility: 'PHC Rampur' },
                { date: '2025-09-24', doctor: 'Dr. S. Verma', action: 'Accessed lab results', facility: 'PHC Rampur' },
                { date: '2025-09-10', doctor: 'Dr. R. Gupta', action: 'Accessed via referral', facility: 'CHC Rampur' },
              ].map((log, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg text-xs border border-gray-200">
                  <span className="text-gray-600 w-28 font-mono">{log.date}</span>
                  <span className="text-gray-900 font-medium w-44">{log.doctor}</span>
                  <span className="text-gray-700 flex-1">{log.action}</span>
                  <span className="text-gray-500 text-right">{log.facility}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-300">
            <h4 className="text-sm font-semibold text-yellow-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              Privacy & Compliance Information
            </h4>
            <ul className="space-y-2 text-xs text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">✓</span>
                All access is logged per ABDM and DPDPA guidelines
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">✓</span>
                Records accessed only with explicit patient consent
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">✓</span>
                End-to-end encryption for data in transit and at rest
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">✓</span>
                Access limited to authorized treating physicians only
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">✓</span>
                Patients can revoke consent at any time
              </li>
            </ul>
          </div>
        </div>
        <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-sm font-medium transition-colors border border-gray-300"
          >
            Close
          </button>
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg">
            Modify Consent Settings
          </button>
        </div>
      </div>
    </div>
  )
}
