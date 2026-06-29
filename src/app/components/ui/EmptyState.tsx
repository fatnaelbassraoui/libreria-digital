import { Icon } from "@iconify/react";
import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 max-w-sm mx-auto mt-10">
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon
          icon="mdi:book-open-variant"
          className="text-green-700 dark:text-green-500"
          width="24"
        />
      </div>
      <h3 className="text-sm font-bold text-card-foreground mb-1">
        Your collection is empty
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Explore our catalogue to discover and track new books.
      </p>
      <Link
        href="/books"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-green-700 hover:bg-green-800 px-4 py-2.5 rounded-xl transition-all"
      >
        <Icon icon="mdi:magnify" width="14" />
        Search Books
      </Link>
    </div>
  );
};
