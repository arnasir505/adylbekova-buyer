import { SVGProps } from '../model/types';

export const Search = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 27 27'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12.528 22.168C17.8564 22.168 22.176 17.8484 22.176 12.52C22.176 7.19155 17.8564 2.87199 12.528 2.87199C7.19956 2.87199 2.88 7.19155 2.88 12.52C2.88 17.8484 7.19956 22.168 12.528 22.168Z'
      stroke={color}
      strokeWidth='1.072'
    />
    <path
      d='M24.32 24.3119L20.8707 20.8625'
      stroke={color}
      strokeWidth='1.072'
    />
  </svg>
);
