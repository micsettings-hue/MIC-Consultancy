/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlaybookState, WeeklyProgressRow } from '../types';
import { ClipboardList, Award, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

interface Props {
  state: PlaybookState;
  onChange: (state: PlaybookState) => void;
}

export default function ProgressTracker({ state, onChange }: Props) {
  const handleProgressChange = (index: number, field: keyof WeeklyProgressRow, val: string) => {
    const updatedLogs = [...state.weeklyProgress];
    updatedLogs[index] = { ...updatedLogs[index], [field]: val };
    onChange({ ...state, weeklyProgress: updatedLogs });
  };

  const handleCommentsChange = (val: string) => {
    onChange({ ...state, comments: val });
  };

  return (
    <div className="space-y-8" id="progress-tracker-container">
      {/* Intro Header */}
      <div className="bg-[#0d1c3a] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#7c3aed]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <ClipboardList className="w-3 h-3" />
            OPERATIONAL LOGS & AUDITS
          </div>
          <h2 className="text-2xl font-display font-medium leading-none mb-1">Weekly Action Records & Quality Auditing</h2>
          <p className="text-slate-300 text-xs">Maintain operational momentum, track core progress indicators, and complete post-campaign checks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns: Weekly Progress Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm border-b border-whitespace pb-3">
              30-Day Campaign Implementation Log
            </h3>
            
            <div className="space-y-6">
              {state.weeklyProgress.map((row, index) => (
                <div key={row.weekName} className="border border-slate-200 rounded-lg p-4 bg-slate-50/20 shadow-xxs space-y-3" id={`weekly-progress-row-${index}`}>
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2 bg-slate-100/70 p-2 rounded-md">
                    <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-tight">{row.weekName}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Actions Completed This Week</label>
                      <input 
                        type="text"
                        className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#2E6DB4]"
                        placeholder="What items from the Priority Stack got deployed?"
                        value={row.actions}
                        onChange={(e) => handleProgressChange(index, 'actions', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Top Campaign Win / Breakthrough</label>
                      <input 
                        type="text"
                        className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#2E6DB4]"
                        placeholder="KPI breakthroughs, high conversions, ad CTR ratios..."
                        value={row.wins}
                        onChange={(e) => handleProgressChange(index, 'wins', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Critical Challenge Encountered</label>
                      <input 
                        type="text"
                        className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#2E6DB4]"
                        placeholder="Ad fatigue, loading speeds, tracking pixel block..."
                        value={row.challenges}
                        onChange={(e) => handleProgressChange(index, 'challenges', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Next Week's Focal Pivot Indicator</label>
                      <input 
                        type="text"
                        className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#2E6DB4]"
                        placeholder="Refining copy, onboarding assistance, scaling ad sets..."
                        value={row.focus}
                        onChange={(e) => handleProgressChange(index, 'focus', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quality Auditing & Retainer Scope */}
        <div className="space-y-6">
          {/* MIC Internal Quality Checklist */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-orange-500" />
              MIC Quality Checklist
            </h4>
            
            <div className="space-y-3 text-[11px] text-slate-700">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#2E6DB4] mt-0.5" defaultChecked />
                <span>Scorecard finalized with 10 diagnostic insights</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#2E6DB4] mt-0.5" defaultChecked />
                <span>Competitor matrix ratings & gaps configured</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#2E6DB4] mt-0.5" defaultChecked />
                <span>Custom positioning formula verified</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#2E6DB4] mt-0.5" defaultChecked />
                <span>90-Day Priority milestones customized</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#2E6DB4] mt-0.5" />
                <span>Day 14 follow-up call pre-booked and scheduled</span>
              </label>
            </div>
          </div>

          {/* Consultation Notes text field */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              Expert Consultation Notes
            </h4>
            <p className="text-slate-500 text-[10px] leading-relaxed">
              Log dynamic pointers, feedback requests, or specific upsell/retainer arguments handled during the active call.
            </p>
            <textarea 
              rows={4}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#2E6DB4] resize-none"
              placeholder="Record any additional qualitative recommendations..."
              value={state.comments}
              onChange={(e) => handleCommentsChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
