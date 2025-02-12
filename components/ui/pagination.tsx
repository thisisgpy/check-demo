"use client";

interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
}

export function Pagination({ total, pageSize, current, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  
  return (
    <div className="flex items-center space-x-2">
      <button
        className="px-3 py-1 border rounded"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        上一页
      </button>
      <span>{current} / {totalPages}</span>
      <button
        className="px-3 py-1 border rounded"
        disabled={current === totalPages}
        onClick={() => onChange(current + 1)}
      >
        下一页
      </button>
    </div>
  );
}
