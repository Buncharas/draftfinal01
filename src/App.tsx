import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  User, 
  Bell, 
  GraduationCap, 
  Dribbble, 
  Utensils, 
  MessageCircle, 
  FileText, 
  Layers, 
  List, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Calendar, 
  MapPin, 
  BookOpen, 
  XCircle, 
  Plus, 
  Sun, 
  CloudSun, 
  Moon, 
  Trophy, 
  ShieldCheck, 
  Users, 
  Flame,
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

type Screen = 'welcome' | 'dashboard' | 'create' | 'profile' | 'explore';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'create':
        return <CreateActivityScreen onBack={() => setScreen('dashboard')} />;
      case 'profile':
        return <ProfileScreen />;
    }
  };

  if (screen === 'welcome') return <WelcomeScreen onStart={() => setScreen('dashboard')} />;

  return (
    <div className="min-h-screen pb-24 bg-surface">
      <TopBar />
      <main className="px-6 pt-20 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav active={screen} onNavigate={setScreen} />
      
      {screen === 'dashboard' && (
        <button 
          onClick={() => setScreen('create')}
          className="fixed bottom-28 right-6 w-16 h-16 bg-primary-container text-white rounded-full flex items-center justify-center shadow-[0_6px_0_0_#1557bb] border-2 border-white/20 pressable-3d z-40"
        >
          <Plus size={32} />
        </button>
      )}
    </div>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary overflow-hidden">
          <img 
            src="https://picsum.photos/seed/student/100/100" 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-2xl font-black tracking-tight text-primary font-headline">MaPao?</span>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-primary">
        <Bell size={24} />
      </button>
    </header>
  );
}

