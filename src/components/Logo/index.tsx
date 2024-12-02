"use client";
import NextLink from "next/link";
import { useId, useState } from "react";
import routes from "../../routes";

export function LogoMark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & {
  invert?: boolean;
  filled?: boolean;
}) {
  let id = useId();

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        style={{
          height: "32px",
          width: filled ? "32px" : "0",
          transition: "width 0.3s ease",
          fill: invert ? "#E50808" : "#E50808",
        }}
      />
      <use
        href={`#${id}-path`}
        style={{
          stroke: invert ? "#E50808" : "#E50808",
          fill: "none",
          strokeWidth: "1.5",
        }}
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M3.25 26v.75H7c1.305 0 2.384-.21 3.346-.627.96-.415 1.763-1.02 2.536-1.752.695-.657 1.39-1.443 2.152-2.306l.233-.263c.864-.975 1.843-2.068 3.071-3.266 1.209-1.18 2.881-1.786 4.621-1.786h5.791V5.25H25c-1.305 0-2.384.21-3.346.627-.96.415-1.763 1.02-2.536 1.751-.695.658-1.39 1.444-2.152 2.307l-.233.263c-.864.975-1.843 2.068-3.071 3.266-1.209 1.18-2.881 1.786-4.621 1.786H3.25V26Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Logo({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & {
  invert?: boolean;
  filled?: boolean;
  fillOnHover?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <NextLink
      href={routes.home.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 200 32" aria-hidden="true" {...props}>
        <LogoMark
          preserveAspectRatio="xMinYMid meet"
          invert
          filled={hovered || filled}
        />
        <text
          x="40"
          y="22"
          style={{
            fill: invert ? "#E50808" : "#E50808",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          AEDO Connect
        </text>
      </svg>
    </NextLink>
  );
}
