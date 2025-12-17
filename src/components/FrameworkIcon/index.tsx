import React from "react";

import useBaseUrl from "@docusaurus/useBaseUrl";

type FrameworkIconName = "javascript"
	| "react"
	| "angular"
	| "vue"
	| "svelte"
	| "salesforce";

type FrameworkIconProps = {
	name: FrameworkIconName ;
	className?: string;
	alt?: string;
};

const ICON_PATHS: Record<FrameworkIconName, string> = {
  javascript: "/img/frameworks/javascript.png",
  react: "/img/frameworks/react.png",
  angular: "/img/frameworks/angular.png",
  vue: "/img/frameworks/vue.png",
  svelte: "/img/frameworks/svelte.png",
  salesforce: "/img/frameworks/salesforce.png",
};

export function FrameworkIcon(props: FrameworkIconProps) {
  const { name, className, alt } = props;

  const iconPath = ICON_PATHS[name];
  if (!iconPath) {
    return null;
  }

  return (
    <img
      src={useBaseUrl(iconPath)}
      className={className}
      alt={alt || name}
      style={{
        width: "96px",
        height: "96px",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}