"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  PersonnelRole,
  PersonnelDepartment,
  ROLE_LABELS,
  ROLE_DESCRIPTIONS,
  DEPARTMENTS,
} from "@/data/personnel";

interface EmailTag {
  id: string;
  email: string;
  valid: boolean;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function InvitePersonnelContent() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [emailInput, setEmailInput] = useState("");
  const [emailTags, setEmailTags] = useState<EmailTag[]>([]);
  const [selectedRole, setSelectedRole] = useState<PersonnelRole>("member");
  const [selectedDepartment, setSelectedDepartment] = useState<PersonnelDepartment | "">("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const addEmail = (raw: string) => {
    const emails = raw.split(/[,;\s]+/).filter(Boolean);
    const newTags: EmailTag[] = emails.map((e) => ({
      id: generateId(),
      email: e.trim(),
      valid: isValidEmail(e.trim()),
    }));
    if (newTags.length > 0) {
      setEmailTags((prev) => {
        const existingEmails = new Set(prev.map((t) => t.email.toLowerCase()));
        return [...prev, ...newTags.filter((t) => !existingEmails.has(t.email.toLowerCase()))];
      });
      setEmailInput("");
    }
  };

  const removeTag = (id: string) => setEmailTags((prev) => prev.filter((t) => t.id !== id));

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", ",", " ", "Tab"].includes(e.key)) {
      e.preventDefault();
      if (emailInput.trim()) addEmail(emailInput);
    } else if (e.key === "Backspace" && !emailInput && emailTags.length > 0) {
      setEmailTags((prev) => prev.slice(0, -1));
    }
  };

  const handleInputBlur = () => {
    if (emailInput.trim()) addEmail(emailInput);
  };

  const validTags = emailTags.filter((t) => t.valid);
  const canSend = validTags.length > 0;

  const handleSend = () => {
    if (!canSend) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 1200);
  };

  if (sent) {
    return (
      <div className="p-6 flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => router.push("/personnel")} className="hover:text-brand-5 transition-colors">
            Personnel
          </button>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-300">
            <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-slate-700 font-medium">Invite People</span>
        </div>

        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M33.333 10L16.667 26.667L8.333 18.333" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">Invitations Sent!</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed">
              We&apos;ve sent invitation emails to{" "}
              <span className="font-semibold text-slate-700">{validTags.length} {validTags.length === 1 ? "person" : "people"}</span>.
              They&apos;ll receive an email with instructions to join your organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSent(false); setEmailTags([]); setEmailInput(""); setMessage(""); }}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Invite More
            </button>
            <button
              onClick={() => router.push("/personnel")}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors"
            >
              Back to Personnel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={() => router.push("/personnel")} className="hover:text-brand-5 transition-colors">
          Personnel
        </button>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-300">
          <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-slate-700 font-medium">Invite People</span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Invite Team Members</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Invite people to join your organization on ControlGraph AI
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Email input section */}
        <div className="p-6 border-b border-slate-100">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Email Addresses
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Enter one or more email addresses separated by comma, space, or Enter
          </p>

          {/* Tag input */}
          <div
            className={clsx(
              "min-h-[80px] flex flex-wrap gap-2 p-3 border rounded-xl cursor-text transition-colors",
              "focus-within:ring-2 focus-within:ring-brand-5/20 focus-within:border-brand-5",
              emailTags.some((t) => !t.valid) ? "border-red-300" : "border-slate-200"
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {emailTags.map((tag) => (
              <span
                key={tag.id}
                className={clsx(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg",
                  tag.valid
                    ? "bg-brand-0-5 text-brand-5 border border-brand-1"
                    : "bg-red-50 text-red-600 border border-red-200"
                )}
              >
                {!tag.valid && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M5 1a4 4 0 100 8A4 4 0 005 1zm.5 6H4.5V4.5h1V7zm0-3H4.5V3h1v1z"/>
                  </svg>
                )}
                {tag.email}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeTag(tag.id); }}
                  className="ml-0.5 hover:opacity-70 transition-opacity"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder={emailTags.length === 0 ? "name@company.com, name2@company.com..." : ""}
              className="flex-1 min-w-[180px] outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent"
            />
          </div>

          {emailTags.some((t) => !t.valid) && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm.5 7.5h-1V5h1v3.5zm0-4.5h-1V3h1v1z"/>
              </svg>
              Some email addresses are invalid and will be skipped
            </p>
          )}
        </div>

        {/* Role selection */}
        <div className="p-6 border-b border-slate-100">
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            Assign Role
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {(["admin", "manager", "member", "viewer"] as PersonnelRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={clsx(
                  "flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all",
                  selectedRole === role
                    ? "border-brand-5 bg-brand-0-5"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                <div
                  className={clsx(
                    "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    selectedRole === role ? "border-brand-5" : "border-slate-300"
                  )}
                >
                  {selectedRole === role && (
                    <div className="w-2 h-2 rounded-full bg-brand-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{ROLE_LABELS[role]}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Department + message */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Department <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value as PersonnelDepartment)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors bg-white"
            >
              <option value="">Select department...</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Personal Message <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal note to the invitation email..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {validTags.length > 0 ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>
                  <span className="font-semibold text-slate-700">{validTags.length}</span> valid{" "}
                  {validTags.length === 1 ? "address" : "addresses"} ready to send
                </span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Add email addresses to invite</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/personnel")}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!canSend || isSending}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" strokeLinecap="round"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M13.5 1.5L6.5 8.5M13.5 1.5L9 13.5L6.5 8.5L1.5 6L13.5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send Invitations
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-brand-0-5 border border-brand-1 rounded-2xl px-5 py-4 flex gap-3">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-brand-5 flex-shrink-0 mt-0.5">
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M9 8.25V13.5M9 5.25V6.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <div>
          <p className="text-sm font-semibold text-brand-5">About Invitations</p>
          <p className="text-xs text-brand-6/80 mt-1 leading-relaxed">
            Invitees will receive an email with a link to create their account. Invitations expire after 7 days.
            You can resend or revoke invitations from the Personnel page.
          </p>
        </div>
      </div>
    </div>
  );
}
