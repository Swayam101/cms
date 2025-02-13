import { Select } from "@mantine/core";
import React, { memo } from "react";
import classes from "../finput/index.module.scss";

interface Props {
  placeholder: string;
  data: { label: string; value: string }[];
  onChange?: (e: { label: string; value: string }) => void;
  disabled?: boolean;
  value?: string;
}

const FSelect: React.FC<Props> = ({
  placeholder,
  data,
  onChange,
  disabled,

  value,
}) => {
  return (
    <Select
      value={value}
      placeholder={placeholder}
      leftSectionPointerEvents="none"
      searchable={true}
      disabled={disabled}
      data={data}
      allowDeselect={false}
      classNames={{
        input: classes.selectInput,
        label: classes.label,
        dropdown: classes.dropdown,
        option: classes.option,
        section: classes.section,
      }}
      onChange={(e) => {
        const selected = data.find((x) => x.value === e);
        if (selected && onChange) onChange(selected);
      }}
    />
  );
};

export default memo(FSelect);
