export default function CategoryCard({ category, onClick }) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md m-3 cursor-pointer"
      onClick={() => onClick(category)}
    >
      <img src={category.image} alt={category.name} className="w-full" />
      <div className="p-3">
        <small className="text-orange-500 font-bold">
          {category.description}
        </small>
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </div>
  );
}
