# AarogyaAI — Technical Architecture Documentation

## 1. System Overview

AarogyaAI is an AI-native diagnostic triage assistant that integrates with the Ayushman Bharat Digital Health Mission (ABDM) ecosystem to provide PHC doctors with instant, relevant patient context during consultations.

## 2. Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React Context + Hooks
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: PostgreSQL (production) / In-memory (prototype)
- **Authentication**: ABHA OAuth 2.0 + JWT
- **File Storage**: S3-compatible (for documents/images)
- **Caching**: Redis (for frequent queries)

### AI/ML
- **NLP Engine**: OpenAI GPT-4 / Claude for medical summarization
- **Risk Scoring**: Custom ML models for urgency prediction
- **Drug Interaction**: RxNorm + custom rules engine
- **NLP Pipeline**: Medical entity extraction, symptom clustering

### Infrastructure
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry for error tracking
- **Analytics**: PostHog / Mixpanel

## 3. ABHA Integration

### Authentication Flow
```
1. Doctor clicks "Login with ABHA"
2. Redirect to ABDM authentication portal
3. Doctor enters ABHA credentials
4. ABDM returns authorization code
5. Backend exchanges code for access token
6. Token stored securely (HTTP-only cookie)
7. Doctor redirected to dashboard
```

### Consent Management
```
1. Doctor requests patient records
2. System checks consent status via ABDM
3. If consent exists: fetch records
4. If no consent: request consent from patient
5. Patient approves via ABHA app/SMS
6. Records retrieved and displayed
7. Access logged for audit
```

### Data Retrieval
```
1. Backend calls ABHA Health Locker API
2. Fetches: demographics, medical history, lab results, medications
3. Data normalized to internal schema
4. AI engine processes data
5. Insights generated and cached
6. Frontend displays prioritized view
```

## 4. Data Models

### Patient Model
```typescript
interface Patient {
  id: string
  abhaId: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  village: string
  bloodGroup: string
  allergies: string[]
  emergencyContact: string
  registeredAt: string
  lastVisit: string
  totalVisits: number
  urgencyLevel: 'critical' | 'high' | 'medium' | 'low'
}
```

### Visit Model
```typescript
interface Visit {
  id: string
  date: string
  type: string
  facility: string
  doctor: string
  diagnosis: string
  symptoms: string[]
  vitals: {
    bp?: string
    pulse?: string
    temperature?: string
    weight?: string
    height?: string
    bmi?: string
    bloodSugar?: string
    spo2?: string
  }
  notes: string
  prescriptions: Prescription[]
  labResults: LabResult[]
  followUpDate?: string
}
```

### AI Insight Model
```typescript
interface AIInsight {
  summary: string
  criticalAlerts: string[]
  riskFactors: string[]
  medicationIssues: string[]
  chronicConditions: string[]
  recommendations: string[]
  urgencyScore: number
}
```

## 5. API Endpoints

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create new patient (admin only)

### Insights
- `GET /api/patients/:id/insights` - Get AI-generated insights
- `POST /api/insights/generate` - Trigger insight regeneration

### Consent
- `GET /api/consent/:patientId` - Check consent status
- `POST /api/consent/request` - Request patient consent
- `PUT /api/consent/:patientId` - Update consent settings

### Visits
- `GET /api/patients/:id/visits` - Get visit history
- `POST /api/visits` - Create new visit record

## 6. Security Considerations

### Authentication & Authorization
- ABHA OAuth 2.0 for doctor authentication
- JWT tokens with 1-hour expiry
- Refresh token rotation
- Role-based access (Doctor, Nurse, Admin)

### Data Protection
- End-to-end encryption (AES-256)
- TLS 1.3 for all communications
- Data encrypted at rest
- PII masked in logs

### Compliance
- ABDM guidelines compliance
- DPDP Act adherence
- Audit logging for all data access
- Right to erasure (patient data deletion)

## 7. Scalability Plan

### Phase 1: Single PHC (Current)
- 1 server, 1 database
- Supports 1-10 doctors, 100-500 patients
- Cost: ₹5,000/month

### Phase 2: District-Level
- Load balancer, 2-3 app servers
- Read replicas for database
- Supports 50-100 doctors, 5,000-10,000 patients
- Cost: ₹25,000/month

### Phase 3: State-Level
- Kubernetes cluster, auto-scaling
- Multi-region deployment
- Supports 1,000+ doctors, 100,000+ patients
- Cost: ₹2-5 lakh/month

### Phase 4: National
- Multi-cloud deployment
- Edge caching for low latency
- Supports 100,000+ doctors, 10M+ patients
- Cost: ₹50-100 lakh/month

## 8. Development Roadmap

### Q1 2026: Foundation
- [x] Market research and product strategy
- [x] MVP prototype development
- [x] Basic UI/UX design
- [ ] User testing with 2-3 PHCs
- [ ] Iterate based on feedback

### Q2 2026: Enhancement
- [ ] Real ABHA API integration
- [ ] AI summarization engine
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive design

### Q3 2026: Scale
- [ ] Government pilot program
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Integration with diagnostic labs

### Q4 2026: Expansion
- [ ] Telemedicine integration
- [ ] Ayushman Bharat PMJAY integration
- [ ] Population health analytics
- [ ] State-wide deployment

## 9. Team Structure

### Core Team
- **Product Manager**: 1 (You)
- **Full-Stack Developer**: 2
- **UI/UX Designer**: 1
- **ML Engineer**: 1
- **DevOps Engineer**: 1

### Advisors
- **Medical Advisor**: Practicing PHC doctor
- **Technical Advisor**: ABDM ecosystem expert
- **Business Advisor**: Healthcare startup veteran

## 10. Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|-----------|
| ABHA API delays | Build mock API for development, switch when ready |
| Scalability issues | Use cloud-native architecture from day 1 |
| Data breaches | Implement security best practices, regular audits |

### Business Risks
| Risk | Mitigation |
|------|-----------|
| Low adoption | Conduct extensive user research, involve doctors in design |
| Competition | Focus on PHC segment, build moat with AI/ABHA integration |
| Regulatory changes | Stay updated with ABDM/DPDP guidelines |

### Operational Risks
| Risk | Mitigation |
|------|-----------|
| Server downtime | Multi-region deployment, 99.9% SLA |
| Data loss | Regular backups, disaster recovery plan |
| Support burden | Comprehensive documentation, chatbot support |

## 11. Success Criteria

### Technical
- [ ] 99.9% uptime
- [ ] <200ms API response time
- [ ] Support 10,000+ concurrent users
- [ ] Zero data breaches

### Product
- [ ] 60%+ adoption in pilot PHCs
- [ ] 30% reduction in record lookup time
- [ ] 15% improvement in diagnostic accuracy
- [ ] NPS >50

### Business
- [ ] 100+ paying PHCs in year 1
- [ ] ₹1 crore ARR by end of year 1
- [ ] Break-even in 18 months

## 12. Conclusion

AarogyaAI is positioned to transform primary healthcare in India through intelligent, ABHA-native clinical decision support. With strong market demand, government support, and a clear technical roadmap, we are well-positioned to build a category-defining product in the digital health space.

The current prototype demonstrates the core value proposition. The next steps are to refine the AI engine, integrate with real ABHA APIs, and conduct extensive user testing with PHC doctors.
