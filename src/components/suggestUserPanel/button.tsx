import clsx from 'clsx';

interface IProps {
  children: React.ReactNode;
  blacked?: boolean;
}

const Button = ({ children, blacked = false }: IProps) => {
  return (
    <button
      className={clsx(
        'text-xs font-semibold text-blue-500',
        blacked ? 'text-black' : 'text-blue-500',
      )}
    >
      {children}
    </button>
  );
};

export default Button;
