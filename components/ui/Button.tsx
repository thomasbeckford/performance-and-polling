type Props = {
  children: string | React.ReactNode
  color?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}
export default function Button(props: Props) {
  const { children, color = 'primary', onClick, type = 'button' } = props
  const bgColor =
    color === 'primary'
      ? 'bg-blue-500'
      : color === 'secondary'
      ? 'bg-green-500'
      : 'bg-red-500'
  return (
    <button
      className={`${bgColor} border px-2 py-1 rounded-md`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
