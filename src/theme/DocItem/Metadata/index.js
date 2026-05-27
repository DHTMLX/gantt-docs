import React from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import DocItemMetadata from '@theme-original/DocItem/Metadata';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import StructuredData from '@site/src/components/StructuredData';

export default function DocItemMetadataWrapper(props) {
    const { metadata, frontMatter, assets } = useDoc();
    const { pathname } = useLocation();

    const title = metadata.title;
    const description = metadata.description;
    const image = assets.image ?? frontMatter.image;

    return (
        <>
            <DocItemMetadata {...props} />
            <Head>
                {title && <meta name="twitter:title" content={title} />}
                {description && <meta name="twitter:description" content={description} />}
            </Head>
            <StructuredData
                title={title}
                description={description}
                pathname={pathname}
                image={image}
            />
        </>
    );
}
