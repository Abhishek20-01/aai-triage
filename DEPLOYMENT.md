# 🚀 AarogyaAI Triage — Deployment Guide

## Option 1: Deploy to Vercel (Recommended — Fastest)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `aai-triage`
3. Description: `AI-powered diagnostic triage assistant for Ayushman Bharat Health Records`
4. Set to **Public**
5. Click **Create repository**

### Step 2: Upload Files to GitHub

**Option A: Using GitHub Web UI (Easiest)**
1. Go to your new repository: https://github.com/YOUR_USERNAME/aai-triage
2. Click "Add file" → "Upload files"
3. Upload ALL files from `/Users/abhisheksrivastava/Desktop/Claude/aai-triage/`
4. Commit message: "Initial commit: AarogyaAI Triage Assistant"
5. Click "Commit changes"

**Option B: Using Terminal**
```bash
cd /Users/abhisheksrivastava/Desktop/Claude/aai-triage
git init
git add .
git commit -m "Initial commit: AarogyaAI Triage Assistant"
git remote add origin https://github.com/YOUR_USERNAME/aai-triage.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import" next to your `aai-triage` repository
3. Framework Preset: **Other** (or leave as is)
4. Root Directory: `./` (default)
5. Build Command: (leave empty)
6. Output Directory: `public`
7. Click **Deploy**

Wait 30-60 seconds. Your app will be live at: `https://aai-triage-xxx.vercel.app`

---

## Option 2: Deploy to Vercel via CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd /Users/abhisheksrivastava/Desktop/Claude/aai-triage

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? aai-triage
# - In which directory is your code? ./
# - Want to modify settings? No

# For production:
vercel --prod
```

---

## Option 3: Deploy to Netlify Drop (No GitHub Needed)

1. Go to https://app.netlify.com/drop
2. Drag the `public` folder from `/Users/abhisheksrivastava/Desktop/Claude/aai-triage/public`
3. Your site will be live instantly

---

## 📁 Project Structure

```
aai-triage/
├── public/
│   └── index.html          ← Main app (deploy this)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── patient/[id]/page.tsx
├── components/
│   ├── Sidebar.tsx
│   └── PatientList.tsx
├── data/
│   └── patients.ts
├── lib/
│   └── ai-insights.ts
├── package.json
├── README.md
└── DEPLOYMENT.md
```

---

## 🎯 Demo Instructions

Once deployed, here's what to showcase:

### Dashboard View
1. **Patient List** — Shows 8 patients with urgency badges (critical/high/medium/low)
2. **Search** — Filter by name, ABHA ID, or village
3. **Statistics** — Total patients, critical count, high priority count

### Patient Detail View
1. Click any patient to see their detailed record
2. **Critical Alerts** — Red flag section with life-threatening conditions
3. **AI Summary** — Generated clinical summary
4. **Risk Factors** — Identified risk factors
5. **Recommendations** — AI-generated action items
6. **Visit History** — Expandable timeline with vitals, prescriptions, lab results
7. **Allergies** — Safety alerts

### Key Patients to Demo
- **Mohammed Ali (P003)** — Critical: Heart Attack (STEMI)
- **Krishna Prasad (P007)** — Critical: COPD + CHF
- **Vikram Singh (P005)** — High: CKD Stage 3b
- **Rajesh Kumar (P001)** — High: Uncontrolled Diabetes

### Consent Modal
- Click "Manage ABHA Consent & Privacy"
- Shows consent framework, access logs, compliance notes

---

## 🔧 Customization

### Change Doctor Name
In `public/index.html`, search for "Dr. S. Verma" and replace with your name.

### Change PHC Location
Search for "Rampur" and replace with your location.

### Add More Patients
Add entries to the `patients` array and `visitsData` object in the `<script>` section.

---

## 📦 Alternative: Simple Hosting

If Vercel/Netlify don't work, you can:

1. **Open directly in browser**: Double-click `public/index.html`
2. **Serve locally**: `python3 -m http.server 8000` in the `public` folder
3. **Upload to any web host**: Just upload the `public/index.html` file

---

## ✅ What You Have

- ✅ Professional medical UI with clinical color scheme
- ✅ 8 realistic Indian patient scenarios
- ✅ AI-generated summaries for 4 critical cases
- ✅ Red-flag detection system
- ✅ Urgency scoring (1-10 scale)
- ✅ ABHA consent management UI
- ✅ ABDM compliance framework
- ✅ Responsive design
- ✅ Lab results with status indicators
- ✅ Prescription tracking
- ✅ Visit timeline
- ✅ Search functionality

---

## 🆘 Troubleshooting

**Q: GitHub CLI not working?**
A: Use the web UI method described above.

**Q: Vercel deployment fails?**
A: Ensure the "Output Directory" is set to `public`.

**Q: How to update the deployed site?**
A: Re-upload files to GitHub or run `vercel --prod` again.

**Q: Can I customize the design?**
A: Yes! The app uses Tailwind CSS classes. Edit `public/index.html`.

---

## 📞 Support

For issues with:
- **Vercel**: https://vercel.com/docs
- **GitHub**: https://docs.github.com
- **This project**: Review the code in `public/index.html`
