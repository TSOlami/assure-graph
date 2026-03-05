"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AssureGraph</span>
            </Link>
            <p className="text-sm text-gray-600">
              AI-powered GRC platform for modern enterprises.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
              <li><Link href="#ai" className="text-gray-600 hover:text-gray-900">AssureAI</Link></li>
              <li><Link href="#integrations" className="text-gray-600 hover:text-gray-900">Integrations</Link></li>
              <li><Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Webinars</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          © 2024 AssureGraph. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
