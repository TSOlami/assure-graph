"use client";

import { useState, useMemo } from "react";
import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  Integration,
  IntegrationCategory,
} from "@/data/integrations";
import IntegrationCard from "./IntegrationCard";
import AIBanner from "./AIBanner";
import IntegrationMetrics from "./IntegrationMetrics";
import ConnectModal from "./modals/ConnectModal";
import ManageModal from "./modals/ManageModal";
import DisconnectModal from "./modals/DisconnectModal";
import IntegrationDetailModal from "./modals/IntegrationDetailModal";
import AIControlMappingModal from "./modals/AIControlMappingModal";
import CustomIntegrationModal from "./modals/CustomIntegrationModal";

type ModalState =
  | { type: "connect"; integration: Integration }
  | { type: "manage"; integration: Integration }
  | { type: "disconnect"; integration: Integration }
  | { type: "detail"; integration: Integration }
  | { type: "ai-mapping" }
  | { type: "custom" }
  | null;

export default function IntegrationsContent() {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesCategory =
        activeCategory === "all" || integration.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [integrations, activeCategory, searchQuery]);

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  const handleConnectConfirm = (integration: Integration) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integration.id
          ? { ...i, status: "connected" as const, lastSync: "Just now", connectedAt: "Just now" }
          : i
      )
    );
    setModal(null);
  };

  const handleDisconnectConfirm = (integration: Integration) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integration.id
          ? { ...i, status: "not-connected" as const, lastSync: null, connectedAt: undefined }
          : i
      )
    );
    setModal(null);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header: Title + Subtitle + Buttons */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 sm:pt-5 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Integrations</h1>
            <p className="text-sm text-gray-600">Connect once. Collect continuously. Reuse everywhere.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setModal({ type: "ai-mapping" })}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700">
                <path d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              AI Mapping
            </button>
            <button
              onClick={() => setModal({ type: "custom" })}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33V12.67M3.33 8H12.67" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Custom integration
            </button>
          </div>
        </div>
        <IntegrationMetrics connectedCount={connectedCount} totalCount={integrations.length} />
      </div>

      {/* AI Banner */}
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <AIBanner />
      </div>

      {/* Search + Tabs (side by side on same row) */}
      <div className="flex items-center gap-4 px-6 bg-white border-b border-slate-200">
        {/* Search */}
        <div className="relative w-72 flex-shrink-0 py-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <path d="M14 14L10 10M11.33 6.67C11.33 9.24 9.24 11.33 6.67 11.33C4.09 11.33 2 9.24 2 6.67C2 4.09 4.09 2 6.67 2C9.24 2 11.33 4.09 11.33 6.67Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations..."
            autoComplete="off"
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-end flex-1 overflow-x-auto">
          {INTEGRATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-3 text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                activeCategory === cat.id
                  ? "text-brand-5 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-5" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Integration Cards */}
      <div className="flex-1 p-6">
        {filteredIntegrations.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-3 lg:grid-cols-2">
            {filteredIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={(i) => setModal({ type: "connect", integration: i })}
                onManage={(i) => setModal({ type: "manage", integration: i })}
                onViewDetail={(i) => setModal({ type: "detail", integration: i })}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 text-slate-300">
              <path d="M35 35L25 25M28.33 16.67C28.33 23.1 23.1 28.33 16.67 28.33C10.23 28.33 5 23.1 5 16.67C5 10.23 10.23 5 16.67 5C23.1 5 28.33 10.23 28.33 16.67Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-medium">No integrations found</p>
            <p className="text-xs mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type === "connect" && (
        <ConnectModal
          integration={modal.integration}
          onClose={() => setModal(null)}
          onConnect={handleConnectConfirm}
        />
      )}
      {modal?.type === "manage" && (
        <ManageModal
          integration={modal.integration}
          onClose={() => setModal(null)}
          onDisconnect={(i) => setModal({ type: "disconnect", integration: i })}
        />
      )}
      {modal?.type === "disconnect" && (
        <DisconnectModal
          integration={modal.integration}
          onClose={() => setModal(null)}
          onConfirm={handleDisconnectConfirm}
        />
      )}
      {modal?.type === "detail" && (
        <IntegrationDetailModal
          integration={modal.integration}
          onClose={() => setModal(null)}
          onManage={(i) => setModal({ type: "manage", integration: i })}
        />
      )}
      {modal?.type === "ai-mapping" && (
        <AIControlMappingModal
          integrations={integrations}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "custom" && (
        <CustomIntegrationModal onClose={() => setModal(null)} />
      )}
    </div>
  );
}
