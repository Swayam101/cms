import React, { memo, useEffect } from "react";
import FInput from "../../../ui/input/finput/FInput";
import { useForm, yupResolver } from "@mantine/form";
import FButton from "../../../ui/button/FButton";
import { Button, Flex, Tooltip } from "@mantine/core";
import {
  THolidayCategory,
  useAddHolidayMutation,
} from "../../../hooks/holiday/useAddHoliday";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import Delete from "../../../assets/icons/delete";
import { useGetHolidayById } from "../../../hooks/holiday/useGetHolidayById";
import { useDeleteHolidayMutation } from "../../../hooks/holiday/useDeleteHoliday";
import { confirmationAlert } from "../Fmodals";
import { holidayValidation } from "../../../validations/holiday.validation";
interface IHolidayModal {
  date: Date;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
  edit: boolean;
  id?: string;
}
interface IForm {
  date: Date;
  holiday: string;
  category: string;
}
const HolidayModal: React.FC<IHolidayModal> = ({ date, refetch, edit, id }) => {
  const { mutateAsync, isPending } = useAddHolidayMutation();
  const { data } = useGetHolidayById(id);
  const { mutateAsync: deleteMutate, isPending: deletePending } =
    useDeleteHolidayMutation();

  const form = useForm({
    initialValues: {
      date: date,
      holiday: "",
      category: "",
    },
    validate: yupResolver(holidayValidation),
  });
  useEffect(() => {
    if (data?.data) {
      form.setFieldValue("category", data.data.category);
      form.setFieldValue("holiday", data.data.name);
    } else {
      form.setFieldValue("category", "");
      form.setFieldValue("holiday", "");
    }
  }, [data]);
  const handleSubmit = async (values: IForm) => {
    const res = await mutateAsync({
      data: {
        id: id,
        category: values.category as THolidayCategory,
        date: values.date,
        name: values.holiday,
      },
    });
    if (res.status === "success") {
      notifications.show({
        message: res.message,
        title: res.title,
        color: "green",
      });
      refetch();
      modals.closeAll();
    } else {
      notifications.show({
        message: res.message,
        title: res.title,
        color: "red",
      });
      refetch();
      modals.closeAll();
    }
  };

  const handleDelete = async () => {
    const result = await confirmationAlert({
      labels: { cancel: "No", confirm: "Yes" },
      msg: "Are you sure you want to delete?",
    });
    if (result) {
      const res = await deleteMutate({ id: id ?? "" });
      if (res.status === "success") {
        notifications.show({
          message: res.message,
          title: res.title,
          color: "green",
        });
        refetch();
        modals.closeAll();
      } else {
        notifications.show({
          message: res.message,
          title: res.title,
          color: "red",
        });
        refetch();
        modals.closeAll();
      }
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={24}>
        <FInput
          label="Date"
          variant="date"
          disabled
          formHandler={form.getInputProps("date")}
        />
        <FInput
          label="Holiday Name"
          variant="text"
          placeholder="Enter Holiday Name"
          formHandler={form.getInputProps("holiday")}
        />
        <FInput
          label="Add Category"
          variant="select"
          data={[
            { value: "weekend", label: "Weekend" },
            { value: "national holiday", label: "National Holiday" },
            { value: "festival", label: "Festival" },
          ]}
          formHandler={form.getInputProps("category")}
          placeholder="Select Category"
        />
        <Flex gap={12}>
          <FButton
            variant="filled"
            label={`${edit ? "Edit" : "Add"} Holiday`}
            type="submit"
            loading={isPending}
          />
          {edit && (
            <Tooltip label={"Delete Holiday"}>
              <Button
                size="md"
                variant="default"
                loading={deletePending}
                onClick={handleDelete}
              >
                <Delete />
              </Button>
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </form>
  );
};

export default memo(HolidayModal);
