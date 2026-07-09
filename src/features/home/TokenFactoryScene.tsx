"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GREEN = 0x3dff7a;
const GREEN_HI = 0xa8ffc4;
const LIME = 0xc6ff4a;
const COIN_R = 3.0;
const COIN_T = 0.42;
const COIN_Y = 6.0;
const FLIP_DUR = 5.0;
const HOVER_SPIN = Math.PI * 2;
const CUBES_BG = 40;
const CUBES_FEAT = 6;
const WISP = 320;
const LOGO_ROT = -Math.PI / 2;
const LOGO_W = 0.88;

const WORDMARK_SRC =
  "/images/neocloudz-logo.png";

function TokenFactoryScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    parent.appendChild(canvas);

    const getSize = () => ({ w: parent.clientWidth || 800, h: parent.clientHeight || 600 });
    let { w, h } = getSize();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 200);
    const HALF_V_FOV_TAN = Math.tan((34 / 2) * Math.PI / 180);
    const SCENE_HALF_WIDTH = 9.8;
    const SCENE_HALF_HEIGHT = 6.4;
    const LOOK_Y = 1.8;
    const fitDistance = (aspect: number) => {
      const forWidth = SCENE_HALF_WIDTH / (HALF_V_FOV_TAN * aspect);
      const forHeight = SCENE_HALF_HEIGHT / HALF_V_FOV_TAN;
      return Math.max(forWidth, forHeight);
    };
    let camDist = fitDistance(w / h);
    camera.position.set(0, 6.4, camDist);
    camera.lookAt(0, LOOK_Y, 0);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-2, -2);
    let hovering = false;
    let spinTarget = 0;
    let spinCurrent = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("pointermove", onPointerMove);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-5, 9, 9);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc4ffd8, 0.55);
    fillLight.position.set(7, -1, 5);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(4, 7, -8);
    scene.add(rimLight);
    const boxEdge = new THREE.DirectionalLight(0xc8d8cc, 0.5);
    boxEdge.position.set(-6, 4, 7);
    scene.add(boxEdge);

    const textures: THREE.Texture[] = [];
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const x = c.getContext("2d");
      if (!x) return new THREE.CanvasTexture(document.createElement("canvas"));
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(217,255,230,1)");
      g.addColorStop(0.35, "rgba(61,255,122,0.9)");
      g.addColorStop(1, "rgba(61,255,122,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      textures.push(tex);
      return tex;
    })();

    function makeLogoTexture(mirror = false) {
      const S = 1024;
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const x = c.getContext("2d");
      if (!x) return new THREE.CanvasTexture(document.createElement("canvas"));

      const bgG = x.createRadialGradient(S / 2, S * 0.42, S * 0.05, S / 2, S / 2, S * 0.52);
      bgG.addColorStop(0, "#0e2b18");
      bgG.addColorStop(0.55, "#071a0f");
      bgG.addColorStop(1, "#051209");
      x.fillStyle = bgG;
      x.beginPath();
      x.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
      x.fill();

      x.lineWidth = 14;
      x.strokeStyle = "#3dff7a";
      x.shadowColor = "#3dff7a";
      x.shadowBlur = 40;
      x.beginPath();
      x.arc(S / 2, S / 2, S * 0.465, 0, Math.PI * 2);
      x.stroke();
      x.lineWidth = 6;
      x.strokeStyle = "rgba(168,255,196,.8)";
      x.shadowBlur = 16;
      x.beginPath();
      x.arc(S / 2, S / 2, S * 0.415, 0, Math.PI * 2);
      x.stroke();
      x.shadowBlur = 0;

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
      const img = new Image();
      img.onload = () => {
        x.save();
        x.translate(S / 2, S / 2);
        if (mirror) x.scale(-1, 1);
        x.rotate(LOGO_ROT);
        const wq = S * LOGO_W;
        const hq = wq * (img.height / img.width);
        x.imageSmoothingQuality = "high";
        x.globalAlpha = 0.75;
        x.shadowColor = "#3dff7a";
        x.shadowBlur = 26;
        x.drawImage(img, -wq / 2, -hq / 2, wq, hq);
        x.globalAlpha = 1;
        x.shadowBlur = 0;
        x.drawImage(img, -wq / 2, -hq / 2, wq, hq);
        x.restore();
        tex.needsUpdate = true;
      };
      img.src = WORDMARK_SRC;
      return tex;
    }

    const edgeTex = (() => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 32;
      const x = c.getContext("2d");
      if (!x) return new THREE.CanvasTexture(document.createElement("canvas"));
      x.fillStyle = "#0a2414";
      x.fillRect(0, 0, 512, 32);
      for (let i = 0; i < 64; i++) {
        x.fillStyle = i % 2 ? "#1e6b3a" : "#123a22";
        x.fillRect(i * 8, 0, 5, 32);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.repeat.set(3, 1);
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
      return tex;
    })();

    const bgGroup = new THREE.Group();
    bgGroup.position.z = -14;
    scene.add(bgGroup);
    const cubeInstGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeInstMat = new THREE.MeshStandardMaterial({
      color: GREEN,
      metalness: 0.5,
      roughness: 0.4,
      emissive: new THREE.Color(GREEN),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const cubeInst = new THREE.InstancedMesh(cubeInstGeo, cubeInstMat, CUBES_BG);
    const cd: Array<{x:number;y:number;z:number;s:number;rot:number;rotSp:number;phase:number}> = [];
    const cdummy = new THREE.Object3D();
    for (let i = 0; i < CUBES_BG; i++) {
      cd.push({
        x: Math.random() * 44 - 22,
        y: Math.random() * 24 - 6,
        z: Math.random() * -12,
        s: 0.07 + Math.random() * 0.26,
        rot: Math.random() * 6.28,
        rotSp: (Math.random() - 0.5) * 1.0,
        phase: Math.random() * 6.28,
      });
    }
    bgGroup.add(cubeInst);

    const featCubes: THREE.Mesh[] = [];
    const featBase = new THREE.MeshStandardMaterial({
      color: 0x101410,
      metalness: 0.85,
      roughness: 0.25,
      emissive: new THREE.Color(GREEN),
      emissiveIntensity: 0.25,
    });
    for (let i = 0; i < CUBES_FEAT; i++) {
      const sz = 0.22 + Math.random() * 0.16;
      const cube = new THREE.Mesh(new THREE.BoxGeometry(sz, sz, sz), featBase.clone());
      cube.userData = {
        ang: (i / CUBES_FEAT) * 6.283,
        radius: 5.5 + Math.random() * 1.5,
        speed: 0.15 + Math.random() * 0.12,
        yBase: 5.0 + Math.random() * 1.5,
        ySpeed: 0.4 + Math.random() * 0.5,
        phase: Math.random() * 6.28,
      };
      scene.add(cube);
      featCubes.push(cube);
    }

    const coinGroup = new THREE.Group();
    coinGroup.position.set(0, COIN_Y, 0);
    scene.add(coinGroup);
    const frontTex = makeLogoTexture(false);
    const backTex = makeLogoTexture(true);
    const faceMatProps = (map: THREE.Texture) => ({
      map,
      metalness: 0.25,
      roughness: 0.4,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.85,
      emissiveMap: map,
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      map: edgeTex,
      color: 0x9fffbe,
      metalness: 0.7,
      roughness: 0.3,
      emissive: new THREE.Color(GREEN),
      emissiveIntensity: 0.35,
      emissiveMap: edgeTex,
    });
    const frontMat = new THREE.MeshStandardMaterial(faceMatProps(frontTex));
    const backMat = new THREE.MeshStandardMaterial(faceMatProps(backTex));
    const coinGeo = new THREE.CylinderGeometry(COIN_R, COIN_R, COIN_T, 96);
    const coin = new THREE.Mesh(coinGeo, [edgeMat, frontMat, backMat]);
    coin.rotation.x = Math.PI / 2;
    const coinSpin = new THREE.Group();
    coinSpin.add(coin);
    coinGroup.add(coinSpin);
    coinGroup.rotation.x = 0.08;

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sprite,
      color: GREEN,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    halo.scale.setScalar(COIN_R * 4.2);
    coinGroup.add(halo);
    const coinLight = new THREE.PointLight(GREEN, 0.7, 12, 1.8);
    coinGroup.add(coinLight);

    const platform = new THREE.Group();
    platform.position.set(0, -2.6, 0);
    scene.add(platform);
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x050807, metalness: 0.55, roughness: 0.62 });
    const tierDefs = [
      { r: 9.0, h: 1.4, y: 0.0 },
      { r: 7.0, h: 1.3, y: 1.3 },
      { r: 5.2, h: 1.2, y: 2.5 },
    ];
    for (const tier of tierDefs) {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(tier.r, tier.r + 0.25, tier.h, 160), darkMat);
      cyl.position.y = tier.y + tier.h / 2;
      platform.add(cyl);
      const cap = new THREE.Mesh(new THREE.CircleGeometry(tier.r - 0.02, 160), darkMat);
      cap.rotation.x = -Math.PI / 2;
      cap.position.y = tier.y + tier.h;
      platform.add(cap);
    }
    const bottomCap = new THREE.Mesh(new THREE.CircleGeometry(tierDefs[0].r + 0.5, 160), darkMat);
    bottomCap.rotation.x = Math.PI / 2;
    bottomCap.position.y = -0.05;
    platform.add(bottomCap);
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(tierDefs[0].r + 0.25, tierDefs[0].r + 0.6, 0.6, 160), darkMat);
    skirt.position.y = -0.3;
    platform.add(skirt);

    const segGroups: THREE.Group[] = [];
    const makeSegments = (radius: number, y: number, count: number, color: number, op: number) => {
      const grp = new THREE.Group();
      grp.rotation.x = -Math.PI / 2;
      grp.position.y = y;
      for (let i = 0; i < count; i++) {
        if (Math.random() < 0.35) continue;
        const a0 = (i / count) * 6.283 + (Math.random() - 0.5) * 0.05;
        const sweep = (6.283 / count) * (0.4 + Math.random() * 0.5);
        const m = new THREE.MeshBasicMaterial({
          color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: op * (0.5 + Math.random() * 0.5),
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        m.userData = { base: m.opacity };
        grp.add(new THREE.Mesh(new THREE.RingGeometry(radius - 0.08, radius + 0.08, 32, 1, a0, sweep), m));
      }
      grp.userData = { speed: (Math.random() < 0.5 ? -1 : 1) * (0.05 + Math.random() * 0.08), phase: Math.random() * 6.28 };
      platform.add(grp);
      segGroups.push(grp);
    };
    makeSegments(tierDefs[0].r - 0.1, tierDefs[0].y + tierDefs[0].h + 0.01, 40, LIME, 0.75);
    makeSegments(tierDefs[1].r - 0.1, tierDefs[1].y + tierDefs[1].h + 0.01, 32, GREEN_HI, 0.78);
    makeSegments(tierDefs[2].r - 0.1, tierDefs[2].y + tierDefs[2].h + 0.01, 26, GREEN_HI, 0.78);

    const coreY = tierDefs[2].y + tierDefs[2].h + 0.02;
    const coreMeshes: Array<{ mesh: THREE.Mesh; base: number }> = [];
    const coreTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d");
      if (!x) return new THREE.CanvasTexture(document.createElement("canvas"));
      const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0.0, "rgba(234,255,241,0.95)");
      g.addColorStop(0.10, "rgba(168,255,196,0.92)");
      g.addColorStop(0.30, "rgba(61,255,122,0.82)");
      g.addColorStop(0.62, "rgba(24,150,66,0.45)");
      g.addColorStop(1.0, "rgba(8,61,28,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(c);
      textures.push(tex);
      return tex;
    })();
    const coreDisc = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 72),
      new THREE.MeshBasicMaterial({ map: coreTex, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    coreDisc.rotation.x = -Math.PI / 2;
    coreDisc.position.y = coreY + 0.02;
    platform.add(coreDisc);
    coreMeshes.push({ mesh: coreDisc, base: 0.95 });

    const coreRings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const rad = 3.3 + i * 0.35;
      const m = new THREE.MeshBasicMaterial({ color: GREEN_HI, side: THREE.DoubleSide, transparent: true, opacity: 0.22 - i * 0.05, blending: THREE.AdditiveBlending, depthWrite: false });
      const r = new THREE.Mesh(new THREE.RingGeometry(rad, rad + 0.03, 128), m);
      r.rotation.x = -Math.PI / 2;
      r.position.y = coreY;
      platform.add(r);
      coreRings.push(r);
    }
    const upLight = new THREE.SpotLight(0x3ae37a, 1.5, 16, 0.5, 0.6, 1.5);
    upLight.position.set(0, coreY + 0.3, 0);
    upLight.target.position.set(0, coreY + 6, 0);
    platform.add(upLight);
    platform.add(upLight.target);

    const wGeo = new THREE.BufferGeometry();
    const wPos = new Float32Array(WISP * 3);
    const wData: Array<{ x: number; z: number; speed: number }> = [];
    for (let i = 0; i < WISP; i++) {
      const a = Math.random() * 6.28;
      const rr = Math.random() * 2.6;
      wData.push({ x: Math.cos(a) * rr, z: Math.sin(a) * rr, speed: 0.7 + Math.random() * 1.5 });
      wPos[i * 3] = wData[i].x;
      wPos[i * 3 + 1] = coreY + Math.random() * 5.5;
      wPos[i * 3 + 2] = wData[i].z;
    }
    wGeo.setAttribute("position", new THREE.BufferAttribute(wPos, 3));
    platform.add(
      new THREE.Points(wGeo, new THREE.PointsMaterial({
        size: 0.13,
        map: sprite,
        color: GREEN_HI,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.8,
      })),
    );

    const clock = new THREE.Clock();
    let t = 0;
    const coinWorld = new THREE.Vector3();
    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const baseFlip = (time: number) => {
      const p = (time % FLIP_DUR) / FLIP_DUR;
      return ((1 - Math.cos(p * Math.PI * 2)) * 0.5) * Math.PI;
    };
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObject(coin, false).length > 0;
      if (hit && !hovering) {
        hovering = true;
        spinTarget += HOVER_SPIN;
      }
      if (!hit) hovering = false;
      spinCurrent += (spinTarget - spinCurrent) * Math.min(1, dt * 1.1);

      if (REDUCED) {
        coinSpin.rotation.y = 0.42;
      } else {
        coinSpin.rotation.y = baseFlip(t) + spinCurrent;
        coinGroup.position.y = COIN_Y + Math.sin(t * 0.8) * 0.12;
      }

      let glowBoost = 0;
      coinGroup.getWorldPosition(coinWorld);
      for (const cube of featCubes) {
        const u = cube.userData as any;
        u.ang += u.speed * dt;
        cube.position.set(
          Math.cos(u.ang) * u.radius,
          u.yBase + Math.sin(t * u.ySpeed + u.phase) * 1.6,
          Math.sin(u.ang) * u.radius * 0.5,
        );
        cube.rotation.x += dt * 0.6;
        cube.rotation.y += dt * 0.4;
        const near = Math.max(0, 1 - cube.position.distanceTo(coinWorld) / 3.2);
        (cube.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.25 + near * 1.8;
        glowBoost = Math.max(glowBoost, near);
      }
      frontMat.emissiveIntensity = backMat.emissiveIntensity = 0.85 + glowBoost * 0.5;
      coinLight.intensity = 0.7 + glowBoost * 1.0;

      for (let i = 0; i < CUBES_BG; i++) {
        const d = cd[i];
        cdummy.position.set(d.x + Math.sin(t * 0.2 + d.phase) * 1.2, d.y + Math.sin(t * 0.4 + d.phase) * 0.5, d.z);
        cdummy.rotation.set(d.rot + t * d.rotSp, d.rot + t * d.rotSp * 0.7, 0);
        cdummy.scale.setScalar(d.s);
        cdummy.updateMatrix();
        cubeInst.setMatrixAt(i, cdummy.matrix);
      }
      cubeInst.instanceMatrix.needsUpdate = true;

      for (const g of segGroups) {
        if (!REDUCED) g.rotation.z += g.userData.speed * dt;
        const fl = 0.6 + 0.4 * Math.sin(t * 1.5 + g.userData.phase);
        g.children.forEach((ch) => {
          const mat = (ch as THREE.Mesh).material as THREE.Material & { userData?: { base: number } };
          if (mat && mat.userData) mat.opacity = mat.userData.base * (REDUCED ? 1 : fl);
        });
      }
      for (let i = 0; i < coreRings.length; i++) coreRings[i].rotation.z += (i % 2 ? 0.05 : -0.04) * dt;
      const pulse = REDUCED ? 1 : 0.9 + 0.1 * Math.sin(t * 2.2);
      for (const c of coreMeshes) c.mesh.material.opacity = c.base * pulse;

      const wp = wGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < WISP; i++) {
        let y = wp[i * 3 + 1] + dt * wData[i].speed;
        if (y > coreY + 6) y -= 5.5;
        wp[i * 3 + 1] = y;
      }
      wGeo.attributes.position.needsUpdate = true;

      if (!REDUCED) {
        const camA = Math.sin(t * 0.05) * 0.06;
        camera.position.x = Math.sin(camA) * camDist;
        camera.position.z = Math.cos(camA) * camDist;
        camera.position.y = 6.0 + Math.sin(t * 0.04) * 0.6;
        camera.lookAt(0, LOOK_Y, 0);
      }
      canvas.style.cursor = hit ? "pointer" : "default";
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const s = getSize();
      w = s.w;
      h = s.h;
      camera.aspect = w / h;
      camDist = fitDistance(w / h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      parent.removeChild(canvas);
      renderer.dispose();
      textures.forEach((tex) => tex.dispose());
      coinGeo.dispose();
      edgeTex.dispose();
      cubeInstGeo.dispose();
    };
  }, []);

  return <div className="tf-coin-3d-scene" ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

export default TokenFactoryScene;

