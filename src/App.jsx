import { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, ChevronLeft, Play, Users, 
  TrendingUp, RefreshCw, Layers, 
  Music, CreditCard, Shield, Globe, Briefcase, ShoppingBag, MessageCircle
} from 'lucide-react';

// --- THEME & ASSETS ---
const theme = {
  bg: 'bg-[#fdfaf5]',
  text: 'text-[#2d3748]',
  textMuted: 'text-[#4a5568]',
  accent: 'text-[#d47b65]', // Terracotta from logo
  accentBg: 'bg-[#d47b65]',
  secondary: 'text-[#587b89]', // Slate/Blue from logo
  navy: 'text-[#2c3e50]',
  card: 'bg-white',
};

// Map original filenames for local rendering (ensure HTML/images are in same folder if exported)
const ASSETS = {
  logo: "logo.jpg",
  feed: "feed.jpg",
  discover: "Screenshot 2026-05-21 at 4.57.30 PM.jpg",
  groups: "groups.jpg",
  events: "Screenshot 2026-05-21 at 4.58.01 PM.jpg",
  mutualAid: "Screenshot 2026-05-21 at 4.58.11 PM.jpg",
  marketplace: "marketplace.jpg",
  gigs: "gigs.jpg",
  earnings: "earnings.jpg",
  landingHero: "hero.jpg",
  landingFeatures1: "Screenshot 2026-05-21 at 4.49.53 PM.jpg",
  landingFeatures2: "Screenshot 2026-05-21 at 4.49.59 PM.jpg",
  login: "Screenshot 2026-05-21 at 4.50.46 PM.jpg",
  messages: "messages.jpg",
  notifications: "Screenshot 2026-05-21 at 4.58.58 PM.jpg"
};

// --- SLIDE COMPONENTS ---

const Slide1_Title = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 md:space-y-8 animate-fade-in px-4">
    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl overflow-hidden border-4 border-white mb-2 md:mb-4">
      <img src={ASSETS.logo} alt="Embr Logo" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/d47b65/white?text=Embr'; }} />
    </div>
    <h1 className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.navy}`}>
      The Shopify of Creator Monetization
    </h1>
    <p className={`text-sm md:text-lg lg:text-2xl font-light ${theme.textMuted} max-w-3xl leading-relaxed`}>
      Fair Pay for Creators. Music Licensing Royalties for Artists. <br className="hidden sm:block"/>
      No Algorithms. No Ads. No Middleman.
    </p>
  </div>
);

const Slide2_Problem = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-6 md:mb-12 ${theme.navy}`}>Creator Economics Are Broken</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 flex-grow">
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <Play size={24} className="md:w-8 md:h-8" />
        </div>
        <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4">Exploitative Payouts</h3>
        <p className="text-gray-600 text-sm md:text-lg">Spotify pays artists a mere <span className="font-bold text-red-600">$0.003 - $0.005</span> per stream. Creators cannot survive on volume alone.</p>
      </div>
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <Users size={24} className="md:w-8 md:h-8" />
        </div>
        <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4">High Platform Taxes</h3>
        <p className="text-gray-600 text-sm md:text-lg">Patreon takes 8-12%. Upwork takes up to 20%. Platforms extract value rather than enabling it.</p>
      </div>
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <Layers size={24} className="md:w-8 md:h-8" />
        </div>
        <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4">Fragmented Tools</h3>
        <p className="text-gray-600 text-sm md:text-lg">Creators juggle Stripe, Discord, Patreon, and Substack just to piece together a living wage.</p>
      </div>
    </div>
  </div>
);

