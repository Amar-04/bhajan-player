"use client";
import { useSearchParams } from "next/navigation";
import BhajanList from "../../components/BhajanList";

export default function BhajansPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const allBhajans = [
    {
      title: "Om Shree Ganeshaya Namaha",
      artist: "Shubha Mudgal",
      duration: "4.56",
      image: "/ganesha.png",
      category: "Ganesha",
    },
    {
      title: "Shri Rama Raksha Stotram",
      artist: "Bharat Joshi",
      duration: "3.21",
      image: "/shiva.png",
      category: "Shiva",
    },
    {
      title: "Hanuman Chalisa",
      artist: "Rishikesh Kamerkar",
      duration: "4.89",
      image: "/ganesha.png",
      category: "Shiva",
    },
  ];

  const filteredBhajans = category
    ? allBhajans.filter((b) => b.category === category)
    : allBhajans;

  return (
    <div>
      {/* Header */}
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

      <BhajanList bhajans={filteredBhajans} />
    </div>
  );
}
