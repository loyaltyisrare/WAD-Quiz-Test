"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { LeadGateForm } from "@/components/quiz/LeadGateForm";
import { getSessionState, saveLead } from "@/lib/quiz/storage";
import { SessionLead } from "@/lib/quiz/types";
import { scoreFromAnswers } from "@/lib/quiz/scoring";

export default function LeadPage() {
  const router = useRouter();

  useEffect(() => {
    const state = getSessionState();
    // Redirect back to home if no answers
    if (Object.keys(state.answers || {}).length === 0) {
      router.push("/");
    }
    // If already has lead, skip to result
    if (state.lead) {
      router.push("/quiz/result");
    }
  }, [router]);

  async function handleLeadSubmit(lead: SessionLead) {
    saveLead(lead);
    const state = getSessionState();
    const score = scoreFromAnswers(state.answers);
    
    // Attempt to persist to database (local endpoint handle)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lead, 
          score,
          sessionId: state.sessionId,
          recordedAt: new Date().toISOString(),
          tracking: state.tracking 
        })
      });
    } catch (error) {
      console.error("Failed to persist lead:", error);
    }

    router.push("/quiz/result");
  }

  return (
    <ScreenFrame>
      <div className="px-4">
        <LeadGateForm onSubmit={handleLeadSubmit} />
      </div>
    </ScreenFrame>
  );
}
