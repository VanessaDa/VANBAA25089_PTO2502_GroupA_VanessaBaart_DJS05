import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPreviews } from "../api/podcastApi.js";
import { mapGenres } from "../constants/genres.js";
import Spinner from "../components/Spinner.jsx";

/** Format ISO string like "3 November 2022" */
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Sorting helpers */
function sortShows(list, sortKey) {
  const arr = [...list];
  switch (sortKey) {
    case "az":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    case "seasons":
      // if preview doesn’t include season count, fall back to 0
      return arr.sort((a, b) => (b.seasons ?? 0) - (a.seasons ?? 0));
    case "updated":
      return arr.sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
      );
    case "default":
    default:
      return arr; // API order
  }
}

export default function Home() {
  // URL params for state persistence
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const genre = params.get("genre") ?? "all";
  const sort = params.get("sort") ?? "default";
  const page = Number(params.get("page") ?? 1);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Fetch previews once
  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    fetchPreviews(ctrl.signal)
      .then((json) => {
        setData(json);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load shows");
          setStatus("error");
        }
      });
    return () => ctrl.abort();
  }, []);

  // Filter + sort pipeline
  const filtered = useMemo(() => {
    let list = data;

    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (item) =>
          item.title?.toLowerCase().includes(s) ||
          item.description?.toLowerCase().includes(s)
      );
    }

    if (genre !== "all") {
      const gid = Number(genre);
      list = list.filter((item) => item.genres?.includes(gid));
    }

    return sortShows(list, sort);
  }, [data, q, genre, sort]);

  // Pagination
  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const start = (pageSafe - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  // Helper to update a single param (and reset page unless it's the page itself)
  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "all" || value === "" || value == null) next.delete(key);
    else next.set(key, String(value));
    if (key !== "page") next.delete("page"); // reset pagination on new filter
    setParams(next, { replace: true });
  };

  if (status === "loading") return <Spinner label="Loading shows" />;
  if (status === "error") return <p role="alert">Oops—{error}</p>;

  return (
    <main className="page">
      {/* Toolbar: Search | Genre | Sort */}
      <header className="toolbar" role="search">
        <input
          placeholder="Search podcasts"
          value={q}
          onChange={(e) => updateParam("q", e.target.value)}
          aria-label="Search podcasts"
        />

        <select
          value={genre}
          onChange={(e) => updateParam("genre", e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="all">All Genres</option>
          {Object.entries({
            1: "Personal Growth",
            2: "Investigative Journalism",
            3: "History",
            4: "Comedy",
            5: "Entertainment",
            6: "Business",
            7: "Fiction",
            8: "News",
            9: "Kids and Family",
          }).map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          aria-label="Sort shows"
        >
          <option value="default">Default</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
          <option value="seasons">Most Seasons</option>
          <option value="updated">Recently Updated</option>
        </select>
      </header>

      {/* Cards */}
      {visible.length === 0 ? (
        <p className="muted">No shows match your filters.</p>
      ) : (
        <ul className="grid">
          {visible.map((show) => (
            <li key={show.id} className="card">
              <Link
                to={`/show/${show.id}?${params.toString()}`}
                className="card-link"
              >
                <img src={show.image} alt="" className="card-img" />
                <h3 className="card-title">{show.title}</h3>
                <p className="muted">{mapGenres(show.genres).join(" • ")}</p>
                <p className="muted">Updated {formatDate(show.updated)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          <button
            disabled={pageSafe === 1}
            onClick={() => updateParam("page", pageSafe - 1)}
          >
            Prev
          </button>
          <span>
            {pageSafe} / {totalPages}
          </span>
          <button
            disabled={pageSafe === totalPages}
            onClick={() => updateParam("page", pageSafe + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}
