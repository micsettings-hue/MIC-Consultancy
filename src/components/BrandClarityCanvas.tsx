/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlaybookState, BrandClarityData, ScorecardMetric } from '../types';
import { Target, Star, Award, ChevronRight, HelpCircle } from 'lucide-react';

interface Props {
  state: PlaybookState;
  onChange: (state: PlaybookState) => void;
}

export default function BrandClarityCanvas({ state, onChange }: Props) {
  const handleClarityChange = (field: keyof BrandClarityData, val: string) => {
    const updated = { ...state.brandClarity, [field]: val };
    onChange({ ...state, brandClarity: updated });
  };

  const handleScoreChange = (index: number, score: number) => {
    const updatedScorecard = [...state.scorecard];
    updatedScorecard[index] = { ...updatedScorecard[index], score };
    onChange({ ...state, scorecard: updatedScorecard });
  };

  const handleNotesChange = (index: number, notes: string) => {
    const updatedScorecard = [...state.scorecard];
    updatedScorecard[index] = { ...updatedScorecard[index], notes };
    onChange({ ...state, scorecard: updatedScorecard });
  };

  // Calculate Average score
  const avgAuditScore = (state.scorecard.reduce((sum, item) => sum + item.score, 0) / state.scorecard.length).toFixed(1);

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-emerald-500 text-emerald-950 border-emerald-300';
    if (score >= 2.5) return 'bg-amber-400 text-amber-950 border-amber-200';
    return 'bg-rose-500 text-white border-rose-300';
  };

  const scorecardOverviewText = (score: number) => {
    if (score >= 4) return 'Optimized Asset';
    if (score >= 3) return 'Moderate Presence';
    return 'Critical Priority Action';
  };

  return (
    <div className="space-y-8" id="session-1-canvas-container">
      {/* Intro Header */}
      <div className="bg-[#0d1c3a] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#7c3aed]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Award className="w-3 h-3" />
            SESSION 1 WORKSHOP
          </div>
          <h2 className="text-2xl font-display font-medium leading-none mb-1">Discovery & Brand Clarity Canvas</h2>
          <p className="text-slate-300 text-xs">Establish the strategic foundations and evaluate your core digital presence.</p>
        </div>
        <div className="bg-slate-800/60 rounded-lg p-3 text-right shrink-0 border border-slate-700 font-mono">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Average Brand Score</div>
          <div className="text-2xl font-bold text-purple-400">{avgAuditScore} / 5.0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Brand Clarity Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#2E6DB4]" />
              Core Identity & Target Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Launch Brand Name</label>
                <input 
                  id="input-company-name"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="e.g. My Premium Brand"
                  value={state.brandClarity.companyName}
                  onChange={(e) => handleClarityChange('companyName', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Primary Product or Service</label>
                <input 
                  id="input-product-service"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="e.g. Premium B2B Agency Consulting"
                  value={state.brandClarity.productService}
                  onChange={(e) => handleClarityChange('productService', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Core Target Audience (Location, Demographics, Context)</label>
                <textarea 
                  id="input-target-audience"
                  rows={2}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all resize-none"
                  placeholder="Describe who needs your services, e.g. Dhaka-based startup founders"
                  value={state.brandClarity.targetAudience}
                  onChange={(e) => handleClarityChange('targetAudience', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Ideal Customer Profile (ICP) (Personal pains, triggers, traits)</label>
                <textarea 
                  id="input-ideal-customer"
                  rows={2}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all resize-none"
                  placeholder="What keeps your ideal customer up at night?"
                  value={state.brandClarity.idealCustomer}
                  onChange={(e) => handleClarityChange('idealCustomer', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">The Critical Pain Point / Core Problem You Solve</label>
                <input 
                  id="input-core-problem"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="What frustration do they experience that you eliminate?"
                  value={state.brandClarity.coreProblem}
                  onChange={(e) => handleClarityChange('coreProblem', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Brand Promise or Guarantee</label>
                <input 
                  id="input-brand-promise"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="What is your guaranteed experience or metric outcome?"
                  value={state.brandClarity.brandPromise}
                  onChange={(e) => handleClarityChange('brandPromise', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Primary Brand Voice Descriptor</label>
                <input 
                  id="input-brand-voice"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="e.g. Authoritative, direct, educational, encouraging"
                  value={state.brandClarity.brandVoice}
                  onChange={(e) => handleClarityChange('brandVoice', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Identified Biggest Strategic Gap Currently</label>
                <input 
                  id="input-biggest-gap"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="What is currently the #1 roadblock to your digital launch?"
                  value={state.brandClarity.biggestGap}
                  onChange={(e) => handleClarityChange('biggestGap', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">12-Month Vision Goal</label>
                <input 
                  id="input-vision-12m"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="e.g. 15 premium active retainer clients"
                  value={state.brandClarity.vision12m}
                  onChange={(e) => handleClarityChange('vision12m', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Estimated Monthly Advertising Budget (BDT)</label>
                <input 
                  id="input-ad-budget"
                  type="text"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2E6DB4] transition-all"
                  placeholder="e.g. 15,000 BDT or none"
                  value={state.brandClarity.monthlyAdBudget}
                  onChange={(e) => handleClarityChange('monthlyAdBudget', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Info Panel */}
        <div className="space-y-6">
          <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-5 shadow-xs">
            <h4 className="text-[#9333ea] font-semibold text-xs uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#9333ea] text-[#9333ea]" />
              Coaching Strategy Tip
            </h4>
            <p className="text-slate-800 text-[11px] leading-relaxed">
              Ensure you drill down on <strong>specific custom metrics</strong>. If the target audience is generic (like "everyone"), push back to identify the segment with the greatest initial payment propensity or pain magnitude.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-3.5">
            <h4 className="text-slate-900 font-semibold text-xs uppercase tracking-wider font-mono">
              The MIC Core Brand Value Loop
            </h4>
            
            <div className="space-y-3 font-sans text-[11px] text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center font-bold font-mono shrink-0">1</span>
                <div>
                  <h5 className="font-semibold text-slate-800">Identify High-Intent ICP</h5>
                  <p>Anchor digital actions strictly on candidates with verified problems.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center font-bold font-mono shrink-0">2</span>
                <div>
                  <h5 className="font-semibold text-slate-800">Construct Resonating Promises</h5>
                  <p>Synthesize promises with explicit timeline guarantees.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center font-bold font-mono shrink-0">3</span>
                <div>
                  <h5 className="font-semibold text-slate-800">Align Channels Explicitly</h5>
                  <p>Only publish channels that mapped audience personas actively monitor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard Board */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            10-Point Digital Asset Scorecard
          </h3>
          <p className="text-slate-500 text-xs">Rate each marketing pillar from 1 (Critical Weakness) to 5 (Mastered Advantage) to dynamically update the audit matrix.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="digital-scorecard-grid">
          {state.scorecard.map((metric, index) => (
            <div key={metric.id} className="border border-slate-100/80 hover:border-slate-200 rounded-lg p-4 transition-all bg-slate-50/50" id={`scorecard-metric-${metric.id}`}>
              <div className="flex justify-between items-start gap-3 mb-2">
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">{metric.label}</h4>
                  <span className="text-[10px] text-slate-400 font-mono italic uppercase">{scorecardOverviewText(metric.score)}</span>
                </div>
                {/* Score Indicator Badge */}
                <div className={`w-10 h-10 shrink-0 rounded-lg border text-lg font-bold flex items-center justify-center tracking-tight font-mono shadow-xs ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </div>
              </div>

              {/* Slider rating range */}
              <div className="mt-3 mb-3">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Critical (1)</span>
                  <span>Mastered (5)</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  className="w-full accent-[#2E6DB4] cursor-pointer"
                  value={metric.score}
                  onChange={(e) => handleScoreChange(index, parseFloat(e.target.value))}
                />
              </div>

              {/* Score Notes field */}
              <input 
                type="text"
                className="w-full text-[11px] bg-white border border-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#2E6DB4]"
                placeholder="Diagnostic observations or quick alignment action..."
                value={metric.notes}
                onChange={(e) => handleNotesChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
