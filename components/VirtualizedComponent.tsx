'use client'

import React from 'react'
import { List, ListRowRenderer } from 'react-virtualized'

const data: number[] = Array.from({ length: 1000 }, (_, index) => index)

const VirtualizedComponent: React.FC = () => {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        {data[index]}
      </div>
    )
  }

  return (
    <List
      width={300}
      height={500}
      rowHeight={30}
      rowRenderer={rowRenderer}
      rowCount={data.length}
      className="mx-auto"
    />
  )
}

export default VirtualizedComponent

// Array.from creates a new array with 10000 items. Used as the data for the list.
// The List component receives the height of the area visible and the height for each row.
// This way, react virtualized manages to render only the visible rows, recycling elemnts as you scroll.
// This helps to optimize performance for large listss where rendering all items at once would be resource-intensive.

// Recycle: when you scroll, components are recycled and reused to render the new items that are now visible.
// They are not destroyed and recreated, which would be more expensive.
