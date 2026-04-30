import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import OriginalContent from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import CopyPageButton from '@site/src/components/CopyPageButton';

const SAFE_LAYOUT_EFFECT = ExecutionEnvironment.canUseDOM ? useLayoutEffect : useEffect;

const DOCS_PREFIX_RE = /^@site\/docs\//;
const I18N_PREFIX_RE = /^@site\/i18n\/[^/]+\/docusaurus-plugin-content-docs\/current\//;

function computeMdUrl(source, locale, baseUrl) {
  if (!source) return null;
  let rel;
  if (DOCS_PREFIX_RE.test(source)) {
    rel = source.replace(DOCS_PREFIX_RE, '');
  } else if (I18N_PREFIX_RE.test(source)) {
    rel = source.replace(I18N_PREFIX_RE, '');
  } else {
    return null;
  }
  rel = rel.replace(/\.mdx?$/, '.md');
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}llms-md/${locale}/${rel}`;
}

function CopyPageButtonPortal({ mdUrl, pageTitle }) {
  const [host, setHost] = useState(null);
  const hostRef = useRef(null);

  SAFE_LAYOUT_EFFECT(() => {
    const h1 = document.querySelector(
      'article header h1, article .markdown h1',
    );
    if (!h1 || !h1.parentNode) return undefined;

    const div = document.createElement('div');
    div.className = 'copy-page-button-host';
    h1.parentNode.insertBefore(div, h1.nextSibling);
    hostRef.current = div;
    setHost(div);

    return () => {
      if (hostRef.current && hostRef.current.parentNode) {
        hostRef.current.parentNode.removeChild(hostRef.current);
      }
      hostRef.current = null;
    };
  }, [mdUrl]);

  if (!host) return null;
  return createPortal(
    <CopyPageButton mdUrl={mdUrl} pageTitle={pageTitle} />,
    host,
  );
}

export default function ContentWrapper(props) {
  const { metadata } = useDoc();
  const { i18n, siteConfig } = useDocusaurusContext();
  const mdUrl = computeMdUrl(metadata.source, i18n.currentLocale, siteConfig.baseUrl);

  return (
    <>
      <OriginalContent {...props} />
      {mdUrl && <CopyPageButtonPortal mdUrl={mdUrl} pageTitle={metadata.title} />}
    </>
  );
}
