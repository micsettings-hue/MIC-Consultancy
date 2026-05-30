/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { PlaybookState } from '../types';
import { 
  ClipboardCheck, 
  Sparkles, 
  ArrowRight, 
  Gauge, 
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface Props {
  state: PlaybookState;
  onChange: (updatedState: PlaybookState) => void;
}

export default function DiagnosticWorkspace({ state, onChange }: Props) {
  const answers = state.diagnosticAnswers || Array(10).fill('');

  const questions = [
    {
      num: 1,
      label: "Brand Lifecycle",
      q: "Is this a brand-new market entry, an old legacy brand seeking a major repositioning pivot, or an active business stuck in stagnation?",
      placeholder: "e.g. New direct-to-consumer organic local skincare brand launched last month..."
    },
    {
      num: 2,
      label: "Core Roadblock",
      q: "What is currently the single greatest operational or digital bottleneck preventing you from scaling your conversions?",
      placeholder: "e.g. Extreme Shopify checkout loading delay (over 8 seconds) and poor user layout..."
    },
    {
      num: 3,
      label: "Audience Persona",
      q: "Who is your absolute highest-value ideal customer avatar, and where do they aggregate online?",
      placeholder: "e.g. Urban working mothers aged 25-40 in central Dhaka, active in closed parenting groups..."
    },
    {
      num: 4,
      label: "Historical Traction",
      q: "How many organic inquiries, demo requests, or completed sales did you generate over the past thirty days?",
      placeholder: "e.g. About 15 sales total from raw Instagram DM inquiries, no ads or pipeline tracking..."
    },
    {
      num: 5,
      label: "Digital Assets Audit",
      q: "Do you have an existing responsive landing page, certified domain, social accounts, and tracking pixels configured?",
      placeholder: "e.g. Active Facebook and Instagram page with 12k followers, but no web domain or tracking pixel..."
    },
    {
      num: 6,
      label: "Paid Advertising History",
      q: "Have you previously run custom paid campaigns, and if yes, what was your approximate scale, CPC, and ROAS?",
      placeholder: "e.g. Spent BDT 10k on organic boosts, got raw comments but zero direct trackable purchases..."
    },
    {
      num: 7,
      label: "USP & Positioning",
      q: "Why would a client purchase your services or products instead of choosing an established direct competitor?",
      placeholder: "e.g. 100% dermatologically certified eco-friendly clinical serums with 28-day active results..."
    },
    {
      num: 8,
      label: "Financial Commitment",
      q: "Do you have a dedicated budget (minimum BDT 10k-20k/month test spend) dedicated purely to ad testing and sprints?",
      placeholder: "e.g. Yes, allocated BDT 20,000 for high impact Month 1 Meta testing campaigns..."
    },
    {
      num: 9,
      label: "Creative Production",
      q: "How many custom testimonial clips, banners, or write-ups can your internal team reliably deploy every week?",
      placeholder: "e.g. Limited internal capacity, but founder can document 2 raw video reels on her phone..."
    },
    {
      num: 10,
      label: "Success Parameters",
      q: "If we execute this growth sprint, which specific outcome metrics would define an absolute home-run victory for you?",
      placeholder: "e.g. Reach steady 150+ sales orders per month and automate our Messenger delivery funnel..."
    }
  ];

  const handleUpdateAnswer = (index: number, val: string) => {
    const updatedAnswers = [...answers];
    // Fill up to 10 if smaller
    while (updatedAnswers.length < 10) {
      updatedAnswers.push('');
    }
    updatedAnswers[index] = val;
    onChange({
      ...state,
      diagnosticAnswers: updatedAnswers
    });
  };

  // Partially-prepared marketing intelligence generators
  const deriveLifecycleRule = () => {
    const ans1 = answers[0]?.toLowerCase() || '';
    if (!ans1) return "Please complete Q1 to synthesize lifecycle strategy.";
    if (ans1.includes('new') || ans1.includes('start') || ans1.includes('entry') || ans1.includes('onboard')) {
      return "🌱 NEW LAUNCH FOCUS: Brand Trust Priming. Prioritize raw founder stories, micro-influencer seeding, and clear trust triggers (guarantees, certificates) before high media spending.";
    }
    if (ans1.includes('old') || ans1.includes('legacy') || ans1.includes('pivot') || ans1.includes('stagn')) {
      return "🔄 REBUILD FOCUS: Friction Reduction & Audience Reboot. Modernize brand visuals immediately, streamline old checkout pathways, and query old client logs for high-yield rest campaigns.";
    }
    return "📈 GROWTH SPRINT FOCUS: Direct scalable traffic. Focus on broad demographic testing and optimizing landing page click-to-lead ratios.";
  };

  const deriveRoadblockRule = () => {
    const ans2 = answers[1]?.toLowerCase() || '';
    if (!ans2) return "Please complete Q2 to unlock tech bottleneck diagnostic.";
    if (ans2.includes('speed') || ans2.includes('loading') || ans2.includes('website') || ans2.includes('shopify') || ans2.includes('checkout')) {
      return "⚠️ CRITICAL ACTION: Technical Optimization Required. Repair redirect links, compress catalog media, or deploy a lightning-fast single-page React/Shopify theme to capture lost clicks.";
    }
    if (ans2.includes('sales') || ans2.includes('traffic') || ans2.includes('lead') || ans2.includes('customer')) {
      return "🎯 CONVERSION REPAIR: Run a split hook test. Test 3 distinct opening hooks on Meta Reels to identify high-converting user attention variables.";
    }
    return "⚡ GENERAL SYSTEM TUNING: Build a highly structured multi-channel CRM funnel to track client conversions from initial chat to retainer.";
  };

  const deriveBudgetRule = () => {
    const ans8 = answers[7]?.toLowerCase() || '';
    if (!ans8) return "Please enter budget parameters in Q8.";
    return `💵 MEDIA SPEND PLAN: Deploy 65% of test budget (${ans8 || "BDT 15,000"}) to targeted warm demographics, 20% to retargeting cart abandoners, and 15% exclusively to UGC video creative validation.`;
  };

  const deriveCreativeRule = () => {
    const ans9 = answers[8]?.toLowerCase() || '';
    if (!ans9) return "Please answer Q9 to configure media production metrics.";
    if (ans9.includes('low') || ans9.includes('limited') || ans9.includes('capacity') || ans9.includes('no time')) {
      return "🎬 CREATIVE WORKAROUND: Bypassing High Production. Rely heavily on typography-based screenshot testimonial sliders and simple client text conversations. It yields raw high-trust results.";
    }
    return "🎥 SCALING ASSET VELOCITY: Deploy 2 horizontal and 3 vertical video assets per week. Ensure clear direct-response CTAs are embedded within the first 3 seconds.";
  };

  const totalAnswered = answers.filter(a => a.trim().length > 0).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden select-none" id="diagnostic-intake-workspace">
      {/* Tab Title Area */}
      <div className="bg-slate-900 text-white p-5 border-b border-slate-800 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider font-mono">
              Diagnostic Intake Worksheet
            </h3>
          </div>
          <span className="text-[10px] bg-slate-800 border border-slate-700 text-teal-300 font-mono font-bold px-2.5 py-1 rounded-full">
            Completed: {totalAnswered}/10
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-sans leading-normal">
          Log client responses "written by you" during the initial workshop. State variables auto-synthesize partially prepared growth guidelines in the next steps!
        </p>
      </div>

      <div className="p-5 space-y-6 max-h-[640px] overflow-y-auto bg-slate-50/50" id="diagnostic-inputs-scroll">
        <div className="space-y-4">
          {questions.map((item, idx) => (
            <div key={item.num} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xxs transition-all hover:border-slate-300 space-y-3" id={`diagnostic-input-card-${item.num}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-slate-800 text-white font-mono rounded-full flex items-center justify-center text-[10px] font-bold">
                    {item.num}
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-sans">{item.label}</span>
                </div>
                <span className="text-[9px] uppercase font-mono font-bold text-slate-400">
                  Sprint Diagnostic
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate-500 font-medium font-sans">
                  {item.q}
                </label>
                <textarea
                  id={`diagnostic-ans-input-${idx}`}
                  rows={2}
                  value={answers[idx] || ''}
                  onChange={(e) => handleUpdateAnswer(idx, e.target.value)}
                  placeholder={item.placeholder}
                  className="w-full text-xs font-medium text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-sans"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Marketing Intelligence (Partially Prepared Strategy Guidelines Preview) */}
        <div className="bg-gradient-to-br from-purple-950 to-indigo-950 text-white rounded-xl p-5 border border-purple-900/50 space-y-4 shadow-md" id="diagnostics-realtime-insights">
          <div className="flex items-center gap-2 border-b border-purple-900/40 pb-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-purple-100">
              Real-time Growth Strategy Insights (Synthesized)
            </h4>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-purple-300 font-bold uppercase tracking-wider block">Lifecycle Pivot Play</span>
              <p className="text-[11px] text-purple-100 font-medium">{deriveLifecycleRule()}</p>
            </div>

            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-purple-300 font-bold uppercase tracking-wider block">Priority Tech Cure</span>
              <p className="text-[11px] text-purple-100 font-medium">{deriveRoadblockRule()}</p>
            </div>

            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-purple-300 font-bold uppercase tracking-wider block">Ad Budget Allocation Rules</span>
              <p className="text-[11px] text-purple-100 font-medium">{deriveBudgetRule()}</p>
            </div>

            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-purple-300 font-bold uppercase tracking-wider block">Creative Velocity Pivot</span>
              <p className="text-[11px] text-purple-100 font-medium">{deriveCreativeRule()}</p>
            </div>
          </div>

          <p className="text-[10px] text-purple-300 text-center font-mono italic">
            💡 Head to the "Growth & Marketing Guidelines" tab in the menu to read fully formatted, custom-tailored campaign assets.
          </p>
        </div>
      </div>
    </div>
  );
}
