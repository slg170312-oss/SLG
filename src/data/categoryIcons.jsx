// Shared line icons per category, keyed by category id. Inherit color via
// currentColor and size via CSS (the svg width/height attrs are overridden by
// any CSS width/height on the call site). Used by the product tabs, the
// category cover badge, and the explore-categories grid so icons stay
// consistent everywhere (replaces the old per-category emoji).
const iconPaths = {
  'electric-motors': (
    <>
      <rect x="3" y="8" width="12" height="8" rx="2" />
      <path d="M15 11h3M18 9v6" />
      <path d="M6 8V6M9 8V6M12 8V6" />
      <path d="M5 16v1.6M13 16v1.6" />
    </>
  ),
  pumps: <path d="M12 3s6 5.5 6 10a6 6 0 0 1-12 0c0-4.5 6-10 6-10z" />,
  'air-compressors': (
    <>
      <path d="M3.5 18a8.5 8.5 0 0 1 17 0" />
      <path d="M12 18l4.5-4" />
      <circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  'wash-motors': (
    <>
      <path d="M4 15v-3a2 2 0 0 1 2-2h5l3-3" />
      <path d="M6 15v2.5" />
      <path d="M14 7h2.5" />
      <path d="M17 6l3-1M18 10h3M17 14l3 1" />
    </>
  ),
};

export default function CategoryIcon({ id, className }) {
  const paths = iconPaths[id];
  if (!paths) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
