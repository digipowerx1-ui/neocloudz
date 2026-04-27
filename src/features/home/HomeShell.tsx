"use client";

import { useRef } from "react";
import { useFaqAccordion, useScrollProgressBar, useScrollReveal } from "./effects";
import { HomeHero } from "./HomeHero";
import {
  HomeBenchmark,
  HomeCta,
  HomeFaq,
  HomeGpuCatalog,
  HomeLogos,
  HomeNvlink,
  HomePricing,
  HomeRack,
  HomeStorage,
  HomeTicker,
  HomeWhy,
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
      <HomeTicker />
      <HomeGpuCatalog />
      <div className="section-divider" />
      <HomeNvlink />
      <div className="section-divider" />
      <HomeLogos />
      <HomeBenchmark />
      <HomeRack />
      <div className="anim-divider" />
      <HomePricing />
      <HomeWhy />
      <HomeStorage />
      <HomeFaq />
      <HomeCta />
    </div>
  );
}
