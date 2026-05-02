"use client";

import Lottie from "lottie-react";
import bigDataCenterAnimation from "../../../public/assets/lottie/big_data_center.json";
import storageAnimation from "../../../public/assets/lottie/animation.json";
import dataCenterAnimation from "../../../public/assets/lottie/data_center.json";
import gpuAnimation from "../../../public/assets/lottie/gpu.json";
import nodeAnimation from "../../../public/assets/lottie/node.json";
import serverRackAnimation from "../../../public/assets/lottie/database connection, transfer data on remote cloud storage, server rack.json";
import vpsAnimation from "../../../public/assets/lottie/vps.json";

interface ProductLottieVisualProps {
  label: string;
  type: "bigDataCenter" | "dataCenter" | "gpu" | "node" | "serverRack" | "storage" | "vps";
}

const animations = {
  bigDataCenter: bigDataCenterAnimation,
  dataCenter: dataCenterAnimation,
  gpu: gpuAnimation,
  node: nodeAnimation,
  serverRack: serverRackAnimation,
  storage: storageAnimation,
  vps: vpsAnimation,
};

export default function ProductLottieVisual({ label, type }: ProductLottieVisualProps) {
  return (
    <div className="product-lottie-visual" aria-label={label}>
      <Lottie
        animationData={animations[type]}
        autoplay
        loop
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