function BottomNav({ active, onNavigate }: { active: Screen, onNavigate: (s: Screen) => void }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/80 backdrop-blur-xl shadow-[0_-4px_24px_rgba(21,87,187,0.12)] rounded-t-[2.5rem]">
      {items.map((item) => {
        const isActive = active === item.id || (active === 'create' && item.id === 'dashboard');
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={cn(
              "flex flex-col items-center justify-center px-5 py-2 transition-all rounded-[1.5rem]",
              isActive ? "bg-blue-100 text-primary scale-105 -translate-y-0.5" : "text-slate-400 hover:text-primary"
            )}
          >
            <Icon size={24} fill={isActive ? "currentColor" : "none"} />
            <span className="font-bold text-[11px] tracking-wide uppercase mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-surface relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-3xl" />
      
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 bg-white rounded-xl shadow-[0_8px_0_0_#e7e8e8] border-2 border-slate-200 flex items-center justify-center transform -rotate-6">
          <GraduationCap size={64} className="text-primary" />
        </div>
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-tertiary/20 rounded-lg shadow-[0_6px_0_0_#d1e0c5] border-2 border-slate-200 flex items-center justify-center transform rotate-12">
          <Dribbble size={40} className="text-tertiary" />
        </div>
        <div className="absolute -bottom-2 -left-6 w-24 h-24 bg-blue-100 rounded-full shadow-[0_6px_0_0_#d2ceef] border-2 border-slate-200 flex items-center justify-center transform -rotate-12">
          <Utensils size={48} className="text-secondary" />
        </div>
      </div>

      <header className="mb-12 z-10">
        <h1 className="font-headline font-black text-4xl sm:text-5xl tracking-tight text-primary mb-4 leading-tight">
          Welcome to MaPao?
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-[320px] mx-auto">
          Coordinate study sessions, dining, sports, and more with your fellow students.
        </p>
      </header>

      <div className="w-full max-w-sm space-y-6 z-10">
        <button 
          onClick={onStart}
          className="pressable-3d w-full flex items-center justify-center gap-4 bg-line-green text-white font-headline font-bold text-xl py-5 px-8 rounded-xl shadow-[0_6px_0_0_#05a848] border-2 border-white/10"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-md">
            <MessageCircle size={20} className="text-line-green fill-current" />
          </div>
          Sign in with LINE
        </button>

        <button 
          onClick={onStart}
          className="pressable-3d w-full flex items-center justify-center gap-4 bg-white text-slate-900 font-headline font-bold text-xl py-5 px-8 rounded-xl shadow-[0_6px_0_0_#e7e8e8] border-2 border-slate-200"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
          Sign in with Google
        </button>
      </div>

      <footer className="mt-12 z-10">
        <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <Sparkles size={16} className="text-primary fill-current" />
          <p className="text-sm font-medium text-slate-500">
            Fast, one-click access. We'll pull your profile automatically.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
            Trusted by 50,000+ Students
          </p>
          <div className="flex -space-x-2 mt-2">
            {[1, 2, 3].map(i => (
              <img 
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white" 
                src={`https://picsum.photos/seed/user${i}/100/100`} 
                alt="user"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-white flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">+12k</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-6">Your Week at a Glance</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {[
            { day: 'Mon', date: 12 },
            { day: 'Tue', date: 13, active: true },
            { day: 'Wed', date: 14 },
            { day: 'Thu', date: 15 },
            { day: 'Fri', date: 16 },
          ].map((item) => (
            <div 
              key={item.date}
              className={cn(
                "flex-shrink-0 w-20 aspect-[3/4] rounded-lg flex flex-col items-center justify-center snap-start border-2",
                item.active 
                  ? "bg-primary text-white shadow-[0_8px_0_0_#004baa] -translate-y-1 border-transparent" 
                  : "bg-white text-slate-900 border-slate-100"
              )}
            >
              <span className={cn("font-bold text-xs uppercase tracking-widest", item.active ? "text-white/80" : "text-slate-400")}>
                {item.day}
              </span>
              <span className="text-2xl font-black font-headline">{item.date}</span>
              {item.active && <div className="mt-2 w-2 h-2 rounded-full bg-white" />}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline text-xl font-bold">Upcoming Events</h3>
          <button className="text-primary font-bold text-sm">See all</button>
        </div>
        <div className="bg-white rounded-lg p-6 relative overflow-hidden border-2 border-slate-100 shadow-[0_4px_0_0_#e1e3e3]">
          <div className="absolute top-0 right-0">
            <div className="bg-red-500 text-white px-4 py-1 rounded-bl-lg font-bold text-xs uppercase tracking-tighter">
              Important
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Study Session</p>
              <h4 className="text-2xl font-black font-headline leading-tight">Exam Prep with Sarah J.</h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={18} className="text-primary" />
              <span className="text-sm font-semibold">Tues, 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin size={18} className="text-primary" />
              <span className="text-sm font-semibold">Main Library</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-500">Attendance Status</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
              </div>
            </div>
            <div className="h-4 w-full bg-slate-200 rounded-full flex overflow-hidden">
              <div className="h-full bg-emerald-500 w-1/2" />
              <div className="h-full bg-amber-500 w-1/3 border-x border-white/20" />
              <div className="h-full bg-red-500 w-1/6" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <span>Confirmed: 3</span>
              <span>Waiting: 2</span>
              <span>Declined: 1</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-headline text-xl font-bold mb-4">Pending Invites</h3>
        <div className="bg-emerald-50 rounded-lg p-6 border-2 border-emerald-100 shadow-[0_4px_0_0_#d1e0c5]">
          <div className="flex gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border-2 border-white">
              <img src="https://picsum.photos/seed/cafe/100/100" alt="Cafe" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Lunch Invite</p>
              <h4 className="text-xl font-black font-headline">Dining at Campus Cafe</h4>
              <p className="text-sm text-emerald-800 mt-1 font-medium">from <strong>Mike</strong></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="pressable-3d flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-[0_4px_0_0_#059669] flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              Confirm
            </button>
            <button className="pressable-3d flex-1 bg-white text-red-500 py-3 rounded-xl font-bold border-2 border-red-500/10 shadow-[0_4px_0_0_#f1f5f9] flex items-center justify-center gap-2">
              <XCircle size={18} />
              Decline
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExploreScreen() {
  const categories = [
    { name: 'All', icon: Layers, active: true },
    { name: 'Study', icon: BookOpen },
    { name: 'Dining', icon: Utensils },
    { name: 'Sports', icon: Dribbble },
    { name: 'Social', icon: Users },
  ];

  const activities = [
    {
      id: 1,
      title: 'Study Group #4',
      type: 'Study',
      time: 'Starting in 15 mins',
      members: 4,
      image: 'https://picsum.photos/seed/study4/200/200',
      hot: true
    },
    {
      id: 2,
      title: 'Pizza Night @ Cafe',
      type: 'Dining',
      time: 'Today, 7:00 PM',
      members: 12,
      image: 'https://picsum.photos/seed/pizza/200/200',
      hot: false
    },
    {
      id: 3,
      title: 'Evening Basketball',
      type: 'Sports',
      time: 'Tomorrow, 5:00 PM',
      members: 8,
      image: 'https://picsum.photos/seed/hoops/200/200',
      hot: true
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-6">Explore Nexus</h2>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Compass size={20} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search activities, groups, or friends..."
            className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border-2",
                cat.active 
                  ? "bg-primary text-white border-primary shadow-md" 
                  : "bg-white text-slate-500 border-slate-100 hover:border-primary/30"
              )}
            >
              <cat.icon size={16} />
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold">Trending Nearby</h3>
          <Flame size={20} className="text-orange-500 fill-current" />
        </div>
        
        <div className="grid gap-6">
          {activities.map((act) => (
            <div key={act.id} className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-[0_4px_0_0_#f1f5f9] flex items-center gap-4 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={act.image} alt={act.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {act.hot && (
                  <div className="absolute top-1 right-1 bg-orange-500 text-white p-1 rounded-full">
                    <Flame size={12} fill="currentColor" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">{act.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{act.members} members</span>
                </div>
                <h4 className="font-headline font-bold text-lg truncate">{act.title}</h4>
                <p className="text-sm text-slate-500 font-medium">{act.time}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-container/10 p-8 rounded-3xl border-2 border-dashed border-primary/20 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Users size={32} className="text-primary" />
        </div>
        <h4 className="font-headline font-bold text-xl mb-2">Can't find what you're looking for?</h4>
        <p className="text-slate-500 text-sm mb-6">Create your own activity and invite your friends to join!</p>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold pressable-3d shadow-[0_4px_0_0_#004baa]">
          Start New Group
        </button>
      </section>
    </div>
  );
}

function CreateActivityScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-2">Create New Activity</h1>
        <p className="text-slate-500 font-medium">Design your perfect moment with the Nexus smart engine.</p>
      </section>

      <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 border border-slate-100">
        <div className="space-y-2">
          <label className="font-headline font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Activity Name
          </label>
          <input 
            className="w-full bg-slate-50 border-none rounded-lg px-4 py-4 text-lg font-medium focus:ring-2 focus:ring-primary focus:bg-white transition-all" 
            placeholder="Weekly Study Jam or Pizza Night?" 
            type="text" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-headline font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers size={18} className="text-primary" />
              Category
            </label>
            <select className="w-full bg-slate-50 border-none rounded-lg px-4 py-4 font-medium focus:ring-2 focus:ring-primary transition-all appearance-none">
              <option>Work</option>
              <option>Dining</option>
              <option>Exercise</option>
              <option>Travel</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-headline font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <List size={18} className="text-primary" />
              Priority
            </label>
            <div className="flex gap-2">
              {['Chill', 'Important', 'Urgent'].map(p => (
                <button 
                  key={p}
                  className={cn(
                    "flex-1 py-3 px-2 rounded-lg font-bold text-[10px] uppercase transition-all",
                    p === 'Important' ? "bg-primary text-white scale-105 ring-2 ring-primary" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline font-extrabold text-xl">Participants</h3>
          <button className="text-primary font-bold text-sm flex items-center gap-1">
            <UserPlus size={18} />
            Add Friends
          </button>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 w-14 rounded-full ring-4 ring-white overflow-hidden bg-slate-200">
              <img src={`https://picsum.photos/seed/friend${i}/100/100`} alt="friend" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
          <div className="h-14 w-14 rounded-full ring-4 ring-white bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
            +8
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary-container p-1 rounded-lg shadow-lg">
        <div className="bg-white rounded-[1.8rem] p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Sparkles size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-widest">Smart Scheduler</p>
              <h2 className="font-headline text-2xl font-extrabold">Finding the best time...</h2>
            </div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <BadgeCheck size={32} className="text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">Fastest Common Free Time</p>
                <p className="text-xl font-extrabold text-emerald-900">Friday, 4:00 PM - 6:00 PM</p>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-primary font-black">100% available</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Backup Opt 1</p>
              <p className="font-bold">Mon, 10:00 AM</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Backup Opt 2</p>
              <p className="font-bold">Wed, 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-headline font-extrabold text-xl shadow-[0_6px_0_0_#004baa] flex items-center justify-center gap-3 pressable-3d"
      >
        <Send size={24} fill="currentColor" />
        Send Invites
      </button>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="space-y-8">
      <section className="relative">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight">Alex Chen</h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-[240px]">
              Computer Science @ Uni | Coffee Enthusiast
            </p>
          </div>
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary-container rotate-3 flex items-center justify-center overflow-hidden border-2 border-primary shadow-lg">
              <img 
                src="https://picsum.photos/seed/alex/200/200" 
                alt="Alex" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-primary text-sm font-bold border border-blue-200">Undergrad</span>
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">Developer</span>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg border-2 border-slate-100 shadow-[4px_4px_0px_rgba(21,87,187,0.1)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-xl font-bold flex items-center gap-2">
            <ShieldCheck size={24} className="text-primary" />
            Reliability Score
          </h2>
          <span className="text-3xl font-black text-primary">98%</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Attendance</p>
            <p className="text-2xl font-extrabold">45 <span className="text-sm font-normal text-slate-400">events</span></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">On-Time</p>
            <p className="text-2xl font-extrabold">42 <span className="text-sm font-normal text-slate-400">times</span></p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-lg font-bold">Achievements</h3>
        <div className="flex justify-between items-center bg-slate-50 p-6 rounded-lg border-2 border-dashed border-slate-200">
          {[
            { label: '5 GOLD', color: '#FFD700' },
            { label: '8 SILVER', color: '#C0C0C0' },
            { label: '2 BRONZE', color: '#CD7F32' },
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group">
              <div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform border-4"
                style={{ borderColor: m.color }}
              >
                <Trophy size={32} style={{ color: m.color }} fill={m.color} />
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: m.color }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-lg font-bold">Weekly Hustle</h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-slate-400">✅ FREE</span>
            <span className="text-[10px] font-bold text-slate-400">🔴 BUSY</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border-2 border-slate-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-8 border-b border-slate-100">
            <div className="p-2 border-r border-slate-100 bg-slate-50" />
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
              <div key={d} className="p-2 text-center text-[10px] font-black border-r border-slate-100 last:border-r-0">{d}</div>
            ))}
          </div>
          {[
            { icon: Sun, data: ['✅', '🔴', '✅', '🔴', '✅', '🟡', '🟡'] },
            { icon: CloudSun, data: ['🔴', '🔴', '🔴', '🔴', '🔴', '✅', '✅'] },
            { icon: Moon, data: ['🟡', '✅', '✅', '✅', '✅', '✅', '✅'] },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-8 border-b border-slate-100 last:border-b-0">
              <div className="p-2 border-r border-slate-100 bg-slate-50 flex items-center justify-center">
                <row.icon size={16} className="text-slate-400" />
              </div>
              {row.data.map((cell, j) => (
                <div key={j} className="p-2 flex justify-center border-r border-slate-100 last:border-r-0 text-lg">{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-extrabold text-xl rounded-xl shadow-[0_6px_0_0_#004baa] pressable-3d">
        Connect with Alex
      </button>
    </div>
  );
}
