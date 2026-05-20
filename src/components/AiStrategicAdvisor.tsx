/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlaybookState } from '../types';
import Markdown from 'react-markdown';
import leadConsultantPortrait from '../assets/images/lead_consultant_portrait_1779285156941.png';
import { 
  Sparkles, 
  Loader2, 
  BookOpen, 
  UserCheck, 
  ShieldAlert, 
  RefreshCw, 
  Mail, 
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';

interface Props {
  state: PlaybookState;
}

export default function AiStrategicAdvisor({ state }: Props) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const triggerStrategicReview = async () => {
    setLoading(true);
    setReport(null);
    setErrorMsg(null);
    
    // Stagger loading indicators for premium strategic feel
    setLoadingStep('Reviewing scorecard ratings (10 Key sectors)...');
    await new Promise(r => setTimeout(r, 600));

    setLoadingStep('Mapping assets with competitor scores...');
    await new Promise(r => setTimeout(r, 600));

    setLoadingStep('Formulating custom positioning hook formulas with Google Gemini...');

    try {
      const response = await fetch('/api/evaluate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state })
      });

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}: Failed to request strategic review.`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setReport(data.advice);
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'Unable to establish server connection. Verify your development port is running.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="space-y-8" id="ai-strategic-advisor-chapter">
      {/* Intro Banner */}
      <div className="bg-[#0d1c3a] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#7c3aed]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Sparkles className="w-3 h-3 text-purple-400 fill-purple-400 animate-pulse" />
            AI STRATEGIC ADVISOR
          </div>
          <h2 className="text-2xl font-display font-medium leading-none mb-2">MIC Strategic Consulting Engine</h2>
          <p className="text-slate-300 text-xs">Run automatic machine-learning diagnostics to upgrade positioning, map gaps, and draft high-converting ad hooks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input Triggers & Explanations */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col gap-4">
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Expert Consultant Profile
            </h3>
            
            {/* Custom Consultant Profile for Muzahidul Islam */}
            <div className="bg-[#f5f2ff] border border-purple-100 p-4 rounded-xl space-y-3 shadow-xxs">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-[#7c3aed] overflow-hidden shrink-0 shadow-sm bg-white">
                  <img src={leadConsultantPortrait} alt="Muzahidul Islam" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs leading-none mb-1">Muzahidul Islam</h4>
                  <p className="text-[10px] font-semibold text-[#7c3aed]">Founder & Lead Consultant</p>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">MIC</p>
                </div>
              </div>
              <div className="border-t border-purple-100/80 pt-2.5 space-y-1.5 text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-2 hover:text-purple-700 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#7c3aed] shrink-0" />
                  <span className="truncate">leadconsultant.mic@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 hover:text-purple-700 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#7c3aed] shrink-0" />
                  <span>+8801828772486</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-[11px] leading-relaxed">
              Our growth engine conducts real-time gap evaluations on your scorecard ratings and aligns them with market competitors to formulate specific ad recommendations.
            </p>

            <button
              id="btn-evaluate-ai"
              type="button"
              disabled={loading}
              onClick={triggerStrategicReview}
              className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold text-xs py-3 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Sprints...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate AI Strategic Report
                </>
              )}
            </button>
          </div>

          <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-5 shadow-xs space-y-2.5">
            <h4 className="font-bold text-purple-950 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#7c3aed]" />
              Strategic Prompt Mechanics
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-800 text-[10px]">
              <li>Analyzes 10-point scorecard to spot optimization bottlenecks</li>
              <li>Scours competitor ratings to pinpoint unique value openings</li>
              <li>Generates client ad copy captions in specified brand voices</li>
            </ul>
          </div>
        </div>

        {/* Right Columns: Interactive Report Viewer */}
        <div className="lg:col-span-2 space-y-6">
          {loading && (
            <div className="bg-white border border-slate-200 rounded-xl p-10 shadow-xs flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-10 h-10 text-[#7c3aed] animate-spin" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">MIC AI Diagnostic Running</h4>
                <p className="text-xs text-[#7c3aed] font-mono animate-pulse">{loadingStep}</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50/70 border border-rose-200 text-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">Strategic Consultation Process Interrupted</h4>
                  <p className="text-xs text-rose-800/90 leading-normal font-medium">An issue occurred while evaluating your launch strategy. Please see details below:</p>
                  
                  {/* Styled Error display */}
                  <div className="bg-white border border-rose-100 rounded-lg p-3 my-3 text-xs font-mono text-rose-700/95 shadow-xxs break-all">
                    {errorMsg}
                  </div>
                </div>
              </div>

              {/* Step-by-step Troubleshooting Checklist */}
              <div className="border-t border-rose-200/50 pt-4 space-y-3">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#7c3aed]" />
                  Recommended Troubleshooting Steps:
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1 text-[11px] text-slate-700">
                  <li className="bg-white/80 border border-slate-200/50 rounded-lg p-3 flex flex-col gap-1 shadow-xxs">
                    <span className="font-bold text-purple-700">1. Check API Secrets</span>
                    <span>Verify that your <strong>GEMINI_API_KEY</strong> env variable is active and accurately configured inside the AI Studio Secrets panel.</span>
                  </li>
                  <li className="bg-white/80 border border-slate-200/50 rounded-lg p-3 flex flex-col gap-1 shadow-xxs">
                    <span className="font-bold text-purple-700">2. Verify Network Connection</span>
                    <span>Ensure you have an active internet connection to query external resources and establish continuous data pipelines.</span>
                  </li>
                  <li className="bg-white/80 border border-slate-200/50 rounded-lg p-3 flex flex-col gap-1 shadow-xxs">
                    <span className="font-bold text-purple-700">3. Control Plane Port Status</span>
                    <span>Check that your microservices and backend application development servers are running correctly on port <strong>3000</strong>.</span>
                  </li>
                  <li className="bg-white/80 border border-slate-200/50 rounded-lg p-3 flex flex-col gap-1 shadow-xxs">
                    <span className="font-bold text-purple-700">4. Retry Diagnostic</span>
                    <span>Click the retry button below to re-initiate the strategic analysis of your digital brand launch assets.</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Retry Button */}
              <div className="flex justify-end pt-2">
                <button
                  id="btn-retry-review"
                  type="button"
                  onClick={triggerStrategicReview}
                  className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-purple-700 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow-sm font-sans transition-all cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry Strategic Diagnostic
                </button>
              </div>
            </div>
          )}

          {!loading && !report && !errorMsg && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400 flex flex-col items-center gap-4 shadow-inner">
              <BookOpen className="w-10 h-10 text-slate-300" />
              <div className="max-w-md space-y-1">
                <h4 className="font-semibold text-slate-700 text-xs">Ready for Active Consulting Review</h4>
                <p className="text-[10px] leading-relaxed">
                  Click the triggers on the left panel to execute an automatic machine review and craft high-fidelity local ad suggestions matching your brand metrics.
                </p>
              </div>
            </div>
          )}

          {/* Strategic Markdown Report */}
          {report && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800 text-xs font-mono uppercase">Consulting Report Validated</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Powered by Google Gemini</span>
              </div>

              {/* Styled markdown output wrapper */}
              <div className="markdown-body prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
                <Markdown>{report}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
