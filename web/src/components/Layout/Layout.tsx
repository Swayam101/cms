import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Loader,
  NavLink,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { memo } from "react";
import { Assets } from "../../assets";
import SideBarButton from "./components/sideBarButton";
import UserControl from "./components/userControl";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../enum/routes.enum";

import classes from "./components/index.module.scss";
const Layout = ({ loading }: { loading: boolean }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const router = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const role = localStorage.getItem("role");
    const isUser = role === "user";
    localStorage.removeItem("token");
    navigate(isUser ? ROUTES.USER_LOGIN : ROUTES.LOGIN);
  };
  const role = localStorage.getItem("role");

  const isUser = role === "user";
  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md" justify="space-between">
          <Flex gap={16} align={"center"}>
            <Burger
              opened={false}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={false}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
          </Flex>
          <UserControl />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" bg="#FBF8F6" style={{ overflow: "auto" }}>
        <Burger
          opened={false}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
          classNames={{ root: classes.burgerForMobile }}
        />
        <Flex
          align="center"
          pt="xs"
          justify="center"
          direction="column"
          gap="xs"
        >
          <Box>
            <img
              style={{ height: "auto", width: "100%" }}
              src={Assets.Icons.LOGO}
            />
          </Box>
          <Space h={"sm"} />
          <SideBarButton
            label="Dashboard"
            link={ROUTES.DASHBOARD}
            Icon={Assets.Icons.dashboard}
            active={router.pathname === ROUTES.DASHBOARD}
          />
          {!isUser && (
            <NavLink
              leftSection={<Assets.Icons.Manage />}
              px="xl"
              label="Manage"
              styles={{
                collapse: {
                  width: "100%",
                },
              }}
            >
              <SideBarButton
                label="User"
                link={ROUTES.USER_TABLE_PAGE}
                Icon={Assets.Icons.user}
                active={router.pathname === ROUTES.USER_TABLE_PAGE}
              />

              <SideBarButton
                label="Customers"
                link={ROUTES.CUSTOMER_TABLE_PAGE}
                Icon={Assets.Icons.manageCourt}
                showSideBar={false}
                active={router.pathname === ROUTES.CUSTOMER_TABLE_PAGE}
              />
            </NavLink>
          )}
          <>
            {!isUser && (
              <SideBarButton
                label="Upload"
                link={ROUTES.UPLOAD_LOGS_PAGE}
                Icon={Assets.Icons.admin}
                active={router.pathname === ROUTES.UPLOAD_LOGS_PAGE}
              />
            )}

            {isUser && (
              <SideBarButton
                label="Customers"
                link={ROUTES.USER_CUSTOMER_PAGE}
                Icon={Assets.Icons.user}
                active={router.pathname === ROUTES.USER_CUSTOMER_PAGE}
              />
            )}
          </>

          <Divider my="sm" w="100%" />
          <Button
            w="100%"
            variant="transparent"
            leftSection={<Assets.Icons.Logout />}
            onClick={handleLogout}
            justify="start"
            px="xl"
            fz="sm"
            styles={{ label: { color: "black" } }}
          >
            Logout
          </Button>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        {loading ? (
          <Center mih="20rem">
            <Loader />
          </Center>
        ) : (
          <Outlet />
        )}
      </AppShell.Main>
    </AppShell>
  );
};
export default memo(Layout);
