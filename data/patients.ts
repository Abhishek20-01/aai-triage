export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  abhaId: string;
  phone: string;
  village: string;
  bloodGroup: string;
  allergies: string[];
  emergencyContact: string;
  registeredAt: string;
  lastVisit: string;
  totalVisits: number;
  urgencyLevel: 'critical' | 'high' | 'medium' | 'low';
  avatar: string;
}

export interface Visit {
  id: string;
  date: string;
  type: string;
  facility: string;
  doctor: string;
  diagnosis: string;
  symptoms: string[];
  vitals: {
    bp?: string;
    pulse?: string;
    temperature?: string;
    weight?: string;
    height?: string;
    bmi?: string;
    bloodSugar?: string;
    spo2?: string;
  };
  notes: string;
  prescriptions: Prescription[];
  labResults: LabResult[];
  followUpDate?: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabResult {
  test: string;
  date: string;
  value: string;
  unit?: string;
  status: 'normal' | 'abnormal' | 'critical';
  referenceRange: string;
}

export interface AIInsight {
  summary: string;
  criticalAlerts: string[];
  riskFactors: string[];
  medicationIssues: string[];
  chronicConditions: string[];
  recommendations: string[];
  urgencyScore: number;
}

export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'Rajesh Kumar',
    age: 52,
    gender: 'Male',
    abhaId: 'ABHA-XXXX-XXXX-0001',
    phone: '+91 98765 43210',
    village: 'Rampur',
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    emergencyContact: '+91 87654 32109',
    registeredAt: '2021-03-15',
    lastVisit: '2025-10-08',
    totalVisits: 24,
    urgencyLevel: 'high',
    avatar: 'RK',
  },
  {
    id: 'P002',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    abhaId: 'ABHA-XXXX-XXXX-0002',
    phone: '+91 91234 56789',
    village: 'Shivpur',
    bloodGroup: 'A+',
    allergies: ['Sulfa drugs'],
    emergencyContact: '+91 82345 67890',
    registeredAt: '2022-01-10',
    lastVisit: '2025-10-10',
    totalVisits: 12,
    urgencyLevel: 'medium',
    avatar: 'PS',
  },
  {
    id: 'P003',
    name: 'Mohammed Ali',
    age: 65,
    gender: 'Male',
    abhaId: 'ABHA-XXXX-XXXX-0003',
    phone: '+91 93456 78901',
    village: 'Nagar',
    bloodGroup: 'O+',
    allergies: ['None known'],
    emergencyContact: '+91 94567 89012',
    registeredAt: '2020-07-22',
    lastVisit: '2025-10-05',
    totalVisits: 45,
    urgencyLevel: 'critical',
    avatar: 'MA',
  },
  {
    id: 'P004',
    name: 'Sunita Devi',
    age: 35,
    gender: 'Female',
    abhaId: 'ABHA-XXXX-XXXX-0004',
    phone: '+91 95678 90123',
    village: 'Chandanpur',
    bloodGroup: 'AB-',
    allergies: ['Dust', 'Pollen'],
    emergencyContact: '+91 96789 01234',
    registeredAt: '2023-05-18',
    lastVisit: '2025-09-28',
    totalVisits: 8,
    urgencyLevel: 'low',
    avatar: 'SD',
  },
  {
    id: 'P005',
    name: 'Vikram Singh',
    age: 48,
    gender: 'Male',
    abhaId: 'ABHA-XXXX-XXXX-0005',
    phone: '+91 97890 12345',
    village: 'Kotwali',
    bloodGroup: 'A-',
    allergies: ['Ibuprofen'],
    emergencyContact: '+91 88901 23456',
    registeredAt: '2019-11-30',
    lastVisit: '2025-10-09',
    totalVisits: 38,
    urgencyLevel: 'high',
    avatar: 'VS',
  },
  {
    id: 'P006',
    name: 'Anjali Mehta',
    age: 42,
    gender: 'Female',
    abhaId: 'ABHA-XXXX-XXXX-0006',
    phone: '+91 99012 34567',
    village: 'Gandhinagar',
    bloodGroup: 'B-',
    allergies: ['Aspirin'],
    emergencyContact: '+91 90123 45678',
    registeredAt: '2022-08-05',
    lastVisit: '2025-10-07',
    totalVisits: 16,
    urgencyLevel: 'medium',
    avatar: 'AM',
  },
  {
    id: 'P007',
    name: 'Krishna Prasad',
    age: 70,
    gender: 'Male',
    abhaId: 'ABHA-XXXX-XXXX-0007',
    phone: '+91 88123 45678',
    village: 'Badepur',
    bloodGroup: 'O-',
    allergies: ['None known'],
    emergencyContact: '+91 79234 56789',
    registeredAt: '2018-02-14',
    lastVisit: '2025-10-10',
    totalVisits: 62,
    urgencyLevel: 'critical',
    avatar: 'KP',
  },
  {
    id: 'P008',
    name: 'Lakshmi Iyer',
    age: 31,
    gender: 'Female',
    abhaId: 'ABHA-XXXX-XXXX-0008',
    phone: '+91 77345 67890',
    village: 'Temple Road',
    bloodGroup: 'A+',
    allergies: ['None known'],
    emergencyContact: '+91 66456 78901',
    registeredAt: '2024-01-20',
    lastVisit: '2025-09-15',
    totalVisits: 5,
    urgencyLevel: 'low',
    avatar: 'LI',
  },
]

