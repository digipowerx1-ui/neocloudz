"use client";

import { useRef } from "react";
import { useFaqAccordion, useScrollReveal } from "./effects";
import { HomeHero } from "./HomeHero";
import {
  HomeCta,
  HomeFaq,
  HomeGpuCatalog,
  HomeLogos,
  HomeNvlink,
  HomePartners,
  HomePricing,
  HomeRack,
  HomeStorage,
  HomeTokenFactory,
  HomeWhy,
  HomeWorkloads,
} from "./HomeSections";

export function HomeShell() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollReveal(rootRef);
  useFaqAccordion(rootRef);

  return (
    <div className="home-page" ref={rootRef}>
      <HomeHero />
      <HomeTokenFactory />
      <div className="section-divider" />
      <HomePartners />
      <HomeWhy />
      <HomePricing />
      <HomeWorkloads />
      <HomeGpuCatalog />
      <div className="section-divider" />
      <HomeNvlink />
      <div className="section-divider" />
      <HomeLogos />
      <HomeRack />
      <div className="anim-divider" />

      <HomeStorage />
      <div className="section-divider" />
      <HomeFaq />
      <HomeCta />
    </div>
  );
}
