import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { 
  Sprout, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Phone, 
  Users, 
  Clock, 
  ClipboardList, 
  Wheat, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CROP_LIST } from '../common/CropPicker';

export const LandingPage: React.FC = () => {
  const { setRole, setFarmerTab, setOfficerTab, selectedCrop, setSelectedCrop, openAuthModal, t } = useApp();
  const [selectedCropName, setSelectedCropName] = useState(selectedCrop || 'Wheat');

  const handleSelectCrop = (cropName: string) => {
    setSelectedCropName(cropName);
    setSelectedCrop(cropName);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f2] bg-grid-pattern text-[#242b26] font-sans antialiased relative overflow-hidden farm-watermark-bg">
      
      {/* 🌾 FLOATING TRANSLUCENT AGRICULTURAL SKETCH BACKGROUND MOTIFS (Framer Style) */}
      <div className="absolute top-10 left-5 text-[#204e38]/10 pointer-events-none z-0 transform -rotate-12 animate-float">
        <Wheat className="w-64 h-64" />
      </div>
      <div className="absolute top-1/3 right-10 text-[#204e38]/10 pointer-events-none z-0 transform rotate-45 animate-float" style={{ animationDelay: '2s' }}>
        <Sprout className="w-72 h-72" />
      </div>
      <div className="absolute bottom-20 left-1/4 text-[#204e38]/10 pointer-events-none z-0 transform -rotate-6">
        <Wheat className="w-80 h-80" />
      </div>

      {/* Ambient Framer Green Glow Orbs */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-[#86c559]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#204e38]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* 🟢 TOP HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#f7f7f2]/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setRole('LANDING')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#86c559] flex items-center justify-center text-[#183624] shadow-sm group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-[#183624]" />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#18221b] leading-tight flex items-center gap-2">
                {t('brandName')}
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#5e6a5f] uppercase">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#485349]">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#204e38] transition-colors cursor-pointer"
            >
              {t('landingNavHowItWorks')}
            </button>
            <button 
              onClick={() => scrollToSection('why-kisansetu')}
              className="hover:text-[#204e38] transition-colors cursor-pointer"
            >
              {t('landingNavWhyKisanSetu')}
            </button>
            <button 
              onClick={() => {
                setRole('FARMER');
                setFarmerTab('find-centre');
              }}
              className="hover:text-[#204e38] transition-colors cursor-pointer"
            >
              {t('landingNavFindCentre')}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            <button
              onClick={() => openAuthModal('FARMER')}
              className="hidden sm:inline-block text-sm font-bold text-[#204e38] hover:text-[#153425] px-3 py-2 transition-colors cursor-pointer"
            >
              {t('landingFarmerLogin')}
            </button>

            <button
              onClick={() => openAuthModal('OFFICER')}
              className="bg-[#204e38] hover:bg-[#153425] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-full shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              {t('landingOfficerPortal')}
            </button>
          </div>
        </div>
      </header>

      {/* 🌾 HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e2eedd] text-[#204e38] px-3.5 py-1.5 rounded-full border border-[#c4dcbc] text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{t('landingHeroBadge')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#18221b] leading-[1.05]">
                {t('landingHeroHeading1')} <br />
                <span className="text-[#18221b]">{t('landingHeroHeading2')}</span> <br />
                <span className="gradient-text-green">{t('landingHeroHeading3')}</span>
              </h1>
            </div>

            {/* Paragraph Subtitle */}
            <p className="text-base sm:text-xl text-[#5e6a5f] max-w-xl font-normal leading-relaxed">
              {t('landingHeroSub')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openAuthModal('FARMER')}
                className="btn-pill-green text-base px-7 py-3.5"
              >
                <span>{t('landingBtnFarmer')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => openAuthModal('OFFICER')}
                className="btn-pill-white text-base px-7 py-3.5"
              >
                <ShieldCheck className="w-5 h-5 text-[#204e38]" />
                <span>{t('landingOfficerPortal')}</span>
              </button>
            </div>

            {/* Avatars & Social Proof Pill */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shadow">
                  SF
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center shadow">
                  VS
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-sky-200 text-sky-900 font-bold text-xs flex items-center justify-center shadow">
                  AM
                </div>
              </div>
              <span className="text-xs font-semibold text-[#717d72]">
                {t('landingMadeWithFarmers')}
              </span>
            </div>

            {/* 🌽 CREATIVE CROP SELECTOR BAR */}
            <div className="pt-6 border-t border-gray-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#5e6a5f] uppercase tracking-wider flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-[#204e38]" />
                  Select Crop to Preview Govt MSP Rate:
                </span>
                <span className="text-[11px] font-semibold text-[#204e38] bg-[#e2eedd] px-2.5 py-0.5 rounded-full">
                  2026-27 Approved
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CROP_LIST.map(crop => {
                  const isSelected = selectedCropName === crop.nameEn;
                  return (
                    <button
                      key={crop.id}
                      onClick={() => handleSelectCrop(crop.nameEn)}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#204e38] text-white shadow-md scale-105'
                          : 'bg-white text-[#242b26] border border-gray-200 hover:border-[#204e38]'
                      }`}
                    >
                      <span>{crop.iconSymbol}</span>
                      <span>{crop.nameEn}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                        ({crop.mspRate})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Tilted Visual Token Card Replica */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Backdrop Lime Circle Glow */}
            <div className="absolute -inset-4 bg-[#d8e6d1] rounded-full filter blur-2xl opacity-70 -z-10 transform scale-90"></div>
            
            {/* White Floating Card Component matching screenshot */}
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative group transition-transform duration-300 hover:-translate-y-1">
              
              {/* Header Label */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] font-bold tracking-widest text-[#768477] uppercase">
                    {t('landingTokenCardTag')}
                  </div>
                  <h3 className="text-xl font-bold text-[#18221b] mt-0.5">
                    {t('landingTokenCardHeading')}
                  </h3>
                </div>

                {/* Top-Right Green Diagonal Arrow Circle */}
                <div className="w-10 h-10 rounded-full bg-[#e6f0e2] text-[#204e38] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
              </div>

              {/* Card Row 1: Token Details */}
              <div className="bg-[#e6f0e2] rounded-2xl p-4 mb-3 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#86c559] flex items-center justify-center text-[#183624] shadow-sm">
                    <ClipboardList className="w-5 h-5 text-[#183624]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#18221b]">
                      {t('landingTokenCardItem1')}
                    </div>
                    <div className="text-xs text-[#5e6a5f] font-medium">
                      {t('landingTokenCardItem1Sub')}
                    </div>
                  </div>
                </div>

                <div className="bg-[#d5ebc6] text-[#1c4d29] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#bcdba6]">
                  <span className="w-2 h-2 rounded-full bg-[#204e38]"></span>
                  <span>{t('landingTokenCardItem1Badge')}</span>
                </div>
              </div>

              {/* Card Row 2: Time Window */}
              <div className="bg-[#faf6ee] rounded-2xl p-4 flex items-center gap-3.5 border border-[#eee4d2]">
                <div className="w-10 h-10 rounded-xl bg-[#f7d9a0] flex items-center justify-center text-[#6e4605]">
                  <Clock className="w-5 h-5 text-[#6e4605]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#18221b]">
                    {t('landingTokenCardItem2')}
                  </div>
                  <div className="text-xs text-[#5e6a5f] font-medium">
                    {t('landingTokenCardItem2Sub')}
                  </div>
                </div>
              </div>

              {/* Floating Bottom-Right Wheat Icon Badge */}
              <div className="absolute -bottom-5 -right-4 bg-[#204e38] text-white p-3.5 rounded-2xl shadow-xl hover:scale-110 transition-transform cursor-pointer border border-emerald-600">
                <Wheat className="w-6 h-6 text-[#aae084]" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🌉 SECTION 2: THE SIMPLE BRIDGE */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/60 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold tracking-widest text-[#717d72] uppercase mb-2">
            {t('landingSection2Tag')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18221b] leading-tight max-w-3xl">
            {t('landingSection2Heading')}
          </h2>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step Card 01 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover-card-lift relative group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-[#204e38] tracking-widest uppercase">
                01 / 03
              </span>
              <div className="w-10 h-10 rounded-full bg-[#f2f6f1] text-[#204e38] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-[#204e38]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#18221b] mb-3">
              {t('landingStep1Title')}
            </h3>
            <p className="text-sm text-[#5e6a5f] leading-relaxed font-normal">
              {t('landingStep1Sub')}
            </p>
          </div>

          {/* Step Card 02 (HIGHLIGHTED SAGE GREEN CARD REPLICA) */}
          <div className="bg-[#dee7d8] rounded-3xl p-8 border border-[#cbdac3] shadow-md hover:shadow-xl transition-all duration-300 hover-card-lift relative group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-[#204e38] tracking-widest uppercase">
                02 / 03
              </span>
              <div className="w-10 h-10 rounded-full bg-[#c9dcb9] text-[#204e38] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-[#204e38]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#18221b] mb-3">
              {t('landingStep2Title')}
            </h3>
            <p className="text-sm text-[#3d4d40] leading-relaxed font-normal">
              {t('landingStep2Sub')}
            </p>
          </div>

          {/* Step Card 03 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover-card-lift relative group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-[#204e38] tracking-widest uppercase">
                03 / 03
              </span>
              <div className="w-10 h-10 rounded-full bg-[#f2f6f1] text-[#204e38] flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-[#204e38]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#18221b] mb-3">
              {t('landingStep3Title')}
            </h3>
            <p className="text-sm text-[#5e6a5f] leading-relaxed font-normal">
              {t('landingStep3Sub')}
            </p>
          </div>

        </div>
      </section>

      {/* 🌿 SECTION 3: BUILT FOR THE FIELD */}
      <section id="why-kisansetu" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#e6eee2] rounded-3xl p-8 sm:p-12 border border-[#d2e2cd] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-extrabold tracking-widest text-[#5e6c5f] uppercase">
                {t('landingSection3Tag')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#18221b] tracking-tight leading-tight">
                {t('landingSection3Heading')}
              </h2>
              <p className="text-base text-[#4c594d] leading-relaxed">
                {t('landingSection3Sub')}
              </p>

              <button
                onClick={() => {
                  setRole('FARMER');
                  setFarmerTab('find-centre');
                }}
                className="inline-flex items-center gap-2 font-bold text-[#204e38] hover:text-[#153425] transition-colors group text-sm cursor-pointer pt-2"
              >
                <span>{t('landingExploreCentres')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Side: 2x2 Feature Cards Grid matching screenshot colors */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Feature 1: White Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between space-y-4 hover-card-lift">
                <Zap className="w-6 h-6 text-[#204e38]" />
                <div>
                  <h4 className="font-bold text-lg text-[#18221b] mb-1">
                    {t('landingFeature1Title')}
                  </h4>
                  <p className="text-xs text-[#5e6a5f] leading-relaxed">
                    {t('landingFeature1Sub')}
                  </p>
                </div>
              </div>

              {/* Feature 2: Dark Green Card REPLICA */}
              <div className="bg-[#153425] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover-card-lift border border-emerald-700/50">
                <ShieldCheck className="w-6 h-6 text-[#86c559]" />
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">
                    {t('landingFeature2Title')}
                  </h4>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {t('landingFeature2Sub')}
                  </p>
                </div>
              </div>

              {/* Feature 3: Warm Tan Card REPLICA */}
              <div className="bg-[#f5e4cd] rounded-3xl p-6 shadow-md border border-[#e8d2b2] flex flex-col justify-between space-y-4 hover-card-lift">
                <Phone className="w-6 h-6 text-[#754714]" />
                <div>
                  <h4 className="font-bold text-lg text-[#3d260c] mb-1">
                    {t('landingFeature3Title')}
                  </h4>
                  <p className="text-xs text-[#6e4e2b] leading-relaxed">
                    {t('landingFeature3Sub')}
                  </p>
                </div>
              </div>

              {/* Feature 4: Soft Teal Card REPLICA */}
              <div className="bg-[#d2e5df] rounded-3xl p-6 shadow-md border border-[#bddad2] flex flex-col justify-between space-y-4 hover-card-lift">
                <Users className="w-6 h-6 text-[#204e38]" />
                <div>
                  <h4 className="font-bold text-lg text-[#18221b] mb-1">
                    {t('landingFeature4Title')}
                  </h4>
                  <p className="text-xs text-[#45544e] leading-relaxed">
                    {t('landingFeature4Sub')}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 🏷️ CLEAN FOOTER */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80 mt-12 text-xs text-[#5e6a5f] relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#86c559] flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#183624]" />
            </div>
            <span className="font-bold text-[#18221b] text-sm">KisanSetu</span>
            <span className="text-[10px] tracking-wider text-[#717d72] uppercase font-bold">
              A SMARTER HARVEST DAY
            </span>
          </div>

          <div className="text-center font-medium">
            Smart India Hackathon 2026 · Prototype SIH26032
          </div>

          <div className="flex items-center gap-4 font-bold text-[#204e38]">
            <button 
              onClick={() => openAuthModal('FARMER')} 
              className="hover:underline cursor-pointer"
            >
              {t('landingFarmerLogin')}
            </button>
            <span>·</span>
            <button 
              onClick={() => openAuthModal('OFFICER')} 
              className="hover:underline cursor-pointer"
            >
              {t('landingOfficerPortal')}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
