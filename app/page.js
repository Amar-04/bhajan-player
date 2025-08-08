"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryCard from "../components/CategoryCard";
import AddCategoryModal from "../components/AddCategoryModal";

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const categories = [
    {
      name: "Ganesha",
      description: "REMOVER-OF-OBSTACLES",
      image: "/ganesha.png",
    },
    { name: "Shiva", description: "DESTROYER", image: "/shiva.png" },
  ];

  const handleCategoryClick = (category) => {
    router.push(`/bhajans?category=${category.name}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-[#ff9933] text-white flex flex-col justify-between px-4 py-6">
        <span className="font-bold text-lg">Bhajan Categories</span>
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

      {/* Categories */}
      {categories.map((c, i) => (
        <CategoryCard key={i} category={c} onClick={handleCategoryClick} />
      ))}

      {/* Modal */}
      {showModal && <AddCategoryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
