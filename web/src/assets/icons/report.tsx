import React from "react";

const Report: React.FC = ({ color = "black" }: { color?: string }) => {
  return (
    <svg
      id="Report-Data--Streamline-Carbon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 14 14"
      height="22"
      width="22"
      fill={color}
    >
      <defs></defs>
      <title>report</title>
      <path d="M6.09375 8.125h0.8125v1.625h-0.8125Z" strokeWidth="1"></path>
      <path d="M8.125 7.3125h0.8125v2.4375h-0.8125Z" strokeWidth="1"></path>
      <path d="M4.0625 5.6875h0.8125v4.0625h-0.8125Z" strokeWidth="1"></path>
      <path
        d="M10.15625 2.03125h-1.21875V1.625a0.8125 0.8125 0 0 0 -0.8125 -0.8125h-3.25a0.8125 0.8125 0 0 0 -0.8125 0.8125v0.40625H2.84375a0.8125 0.8125 0 0 0 -0.8125 0.8125v8.53125a0.8125 0.8125 0 0 0 0.8125 0.8125h7.3125a0.8125 0.8125 0 0 0 0.8125 -0.8125V2.84375a0.8125 0.8125 0 0 0 -0.8125 -0.8125ZM4.875 1.625h3.25v1.625h-3.25Zm5.28125 9.75H2.84375V2.84375h1.21875v1.21875h4.875V2.84375h1.21875Z"
        strokeWidth="1"
      ></path>
      <path
        id="_Transparent_Rectangle_"
        d="M0 0h13v13H0Z"
        fill="none"
        strokeWidth="1"
      ></path>
    </svg>
  );
};

export default Report;
