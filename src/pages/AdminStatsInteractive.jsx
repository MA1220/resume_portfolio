import React, { useCallback, useEffect, useMemo, useState } from 'react';

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

const METRICS = [
  'visits',
  'chat_opens',
  'chat_messages',
  'resume_views',
  'resume_downloads',
];

function readJSON(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  if (!isBrowser()) return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function AdminStatsInteractive() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const [logs, setLogs] = useState({});

  // Gate by ?admin=true
  useEffect(() => {
    if (!isBrowser()) return;
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === 'true');
  }, []);

  const load = useCallback(() => {
    // Prefer site_analytics_v1, fall back to older 'analytics'
    const a = readJSON('site_analytics_v1', readJSON('analytics', {}));
    const l = readJSON('site_analytics_v1_logs', {});
    setAnalytics(a || {});
    setLogs(l || {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const ensureDefaults = useMemo(() => ({
    visits: 0,
    chat_opens: 0,
    chat_messages: 0,
    resume_views: 0,
    resume_downloads: 0,
  }), []);

  const getCount = (k) => (analytics && typeof analytics[k] === 'number' ? analytics[k] : ensureDefaults[k] || 0);

  const appendLog = (metric, note = 'manual') => {
    const entry = {
      t: new Date().toISOString(),
      metric,
      note,
    };
    const newLogs = { ...(logs || {}) };
    const arr = Array.isArray(newLogs[metric]) ? newLogs[metric].slice() : [];
    arr.unshift(entry);
    // keep last 100 per metric
    newLogs[metric] = arr.slice(0, 100);
    setLogs(newLogs);
    writeJSON('site_analytics_v1_logs', newLogs);
  };

  const increment = (metric) => {
    const next = { ...(analytics || {}) };
    next[metric] = (next[metric] || 0) + 1;
    setAnalytics(next);
    // Persist to v1 key
    writeJSON('site_analytics_v1', next);
    appendLog(metric, 'manual_increment');
  };

  const refresh = () => load();

  const clearAll = () => {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem('site_analytics_v1');
      localStorage.removeItem('site_analytics_v1_logs');
    } catch {}
    load();
  };

  const exportCSV = () => {
    const rows = [
      ['metric', 'count'],
      ...METRICS.map((m) => [m, getCount(m)])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site_analytics_v1.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return (
      <section className="section-padding" style={{ background: 'var(--bg)', minHeight: '60vh', color: 'var(--text)' }}>
        <div className="container-max" style={{ paddingTop: 40 }}>
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <h2 style={{ marginBottom: 8 }}>Admin access required</h2>
            <div style={{ color: 'var(--muted)' }}>Append <code>?admin=true</code> to the URL to view stats.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container-max" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700 }}>Admin Stats (Interactive)</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={refresh} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--surface)', color: 'var(--text)' }}>Refresh</button>
            <button onClick={exportCSV} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--surface)', color: 'var(--text)' }}>Export CSV</button>
            <button onClick={clearAll} style={{ padding: '8px 12px', borderRadius: 8, background: '#ef4444', color: '#fff' }}>Clear Data</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {METRICS.map((m) => (
            <div key={m} style={{ background: 'var(--surface)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--muted)' }}>{m}</div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>{getCount(m)}</div>
                </div>
                <button onClick={() => increment(m)} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--accent)', color: '#fff' }}>+1</button>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Recent events</div>
                <div style={{ maxHeight: 140, overflowY: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8 }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 8 }}>
                    {(Array.isArray(logs[m]) ? logs[m] : []).slice(0, 10).map((e, idx) => (
                      <li key={idx} style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 0' }}>
                        <span style={{ color: 'var(--text)' }}>{e.t}</span> — {e.note}
                      </li>
                    ))}
                    {!(Array.isArray(logs[m]) && logs[m].length) && (
                      <li style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 0' }}>No recent events</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
