import { Suspense } from "react";
import BhajanListClient from "./BhajanListClient";

export default function BhajansPage() {
  return (
    <div>
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-4 py-3">
        <span className="font-bold text-lg">Bhajans</span>
      </header>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        className="bg-orange-200 rounded-lg p-2 m-3 w-[calc(100%-1.5rem)] border-none outline-none"
      />

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <BhajanListClient />
      </Suspense>
    </div>
  );
}
