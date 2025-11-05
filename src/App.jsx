import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import "./styles.css";

/**
 * App.jsx
 * Root routing configuration for DJS05 Podcast App
 * Light mode only — no theme toggle.
 */
export default function App() {
  return (
    <Routes>
      {/* Homepage / listing page */}
      <Route path="/" element={<Home />} />

      {/* Dynamic show detail page */}
      <Route path="/show/:id" element={<ShowDetail />} />

      {/* 404 fallback route */}
      <Route
        path="*"
        element={
          <main
            className="page"
            style={{
              textAlign: "center",
              padding: "40px",
            }}
          >
            <h2>404 – Page Not Found</h2>
            <a
              href="/"
              className="chip"
              style={{
                marginTop: 20,
                display: "inline-block",
                textDecoration: "none",
                color: "var(--brand)",
                fontWeight: 500,
              }}
            >
              ← Go Back Home
            </a>
          </main>
        }
      />
    </Routes>
  );
}
