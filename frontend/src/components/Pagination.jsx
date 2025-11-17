import React from 'react'


export default function Pagination({ page, totalPages, onPageChange }) {
const pages = []
for (let i = 1; i <= totalPages; i++) pages.push(i)


return (
<div className="flex items-center gap-2 flex-wrap">
<button
className="px-3 py-1 rounded border"
onClick={() => onPageChange(Math.max(1, page - 1))}
disabled={page === 1}
>
Prev
</button>


{pages.map((p) => (
<button
key={p}
onClick={() => onPageChange(p)}
className={`px-3 py-1 rounded border ${p === page ? 'bg-blue-600 text-white' : ''}`}
>
{p}
</button>
))}


<button
className="px-3 py-1 rounded border"
onClick={() => onPageChange(Math.min(totalPages, page + 1))}
disabled={page === totalPages}
>
Next
</button>
</div>
)
}