import React, { useRef } from 'react';
import { Hero } from './Hero.tsx';
import { Showcase } from './Showcase.tsx';
import { FeatureFields } from './FeatureFields.tsx';
import { Process } from './Process.tsx';
import { CurriculumTable } from './CurriculumTable.tsx';
import { Faq } from './Faq.tsx';
import { FinalCta } from './FinalCta.tsx';
import { useRevealObserver } from './motion.ts';

interface LandingPageProps {
  onOpenWorkspace: () => void;
  onSelectTab: (tabId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenWorkspace, onSelectTab }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useRevealObserver(rootRef);

  return (
    <div className="landing" ref={rootRef}>
      <a className="skip-link" href="#showcase">
        Skip to the workspace
      </a>

      <Hero onOpenWorkspace={onOpenWorkspace} />
      <Showcase />
      <FeatureFields />
      <Process />
      <CurriculumTable onSelectTab={onSelectTab} />
      <Faq />
      <FinalCta onOpenWorkspace={onOpenWorkspace} onOpenAbout={() => onSelectTab('about')} />
    </div>
  );
};
