interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Standard page title component matching dashboard format.
 * Title: text-2xl font-semibold text-gray-900
 * Subtitle: text-sm text-gray-600
 */
export function PageTitle({ title, subtitle, className = "" }: PageTitleProps) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
}
