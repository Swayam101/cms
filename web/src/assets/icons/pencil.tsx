import React from "react";
interface IPencil {
  onClick?: () => void;
  black?: boolean;
}
const Pencil: React.FC<IPencil> = ({ black, onClick }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor={"pointer"}
    >
      <path
        d="M2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425L2.25 12.9375ZM4.44 14.25H3.75V13.56L10.545 6.765L11.235 7.455L4.44 14.25ZM15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25C13.05 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.602 5.21061 15.6572 5.1282 15.6948 5.03747C15.7325 4.94674 15.7518 4.84948 15.7518 4.75125C15.7518 4.65302 15.7325 4.55576 15.6948 4.46503C15.6572 4.3743 15.602 4.29189 15.5325 4.2225Z"
        fill={`${black ? "black" : "white"}`}
      />
    </svg>
  );
};

export default Pencil;
