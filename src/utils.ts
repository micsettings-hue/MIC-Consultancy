/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaybookState, ScorecardMetric, CompetitorData, PriorityTask } from './types';

export const INITIAL_SCORECARD: ScorecardMetric[] = [
  { id: 'logo', label: 'Logo & Visual Identity', score: 3, notes: '' },
  { id: 'website', label: 'Website (UX, Copy, Speed)', score: 2, notes: '' },
  { id: 'social_media', label: 'Social Media Presence', score: 3, notes: '' },
  { id: 'content_quality', label: 'Content Quality & Consistency', score: 2, notes: '' },
  { id: 'ad_strategy', label: 'Ad Strategy & Creative', score: 1, notes: '' },
  { id: 'seo', label: 'SEO / Discoverability', score: 2, notes: '' },
  { id: 'brand_voice', label: 'Brand Voice & Messaging', score: 3, notes: '' },
  { id: 'audience_clarity', label: 'Audience Clarity', score: 2, notes: '' },
  { id: 'lead_gen', label: 'Lead Generation System', score: 2, notes: '' },
  { id: 'testimonials', label: 'Customer Experience / Testimonials', score: 3, notes: '' },
];

export const INITIAL_COMPETITORS: CompetitorData[] = [
  {
    name: 'Competitor 1',
    pricing: 'Premium',
    channel: 'LinkedIn Organic',
    frequency: '3x/week',
    hasAds: false,
    websiteScore: 4,
    engagement: 'Medium-High',
    usp: 'Thought leadership and high-quality templates',
    weakness: 'Slow lead response times',
    contentRating: 7,
    pricingRating: 8,
    trustRating: 8,
    onlineRating: 7
  },
  {
    name: 'Competitor 2',
    pricing: 'Mid-range',
    channel: 'Meta Ads',
    frequency: '5x/week',
    hasAds: true,
    websiteScore: 3,
    engagement: 'High (via giveaways)',
    usp: 'Budget-friendly bundled offers',
    weakness: 'Lower overall quality of delivery',
    contentRating: 6,
    pricingRating: 6,
    trustRating: 5,
    onlineRating: 8
  },
  {
    name: 'Competitor 3',
    pricing: 'Budget',
    channel: 'Facebook Groups',
    frequency: 'Daily',
    hasAds: false,
    websiteScore: 1,
    engagement: 'Low',
    usp: 'Highly accessible digital download guides',
    weakness: 'Zero personal support or video tutorials',
    contentRating: 4,
    pricingRating: 4,
    trustRating: 4,
    onlineRating: 5
  }
];

export const INITIAL_TASKS: PriorityTask[] = [
  { id: 'ts1', title: 'Fix brand consistency (logo, bio, colours)', defaultPriority: 'HIGH', clientPriority: 'HIGH', recommendation: 'Update bio, logo, profile pics consistently' },
  { id: 'ts2', title: 'Launch/rebuild website or landing page', defaultPriority: 'HIGH', clientPriority: 'HIGH', recommendation: 'Single-page landing page targeting core benefit' },
  { id: 'ts3', title: 'Start a content calendar (3x/week)', defaultPriority: 'HIGH', clientPriority: 'HIGH', recommendation: 'Educate, Inspire, Entertain, and Convert balance' },
  { id: 'ts4', title: 'Run a small paid ad test', defaultPriority: 'HIGH', clientPriority: 'HIGH', recommendation: 'BDT 300-500/day on Meta targeting local prospects' },
  { id: 'ts5', title: 'Set up Meta Pixel + Conversion API', defaultPriority: 'HIGH', clientPriority: 'HIGH', recommendation: 'Essential for iOS 14+ tracking accuracy' },
  { id: 'ts6', title: 'Build email or WhatsApp list', defaultPriority: 'MEDIUM', clientPriority: 'MEDIUM', recommendation: 'Integrate lead capture widget or opt-in forms' },
  { id: 'ts7', title: 'Create a referral/loyalty programme', defaultPriority: 'MEDIUM', clientPriority: 'MEDIUM', recommendation: 'Referral strategy: credit-based rewards or discounts' },
  { id: 'ts8', title: 'Start a blog or newsletter', defaultPriority: 'MEDIUM', clientPriority: 'MEDIUM', recommendation: 'Write weekly insightful articles to expand SEO value' },
  { id: 'ts9', title: 'Launch a YouTube or podcast channel', defaultPriority: 'LOW', clientPriority: 'LOW', recommendation: 'Build organic brand depth only after core channel validation' },
  { id: 'ts10', title: 'Build an e-commerce or booking system', defaultPriority: 'DEPENDS', clientPriority: 'MEDIUM', recommendation: 'Only required if direct digital booking friction is high' }
];

