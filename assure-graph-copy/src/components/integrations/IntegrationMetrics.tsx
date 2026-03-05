import clsx from "clsx";

interface MetricCard {
  label: string;
  value: string;
  variant: "default" | "brand" | "green";
  icon?: "check-circle";
}

interface IntegrationMetricsProps {
  connectedCount: number;
  totalCount: number;
}

export default function IntegrationMetrics({
  connectedCount,
  totalCount,
}: IntegrationMetricsProps) {
  const metrics: MetricCard[] = [
    {
      label: "Connected Sources",
      value: `${connectedCount}/${totalCount}`,
      variant: "default",
    },
    { label: "Evidence Auto-Collected", value: "156", variant: "default" },
    { label: "Controls Covered", value: "75", variant: "default" },
    { label: "AI Mapped Controls", value: "56", variant: "brand" },
    { label: "Avg. Data Quality", value: "94%", variant: "green" },
    {
      label: "Last Sync Status",
      value: "Healthy",
      variant: "green",
      icon: "check-circle",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={clsx(
            "flex flex-col gap-1 p-3 rounded-lg border",
            metric.variant === "brand"
              ? "bg-brand-0-5 border-brand-2"
              : metric.variant === "green"
              ? "bg-green-50 border-green-200"
              : "bg-slate-50 border-slate-200"
          )}
        >
          <span
            className={clsx(
              "text-xs",
              metric.variant === "brand"
                ? "text-brand-5"
                : metric.variant === "green"
                ? "text-green-700"
                : "text-slate-600"
            )}
          >
            {metric.label}
          </span>
          <div className="flex items-center gap-1.5">
            {metric.icon === "check-circle" && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600 flex-shrink-0"
              >
                <path
                  d="M13.3334 4L6.00008 11.3333L2.66675 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <span
              className={clsx(
                "text-xl font-semibold leading-tight",
                metric.variant === "brand"
                  ? "text-brand-5"
                  : metric.variant === "green"
                  ? "text-green-800"
                  : "text-slate-900"
              )}
            >
              {metric.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
