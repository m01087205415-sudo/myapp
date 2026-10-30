/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { WorkAppsSection } from './components/WorkAppsSection';
import { CreativeAppsSection } from './components/CreativeAppsSection';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { StorySection } from './components/StorySection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { ScreenshotModal } from './components/ScreenshotModal';
import { AppItem } from './data/appsData';

export default function App() {
  const [activeModalApp, setActiveModalApp] = useState<AppItem | null>(null);

  const handleOpenModal = (app: AppItem) => {
    setActiveModalApp(app);
  };

  const handleCloseModal = () => {
    setActiveModalApp(null);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#CBD5E1] font-sans antialiased selection:bg-blue-600/30 selection:text-white">
      {/* Sticky Navigation Header */}
      <HeaderNav />

      {/* Main Sections */}
      <main>
        {/* SECTION 01: HERO */}
        <HeroSection />

        {/* SECTION 02: BEFORE & AFTER */}
        <BeforeAfterSection />

        {/* SECTION 03: APP SHOWCASE (4 HR Core Tools) */}
        <WorkAppsSection onPreviewClick={handleOpenModal} />

        {/* SECTION 04: CREATIVE PROJECTS (Company Web & Tarot) */}
        <CreativeAppsSection onPreviewClick={handleOpenModal} />

        {/* SECTION 05: SCREENSHOT GALLERY */}
        <ScreenshotGallery onSelectApp={handleOpenModal} />

        {/* SECTION 06: DEVELOPMENT STORY */}
        <StorySection />
      </main>

      {/* SECTION 07: FINAL CTA & FOOTER */}
      <FinalCtaAndFooter />

      {/* Lightbox / Zoom Modal */}
      <ScreenshotModal app={activeModalApp} onClose={handleCloseModal} />
    </div>
  );
}
