import React, { useEffect } from "react";
import { Flex, Group, Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";

import useGetUserById from "../../../hooks/centre/useGetUserById";
import useCreateCentre from "../../../hooks/centre/userCreateUser";
import userUpdateUser from "../../../hooks/centre/useUpdateUser";

import { userValidation } from "../../../validations/centre.validation";
import { userInitialValues } from "../../../initial-values/user.initialValue";

import { IUserForm } from "../../../types";
import { queryClient } from "../../../client/queryClient";

interface IProps {
  isCreateModal: boolean;
  id: string;
}

const UserModal: React.FC<IProps> = ({ isCreateModal, id }) => {
  const { data, isLoading } = useGetUserById(id ?? "");

  const { mutateAsync, isPending } = useCreateCentre();
  const { mutateAsync: editMutateAsync, isPending: editPending } =
    userUpdateUser();

  const form = useForm({
    initialValues: userInitialValues,
    validate: yupResolver(userValidation),
  });

  useEffect(() => {
    if (data?.data && !isLoading && !isCreateModal) {
      form.setValues(data.data.user);
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  const handleCreateFormSubmit = async (data: IUserForm) => {
    let response;

    if (isCreateModal)
      response = await mutateAsync(data as unknown as IUserForm);
    else response = await editMutateAsync(data as unknown as IUserForm);

    if (response.status === "error") {
      return notifications.show({
        message: response.message,
        title: response.title,
        color: "red",
      });
    }
    notifications.show({
      message: response.message,
      title: response.title,
      color: "green",
    });

    queryClient.invalidateQueries({ queryKey: ["user", "all"] });

    return modals.closeAll();
  };

  if (isLoading) {
    return (
      <Flex justify={"center"}>
        <Loader />
      </Flex>
    );
  }

  return (
    <form onSubmit={form.onSubmit((e) => handleCreateFormSubmit(e))}>
      <Flex m={"lg"} gap={"md"} direction={"column"}>
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <FInput
          label="Username"
          placeholder="Username"
          variant="text"
          formHandler={form.getInputProps("username")}
        />
        <FInput
          label="Password"
          placeholder="Password"
          variant="password"
          formHandler={form.getInputProps("password")}
        />
        {/* <Flex>
          <FTypography
            fontSize={"20px"}
            text={`Current Customer Count - ${customerCount}`}
            variant={"nunito400"}
          />
        </Flex> */}
        <Group mt="md" justify="end">
          <Flex gap={"md"} maw={"350px"}>
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
              loading={isPending || editPending}
              label={isCreateModal ? "Create" : "Submit"}
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default UserModal;