export const INITIAL_STATE: PlaybookState = {
  brandClarity: {
    companyName: 'My Client Brand',
    targetAudience: 'Dhaka-based early stage entrepreneurs and founders',
    coreProblem: 'Struggling to build premium positioning and convert attention into reservations or sales',
    productService: 'Interactive digital brand strategy and high-impact custom design services',
    idealCustomer: 'Creative service agency owners hungry for an outside perspective and clear roadmap',
    brandPromise: 'Clarity, structural alignment of digital services, and a verified 90-day growth engine',
    brandVoice: 'Professional, strategic, encouraging, expert',
    biggestGap: 'Lack of consistent core content and disjointed profile aesthetics',
    vision12m: 'To secure 15 ongoing premium monthly clients',
    vision3y: 'To expand the collective into a prominent digital consulting brand in the region',
    monthlyAdBudget: '15,000 BDT'
  },
  scorecard: INITIAL_SCORECARD,
  competitors: INITIAL_COMPETITORS,
  tasks: INITIAL_TASKS,
  weeklyProgress: [
    { weekName: 'Week 1 (Days 1–7)', actions: '', wins: '', challenges: '', focus: '' },
    { weekName: 'Week 2 (Days 8–14)', actions: '', wins: '', challenges: '', focus: '' },
    { weekName: 'Week 3 (Days 15–21)', actions: '', wins: '', challenges: '', focus: '' },
    { weekName: 'Week 4 (Days 22–30)', actions: '', wins: '', challenges: '', focus: '' }
  ],
  comments: ''
};

export function loadSavedPlaybook(): PlaybookState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const data = localStorage.getItem('mic_playbook_state');
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading playbook from LocalStorage:', e);
  }
  return INITIAL_STATE;
}

export function savePlaybookState(state: PlaybookState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mic_playbook_state', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving playbook to LocalStorage:', e);
  }
}

import { ClientAccount } from './types';

