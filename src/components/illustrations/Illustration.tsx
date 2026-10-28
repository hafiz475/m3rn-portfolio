import React from 'react';
import type { ArtId } from './palette';
import { BotBuilderCover, CarzMotoCover, Direction7Cover, HelpCover, MyLifeJourneyCover, SiratCover } from './covers';
import {
  BotDraftLiveFigure,
  CarzIntentFigure,
  Direction7SourceFigure,
  HelpRuleFigure,
  MljIterationsFigure,
  SiratReviewFigure,
} from './figures';
import { AckumenArt, CalyArt, ChatOpsArt, Direction7BillingArt, FitTrackerArt, NeoNinjaArt, SmartAssistantArt, VamosysArt } from './projectArt';

const ART: Record<ArtId, React.FC<{ className?: string }>> = {
  sirat: SiratCover,
  'direction7-messages': Direction7Cover,
  'bizmagnets-bot-builder': BotBuilderCover,
  'help-knowledge-map': HelpCover,
  'carz-moto': CarzMotoCover,
  'my-life-journey': MyLifeJourneyCover,
  'fig-sirat-review': SiratReviewFigure,
  'fig-d7-single-source': Direction7SourceFigure,
  'fig-bot-draft-live': BotDraftLiveFigure,
  'fig-help-rule': HelpRuleFigure,
  'fig-carz-intent': CarzIntentFigure,
  'fig-mlj-iterations': MljIterationsFigure,
  'chatops-health': ChatOpsArt,
  vamosys: VamosysArt,
  caly: CalyArt,
  'direction7-billing': Direction7BillingArt,
  'smart-assistant': SmartAssistantArt,
  fittracker: FitTrackerArt,
  'neo-ninja': NeoNinjaArt,
  ackumen: AckumenArt,
};

/** Renders one of the site's SVG illustrations by id. Covers fill their box; figures keep their full drawing. */
export const Illustration: React.FC<{ id: ArtId; className?: string }> = ({ id, className }) => {
  const Component = ART[id];
  return <Component className={className} />;
};
