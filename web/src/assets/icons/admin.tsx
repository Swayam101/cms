import React, { memo } from "react";

const admin: React.FC = ({ color = "black" }: { color?: string }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.33341 18.3333C2.87508 18.3333 2.48286 18.1703 2.15675 17.8442C1.83064 17.5181 1.6673 17.1256 1.66675 16.6667V7.5C1.66675 7.04167 1.83008 6.64944 2.15675 6.32333C2.48341 5.99722 2.87564 5.83389 3.33341 5.83333H7.50008V3.33333C7.50008 2.875 7.66341 2.48278 7.99008 2.15667C8.31675 1.83056 8.70897 1.66722 9.16675 1.66667H10.8334C11.2917 1.66667 11.6842 1.83 12.0109 2.15667C12.3376 2.48333 12.5006 2.87556 12.5001 3.33333V5.83333H16.6667C17.1251 5.83333 17.5176 5.99667 17.8442 6.32333C18.1709 6.65 18.334 7.04222 18.3334 7.5V16.6667C18.3334 17.125 18.1704 17.5175 17.8442 17.8442C17.5181 18.1708 17.1256 18.3339 16.6667 18.3333H3.33341ZM3.33341 16.6667H16.6667V7.5H12.5001C12.5001 7.95833 12.337 8.35083 12.0109 8.6775C11.6848 9.00417 11.2923 9.16722 10.8334 9.16667H9.16675C8.70841 9.16667 8.31619 9.00361 7.99008 8.6775C7.66397 8.35139 7.50064 7.95889 7.50008 7.5H3.33341V16.6667ZM5.00008 15H10.0001V14.625C10.0001 14.3889 9.93397 14.17 9.80175 13.9683C9.66953 13.7667 9.48564 13.6106 9.25008 13.5C8.9723 13.375 8.69119 13.2814 8.40675 13.2192C8.1223 13.1569 7.82008 13.1256 7.50008 13.125C7.18008 13.1244 6.87786 13.1558 6.59341 13.2192C6.30897 13.2825 6.02786 13.3761 5.75008 13.5C5.51397 13.6111 5.3298 13.7675 5.19758 13.9692C5.06536 14.1708 4.99953 14.3894 5.00008 14.625V15ZM11.6667 13.75H15.0001V12.5H11.6667V13.75ZM7.50008 12.5C7.8473 12.5 8.14258 12.3786 8.38591 12.1358C8.62925 11.8931 8.75064 11.5978 8.75008 11.25C8.74953 10.9022 8.62814 10.6072 8.38591 10.365C8.14369 10.1228 7.84841 10.0011 7.50008 10C7.15175 9.99889 6.85675 10.1206 6.61508 10.365C6.37341 10.6094 6.25175 10.9044 6.25008 11.25C6.24841 11.5956 6.37008 11.8908 6.61508 12.1358C6.86008 12.3808 7.15508 12.5022 7.50008 12.5ZM11.6667 11.25H15.0001V10H11.6667V11.25ZM9.16675 7.5H10.8334V3.33333H9.16675V7.5Z'
        fill={color}
      />
    </svg>
  );
};

export default memo(admin);
