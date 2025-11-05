import { useMemo, useState } from "react";
import EpisodeCard from "./EpisodeCard.jsx";

export default function SeasonNav({ seasons, initial = 1 }) {
  const seasonNumbers = useMemo(
    () => seasons.map((s) => s.season).sort((a, b) => a - b),
    [seasons]
  );
  const [openSeason, setOpenSeason] = useState(
    seasonNumbers.includes(initial) ? initial : seasonNumbers[0]
  );

  if (!seasons?.length) return <p>No seasons available.</p>;
  const active = seasons.find((s) => s.season === openSeason);

  return (
    <section className="seasons">
      {/* Top bar: Left = title, Right = season select */}
      <div className="section-bar">
        <h2 className="section-title">Current Season</h2>
        <select
          className="season-select"
          value={openSeason}
          onChange={(e) => setOpenSeason(Number(e.target.value))}
          aria-label="Select season"
        >
          {seasonNumbers.map((n) => (
            <option key={n} value={n}>
              Season {n}
            </option>
          ))}
        </select>
      </div>

      {/* Season summary row */}
      <div className="season-header">
        <div className="season-cover" aria-hidden="true">
          {active?.image ? <img src={active.image} alt="" /> : <div className="placeholder" />}
        </div>
        <div>
          <h3>
            Season {active?.season}
            {active?.title ? `: ${active.title}` : ""}
          </h3>
          <p className="muted">{active?.episodes?.length ?? 0} episodes</p>
        </div>
      </div>

      {/* Episodes list */}
      <ul className="episodes">
        {active?.episodes?.map((ep) => (
          <li key={`${active.season}-${ep.episode}`} className="episode">
            <div className="season-thumb">
              {active?.image ? <img src={active.image} alt="" /> : <div className="placeholder" />}
            </div>
            <EpisodeCard episode={ep} />
          </li>
        ))}
      </ul>
      {!active?.episodes?.length && (
  <p className="muted" role="status">No episodes in this season yet.</p>
)}
    </section>
  );
}
