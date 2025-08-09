import { Suspense } from "react";
import BhajanListClient from "./BhajanListClient";

export default function BhajansPage() {
  return (
    <div>
      {/* Header */}
      <header className="bg-[#ff9933] text-white flex flex-col justify-between px-4 py-3">
        <span className="font-bold text-lg">Bhajans</span>
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="bg-[#ffa347] rounded-lg p-2 my-3 w-[calc(100%-1.5rem)] border-none outline-none"
        />
      </header>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <BhajanListClient />
      </Suspense>
    </div>
  );
}
