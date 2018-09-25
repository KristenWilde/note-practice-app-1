import React from 'react'

export default function Tab({ name, children }) {
	return (
    <div className="tab">
      <div className="tab-header">{name}</div>
      <div className="tab-body">{children}</div>
    </div>
  )
}