import React from 'react'

interface MemoizedComponentProps {
  value: number
}

const MemoizedComponent: React.FC<MemoizedComponentProps> = React.memo(
  ({ value }) => {
    console.log('Rendering MemoizedComponent', value)
    return <div>{value}</div>
  }
)

MemoizedComponent.displayName = 'MemoizedComponent' // Add this line

export default MemoizedComponent
