import { Flex, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { memo, useState } from "react";
import FButton from "../../../ui/button/FButton";
import { getAdminInitialValues } from "../../../initial-values/admin.initialValues";
import { IAdminForm } from "../../../types";
import { modals } from "@mantine/modals";
import { useuploadCustomerData } from "../../../hooks/admin/useUploadCustomerData";
import { notifications } from "@mantine/notifications";
import { IconUpload, IconX, IconFileText } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { Modals } from "../Fmodals";
import UploadErrorsModal from "../../../components/uploads/UploadErrorsModal";
import { useverifyCustomerData } from "../../../hooks/admin/useVerifyCustomerData";

interface IProps {
  isUpload: boolean;
}

const UploadLogsModel: React.FC<IProps> = ({ isUpload }) => {
  const { mutateAsync, isPending } = useuploadCustomerData();
  const { mutateAsync: mutateVerify, isPending: mutatePending } =
    useverifyCustomerData();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<IAdminForm>({
    initialValues: getAdminInitialValues,
  });

  const handleSubmit = async (values: IAdminForm) => {
    if (!values.file) {
      return notifications.show({
        message: "File is required",
        color: "red",
      });
    }

    const formData = new FormData();
    formData.append("file", values.file);

    let res = isUpload
      ? await mutateAsync(formData as unknown as IAdminForm)
      : await mutateVerify(formData as unknown as IAdminForm);
    if (res.status === "error") {
      if (!isUpload) {
        Modals({
          children: (
            <UploadErrorsModal
              errors={res.data}
              isLoading={isPending || mutatePending}
            />
          ),
          title: isUpload ? "Upload Customer Data" : "Verify Data File",
        });
      }
      return notifications.show({
        message: res.message,
        title: res.title,
        color: "red",
      });
    }

    notifications.show({
      message: res.message,
      title: res.title,
      color: "green",
    });

    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex m="lg" gap="md" direction="column">
        <Dropzone
          maxSize={5 * 1024 ** 2} // 5MB max
          accept={["text/csv"]}
          onDrop={(files) => {
            if (files.length > 0) {
              const file = files[0];
              if (file.type !== "text/csv") {
                notifications.show({
                  title: "Invalid file type",
                  message: "Only CSV files are allowed.",
                  color: "red",
                });
                return;
              }
              form.setFieldValue("file", file);
              setUploadedFile(file);
            }
          }}
          onReject={() => {
            notifications.show({
              title: "File rejected",
              message: "Ensure the file is a CSV and below 5MB.",
              color: "red",
            });
          }}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileText
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl">Drag CSV file here or click to select</Text>
              <Text size="sm" color="dimmed" mt={7}>
                Only CSV files up to 5MB are allowed.
              </Text>
            </div>
          </Group>
        </Dropzone>

        {/* Show uploaded file name */}
        {uploadedFile && (
          <Text size="sm" mt="sm">
            <strong>Uploaded File:</strong> {uploadedFile.name}
          </Text>
        )}

        <Group mt="md" justify="end">
          <Flex gap="md" miw={420}>
            <FButton
              variant="outline"
              onClick={() => modals.closeAll()}
              label="Cancel"
            />
            <FButton
              loading={isPending}
              variant="filled"
              type="submit"
              label="Submit"
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default memo(UploadLogsModel);
