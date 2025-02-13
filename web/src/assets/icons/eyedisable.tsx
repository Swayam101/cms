import React from "react";
interface IProps {
  width?: number;
}
const EyeDisable: React.FC<IProps> = ({ width = 22 }) => {
  return (
    <svg
      width={`${width}`}
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8749 17.5C16.7928 17.5001 16.7115 17.484 16.6357 17.4526C16.5599 17.4211 16.491 17.375 16.4331 17.3168L2.68312 3.5668C2.57086 3.44864 2.5092 3.2913 2.51128 3.12832C2.51337 2.96534 2.57904 2.80963 2.69429 2.69438C2.80954 2.57913 2.96525 2.51346 3.12823 2.51137C3.29121 2.50929 3.44855 2.57095 3.56671 2.68321L17.3167 16.4332C17.4041 16.5206 17.4635 16.632 17.4876 16.7532C17.5117 16.8744 17.4993 17 17.4521 17.1141C17.4048 17.2283 17.3247 17.3259 17.222 17.3946C17.1193 17.4633 16.9985 17.5 16.8749 17.5ZM9.68742 12.3379L7.66437 10.3149C7.65278 10.3034 7.63787 10.2958 7.62176 10.2932C7.60564 10.2906 7.58911 10.2931 7.5745 10.3004C7.55989 10.3077 7.54793 10.3194 7.5403 10.3338C7.53266 10.3482 7.52974 10.3647 7.53195 10.3809C7.61362 10.9057 7.86006 11.391 8.23566 11.7666C8.61125 12.1422 9.09655 12.3886 9.6214 12.4703C9.63758 12.4725 9.65404 12.4696 9.66847 12.462C9.6829 12.4543 9.69458 12.4424 9.70186 12.4278C9.70914 12.4132 9.71167 12.3966 9.70908 12.3805C9.70649 12.3644 9.69891 12.3495 9.68742 12.3379ZM10.3124 7.66212L12.3386 9.68751C12.3502 9.69916 12.3651 9.70688 12.3813 9.70956C12.3975 9.71225 12.4141 9.70976 12.4288 9.70245C12.4435 9.69514 12.4556 9.68338 12.4632 9.66885C12.4708 9.65432 12.4737 9.63775 12.4714 9.62149C12.3899 9.09592 12.1433 8.60992 11.7672 8.23385C11.3912 7.85778 10.9052 7.61116 10.3796 7.52969C10.3633 7.52718 10.3467 7.52988 10.332 7.5374C10.3174 7.54492 10.3055 7.55687 10.298 7.57156C10.2906 7.58624 10.2879 7.60291 10.2905 7.61917C10.2931 7.63543 10.3008 7.65047 10.3124 7.66212Z"
        fill="#646465"
      />
      <path
        d="M19.1797 10.6781C19.309 10.4751 19.3774 10.2393 19.3767 9.99865C19.376 9.75797 19.3063 9.52255 19.1758 9.32031C18.1422 7.72188 16.8012 6.36406 15.298 5.39336C13.6328 4.31836 11.7969 3.75 9.9875 3.75C9.03363 3.75128 8.08625 3.90681 7.18203 4.21055C7.15672 4.21896 7.13399 4.23372 7.116 4.25341C7.09801 4.2731 7.08535 4.29706 7.07925 4.32302C7.07314 4.34899 7.07377 4.37608 7.0811 4.40172C7.08842 4.42737 7.10219 4.45071 7.12109 4.46953L8.9664 6.31484C8.98557 6.33405 9.00941 6.34793 9.03558 6.35512C9.06174 6.36231 9.08933 6.36257 9.11562 6.35586C9.74111 6.20343 10.3953 6.2146 11.0152 6.38829C11.6352 6.56199 12.1999 6.89235 12.6551 7.34758C13.1104 7.80281 13.4407 8.36758 13.6144 8.9875C13.7881 9.60742 13.7993 10.2616 13.6469 10.8871C13.6402 10.9133 13.6405 10.9409 13.6477 10.9669C13.6549 10.993 13.6687 11.0168 13.6879 11.0359L16.3422 13.6922C16.3698 13.7199 16.4068 13.7362 16.4458 13.7379C16.4849 13.7396 16.5232 13.7267 16.5531 13.7016C17.5748 12.8307 18.4602 11.8116 19.1797 10.6781ZM10 13.75C9.43232 13.75 8.87204 13.6212 8.36141 13.3732C7.85078 13.1251 7.40312 12.7644 7.05219 12.3182C6.70125 11.872 6.4562 11.352 6.33552 10.7973C6.21483 10.2426 6.22165 9.66769 6.35547 9.11602C6.3621 9.08978 6.36181 9.06227 6.35462 9.03618C6.34743 9.01009 6.33359 8.98632 6.31445 8.96719L3.70351 6.35508C3.67583 6.32736 3.63874 6.31105 3.5996 6.30939C3.56046 6.30773 3.52212 6.32083 3.49219 6.34609C2.53945 7.15898 1.65625 8.14805 0.848826 9.30391C0.707492 9.50676 0.629654 9.74705 0.625202 9.99425C0.620751 10.2414 0.689887 10.4844 0.823826 10.6922C1.85547 12.3066 3.18281 13.6664 4.66289 14.6238C6.33047 15.7031 8.12187 16.25 9.9875 16.25C10.951 16.2474 11.9082 16.0952 12.825 15.7988C12.8505 15.7907 12.8735 15.7761 12.8918 15.7565C12.9101 15.7368 12.923 15.7129 12.9293 15.6868C12.9356 15.6608 12.9351 15.6335 12.9279 15.6077C12.9206 15.5819 12.9069 15.5584 12.8879 15.5395L11.0336 13.6855C11.0145 13.6664 10.9907 13.6526 10.9646 13.6454C10.9385 13.6382 10.911 13.6379 10.8848 13.6445C10.5951 13.7147 10.2981 13.7501 10 13.75Z"
        fill="#646465"
      />
    </svg>
  );
};

export default EyeDisable;
