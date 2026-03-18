type FilterType = 'ALL' | 'HAS_PENDING' | 'HAS_PREPARING' | 'HAS_ORDER';

interface DashboardFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'HAS_PENDING', label: '대기중' },
  { value: 'HAS_PREPARING', label: '준비중' },
  { value: 'HAS_ORDER', label: '주문 있음' },
];

export default function DashboardFilter({ currentFilter, onFilterChange }: DashboardFilterProps) {
  return (
    <div className="flex gap-2 mb-4" data-testid="dashboard-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentFilter === f.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          data-testid={`filter-${f.value.toLowerCase()}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export type { FilterType };