export const visitsData: Record<string, Visit[]> = {
  'P001': [
    {
      id: 'V001-001',
      date: '2025-10-08',
      type: 'Follow-up',
      facility: 'Primary Health Center, Rampur',
      doctor: 'Dr. S. Verma',
      diagnosis: 'Type 2 Diabetes Mellitus - Uncontrolled',
      symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      vitals: {
        bp: '145/92 mmHg',
        pulse: '88 bpm',
        temperature: '37.2°C',
        weight: '78 kg',
        bmi: '27.4',
        bloodSugar: 'FBS 145 mg/dL, PPBS 218 mg/dL',
      },
      notes: 'Patient reports poor dietary compliance. HbA1c has been rising over last 3 visits. Needs urgent medication review.',
      prescriptions: [
        {
          medication: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take after meals',
        },
        {
          medication: 'Glimepiride',
          dosage: '1mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take before breakfast',
        },
      ],
      labResults: [
        { test: 'HbA1c', date: '2025-10-08', value: '8.4%', status: 'critical', referenceRange: '< 7.0%' },
        { test: 'Fasting Blood Sugar', date: '2025-10-08', value: '145', status: 'abnormal', referenceRange: '70-100 mg/dL' },
        { test: 'Postprandial Blood Sugar', date: '2025-10-08', value: '218', status: 'critical', referenceRange: '< 140 mg/dL' },
        { test: 'Creatinine', date: '2025-10-08', value: '1.2', status: 'normal', referenceRange: '0.7-1.3 mg/dL' },
        { test: 'Urine Albumin', date: '2025-10-08', value: '30 mg/L', status: 'abnormal', referenceRange: '< 20 mg/L' },
      ],
      followUpDate: '2025-10-22',
    },
    {
      id: 'V001-002',
      date: '2025-09-24',
      type: 'Follow-up',
      facility: 'Primary Health Center, Rampur',
      doctor: 'Dr. S. Verma',
      diagnosis: 'Type 2 Diabetes Mellitus',
      symptoms: ['Fatigue', 'Mild polyuria'],
      vitals: {
        bp: '138/88 mmHg',
        pulse: '82 bpm',
        temperature: '37.0°C',
        weight: '77 kg',
        bloodSugar: 'FBS 132 mg/dL, PPBS 195 mg/dL',
      },
      notes: 'Slight improvement from last visit. Continue current medication.',
      prescriptions: [
        {
          medication: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take after meals',
        },
      ],
      labResults: [
        { test: 'HbA1c', date: '2025-09-24', value: '7.8%', status: 'abnormal', referenceRange: '< 7.0%' },
        { test: 'Fasting Blood Sugar', date: '2025-09-24', value: '132', status: 'abnormal', referenceRange: '70-100 mg/dL' },
        { test: 'Postprandial Blood Sugar', date: '2025-09-24', value: '195', status: 'critical', referenceRange: '< 140 mg/dL' },
      ],
      followUpDate: '2025-10-08',
    },
    {
      id: 'V001-003',
      date: '2025-09-10',
      type: 'Consultation',
      facility: 'Community Health Center',
      doctor: 'Dr. R. Gupta',
      diagnosis: 'Hypertension + Diabetes',
      symptoms: ['Headache', 'Dizziness', 'Increased thirst'],
      vitals: {
        bp: '150/95 mmHg',
        pulse: '90 bpm',
        temperature: '36.9°C',
        weight: '78 kg',
        bloodSugar: 'FBS 158 mg/dL',
      },
      notes: 'BP not controlled. Added antihypertensive. Patient advised low-salt diet.',
      prescriptions: [
        {
          medication: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in the morning',
        },
        {
          medication: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take after meals',
        },
      ],
      labResults: [
        { test: 'HbA1c', date: '2025-09-10', value: '8.1%', status: 'critical', referenceRange: '< 7.0%' },
        { test: 'Creatinine', date: '2025-09-10', value: '1.1', status: 'normal', referenceRange: '0.7-1.3 mg/dL' },
      ],
      followUpDate: '2025-09-24',
    },
  ],
  'P003': [
    {
      id: 'V003-001',
      date: '2025-10-05',
      type: 'Emergency',
      facility: 'District Hospital',
      doctor: 'Dr. A. Khan',
      diagnosis: 'Acute Myocardial Infarction (Heart Attack)',
      symptoms: ['Chest pain', 'Sweating', 'Shortness of breath', 'Nausea', 'Left arm pain'],
      vitals: {
        bp: '100/60 mmHg',
        pulse: '110 bpm',
        temperature: '37.0°C',
        spo2: '94%',
      },
      notes: 'Patient presented with severe chest pain. ECG shows ST-elevation. Thrombolysis administered. Transferred to cardiac care unit.',
      prescriptions: [
        {
          medication: 'Aspirin',
          dosage: '325mg',
          frequency: 'Once daily',
          duration: 'Ongoing',
          instructions: 'Chew and swallow',
        },
        {
          medication: 'Clopidogrel',
          dosage: '75mg',
          frequency: 'Once daily',
          duration: '12 months',
          instructions: 'Take with food',
        },
        {
          medication: 'Atorvastatin',
          dosage: '80mg',
          frequency: 'Once daily',
          duration: 'Ongoing',
          instructions: 'Take at bedtime',
        },
      ],
      labResults: [
        { test: 'Troponin I', date: '2025-10-05', value: '15.2 ng/mL', status: 'critical', referenceRange: '< 0.04 ng/mL' },
        { test: 'CK-MB', date: '2025-10-05', value: '45 U/L', status: 'critical', referenceRange: '< 25 U/L' },
        { test: 'LDL Cholesterol', date: '2025-10-05', value: '145', status: 'abnormal', referenceRange: '< 100 mg/dL' },
        { test: 'ECG', date: '2025-10-05', value: 'ST Elevation', status: 'critical', referenceRange: 'Normal' },
      ],
      followUpDate: '2025-10-19',
    },
    {
      id: 'V003-002',
      date: '2025-09-20',
      type: 'Follow-up',
      facility: 'Primary Health Center, Nagar',
      doctor: 'Dr. S. Verma',
      diagnosis: 'Stable Angina + Hypertension',
      symptoms: ['Chest discomfort on exertion', 'Shortness of breath'],
      vitals: {
        bp: '142/90 mmHg',
        pulse: '78 bpm',
        temperature: '36.8°C',
      },
      notes: 'Known CAD patient. Symptoms worsening. Advised immediate cardiac evaluation.',
      prescriptions: [
        {
          medication: 'Nitroglycerin',
          dosage: '0.5mg',
          frequency: 'As needed',
          duration: 'Ongoing',
          instructions: 'Sublingual, for chest pain',
        },
        {
          medication: 'Atenolol',
          dosage: '50mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in morning',
        },
      ],
      labResults: [
        { test: 'Lipid Profile', date: '2025-09-20', value: 'High LDL', status: 'abnormal', referenceRange: '< 100 mg/dL' },
      ],
      followUpDate: '2025-10-05',
    },
  ],
  'P005': [
    {
      id: 'V005-001',
      date: '2025-10-09',
      type: 'Follow-up',
      facility: 'Primary Health Center, Kotwali',
      doctor: 'Dr. M. Joshi',
      diagnosis: 'Chronic Kidney Disease Stage 3',
      symptoms: ['Fatigue', 'Swelling in legs', 'Reduced urine output', 'Nausea'],
      vitals: {
        bp: '158/98 mmHg',
        pulse: '86 bpm',
        temperature: '37.1°C',
        weight: '72 kg',
        bmi: '26.1',
      },
      notes: 'CKD progressing. Creatinine rising. Nephrology referral pending. Strict BP control needed.',
      prescriptions: [
        {
          medication: 'Amlodipine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in morning',
        },
        {
          medication: 'Furosemide',
          dosage: '40mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in morning to avoid nocturia',
        },
      ],
      labResults: [
        { test: 'Creatinine', date: '2025-10-09', value: '2.4 mg/dL', status: 'critical', referenceRange: '0.7-1.3 mg/dL' },
        { test: 'eGFR', date: '2025-10-09', value: '38 mL/min', status: 'critical', referenceRange: '> 60 mL/min' },
        { test: 'Potassium', date: '2025-10-09', value: '5.8 mEq/L', status: 'critical', referenceRange: '3.5-5.0 mEq/L' },
        { test: 'Hemoglobin', date: '2025-10-09', value: '9.2 g/dL', status: 'abnormal', referenceRange: '13-17 g/dL' },
      ],
      followUpDate: '2025-10-23',
    },
  ],
  'P007': [
    {
      id: 'V007-001',
      date: '2025-10-10',
      type: 'Follow-up',
      facility: 'District Hospital',
      doctor: 'Dr. P. Reddy',
      diagnosis: 'COPD Exacerbation + Congestive Heart Failure',
      symptoms: ['Severe shortness of breath', 'Cough with sputum', 'Leg swelling', 'Fatigue'],
      vitals: {
        bp: '130/85 mmHg',
        pulse: '102 bpm',
        temperature: '37.5°C',
        spo2: '88%',
      },
      notes: 'Acute exacerbation. Oxygen supplementation started. Diuretics increased. Monitor fluid balance closely.',
      prescriptions: [
        {
          medication: 'Furosemide',
          dosage: '80mg',
          frequency: 'Twice daily',
          duration: '14 days',
          instructions: 'Take in morning and afternoon',
        },
        {
          medication: 'Budesonide + Formoterol',
          dosage: '160/4.5 mcg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Inhale',
        },
      ],
      labResults: [
        { test: 'BNP', date: '2025-10-10', value: '1850 pg/mL', status: 'critical', referenceRange: '< 100 pg/mL' },
        { test: 'Creatinine', date: '2025-10-10', value: '1.8 mg/dL', status: 'abnormal', referenceRange: '0.7-1.3 mg/dL' },
        { test: 'Potassium', date: '2025-10-10', value: '5.2 mEq/L', status: 'abnormal', referenceRange: '3.5-5.0 mEq/L' },
      ],
      followUpDate: '2025-10-17',
    },
  ],
  'P002': [
    {
      id: 'V002-001',
      date: '2025-10-10',
      type: 'Antenatal Checkup',
      facility: 'Primary Health Center, Shivpur',
      doctor: 'Dr. N. Singh',
      diagnosis: 'Pregnancy - 28 weeks, Low weight gain',
      symptoms: ['Mild backache', 'Occasional nausea', 'Reduced fetal movement perception'],
      vitals: {
        bp: '118/76 mmHg',
        pulse: '82 bpm',
        temperature: '36.9°C',
        weight: '58 kg',
      },
      notes: 'Weight gain below expected for gestational age. Nutrition counseling provided. Iron and folic acid supplementation ongoing.',
      prescriptions: [
        {
          medication: 'Iron + Folic Acid',
          dosage: '100mg/0.5mg',
          frequency: 'Once daily',
          duration: 'Until delivery',
          instructions: 'Take after meals',
        },
        {
          medication: 'Calcium',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: 'Until delivery',
          instructions: 'Take with meals',
        },
      ],
      labResults: [
        { test: 'Hemoglobin', date: '2025-10-10', value: '10.2 g/dL', status: 'abnormal', referenceRange: '11-13 g/dL' },
        { test: 'Urine Albumin', date: '2025-10-10', value: 'Negative', status: 'normal', referenceRange: 'Negative' },
        { test: 'Blood Sugar (Random)', date: '2025-10-10', value: '110 mg/dL', status: 'normal', referenceRange: '< 140 mg/dL' },
      ],
      followUpDate: '2025-10-24',
    },
  ],
  'P004': [
    {
      id: 'V004-001',
      date: '2025-09-28',
      type: 'Consultation',
      facility: 'Primary Health Center, Chandanpur',
      doctor: 'Dr. K. Patel',
      diagnosis: 'Upper Respiratory Tract Infection',
      symptoms: ['Fever', 'Cough', 'Runny nose', 'Sore throat'],
      vitals: {
        bp: '120/80 mmHg',
        pulse: '84 bpm',
        temperature: '38.5°C',
        weight: '55 kg',
      },
      notes: 'Viral URTI. No signs of pneumonia. Symptomatic treatment advised.',
      prescriptions: [
        {
          medication: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '5 days',
          instructions: 'Take after meals',
        },
        {
          medication: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily at night',
          duration: '5 days',
          instructions: 'Take at bedtime',
        },
      ],
      labResults: [],
      followUpDate: '2025-10-05',
    },
  ],
  'P006': [
    {
      id: 'V006-001',
      date: '2025-10-07',
      type: 'Follow-up',
      facility: 'Community Health Center',
      doctor: 'Dr. R. Gupta',
      diagnosis: 'Hypothyroidism',
      symptoms: ['Fatigue', 'Weight gain', 'Cold intolerance', 'Hair loss'],
      vitals: {
        bp: '122/82 mmHg',
        pulse: '68 bpm',
        temperature: '36.6°C',
        weight: '68 kg',
        bmi: '26.8',
      },
      notes: 'TSH slightly elevated. Continue current dose. Repeat thyroid panel in 3 months.',
      prescriptions: [
        {
          medication: 'Levothyroxine',
          dosage: '50mcg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take on empty stomach, 30 min before breakfast',
        },
      ],
      labResults: [
        { test: 'TSH', date: '2025-10-07', value: '6.8 mIU/L', status: 'abnormal', referenceRange: '0.4-4.0 mIU/L' },
        { test: 'Free T4', date: '2025-10-07', value: '0.8 ng/dL', status: 'normal', referenceRange: '0.8-1.8 ng/dL' },
      ],
      followUpDate: '2026-01-07',
    },
  ],
  'P008': [
    {
      id: 'V008-001',
      date: '2025-09-15',
      type: 'Postnatal Checkup',
      facility: 'Primary Health Center, Temple Road',
      doctor: 'Dr. N. Singh',
      diagnosis: 'Postnatal Checkup - Normal Recovery',
      symptoms: ['Normal'],
      vitals: {
        bp: '116/74 mmHg',
        pulse: '76 bpm',
        temperature: '36.8°C',
        weight: '60 kg',
      },
      notes: 'Postnatal recovery on track. Baby healthy. Breastfeeding going well. Contraception counseling done.',
      prescriptions: [
        {
          medication: 'Calcium + Vitamin D',
          dosage: '500mg/400 IU',
          frequency: 'Once daily',
          duration: '6 months',
          instructions: 'Take with meals',
        },
      ],
      labResults: [],
      followUpDate: '2025-10-15',
    },
  ],
}
