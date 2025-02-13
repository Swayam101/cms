import React, { useState } from "react";
import { Checkbox, SimpleGrid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
  label: string;
  data: { _id: string; name: string }[];
  form: UseFormReturnType<any>;
  field: string;
}

const FCheckBoxWithSelectAll: React.FC<IProps> = ({
  label,
  data,
  form,
  field,
}) => {
  const [values, setValues] = useState(
    data.map((item) => ({ checked: false, key: item._id }))
  );

  const handleCheckboxChange = (index: number) => {
    const newValues = [...values];
    newValues[index].checked = !newValues[index].checked;
    setValues(newValues);

    form.setFieldValue(
      field,
      newValues.filter((v) => v.checked).map((v) => v.key)
    );
  };

  const handleSelectAllChange = () => {
    const allChecked = values.every((value) => value.checked);
    const newValues = values.map((value) => ({
      ...value,
      checked: !allChecked,
    }));
    setValues(newValues);

    form.setFieldValue(
      field,
      newValues.filter((v) => v.checked).map((v) => v.key)
    );
  };

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  return (
    <SimpleGrid
      style={{ width: "100%" }}
      cols={{ base: 4, sm: 3, lg: 4, xs: 2 }}
      spacing={{ base: "lg", sm: "sm", lg: "md" }}
      mt={"lg"}
    >
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label={`Select All ${label}`}
        onChange={handleSelectAllChange}
      />

      {data.map((item, index) => (
        <Checkbox
          key={item._id}
          label={item.name}
          checked={values[index].checked}
          onChange={() => handleCheckboxChange(index)}
        />
      ))}
    </SimpleGrid>
  );
};

export default FCheckBoxWithSelectAll;
