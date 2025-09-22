import React, { useEffect, useMemo, useRef, useState } from 'react';

// SSR guard helpers
const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

// Utilities to get portfolio data from window or DOM fallbacks
function getPortfolioData() {
  if (!isBrowser()) return { skills: [], contact: {} };
  const w = window;
  const fromWindow = w.PORTFOLIO_DATA || {};

  // If already available on window, prefer it
  const skills = Array.isArray(fromWindow.skills) && fromWindow.skills.length
    ? fromWindow.skills
    : readSkillsFromDOM();

  const contact = fromWindow.contact && (fromWindow.contact.email || fromWindow.contact.phone)
    ? fromWindow.contact
    : readContactFromDOM();

  return { skills, contact };
}

function readSkillsFromDOM() {
  if (!isBrowser()) return [];
  const skills = new Set();
  // Look for Skills section structure
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    // skill cards have title text in h4 elements in this project
    skillsSection.querySelectorAll('h4').forEach(h4 => {
      const txt = (h4.textContent || '').trim();
      if (txt) skills.add(txt);
    });
  }
  return Array.from(skills);
}

function readContactFromDOM() {
  if (!isBrowser()) return {};
  const contact = {};
  const mailLink = document.querySelector('a[href^="mailto:"]');
  if (mailLink) {
    const href = mailLink.getAttribute('href') || '';
    contact.email = href.replace('mailto:', '').trim();
  }
  const telLink = document.querySelector('a[href^="tel:"]');
  if (telLink) {
    const href = telLink.getAttribute('href') || '';
    contact.phone = href.replace('tel:', '').trim();
  }
  return contact;
}

