"use client";

export function LandingBenefits() {
  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white">500+</div>
            <div className="text-sm text-gray-400 mt-1">Enterprise Customers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white">50+</div>
            <div className="text-sm text-gray-400 mt-1">Compliance Frameworks</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white">99.9%</div>
            <div className="text-sm text-gray-400 mt-1">Uptime SLA</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white">SOC 2</div>
            <div className="text-sm text-gray-400 mt-1">Type II Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
