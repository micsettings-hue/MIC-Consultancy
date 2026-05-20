/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Star, Award, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  activeChapter: string;
}

export default function PlaybookPages({ activeChapter }: Props) {
  switch (activeChapter) {
    case 'overview':
      return (
        <div className="space-y-6" id="chapter-overview">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">1. Service Overview & Timeline</h2>
            <p className="text-slate-500 text-xs">Full service scope, participant eligibility criteria, and timeline flows.</p>
          </div>

          <div className="bg-[#f5f2ff] rounded-xl p-5 border border-purple-100 space-y-2.5">
            <h3 className="font-semibold text-xs text-purple-900 uppercase tracking-wide font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#7c3aed]" />
              What is the One-Time Brand Launch Consultancy?
            </h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              The MIC One-Time Brand Launch 1:1 Consultancy is a structured, high-impact engagement designed for business owners, solopreneurs, and early-stage brands who need clarity, direction, and a professional digital roadmap — fast. In <strong>7 Days</strong>, the client moves from confusion to a fully documented growth strategy.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="font-semibold text-slate-800 text-sm">Participant Target Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/50 space-y-1">
                <h4 className="font-bold text-xs text-slate-800">New Brand Launches</h4>
                <p className="text-[11px] text-slate-500">Founders initiating a digital brand layout for the first time.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/50 space-y-1">
                <h4 className="font-bold text-xs text-slate-800">Repositioning Sprints</h4>
                <p className="text-[11px] text-slate-500">Existing business owners seeking re-marketing or rebranding validation.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="font-semibold text-slate-800 text-sm">Full Scope Service Package</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0d1c3a] text-white font-mono">
                  <tr>
                    <th className="p-3">Deliverable Asset</th>
                    <th className="p-3">Core Strategy Content Details</th>
                    <th className="p-3">Delivery Horizon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 bg-white">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Digital & Brand Audit</td>
                    <td className="p-3">Comprehensive review of social profiles, web speeds, SEO cues, and current copy assets.</td>
                    <td className="p-3">Days 1 - 2</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Competitor Positioning Matrix</td>
                    <td className="p-3">Exposé on 3 - 5 top local and global competitors, detailing target keywords, pricing, and gap areas.</td>
                    <td className="p-3">Days 2 - 3</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">90-Day Growth Roadmap</td>
                    <td className="p-3">Detailing Month-by-month sprint directions, KPI targets, and budget channel mapping rules.</td>
                    <td className="p-3">Days 4 - 5</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Recorded Workshop Notes</td>
                    <td className="p-3">Complete dynamic records, summarized transcripts, and checklists stored in Notion/Drive.</td>
                    <td className="p-3">After Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#f5f2ff] rounded-xl p-5 border border-purple-100 space-y-2">
            <h4 className="font-semibold text-xs text-[#9333ea] uppercase tracking-wide font-mono flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#7c3aed]" />
              Client Capture Funnel Flow
            </h4>
            <ol className="list-decimal pl-5 text-slate-800 text-xs space-y-1 leading-relaxed">
              <li>Deploy high-quality organic insights on LinkedIn / Meta platform feeds.</li>
              <li>Initiate conversations in comments or direct messages to understand specific client bottlenecks.</li>
              <li>Schedule 30-minute introductory discovery Zoom rings to screen context fit.</li>
              <li>Submit invoice (<strong>BDT 15,000</strong>) to lock initial workbook access.</li>
            </ol>
          </div>
        </div>
      );

    case 'session1':
      return (
        <div className="space-y-6" id="chapter-session1">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">2. Session 1: Discovery Guidelines</h2>
            <p className="text-slate-500 text-xs">Structured agendas, diagnostic matrices, and full customer discovery questions.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider font-mono">Session 1 Outline (Time Allocations)</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:00 - 0:10 (10 Min)</span>
                <span className="font-semibold text-slate-800">Welcome, sync expectation rules, set launch goals.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:10 - 0:40 (30 Min)</span>
                <span className="font-semibold text-slate-800">Business Model discovery questionnaire deep-dive.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:40 - 0:65 (25 Min)</span>
                <span className="font-semibold text-slate-800">Live Asset Assessment (Reviews of profile look, web logs, pixel signals).</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>0:65 - 0:80 (15 Min)</span>
                <span className="font-semibold text-slate-800">Summarize audit scores, dispatch Month 1 foundations.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">Essential Discovery Question Bank</h3>
            
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-white border border-slate-100 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-slate-800">Division A: Brand & Core Identity Foundations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>"Tell me about your business — what do you do, who do you serve, and how long have you been operating?"</li>
                  <li>"What is the single most critical customer problem your product directly resolves?"</li>
                  <li>"If your launch brand was represented by a persona, which traits describe their voice adjectives?"</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-100 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-slate-800">Division B: Current Digital Infrastructure Metrics</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>"Walk me through every active platform currently receiving content."</li>
                  <li>"Have you deployed paid budget before? What platforms, parameters, and conversion outcomes resulted?"</li>
                  <li>"What has been your primary bottleneck locking user conversion?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 'session2':
      return (
        <div className="space-y-6" id="chapter-session2">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">3. Session 2: Competitor Gaps & Positioning</h2>
            <p className="text-slate-500 text-xs">Exposing competitive structures, pricing margins, and custom formula maps.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider font-mono">Session 2 Outline (Time Allocations)</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:00 - 0:05 (5 Min)</span>
                <span className="font-semibold text-slate-800 font-sans">Recap Session 1 core insights and scorecard gaps.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:05 - 0:25 (20 Min)</span>
                <span className="font-semibold text-slate-800 font-sans">MIC presents pre-built competitor research overview.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:25 - 0:45 (20 Min)</span>
                <span className="font-semibold text-slate-800 font-sans">Interactive positioning builder workshop and promise mapping.</span>
              </li>
              <li className="flex justify-between">
                <span>0:45 - 0:60 (15 Min)</span>
                <span className="font-semibold text-slate-800 font-sans">Validate custom statement formula and pre-structure Month 1 timeline.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">Competitive Position Pointers</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              During the session, rate each competitor across four distinct categories. Look for gaps in trust and discoverability:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white border border-slate-100 rounded-lg p-4 space-y-1.5">
                <h4 className="font-bold text-slate-800">Content Gaps</h4>
                <p className="text-slate-500">Are competitors utilizing generic, duplicate image assets? Highlight opportunity to claim premium unique authority.</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-4 space-y-1.5">
                <h4 className="font-bold text-slate-800">Trust Friction Gaps</h4>
                <p className="text-slate-500">Do competitors display raw text metrics but no certified video case-studies? Build your promise around verified benchmarks.</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'session3':
      return (
        <div className="space-y-6" id="chapter-session3">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">4. Session 3: 90-Day Roadmap presentation</h2>
            <p className="text-slate-500 text-xs">Sprint milestones, KPI allocations, and immediate quick-win frameworks.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider font-mono">Session 3 Outline (Time Allocations)</h3>
            <ul className="space-y-2 text-xs text-[#1E2D3D]">
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:00 - 0:05 (5 Min)</span>
                <span className="font-semibold text-slate-800">Open Session 3 and establish launch sprint expectations.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:05 - 0:30 (25 Min)</span>
                <span className="font-semibold text-slate-800">Coach walks through custom Month 1, Month 2, Month 3 actions.</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span>0:30 - 0:45 (15 Min)</span>
                <span className="font-semibold text-slate-800">Q&A and priority alignment (adjusting channel scopes dynamically).</span>
              </li>
              <li className="flex justify-between">
                <span>0:45 - 0:60 (15 Min)</span>
                <span className="font-semibold text-slate-800">Select top 3 actions, request testimonial, pre-book Day 14 ring.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">The 90-Day Step Pillars</h3>
            <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
              <div className="bg-white border border-slate-100 p-4 rounded-lg">
                <h4 className="font-bold text-rose-800 uppercase tracking-wider text-[10px] font-mono mb-1">Month 1: Foundations & Quick Wins</h4>
                <p>Eliminate profile inconsistencies. Establish content calendars balanced between Educate and Convert categories. Set lead capture CTA nodes on landing pages.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-lg">
                <h4 className="font-bold text-amber-800 uppercase tracking-wider text-[10px] font-mono mb-1">Month 2: Conversion Scaling Loops</h4>
                <p>Onboard Meta paid budget. Launch micro lead campaigns to capture list contacts, and test different graphic creatives to drop CPC cost structures.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 uppercase tracking-wider text-[10px] font-mono mb-1">Month 3: Automated Retargeting</h4>
                <p>Deploy pixel retargeting to profile observers. Introduce standard client affinity programs, and prepare retainer continuation proposals.</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'growth':
      return (
        <div className="space-y-6" id="chapter-growth">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">5. Growth & Marketing Guidelines</h2>
            <p className="text-slate-500 text-xs">Pillar ratios, Meta ad specifications, and local benchmark indicators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200/80 p-5 rounded-xl space-y-3 shadow-xs">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">Recommended Content Ratios</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Educate Pillar:</span>
                  <span>35% (Pains & Hacks)</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Inspire Pillar:</span>
                  <span>25% (Founder stories & Case-studies)</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Entertain Pillar:</span>
                  <span>25% (Memes & Relatable pointers)</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-800">Convert Pillar:</span>
                  <span>15% (Offers, Lead magnets, CTAs)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-xl space-y-3 shadow-xs">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">Meta Ad Benchmarks (Bangladesh)</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Click-Through Rate (CTR):</span>
                  <span>1.5% - 2.5% Target</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Cost-Per-Click (CPC):</span>
                  <span>BDT 6 - 10 Good</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-800">Cost-Per-Lead (CPL):</span>
                  <span>BDT 50 - 100 Normal</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-800">Landing Page CVR:</span>
                  <span>3% - 5% Average</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-5 space-y-2 text-xs text-slate-800 leading-relaxed">
            <h4 className="font-bold text-[#9333ea] uppercase tracking-wider text-[10px] font-mono">Paid Scaling Rules (Important)</h4>
            <p>
              Always initiate ad campaigns with broad targeting (Age, primary regional areas like Dhaka, Chittagong). Let Meta’s pixel identify candidates with the highest conversion action probability. Scale ad budgets exclusively by 20% every 3 days to avoid resetting the learning loop.
            </p>
          </div>
        </div>
      );

    case 'followup':
      return (
        <div className="space-y-6" id="chapter-followup">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">6. Day 14 Follow-Up & Retainers</h2>
            <p className="text-slate-500 text-xs">A agendas, feedback loops, check-up questions, and exact templates.</p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 space-y-3 text-xs">
            <h3 className="font-bold text-amber-900 uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Follow-Up Mission Guidelines
            </h3>
            <p className="text-slate-800 leading-relaxed">
              The Day 14 follow-up call is a pre-scheduled <strong>30-minute</strong> check-in to clear bottlenecks and secure potential retainers. This call is included in the base package. Any additional consultancy requests must run on new packages.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">Scripts for Success</h3>

            <div className="space-y-4 text-xs">
              <div className="bg-white border border-slate-100 p-4 rounded-lg space-y-2">
                <h4 className="font-bold text-[#7c3aed]">1. Testimonial Proposal Script</h4>
                <p className="text-slate-600 italic leading-relaxed">
                  "I'm so glad this roadmap has unlocked clarity. We'd love to showcase your experience to encourage alternative business leaders. Would you be open to filming a 60-second clip or sending over a 3-sentence quote?"
                </p>
              </div>

              <div className="bg-white border border-slate-100 p-4 rounded-lg space-y-2">
                <h4 className="font-bold text-[#7c3aed]">2. Client Affinity Referral Incentive</h4>
                <p className="text-slate-600 italic leading-relaxed">
                  "Is there any partner founder in your network currently struggling with conversion friction? If you introduce them to MIC and they lock our consultancy, we will credit BDT 2,000 to your subsequent service engagement."
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className="space-y-6" id="chapter-dashboard">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-display font-medium text-slate-900 mb-1">7. Quality Auditing & Retainers</h2>
            <p className="text-slate-500 text-xs">Operational QA checkboards, client KPIs, and subsequent proposal packages.</p>
          </div>

          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm">MIC Quality Benchmarks (Consultant KPIs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="space-y-1 bg-slate-50 p-3 rounded">
                <span className="font-mono text-[10px] text-slate-400 block uppercase">Metric Target</span>
                <span className="font-bold text-slate-800 block">NPS Score: 8 / 10+</span>
                <p className="text-slate-500 select-none">Calculated via anonymous client surveys sent post-hand-off.</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded">
                <span className="font-mono text-[10px] text-slate-400 block uppercase">Consistency Target</span>
                <span className="font-bold text-slate-800 block font-sans">Delivered by Day 7</span>
                <p className="text-slate-500 select-none">Word reports and assets must be completely locked within 168 hours.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="font-semibold text-slate-900 text-sm">Further Engagement Upgrades</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#0d1c3a] text-white font-mono">
                  <tr>
                    <th className="p-3">Consultancy Tier</th>
                    <th className="p-3">Deliverable Scope</th>
                    <th className="p-3">Value Pricing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 bg-white">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">One-Time Brand Launch</td>
                    <td className="p-3">Audit, Competitors mapping, 90-day custom roadmap.</td>
                    <td className="p-3 font-bold text-[#7c3aed]">BDT 15,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Sales Kickstarter Sprint</td>
                    <td className="p-3">High-converting single sales page + custom ad accounts setup.</td>
                    <td className="p-3 font-bold text-[#7c3aed]">BDT 10,000 / Mo</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Consultancy Retainer</td>
                    <td className="p-3">Ongoing weekly monitoring, bi-weekly audits, ad tracking updates.</td>
                    <td className="p-3 font-bold text-[#7c3aed]">BDT 30,000 / Mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
