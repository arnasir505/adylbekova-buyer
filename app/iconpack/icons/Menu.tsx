import { SVGProps } from '../model/types';

export const Menu = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 26 27'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M0.480835 13.2559H17.2851' stroke={color} strokeWidth='1.072' />
    <path d='M0.480713 5.7519H25.551' stroke={color} strokeWidth='1.072' />
    <path d='M0.480713 20.7599H25.551' stroke={color} strokeWidth='1.072' />
  </svg>
);
