import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  text: string;
  actionLabel: string;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    text: "Prioritize reviewing 3 HR controls expiring this week.",
    actionLabel: "View control",
  },
  {
    id: "2",
    text: "Auto-map 12 new evidence items to SOC 2 requirements.",
    actionLabel: "View evidence",
  },
  {
    id: "3",
    text: "Schedule risk assessment for 2 high-priority vendors",
    actionLabel: "View risk assessment",
  },
];

export function AIRecommendations() {
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#F05A35"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-700"
        >
          <path
            d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
            stroke="#F05A35"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
            stroke="#F05A35"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-sm font-semibold text-white">AI Recommendations</h2>
      </div>

      <div className="flex flex-col gap-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-gray-800 rounded-lg p-3.5">
            <p className="text-sm text-gray-200 leading-relaxed mb-2.5">
              {rec.text}
            </p>
            <button
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: "#f05a35" }}
            >
              {rec.actionLabel}
              <i className="lni lni-arrow-top-right text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
