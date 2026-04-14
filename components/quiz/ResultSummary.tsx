import { QuizResultBand } from "@/lib/quiz/types";

interface ResultSummaryProps {
  firstName?: string;
  score: number;
  band: QuizResultBand;
  maxScore?: number;
}

export function ResultSummary({ firstName, score, band, maxScore = 24 }: ResultSummaryProps) {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <section className="panel space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">Your assessment is complete</span>
        <h1 className="headline text-[32px] md:text-[40px] leading-tight break-words">
          {firstName ? firstName : "You"} are: <br/> 
          <span className="text-brand-accent">{band.label}</span>
        </h1>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="text-[96px] font-black leading-none tracking-tighter text-brand-accent selection:bg-brand-accent selection:text-brand-black">
          {percentage}%
        </div>
        <p className="text-[13px] uppercase tracking-[0.3em] text-brand-muted mt-2">Correlation Match</p>
      </div>

      <div className="pt-2 border-t border-brand-line/50">
        <p className="text-[15px] leading-relaxed text-brand-text max-w-sm mx-auto">
          {band.tagline}
        </p>
      </div>
      
      <div className="pt-2">
         <p className="text-[11px] text-brand-muted/60 italic">
           Detailed breakdown will be sent to your email.
         </p>
      </div>
    </section>
  );
}
