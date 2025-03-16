import { SVGProps } from '../model/types';

export const StarCheck = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 39 39'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M9.68329 33.75L12.2166 22.6667L3.66663 15.0667L15.0666 14.1167L19.5 3.66666L23.9333 14.1167L35.3333 15.0667L30.2666 19.5H29C24.0916 19.5 20.1333 23.1417 19.5 27.8917L9.68329 33.75ZM28.6833 34.0667L36.2833 26.4667L34.225 24.25L28.525 29.95L26.15 27.4167L24.25 29.3167L28.6833 34.0667Z'
      fill={color}
    />
  </svg>
);
