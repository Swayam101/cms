import React, { memo } from "react";

const manage: React.FC = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.402035 0.337036H1.08953H14.8395H15.527V1.02454V14.7745V15.462H14.8395H1.08953H0.402035V14.7745V1.02454V0.337036ZM1.77703 1.71204V7.21204H7.27703V1.71204H1.77703ZM8.65203 1.71204V7.21204H14.152V1.71204H8.65203ZM1.77703 8.58704V14.087H7.27703V8.58704H1.77703ZM8.65203 8.58704V14.087H14.152V8.58704H8.65203Z'
        fill='black'
      />
    </svg>
  );
};

export default memo(manage);
