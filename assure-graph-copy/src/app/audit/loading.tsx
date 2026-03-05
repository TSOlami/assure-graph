import { Loader } from "@/components/global/Loader";

export default function AuditLoading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#FCFCFD]">
      <Loader label="Please wait..." />
    </div>
  );
}
