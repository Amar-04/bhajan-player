import { Suspense } from "react";
import BhajanListClient from "./BhajanListClient";

export default function BhajansPage() {
  return (
    <div>
      <header className="bg-[#ff9933] text-white flex flex-col justify-between px-4 py-6">
        <span className="font-bold text-lg">Bhajans</span>
        <div className="flex space-x-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="bg-[#ffa347] rounded-lg p-2 my-3 w-[calc(100%-1.5rem)] border-none outline-none"
          />

          <button
            className="text-2xl font-bold rounded-full bg-white self-center text-orange-300 px-2"
            onClick={() => setShowModal(true)}
          >
            +
          </button>
        </div>
      </header>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <BhajanListClient />
      </Suspense>
    </div>
  );
}
