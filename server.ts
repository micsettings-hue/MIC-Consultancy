/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded safe Gemini SDK client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not defined in your environment variables. Please add it via the Settings menu.');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// REST API for Strategic Feedback from a senior MIC Consultant
app.post('/api/evaluate-strategy', async (req, res) => {
  try {
    const { state } = req.body;
    if (!state) {
      return res.status(400).json({ error: 'Missing playbook state in request body.' });
    }

    const { brandClarity, scorecard, competitors, tasks } = state;

    // Check if key is configured, fallback gracefully if not
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn("Please notice: GEMINI_API_KEY is either missing or set to default example. Returning high-fidelity fallback insights.");
      return res.json({
        advice: `### 📋 Professional Fallback Analysis (API Key not yet configured)

To unlock personalized AI-generated consulting recommendations and specific local market positioning, please configure your **GEMINI_API_KEY** under the Settings panel!

#### 💡 Immediate Strategic Framework for **${brandClarity.companyName || "your brand"}**:
1. **Double Down on High-Value Channels**: Since you identified your core target as *"${brandClarity.targetAudience}"*, focus your organical content strictly on platforms they reside in. Ensure your brand voice (*"${brandClarity.brandVoice}"*) is kept 100% consistent across touchpoints.
2. **Address Scorecard Discrepancies**: Your audit highlighted opportunities in several sectors. Your primary goal is to close the gap on your lowest score items before spending budget.
3. **Structured Offer Packaging**: Clearly distinguish "${brandClarity.productService}" to solve *"${brandClarity.coreProblem}"* using a premium value wrapper to capture high conversions.`,
        suggestedPositioningUrl: `For ${brandClarity.targetAudience}, ${brandClarity.companyName} is the ultimate solution that delivers ${brandClarity.brandPromise}.`
      });
    }

    const client = getAiClient();

    // Standard prompt engineering built around the MIC growth model
    const builderPrompt = `
You are a brilliant Senior Growth Strategy & Positioning Consultant at MIC (Marketing & Innovation Collective), specializing in working 1:1 with business owners, early-stage brands, and premium solopreneurs.

Your client has filled out their "One-Time Brand Launch 1:1 Playbook". Evaluate their inputs and provide elite, custom, directly actionable strategic feedback. Make your tone professional, authoritative yet encouraging, highly design-conscious, and structured. Avoid cliché marketing buzzwords.

Here is the current Playbook State of the client:
---
Brand Launch Client Name: ${brandClarity.companyName}
Target Audience Description: ${brandClarity.targetAudience}
Core Problem Solved: ${brandClarity.coreProblem}
Product/Service Offering: ${brandClarity.productService}
Ideal Customer Profile: ${brandClarity.idealCustomer}
Brand Promise / Guarantee: ${brandClarity.brandPromise}
Brand Voice Adjectives: ${brandClarity.brandVoice}
Current Identified Biggest Gap: ${brandClarity.biggestGap}
12-Month Vision: ${brandClarity.vision12m}
3-Year Vision: ${brandClarity.vision3y}
Estimated Monthly Ad Budget: ${brandClarity.monthlyAdBudget}

Current Dashboard Audit Scores (1-5 range):
${scorecard.map((m: any) => `- ${m.label}: Score ${m.score}/5. Notes: ${m.notes || 'None'}`).join('\n')}

Competitors Rated In Workshop:
${competitors.map((c: any) => `- ${c.name}: Pricing Tier "${c.pricing}", Channels: "${c.channel}", Quality Rank: ${c.websiteScore}/5. USP: "${c.usp}"`).join('\n')}

Priorities Stack Selected:
${tasks.map((t: any) => `- ${t.title}: Selected Client Priority "${t.clientPriority}"`).join('\n')}
---

Please generate an structured report with the following specific sections:
1. ### 🔍 Strategic Diagnostic
   Review their biggest gap. State exactly what 3 vital things are holding them back from their 12-month vision and how to align these gaps.
2. ### 🎯 Premium Positioning Positioning Evolution
   Analyze their current competitors. Draft a high-impact, custom crafted, single positioning statement that immediately establishes premium distinctiveness. Frame it around their "Brand Promise".
3. ### 🚀 Month 1 Action Protocol
   Evaluate their highest priorities. Give them EXACTLY 3 bulletproof, non-obvious immediate action steps they can start TODAY, detailing channels, tools, or templates. Keep it highly practical.
4. ### 📊 Creative Content Hook Ideas
   Based on their brand voice (${brandClarity.brandVoice}) and ideal customer, write 2 compelling social caption hooks (one educating, one inspiring) to immediately test.

Keep the text beautifully formatted in standard Markdown (using elegant sub-headers, bold metrics, and structured lists). Refrain from saying "Here is your report" or general introductory summaries. Address the client directly.
`;

    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: builderPrompt,
    });

    res.json({
      advice: response.text || 'Unable to generate strategic recommendations. Please verify your variables and try again.',
      suggestedPositioningUrl: ''
    });

  } catch (error: any) {
    console.error('Gemini strategic evaluation failed:', error);
    res.status(500).json({ error: error.message || 'An error occurred during Gemini strategic generation.' });
  }
});

// Setup Vite Dev server middleware or serve production static assets
async function startServer() {
  const fs = await import('fs');
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy generated logo if search matched
  const logoSrc = path.join(process.cwd(), 'src/assets/images/mic_logo_1779285135896.png');
  const logoDest = path.join(publicDir, 'input_file_0.png');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('Successfully copied MIC logo image to public directory.');
  }

  // Copy generated portrait if search matched
  const portraitSrc = path.join(process.cwd(), 'src/assets/images/lead_consultant_portrait_1779285156941.png');
  const portraitDest = path.join(publicDir, 'input_file_1.png');
  if (fs.existsSync(portraitSrc)) {
    fs.copyFileSync(portraitSrc, portraitDest);
    console.log('Successfully copied Lead Consultant portrait to public directory.');
  }

  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log('Mouting Vite Dev Server Middleware...');
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static files from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MIC Strategy Server running on http://localhost:${PORT}`);
  });
}

startServer();
