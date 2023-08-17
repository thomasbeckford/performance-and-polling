type Props = {
  title: string
  children: React.ReactNode
}

export default function Card(props: Props) {
  const { title, children } = props

  return (
    <div>
      <div className="border border-white text-center p-5">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  )
}
