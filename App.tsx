import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Tender, TenderStatus, UserProfile, ContentLibrary, ESPDCompanyProfile } from './types';
import { MOCK_TENDERS } from './constants';
import { MOCK_CONTENT_LIBRARY } from './constants/contentLibrary';

// Views
import Auth from './views/Auth'; 
import Discovery from './views/Discovery';
import Workspace from './views/Workspace';
import Analytics from './views/Analytics';
import Results from './views/Results'; // Import the new View
import ProfileSettings from './views/ProfileSettings';
import Importer from './components/Importer';
import TenderModal from './components/TenderModal';
import TenderCard from './components/TenderCard';
import { Sparkles, TrendingUp, Bell } from 'lucide-react';

function App() {
  console.log('App component rendering...');
  
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // --- APP STATE ---
  const [currentView, setCurrentView] = useState('dashboard');
  const [tenders, setTenders] = useState<Tender[]>(() => {
    try {
      const saved = localStorage.getItem('tender_ai_tenders');
      return saved ? JSON.parse(saved) : MOCK_TENDERS;
    } catch (error) {
      console.error("Failed to load tenders from storage:", error);
      return MOCK_TENDERS; // Fallback to prevent crash
    }
  });
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [contentLibrary, setContentLibrary] = useState<ContentLibrary>(() => {
    try {
      const saved = localStorage.getItem('tender_ai_content_library');
      return saved ? JSON.parse(saved) : MOCK_CONTENT_LIBRARY;
    } catch (error) {
      console.error("Failed to load content library:", error);
      return MOCK_CONTENT_LIBRARY;
    }
  });

  // --- EFFECTS ---
  
  // Check for logged in user on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('tender_ai_profile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      localStorage.removeItem('tender_ai_profile');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tender_ai_tenders', JSON.stringify(tenders));
  }, [tenders]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('tender_ai_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('tender_ai_content_library', JSON.stringify(contentLibrary));
  }, [contentLibrary]);

  const [espdMasterProfile, setEspdMasterProfile] = useState<ESPDCompanyProfile | null>(() => {
    try {
      const saved = localStorage.getItem('tender_ai_espd_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (espdMasterProfile) {
      localStorage.setItem('tender_ai_espd_profile', JSON.stringify(espdMasterProfile));
    }
  }, [espdMasterProfile]);

  // --- HANDLERS ---

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
      localStorage.removeItem('tender_ai_profile');
      setIsAuthenticated(false);
      setUserProfile(null);
  };

  const handleTenderUpdate = (updatedTender: Tender) => {
    setTenders(prev => prev.map(t => t.id === updatedTender.id ? updatedTender : t));
    if (selectedTender && selectedTender.id === updatedTender.id) {
        setSelectedTender(updatedTender);
    }
  };

  const handleStatusChange = (id: string, status: TenderStatus) => {
    setTenders(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleDeleteTender = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tender? This action cannot be undone.')) {
      setTenders(prev => prev.filter(t => t.id !== id));
      setSelectedTender(null);
    }
  };

  const handleImport = (newTenders: Tender[]) => {
    setTenders(prev => [...newTenders, ...prev]);
    setCurrentView('discovery');
  };

  const handleTendersAdd = (newTenders: Tender[]) => {
    setTenders(prev => [...newTenders, ...prev]);
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  // --- RENDER LOGIC ---

  if (!isAuthenticated || !userProfile) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'discovery':
        return (
          <Discovery 
            tenders={tenders} 
            onTenderClick={setSelectedTender} 
            onTenderUpdate={handleTenderUpdate}
            onTendersAdd={handleTendersAdd}
            userProfile={userProfile}
          />
        );
      case 'workspace':
        return (
          <Workspace 
            tenders={tenders} 
            onStatusChange={handleStatusChange}
            onTenderClick={setSelectedTender}
            onTenderUpdate={handleTenderUpdate}
          />
        );
      case 'results':
        return (
          <Results 
            tenders={tenders}
            onTenderClick={setSelectedTender}
            userProfile={userProfile}
          />
        );
      case 'analytics':
        return <Analytics tenders={tenders} />;
      case 'settings':
        return (
          <ProfileSettings 
            profile={userProfile} 
            onSave={handleProfileUpdate} 
          />
        );
      case 'dashboard':
      default:
        return (
          <div className="space-y-8 bg-[#F8F8F8] min-h-full">
             {/* Dashboard Header */}
             <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                   <Sparkles size={200} />
                </div>
                <div className="relative z-10">
                   <h1 className="text-3xl font-light mb-2" style={{ fontWeight: 300 }}>Good Morning, {userProfile.companyName || 'User'}!</h1>
                   <p className="text-blue-100 text-lg max-w-2xl">
                     You have <span className="font-bold text-white">3 new recommendations</span> matching your interest in {userProfile.interestedBranches[0] || 'your sector'}. 
                     Your target is {userProfile.geoScope} markets.
                   </p>
                   <div className="mt-6 flex gap-3">
                      <button 
                        onClick={() => setCurrentView('discovery')}
                        className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        View Opportunities
                      </button>
                      <button 
                        onClick={() => setCurrentView('analytics')}
                        className="bg-blue-500/30 border border-blue-400/50 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-500/50 transition-colors backdrop-blur-sm"
                      >
                        Market Report
                      </button>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Recommended */}
                <div className="lg:col-span-2 space-y-4">
                   <div className="flex items-center justify-between">
                      <h2 className="text-xl font-light text-slate-900 flex items-center gap-2" style={{ fontWeight: 300 }}>
                         <Sparkles className="text-purple-600" size={20} />
                         Recommended for You
                      </h2>
                      <button onClick={() => setCurrentView('discovery')} className="text-blue-600 text-sm font-medium hover:underline">See All</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tenders.slice(0, 4).map(t => (
                         <TenderCard 
                           key={t.id} 
                           tender={t} 
                           onClick={setSelectedTender}
                           onUpdate={handleTenderUpdate}
                           userProfile={userProfile}
                        />
                      ))}
                   </div>
                </div>

                {/* Right: Import & Quick Stats */}
                <div className="space-y-6">
                   <Importer onImport={handleImport} />

                   {/* New Tenders Count */}
                   <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-slate-200/50 shadow-lg flex items-center justify-between card-hover">
                      <div>
                         <p className="text-sm font-light text-slate-500 uppercase" style={{ fontWeight: 300 }}>New Tenders</p>
                         <p className="text-3xl font-light text-slate-900 mt-2" style={{ fontWeight: 300 }}>
                            {tenders.filter(t => t.status === TenderStatus.NEW).length}
                         </p>
                         <p className="text-xs text-slate-400 mt-1">Waiting for review</p>
                      </div>
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                         <Bell size={24} />
                      </div>
                   </div>
                   
                   <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-slate-200/50 shadow-lg card-hover">
                      <div className="flex items-center gap-2 mb-4">
                         <TrendingUp className="text-green-600" />
                         <h3 className="font-light text-slate-900" style={{ fontWeight: 300 }}>Pipeline Velocity</h3>
                      </div>
                      <div className="space-y-4">
                         <div>
                            <div className="flex justify-between text-sm mb-1">
                               <span className="text-slate-600">Submitted Bids</span>
                               <span className="font-bold text-slate-900">12</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                               <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                            </div>
                         </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1">
                               <span className="text-slate-600">Pending Review</span>
                               <span className="font-bold text-slate-900">5</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                               <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }} />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout}>
      {renderContent()}
      
      {selectedTender && (
        <TenderModal 
          tender={selectedTender} 
          userProfile={userProfile}
          allTenders={tenders} // PASS ALL TENDERS FOR CLIENT HISTORY LOOKUP
          contentLibrary={contentLibrary}
          espdMasterProfile={espdMasterProfile}
          onClose={() => setSelectedTender(null)}
          onUpdate={handleTenderUpdate}
          onUpdateLibrary={setContentLibrary}
          onDelete={handleDeleteTender}
          onEspdProfileUpdate={setEspdMasterProfile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </Layout>
  );
}

export default App;