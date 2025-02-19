import React, { Fragment, memo } from "react";
import classes from "./index.module.scss";
import {
  ComboboxData,
  Loader,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Select,
  SelectProps,
  Textarea,
  TextInput,
  TextInputProps,
  TextareaProps,
  MultiSelect,
  MultiSelectProps,
  ActionIcon,
} from "@mantine/core";
import {
  DateInput,
  DateInputProps,
  TimeInput,
  TimeInputProps,
} from "@mantine/dates";

import SelectDrop from "../../../assets/icons/selectDrop";
import { IconX } from "@tabler/icons-react";
type InputProps =
  | TextInputProps
  | NumberInputProps
  | SelectProps
  | DateInputProps
  | TimeInputProps
  | PasswordInputProps
  | MultiSelectProps
  | TextareaProps;

interface IProps {
  occupyfullWidth?: boolean;
  label: string;
  variant:
    | "text"
    | "number"
    | "select"
    | "date"
    | "time"
    | "password"
    | "longtext"
    | "multiselect";
  placeholder?: string;
  disabled?: boolean;
  formHandler?: InputProps;
  data?: ComboboxData;
  smallSelect?: boolean;
  selectLeftSection?: React.ReactNode;
  searchable?: boolean;
  onSearchChange?: (value: string) => void;
  loading?: boolean;
  isTodayDate?: boolean;
  resetDate?: () => void;
  searchValue?: string;
  value?: string | Date;
  maxSelection?: number;
  noClearDate?: boolean;
}
const FInput: React.FC<IProps> = ({
  label,
  placeholder,
  variant,
  disabled,
  formHandler,
  data,
  selectLeftSection,
  smallSelect,
  searchable,
  onSearchChange,
  loading,
  isTodayDate,
  resetDate,
  searchValue,
  maxSelection,
  noClearDate,
  occupyfullWidth,
}) => {
  let inputComponent;
  switch (variant) {
    case "text":
      inputComponent = (
        <TextInput
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          style={{ width: "100%" }}
          classNames={{ input: classes.input, label: classes.label }}
          autoComplete="false"
          {...(formHandler as TextInputProps)}
        />
      );
      break;
    case "number":
      inputComponent = (
        <NumberInput
          hideControls
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          classNames={{ input: classes.input, label: classes.label }}
          styles={{
            root: {
              width: "100%",
            },
          }}
          {...(formHandler as NumberInputProps)}
        />
      );
      break;
    case "select":
      inputComponent = (
        <Select
          disabled={disabled}
          placeholder={placeholder}
          withCheckIcon={false}
          rightSection={
            loading ? (
              <Loader color="gray" size={12} />
            ) : (
              <SelectDrop fill={smallSelect ? "#FFFFFF" : "#A6A6A6"} />
            )
          }
          leftSection={selectLeftSection}
          leftSectionPointerEvents="none"
          searchable={searchable}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          label={label}
          data={data}
          allowDeselect={false}
          classNames={{
            input: `${classes.selectInput} ${
              smallSelect && classes.smallSelect
            }`,
            label: classes.label,
            dropdown: classes.dropdown,
            option: classes.option,
            section: classes.section,
          }}
          {...(formHandler as SelectProps)}
        />
      );
      break;
    case "date":
      inputComponent = (
        <DateInput
          style={occupyfullWidth ? { flex: "1" } : {}}
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          classNames={{ input: classes.input, label: classes.label }}
          minDate={isTodayDate ? new Date() : new Date(0)}
          rightSection={
            (formHandler as DateInputProps)?.value &&
            !disabled &&
            noClearDate && (
              <ActionIcon
                onClick={() => {
                  if (resetDate) resetDate();
                }}
              >
                <IconX size={16} />
              </ActionIcon>
            )
          }
          allowDeselect
          {...(formHandler as DateInputProps)}
        />
      );
      break;
    case "time":
      inputComponent = (
        <TimeInput
          style={occupyfullWidth ? { flex: "1" } : {}}
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          classNames={{ input: classes.input, label: classes.label }}
          {...(formHandler as TimeInputProps)}
        />
      );
      break;
    case "password":
      inputComponent = (
        <PasswordInput
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          classNames={{ input: classes.input, label: classes.label }}
          {...(formHandler as PasswordInputProps)}
        />
      );
      break;
    case "longtext":
      inputComponent = (
        <Textarea
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          classNames={{ input: classes.input, label: classes.label }}
          {...(formHandler as TextareaProps)}
        />
      );
      break;
    case "multiselect":
      inputComponent = (
        <MultiSelect
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          data={data}
          searchable={searchable}
          leftSection={selectLeftSection}
          classNames={{
            input: classes.selectInput,
            label: classes.label,
            pill: classes.pill,
          }}
          {...(formHandler as MultiSelectProps)}
          maxValues={maxSelection}
        />
      );
      break;
    default:
      inputComponent = null;
  }
  return <Fragment>{inputComponent}</Fragment>;
};

export default memo(FInput);
