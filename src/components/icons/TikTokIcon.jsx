// Lucide nima TikTok ikone, zato uporabimo lasten SVG po enakem stilu
export default function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.6 5.82c-1.01-.88-1.6-2.16-1.6-3.57h-3.18v13.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.94c-3.49-.47-6.55 2.24-6.55 5.71 0 3.18 2.61 5.6 5.78 5.6 3.18 0 5.78-2.6 5.78-5.78V8.79a8.16 8.16 0 0 0 4.79 1.54V7.15c0-.01-1.81.05-3.2-1.33z" />
    </svg>
  );
}
