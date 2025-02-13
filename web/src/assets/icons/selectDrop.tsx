import React from "react";

const SelectDrop: React.FC<{ fill: string }> = ({ fill }) => {
  return (
    <svg
      width="30"
      height="15"
      viewBox="0 0 34 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_359_4854)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9928 14.3891L7.97868 6.37499L9.98184 4.37183L16.9943 11.3843L24.0068 4.37183L26.01 6.37499L17.9959 14.3891C17.7303 14.6547 17.37 14.8039 16.9943 14.8039C16.6187 14.8039 16.2584 14.6547 15.9928 14.3891Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_359_4854">
          <rect
            width="17"
            height="34"
            fill="white"
            transform="matrix(0 1 -1 0 34 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SelectDrop;
