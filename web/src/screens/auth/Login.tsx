import { memo } from "react";
import { BackgroundImage, Box, Card, Flex, Stack } from "@mantine/core";
import FTypography from "../../ui/typography/FTypography";
import { Icons } from "../../assets/icons";
import FInput from "../../ui/input/finput/FInput";
import FButton from "../../ui/button/FButton";
import { useForm, yupResolver } from "@mantine/form";
import { loginValidation } from "../../validations/login.validation";
import { useLoginMutation } from "../../hooks/auth/useAdminLogin";
import { INITIAL_VALUES } from "../../initial-values";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../enum/routes.enum";
import { notifications } from "@mantine/notifications";
import { Assets } from "../../assets";
import { useUserLogin } from "../../hooks/auth/useUserLogin";
import { IServerResponse } from "../../interfaces/serverResponse.interface";

interface IForm {
  email: string;
  password: string;
}

interface IProps {
  isUserForm?: boolean;
}

const Login: React.FC<IProps> = ({ isUserForm }) => {
  const form = useForm<IForm>({
    initialValues: INITIAL_VALUES.LOGIN,
    validate: yupResolver(loginValidation),
  });

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLoginMutation();
  const { mutateAsync: mutateUser, isPending: isPendingUser } = useUserLogin();

  const handleLogin = async (e: IForm) => {
    let res: IServerResponse;
    console.log("admin user  : ", isUserForm);

    if (!isUserForm) {
      res = await mutateAsync({
        email: e.email,
        password: e.password,
      });
      localStorage.setItem("role", "admin");
    } else {
      res = await mutateUser({
        email: e.email,
        password: e.password,
      });
      localStorage.setItem("role", "user");
    }
    if (res.status === "success") {
      const token = res.data.token;
      localStorage.setItem("token", token);
      return navigate(ROUTES.DASHBOARD);
    } else {
      return notifications.show({
        message: res.message,
        title: res.title,
        color: "red",
      });
    }
  };
  return (
    <Box mx="auto" bg={"#1c4e78"}>
      <BackgroundImage src={Icons.loginScreen} mih={"100vh"}>
        <Flex align={"center"} justify={"center"} mih={"100vh"} m={"auto"}>
          <Card maw={410} bg={"white"} radius={16} px={24} py={32}>
            <Box>
              <img
                style={{ height: "auto", width: "100%" }}
                src={Assets.Icons.LOGO}
              />
            </Box>
            <Stack gap={"lg"} py={"md"} px={"xs"} ta={"center"}>
              <FTypography
                variant="oswald500"
                fontSize={"26px"}
                color="headingBlack"
                text="Login to Account"
              />
              <FTypography
                variant="nunito700"
                fontSize={"13px"}
                color="black80"
                text="Please enter your username and password to continue"
              />
            </Stack>
            <form onSubmit={form.onSubmit(handleLogin)}>
              <Stack gap={"md"}>
                <FInput
                  label="Username"
                  variant="text"
                  placeholder="Username"
                  formHandler={form.getInputProps("email")}
                />
                <FInput
                  label="Password"
                  placeholder="Password"
                  variant="password"
                  formHandler={form.getInputProps("password")}
                />
                <Flex w={"80%"} m={"auto"}>
                  <FButton
                    type="submit"
                    loading={isPending || isPendingUser}
                    label="Sign In"
                    variant="filled"
                  />
                </Flex>
              </Stack>
            </form>
          </Card>
        </Flex>
      </BackgroundImage>
    </Box>
  );
};

export default memo(Login);
