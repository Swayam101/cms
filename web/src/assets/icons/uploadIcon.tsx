import React, { memo } from "react";

const uploadIcon: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='25'
      viewBox='0 0 24 24'
    >
      <path
        fill='#A6A6A6'
        d='M18.22 20.75H5.78A2.64 2.64 0 0 1 3.25 18v-3a.75.75 0 0 1 1.5 0v3a1.16 1.16 0 0 0 1 1.25h12.47a1.16 1.16 0 0 0 1-1.25v-3a.75.75 0 0 1 1.5 0v3a2.64 2.64 0 0 1-2.5 2.75M16 8.75a.74.74 0 0 1-.53-.22L12 5.06L8.53 8.53a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22'
      />
      <path
        fill='#A6A6A6'
        d='M12 15.75a.76.76 0 0 1-.75-.75V4a.75.75 0 0 1 1.5 0v11a.76.76 0 0 1-.75.75'
      />
    </svg>
  );
};

export default memo(uploadIcon);
