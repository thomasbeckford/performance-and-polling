import React from 'react'

interface RegularComponentProps {
  value: number
}

const RegularComponent: React.FC<RegularComponentProps> = ({ value }) => {
  console.log('Rendering RegularComponent')
  return <div>{value}</div>
}

export default RegularComponent
