import React from 'react';
import {
  Lock,
  ArrowRight,
  BookOpen,
  Layout,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Aurora, Reveal, Tilt3D } from '../ui/Depth.tsx';
import '../../styles/history.css';

interface CinematicHistoryLandingProps {
  onSignIn: () => void;
  onRegister: () => void;
}

export const CinematicHistoryLanding: React.FC<CinematicHistoryLandingProps> = ({
  onSignIn,
  onRegister,
}) => {
  return (
    <div className="hist-gate">
      <Aurora className="hist-gate__aurora" />

      <div className="hist-gate__inner shell">
        <div className="hist-gate__head">
          <span className="hist-gate__eyebrow">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            CalcAura private vault
            <span className="hist-gate__dot" aria-hidden="true" />
            Login required
          </span>

          <h1 className="hist-gate__title">
            <span>Your work.</span>
            <em>Always within reach.</em>
          </h1>

          <p className="hist-gate__lead">
            Keep your learning progress and saved whiteboards together in one personal
            workspace. Sign in to revisit submitted solutions, worked proofs, and creative
            boards whenever you need them.
          </p>

          <div className="hist-gate__actions">
            <button type="button" className="btn" onClick={onSignIn}>
              <span>Sign in to access</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" className="btn btn--ghost" onClick={onRegister}>
              <span>Create a free account</span>
            </button>
          </div>

          <ul className="hist-gate__facts">
            <li>
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              Private by default
            </li>
            <li>
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              Session-scoped history
            </li>
            <li>
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              No draft clutter
            </li>
          </ul>
        </div>

        {/* Two concrete previews, not abstract promises. */}
        <div className="hist-gate__previews">
          <Reveal delay={80}>
            <Tilt3D className="hist-preview" strength={5}>
              <div className="hist-preview__top">
                <span className="hist-preview__icon" aria-hidden="true">
                  <BookOpen className="w-4 h-4" />
                </span>
                <div>
                  <span className="hist-preview__cat">Category 1 · Interactive practice</span>
                  <h2 className="hist-preview__title">Class 10 · Quadratic equations</h2>
                </div>
                <span className="hist-preview__seal">Sample report</span>
              </div>

              <div className="hist-preview__score">
                <div>
                  <strong>18 / 20</strong>
                  <span>Score · 90%</span>
                </div>
                <div>
                  <strong>18 correct</strong>
                  <span>2 to review</span>
                </div>
                <div>
                  <strong>12m 45s</strong>
                  <span>Time taken</span>
                </div>
              </div>

              <div className="hist-preview__question">
                <div className="hist-preview__qhead">
                  <span>Q1 · Review preview</span>
                  <span className="hist-preview__ok">
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Correct
                  </span>
                </div>
                <p className="hist-preview__q">Find the roots of 2x² − 7x + 3 = 0.</p>
                <div className="hist-preview__options">
                  <span className="hist-preview__option is-correct">
                    A. x = 3, x = ½
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span className="hist-preview__option">B. x = −3, x = −½</span>
                </div>
                <p className="hist-preview__explain">
                  <strong>Explanation.</strong> Factorise 2x² − 6x − x + 3 = 0 → (2x − 1)(x − 3) = 0.
                </p>
              </div>

              <div className="hist-preview__foot">
                <span>
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  Submitted after the full test
                </span>
                <span className="hist-preview__unlock">
                  Sign in to unlock <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </Tilt3D>
          </Reveal>

          <Reveal delay={170}>
            <Tilt3D className="hist-preview hist-preview--board" strength={5}>
              <div className="hist-preview__top">
                <span className="hist-preview__icon" aria-hidden="true">
                  <Layout className="w-4 h-4" />
                </span>
                <div>
                  <span className="hist-preview__cat">Category 2 · Saved whiteboards</span>
                  <h2 className="hist-preview__title">Calculus, vectors &amp; coordinate proofs</h2>
                </div>
                <span className="hist-preview__seal">Sample board</span>
              </div>

              <div className="hist-preview__board">
                <div className="hist-preview__sheet-tabs">
                  <span className="is-active">Sheet 1 · Vector field</span>
                  <span>Sheet 2 · Trigonometry</span>
                  <span className="is-muted">+1 more</span>
                </div>

                <div className="hist-preview__canvas">
                  <svg viewBox="0 0 300 120" aria-hidden="true">
                    <line x1="20" y1="90" x2="280" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <path
                      d="M 60 90 Q 140 10 220 90 T 280 40"
                      fill="none"
                      stroke="var(--accent-strong)"
                      strokeWidth="2.5"
                    />
                    <circle cx="140" cy="50" r="4" fill="var(--accent)" />
                    <text x="150" y="45" fill="var(--accent)" fontSize="10" fontFamily="serif">
                      tangent (x₀, y₀)
                    </text>
                  </svg>

                  <span className="hist-preview__formula">e^(iπ) + 1 = 0</span>
                  <span className="hist-preview__layers">3 sheets · 28 layer objects</span>

                  <div className="hist-preview__canvas-foot">
                    <span>Manual save required</span>
                    <span>Today, 10:15</span>
                  </div>
                </div>
              </div>

              <div className="hist-preview__foot">
                <span>
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  Manual save only · no draft clutter
                </span>
                <span className="hist-preview__unlock">
                  Sign in to restore <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </Tilt3D>
          </Reveal>
        </div>

        <Reveal className="hist-gate__assurance" delay={220}>
          <div>
            <span className="hist-gate__assurance-icon" aria-hidden="true">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <h3>Private by default, client isolated</h3>
              <p>
                Your history is associated with your own session. Nothing is shared with other
                accounts and nothing is used for advertising.
              </p>
            </div>
          </div>
          <button type="button" className="btn btn--sm" onClick={onSignIn}>
            Authenticate now
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </div>
  );
};
