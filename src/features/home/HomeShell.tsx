"use client";

import { useRef } from "react";
import { useFaqAccordion, useScrollProgressBar, useScrollReveal } from "./effects";
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
  HomeWhy,
  HomeWorkloads,
} from "./HomeSections";

export function HomeShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useScrollProgressBar(scrollBarRef);
  useScrollReveal(rootRef);
  useFaqAccordion(rootRef);

  return (
    <div className="home-page" ref={rootRef}>
      <div className="home-scroll-bar" ref={scrollBarRef} />
      <HomeHero />
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
      <HomeFaq />
      <HomeCta />
    </div>
  );
}
