"use client";

import { useEffect } from "react";

export default function Solutions() {
  useEffect(() => {
    /* ----------------------------------------------------------
       LATENCY GAUGE CANVAS
       ---------------------------------------------------------- */
    let gaugeAnimId: number;
    (function () {
      const c = document.getElementById('latency-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number, needleAngle = Math.PI, targetAngle = Math.PI, animating = false;

      function setSize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }

      function deg(d: number) { return d * Math.PI / 180; }

      function draw() {
        if (!W || !H || !ctx) return;
        ctx.clearRect(0, 0, W, H);
        const cx = W / 2;
        const cy = H * 0.62;
        const r = Math.min(W, H) * 0.42;

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 28;
        ctx.lineCap = 'butt';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, Math.PI + deg(60), false);
        ctx.strokeStyle = '#2dff7a';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI + deg(60), Math.PI + deg(120), false);
        ctx.strokeStyle = '#ffb84d';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI + deg(120), 0, false);
        ctx.strokeStyle = '#ff4d55';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.font = '600 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#2dff7a';
        ctx.fillText('< 5ms', cx - r * 0.64, cy - r * 0.05);
        ctx.fillStyle = '#ffb84d';
        ctx.fillText('5-10ms', cx + 2, cy - r * 0.8);
        ctx.fillStyle = '#ff4d55';
        ctx.fillText('10ms+', cx + r * 0.64, cy - r * 0.05);

        for (let d = 0; d <= 180; d += 18) {
          const rad = Math.PI + deg(d);
          ctx.beginPath();
          ctx.moveTo(cx + (r - 20) * Math.cos(rad), cy + (r - 20) * Math.sin(rad));
          ctx.lineTo(cx + (r + 8) * Math.cos(rad), cy + (r + 8) * Math.sin(rad));
          ctx.strokeStyle = 'rgba(255,255,255,0.14)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        const nLen = r * 0.82;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + nLen * Math.cos(needleAngle),
          cy + nLen * Math.sin(needleAngle)
        );
        ctx.strokeStyle = '#f0f5f0';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f5f0';
        ctx.fill();

        const msVal = ((needleAngle - Math.PI) / Math.PI * 20).toFixed(1);
        ctx.font = '700 36px JetBrains Mono, monospace';
        ctx.fillStyle = '#2dff7a';
        ctx.textAlign = 'center';
        ctx.fillText(msVal + 'ms', cx, cy + r * 0.38);
        ctx.font = '500 12px Inter, sans-serif';
        ctx.fillStyle = '#4a5a4a';
        ctx.fillText('p99 inference latency', cx, cy + r * 0.54);
      }

      function animateNeedle() {
        if (Math.abs(needleAngle - targetAngle) < 0.003) {
          needleAngle = targetAngle;
          animating = false;
          draw();
          return;
        }
        needleAngle += (targetAngle - needleAngle) * 0.04;
        draw();
        gaugeAnimId = requestAnimationFrame(animateNeedle);
      }

      setSize();
      draw();

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !animating) {
            animating = true;
            targetAngle = Math.PI + deg(43.2);
            animateNeedle();
          }
        });
      }, { threshold: 0.4 });

      obs.observe(c);
      window.addEventListener('resize', () => { setSize(); draw(); });
    })();

    /* ----------------------------------------------------------
       TRAINING TERMINAL STREAMER
       ---------------------------------------------------------- */
    let streamTimeout: any;
    (function () {
      const terminal = document.getElementById('train-terminal');
      if (!terminal) return;
      const lines = terminal.querySelectorAll('.term-line');
      let running = false;

      function runStream() {
        if (running) return;
        running = true;
        lines.forEach(l => l.classList.remove('show'));

        lines.forEach((line, i) => {
          setTimeout(() => { line.classList.add('show'); }, i * 100);
        });

        streamTimeout = setTimeout(() => {
          running = false;
          runStream();
        }, lines.length * 100 + 3000);
      }

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runStream();
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });

      obs.observe(terminal);
    })();

    return () => {
      cancelAnimationFrame(gaugeAnimId);
      clearTimeout(streamTimeout);
    };
  }, []);

  return (
    <section className="solutions" id="solutions">
      <div className="section-inner">
        <div className="section-label reveal">// Solutions</div>
        <h2 className="section-title reveal">
          End-to-End AI <span className="g">Compute Pathways</span>
        </h2>
        <p className="section-sub reveal">
          Purpose-built infrastructure for every stage of the AI lifecycle —
          from first experiment to full production deployment at scale.
        </p>

        <div className="sol-card reveal" id="card-train" style={{ marginTop: '64px' }}>
          <div className="sol-info">
            <span className="sol-icon">🧠</span>
            <h3 className="sol-title">AI Training at Scale</h3>
            <p className="sol-desc">
              Harness the full power of NVIDIA Blackwell B200 GPUs connected via
              InfiniBand 400G fabric for distributed training that actually scales.
              Purpose-built clusters with Supermicro thermal-optimized hardware
              and WEKA NVMe storage ensure your training runs hit peak throughput —
              every time, at any node count.
            </p>
            <ul className="sol-features">
              <li>InfiniBand 400G-connected B200 GPU clusters for maximum
                  all-reduce performance across 128+ nodes</li>
              <li>Supermicro high-density server design with precision thermal
                  management and liquid cooling</li>
              <li>NVMe-backed WEKA storage enabling sub-second checkpoint
                  saving and instant resumption</li>
              <li>Auto-scaling multi-node clusters — from 1 to 128 nodes
                  via a single API call with zero reconfiguration</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="term-window">
              <div className="term-bar">
                <span className="term-dot term-dot-r"></span>
                <span className="term-dot term-dot-y"></span>
                <span className="term-dot term-dot-g"></span>
                <span className="term-title">neocloudz — ai-training-job-01</span>
              </div>
              <div className="term-body" id="train-terminal">
                <span className="term-line tl-cmd" data-line="0">$ neocloudz launch --gpus b200 --nodes 16 --job llm-train</span>
                <span className="term-line tl-info" data-line="1">[INFO] Allocating 16x NVIDIA B200 across 2 racks...</span>
                <span className="term-line tl-muted" data-line="2">[INFO] InfiniBand 400G fabric topology validated</span>
                <span className="term-line tl-info" data-line="3">[INFO] Mounting WEKA NVMe volume at /mnt/checkpoints</span>
                <span className="term-line tl-success" data-line="4">[OK]   Cluster ready — 16 nodes, 128 B200 GPUs total</span>
                <span className="term-line tl-cmd" data-line="5">$ torchrun --nproc_per_node=8 --nnodes=16 train.py</span>
                <span className="term-line tl-info" data-line="6">[NCCL] Initializing all-reduce ring over IB 400G...</span>
                <span className="term-line tl-success" data-line="7">[NCCL] Ring initialized. Bandwidth: 398.4 GB/s</span>
                <span className="term-line tl-info" data-line="8">[TRAIN] Epoch 1/50 — Step 100/5000 — Loss: 2.847</span>
                <span className="term-line tl-info" data-line="9">[TRAIN] Epoch 1/50 — Step 200/5000 — Loss: 2.614</span>
                <span className="term-line tl-warn" data-line="10">[CKPT]  Checkpoint saved → /mnt/checkpoints/step-200.pt</span>
                <span className="term-line tl-success" data-line="11">[INFO] GPU Util: 97.4% | Throughput: 142 k tok/s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sol-card reverse reveal">
          <div className="sol-info">
            <span className="sol-icon">⚡</span>
            <h3 className="sol-title">Real-Time Inference</h3>
            <p className="sol-desc">
              Sub-5ms p99 latency for production inference workloads.
              Deploy your models on dedicated B200 GPU instances behind
              NeoCloudz&rsquo;s Kubernetes-native serving layer —
              complete with autoscaling, health checks, and real-time
              monitoring dashboards built in from day one.
            </p>
            <ul className="sol-features">
              <li>&lt;5ms p99 end-to-end inference latency measured on live
                  B200 hardware under production load</li>
              <li>Kubernetes-ready deployment with pre-built Helm charts,
                  device plugins, and HPA configs included</li>
              <li>Real-time monitoring and alerting via integrated
                  Prometheus + Grafana observability stack</li>
              <li>Auto-scaling inference endpoints — scale to zero when idle,
                  burst capacity available in under 60 seconds</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="latency-wrap">
              <canvas id="latency-canvas"></canvas>
            </div>
          </div>
        </div>

        <div className="sol-card reveal">
          <div className="sol-info">
            <span className="sol-icon">🔬</span>
            <h3 className="sol-title">Rapid Prototyping</h3>
            <p className="sol-desc">
              Go from idea to running experiment in under 60 seconds.
              NeoCloudz JupyterLab environments come pre-configured with
              PyTorch, TensorFlow, CUDA, and all major AI libraries —
              no setup, no waiting, no DevOps overhead.
              One-click clone to replicate environments across your team instantly.
            </p>
            <ul className="sol-features">
              <li>Instant JupyterLab environments on B200 GPUs with
                  zero cold-start delay — login and start training immediately</li>
              <li>Pre-configured PyTorch, TensorFlow, JAX, and
                  HuggingFace Transformers environments included</li>
              <li>Secure dataset ingestion via S3-compatible API with
                  AES-256 encryption at rest and TLS 1.3 in transit</li>
              <li>One-click environment cloning — share exact GPU
                  compute environments with teammates in seconds</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="term-window code-window">
              <div className="term-bar">
                <span className="term-dot term-dot-r"></span>
                <span className="term-dot term-dot-y"></span>
                <span className="term-dot term-dot-g"></span>
                <span className="term-title">prototype.ipynb — JupyterLab / NeoCloudz B200</span>
              </div>
              <div className="term-body">
                <span style={{ display: 'block' }}><span className="code-cm"># NeoCloudz JupyterLab — B200 GPU Environment</span></span>
                <span style={{ display: 'block' }}><span className="code-kw">import</span> <span className="code-fn">torch</span></span>
                <span style={{ display: 'block' }}><span className="code-kw">from</span> <span className="code-fn">transformers</span> <span className="code-kw">import</span> <span className="code-cls">AutoModelForCausalLM</span>, <span className="code-cls">AutoTokenizer</span></span>
                <span style={{ display: 'block' }}>&nbsp;</span>
                <span style={{ display: 'block' }}><span className="code-cm"># Load from NeoCloudz model registry</span></span>
                <span style={{ display: 'block' }}><span className="code-fn">model_id</span> = <span className="code-str">"meta-llama/Llama-3.1-70B-Instruct"</span></span>
                <span style={{ display: 'block' }}><span className="code-fn">tokenizer</span> = <span className="code-cls">AutoTokenizer</span>.<span className="code-fn">from_pretrained</span>(<span className="code-fn">model_id</span>)</span>
                <span style={{ display: 'block' }}><span className="code-fn">model</span> = <span className="code-cls">AutoModelForCausalLM</span>.<span className="code-fn">from_pretrained</span>(</span>
                <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">model_id</span>,</span>
                <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">torch_dtype</span>=<span className="code-fn">torch</span>.<span className="code-cls">bfloat16</span>,</span>
                <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">device_map</span>=<span className="code-str">"auto"</span></span>
                <span style={{ display: 'block' }}>)</span>
                <span style={{ display: 'block' }}>&nbsp;</span>
                <span style={{ display: 'block' }}><span className="code-cm"># Run inference — sub-5ms p99 on B200</span></span>
                <span style={{ display: 'block' }}><span className="code-fn">inputs</span> = <span className="code-fn">tokenizer</span>(</span>
                <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"Explain NVIDIA Blackwell B200 in one sentence:"</span>,</span>
                <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">return_tensors</span>=<span className="code-str">"pt"</span></span>
                <span style={{ display: 'block' }}>).<span className="code-fn">to</span>(<span className="code-str">"cuda"</span>)</span>
                <span style={{ display: 'block' }}>&nbsp;</span>
                <span style={{ display: 'block' }}><span className="code-fn">output</span> = <span className="code-fn">model</span>.<span className="code-fn">generate</span>(**<span className="code-fn">inputs</span>, <span className="code-fn">max_new_tokens</span>=<span className="code-num">128</span>)</span>
                <span style={{ display: 'block' }}><span className="code-fn">print</span>(<span className="code-fn">tokenizer</span>.<span className="code-fn">decode</span>(<span className="code-fn">output</span>[<span className="code-num">0</span>], <span className="code-fn">skip_special_tokens</span>=<span className="code-cls">True</span>))</span>
                <span style={{ display: 'block' }}>&nbsp;</span>
                <span style={{ display: 'block' }}><span className="tl-success"># GPU: NVIDIA B200 | VRAM: 192 GB HBM3e | Latency: 4.1ms</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
