import React, { useEffect, useMemo, useState } from "react";
import { NEWS_SEED } from "../data/newsSeed";
import { getConfig } from "../utils/config";

function formatDate(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

/**
 * Latest News section.
 * Currently uses local seed data; if REACT_APP_API_BASE exists, it attempts a fetch to
 * `${apiBase}/news` and falls back to seed data on failure.
 */
// PUBLIC_INTERFACE
export default function NewsList() {
  /** This is a public function. Renders a responsive list/grid of recent updates. */
  const { apiBase } = useMemo(() => getConfig(), []);
  const [items, setItems] = useState(NEWS_SEED);

  useEffect(() => {
    let cancelled = false;

    async function maybeFetch() {
      if (!apiBase) return;

      try {
        const res = await fetch(`${apiBase.replace(/\/+$/, "")}/news`, {
          headers: { Accept: "application/json" }
        });

        if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);
        const data = await res.json();

        // Expecting an array of { id, title, date, description, href }
        if (!Array.isArray(data)) throw new Error("News payload not an array");

        if (!cancelled && data.length) setItems(data);
      } catch (err) {
        // Non-blocking fallback: keep seed data.
        // eslint-disable-next-line no-console
        console.warn("[News] Falling back to static seed data:", err);
      }
    }

    maybeFetch();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  return (
    <section id="news" className="section" aria-label="Latest News">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Latest News</h2>
          <p className="section__subtitle">
            Project updates, policy wins, and community stories from the shorelines we serve.
          </p>
        </div>

        <div className="news-grid">
          {items.slice(0, 5).map((item) => (
            <article key={item.id} className="card news-card">
              <div className="news-card__meta">
                <span className="badge" aria-label={`Date ${formatDate(item.date)}`}>
                  {formatDate(item.date)}
                </span>
              </div>
              <h3 className="news-card__title">{item.title}</h3>
              <p className="news-card__desc">{item.description}</p>
              <a className="link" href={item.href} aria-label={`Read more: ${item.title}`}>
                Read more
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
