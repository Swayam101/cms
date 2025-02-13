import { Flex, SimpleGrid } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import FInput from "../../ui/input/finput/FInput";
import FButton from "../../ui/button/FButton";
import { useForm, yupResolver } from "@mantine/form";
import useGetAllCentres from "../../hooks/centre/useGetAllCentres";
import { modals } from "@mantine/modals";
import useAddReport from "../../hooks/report/useAddReport";
import { IReportForm, IReportTable } from "../../types";
import { reportInitialValues } from "../../initial-values/report.initialValues";
import { reportValidation } from "../../validations/report.validation";
import { notifications } from "@mantine/notifications";
import useUpdateReport from "../../hooks/report/useUpdateReport";
import { queryClient } from "../../client/queryClient";

interface IProps {
  isEdit?: boolean;
  reportData?: IReportTable;
}
const ReportModal: React.FC<IProps> = ({ isEdit, reportData }) => {
  const form = useForm<IReportForm>({
    initialValues: reportInitialValues,
    validate: yupResolver(reportValidation),
  });
  const { data, isLoading } = useGetAllCentres();
  const { mutateAsync, isPending } = useAddReport();
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useUpdateReport();
  useEffect(() => {
    if (isEdit && reportData) {
      form.setFieldValue("reportType", reportData.reportType);
      form.setFieldValue("emails", reportData.emails);
      form.setFieldValue(
        "centres",
        reportData.centres.map((item) => item._id)
      );
    }
  }, [isEdit, reportData]);
  const allCentres = useMemo(() => {
    if (data?.data && !isLoading)
      return (
        data?.data.map(({ name, _id }: { name: string; _id: string }) => ({
          label: name,
          value: _id,
        })) ?? []
      );
    return [];
  }, [data, isLoading]);

  const handleSubmit = async (values: IReportForm) => {
    let res;
    if (isEdit) {
      res = await updateMutate({ ...values, id: reportData?._id ?? "" });
    } else {
      res = await mutateAsync(values);
    }
    if (res.status === "success") {
      notifications.show({ message: res.message, color: "green" });
      queryClient.invalidateQueries({
        queryKey: ["addReport", "getReport", "updateReport"],
      });
      form.reset();
      modals.closeAll();
    } else {
      notifications.show({ message: res.message, color: "red" });
      form.reset();
      modals.closeAll();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex m="lg" gap="md" direction="column">
        <FInput
          label="Report Type"
          variant="select"
          data={["Weekly", "Monthly", "Both"]}
          placeholder="Report Type"
          formHandler={form.getInputProps("reportType")}
        />
        <SimpleGrid cols={1}>
          <FInput
            label="Select Centres"
            variant="multiselect"
            placeholder="Select centres"
            data={allCentres}
            searchable
            loading={isLoading}
            formHandler={form.getInputProps("centres")}
          />
        </SimpleGrid>
        <FInput
          label="Email ids (for more than 1 add comma separated emails)"
          placeholder="Email"
          variant="text"
          formHandler={form.getInputProps("emails")}
        />
        <Flex justify={"flex-end"}>
          <Flex gap="md" justify={"flex-end"} w={"60%"}>
            <FButton
              variant="outline"
              onClick={() => {
                form.reset();
                modals.closeAll();
              }}
              label="Cancel"
            />
            <FButton
              variant="filled"
              type="submit"
              label={isEdit ? "Update" : "Create"}
              loading={isPending || updatePending}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default ReportModal;
