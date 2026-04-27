import { useEffect, useRef, useState } from "react";

const DEFAULT_CMDS = [
  "ai-training --gpus b200 --nodes 16",
  "inference --latency 5ms --scale auto",
  "prototype --env jupyter --framework pytorch",
  "enterprise --dedicated --sla 99.99",
];

const TYPE_SPEED = 45;
const PAUSE_AFTER_TYPE = 42;
const PAUSE_AFTER_DELETE = 18;

export function useTypingTerminal(commands: readonly string[] = DEFAULT_CMDS) {
  const [text, setText] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let ci = 0;
    let ci2 = 0;
    let typing = true;
    let pause = 0;

    timerRef.current = setInterval(() => {
      if (pause > 0) {
        pause--;
        return;
      }
      const cmd = commands[ci];
      if (typing) {
        setText(cmd.slice(0, ci2 + 1));
        ci2++;
        if (ci2 >= cmd.length) {
          typing = false;
          pause = PAUSE_AFTER_TYPE;
        }
      } else {
        setText(cmd.slice(0, ci2 - 1));
        ci2--;
        if (ci2 <= 0) {
          typing = true;
          ci = (ci + 1) % commands.length;
          pause = PAUSE_AFTER_DELETE;
        }
      }
    }, TYPE_SPEED);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [commands]);

  return text;
}
