import type { Category } from '../types';

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function CategoryNav({ categories, selectedId, onSelect }: Props) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="카테고리">
      <button
        role="tab"
        aria-selected={selectedId === null}
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${selectedId === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={selectedId === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${selectedId === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
