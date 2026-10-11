import { patients, visitsData, generateAIInsight } from '@/data/patients'

export async function GET() {
  return Response.json(patients)
}
