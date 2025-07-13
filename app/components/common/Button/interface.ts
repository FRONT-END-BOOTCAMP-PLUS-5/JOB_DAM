export default interface Props{
  text: string
  icon?: string
  type: string
  typeStyle?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

}