import { SVGProps } from '../model/types';

export const Airplane = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 39 39'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M22.6667 14.6661L35.3333 22.6667V25.8333L22.6667 21.8338V30.3205L27.4167 32.9583V35.3333L20.2917 33.75L13.1667 35.3333V32.9583L17.9167 30.3189V21.8323L5.25 25.8333V22.6667L17.9167 14.6661V6.04167C17.9167 5.41178 18.1669 4.80769 18.6123 4.36229C19.0577 3.91689 19.6618 3.66667 20.2917 3.66667C20.9216 3.66667 21.5256 3.91689 21.971 4.36229C22.4164 4.80769 22.6667 5.41178 22.6667 6.04167V14.6661Z'
      fill={color}
    />
  </svg>
);
