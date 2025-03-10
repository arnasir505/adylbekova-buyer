import { SVGProps } from '../model/types';

export const ShoppingBag = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 27 27'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M4.36359 25.6841L5.23804 7.93259H22.7624L23.6368 25.6841H4.36359Z'
      stroke={color}
      strokeWidth='1.072'
    />
    <path
      d='M9.36389 11.6078L9.36389 6.67909C9.36389 5.44949 9.85235 4.27025 10.7218 3.40079C11.5913 2.53133 12.7705 2.04287 14.0001 2.04287C15.2297 2.04287 16.409 2.53133 17.2784 3.40079C18.1479 4.27025 18.6363 5.44949 18.6363 6.67909V11.6078'
      stroke={color}
      strokeWidth='1.072'
    />
  </svg>
);
