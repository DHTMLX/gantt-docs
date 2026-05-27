import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

const SITE_NAME = 'DHTMLX Gantt Docs';
const PRODUCT_NAME = 'DHTMLX Gantt';
const PRODUCT_URL = 'https://dhtmlx.com/docs/products/dhtmlxGantt/';

function resolveType(pathname) {
    const path = (pathname || '').replace(/\/+$/, '');
    if (path === '' || path === '/gantt') return 'SoftwareApplication';
    if (/\/api(\/|$)/.test(path)) return 'APIReference';
    return 'TechArticle';
}

function buildJsonLd({ type, title, description, url, image, siteUrl }) {
    const base = {
        '@context': 'https://schema.org',
        headline: title,
        name: title,
        description,
        url,
        image,
        inLanguage: 'en-US',
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: siteUrl
        }
    };

    if (type === 'SoftwareApplication') {
        return {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: PRODUCT_NAME,
            description,
            url,
            image,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Cross-platform',
            offers: {
                '@type': 'Offer',
                url: PRODUCT_URL,
                priceCurrency: 'USD'
            }
        };
    }

    if (type === 'APIReference') {
        return {
            ...base,
            '@type': 'APIReference',
            programmingModel: 'JavaScript',
            about: {
                '@type': 'SoftwareApplication',
                name: PRODUCT_NAME,
                applicationCategory: 'DeveloperApplication'
            }
        };
    }

    return {
        ...base,
        '@type': 'TechArticle',
        proficiencyLevel: 'Beginner',
        dependencies: PRODUCT_NAME,
        about: {
            '@type': 'SoftwareApplication',
            name: PRODUCT_NAME,
            applicationCategory: 'DeveloperApplication'
        }
    };
}

export default function StructuredData({ title, description, pathname, image }) {
    const { siteConfig } = useDocusaurusContext();
    const { withBaseUrl } = useBaseUrlUtils();

    const siteUrl = siteConfig.url + siteConfig.baseUrl.replace(/\/$/, '');
    const url = siteConfig.url + withBaseUrl(pathname || '/');
    const absoluteImage = image ? withBaseUrl(image, { absolute: true }) : undefined;

    const type = resolveType(pathname);
    const jsonLd = buildJsonLd({
        type,
        title,
        description,
        url,
        image: absoluteImage,
        siteUrl
    });

    return (
        <Head>
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Head>
    );
}
