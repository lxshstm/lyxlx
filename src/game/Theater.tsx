import { useEffect, useState } from "react";
import { THEATER, type TheaterActor } from "./config";
import { Bubbu } from "./Bubbu";
import { Burst } from "./ui";
import { Button } from "@/components/ui/button";
import { sfx } from "./audio";

/** 终章彩蛋：一二布布小剧场 —— 点击推进的五幕无声剧，谢幕拉横幅。 */
export function Theater({ onClose }: { onClose: () => void }) {
  const total = THEATER.scenes.length;
  // act: 0 = 待开演；1..total = 第 N 幕；total + 1 = 谢幕
  const [act, setAct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const finished = act > total;
  const scene = act > 0 && !finished ? THEATER.scenes[act - 1] : null;

  useEffect(() => {
    if (finished) sfx.win();
  }, [finished]);

  const next = () => {
    sfx.tap();
    setAct((a) => Math.min(a + 1, total + 1));
  };
  const replay = () => {
    sfx.bloom();
    setAct(0);
  };
  const leave = () => {
    setExiting(true);
    setTimeout(onClose, 350);
  };

  return (
    <div
      className={`theater-overlay ${exiting ? "theater-fade-out" : ""}`}
      onClick={finished ? undefined : next}
    >
      <button
        aria-label="回到信里"
        onClick={(e) => {
          e.stopPropagation();
          leave();
        }}
        className="theater-close"
      >
        ✕
      </button>

      <div className={`theater-stage ${act > 0 ? "curtains-open" : ""}`}>
        <div className="theater-curtain theater-curtain-l" aria-hidden="true" />
        <div className="theater-curtain theater-curtain-r" aria-hidden="true" />
        <div className="theater-spot" aria-hidden="true" />

        {scene &&
          scene.actors.map((a: TheaterActor, i) => (
            <div
              key={`${act}-${i}`}
              className="theater-actor"
              style={{ left: `${a.x}%`, top: `${a.y}%`, animationDelay: `${a.delay ?? 0}ms` }}
            >
              <Bubbu name={a.name} size={a.size ?? "md"} eager />
            </div>
          ))}

        {finished && (
          <>
            <Burst n={50} className="top-0" />
            <div className="theater-banner">{THEATER.banner}</div>
            <div className="theater-ensemble">
              {THEATER.curtainCall.map((n) => (
                <Bubbu key={n} name={n} size="md" eager />
              ))}
            </div>
          </>
        )}

        {act === 0 && <p className="theater-caption">轻点屏幕 · 拉开帷幕</p>}
        {scene && <p className="theater-caption">{scene.title}</p>}
        {finished && <p className="theater-caption">故事未完待续 ——</p>}
      </div>

      {!finished && (
        <p className="theater-progress">{act === 0 ? "序幕" : `第 ${act} / ${total} 幕`}</p>
      )}

      {finished && (
        <div className="mt-2 flex gap-3" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" className="btn-soft" onClick={replay}>
            再演一遍
          </Button>
          <Button variant="ghost" className="btn-love" onClick={leave}>
            回到信里
          </Button>
        </div>
      )}
    </div>
  );
}
