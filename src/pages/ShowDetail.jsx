import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchShowById } from "../api/podcastApi.js";
import { mapGenres } from "../constants/genres.js";
import Spinner from "../components/Spinner.jsx";
import SeasonNav from "../components/SeasonNav.jsx";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [show, setShow] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    fetchShowById(id, ctrl.signal)
      .then((json) => {
        setShow(json);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load show");
          setStatus("error");
        }
      });
    return () => ctrl.abort();
  }, [id]);

  const genres = useMemo(() => mapGenres(show?.genres ?? []), [show]);
  const totalEpisodes = (show?.seasons || []).reduce(
    (n, s) => n + (s.episodes?.length || 0),
    0
  );

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate({ pathname: "/", search: params.toString() });
  };

  if (status === "loading") return <Spinner label="Loading show" />;
  if (status === "error") return <p role="alert">Oops—{error}</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <main className="page">
      <button className="back" onClick={goBack} aria-label="Back to results">
        ← Back
      </button>

      <section className="hero">
        <div className="hero-cover">
          {show.image ? <img src={show.image} alt="" /> : <div className="placeholder" />}
        </div>
        <div>
          <h1 className="hero-title">{show.title}</h1>
          <p className="hero-desc">{show.description}</p>

          <div className="chip-row">
            {genres.map((g) => (
              <span key={g} className="chip">
                {g}
              </span>
            ))}
          </div>

          <div className="meta">
            <div>
              <span className="muted">Total Seasons</span>
              <div>{show.seasons?.length ?? 0} Seasons</div>
            </div>
            <div>
              <span className="muted">Last Updated</span>
              <div>{formatDate(show.updated)}</div>
            </div>
            <div>
              <span className="muted">Total Episodes</span>
              <div>{totalEpisodes} Episodes</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: SeasonNav now renders its own "Current Season" + right-aligned select */}
      <SeasonNav seasons={show.seasons || []} initial={1} />

      <footer className="share">
        <Link to={{ pathname: "/", search: params.toString() }}>← Back to results</Link>
      </footer>
    </main>
  );
}
