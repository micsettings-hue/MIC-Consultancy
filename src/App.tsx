/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlaybookState, ClientAccount } from './types';
import { 
  INITIAL_STATE,
  loadClients,
  saveClients,
  loadActiveClientId,
  saveActiveClientId 
} from './utils';
import PlaybookReader from './components/PlaybookReader';
import PlaybookPages from './components/PlaybookPages';
import BrandClarityCanvas from './components/BrandClarityCanvas';
import CompetitorPositioning from './components/CompetitorPositioning';
import PriorityStack from './components/PriorityStack';
import ProgressTracker from './components/ProgressTracker';
import AiStrategicAdvisor from './components/AiStrategicAdvisor';
import WorkspaceLoginGate from './components/WorkspaceLoginGate';
import ClientSprintManager from './components/ClientSprintManager';
import DiagnosticWorkspace from './components/DiagnosticWorkspace';
import { exportPlaybookToDocx } from './DocxExport';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { auth, signInWithGoogle, logOut } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

import micLogo from './assets/images/mic_logo_1779285135896.png';
import leadConsultantPortrait from './assets/images/lead_consultant_portrait_1779285156941.png';

import { 
  Award, 
  BookOpen, 
  Sparkles, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  Database,
  Grid,
  Zap,
  Globe,
  Users,
  ExternalLink,
  LogOut
} from 'lucide-react';

