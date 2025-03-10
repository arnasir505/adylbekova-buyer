import { SVGProps } from '../model/types';

export const Separator = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 134 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M67.0831 10.8727L71.9603 5.99558H133.978V5.77389H71.9603L67.0831 0.952148L62.2614 5.77389H0.0220947V5.99558H62.2614L67.0831 10.8727ZM67.0831 1.28468L71.7386 5.88474L67.0831 10.5402L62.4277 5.88474L67.0831 1.28468Z'
      fill={color}
    />
  </svg>
);
