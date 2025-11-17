import React from 'react'

export default function Spinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
      <div style={{ 
        width: '64px', 
        height: '64px', 
        border: '5px solid #e5e7eb', 
        borderTop: '5px solid #667eea', 
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <p style={{ marginTop: '20px', color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>Loading users...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}