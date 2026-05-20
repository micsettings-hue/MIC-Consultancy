/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  Rocket, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  Users, 
  Mail, 
  Phone,
  DollarSign,
  X,
  FileText,
  Send,
  CheckCircle2,
  LogIn,
  LogOut,
  Check,
  Clock,
  ShieldAlert
} from 'lucide-react';

import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

import micLogo from '../assets/images/mic_logo_1779285135896.png';
import leadConsultantPortrait from '../assets/images/lead_consultant_portrait_1779285156941.png';

interface Props {
  onEnterWorkspace: () => void;
  onSelectService: (service: string) => void;
  onAddClient: (name: string, person: string, email: string, status: 'running' | 'starting soon' | 'ended', selectedPackage?: string, notes?: string) => void;
  navigateTo: (path: string) => void;
  user: User | null;
  isAdmin: boolean;
  onLogin: () => Promise<any>;
  onLogout: () => Promise<void>;
}

export default function BrandLandingPage({ 
  onEnterWorkspace, 
  onSelectService, 
  onAddClient, 
  navigateTo,
  user,
  isAdmin,
  onLogin,
  onLogout
}: Props) {
  // Intake Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    selectedPackage: '1:1 Strategy Consultation Session',
    growthGaps: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [dbApp, setDbApp] = useState<any>(null);
  const [loadingApp, setLoadingApp] = useState(false);
  const [userApplication, setUserApplication] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      setUserApplication(null);
      setDbApp(null);
      return;
    }
    const checkUserApp = async () => {
      setLoadingApp(true);
      try {
        const docRef = doc(db, 'applications', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserApplication(docSnap.data());
          setDbApp(docSnap.data());
        }
      } catch (err) {
        console.error("Failed to read user application status:", err);
      } finally {
        setLoadingApp(false);
      }
    };
    checkUserApp();
  }, [user]);

  const handleOpenForm = async (packageName: string) => {
    if (!user) {
      try {
        await onLogin();
      } catch (err) {
        console.error("Dynamic Google auth failed, application lock triggered:", err);
        return;
      }
    }
    setFormData({
      companyName: '',
      contactPerson: auth.currentUser?.displayName || user?.displayName || '',
      email: auth.currentUser?.email || user?.email || '',
      selectedPackage: packageName || '1:1 Strategy Consultation Session',
      growthGaps: ''
    });
    setIsFormOpen(true);
    setIsSubmitted(false);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (user) {
        const appPayload = {
          id: user.uid,
          userId: user.uid,
          userEmail: user.email || '',
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          selectedPackage: formData.selectedPackage,
          growthGaps: formData.growthGaps,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'applications', user.uid), appPayload);
        setDbApp(appPayload);
        setUserApplication(appPayload);
      }
    } catch (err) {
      console.error("Failed to write applications to firestore remote database:", err);
    }

    // Call state prop to propagate new client into active list
    onAddClient(
      formData.companyName,
      formData.contactPerson,
      formData.email,
      'starting soon',
      formData.selectedPackage,
      formData.growthGaps
    );

    onSelectService(formData.selectedPackage);
    setIsSubmitted(true);
  };

  const handleLaunchWorkspace = () => {
    setIsFormOpen(false);
    // Navigate straight to the playbook route!
    navigateTo('/MIC-Brand-Launch/playbook-suite');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800" id="landing-page-root">
      
      {/* Landing page header */}
      <header className="bg-slate-900 border-b border-purple-950/40 text-white px-5 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-800/80 shadow-sm flex items-center justify-center bg-white shrink-0">
            <img src={micLogo} alt="MIC Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-none flex items-center gap-1.5 flex-wrap">
              Marketing & Innovation Collective
              <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-900 font-bold uppercase tracking-wider">Lander</span>
            </h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Premium Brand Launch & 1:1 Consulting</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href="#services-pricing" className="text-xs text-slate-300 hover:text-white transition-colors font-semibold px-2">Deliverables</a>
          
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-left">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName || 'user'} className="w-5 h-5 rounded-full select-none" referrerPolicy="no-referrer" />
                )}
                <div className="leading-none">
                  <div className="text-[10px] font-bold text-white max-w-[120px] truncate">{user.displayName || 'Authorized User'}</div>
                  <div className="text-[8px] text-slate-400 max-w-[125px] truncate mt-0.5">{user.email}</div>
                </div>
              </div>
              
              {isAdmin && (
                <button
                  onClick={() => navigateTo('/MIC-Brand-Launch/playbook-suite')}
                  className="bg-purple-600 hover:bg-purple-700 font-bold text-[11px] text-white px-3 py-2 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-sm animate-pulse"
                >
                  Admin Panel ➔
                </button>
              )}
              
              <button
                onClick={onLogout}
                className="hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer text-xs"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-[#22c55e] hover:bg-[#16a34a] font-bold text-[11px] text-white px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in with Google
            </button>
          )}
        </div>
      </header>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#060b13] via-[#0d1c3a] to-[#04060a] text-white py-20 px-6 md:px-12 border-b border-purple-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          <div className="space-y-6 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold leading-none">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              EXCLUSIVE 1:1 GROWTH CONSULTANCY
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-none tracking-tight">
              Scale Your Brand Launch with <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent font-bold">Absolute Clarity</span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Tired of low conversions and wasteful Facebook ads? Align your positioning, audit competency leaks across 10 vital sectors, and engineer high-converting campaigns under senior strategy guides.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isAdmin ? (
                <button
                  id="landing-hero-cta-workspace"
                  onClick={() => navigateTo('/MIC-Brand-Launch/playbook-suite')}
                  className="bg-[#7c3aed] hover:bg-purple-700 transition-colors text-white font-bold text-xs py-3.5 px-6 rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
                >
                  Access Consultant Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="#services-pricing"
                  className="bg-[#7c3aed] hover:bg-purple-700 transition-colors text-white font-bold text-xs py-3.5 px-6 rounded-lg shadow-md flex items-center gap-2 cursor-pointer text-center"
                >
                  Book 1:1 Strategic Session
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              <a
                href="#services-pricing"
                className="border border-slate-700 hover:border-slate-500 hover:bg-white/5 transition-all text-slate-350 font-semibold text-xs py-3.5 px-6 rounded-lg text-center font-mono"
              >
                View Benefits & Deliverables
              </a>
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-[#111c33]/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl w-full max-w-md relative">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg transform rotate-6 animate-pulse">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              
              <div className="border-b border-slate-700/80 pb-4 mb-4">
                <span className="text-[10px] font-mono text-purple-400 font-bold tracking-wider uppercase">MIC GROWTH BLUEPRINT</span>
                <h3 className="text-base font-bold text-white">The One-Time Brand Launch</h3>
              </div>
              
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Interactive Brand Clarity Audit (Identify Leakages)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Competitor Coexistence & Position Mapping Statement</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>90-Day Step-by-Step Priority Milestone Roadmapping</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Google Gemini AI Strategic Copy & Ad Hooks Formulator</span>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Consultancy fee</span>
                  <span className="text-xl font-bold text-purple-400">BDT 15,000 <span className="text-xs text-slate-500 font-normal">flat</span></span>
                </div>
                <button
                  id="landing-hero-intake-cta"
                  onClick={() => handleOpenForm('One-Time Brand Launch')}
                  className="bg-white hover:bg-slate-100 transition-colors text-[#0d1c3a] font-bold text-xs py-2.5 px-4 rounded-lg cursor-pointer"
                >
                  Start Intake Checklist
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badging Statistics */}
      <section className="bg-white border-b border-slate-200 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0d1c3a]">10 Key</div>
            <div className="text-[11px] text-slate-500 font-mono uppercase mt-1">Audit Scorecard Sectors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#7c3aed]">90 Days</div>
            <div className="text-[11px] text-slate-500 font-mono uppercase mt-1">Operational Roadmap</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0d1c3a]">BDT 15K</div>
            <div className="text-[11px] text-slate-500 font-mono uppercase mt-1">Flat Premium Package fee</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#7c3aed]">Gemini</div>
            <div className="text-[11px] text-slate-500 font-mono uppercase mt-1">AI Powered Diagnostics</div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid: What makes MIC 1:1 Unique */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-[#7c3aed] font-bold text-xs uppercase tracking-widest font-mono">Consulting Methodology</span>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Structured Growth Framework</h2>
          <p className="text-slate-500 text-xs">We replace haphazard guesswork with a rigorous, professional 3-stage business launch audit sequence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xxs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[#0d1c3a] text-sm">1. Brand Clarity Scorecard</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Answer curated deep brand inquiry worksheets. Get instant scores out of 5 across 10 digital metrics to locate exact conversion leakages and pricing bottlenecks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xxs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[#0d1c3a] text-sm">2. Competitor Matrix & Statement</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Input active competitors to analyze pricing formats, strengths, website quality, and user engagement. Automatically generate a high-impact distinctive USP positioning hook.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border-2 border-purple-500/20 shadow-xxs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-purple-200 text-sm">3. Actionable Priority Roadmaps</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-normal">
              Organize priorities from top High-impact steps like Metapixel, content schedules, and ad budget controls, into interactive weekly work sprints with success milestones.
            </p>
          </div>

        </div>
      </section>

      {/* Muzahidul Islam (Lead Consultant) Profile */}
      <section className="bg-white py-16 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-[#7c3aed] bg-purple-50 shadow-md shrink-0">
            <img 
              src={leadConsultantPortrait} 
              alt="Muzahidul Islam" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="space-y-5 text-left flex-1">
            <div className="space-y-1">
              <span className="text-[#7c3aed] font-mono text-[10px] font-bold uppercase tracking-wider">Meet the Founder & Senior Lead</span>
              <h2 className="text-3xl font-display font-medium text-slate-900">Muzahidul Islam</h2>
              <p className="text-xs text-[#7c3aed] font-bold uppercase tracking-wide">Lead Strategy Consultant & Growth Officer</p>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-2xl">
              "Over the past years, I have helped brands launch and scale client acquisition channels in the local Bangladesh market. Authentic growth does not happen by setting up high budgets and running messy ad sets. It begins with razor-sharp positioning statements and a bulletproof 90-day action protocol. Let us build your brand framework together."
            </p>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2 hover:text-purple-700 transition-colors">
                <Mail className="w-4 h-4 text-[#7c3aed]" />
                <span>leadconsultant.mic@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-purple-700 transition-colors">
                <Phone className="w-4 h-4 text-[#7c3aed]" />
                <span>+8801828772486</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="landing-profile-cta"
                onClick={() => handleOpenForm('One-Time Brand Launch')}
                className="inline-flex items-center gap-2 bg-[#0d1c3a] hover:bg-[#162a54] transition-colors text-white font-bold text-xs py-3 px-5 rounded-lg shadow cursor-pointer"
              >
                Inquire Growth Service Right Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 1:1 Strategy Consultation Session & Benefits */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-10 text-center" id="services-pricing">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-[#7c3aed] font-bold text-xs uppercase tracking-widest font-mono">1:1 High-Performance Strategic Intake</span>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">1:1 Premium Brand Strategy & Positioning Audit</h2>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xl mx-auto">
            Instead of three raw standard plans, we specialize in a comprehensive, dedicated, face-to-face tactical alignment session with Muzahidul Islam to structure your startup marketing roadmap and resolve technical tracking leakages.
          </p>
        </div>

        <div className="bg-white border-2 border-purple-500/80 rounded-2xl p-8 shadow-xl text-left max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative overflow-hidden">
          <div className="absolute -top-3 -right-3 w-32 h-32 bg-purple-500/5 rounded-full" />
          
          <div className="md:col-span-3 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-purple-600 bg-purple-105 px-2.5 py-1 rounded">
                WHAT YOU GET IN THE SESSION (BENEFITS)
              </span>
              <h3 className="text-xl font-bold text-[#0d1c3a] mt-3">Interactive Launch Consultation & Diagnostic Logs</h3>
            </div>

            <ul className="grid grid-cols-1 gap-4 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">10-Point Scorecard Audit</strong>
                  Identify hidden operational bottlenecks in your store's mobile speed, scripts, and Facebook Pixel events.
                </div>
              </li>
              <li className="flex items-start gap-3 border-t border-slate-100 pt-3.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Competitor Coexistence Index</strong>
                  Analyze local competitor landscapes in Bangladesh and map your uncontested premium positioning statement.
                </div>
              </li>
              <li className="flex items-start gap-3 border-t border-slate-100 pt-3.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">90-Day Priority Milestone Protocol</strong>
                  A clear step-by-step roadmap setting high-utility priorities across ad sets, pixel triggers, and budgets.
                </div>
              </li>
              <li className="flex items-start gap-3 border-t border-slate-100 pt-3.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Gemini AI Strategic Ad Hooks</strong>
                  Co-create high-CTR copy and ad video hooks designed specifically for Dhaka/Bangladesh audiences.
                </div>
              </li>
              <li className="flex items-start gap-3 border-t border-slate-100 pt-3.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Persisted Interactive Playbook Suite Access</strong>
                  Gain administrative access to your live tracking worksheets, progress charts, and comments logs.
                </div>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 bg-[#f9f8ff] border border-purple-100 rounded-xl p-6 h-full flex flex-col justify-between space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block font-bold">ALL-IN SESSION INVESTMENT</span>
              <div className="text-3xl font-black text-purple-950 font-mono">
                BDT 15,000 <span className="text-xs text-slate-400 font-normal">flat fee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Includes full initial diagnostics and setup of your cloud-persisted scorecard tracking.
              </p>
            </div>

            {loadingApp ? (
              <div className="text-xs text-slate-400 py-3 font-mono">Syncing application with Firestore remote...</div>
            ) : userApplication ? (
              <div className="bg-white border border-emerald-200 rounded-lg p-3.5 text-left space-y-2 shadow-xxs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Application Logged</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Our system registered your Brand: <strong>{userApplication.companyName}</strong>. 
                </p>
                <div className="text-[9px] font-mono inline-block bg-amber-50 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 uppercase font-bold mt-1">
                  CRM Track: {userApplication.status}
                </div>
              </div>
            ) : dbApp ? (
              <div className="bg-white border border-emerald-200 rounded-lg p-3.5 text-left space-y-2 shadow-xxs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Application Submitted</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Brand: <strong>{dbApp.companyName}</strong>
                </p>
                <div className="text-[9px] font-mono inline-block bg-amber-50 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 font-bold">
                  PENDING REVIEW
                </div>
              </div>
            ) : (
              <button
                id="landing-strategic-session-cta"
                onClick={() => handleOpenForm('1:1 Strategy Consultation Session')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-colors font-bold text-xs cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5"
              >
                {user ? "Apply for 1:1 Strategic Audit" : "Sign in & Apply for Session"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="text-[9px] text-purple-400 font-mono uppercase tracking-wider font-extrabold leading-none">
              ★ SEEDING MAXIMUM 5 NEW BRANDS PER WEEK
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credentials Testimonial */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <Users className="w-12 h-12 text-purple-400 opacity-80" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif italic text-slate-200 font-normal">
            "MIC’s diagnostic scorecard sequence changed our entire Facebook campaign trajectory. We identified critical leaks in our target validation, adjusted our target metrics according to the competitor coexist matrix, and cut customer acquisition cost by nearly 35% in our first month."
          </h3>
          <div className="space-y-0.5">
            <h4 className="font-bold text-sm text-purple-400">Arif Rahman</h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Founder, Aura Dhaka Cosmetics</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-8 px-6 text-center text-xs border-t border-slate-900 font-mono">
        <div>© {new Date().getFullYear()} Marketing & Innovation Collective. All rights reserved. Dhaka, Bangladesh.</div>
        <div className="text-[10px] text-slate-600 mt-1">Authorized for public and client client registration intake. Professional consultation system.</div>
      </footer>

      {/* Interactive Floating Intake Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#060b13]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-purple-100 overflow-hidden relative my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-300" />
                <div>
                  <h3 className="text-sm font-bold">Growth Strategy Intake Request</h3>
                  <p className="text-[10px] text-purple-200">Submit your details to establish your dedicated workspace.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-white/75 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-purple-600 block mb-1">SELECTED TIER</span>
                    <div className="bg-purple-50 text-purple-900 text-xs px-3.5 py-2.5 rounded-lg border border-purple-100 font-bold flex items-center justify-between">
                      <span>{formData.selectedPackage}</span>
                      <span className="text-[10px] bg-white text-purple-700 font-mono px-2 py-0.5 rounded border border-purple-200 uppercase font-black">Intake Ready</span>
                    </div>
                  </div>

                  {/* Brand name */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-700">Company / Brand Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g., Aura Cosmetics, Dhaka Apparel"
                      className={`w-full text-xs border rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 ${errors.companyName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-purple-400'}`}
                    />
                    {errors.companyName && <p className="text-[10px] text-rose-500 font-medium">{errors.companyName}</p>}
                  </div>

                  {/* Contact Person Name */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-700">Founder / Lead Contact Person <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="e.g., Muzahidul Islam"
                      className={`w-full text-xs border rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 ${errors.contactPerson ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-purple-400'}`}
                    />
                    {errors.contactPerson && <p className="text-[10px] text-rose-500 font-medium">{errors.contactPerson}</p>}
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-700">Contact Email Address <span className="text-rose-500">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., example@brand.com"
                      className={`w-full text-xs border rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 ${errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-purple-400'}`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 font-medium">{errors.email}</p>}
                  </div>

                  {/* Special Requests / Business Gaps */}
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-700">What is your biggest launch gap or challenge? (Optional)</label>
                    <textarea 
                      name="growthGaps"
                      rows={3}
                      value={formData.growthGaps}
                      onChange={handleInputChange}
                      placeholder="e.g. Broken website load speeds, unoptimized Facebook pixel events, pricing strategy questions..."
                      className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>

                  {/* Note on data */}
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    By submitting this request, your details are registered in our secure browser-side CRM dataset to provision your interactive growth scorecard checklist.
                  </p>

                  {/* Actions buttons */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Request Service
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">Growth Blueprint Created Successfully!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Thank you! Your intake request has been registered in the system. Your dedicated brand launch dashboard is now successfully provisioned!
                    </p>
                  </div>

                  <div className="bg-[#f5f2ff] border border-purple-100 rounded-xl p-4 text-left max-w-sm mx-auto">
                    <div className="text-[10px] font-bold text-purple-950 block uppercase font-mono mb-1">PROVISIONED BRAND ID</div>
                    <div className="text-xs font-bold text-slate-800">{formData.companyName}</div>
                    <p className="text-[10px] text-slate-500 mt-1">Lead Contact: <strong>{formData.contactPerson}</strong></p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      onClick={handleLaunchWorkspace}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      Enter Your Live Playbook Workspace ➔
                    </button>
                    <button 
                      onClick={() => setIsFormOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors py-1.5 font-semibold"
                    >
                      Keep browsing lander
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
