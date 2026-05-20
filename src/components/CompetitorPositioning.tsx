/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlaybookState, CompetitorData } from '../types';
import { Shuffle, HelpCircle, Layers, Lightbulb, Grid } from 'lucide-react';

interface Props {
  state: PlaybookState;
  onChange: (state: PlaybookState) => void;
}

export default function CompetitorPositioning({ state, onChange }: Props) {
  const handleCompetitorChange = (index: number, field: keyof CompetitorData, val: any) => {
    const updatedCol = [...state.competitors];
    updatedCol[index] = { ...updatedCol[index], [field]: val };
    onChange({ ...state, competitors: updatedCol });
  };

  const handleCreateDefaultPositioning = () => {
    const target = state.brandClarity.targetAudience || '[your target audience]';
    const problem = state.brandClarity.coreProblem || '[their biggest pain point]';
    const company = state.brandClarity.companyName || '[your company name]';
    const product = state.brandClarity.productService || '[your core category]';
    const guarantee = state.brandClarity.brandPromise || '[your ultimate promise]';
    const voice = state.brandClarity.brandVoice || '[your brand tone]';

    const positioningStr = `For ${target} who suffer from ${problem}, ${company} is the standard-setting ${product} that guarantees ${guarantee} delivering with a distinct, ${voice} tone.`;

    onChange({
      ...state,
      comments: positioningStr
    });
  };

  // Helper to calculate total rating score for clean comparison
  const calcTotalRatingScore = (c: CompetitorData) => {
    return ((c.contentRating + c.pricingRating + c.trustRating + c.onlineRating) / 4).toFixed(1);
  };

  return (
    <div className="space-y-8" id="session-2-competitor-container">
      {/* Workshop Banner */}
      <div className="bg-[#0d1c3a] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#7c3aed]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Layers className="w-3 h-3" />
            SESSION 2 WORKSHOP
          </div>
          <h2 className="text-2xl font-display font-medium leading-none mb-1">Competitor Mapping & Premium Positioning</h2>
          <p className="text-slate-300 text-xs">Analyze the competitive landscape and claim your unique space in the local market.</p>
        </div>
      </div>

      {/* Competitor Scoring Matrix */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs overflow-hidden">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
          <Grid className="w-4 h-4 text-[#7c3aed]" />
          Competitor Comparison Matrix (Coexistence & Gaps)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
                <th className="p-3 shrink-0 min-w-[160px]">Metric</th>
                <th className="p-3 min-w-[180px] bg-blue-50/40 text-blue-900">{state.brandClarity.companyName || 'Your Brand'}</th>
                {state.competitors.map((c, idx) => (
                  <th key={idx} className="p-3 min-w-[180px]">
                    <input 
                      type="text"
                      className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-500 font-semibold focus:outline-none w-full"
                      value={c.name}
                      onChange={(e) => handleCompetitorChange(idx, 'name', e.target.value)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-3 font-semibold text-slate-800">Pricing Tier</td>
                <td className="p-3 bg-blue-50/10 text-blue-900 font-bold italic">Premium / Custom Value</td>
                {state.competitors.map((c, idx) => (
                  <td key={idx} className="p-3">
                    <select 
                      className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#2E6DB4] w-full text-xs"
                      value={c.pricing}
                      onChange={(e) => handleCompetitorChange(idx, 'pricing', e.target.value)}
                    >
                      <option value="Premium">Premium Pricing</option>
                      <option value="Mid-range">Mid-range</option>
                      <option value="Budget">Budget Option</option>
                    </select>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800">Primary Channel</td>
                <td className="p-3 bg-blue-50/10 text-slate-700 italic">Organic Hub + Scaled Funnels</td>
                {state.competitors.map((c, idx) => (
                  <td key={idx} className="p-3">
                    <input 
                      type="text"
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 focus:outline-none focus:border-[#2E6DB4] w-full text-xs"
                      value={c.channel}
                      onChange={(e) => handleCompetitorChange(idx, 'channel', e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800">Ad Presence</td>
                <td className="p-3 bg-blue-50/10 text-slate-700 italic">Testing Ads Mode Activated</td>
                {state.competitors.map((c, idx) => (
                  <td key={idx} className="p-3">
                    <label className="flex items-center gap-2 cursor-pointer py-1">
                      <input 
                        type="checkbox"
                        className="rounded text-[#2E6DB4]"
                        checked={c.hasAds}
                        onChange={(e) => handleCompetitorChange(idx, 'hasAds', e.target.checked)}
                      />
                      <span>Active Ads</span>
                    </label>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800">Unique Selling Point (USP)</td>
                <td className="p-3 bg-blue-50/10 text-slate-700 font-medium">{state.brandClarity.brandPromise || 'Value Guarantee'}</td>
                {state.competitors.map((c, idx) => (
                  <td key={idx} className="p-3">
                    <textarea 
                      rows={2}
                      className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#2E6DB4] w-full text-xs resize-none"
                      value={c.usp}
                      onChange={(e) => handleCompetitorChange(idx, 'usp', e.target.value)}
                    />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800">Identified Critical Weakness</td>
                <td className="p-3 bg-blue-50/10 text-slate-700 font-medium">None / Moving Fast</td>
                {state.competitors.map((c, idx) => (
                  <td key={idx} className="p-3">
                    <textarea 
                      rows={2}
                      className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#2E6DB4] w-full text-xs resize-none"
                      value={c.weakness}
                      onChange={(e) => handleCompetitorChange(idx, 'weakness', e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitor Benchmarking Exercise */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 mb-5">
          Competitive Core Strength Ratings (1 to 10 Scale)
        </h3>
        <p className="text-xs text-slate-500 mb-6">Compare content visual quality, perceived brand trust, and online availability metrics live during the coaching session.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {state.competitors.map((c, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200/60 shadow-xxs">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-800 text-xs uppercase font-mono tracking-tight">{c.name}</span>
                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                  Avg: {calcTotalRatingScore(c)}
                </span>
              </div>

              <div className="space-y-4">
                {/* Content Star Rating */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>Content Visuals Quality</span>
                    <span className="font-bold">{c.contentRating}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    className="w-full h-1.5 accent-orange-500 bg-slate-200 rounded-lg cursor-pointer"
                    value={c.contentRating}
                    onChange={(e) => handleCompetitorChange(idx, 'contentRating', parseInt(e.target.value))}
                  />
                </div>

                {/* Pricing / Value */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>Pricing Value Fit</span>
                    <span className="font-bold">{c.pricingRating}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    className="w-full h-1.5 accent-orange-500 bg-slate-200 rounded-lg cursor-pointer"
                    value={c.pricingRating}
                    onChange={(e) => handleCompetitorChange(idx, 'pricingRating', parseInt(e.target.value))}
                  />
                </div>

                {/* Trust Index */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>Perceived Brand Trust</span>
                    <span className="font-bold">{c.trustRating}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    className="w-full h-1.5 accent-orange-500 bg-slate-200 rounded-lg cursor-pointer"
                    value={c.trustRating}
                    onChange={(e) => handleCompetitorChange(idx, 'trustRating', parseInt(e.target.value))}
                  />
                </div>

                {/* Online Reach */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>Digital Discoverability</span>
                    <span className="font-bold">{c.onlineRating}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    className="w-full h-1.5 accent-orange-500 bg-slate-200 rounded-lg cursor-pointer"
                    value={c.onlineRating}
                    onChange={(e) => handleCompetitorChange(idx, 'onlineRating', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Formula Interactive Canvas */}
      <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-6 shadow-xs space-y-4">
        <h4 className="text-[#9333ea] font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-[#9333ea]" />
          The MIC Positioning Statement Builder
        </h4>
        
        <p className="text-slate-700 text-xs leading-relaxed">
          The core of brand positioning is carving a distinct promise around customer frustrations. Fill out the fields in Session 1 to see your statement form interactively below:
        </p>

        {/* Live Positioning Statement Rendering */}
        <div className="bg-white/85 border border-purple-100 rounded-lg p-5 font-serif text-slate-800 text-sm italic leading-relaxed shadow-inner">
          " For <span className="font-bold not-italic border-b border-purple-200 text-[#7c3aed] px-1">{state.brandClarity.targetAudience || '[TARGET AUDIENCE]'}</span>{' '}
          who struggle with <span className="font-bold not-italic border-b border-purple-200 text-[#7c3aed] px-1">{state.brandClarity.coreProblem || '[NEED OR PROBLEM]'}</span>,{' '}
          <span className="font-bold not-italic text-slate-900 border-b border-purple-200 px-1">{state.brandClarity.companyName || '[YOUR BRAND NAME]'}</span>{' '}
          is the high-impact <span className="font-bold not-italic border-b border-purple-200 text-[#7c3aed] px-1">{state.brandClarity.productService || '[CATEGORY]'}</span>{' '}
          that delivers <span className="font-bold not-italic border-b border-purple-200 text-[#7c3aed] px-1">{state.brandClarity.brandPromise || '[KEY BENEFIT/PROMISE]'}</span>,{' '}
          unlike competitors who struggle due to their focus gaps. "
        </div>

        <button 
          id="btn-save-positioning"
          className="flex items-center gap-2 bg-[#7c3aed] hover:bg-purple-700 transition-colors text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-xs cursor-pointer font-sans"
          onClick={handleCreateDefaultPositioning}
        >
          <Shuffle className="w-3.5 h-3.5" />
          Synchronize Draft to Consult Notes Summary
        </button>
      </div>
    </div>
  );
}
