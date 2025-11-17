import React, { useMemo, useState, useEffect } from 'react'

export default function UserTable({ users, loading }) {
  // client-side table: search, sort, filter, pagination
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('first_name')
  const [sortDir, setSortDir] = useState('asc')
  const [filterDomain, setFilterDomain] = useState('')
  const [filterLetter, setFilterLetter] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  // derived filtered & sorted list
  const filtered = useMemo(() => {
    let list = users.slice()

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (u) =>
          `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    }

    if (filterDomain.trim()) {
      list = list.filter((u) =>
        u.email.toLowerCase().endsWith(filterDomain.toLowerCase())
      )
    }

    if (filterLetter.trim()) {
      list = list.filter((u) =>
        u.first_name.toLowerCase().startsWith(filterLetter.toLowerCase())
      )
    }

    list.sort((a, b) => {
      const av = (a[sortKey] || '').toString().toLowerCase()
      const bv = (b[sortKey] || '').toString().toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return list
  }, [users, search, sortKey, sortDir, filterDomain, filterLetter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  // ensure page stays in range
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages])

  const start = (page - 1) * pageSize
  const pageItems = filtered.slice(start, start + pageSize)

  const uniqueDomains = useMemo(() => {
    const s = new Set(users.map((u) => u.email.split('@')[1] || ''))
    return Array.from(s).filter(Boolean)
  }, [users])

  const letters = useMemo(() => {
    const s = new Set(users.map((u) => u.first_name[0].toUpperCase()))
    return Array.from(s).sort()
  }, [users])

  return (
    <div>
      {/* Filters & Search */}
      <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <input
                placeholder="🔍 Search name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                style={{ 
                  width: '100%',
                  padding: '12px 16px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              style={{ 
                padding: '12px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '15px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="first_name">📝 First name</option>
              <option value="email">📧 Email</option>
              <option value="last_name">👤 Last name</option>
            </select>

            <button
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              style={{ 
                padding: '12px 20px', 
                border: '2px solid #667eea', 
                borderRadius: '8px', 
                cursor: 'pointer',
                backgroundColor: '#667eea',
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              {sortDir === 'asc' ? '⬆️ Ascending' : '⬇️ Descending'}
            </button>

            <button
              onClick={() => {
                setSearch('')
                setSortKey('first_name')
                setSortDir('asc')
                setFilterDomain('')
                setFilterLetter('')
                setPage(1)
              }}
              style={{ 
                padding: '12px 20px', 
                border: '2px solid #6b7280', 
                borderRadius: '8px', 
                cursor: 'pointer',
                backgroundColor: 'white',
                color: '#6b7280',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#6b7280'
                e.target.style.color = 'white'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#6b7280'
              }}
            >
              🔄 Reset Filters
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={filterDomain}
              onChange={(e) => {
                setFilterDomain(e.target.value)
                setPage(1)
              }}
              style={{ 
                padding: '10px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="">🌐 All domains</option>
              {uniqueDomains.map((d) => (
                <option key={d} value={d}>
                  @{d}
                </option>
              ))}
            </select>

            <select
              value={filterLetter}
              onChange={(e) => {
                setFilterLetter(e.target.value)
                setPage(1)
              }}
              style={{ 
                padding: '10px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="">🔤 All letters</option>
              {letters.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: 'linear-gradient(to right, #667eea, #764ba2)', color: 'white' }}>
              <th style={{ padding: '16px', fontWeight: '600', fontSize: '15px' }}>Avatar</th>
              <th style={{ padding: '16px', fontWeight: '600', fontSize: '15px' }}>Name</th>
              <th style={{ padding: '16px', fontWeight: '600', fontSize: '15px' }}>Email</th>
              <th style={{ padding: '16px', fontWeight: '600', fontSize: '15px' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                  Loading...
                </td>
              </tr>
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: '#6b7280', fontSize: '16px' }}>
                  😔 No users found
                </td>
              </tr>
            ) : (
              pageItems.map((u, idx) => (
                <tr 
                  key={u.id} 
                  style={{ 
                    borderBottom: '1px solid #f3f4f6',
                    backgroundColor: idx % 2 === 0 ? 'white' : '#fafbfc',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f4ff'
                    e.currentTarget.style.transform = 'scale(1.01)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'white' : '#fafbfc'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <td style={{ padding: '16px' }}>
                    <img
                      src={u.avatar}
                      alt="avatar"
                      style={{ 
                        height: '56px', 
                        width: '56px', 
                        borderRadius: '50%',
                        border: '3px solid #667eea',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                      }}
                    />
                  </td>
                  <td style={{ padding: '16px', fontWeight: '600', fontSize: '15px', color: '#1f2937' }}>
                    {u.first_name} {u.last_name}
                  </td>
                  <td style={{ padding: '16px', color: '#6b7280', fontSize: '14px' }}>{u.email}</td>
                  <td style={{ padding: '16px' }}>
                    <a 
                      style={{ 
                        fontSize: '14px', 
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: '600',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid #667eea',
                        display: 'inline-block',
                        transition: 'all 0.2s'
                      }} 
                      href={`mailto:${u.email}`}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#667eea'
                        e.target.style.color = 'white'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#667eea'
                      }}
                    >
                      📧 Email
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontSize: '15px', color: '#6b7280', fontWeight: '500' }}>
          📊 Showing <strong>{Math.min(filtered.length, (page - 1) * 6 + 1)}</strong>–<strong>{Math.min(filtered.length, page * 6)}</strong> of <strong>{filtered.length}</strong> users
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: page === 1 ? '2px solid #e5e7eb' : '2px solid #667eea',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              backgroundColor: page === 1 ? '#f3f4f6' : 'white',
              color: page === 1 ? '#9ca3af' : '#667eea',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            onMouseOver={(e) => {
              if (page !== 1) {
                e.target.style.backgroundColor = '#667eea'
                e.target.style.color = 'white'
              }
            }}
            onMouseOut={(e) => {
              if (page !== 1) {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#667eea'
              }
            }}
          >
            ← Previous
          </button>

          <div style={{ 
            padding: '10px 20px', 
            border: '2px solid #667eea', 
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            color: '#667eea',
            backgroundColor: '#f0f4ff'
          }}>
            Page {page} / {totalPages}
          </div>

          <button
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: page === totalPages ? '2px solid #e5e7eb' : '2px solid #667eea',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              backgroundColor: page === totalPages ? '#f3f4f6' : 'white',
              color: page === totalPages ? '#9ca3af' : '#667eea',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            onMouseOver={(e) => {
              if (page !== totalPages) {
                e.target.style.backgroundColor = '#667eea'
                e.target.style.color = 'white'
              }
            }}
            onMouseOut={(e) => {
              if (page !== totalPages) {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#667eea'
              }
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
