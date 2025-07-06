interface ButtonProps {
  children: React.ReactNode;
  className: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

function Button({ children, className, type = 'button', onClick }: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
