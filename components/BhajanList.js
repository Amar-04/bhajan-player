export default function BhajanList({ bhajans }) {
  return (
    <div>
      {bhajans.map((b, i) => (
        <div key={i} className="flex items-center p-3 border-b border-gray-200">
          <img
            src={b.image}
            alt={b.title}
            className="w-12 h-12 rounded-md mr-3"
          />
          <div>
            <div className="font-semibold">{b.title}</div>
            <small className="text-gray-600">
              {b.artist} • {b.duration}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
