import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  iconName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Your collection is empty",
  description = "Explore our catalogue to discover and track new books.",
  buttonText = "Search Books",
  buttonHref = "/books",
  iconName = "mdi:book-open-variant",
}) => {
  return (
    <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl p-8 max-w-sm mx-auto shadow-xs mt-10">
      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon icon={iconName} className="text-green-700" width="24" />
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-5">{description}</p>
      <Link
        href={buttonHref}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-green-700 hover:bg-green-800 px-4 py-2.5 rounded-xl transition-all shadow-xs"
      >
        <Icon icon="mdi:magnify" width="14" />
        {buttonText}
      </Link>
    </div>
  );
};