// Message bubble
function Message({ role, text }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 12px',
          borderRadius: 12,
          margin: '6px 0',
          background: isUser ? 'var(--accent)' : 'var(--surface)',
          color: isUser ? '#fff' : 'var(--text)'
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatBot({ defaultOpen = true, onClose }) {
  const [input, setInput] = useState('');
  const [optInHistory, setOptInHistory] = useState(() => {
    if (!isBrowser()) return false;
    try {
      const v = localStorage.getItem('chatbot_history_opt_in');
      return v ? v === 'true' : false;
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = useState(() => {
    if (!isBrowser()) return [];
    try {
      const saved = localStorage.getItem('chatbot_history');
      const opted = localStorage.getItem('chatbot_history_opt_in');
      return opted === 'true' && saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const data = useMemo(() => getPortfolioData(), [messages.length]);
  const listRef = useRef(null);

  useEffect(() => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem('chatbot_history_opt_in', optInHistory ? 'true' : 'false');
    } catch {}
  }, [optInHistory]);

  useEffect(() => {
    if (!isBrowser()) return;
    if (!optInHistory) return;
    try {
      localStorage.setItem('chatbot_history', JSON.stringify(messages));
    } catch {}
  }, [messages, optInHistory]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function addBot(text) {
    setMessages(prev => [...prev, { role: 'bot', text }]);
  }
  function addUser(text) {
    setMessages(prev => [...prev, { role: 'user', text }]);
  }

  // Typo normalization for common intents
  function normalize(text) {
    const t = (text || '').trim().toLowerCase();
    const map = new Map([
      ['helo', 'help'], ['hlep', 'help'], ['hep', 'help'],
      ['emial', 'email'], ['e-mail', 'email'], ['mai', 'mail'], ['maol', 'mail'],
      ['phon', 'phone'], ['phne', 'phone'], ['moblie', 'mobile'], ['moblile', 'mobile'],
      ['skils', 'skills'], ['skill', 'skills'],
      ['projcts', 'projects'], ['project', 'projects'],
      ['experiance', 'experience'], ['experinace', 'experience'],
      ['contct', 'contact'], ['cantact', 'contact'],
      ['them', 'theme'], ['themee', 'theme']
    ]);
    if (map.has(t)) return map.get(t);
    return t;
  }

  function scrollToSection(id, msg) {
    if (msg) addBot(msg);
    if (!isBrowser()) return;
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function handleHelp() {
    addBot(
      [
        'I can help with these commands:',
        '• show skills — list your skills',
        '• mail / email — show your email',
        '• phone / mobile — show your phone number',
        '• theme <name> — switch theme (e.g., theme Default, theme Netflix, theme Apple)',
        '• help — show this help',
        '',
        'Shortcuts to sections:',
        '• about — jump to About me',
        '• skills — jump to Skills',
        '• experience — jump to Experience',
        '• projects — jump to Projects',
        '• contact — jump to Get in Touch',
        '',
        'Try examples:',
        '• "show skills"',
        '• "email"',
        '• "phone"',
        '• "projects"'
      ].join('\n')
    );
  }

  function handleShowSkills() {
    const skills = data.skills || [];
    if (!skills.length) {
      addBot('I could not find any skills yet. Try visiting the Skills section first.');
      return;
    }
    addBot(`Here are some of your skills:\n- ${skills.join('\n- ')}`);
  }

  function handleEmail() {
    const email = data.contact?.email;
    if (email) {
      addBot(`Your email is ${email}. I can open your email client if you want.`);
    } else {
      addBot('I could not find an email address.');
    }
  }

  function handlePhone() {
    // Exact phrasing required
    addBot('Maheshwar mobile number is +919321825853.');
  }

  function handleTheme(nameRaw) {
    const name = (nameRaw || '').trim();
    if (!isBrowser()) {
      addBot('Theme switching is only available in the browser.');
      return;
    }
    const fn = window.applyTheme;
    if (typeof fn !== 'function') {
      addBot('Theme switcher is not available.');
      return;
    }
    const ok = fn(name);
    if (ok) addBot(`Switched theme to "${name}".`);
    else addBot(`Sorry, I do not recognize the theme "${name}".`);
  }

  function interpretCommand(text) {
    const t = text.trim();
    const lower = normalize(t);

    if (lower === 'help' || lower === 'commands') return handleHelp();
    if (lower === 'show skills' || lower === 'skills') return handleShowSkills();
    if (lower === 'mail' || lower === 'email') return handleEmail();
    if (lower === 'phone' || lower === 'mobile') return handlePhone();

    const themeMatch = lower.startsWith('theme ');
    if (themeMatch) {
      const name = t.slice(6);
      return handleTheme(name);
    }

    // Section redirects
    if (['contact', 'get in touch'].includes(lower)) return scrollToSection('#contact', 'Taking you to the Contact section...');
    if (['projects', 'project'].includes(lower)) return scrollToSection('#projects', 'Jumping to Projects...');
    if (['skills', 'skill'].includes(lower)) return scrollToSection('#skills', 'Jumping to Skills...');
    if (['about', 'about me'].includes(lower)) return scrollToSection('#about', 'Jumping to About me...');
    if (['experience', 'experiences'].includes(lower)) return scrollToSection('#experience', 'Jumping to Experience...');
    if (['home'].includes(lower)) return scrollToSection('#home', 'Back to Home...');

    // Default small talk
    addBot("I didn't understand. Type 'help' to see what I can do.");
  }

  function handleSend(e) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addUser(text);
    setInput('');
    setTimeout(() => interpretCommand(text), 50);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 480,
        height: 520,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.08)',
        background: 'var(--surface)'
      }}
    >
      <div style={{ padding: '12px 14px', background: 'var(--bg)', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <strong style={{ color: 'var(--text)' }}>Portfolio Chat</strong>
        <label title="Persist chat history on this device" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 12 }}>
          <input
            type="checkbox"
            checked={optInHistory}
            onChange={(e) => setOptInHistory(e.target.checked)}
            aria-label="Persist chat history"
          />
          Save history
        </label>
        {onClose && (
          <button onClick={onClose} style={{ color: 'var(--muted)' }} aria-label="Close chat">✕</button>
        )}
      </div>

      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 12, background: 'var(--bg)' }}>
        {messages.length === 0 && (
          <Message role="bot" text={[
            "Hi! I can jump to sections and answer quick questions.",
            "Try: 'show skills', 'email', 'phone', 'projects', 'about', or type 'help'."
          ].join('\n')} />
        )}
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, padding: 10, borderTop: '1px solid rgba(0,0,0,0.06)', background: 'var(--bg)' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: 'var(--text)' }}
        />
        <button type="submit" style={{ padding: '10px 14px', borderRadius: 12, background: 'var(--accent)', color: '#fff' }}>Send</button>
      </form>
    </div>
  );
}
