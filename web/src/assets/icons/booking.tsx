import React, { memo } from "react";

const Booking: React.FC = ({ color = "black" }: { color?: string }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.125 2.5H11.25L10.8125 2.6875L10 3.4875L9.1875 2.6875L8.75 2.5H1.875L1.25 3.125V15.625L1.875 16.25H8.4875L9.5625 17.3125H10.4375L11.5125 16.25H18.125L18.75 15.625V3.125L18.125 2.5ZM9.375 15.4L9.15 15.1875L8.75 15H2.5V3.75H8.4875L9.4125 4.675L9.375 15.4ZM17.5 15H11.25L10.8125 15.1875L10.6375 15.35V4.625L11.5125 3.75H17.5V15ZM7.5 6.25H3.75V7.5H7.5V6.25ZM7.5 11.25H3.75V12.5H7.5V11.25ZM3.75 8.75H7.5V10H3.75V8.75ZM16.25 6.25H12.5V7.5H16.25V6.25ZM12.5 8.75H16.25V10H12.5V8.75ZM12.5 11.25H16.25V12.5H12.5V11.25Z'
        fill={color}
      />
    </svg>
  );
};

export default memo(Booking);
