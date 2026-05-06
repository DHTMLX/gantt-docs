import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

const CHATGPT_URL = 'https://chatgpt.com/?prompt=';
const CLAUDE_URL = 'https://claude.ai/new?q=';

const buildPrompt = (absoluteMdUrl, pageTitle) =>
  `Read ${absoluteMdUrl} and help me with questions about "${pageTitle}".`;

const toAbsolute = (mdUrl) => {
  if (typeof window === 'undefined') return mdUrl;
  return new URL(mdUrl, window.location.origin).toString();
};

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function CopyPageButton({ mdUrl, pageTitle }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const copiedTimer = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
  }, []);

  const copyMarkdown = async () => {
    try {
      const res = await fetch(mdUrl);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('CopyPageButton: failed to copy markdown', err);
    }
  };

  const viewAsMarkdown = () => {
    setOpen(false);
    window.open(mdUrl, '_blank', 'noopener,noreferrer');
  };

  const openInLLM = (baseUrl) => {
    setOpen(false);
    const prompt = buildPrompt(toAbsolute(mdUrl), pageTitle);
    window.open(baseUrl + encodeURIComponent(prompt), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.mainButton}
        onClick={copyMarkdown}
        aria-label={copied ? 'Page markdown copied' : 'Copy page as markdown'}
      >
        <span className={styles.icon}>{copied ? <CheckIcon /> : <CopyIcon />}</span>
        <span className={styles.label}>{copied ? 'Copied!' : 'Copy page'}</span>
      </button>
      <button
        type="button"
        className={styles.chevronButton}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open page actions menu"
      >
        <ChevronIcon />
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          <button type="button" className={styles.menuItem} onClick={viewAsMarkdown} role="menuitem">
            <span className={styles.menuIcon}><ExternalIcon /></span>
            <span className={styles.menuText}>
              <span className={styles.menuTitle}>View as Markdown</span>
              <span className={styles.menuDesc}>Open the raw .md in a new tab</span>
            </span>
          </button>
          <button type="button" className={styles.menuItem} onClick={() => openInLLM(CHATGPT_URL)} role="menuitem">
            <span className={styles.menuIcon}><ExternalIcon /></span>
            <span className={styles.menuText}>
              <span className={styles.menuTitle}>Open in ChatGPT</span>
              <span className={styles.menuDesc}>Ask ChatGPT about this page</span>
            </span>
          </button>
          <button type="button" className={styles.menuItem} onClick={() => openInLLM(CLAUDE_URL)} role="menuitem">
            <span className={styles.menuIcon}><ExternalIcon /></span>
            <span className={styles.menuText}>
              <span className={styles.menuTitle}>Open in Claude</span>
              <span className={styles.menuDesc}>Ask Claude about this page</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
