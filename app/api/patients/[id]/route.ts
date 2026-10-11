import { patients, visitsData } from '@/data/patients'
import { generateAIInsight } from '@/lib/ai-insights'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patient = patients.find((p) => p.id === params.id)

  if (!patient) {
    return Response.json({ error: 'Patient not found' }, { status: 404 })
  }

  const visits = visitsData[params.id] || []
  const aiInsight = generateAIInsight(params.id, visits, patient)

  return Response.json({
    patient,
    visits,
    aiInsight,
  })
}
