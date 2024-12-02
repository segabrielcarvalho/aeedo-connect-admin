"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  renderDivider?: boolean;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  description,
  renderDivider = true,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "sm:flex sm:items-center sm:justify-between",
        renderDivider && "border-b border-gray-200 pb-6"
      )}
    >
      <div>
        <h2 className="text-xl font-semibold leading-6 text-gray-900">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      {children && (
        <div className="mt-3 flex space-x-3 sm:ml-4 sm:mt-0">{children}</div>
      )}
    </div>
  );
}
