"use client";

import { useRef } from "react";
import { useFaqAccordion, useScrollReveal } from "./effects";
import { HomeHero } from "./HomeHero";
import {
  HomeAIModels,
  HomeCta,
  HomeFaq,
  HomeGpuCatalog,
  HomeNvlink,
  HomePartners,
  HomeRack,
  HomeStorage,
  HomeWhy,
} from "./HomeSections";

export function HomeShell() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollReveal(rootRef);
  useFaqAccordion(rootRef);

  return (
    <div className="home-page" ref={rootRef}>
      <HomeHero />
      <HomeAIModels />
      <div className="section-divider" />
      <HomePartners />
      <HomeWhy />
      <div className="section-divider" />
      <HomeGpuCatalog />
      <div className="section-divider" />
      <HomeNvlink />
      <div className="section-divider" />
      <HomeRack />
      <div className="anim-divider" />

      <HomeStorage />
      <div className="section-divider" />
      <HomeFaq />
      <HomeCta />
    </div>
  );
}
