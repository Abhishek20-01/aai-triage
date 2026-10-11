import { AIInsight } from '@/data/patients'

export function generateAIInsight(
  patientId: string,
  visits: any[],
  patient: any
): AIInsight {
  const allLabResults = visits.flatMap(v => v.labResults)
  const allPrescriptions = visits.flatMap(v => v.prescriptions)
  const allSymptoms = visits.flatMap(v => v.symptoms)
  const diagnoses = visits.map(v => v.diagnosis)
  const hasCriticalLab = allLabResults.some(l => l.status === 'critical')
  const hasAbnormalLab = allLabResults.some(l => l.status === 'abnormal')
  const lastVisitDate = new Date(visits[0]?.date || '2025-01-01')
  const daysSinceLastVisit = Math.floor((Date.now() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24))

  const insights: Record<string, AIInsight> = {
    'P001': {
      summary: `52-year-old male with poorly controlled Type 2 Diabetes Mellitus and newly diagnosed Hypertension. HbA1c has risen to 8.4% from 7.8% in just 2 weeks, indicating worsening glycemic control. Patient shows signs of early diabetic nephropathy (microalbuminuria). Immediate medication optimization and lifestyle intervention required.`,
      criticalAlerts: [
        'HbA1c 8.4% — significantly above target (<7.0%). Rapid deterioration from 7.8% (Sep 24) to 8.4% (Oct 8).',
        'Microalbuminuria detected (30 mg/L) — early sign of diabetic kidney damage.',
        'Blood glucose critically elevated: FBS 145 mg/dL, PPBS 218 mg/dL.',
        'Urine albumin positive — requires nephrology input to prevent progression.',
      ],
      riskFactors: [
        'Poor dietary compliance reported by patient',
        'Age > 50 with uncontrolled diabetes',
        'Hypertension not yet controlled on single agent',
        'Obesity (BMI 27.4 — overweight category)',
        'Family history likely (common in Indian diabetic patients)',
      ],
      medicationIssues: [
        'Metformin alone insufficient — needs combination therapy or dose escalation',
        'No antihypertensive added yet for BP 145/92',
        'Medication adherence questionable given worsening labs',
        'Glimepiride added but glycemia still uncontrolled',
      ],
      chronicConditions: ['Type 2 Diabetes Mellitus', 'Hypertension', 'Overweight (BMI 27.4)'],
      recommendations: [
        'Add Telmisartan or ACE inhibitor for BP control and renal protection',
        'Increase Metformin to 1000mg twice daily if tolerated',
        'Refer to nutritionist for dietary counseling',
        'Schedule nephrology consultation for microalbuminuria',
        'Advise regular blood glucose monitoring (FBS + PPBS daily)',
        'Screen for diabetic retinopathy if not done in past year',
        'Consider GLP-1 receptor agonist if glycemia remains uncontrolled',
        'Urgent follow-up in 2 weeks (Oct 22) — do not miss',
      ],
      urgencyScore: 8,
    },
    'P003': {
      summary: `65-year-old male with history of stable CAD, now presented with acute ST-elevation myocardial infarction (STEMI). Thrombolysis administered, currently under cardiac care. Elevated cardiac enzymes confirm infarction. Requires intensive cardiac monitoring and secondary prevention therapy.`,
      criticalAlerts: [
        'Acute STEMI confirmed — life-threatening emergency',
        'Troponin I 15.2 ng/mL (380x above normal) — massive cardiac injury',
        'CK-MB 45 U/L (1.8x above normal) — confirms myocardial damage',
        'ECG shows ST Elevation — requires immediate intervention',
        'High LDL (145 mg/dL) — modifiable risk factor for recurrent events',
      ],
      riskFactors: [
        'Age > 60 (highest risk group for cardiac events)',
        'Known Coronary Artery Disease',
        'Uncontrolled hypertension history',
        'Family history of cardiac disease',
        'Sedentary lifestyle likely (common in rural elderly)',
      ],
      medicationIssues: [
        'No statin prescribed pre-admission — lipid control inadequate',
        'Aspirin and Clopidogrel initiated post-MI — appropriate dual antiplatelet therapy',
        'Atorvastatin high-dose started — good secondary prevention',
        'Beta-blocker not yet started — should be added when hemodynamically stable',
      ],
      chronicConditions: ['Coronary Artery Disease', 'Hypertension', 'Hyperlipidemia'],
      recommendations: [
        'Continue dual antiplatelet therapy (Aspirin + Clopidogrel) for 12 months',
        'Add Metoprolol when hemodynamically stable',
        'Intensive cardiac rehabilitation program post-discharge',
        'Stress test or angiography follow-up in 4-6 weeks',
        'Lifestyle modification: low-fat diet, gradual walking program',
        'Annual influenza and pneumococcal vaccination',
        'Cardiology follow-up every 3 months',
        'Emergency education for patient and family on warning signs',
      ],
      urgencyScore: 10,
    },
    'P005': {
      summary: `48-year-old male with progressive Chronic Kidney Disease (Stage 3, eGFR 38). Creatinine rising to 2.4 mg/dL with hyperkalemia (K+ 5.8). Hypertension remains uncontrolled. Nephrology referral pending. Risk of progression to Stage 4/5 and dialysis.`,
      criticalAlerts: [
        'Creatinine 2.4 mg/dL — severely elevated, indicates advanced CKD',
        'eGFR 38 mL/min — Stage 3b CKD, kidney function declining',
        'Hyperkalemia (5.8 mEq/L) — dangerous, can cause cardiac arrhythmia',
        'BP 158/98 — severely uncontrolled, accelerating kidney damage',
        'Potassium level requires immediate attention to prevent cardiac events',
      ],
      riskFactors: [
        'Uncontrolled hypertension as primary cause',
        'Likely diabetic nephropathy (common in Indian CKD)',
        'Age > 45 with progressive CKD',
        'No nephrology care until now',
        'Possible NSAID use (Ibuprofen allergy known — may have used alternatives)',
      ],
      medicationIssues: [
        'Furosemide dose may be insufficient for volume control',
        'ACE inhibitor/ARB not prescribed — would provide renal protection',
        'Hyperkalemia management needed — dietary potassium restriction',
        'No erythropoietin for anemia (Hb 9.2)',
      ],
      chronicConditions: ['Chronic Kidney Disease Stage 3b', 'Hypertension', 'Anemia'],
      recommendations: [
        'URGENT: Nephrology referral — expedite within 1 week',
        'Start Telmisartan 40mg (renal protective, BP control, reduce proteinuria)',
        'Dietary potassium restriction counsel — avoid bananas, potatoes, tomatoes',
        'Increase Furosemide to 80mg if BP allows',
        'Start Erythropoietin for anemia (Hb 9.2)',
        'Monitor potassium closely — repeat in 1 week',
        'Avoid NSAIDs, contrast agents, nephrotoxic drugs',
        'Protein intake moderation (0.6-0.8g/kg/day)',
        'Fluid management: restrict to 1.5L/day if edema present',
      ],
      urgencyScore: 9,
    },
    'P007': {
      summary: `70-year-old male with COPD exacerbation superimposed on Congestive Heart Failure. BNP markedly elevated (1850) indicating severe heart failure. Hypoxemia (SpO2 88%) requires oxygen therapy. Multisystem failure risk — cardiopulmonary interaction critical.`,
      criticalAlerts: [
        'BNP 1850 pg/mL — indicates severe decompensated heart failure',
        'SpO2 88% — severe hypoxemia, immediate oxygen needed',
        'Potassium 5.2 mEq/L — elevated (on diuretics, monitor closely)',
        'Creatinine 1.8 mg/dL — acute kidney injury likely from diuretic overuse',
        'Age 70 with COPD + CHF — high mortality risk',
      ],
      riskFactors: [
        'Age > 70 (highest mortality risk)',
        'Dual cardiopulmonary disease',
        'Acute exacerbation of chronic conditions',
        'Possible fluid overload',
        'Reduced exercise tolerance',
      ],
      medicationIssues: [
        'Diuretic dose doubled — monitor renal function and electrolytes',
        'Inhaled corticosteroid + LABA initiated — appropriate for COPD',
        'Beta-agonist may be needed for bronchospasm',
        'Anticoagulation needed for CHF (no mention of current use)',
      ],
      chronicConditions: ['COPD', 'Congestive Heart Failure', 'Chronic Kidney Disease'],
      recommendations: [
        'Continuous oxygen monitoring — target SpO2 > 92%',
        'Daily weight and fluid balance monitoring',
        'Add Enalapril or Sacubitril when stable for CHF',
        'Start anticoagulation if atrial fibrillation or low EF',
        'Pulmonary rehabilitation after stabilization',
        'Annual influenza and pneumococcal vaccination',
        'Smoking cessation if applicable (critical for COPD)',
        'Nutritional support — high protein, low sodium diet',
        'Home oxygen assessment for discharge planning',
        'Close monitoring of K+ and Creatinine with high-dose diuretics',
      ],
      urgencyScore: 10,
    },
  }

  const defaultInsight: AIInsight = {
    summary: visits.length > 0
      ? `Patient ${patient.name} (${patient.age} years, ${patient.gender}) with ${visits[0].diagnosis.toLowerCase()}. Last visited ${visits[0].facility} on ${visits[0].date}. ${visits[0].notes}`
      : 'No visits recorded yet. Complete initial assessment.',
    criticalAlerts: hasCriticalLab
      ? allLabResults.filter(l => l.status === 'critical').map(l => `${l.test}: ${l.value} (CRITICAL — ${l.referenceRange})`)
      : hasAbnormalLab
        ? allLabResults.filter(l => l.status === 'abnormal').map(l => `${l.test}: ${l.value} (Abnormal — ${l.referenceRange})`)
        : ['No critical alerts at this time'],
    riskFactors: ['Age-related risk factors', 'Lifestyle factors', 'Family history if documented'],
    medicationIssues: allPrescriptions.length > 0 ? ['Review medication adherence at next visit'] : ['No current medications'],
    chronicConditions: [...new Set(diagnoses.slice(0, 3))],
    recommendations: [
      'Regular follow-up as scheduled',
      'Monitor symptoms and report changes',
      'Maintain healthy lifestyle',
      daysSinceLastVisit > 30 ? 'OVERDUE for follow-up — schedule appointment' : 'Next appointment as planned',
    ].filter(Boolean),
    urgencyScore: patient.urgencyLevel === 'critical' ? 8 : patient.urgencyLevel === 'high' ? 6 : patient.urgencyLevel === 'medium' ? 4 : 2,
  }

  return insights[patientId] || defaultInsight
}
