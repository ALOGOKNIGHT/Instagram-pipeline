# 📸 Instagram Content Pipeline
### Groq (Agent 1 & 2) + Gemini (Agent 3) · 4 Categories · No limits

---

## 🚀 Deploy on Vercel — Step by Step (10 minutes, FREE)

### Step 1 — Create GitHub Account
Go to https://github.com and sign up (free)

### Step 2 — Create a New Repository
1. Click the **+** button → **New repository**
2. Name it: `instagram-pipeline`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload Files
1. Click **uploading an existing file**
2. Upload ALL files from this folder:
   - `index.html`
   - `vercel.json`
   - `package.json`
   - `api/groq.js`
   - `api/gemini.js`
3. Click **Commit changes**

### Step 4 — Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **Add New Project**
3. Select your `instagram-pipeline` repo
4. Click **Deploy** (no settings to change)
5. Wait 1 minute → Your app is LIVE at `yourname.vercel.app`

---

## 🔑 Get Your Free API Keys

### Groq (Agent 1 & 2 — Research & Filter)
1. Go to https://console.groq.com/keys
2. Sign up free (Google login works)
3. Click **Create API Key**
4. Copy key starting with `gsk_...`
- ✅ Free: 14,400 requests/day — more than enough

### Gemini (Agent 3 — Slide Writer)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click **Create API Key**
4. Copy key starting with `AIza...`
- ✅ Free: 1,500 requests/day

---

## ⚠️ Important
**Do NOT open index.html directly in your browser** — API calls will fail due to browser CORS security.
**Always use your Vercel URL** → `https://yourapp.vercel.app`

---

## 📁 File Structure
```
instagram-pipeline/
├── index.html          ← Frontend UI
├── vercel.json         ← Deployment config
├── package.json        ← Node.js config
└── api/
    ├── groq.js         ← Server-side Groq API handler
    └── gemini.js       ← Server-side Gemini API handler
```

## How It Works
- `api/groq.js` and `api/gemini.js` run on Vercel's servers (not your browser)
- This bypasses all CORS restrictions
- Your API keys go from browser → Vercel server → Groq/Gemini → back to you
- Keys are never stored anywhere

---

## Running Locally (Optional)
```bash
npm install -g vercel
vercel dev
```
Then open http://localhost:3000