// Helper to seed pre-filled high fidelity playbook states for demo accounts
export const SEEDED_PLAYBOOKS: { [key: string]: PlaybookState } = {
  'aura': {
    brandClarity: {
      companyName: 'Aura Dhaka Cosmetics',
      targetAudience: 'Urban women aged 18-35 in Dhaka searching for cruelty-free local skincare products',
      coreProblem: 'Excessive reliance on imported makeup brands and lack of trusted, high-grade local vegan formulations',
      productService: 'Premium local organic serums and active botanicals skin therapies',
      idealCustomer: 'Skincare enthusiasts who care about raw clinical ingredients and clear brand transparency',
      brandPromise: 'Dermatologist tested, 100% locally sourced active formulas showing verified results in 28 days',
      brandVoice: 'Scientific, elegant, compassionate, authentic',
      biggestGap: 'Poor website loading speed (takes 9s) causing massive cart bounce rates during social campaigns',
      vision12m: 'To establish Aura as the top online brand in Dhaka with 2,500 monthly orders and 15 ongoing retail partnerships',
      vision3y: 'To expand distribution to Chittagong, Sylhet and launch active export lines in regional South Asia',
      monthlyAdBudget: '25,000 BDT'
    },
    scorecard: [
      { id: 'logo', label: 'Logo & Visual Identity', score: 4, notes: 'Sleek botanical typography' },
      { id: 'website', label: 'Website (UX, Copy, Speed)', score: 2, notes: 'Friction at checkout page caused by broken payment redirects' },
      { id: 'social_media', label: 'Social Media Presence', score: 4, notes: 'Stunning organic Instagram aesthetic, 12.5k followers' },
      { id: 'content_quality', label: 'Content Quality & Consistency', score: 3, notes: 'Misses detailed clinical testing breakdowns' },
      { id: 'ad_strategy', label: 'Ad Strategy & Creative', score: 2, notes: 'Relies too heavily on raw image boosting instead of high-performing video hooks' },
      { id: 'seo', label: 'SEO / Discoverability', score: 1, notes: 'Practically anonymous on core organic skincare search terms' },
      { id: 'brand_voice', label: 'Brand Voice & Messaging', score: 4, notes: 'Strongly scientific and focused on vegan cruelty-free' },
      { id: 'audience_clarity', label: 'Audience Clarity', score: 5, notes: 'Extremely clear target profile defined in early sessions' },
      { id: 'lead_gen', label: 'Lead Generation System', score: 3, notes: 'Collects emails via discount wheel, but no follow-up newsletter sequence exists' },
      { id: 'testimonials', label: 'Customer Experience / Testimonials', score: 4, notes: 'Dozens of customer before/after pictures hosted on Facebook page albums' },
    ],
    competitors: [
      {
        name: 'Vibrant Skin BD',
        pricing: 'Premium',
        channel: 'Facebook & Instagram',
        frequency: 'Daily Reels',
        hasAds: true,
        websiteScore: 4,
        engagement: 'High',
        usp: 'Imported Korean beauty packages',
        weakness: 'Double the pricing, zero local formulations',
        contentRating: 8,
        pricingRating: 9,
        trustRating: 7,
        onlineRating: 8
      }
    ],
    tasks: INITIAL_TASKS.map(t => ({ ...t, clientPriority: t.id === 'ts2' || t.id === 'ts5' ? 'HIGH' : 'MEDIUM' })),
    weeklyProgress: [
      { weekName: 'Week 1 (Days 1–7)', actions: 'Restructured payment gateway integrations on main Shopify cart.', wins: 'Conversion rate recovered from 0.8% to 1.9%', challenges: 'Delay in getting SMS gateway API credentials verified by local telecom companies.', focus: 'Integrating secure local bKash checkout API' },
      { weekName: 'Week 2 (Days 8–14)', actions: 'Ran a small split-test campaign structure with 3 dynamic vertical video creatives.', wins: 'Generated 98 purchases with average BDT 210 acquisition cost.', challenges: 'High CPM values caused by seasonal clothing sales overloading Bangladesh ad auctions.', focus: 'Scaling the highest-CTR skincare educative hook video' },
      { weekName: 'Week 3 (Days 15–21)', actions: '', wins: '', challenges: '', focus: '' },
      { weekName: 'Week 4 (Days 22–30)', actions: '', wins: '', challenges: '', focus: '' }
    ],
    comments: ' Arif represents a very passionate owner. Highly engaged during strategy sessions!'
  },
  'echo': {
    brandClarity: {
      companyName: 'Echo Apparel',
      targetAudience: 'Gen Z fashion buyers in major cities looking for sustainable linen garments',
      coreProblem: 'Fast fashion is highly pollutive and garments fade out or shrink after single wash cycles',
      productService: 'Premium hand-loomed minimal aesthetic linen shirts and trousers',
      idealCustomer: 'Environmentally aware corporate employees/freelancers with a taste for minimalist apparel',
      brandPromise: 'Ethical wages, biodegradable elements, 100% pre-shrunk premium linens built for 100 washes',
      brandVoice: 'Poetic, minimal, ecological, honest',
      biggestGap: 'Disjointed logo design and zero visual identity packaging (feels like a generic FB page)',
      vision12m: 'To establish an elite localized online linen boutique with BDT 300,000 monthly turnover',
      vision3y: 'To open an ambient physical boutique showroom in Gulshan/Dhanmondi sector',
      monthlyAdBudget: '12,000 BDT'
    },
    scorecard: [
      { id: 'logo', label: 'Logo & Visual Identity', score: 2, notes: 'Generic font, needs a bespoke, elegant minimal icon mark' },
      { id: 'website', label: 'Website (UX, Copy, Speed)', score: 1, notes: 'No website created yet, sells using manual Messenger conversations' },
      { id: 'social_media', label: 'Social Media Presence', score: 3, notes: 'Needs custom flat lays and photoshoot materials of linen on active daily models' },
      { id: 'content_quality', label: 'Content Quality & Consistency', score: 2, notes: 'Aperiodic updates dependent on stock re-orders' },
      { id: 'ad_strategy', label: 'Ad Strategy & Creative', score: 1, notes: 'Relies purely on boosting posts without pixel event analytics tracking' },
      { id: 'seo', label: 'SEO / Discoverability', score: 1, notes: 'Completely anonymous' },
      { id: 'brand_voice', label: 'Brand Voice & Messaging', score: 3, notes: 'Conveys sustainability well but lacks commercial confidence' },
      { id: 'audience_clarity', label: 'Audience Clarity', score: 4, notes: 'Very strong alignment with elite corporate minimalist apparel users' },
      { id: 'lead_gen', label: 'Lead Generation System', score: 2, notes: 'Sales are captured via tedious manual DM answers only' },
      { id: 'testimonials', label: 'Customer Experience / Testimonials', score: 3, notes: 'Positive chat feedback screenshots are stored on Google Drive' },
    ],
    competitors: [
      {
        name: 'Loom & Thread',
        pricing: 'High Premium',
        channel: 'Dhanmondi Showroom',
        frequency: 'Bi-weekly lines',
        hasAds: true,
        websiteScore: 4,
        engagement: 'Medium',
        usp: 'Legacy designer presence',
        weakness: 'Extremely high markup prices (BDT 4,500+ per apparel item)',
        contentRating: 7,
        pricingRating: 8,
        trustRating: 8,
        onlineRating: 6
      }
    ],
    tasks: INITIAL_TASKS.map(t => ({ ...t, clientPriority: t.id === 'ts1' || t.id === 'ts2' ? 'HIGH' : 'MEDIUM' })),
    weeklyProgress: [
      { weekName: 'Week 1 (Days 1–7)', actions: '', wins: '', challenges: '', focus: '' },
      { weekName: 'Week 2 (Days 8–14)', actions: '', wins: '', challenges: '', focus: '' },
      { weekName: 'Week 3 (Days 15–21)', actions: '', wins: '', challenges: '', focus: '' },
      { weekName: 'Week 4 (Days 22–30)', actions: '', wins: '', challenges: '', focus: '' }
    ],
    comments: 'Tasnim is preparing fabric supplies. Onboarding starts next Wednesday!'
  },
  'chowdhury': {
    brandClarity: {
      companyName: 'Chowdhury Tech Logistics',
      targetAudience: 'SMEs looking to ship organic crops and heavy machinery parts inside Bangladesh',
      coreProblem: 'Aperiodic shipping delays and high rates of damaged goods in conventional freight logistics',
      productService: 'Tech-enabled corporate B2B fleet logistics with real-time payload health tracking logs',
      idealCustomer: 'National warehouse operators, agricultural consolidators, and heavy machinery distributors',
      brandPromise: 'Guaranteed 24-Hour cross-district delivery with 100% full-value active cargo insurances',
      brandVoice: 'Authoritative, logical, robust, protective',
      biggestGap: 'Extremely poor reputation and lack of case study testimonials to convince large enterprises',
      vision12m: 'To secure 45 ongoing corporate contracts and scale fleet logistics active nodes by 40%',
      vision3y: 'To expand nationwide B2B logistics endpoints and offer cold chain storage variables',
      monthlyAdBudget: '35,000 BDT'
    },
    scorecard: [
      { id: 'logo', label: 'Logo & Visual Identity', score: 4, notes: 'Solid bold tech-forward typeface' },
      { id: 'website', label: 'Website (UX, Copy, Speed)', score: 4, notes: 'Fast loader, clear quote calculator form' },
      { id: 'social_media', label: 'Social Media Presence', score: 2, notes: 'Very low activity on LinkedIn and Facebook' },
      { id: 'content_quality', label: 'Content Quality & Consistency', score: 2, notes: 'Mainly occasional holiday greetings cards' },
      { id: 'ad_strategy', label: 'Ad Strategy & Creative', score: 3, notes: 'Runs targeted lead generation forms' },
      { id: 'seo', label: 'SEO / Discoverability', score: 3, notes: 'Ranks on direct corporate freight queries' },
      { id: 'brand_voice', label: 'Brand Voice & Messaging', score: 3, notes: 'Conveys logistical authority' },
      { id: 'audience_clarity', label: 'Audience Clarity', score: 4, notes: 'Clearly aligned with operational managers' },
      { id: 'lead_gen', label: 'Lead Generation System', score: 4, notes: 'Collects leads via direct website calculation portal' },
      { id: 'testimonials', label: 'Customer Experience / Testimonials', score: 2, notes: 'Needs structured case studies from early adopters' },
    ],
    competitors: [
      {
        name: 'Metro Cargo BD',
        pricing: 'Mid-range',
        channel: 'Sales reps',
        frequency: 'N/A',
        hasAds: false,
        websiteScore: 2,
        engagement: 'Low',
        usp: 'Massive fleet numbers',
        weakness: 'Zero digital tracking logs or IoT integration options',
        contentRating: 4,
        pricingRating: 5,
        trustRating: 7,
        onlineRating: 3
      }
    ],
    tasks: INITIAL_TASKS.map(t => ({ ...t, clientPriority: 'MEDIUM' })),
    weeklyProgress: [
      { weekName: 'Week 1 (Days 1–7)', actions: 'Documented 3 video interviews with agriculture partners who had cargo safe-arrival runs.', wins: 'Generated first 2 enterprise logistics sign-ups via LinkedIn messaging.', challenges: 'Logistics routes restricted by temporary highway constructions near Comilla districts.', focus: 'Building robust downloadable PDF case studies' },
      { weekName: 'Week 2 (Days 8–14)', actions: 'Launched targeted LinkedIn conversation ads towards Supply Chain Heads.', wins: 'Landed 4 meeting setups with major manufacturing units.', challenges: 'Convincing decision-makers to test a new fleet versus standard logistics contractors.', focus: 'Aligning insurance policy documents for presentation' },
      { weekName: 'Week 3 (Days 15–21)', actions: 'Conducted first full team review representing completed 30-day coaching sprint.', wins: 'Client team fully onboarded to tracking dashboards. Sprint finished with 130% target acquisition.', challenges: 'None.', focus: 'Transitioning to monthly advisory retainer structures' },
      { weekName: 'Week 4 (Days 22–30)', actions: 'Completed final sprint audits. Strategic workbook signed off.', wins: 'Consultancy retainer contract signed at BDT 30,000/mo.', challenges: 'None.', focus: 'Completed!' }
    ],
    comments: 'Excellent enterprise success! Wasif is completely aligned with tech-logistics model.'
  }
};

