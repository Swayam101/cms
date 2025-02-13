import React, { memo } from "react";
import { Icons } from "../../assets/icons";

interface IProps {
  src: keyof typeof Icons;
  width: number | string;
  height: number | string;
  alt: string;
  className?: string;
}

const FImage: React.FC<IProps> = ({ alt, height, src, width, className }) => {
  return (
    <img
      src={Icons[src] as string}
      width={width}
      height={height}
      className={className}
      alt={alt}
    />
  );
};

export default memo(FImage);
