export default function AddCategoryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 animate-slide-up">
        <h3 className="text-lg font-bold mb-3">Add Category</h3>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded mb-2"
        />
        <input type="file" className="w-full border p-2 rounded mb-2" />
        <input type="file" className="w-full border p-2 rounded mb-2" />
        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Background"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