export const SEEDED_CLIENTS: ClientAccount[] = [
  {
    id: 'client_aura',
    clientName: 'Aura Dhaka Cosmetics',
    contactPerson: 'Arif Rahman',
    email: 'arif.rahman@auradhaka.com',
    status: 'running',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    playbookState: SEEDED_PLAYBOOKS['aura'],
    historyLog: ['Registered Aura cosmetics account', 'Completed Scorecard Audit Workshop', 'Set active status to running', 'Ran first ad split-test validation']
  },
  {
    id: 'client_echo',
    clientName: 'Echo Apparel',
    contactPerson: 'Tasnim Chowdhury',
    email: 'tasnim.chowdhury@echoapparel.com',
    status: 'starting soon',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    playbookState: SEEDED_PLAYBOOKS['echo'],
    historyLog: ['Registered Echo sustainable apparel account', 'Completed Discovery intake questions', 'Assigned Priority stack metrics']
  },
  {
    id: 'client_chowdhury',
    clientName: 'Chowdhury Tech Logistics',
    contactPerson: 'Wasif Chowdhury',
    email: 'wasif@chowdhurytech.com',
    status: 'ended',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    playbookState: SEEDED_PLAYBOOKS['chowdhury'],
    historyLog: ['Registered Chowdhury logistics account', 'Finished 4 weeks implementation sprints', 'Logged BDT 30K retainer signature', 'Set active status to ended']
  }
];

export function loadClients(): ClientAccount[] {
  if (typeof window === 'undefined') return SEEDED_CLIENTS;
  try {
    const data = localStorage.getItem('mic_clients_list');
    if (data) {
      return JSON.parse(data);
    }
    // If empty, save the seeded ones first
    saveClients(SEEDED_CLIENTS);
    return SEEDED_CLIENTS;
  } catch (e) {
    console.error('Error loading clients from LocalStorage:', e);
  }
  return SEEDED_CLIENTS;
}

export function saveClients(clients: ClientAccount[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mic_clients_list', JSON.stringify(clients));
  } catch (e) {
    console.error('Error saving clients to LocalStorage:', e);
  }
}

export function loadActiveClientId(clients: ClientAccount[]): string {
  if (typeof window === 'undefined') return clients[0]?.id || '';
  try {
    const actId = localStorage.getItem('mic_active_client_id');
    if (actId && clients.some(c => c.id === actId)) {
      return actId;
    }
  } catch (e) {
    console.error('Error loading active client id:', e);
  }
  return clients[0]?.id || '';
}

export function saveActiveClientId(id: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mic_active_client_id', id);
  } catch (e) {
    console.error('Error saving active client id:', e);
  }
}

