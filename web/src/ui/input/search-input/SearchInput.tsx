import { TextInput, TextInputProps } from "@mantine/core";
import React, { memo } from "react";
import Search from "../../../assets/icons/search";
import classes from "./index.module.scss";
interface IProps {
  placeholder: string;
  formHandler?: TextInputProps;
}
const SearchInput: React.FC<IProps> = ({ placeholder, formHandler }) => {
  return (
    <TextInput
      classNames={{ input: classes.input }}
      placeholder={placeholder}
      leftSection={<Search />}
      {...(formHandler as TextInputProps)}
    />
  );
};

export default memo(SearchInput);
