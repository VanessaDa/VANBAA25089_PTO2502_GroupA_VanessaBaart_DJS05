# 🎧 React Podcast App | DJS05 Project

## 📌 Project Overview

The **React Podcast App** is a responsive web application that allows users to browse and explore podcast shows, view detailed information about each show, and navigate between seasons and episodes seamlessly.

It demonstrates **dynamic routing**, **data fetching**, and **state management** in React — highlighting how to pass parameters between pages, fetch asynchronous data, and display graceful **loading**, **error**, and **empty** states.  
The app follows modern React practices, clean code structure, and accessibility standards while maintaining a polished, professional UI.

---

## 🚀 Features

- 🧭 **Dynamic Routing:** Each podcast links to its own detailed show page using React Router.
- 🎧 **Show Detail Page:** Displays the selected show’s **title**, **cover image**, **description**, **genres**, **last updated date**, **number of seasons**, and **total episodes**.
- 🔄 **Season Navigation:** Users can easily switch between seasons using a right-aligned dropdown.
- 📑 **Episode List:** Each season shows its episodes with:
  - Episode number (E01, E02, etc.)
  - Episode title
  - Shortened description
  - Season cover thumbnail
- ⏳ **Loading, Error, and Empty States:** Clear feedback while fetching data or when no episodes are available.
- 🧩 **Reusable Components:** Structured and modular components (`ShowDetail`, `EpisodeCard`, `SeasonNav`, etc.) for clean architecture.
- 🏷️ **Back Navigation:** “← Back” link retains homepage search and filter state via `useSearchParams`.
- 🖼️ **Polished UI:** Modern layout with grid-based hero section, consistent typography, and accessible color contrast.
- 🌞 **Light Mode:** Clean light design with consistent borders, shadows, and readable text.
- 📱 **Fully Responsive:** Scales gracefully from mobile to desktop screens.

---

## 🛠️ Technologies Used

- **React 18** (Vite + ES Modules)
- **React Router DOM v6**
- **JavaScript (ES2020+)**
- **CSS Grid / Flexbox**
- **Vite** for fast dev server and builds
- **JSDoc-style documentation**

---

## 🧩 How It Works

1. On the homepage, users browse a grid of podcast shows with search and genre filters.
2. Clicking a podcast navigates to `/show/:id`, dynamically fetching that show’s full details.
3. While fetching, a **loading state** appears.
4. If an error occurs, an **error message** is displayed.
5. Once loaded, the show page displays:
   - Large show image and title
   - Description text
   - Genre tags
   - “Last Updated,” “Total Seasons,” and “Total Episodes” stats
6. Below, a **Current Season** section lets users:
   - Switch between seasons via dropdown
   - View a list of episodes with thumbnails and summaries
7. The user can go **← Back** to the homepage — with all filters and search results preserved.

---

💡 **Usage Examples**

- Click on “Something Was Wrong” → loads full show details, genres, and seasons.
- Use the season dropdown → switches to another season dynamically.
- Disable internet connection → shows error message gracefully.
- If a season has no episodes → “No episodes in this season yet.” message appears.
- Click “← Back” → homepage reopens with the same filters and scroll position retained.

These flows demonstrate React Router’s **dynamic routes**, **data persistence**, and **robust UX** for the DJS05 learning outcomes.

---

## ⚙️ Setup Instructions

1. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
2. Open the printed local URL (usually `http://localhost:5173`).

### 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build
```

---

## 🗂️ Folder Structure

```
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/
│   │   └── styles.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ShowDetail.jsx
│   ├── components/
│   │   ├── EpisodeCard.jsx
│   │   ├── SeasonNav.jsx
│   │   └── Loader.jsx
│   ├── data/
│   │   └── shows.json (optional)
│   └── services/
│       └── fetchShowData.js
```

---

## 🔌 API Reference

- **Base URL:** `https://podcast-api.netlify.app`
- **Endpoints:**
  - `/` — Fetch all podcast shows
  - `/id/:id` — Fetch individual show details and episodes

---

## ♿ Accessibility Notes

- Descriptive `alt` text for all cover images
- Semantic HTML structure (e.g., `<main>`, `<section>`, `<nav>`)
- Keyboard-focus outlines for interactive elements
- Sufficient color contrast and legible font sizing

---

## 👤 Author

**Vanessa Baart**  
GitHub: [https://github.com/VanessaDa](https://github.com/VanessaDa)  
LinkedIn: [https://www.linkedin.com/in/vanessa-gwama-50841ab7](https://www.linkedin.com/in/vanessa-gwama-50841ab7)

---

## 📎 Notes

This project forms part of the CodeSpace Academy **React (DJS05)** module.  
Focus areas: **dynamic routing**, **data fetching**, **state persistence**, **season navigation**, **error handling**, and **responsive UI**.  
It fully satisfies all user stories in the DJS05 rubric and aligns with professional React development practices.
