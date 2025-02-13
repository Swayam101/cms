import { Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { memo } from "react";
import FButton from "../../../ui/button/FButton";
import { getAdminInitialValues } from "../../../initial-values/admin.initialValues";
import { IAdminForm } from "../../../types";
import { modals } from "@mantine/modals";
import { useuploadCustomerData } from "../../../hooks/admin/useUploadCustomerData";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

interface IProps {
  isUpload: boolean;
}

const UploadLogsModel: React.FC<IProps> = () => {
  const { mutateAsync, isPending } = useuploadCustomerData();

  const form = useForm<IAdminForm>({
    initialValues: getAdminInitialValues,
  });

  const handleSubmit = async (values: IAdminForm) => {
    const formData = new FormData();

    if (values.image) {
      values.image.forEach((image: { croppedImg: Blob; filename: string }) => {
        if (image.filename) {
          formData.append("admin-profile", image.croppedImg, image.filename);
        }
      });
    }
    const res = await mutateAsync(formData as unknown as IAdminForm);
    if (res.status === "error") {
      // modals.closeAll();
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

    return modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit((e) => handleSubmit(e))}>
      <Flex m={"lg"} gap={"md"} direction={"column"}>
        <Dropzone
          onDrop={(files) => console.log("accepted files", files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
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
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
        <Group mt="md" justify="end">
          <Flex gap={"md"} miw={420}>
            <FButton
              variant="outline"
              onClick={() => modals.closeAll()}
              label="Cancel"
            />
            <FButton variant="filled" type="submit" label={"Submit"} />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default memo(UploadLogsModel);
