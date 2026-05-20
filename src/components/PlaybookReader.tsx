/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Calendar, TrendingUp, CheckCircle, Flame, ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

interface Props {
  activeChapter: string;
  onChapterChange: (chapter: string) => void;
}

export default function PlaybookReader({ activeChapter, onChapterChange }: Props) {
  const chapters = [
    { id: 'overview', title: 'Service Overview & Timeline', icon: BookOpen },
    { id: 'session1', title: 'Session 1: Discovery Guidelines', icon: HelpCircle },
    { id: 'session2', title: 'Session 2: Competitor Gaps', icon: Flame },
    { id: 'session3', title: 'Session 3: 90-Day Roadmap', icon: Calendar },
    { id: 'growth', title: 'Growth & Marketing Guidelines', icon: TrendingUp },
    { id: 'followup', title: 'Day 14 Follow-Up & Upsells', icon: PhoneCall },
    { id: 'dashboard', title: 'Quality Auditing & Retainers', icon: ShieldCheck },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4" id="playbook-reader-navigation">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">
          MIC Playbook Sections
        </h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Select a chapter to read full guidelines and operational workflows.</p>
      </div>

      <nav className="flex flex-col gap-1.5" id="playbook-chapters-nav">
        {chapters.map((ch) => {
          const Icon = ch.icon;
          const isActive = activeChapter === ch.id;
          return (
            <button
              id={`nav-chapter-${ch.id}`}
              key={ch.id}
              type="button"
              onClick={() => onChapterChange(ch.id)}
              className={`flex items-center gap-3 w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-50 text-[#7c3aed] shadow-xxs border-l-4 border-[#7c3aed] pl-2.5 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-l-4 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#7c3aed]' : 'text-slate-400'}`} />
              <span>{ch.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Playbook micro stats card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 mt-4">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Consultancy Specs</div>
        <div className="space-y-1.5 text-[11px] text-slate-600 font-sans">
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-semibold text-slate-800">7 Days Sprint</span>
          </div>
          <div className="flex justify-between">
            <span>Sessions:</span>
            <span className="font-semibold text-slate-800">3 Workshops</span>
          </div>
          <div className="flex justify-between">
            <span>Follow-up:</span>
            <span className="font-semibold text-slate-800">Day 14 Ring</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5 font-bold">
            <span>Package Fee:</span>
            <span className="text-[#9333ea]">BDT 15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export { PlaybookReader };
