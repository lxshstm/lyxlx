import { useState } from "react";
import { MOVIE } from "./config";
import { Burst } from "./ui";
import { Button } from "@/components/ui/button";
import { sfx } from "./audio";

/** 特别放映：一二布布的电影 —— 章节页风格的视频放映页。 */
export function MovieScreen({ onBack }: { onBack: () => void }) {
  const [ended, setEnded] = useState(false);

  return (
    <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-3 py-6">
      <p className="text-center font-display text-lg">特别放映 · 一二布布的电影</p>

      <div className="paper-card mx-auto mt-4 max-w-md space-y-2 p-6 text-center leading-loose">
        {MOVIE.intro.map((t, i) => (
          <p key={i} style={{ animation: `rise-in .7s ease-out ${i * 0.5}s both` }}>
            {t}
          </p>
        ))}
      </div>

      <div
        className="film relative mt-8 w-full max-w-2xl p-2"
        style={{ transform: "rotate(-1deg)" }}
      >
        <video
          src={MOVIE.src}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-md bg-black"
          onEnded={() => {
            sfx.win();
            setEnded(true);
          }}
        />
      </div>

      {ended && (
        <div className="relative mt-8 text-center anim-rise">
          <Burst n={40} className="top-0" />
          <p className="font-display text-lg">{MOVIE.end}</p>
        </div>
      )}

      <Button variant="ghost" className="btn-soft anim-rise mt-8" onClick={onBack}>
        回到信里
      </Button>
    </main>
  );
}
