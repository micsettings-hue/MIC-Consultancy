/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User } from 'firebase/auth';
import { 
  Lock, 
  LogIn, 
  LogOut, 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  Layers, 
  BrainCircuit 
} from 'lucide-react';
import micLogo from '../assets/images/mic_logo_1779285135896.png';

interface Props {
  user: User | null;
  onLogin: () => Promise<any>;
  onLogout: () => Promise<void>;
}

export default function WorkspaceLoginGate({ user, onLogin, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[#040810] text-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden select-none" id="workspace-login-gate">
      {/* Visual background accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#090f1e]/85 backdrop-blur-md rounded-2xl border border-slate-800 p-8 shadow-2xl flex flex-col justify-between space-y-8 relative z-10 transition-all duration-300">
        
        {/* Header Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 p-0.5 bg-white shadow-lg flex items-center justify-center">
              <img src={micLogo} alt="MIC Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-bold tracking-tight text-white uppercase font-sans">
              Marketing & Innovation Collective
            </h1>
            <p className="text-xs text-purple-400 font-semibold font-mono tracking-wider uppercase">
              Playbook Workspace Console
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent w-full" />

        {/* Access Logic Display Panel */}
        {!user ? (
          /* Case 1: Visitor needs to Authenticate */
          <div className="space-y-6" id="login-form-unregistered">
            <div className="space-y-3 text-center">
              <div className="bg-purple-950/40 border border-purple-900/50 rounded-xl p-4 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs text-purple-300 font-bold">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Authorized Personnel Only</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This console contains proprietary 1:1 strategy workshop logs and performance tracking scorecards. Only the administrator account (**mic.settings@gmail.com**) can gain access.
                </p>
              </div>
            </div>

            <button
              id="gate-button-login"
              type="button"
              onClick={onLogin}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs py-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign in with Google Account
            </button>
          </div>
        ) : (
          /* Case 2: User is Authenticated but fails email authorization check */
          <div className="space-y-6" id="login-form-unauthorized">
            <div className="bg-rose-950/30 border border-rose-900/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-450 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Access Denied: Non-Admin Email</span>
              </div>
              <div className="text-[11px] text-slate-350 leading-relaxed space-y-2">
                <p>
                  You are currently logged in with: <strong className="text-white block font-mono bg-rose-950/50 p-2 border border-rose-900/30 rounded mt-1 overflow-x-auto">{user.email}</strong>
                </p>
                <p>
                  This strategy console is restricted. Only the chief consultant profile **mic.settings@gmail.com** possesses the cryptographic privileges to access playbook builder sheets and client tracking logs.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="gate-button-switch"
                type="button"
                onClick={onLogout}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Disconnect/Sign Out
              </button>
              
              <p className="text-[10px] text-center text-slate-500 font-mono">
                Click above to release the current session and sign in with mic.settings@gmail.com
              </p>
            </div>
          </div>
        )}

        {/* Console Footnote / Benefits list */}
        <div className="space-y-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent w-full" />
          
          <div className="text-[10px] text-slate-500 space-y-2 font-sans">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="truncate">Multi-Client Active Launch Roadmap Scorecards</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="truncate">Gemini-Powered Social Campaign CTR Strategic Advisor</span>
            </div>
          </div>

          <div className="text-[9px] text-center text-slate-600 font-mono">
            MIC Consultancy System • Dedicated Cloud Security Shield
          </div>
        </div>

      </div>
    </div>
  );
}