export default function App() {
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [activeClientId, setActiveClientId] = useState<string>('');
  const [state, setState] = useState<PlaybookState>(INITIAL_STATE);

  // Authentication & Platform Access Roles State
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  const isAdmin = user !== null && user.email === 'mic.settings@gmail.com';
  
  // URL Routing state
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [activeTab, setActiveTab] = useState<'clients' | 'playbook' | 'ai_advisor' | 'trackers'>('clients');
  const [activeChapter, setActiveChapter] = useState<string>('overview');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Saved to LocalStorage');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sync URL changes with active tab matching
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    if (currentPath.toLowerCase().includes('trackers')) {
      setActiveTab('trackers');
    } else if (currentPath.toLowerCase().includes('advisor') || currentPath.toLowerCase().includes('ai')) {
      setActiveTab('ai_advisor');
    } else if (currentPath.toLowerCase().includes('workshops') || currentPath.toLowerCase().includes('guidelines') || currentPath.toLowerCase().includes('pages')) {
      setActiveTab('playbook');
    } else {
      setActiveTab('clients');
    }
  }, [currentPath]);

  // On Mount: Load saved client list and set active client
  useEffect(() => {
    const loadedClients = loadClients();
    setClients(loadedClients);

    const actId = loadActiveClientId(loadedClients);
    setActiveClientId(actId);

    const activeClient = loadedClients.find(c => c.id === actId);
    if (activeClient) {
      setState(activeClient.playbookState);
    }
  }, []);

  // Sync state modifications within the active active client account
  const handleStateChange = (updatedState: PlaybookState) => {
    setState(updatedState);
    
    // Quick flash save indicator
    setSaveStatus('Saving changes...');

    const updatedClients = clients.map(c => {
      if (c.id === activeClientId) {
        return {
          ...c,
          playbookState: updatedState
        };
      }
      return c;
    });

    setClients(updatedClients);
    saveClients(updatedClients);
    
    setTimeout(() => {
      setSaveStatus('Saved locally');
    }, 600);
  };

  const handleSelectClient = (id: string) => {
    setActiveClientId(id);
    saveActiveClientId(id);
    const selected = clients.find(c => c.id === id);
    if (selected) {
      setState(selected.playbookState);
    }
  };

  const handleAddClient = (name: string, person: string, email: string, status: 'running' | 'starting soon' | 'ended') => {
    const newClient: ClientAccount = {
      id: 'cli_' + Math.random().toString(36).substring(2, 9),
      clientName: name,
      contactPerson: person || 'N/A',
      email: email || 'N/A',
      status: status,
      createdAt: new Date().toISOString(),
      playbookState: {
        ...INITIAL_STATE,
        brandClarity: {
          ...INITIAL_STATE.brandClarity,
          companyName: name
        }
      },
      historyLog: [`Registered brand account for ${name}`]
    };

    const updatedClients = [newClient, ...clients];
    setClients(updatedClients);
    saveClients(updatedClients);
    
    setActiveClientId(newClient.id);
    saveActiveClientId(newClient.id);
    setState(newClient.playbookState);
  };

  const handleUpdateClientStatus = (id: string, status: 'running' | 'starting soon' | 'ended') => {
    const updatedClients = clients.map(c => {
      if (c.id === id) {
        const logs = [...(c.historyLog || [])];
        logs.push(`Changed status to: ${status}`);
        return {
          ...c,
          status,
          historyLog: logs.slice(-8)
        };
      }
      return c;
    });
    setClients(updatedClients);
    saveClients(updatedClients);
  };

  const handleDeleteClient = (id: string) => {
    if (clients.length <= 1) {
      alert("Cannot delete the only client account. Please add another one first.");
      return;
    }
    const filtered = clients.filter(c => c.id !== id);
    setClients(filtered);
    saveClients(filtered);

    if (id === activeClientId) {
      const fallbackId = filtered[0].id;
      setActiveClientId(fallbackId);
      saveActiveClientId(fallbackId);
      setState(filtered[0].playbookState);
    }
  };

  // Reset current active client's playbook data to standard default template values
  const handleResetData = () => {
    const updatedState = {
      ...INITIAL_STATE,
      brandClarity: {
        ...INITIAL_STATE.brandClarity,
        companyName: state.brandClarity.companyName || 'My Client Brand'
      }
    };
    handleStateChange(updatedState);
    setShowResetConfirm(false);
    setSaveStatus('Reset Completed.');
  };

  // Compile and download document browser-side
  const handleDownloadDocx = async () => {
    setIsExporting(true);
    try {
      const blob = await exportPlaybookToDocx(state);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const formattedName = (state.brandClarity.companyName || "Client").replace(/\s+/g, '_');
      link.download = `MIC_Brand_Launch_Playbook_${formattedName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Docx export failed:', e);
      alert('An issue occurred while exporting Word doc. Please review details.');
    } finally {
      setIsExporting(false);
    }
  };

  // Global Authentication Loading Screen
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 font-mono text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        <div className="tracking-widest uppercase text-purple-400 font-extrabold animate-pulse">Establishing Google Auth Handshake...</div>
      </div>
    );
  }

  // 1. GUEST ACCESS LEVEL BLOCKER (If not admin, present the clean login gate immediately)
  if (!isAdmin) {
    return (
      <WorkspaceLoginGate 
        user={user}
        onLogin={signInWithGoogle}
        onLogout={logOut}
      />
    );
  }

  // 2. PLAYBOOK WORKSPACE LAYOUT
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none" id="app-workspace-root">
      
      {/* Upper Navigation Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-5 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xxs">
        
        {/* Brand visual badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center bg-white shrink-0">
            <img src={micLogo} alt="MIC Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 leading-none flex items-center gap-1.5 flex-wrap">
              Marketing & Innovation Collective
              <span className="text-[10px] font-mono text-[#9333ea] bg-[#f5f2ff] px-1.5 py-0.5 rounded border border-purple-100 font-bold uppercase tracking-wider">Playbook Suite</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-1">1:1 One-Time Brand Launch Strategy Workspace</p>
          </div>
        </div>

        {/* Global Action Handlers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* File Storage status tracker */}
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 py-1.5 px-2.5 rounded-md border border-slate-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {saveStatus}
          </span>

          {/* Reset Action */}
          <div className="relative">
            {showResetConfirm ? (
              <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg p-3 shadow-lg z-50 text-xs text-slate-700 space-y-2 w-48">
                <p className="font-semibold text-slate-900">Confirm Reset?</p>
                <p className="text-[10px] text-slate-400">Restores default metrics for this client.</p>
                <div className="flex justify-end gap-1.5">
                  <button 
                    id="btn-confirm-cancel"
                    type="button" 
                    className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded cursor-pointer" 
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    id="btn-confirm-reset"
                    type="button" 
                    className="bg-rose-500 hover:bg-rose-600 text-white px-2 py-1 rounded cursor-pointer" 
                    onClick={handleResetData}
                  >
                    Wipe
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="btn-request-reset"
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="Wipe custom inputs and restore original playbook template values for this current partner"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Client Playbook
              </button>
            )}
          </div>

          {/* DOCX Export Action */}
          <button
            id="btn-download-playbook"
            type="button"
            disabled={isExporting}
            onClick={handleDownloadDocx}
            className="inline-flex items-center gap-1.5 bg-[#7c3aed] hover:bg-purple-700 disabled:bg-purple-300 transition-colors text-white font-semibold text-xs py-1.5 px-3.5 rounded-lg shadow-sm font-sans cursor-pointer"
            data-tooltip-id="app-tooltip"
            data-tooltip-content="Generate and download your complete MIC launch playbook file as a styled, professional Word Docx"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? 'Exporting Word doc...' : 'Download Word playbook'}
          </button>

          {/* Admin User Badge & Exit Options */}
          {user && (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-2.5">
              <button
                type="button"
                onClick={logOut}
                className="hover:bg-rose-50 text-slate-400 hover:text-rose-650 p-2 rounded-lg transition-colors cursor-pointer text-xs"
                title="Sign Out Admin Client"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Mode Selectors */}
      <div className="bg-white border-b border-slate-200 px-5 md:px-8 py-2.5 flex flex-wrap items-center justify-start gap-1">
        
        <button
          id="btn-tab-clients"
          type="button"
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'clients'
              ? 'bg-[#0d1c3a] text-white shadow-xxs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          Client Sprints Workspace
        </button>

        <button
          id="btn-tab-playbook"
          type="button"
          onClick={() => setActiveTab('playbook')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'playbook'
              ? 'bg-[#0d1c3a] text-white shadow-xxs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Enter the interactive course guidelines and session workshop spaces for the active client"
        >
          <BookOpen className="w-4 h-4" />
          Playbook Workshops: <span className="text-purple-400 font-bold ml-1">{state.brandClarity.companyName}</span>
        </button>

        <button
          id="btn-tab-advisor"
          type="button"
          onClick={() => setActiveTab('ai_advisor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'ai_advisor'
              ? 'bg-[#0d1c3a] text-white shadow-xxs font-bold hover:shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Analyze digital scorecard metrics and formulate high-impact social ad hooks using Gemini AI"
        >
          <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
          AI Strategic Advisor
        </button>

        <button
          id="btn-tab-trackers"
          type="button"
          onClick={() => setActiveTab('trackers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'trackers'
              ? 'bg-[#0d1c3a] text-white shadow-xxs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Document campaign logs, track milestones, and audit overall launch quality configurations"
        >
          <Database className="w-4 h-4" />
          Implementation Logs & QA
        </button>


      </div>

      {/* Core Working Area */}
      <main className="flex-1 p-5 md:p-8" id="core-strategy-pane">
        
        {/* TAB: Client Sprints Workspace */}
        {activeTab === 'clients' && (
          <ClientSprintManager
            clients={clients}
            activeClientId={activeClientId}
            onSelectClient={handleSelectClient}
            onAddClient={handleAddClient}
            onUpdateClientStatus={handleUpdateClientStatus}
            onDeleteClient={handleDeleteClient}
            activePlaybookState={state}
          />
        )}

        {/* TAB: Playbook and Custom Workshops */}
        {activeTab === 'playbook' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start" id="view-playbook-workspaces">
            
            {/* Sidebar Chapters Navigation */}
            <div className="xl:col-span-1 border-r border-slate-100 pr-2">
              <div className="bg-purple-500/10 border border-purple-500/20 text-purple-950 rounded-xl p-3.5 mb-4 text-xs space-y-2">
                <label htmlFor="playbook-client-select" className="block text-[10px] font-bold text-purple-800 uppercase tracking-wider">
                  Active Strategy Client:
                </label>
                <select
                  id="playbook-client-select"
                  value={activeClientId}
                  onChange={(e) => handleSelectClient(e.target.value)}
                  className="w-full bg-white border border-purple-200 text-slate-800 text-xs rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium cursor-pointer"
                >
                  {clients.map((cli) => (
                    <option key={cli.id} value={cli.id}>
                      {cli.clientName} ({cli.status})
                    </option>
                  ))}
                </select>
                <div className="pt-1 text-[9px] text-slate-500 font-medium">
                  Switch the active partner profile above to load their brand workshops.
                </div>
              </div>
              <PlaybookReader 
                activeChapter={activeChapter} 
                onChapterChange={(ch) => setActiveChapter(ch)} 
              />
            </div>

            {/* Content pane: Left pane hosts reading curriculum, right pane is the associated worksheet */}
            <div className="xl:col-span-3 space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                {/* Visual Reading Card */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs min-h-[460px]" id="manual-text-viewport">
                  <PlaybookPages activeChapter={activeChapter} state={state} />
                </div>

                {/* Interactive State Editors */}
                <div className="space-y-6" id="interactive-inputs-viewport">
                  {activeChapter === 'overview' && (
                    <DiagnosticWorkspace state={state} onChange={handleStateChange} />
                  )}

                  {activeChapter === 'session1' && (
                    <BrandClarityCanvas state={state} onChange={handleStateChange} />
                  )}

                  {activeChapter === 'session2' && (
                    <CompetitorPositioning state={state} onChange={handleStateChange} />
                  )}

                  {activeChapter === 'session3' && (
                    <PriorityStack state={state} onChange={handleStateChange} />
                  )}

                  {activeChapter === 'growth' && (
                    <div className="bg-white rounded-xl border border-[#CBD6E2] p-6 text-slate-600 shadow-xxs">
                      <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono border-b border-slate-100 pb-3 mb-4">
                        Micro Campaign Ad Cost Calculator
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-5 leading-relaxed">
                        Input your target parameters below to draft expected client acquisition cost models in local Bangladesh markets:
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Target Click-Through Rate (CTR)</label>
                          <input type="text" className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 focus:outline-none" value="1.8%" disabled />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Expected Cost-Per-Click (CPC)</label>
                          <input type="text" className="w-full text-xs bg-slate-50 border border-slate-200 rounded p-2 focus:outline-none" value="BDT 8.5" disabled />
                        </div>
                        <div className="p-4 bg-[#f5f2ff] border border-purple-100 rounded-lg text-slate-800 text-xs">
                          <span className="font-bold block text-purple-950 mb-0.5">Estimated Client Acquisition (CAC) Model:</span>
                          With an average BDT 15,000 monthly target spend, you can capture around 1,760 warm impressions resulting in roughly 52 targeted client conversions.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeChapter === 'followup' && (
                    <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-8 text-slate-500 shadow-inner flex flex-col justify-center items-center text-center space-y-3 min-h-[460px]">
                      <Zap className="w-12 h-12 text-[#9333ea] stroke-1 animate-bounce" />
                      <div className="max-w-xs space-y-1">
                        <h4 className="font-semibold text-slate-800 text-xs">Day 14 Review Protocol Ready</h4>
                        <p className="text-[10px] leading-relaxed">
                          When undertaking the Day 14 follow-up call, move to the <strong>"Implementation Logs & QA"</strong> tab above to record live actions, challenges, and success logs!
                        </p>
                      </div>
                    </div>
                  )}

                  {activeChapter === 'dashboard' && (
                    <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-8 text-slate-500 shadow-inner flex flex-col justify-center items-center text-center space-y-3 min-h-[460px]">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 stroke-1" />
                      <div className="max-w-xs space-y-1">
                        <h4 className="font-semibold text-slate-700 text-xs">QA Systems Activated</h4>
                        <p className="text-[10px] leading-relaxed">
                          Navigate over to the master <strong>"Implementation Logs & QA"</strong> tab to complete the final post-campaign internal parameters audit.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB: AI Strategic Advisor Suite */}
        {activeTab === 'ai_advisor' && (
          <div id="advisor-suite">
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span>Currently advising: <strong>{state.brandClarity.companyName}</strong></span>
              </div>
              <span className="text-[10px] bg-purple-50 text-purple-700 font-mono font-bold px-2 py-0.5 rounded border border-purple-100">AI SPRINT ACTIVE</span>
            </div>
            <AiStrategicAdvisor state={state} />
          </div>
        )}

        {/* TAB: Operational logs & Checklist audits */}
        {activeTab === 'trackers' && (
          <div id="trackers-suite">
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 text-xs text-slate-600">
              Currently tracking implementation for: <strong>{state.brandClarity.companyName}</strong>
            </div>
            <ProgressTracker state={state} onChange={handleStateChange} />
          </div>
        )}

      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-[10px] text-slate-400 font-mono">
        MIC 1:1 Brand Launch Consultancy System. Authorized dispersal prohibited. Version 1.2 — Multi-Client Active Database
      </footer>

      {/* Tooltip Mount */}
      <Tooltip id="app-tooltip" place="top" style={{ backgroundColor: '#0d1c3a', color: '#f8fafc', zIndex: 9999, fontSize: '10px', borderRadius: '6px', maxWidth: '280px', padding: '6px 10px', opacity: 0.98 }} />

    </div>
  );
}
export { App };
