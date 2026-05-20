/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlaybookState, PriorityTask } from '../types';
import { Layers3, CheckCircle2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

interface Props {
  state: PlaybookState;
  onChange: (state: PlaybookState) => void;
}

export default function PriorityStack({ state, onChange }: Props) {
  const handlePriorityChange = (taskId: string, priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
    const updatedTasks = state.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, clientPriority: priority };
      }
      return t;
    });
    onChange({ ...state, tasks: updatedTasks });
  };

  // Filter tasks dynamically for interactive Month cards
  const month1Tasks = state.tasks.filter(t => t.clientPriority === 'HIGH');
  const month2Tasks = state.tasks.filter(t => t.clientPriority === 'MEDIUM');
  const month3Tasks = state.tasks.filter(t => t.clientPriority === 'LOW');

  const getPriorityBadgeClass = (p: string) => {
    switch (p) {
      case 'HIGH': return 'bg-rose-50 border-rose-100 text-rose-700';
      case 'MEDIUM': return 'bg-amber-50 border-amber-100 text-amber-700';
      case 'LOW': return 'bg-green-50 border-green-100 text-green-700';
      default: return 'bg-slate-50 border-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8" id="session-3-priority-container">
      {/* Workshop Intro banner */}
      <div className="bg-[#0d1c3a] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-4 border-[#7c3aed]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Layers3 className="w-3 h-3" />
            SESSION 3 WORKSHOP
          </div>
          <h2 className="text-2xl font-display font-medium leading-none mb-1">The 90-Day Priority Stack & Milestones</h2>
          <p className="text-slate-300 text-xs">Customize the roadmap and match launch actions with local marketing bandwidth.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Priority Configuration Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7c3aed]" />
                Interactive Priority Configuration Panel
              </h3>
            </div>

            <div className="space-y-3.5" id="priority-task-rows">
              {state.tasks.map((task) => (
                <div key={task.id} className="p-3.5 border border-slate-100 rounded-lg hover:border-slate-200 bg-slate-50/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs text-slate-800 leading-tight">{task.title}</h4>
                    <p className="text-[10px] text-slate-500">{task.recommendation}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 font-mono">MIC Recommendation:</span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">{task.defaultPriority}</span>
                    </div>
                  </div>

                  {/* Client Priority Select Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {(['HIGH', 'MEDIUM', 'LOW'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        id={`btn-${task.id}-priority-${lvl.toLowerCase()}`}
                        type="button"
                        onClick={() => handlePriorityChange(task.id, lvl)}
                        className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-md border tracking-wide transition-all uppercase cursor-pointer ${
                          task.clientPriority === lvl 
                            ? getPriorityBadgeClass(lvl) + ' shadow-xs ring-1 ring-offset-0 font-bold' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        {lvl === 'HIGH' ? 'Month 1' : lvl === 'MEDIUM' ? 'Month 2' : 'Month 3'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Month-by-month Live Roadmap Columns */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Dynamic Roadmap Output</h3>

          {/* Month 1 Panel */}
          <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-rose-200/40 pb-2">
              <span className="font-bold text-rose-800 text-xs font-mono uppercase">Month 1 Action Items</span>
              <span className="text-[10px] font-mono text-rose-600 bg-rose-50 rounded border border-rose-100 px-2 py-0.5">
                {month1Tasks.length} {month1Tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
            {month1Tasks.length === 0 ? (
              <p className="text-[11px] text-rose-700 italic">No tasks selected for Month 1. Set elements to HIGH preference.</p>
            ) : (
              <div className="space-y-2">
                {month1Tasks.map(t => (
                  <div key={t.id} className="flex gap-2 items-start text-[11px] text-slate-700 bg-white border border-rose-100 rounded-lg p-2.5 shadow-xxs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{t.title}</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">{t.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Month 2 Panel */}
          <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-amber-200/40 pb-2">
              <span className="font-bold text-amber-800 text-xs font-mono uppercase">Month 2 Action Items</span>
              <span className="text-[10px] font-mono text-amber-600 bg-amber-50 rounded border border-amber-100 px-2 py-0.5">
                {month2Tasks.length} {month2Tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
            {month2Tasks.length === 0 ? (
              <p className="text-[11px] text-amber-700 italic">No tasks selected for Month 2. Set elements to MEDIUM preference.</p>
            ) : (
              <div className="space-y-2">
                {month2Tasks.map(t => (
                  <div key={t.id} className="flex gap-2 items-start text-[11px] text-slate-700 bg-white border border-amber-100 rounded-lg p-2.5 shadow-xxs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{t.title}</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">{t.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Month 3 Panel */}
          <div className="bg-green-50/30 border border-green-200/80 rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-green-200/40 pb-2">
              <span className="font-bold text-green-800 text-xs font-mono uppercase">Month 3 Action Items</span>
              <span className="text-[10px] font-mono text-green-600 bg-green-50 rounded border border-green-100 px-2 py-0.5">
                {month3Tasks.length} {month3Tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
            {month3Tasks.length === 0 ? (
              <p className="text-[11px] text-green-700 italic">No tasks selected for Month 3. Set elements to LOW preference.</p>
            ) : (
              <div className="space-y-2">
                {month3Tasks.map(t => (
                  <div key={t.id} className="flex gap-2 items-start text-[11px] text-slate-700 bg-white border border-green-100 rounded-lg p-2.5 shadow-xxs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{t.title}</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">{t.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
