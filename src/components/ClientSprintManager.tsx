/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClientAccount, PlaybookState } from '../types';
import { jsPDF } from 'jspdf';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  Clock, 
  XOctagon, 
  ChevronRight, 
  Trash2, 
  FileText, 
  Calendar, 
  MapPin, 
  Activity, 
  Award,
  Sparkles,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

interface Props {
  clients: ClientAccount[];
  activeClientId: string;
  onSelectClient: (id: string) => void;
  onAddClient: (name: string, person: string, email: string, status: 'running' | 'starting soon' | 'ended') => void;
  onUpdateClientStatus: (id: string, status: 'running' | 'starting soon' | 'ended') => void;
  onDeleteClient: (id: string) => void;
  activePlaybookState: PlaybookState;
}

export default function ClientSprintManager({
  clients,
  activeClientId,
  onSelectClient,
  onAddClient,
  onUpdateClientStatus,
  onDeleteClient,
  activePlaybookState
}: Props) {
  
  // Real-time remote application states
  const [incomingApps, setIncomingApps] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'applications'), (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIncomingApps(apps);
    }, (error) => {
      console.error("Error monitoring applications collection in Admin panel:", error);
    });
    return () => unsub();
  }, []);

  const handleApproveApp = async (app: any) => {
    try {
      onAddClient(app.companyName, app.contactPerson, app.email, 'running');
      const docRef = doc(db, 'applications', app.id);
      await updateDoc(docRef, { status: 'approved' });
      setSuccessMessage(`Approved and onboarded ${app.companyName} workspace successfully.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error approving intake application:", err);
    }
  };

  const handleRejectApp = async (appId: string) => {
    try {
      const docRef = doc(db, 'applications', appId);
      await updateDoc(docRef, { status: 'rejected' });
    } catch (err) {
      console.error("Error rejecting intake application:", err);
    }
  };

  const handleDismissApp = async (appId: string) => {
    try {
      const docRef = doc(db, 'applications', appId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error dismissing intake application:", err);
    }
  };

  // Local state for add client form
  const [newClientName, setNewClientName] = useState('');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'running' | 'starting soon' | 'ended'>('starting soon');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    
    onAddClient(
      newClientName,
      newContactPerson || 'N/A',
      newEmail || 'N/A',
      newStatus
    );

    setNewClientName('');
    setNewContactPerson('');
    setNewEmail('');
    setNewStatus('starting soon');
    setShowAddForm(false);

    setSuccessMessage('Client account added successfully. Selected as active workspace.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Automated premium client-side PDF Generator using jsPDF
  const generateSprintPDF = (client: ClientAccount) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pb = client.playbookState;
    const clName = pb.brandClarity.companyName || client.clientName;
    const email = client.email || 'N/A';
    const contact = client.contactPerson || 'N/A';

    // Page 1: Hero & Setup Overview
    // Header banner colors
    doc.setFillColor(13, 28, 58); // #0d1c3a
    doc.rect(0, 0, 210, 42, 'F');

    // Title text inside banner
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('MIC BRAND SPRINT DISCOVERY', 14, 18);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Marketing & Innovation Collective | Client Strategic Report Block', 14, 25);
    doc.setFont('Courier', 'bold');
    doc.setFontSize(9);
    doc.text('AUTHORIZED INSTANCE // CONFIDENTIAL', 14, 32);

    // Side decor accents
    doc.setFillColor(124, 58, 237); // #7c3aed
    doc.rect(0, 39, 210, 3, 'F');

    // Client Specifications Metadata Table
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('1. CLIENT PROJECT CREDENTIALS', 14, 55);
    
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.4);
    doc.line(14, 57, 196, 57);

    // Meta details layout grid
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Company Brand Name:', 14, 65);
    doc.setFont('Helvetica', 'bold');
    doc.text(String(clName), 65, 65);

    doc.setFont('Helvetica', 'normal');
    doc.text('Representative Person:', 14, 71);
    doc.setFont('Helvetica', 'bold');
    doc.text(String(contact), 65, 71);

    doc.setFont('Helvetica', 'normal');
    doc.text('Registered Email:', 14, 77);
    doc.setFont('Helvetica', 'bold');
    doc.text(String(email), 65, 77);

    doc.setFont('Helvetica', 'normal');
    doc.text('Ad campaigns Budget (Monthly):', 14, 83);
    doc.setFont('Helvetica', 'bold');
    doc.text(String(pb.brandClarity.monthlyAdBudget || 'Unspecified'), 65, 83);

    doc.setFont('Helvetica', 'normal');
    doc.text('Sprint Delivery Status:', 14, 89);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(147, 51, 234); // purple
    doc.text(client.status.toUpperCase(), 65, 89);

    doc.setTextColor(15, 23, 42);
    // USP statement box
    doc.setFillColor(245, 242, 255); // light purple back
    doc.rect(14, 98, 182, 32, 'F');
    doc.setDrawColor(216, 180, 254); // purple-300
    doc.rect(14, 98, 182, 32, 'S');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('COAXIAL USP FORMULA STATEMENT:', 18, 104);
    
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(9);
    const statement = `For ${pb.brandClarity.targetAudience || 'Target Audience'} who struggle with ${pb.brandClarity.coreProblem || 'Core Problem'}, ${clName} is the premium ${pb.brandClarity.productService || 'Category'} that delivers ${pb.brandClarity.brandPromise || 'Brand Promise'}.`;
    const splitStatement = doc.splitTextToSize(statement, 172);
    doc.text(splitStatement, 18, 110);

    // 2. Scorecard visual details
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('2. BRAND AUDIT SCORECARD ANALYTICS', 14, 142);
    doc.line(14, 144, 196, 144);

    // visual progress bars for scorecard metrics
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    let startY = 152;
    pb.scorecard.forEach((m) => {
      if (startY > 280) return; // guard bound
      
      doc.setFont('Helvetica', 'bold');
      doc.text(m.label, 14, startY);
      
      // Draw light background bar
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(75, startY - 3, 80, 4, 'F');
      
      // Draw filled score bar
      doc.setFillColor(124, 58, 237); // purple-600
      const width = (m.score / 5) * 80;
      doc.rect(75, startY - 3, width, 4, 'F');

      // Draw score text
      doc.setFont('Helvetica', 'bold');
      doc.text(`${m.score}/5.0`, 160, startY);

      // Render notes
      if (m.notes) {
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139); // slate-500
        const notesTrunc = m.notes.length > 55 ? m.notes.substring(0, 52) + '...' : m.notes;
        doc.text(`Notes: ${notesTrunc}`, 75, startY + 3.5);
        doc.setTextColor(15, 23, 42);
        startY += 11;
      } else {
        startY += 8;
      }
    });

    // Page 2: Priorities & Progress Tracks
    doc.addPage();
    
    // Mini-header for Page 2
    doc.setFillColor(13, 28, 58); // #0d1c3a
    doc.rect(0, 0, 210, 15, 'F');
    doc.setFillColor(124, 58, 237);
    doc.rect(0, 15, 210, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`MIC REPORT // ${clName.toUpperCase()}`, 14, 10);

    // Priority milestones table
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.text('3. CRITICAL IMPLEMENTATION CHECKLISTS', 14, 28);
    doc.line(14, 30, 196, 30);

    // List out tasks
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    let taskY = 38;
    pb.tasks.forEach((t) => {
      if (taskY > 120) return;
      doc.setFont('Helvetica', 'bold');
      doc.text(`[${t.clientPriority}]  ${t.title}`, 14, taskY);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const splitRec = doc.splitTextToSize(`Recommendation: ${t.recommendation}`, 175);
      doc.text(splitRec, 20, taskY + 4);
      doc.setTextColor(15, 23, 42);
      taskY += 12;
    });

    // Weekly progress rows
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('4. SPRINT ACTIVITY & IMPLEMENTATION LOGS', 14, taskY + 8);
    const tableLineY = taskY + 10;
    doc.line(14, tableLineY, 196, tableLineY);

    let progressY = tableLineY + 8;
    pb.weeklyProgress.forEach((w) => {
      if (progressY > 230) return;
      doc.setFont('Helvetica', 'bold');
      doc.text(w.weekName, 14, progressY);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('Wins:', 35, progressY);
      doc.text(w.wins || 'No records', 52, progressY);

      doc.text('Focus:', 35, progressY + 4);
      doc.text(w.focus || 'No records', 52, progressY + 4);

      doc.text('Challenges:', 35, progressY + 8);
      doc.text(w.challenges || 'No records', 52, progressY + 8);

      doc.setDrawColor(241, 245, 249);
      doc.line(14, progressY + 10, 196, progressY + 10);
      progressY += 13;
    });

    // Authorizing Box Footer (Official Signature box)
    const signBoxY = 238;
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, signBoxY, 182, 38, 'S');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OFFICIAL VERIFICATION STANDARDS', 18, signBoxY + 6);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('This is to certify that this brand launch coaching sprint is ended with full qualitative compliance. All priorities were analyzed and assigned directly matching target audience conversion criteria under supervisor guidelines.', 18, signBoxY + 11, { maxWidth: 172 });

    // Signature stamp lines
    doc.setDrawColor(124, 58, 237);
    doc.line(140, signBoxY + 30, 185, signBoxY + 30);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(13, 28, 58);
    doc.text('Muzahidul Islam', 140, signBoxY + 33);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Lead Strategy Consultant, MIC', 140, signBoxY + 36);

    // Save and download PDF file
    const safeName = (clName || 'Client').replace(/\s+/g, '_');
    doc.save(`MIC_Sprint_Report_${safeName}.pdf`);
  };

  return (
    <div className="space-y-8" id="client-sprint-dashboard-root">
      
      {/* Upper header */}
      <div className="bg-[#0b1329] text-white rounded-xl p-6 border-b-4 border-[#7c3aed] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Users className="w-3.5 h-3.5" />
            CONSULTANT WORKSPACE PORTAL
          </div>
          <h2 className="text-2xl font-display font-medium">Coaching Client Accounts Manager</h2>
          <p className="text-slate-300 text-xs">Maintain independent historical worksheets, audit scorecard ratings, and switch between active brand workspace accounts seamlessly.</p>
        </div>
        
        <button
          id="btn-toggle-add-client"
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#7c3aed] hover:bg-purple-700 transition-colors text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          {showAddForm ? 'Close Intake Form' : 'Register New Client'}
        </button>
      </div>

      {/* Success Notification popups */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 text-xs font-semibold flex items-center gap-2.5 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Add Client Interactive form drawer */}
      {showAddForm && (
        <div className="bg-white rounded-xl border-2 border-[#7c3aed]/20 p-6 shadow-sm max-w-3xl">
          <h3 className="font-bold text-[#0d1c3a] text-xs uppercase tracking-wider font-mono border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#7c3aed]" />
            New Client Intake & Onboarding Configuration
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Company/Brand Name *</label>
              <input
                id="intake-client-name"
                required
                type="text"
                value={newClientName}
                onChange={e => setNewClientName(e.target.value)}
                placeholder="e.g. Aura Dhaka Cosmetics"
                className="w-full text-xs border border-slate-200 bg-slate-50/50 rounded-lg p-2.5 focus:outline-none focus:border-[#7c3aed]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Contact Person Name</label>
              <input
                id="intake-contact-person"
                type="text"
                value={newContactPerson}
                onChange={e => setNewContactPerson(e.target.value)}
                placeholder="e.g. Arif Rahman"
                className="w-full text-xs border border-slate-200 bg-slate-50/50 rounded-lg p-2.5 focus:outline-none focus:border-[#7c3aed]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
              <input
                id="intake-email"
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="e.g. client@auradhaka.com"
                className="w-full text-xs border border-slate-200 bg-slate-50/50 rounded-lg p-2.5 focus:outline-none focus:border-[#7c3aed]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Initial Project Status</label>
              <select
                id="intake-status"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full text-xs border border-slate-200 bg-slate-50/50 rounded-lg p-2.5 focus:outline-none focus:border-[#7c3aed]"
              >
                <option value="starting soon">Starting Soon (Onboarding Setup)</option>
                <option value="running">Running (Active Coaching Sprints)</option>
                <option value="ended">Ended (Completed & Certified)</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 font-semibold text-xs py-2 px-4 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-register-submit"
                type="submit"
                className="bg-[#7c3aed] hover:bg-purple-700 transition-colors text-white font-bold text-xs py-2 px-6 rounded-lg cursor-pointer"
              >
                Register & Bind Workspace
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 🚀 INBOUND APPLICATIONS SYSTEM (REAL-TIME FIRESTORE) */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border-l-4 border-[#7c3aed] space-y-4 shadow-sm" id="inbound-applications-panel">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-purple-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse text-[#7c3aed]" />
              Inbound Google Auth Application Requests (Firestore Live)
            </h3>
            <p className="text-slate-400 text-xs mt-1">Review live intake forms submitted by users on the landing page, approve them into active premium strategic sidetracks, or dismiss outdated leads.</p>
          </div>
          <span className="bg-slate-800 text-slate-350 font-mono text-xs px-2.5 py-1.5 rounded border border-slate-700 font-bold shrink-0">
            {incomingApps.length} Application{incomingApps.length === 1 ? '' : 's'} Live
          </span>
        </div>

        {incomingApps.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg bg-slate-950/40 text-slate-500 text-xs font-mono">
            No live strategy session requests lodged in Firestore database. Share the lander Link for prospects to sign in.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomingApps.map((app) => (
              <div 
                key={app.id} 
                className={`bg-slate-950 border rounded-xl p-4 flex flex-col justify-between gap-4 text-xs ${
                  app.status === 'pending' 
                    ? 'border-purple-950 hover:border-purple-900 bg-slate-950/80' 
                    : app.status === 'approved' 
                    ? 'border-emerald-950/80 bg-emerald-950/20' 
                    : 'border-slate-800 opacity-60 bg-slate-950/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-2">
                    <span className="text-[9px] font-mono text-slate-500 truncate max-w-[130px]" title={app.userEmail}>
                      {app.userEmail}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                      app.status === 'pending' 
                        ? 'bg-amber-950/80 text-amber-500 border border-amber-900/40 animate-pulse' 
                        : app.status === 'approved' 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/40' 
                        : 'bg-rose-950/80 text-rose-450 border border-rose-900/40'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{app.companyName}</h4>
                    <p className="text-slate-300 font-medium">Contact: {app.contactPerson}</p>
                    <p className="text-slate-400">Email: {app.email}</p>
                    {app.growthGaps && (
                      <p className="text-slate-400 italic bg-white/[0.01] border border-slate-900 p-2 rounded mt-1.5 text-[10px] leading-relaxed max-h-20 overflow-y-auto font-sans">
                        "{app.growthGaps}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-900">
                  {app.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveApp(app)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Approve & Bind Workspace
                      </button>
                      <button
                        onClick={() => handleRejectApp(app.id)}
                        className="bg-[#111] hover:bg-rose-950/50 hover:text-rose-400 border border-slate-800 text-slate-400 font-bold text-[10px] py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
                        title="Reject application"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleDismissApp(app.id)}
                      className="w-full bg-[#111] hover:bg-rose-950/80 border border-slate-800 text-slate-400 hover:text-rose-450 font-bold text-[10px] py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete Log
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Existing Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="client-cards-grid">
        {clients.map((client) => {
          const isActive = client.id === activeClientId;
          const pb = isActive ? activePlaybookState : client.playbookState;
          
          // Calculate scoreverages
          const scoresSum = pb.scorecard.reduce((acc, m) => acc + m.score, 0);
          const scoresAvg = (scoresSum / pb.scorecard.length).toFixed(1);

          return (
            <div 
              key={client.id}
              className={`rounded-2xl border bg-white p-5 shadow-xxs flex flex-col justify-between gap-5 relative transition-all ${
                isActive 
                  ? 'border-2 border-[#7c3aed] bg-[#f5f2ff]/10 ring-4 ring-purple-500/5' 
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Title, Status bubble, switch indicators */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Client ID: {client.id.substring(4, 9)}</span>
                    <h3 className="font-bold text-[#0d1c3a] text-sm leading-tight">
                      {pb.brandClarity.companyName || client.clientName}
                    </h3>
                  </div>
                  
                  {/* Color coded status bubbles */}
                  {client.status === 'running' && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  )}
                  {client.status === 'starting soon' && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full border border-amber-100 uppercase">
                      <Clock className="w-2.5 h-2.5 text-amber-500" />
                      Starting Soon
                    </span>
                  )}
                  {client.status === 'ended' && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-indigo-50 text-[#7c3aed] px-2.5 py-1 rounded-full border border-[#7c3aed]/10 uppercase">
                      <CheckCircle className="w-2.5 h-2.5 text-purple-600" />
                      Ended
                    </span>
                  )}
                </div>

                {/* Subdetails Info list */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Representative:</span>
                    <span className="font-medium text-slate-800">{client.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email Contact:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[120px]">{client.email}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-slate-400">Average Metrics:</span>
                    <span className="font-bold text-slate-900">{scoresAvg} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Lower Section Action keys */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                
                {/* Switch Workspace */}
                {!isActive ? (
                  <button
                    type="button"
                    onClick={() => onSelectClient(client.id)}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-colors text-slate-600 font-semibold text-xs py-2 px-3 rounded-lg cursor-pointer"
                  >
                    <span>Activate Worksheet Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full text-center bg-[#f5f2ff] text-purple-700 font-mono text-[9px] font-bold py-1 px-2.5 rounded border border-purple-100 uppercase">
                    ★ Selected Active Core System Workspace
                  </div>
                )}

                {/* Switch status checklist */}
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-mono">Status Actions:</span>
                    <select
                      value={client.status}
                      onChange={(e) => onUpdateClientStatus(client.id, e.target.value as any)}
                      className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-1 focus:outline-none"
                    >
                      <option value="starting soon">Starting Soon</option>
                      <option value="running">Running</option>
                      <option value="ended">Ended</option>
                    </select>
                  </div>

                  {/* Complete & download button */}
                  <button
                    id={`btn-pdf-${client.id}`}
                    type="button"
                    onClick={() => generateSprintPDF(client)}
                    className="inline-flex items-center gap-1 bg-[#0d1c3a] hover:bg-[#1f2b48] transition-colors text-white font-bold text-[10px] py-1.5 px-3 rounded-lg cursor-pointer"
                    title="Download fully compile end-of-sprint certified report"
                  >
                    <FileText className="w-3 h-3 text-purple-400" />
                    PDF Report
                  </button>
                </div>

                {/* Audit Change History logs list */}
                {client.historyLog && client.historyLog.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-2.5 text-[9px] font-mono text-slate-500 space-y-1 border border-slate-100 max-h-24 overflow-y-auto">
                    <span className="font-bold text-[8px] text-slate-400 uppercase tracking-wider block">Workspace History Track:</span>
                    {client.historyLog.map((log, lidx) => (
                      <div key={lidx} className="flex gap-1.5">
                        <span className="text-purple-600">›</span>
                        <span className="leading-tight">{log}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Trash delete handler */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => onDeleteClient(client.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 text-[10px]"
                    title="Remove client account permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Account
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Card instructions for PDF and Sprints */}
      <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-5 flex flex-col md:flex-row items-start gap-4 shadow-xxs">
        <div className="p-3 bg-purple-600 rounded-lg text-white shrink-0">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-purple-950 text-xs">How Multi-Client history worksheets operate:</h4>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            By switching the chosen active client, the central worksheets, discovery checklists, competitors matrices, and AI consult insights auto-bind to that specific client project context. This isolates responses securely. Click <strong>"PDF Report"</strong> at any step to render clean graphics, metric visual bars, and formal consultant signature certified documents ready to share.
          </p>
        </div>
      </div>

    </div>
  );
}
