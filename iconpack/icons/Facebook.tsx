import { SVGProps } from '../model/types';

export const Facebook = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M22.104 12.4961C22.104 6.97609 17.624 2.49609 12.104 2.49609C6.584 2.49609 2.104 6.97609 2.104 12.4961C2.104 17.3361 5.544 21.3661 10.104 22.2961V15.4961H8.104V12.4961H10.104V9.99609C10.104 8.06609 11.674 6.49609 13.604 6.49609H16.104V9.49609H14.104C13.554 9.49609 13.104 9.94609 13.104 10.4961V12.4961H16.104V15.4961H13.104V22.4461C18.154 21.9461 22.104 17.6861 22.104 12.4961Z'
      fill={color}
    />
  </svg>
);