const Slide3_Solution = () => (
  <div className="flex flex-col md:flex-row h-full animate-fade-in p-4 md:p-8 gap-6 md:gap-12 items-center">
    <div className="flex-1 space-y-4 md:space-y-6">
      <h2 className={`text-2xl md:text-4xl font-bold ${theme.navy}`}>The All-In-One Ecosystem</h2>
      <p className="text-sm md:text-xl text-gray-600">Embr unifies 8 distinct verticals into one seamless, creator-owned platform. We invert the economics: <strong className={theme.accent}>Creators keep 90-98%.</strong></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-8">
        {['Social Feed & Groups', 'Freelance Gigs', 'Marketplace', 'Music Licensing', 'Events & Ticketing', 'Group Treasuries', 'Mutual Aid', 'Direct Messaging'].map((feature, i) => (
          <div key={i} className="flex items-center space-x-2 md:space-x-3 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100">
            <div className={`w-2 h-2 rounded-full ${theme.accentBg}`}></div>
            <span className="font-semibold text-xs md:text-base text-gray-800">{feature}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 w-full mt-6 md:mt-0">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 aspect-[4/3]">
        <img src={ASSETS.landingHero} alt="Embr Landing Page" className="w-full h-full object-cover object-top" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/fdfaf5/587b89?text=Embr+Platform+UI'; }} />
      </div>
    </div>
  </div>
);

const Slide4_Moat = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-2 md:mb-4 ${theme.navy}`}>Our Defensible Moat: <span className={theme.accent}>Music Licensing Splits</span></h2>
    <p className="text-sm md:text-xl text-gray-600 mb-6 md:mb-12">The only platform where artists earn royalties when their music is used in other creators' content.</p>

    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-10 flex-grow border border-orange-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#d47b65] to-[#587b89]"></div>

      <div className="flex flex-col md:flex-row items-stretch justify-between gap-2 md:gap-4 z-10">
        <div className="flex-1 text-center p-4 md:p-6">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-sm border border-blue-100">
            <Music className="text-blue-500" size={28} className="md:w-10 md:h-10" />
          </div>
          <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">Original Artist</h3>
          <p className="text-gray-500 text-xs md:text-sm">Uploads Track</p>
          <div className="mt-3 md:mt-4 inline-block bg-green-100 text-green-700 font-bold px-3 md:px-4 py-1 rounded-full text-sm md:text-lg">
            Gets 45%
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-12">
          <RefreshCw className={`${theme.accent} mb-2`} size={32} />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">Automated Split</span>
        </div>

        <div className="flex-1 text-center p-4 md:p-6">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-sm border border-orange-100">
            <TrendingUp className="text-orange-500" size={28} className="md:w-10 md:h-10" />
          </div>
          <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">Content Creator</h3>
          <p className="text-gray-500 text-xs md:text-sm">Uses track in post</p>
          <div className="mt-3 md:mt-4 inline-block bg-green-100 text-green-700 font-bold px-3 md:px-4 py-1 rounded-full text-sm md:text-lg">
            Gets 45%
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-8">
          <ChevronRight className={`text-gray-300`} size={28} />
        </div>

        <div className="flex-1 text-center p-4 md:p-6">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-inner border border-gray-200">
            <img src={ASSETS.logo} className="w-10 h-10 md:w-12 md:h-12 rounded-full opacity-80" alt="Embr" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-gray-700">Embr Platform</h3>
          <p className="text-gray-500 text-xs md:text-sm">Infrastructure</p>
          <div className="mt-3 md:mt-4 inline-block bg-gray-200 text-gray-700 font-bold px-3 md:px-4 py-1 rounded-full text-sm md:text-lg">
            Takes 10%
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide5_Product = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-2 ${theme.navy}`}>Production-Grade from Day One</h2>
    <p className="text-xs md:text-lg text-gray-600 mb-4 md:mb-8">849+ files of enterprise-level architecture, ready to scale.</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 flex-grow">
      {[
        { title: 'Freelance Gigs', icon: Briefcase, img: ASSETS.gigs },
        { title: 'Marketplace', icon: ShoppingBag, img: ASSETS.marketplace },
        { title: 'Community Groups', icon: Users, img: ASSETS.groups },
        { title: 'Direct Messages', icon: MessageCircle, img: ASSETS.messages },
        { title: 'Earnings & Wallet', icon: CreditCard, img: ASSETS.earnings },
        { title: 'Social Feed', icon: Globe, img: ASSETS.feed }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col group">
          <div className="h-24 md:h-40 bg-gray-100 overflow-hidden relative">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/e2e8f0/64748b?text=${item.title}`; }} />
          </div>
          <div className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3 bg-white">
            <item.icon className={theme.accent} size={16} className="md:w-5 md:h-5" />
            <h3 className="font-bold text-xs md:text-base text-gray-800">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Slide6_Market = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center ${theme.navy}`}>Massive Market Opportunity</h2>

    <div className="flex-grow flex items-center justify-center w-full">
      <div className="relative w-full max-w-4xl h-64 md:h-96 flex items-end justify-center">
        <div className="absolute bottom-0 w-full h-full bg-blue-50 rounded-t-2xl md:rounded-t-[3rem] border-t border-blue-200 flex flex-col items-center justify-start pt-4 md:pt-8 px-2">
          <span className="text-xl md:text-3xl font-extrabold text-blue-900">$100B+</span>
          <span className="text-blue-700 font-semibold uppercase tracking-widest text-xs md:text-sm">TAM: Creator Economy & Music</span>
        </div>

        <div className="absolute bottom-0 w-3/4 h-3/4 bg-blue-100 rounded-t-2xl md:rounded-t-[3rem] border-t border-blue-300 shadow-lg flex flex-col items-center justify-start pt-4 md:pt-8 px-2">
          <span className="text-lg md:text-3xl font-extrabold text-blue-900">$10B - $15B</span>
          <span className="text-blue-800 font-semibold uppercase tracking-widest text-xs md:text-sm text-center">SAM: Digital Creators Seeking Fair Payouts</span>
        </div>

        <div className="absolute bottom-0 w-1/2 h-1/2 bg-[#587b89] rounded-t-2xl md:rounded-t-[3rem] shadow-2xl flex flex-col items-center justify-center pb-3 md:pb-6 px-2">
          <span className="text-2xl md:text-4xl font-extrabold text-white mb-1 md:mb-2">$500M - $1B</span>
          <span className="text-blue-100 font-bold uppercase tracking-widest text-xs md:text-sm">SOM (Year 5)</span>
          <span className="text-blue-100 text-xs mt-1 md:mt-2 opacity-80">100K Creators × $100K GMV × 3%</span>
        </div>
      </div>
    </div>
  </div>
);

const Slide7_BusinessModel = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-2 md:mb-4 ${theme.navy}`}>Sustainable Unit Economics</h2>
    <p className="text-sm md:text-xl text-gray-600 mb-4 md:mb-8">95%+ Gross Margins. No ads required. Highly efficient capital model.</p>

    <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-grow">
      <div className="flex-1 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 border-b pb-3 md:pb-4">Revenue Streams</h3>
        <ul className="space-y-3 md:space-y-4">
          <li className="flex justify-between items-center gap-2">
            <span className="text-sm md:text-lg font-semibold flex items-center gap-2 md:gap-3"><ShoppingBag size={16} className="md:w-5 md:h-5 text-blue-500"/> Marketplace</span>
            <span className="font-bold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-md text-xs md:text-base">2% Fee</span>
          </li>
          <li className="flex justify-between items-center gap-2">
            <span className="text-sm md:text-lg font-semibold flex items-center gap-2 md:gap-3"><Briefcase size={16} className="md:w-5 md:h-5 text-purple-500"/> Freelance Gigs</span>
            <span className="font-bold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-md text-xs md:text-base">3% Fee</span>
          </li>
          <li className="flex justify-between items-center gap-2">
            <span className="text-sm md:text-lg font-semibold flex items-center gap-2 md:gap-3"><Users size={16} className="md:w-5 md:h-5 text-green-500"/> Group Treasuries</span>
            <span className="font-bold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-md text-xs md:text-base">2% Fee</span>
          </li>
          <li className="flex justify-between items-center gap-2">
            <span className="text-sm md:text-lg font-semibold flex items-center gap-2 md:gap-3"><Music size={16} className="md:w-5 md:h-5 text-orange-500"/> Music Licensing</span>
            <span className="font-bold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-md text-xs md:text-base">10% Fee</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col gap-3 md:gap-6">
        <div className="bg-[#587b89] text-white p-4 md:p-6 rounded-2xl shadow-lg flex-1 flex flex-col justify-center">
          <div className="text-xs md:text-sm uppercase tracking-widest text-blue-200 mb-2">Customer Acquisition Cost (CAC)</div>
          <div className="text-3xl md:text-5xl font-black mb-2">$50 - $150</div>
          <p className="text-xs md:text-base text-blue-100">Organic viral loops. Better economics = creator word-of-mouth.</p>
        </div>
        <div className="bg-[#d47b65] text-white p-4 md:p-6 rounded-2xl shadow-lg flex-1 flex flex-col justify-center">
          <div className="text-xs md:text-sm uppercase tracking-widest text-orange-200 mb-2">LTV : CAC Ratio</div>
          <div className="text-3xl md:text-5xl font-black mb-2">30:1 <span className="text-lg md:text-2xl font-normal opacity-80">to 150:1</span></div>
          <p className="text-xs md:text-base text-orange-100">High stickiness across 8 integrated verticals.</p>
        </div>
      </div>
    </div>
  </div>
);

const Slide8_Competition = () => {
  const competitors = [
    { name: 'Embr', highlight: true, data: { 'Creator Keeps': '90 - 98%', 'Integrated Verticals': '8', 'Music Licensing': '✅ Yes', 'Group Treasuries': '✅ Yes', 'Algorithm': 'Chronological' } },
    { name: 'Patreon', data: { 'Creator Keeps': '88 - 92%', 'Integrated Verticals': '1 (Subs)', 'Music Licensing': '❌ No', 'Group Treasuries': '❌ No', 'Algorithm': 'Chronological' } },
    { name: 'Spotify', data: { 'Creator Keeps': '$0.003/stream', 'Integrated Verticals': '1 (Streams)', 'Music Licensing': '❌ No', 'Group Treasuries': '❌ No', 'Algorithm': 'Black Box' } },
    { name: 'Upwork', data: { 'Creator Keeps': '80 - 95%', 'Integrated Verticals': '1 (Gigs)', 'Music Licensing': '❌ No', 'Group Treasuries': '❌ No', 'Algorithm': 'Search Rank' } }
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
      <h2 className={`text-2xl md:text-4xl font-bold mb-6 md:mb-10 ${theme.navy}`}>Competitive Positioning</h2>

      <div className="hidden md:block flex-grow overflow-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr>
                <th className="p-5 font-bold text-gray-500 uppercase tracking-wider text-sm">Feature</th>
                <th className="p-5 font-bold text-lg text-[#d47b65]">Embr</th>
                <th className="p-5 font-bold text-gray-500 text-sm">Patreon</th>
                <th className="p-5 font-bold text-gray-500 text-sm">Spotify</th>
                <th className="p-5 font-bold text-gray-500 text-sm">Upwork</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { label: 'Creator Keeps', embr: '90 - 98%', patreon: '88 - 92%', spotify: '$0.003/stream', upwork: '80 - 95%', embrColor: 'text-green-600 bg-green-50', spotifyColor: 'text-red-500' },
                { label: 'Integrated Verticals', embr: '8', patreon: '1 (Subs)', spotify: '1 (Streams)', upwork: '1 (Gigs)' },
                { label: 'Music Licensing', embr: '✅ Yes', patreon: '❌ No', spotify: '❌ No', upwork: '❌ No', embrColor: 'text-green-600' },
                { label: 'Group Treasuries', embr: '✅ Yes', patreon: '❌ No', spotify: '❌ No', upwork: '❌ No', embrColor: 'text-green-600' },
                { label: 'Algorithm Control', embr: 'Chronological', patreon: 'Chronological', spotify: 'Black Box', upwork: 'Search Rank', embrColor: 'text-green-600', spotifyColor: 'text-red-500' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-semibold text-sm">{row.label}</td>
                  <td className={`p-5 font-bold text-sm ${row.embrColor || 'text-gray-800'}`}>{row.embr}</td>
                  <td className="p-5 text-sm text-gray-600">{row.patreon}</td>
                  <td className={`p-5 text-sm ${row.spotifyColor || 'text-gray-600'}`}>{row.spotify}</td>
                  <td className="p-5 text-sm text-gray-600">{row.upwork}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden flex-grow overflow-y-auto space-y-3">
        {competitors.map((competitor, i) => (
          <div key={i} className={`rounded-xl p-4 border ${competitor.highlight ? 'bg-[#fdfaf5] border-[#d47b65] shadow-md' : 'bg-white border-gray-200'}`}>
            <h3 className={`font-bold text-lg mb-3 ${competitor.highlight ? 'text-[#d47b65]' : 'text-gray-700'}`}>{competitor.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="font-semibold text-gray-700">Creator Keeps:</span> <span className={competitor.highlight ? 'text-green-600 font-bold' : 'text-gray-600'}>{competitor.data['Creator Keeps']}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-gray-700">Verticals:</span> <span className="text-gray-600">{competitor.data['Integrated Verticals']}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-gray-700">Music Licensing:</span> <span className={competitor.highlight ? 'text-green-600 font-bold' : 'text-gray-400'}>{competitor.data['Music Licensing']}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-gray-700">Group Treasuries:</span> <span className={competitor.highlight ? 'text-green-600 font-bold' : 'text-gray-400'}>{competitor.data['Group Treasuries']}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-gray-700">Algorithm:</span> <span className="text-gray-600">{competitor.data['Algorithm']}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Slide9_Financials = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <h2 className={`text-2xl md:text-4xl font-bold mb-2 md:mb-4 ${theme.navy}`}>Path to Profitability</h2>
    <p className="text-sm md:text-xl text-gray-600 mb-6 md:mb-10">We reach break-even operations at just 10,000 creators (Month 24).</p>

    <div className="flex-grow flex items-end justify-center w-full gap-2 md:gap-4 h-64 md:h-96">
      <div className="flex-1 bg-white border border-gray-200 rounded-t-xl md:rounded-t-2xl flex flex-col justify-end p-3 md:p-6 relative group hover:bg-gray-50 transition-colors" style={{height: '40%'}}>
        <div className="absolute -top-10 md:-top-12 left-0 w-full text-center font-bold text-gray-400 uppercase tracking-widest text-xs md:text-base">Month 6</div>
        <div className="text-center">
          <div className="text-xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">500</div>
          <div className="text-xs md:text-sm text-gray-500 uppercase">Creators</div>
          <div className="mt-2 md:mt-4 text-sm md:text-lg font-semibold text-[#587b89]">$18K ARR</div>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-t-xl md:rounded-t-2xl flex flex-col justify-end p-3 md:p-6 relative group hover:bg-gray-50 transition-colors" style={{height: '60%'}}>
        <div className="absolute -top-10 md:-top-12 left-0 w-full text-center font-bold text-gray-400 uppercase tracking-widest text-xs md:text-base">Month 12</div>
        <div className="text-center">
          <div className="text-xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">2,000</div>
          <div className="text-xs md:text-sm text-gray-500 uppercase">Creators</div>
          <div className="mt-2 md:mt-4 text-sm md:text-xl font-semibold text-[#587b89]">$72K ARR</div>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-t from-[#587b89] to-[#769ba9] shadow-2xl rounded-t-xl md:rounded-t-2xl flex flex-col justify-end p-3 md:p-6 relative" style={{height: '100%'}}>
        <div className="absolute -top-10 md:-top-12 left-0 w-full text-center font-bold text-[#587b89] uppercase tracking-widest text-xs md:text-base">Month 24</div>
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">PROFITABLE</div>
        <div className="text-center text-white">
          <div className="text-3xl md:text-6xl font-black mb-1 md:mb-2">10,000</div>
          <div className="text-xs md:text-sm text-blue-100 uppercase tracking-widest">Creators</div>
          <div className="mt-3 md:mt-6 text-xl md:text-3xl font-bold text-white border-t border-white/20 pt-2 md:pt-4">$360K ARR</div>
        </div>
      </div>
    </div>
  </div>
);

const Slide10_Ask = () => (
  <div className="flex flex-col h-full animate-fade-in p-4 md:p-8">
    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md overflow-hidden bg-white">
        <img src={ASSETS.logo} alt="Embr Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <h2 className={`text-2xl md:text-4xl font-bold ${theme.navy}`}>The Ask</h2>
    </div>

    <div className="bg-[#2c3e50] text-white rounded-3xl shadow-2xl p-4 md:p-12 flex-grow flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
        <h3 className="text-lg md:text-2xl font-light text-blue-200 mb-2">Raising Pre-Seed</h3>
        <div className="text-5xl md:text-7xl font-black text-[#d47b65] mb-4 md:mb-6">$250K - $500K</div>
        <p className="text-sm md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-8">
          Fueling the GTM motion for our already-built, production-grade platform. Targeting Series A in 24 months.
        </p>
        <div className="inline-flex items-center justify-center md:justify-start gap-2 bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full text-blue-100 font-semibold border border-white/20 text-sm md:text-base">
          <Shield size={18} className="md:w-5 md:h-5" /> Data Moat Confirmed
        </div>
      </div>

      <div className="flex-1 bg-white/5 rounded-2xl p-4 md:p-8 border border-white/10 w-full">
        <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">Use of Funds</h4>
        <ul className="space-y-4 md:space-y-6">
          <li className="flex items-start gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.accentBg} flex items-center justify-center text-white font-bold flex-shrink-0 text-sm md:text-base`}>30%</div>
            <div className="min-w-0">
              <div className="font-bold text-sm md:text-lg">Engineering & Product</div>
              <div className="text-xs md:text-sm text-gray-400">CTO hire, infrastructure scaling</div>
            </div>
          </li>
          <li className="flex items-start gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#587b89] flex items-center justify-center text-white font-bold flex-shrink-0 text-sm md:text-base`}>50%</div>
            <div className="min-w-0">
              <div className="font-bold text-sm md:text-lg">Go-To-Market & Partnerships</div>
              <div className="text-xs md:text-sm text-gray-400">Creator seeding, GTM Lead, Marketing</div>
            </div>
          </li>
          <li className="flex items-start gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm md:text-base`}>20%</div>
            <div className="min-w-0">
              <div className="font-bold text-sm md:text-lg">Operations & Compliance</div>
              <div className="text-xs md:text-sm text-gray-400">Legal, Stripe reserves, Buffer</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---

const slides = [
  Slide1_Title,
  Slide2_Problem,
  Slide3_Solution,
  Slide4_Moat,
  Slide5_Product,
  Slide6_Market,
  Slide7_BusinessModel,
  Slide8_Competition,
  Slide9_Financials,
  Slide10_Ask
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Touch state for mobile swiping
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  }, []);

  // --- TOUCH HANDLERS ---
  const onTouchStart = (e) => {
    setTouchEndX(null); 
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center font-sans overflow-hidden select-none`}>
      
      {/* Container Update: 
        Changed to allow vertical scrolling on mobile if needed, 
        and added the touch event listeners here.
      */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="w-full max-w-6xl md:aspect-[16/9] h-screen md:min-h-[80vh] bg-[#fdfaf5] relative shadow-2xl md:rounded-2xl border border-gray-200 overflow-hidden flex flex-col"
      >

        <div className="flex-grow overflow-y-auto relative">
          <CurrentSlideComponent />
        </div>

        <div className="h-14 md:h-20 bg-white border-t border-gray-100 flex items-center justify-between px-3 md:px-8 z-50 shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <img src={ASSETS.logo} alt="Logo" className="w-5 h-5 md:w-8 md:h-8 rounded-full flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className={`font-bold text-base md:text-xl ${theme.navy} truncate`}>embr</span>
            <span className="text-gray-300 ml-2 text-xs md:text-sm hidden sm:inline whitespace-nowrap">Investor Deck</span>
          </div>

          <div className="flex gap-1 md:gap-2 flex-shrink-0">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? `w-5 md:w-8 ${theme.accentBg}` : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-1 md:gap-4 flex-shrink-0">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-1.5 md:p-2 rounded-full transition-colors ${currentSlide === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-1.5 md:p-2 rounded-full transition-colors ${currentSlide === slides.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronRight size={18} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-gray-400 text-sm mt-4 hidden md:flex items-center gap-2">
        <Globe size={16} /> Use <kbd className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-mono text-xs mx-1">←</kbd> and <kbd className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-mono text-xs mx-1">→</kbd> to navigate
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
}