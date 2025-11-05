const BASE = "https://podcast-api.netlify.app";

async function get(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function fetchPreviews(signal) {
  return get(`${BASE}/`, signal);
}

export function fetchShowById(id, signal) {
  return get(`${BASE}/id/${id}`, signal);
}
