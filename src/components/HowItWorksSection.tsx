import React from 'react';
import { Compass, AreaChart, BookOpen, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onSelectTab: (tabId: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onSelectTab }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter a calculation or choose a tool',
      description:
        'Select from equation solvers, parametric geometry canvases, multi-function coordinate plotters, physics kinematics, or STEM matrix computing suites.',
      icon: Compass,
      tag: 'Input & Formulate',
    },
    {
      step: '02',
      title: 'Explore the result, graph or diagram',
      description:
        'Interrogate interactive vector diagrams, inspect movable tangent slopes, review real and complex roots, and watch dynamic simulations react in real time.',
      icon: AreaChart,
      tag: 'Inspect & Visualize',
    },
    {
      step: '03',
      title: 'Understand the formula and mathematical steps',
      description:
        'Review transparent step-by-step proofs, KaTeX formatted symbolic derivations, discriminant classifications, and verified mathematical axioms.',
      icon: BookOpen,
      tag: 'Axioms & Proofs',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7957F5]" />
            <span>Workflow & Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            How CalcAura Works
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#A6A9B8]">
            Built to turn abstract formulas into concrete geometric models and verified analytical understanding.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white dark:bg-[#111321] rounded-2xl border border-slate-200 dark:border-white/12 p-6 sm:p-8 flex flex-col justify-between shadow-xs dark:shadow-lg hover:border-[#7957F5]/40 transition-all hover:-translate-y-1 group"
              >
                {/* Step indicator header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono tracking-tighter text-slate-200 dark:text-white/20 group-hover:text-[#7957F5] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#7957F5] group-hover:bg-[#7957F5]/20 group-hover:border-[#7957F5]/30 group-hover:text-[#7957F5] dark:group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[#D94BCB] font-semibold uppercase tracking-wider block mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#A6A9B8] group-hover:text-[#7957F5] transition-colors">
                  <span>Step {index + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
