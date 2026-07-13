import type { Metadata } from "next";
import { GameModeProvider } from "@/components/solarcards/GameModeContext";
import { SolarNavigation } from "@/components/solarcards/SolarNavigation";
import { MissionControl } from "@/components/solarcards/MissionControl";
import { SolarHero } from "@/components/solarcards/SolarHero";
import { MissionSelector } from "@/components/solarcards/MissionSelector";
import { QuickRules } from "@/components/solarcards/QuickRules";
import { DeckOrbit } from "@/components/solarcards/DeckOrbit";
import { BattlefieldSetup } from "@/components/solarcards/BattlefieldSetup";
import { TurnOrbit } from "@/components/solarcards/TurnOrbit";
import { ActionCards } from "@/components/solarcards/ActionCards";
import { BattlefieldDiagram } from "@/components/solarcards/BattlefieldDiagram";
import { DrawExamples } from "@/components/solarcards/DrawExamples";
import { VictoryPaths } from "@/components/solarcards/VictoryPaths";
import { CosmicQuestions } from "@/components/solarcards/CosmicQuestions";
import { FinalCta } from "@/components/solarcards/FinalCta";
import { CometDivider } from "@/components/solarcards/CometDivider";

export const metadata: Metadata = {
  title: "How to Play Battle Mode — SolarCards",
  description:
    "The complete SolarCards Battle Mode manual: choose your mission, build your deck, master the turn orbit and claim victory.",
};

export default function HowToPlayPage() {
  return (
    <GameModeProvider>
      <SolarNavigation />
      <main>
        <SolarHero />
        <MissionControl />
        <div className="starfield-dense">
          <MissionSelector />
          <CometDivider fromColor="#FFD84A" toColor="#79E8FF" />
          <QuickRules />
          <CometDivider fromColor="#79E8FF" toColor="#3F9EFF" />
          <DeckOrbit />
          <CometDivider fromColor="#3F9EFF" toColor="#A276FF" />
          <BattlefieldSetup />
          <CometDivider fromColor="#A276FF" toColor="#FFD84A" />
          <TurnOrbit />
          <CometDivider fromColor="#FFD84A" toColor="#FF8A24" />
          <ActionCards />
          <CometDivider fromColor="#FF8A24" toColor="#79E8FF" />
          <BattlefieldDiagram />
          <CometDivider fromColor="#79E8FF" toColor="#79E8FF" />
          <DrawExamples />
          <CometDivider fromColor="#79E8FF" toColor="#FFD84A" />
          <VictoryPaths />
          <CometDivider fromColor="#FFD84A" toColor="#FF4FA3" />
          <CosmicQuestions />
        </div>
        <FinalCta />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-ink-muted">
        <p>SolarCards Battle Mode · A SolarBalls game</p>
      </footer>
    </GameModeProvider>
  );
}
