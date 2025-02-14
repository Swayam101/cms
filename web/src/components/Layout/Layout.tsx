import {
  AppShell,
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
import { useLogoutMutation } from "../../hooks/auth/useAdminLogout";
import classes from "./components/index.module.scss";
import FTypography from "../../ui/typography/FTypography";
const Layout = ({ loading }: { loading: boolean }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const router = useLocation();
  const navigate = useNavigate();
  const { mutateAsync } = useLogoutMutation();
  const handleLogout = async () => {
    const fcmToken = localStorage.getItem("fcmToken");
    const res = await mutateAsync(fcmToken);
    if (res.statusCode === 200) {
      localStorage.removeItem("fcmToken");
      navigate(ROUTES.LOGIN);
    }
  };
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
          <FTypography fontSize={"32px"} text="My CMS" variant="oswald500" />
          <Space h={"sm"} />
          <SideBarButton
            label="Dashboard"
            link={ROUTES.DASHBOARD}
            Icon={Assets.Icons.dashboard}
            active={router.pathname === ROUTES.DASHBOARD}
          />
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
          <>
            <SideBarButton
              label="Upload"
              link={ROUTES.ADMIN_TABLE_PAGE}
              Icon={Assets.Icons.admin}
              active={router.pathname === ROUTES.ADMIN_TABLE_PAGE}
            />

            <SideBarButton
              label="Bulk Booking"
              link={ROUTES.BULK_BOOKING}
              Icon={Assets.Icons.user}
              active={router.pathname === ROUTES.BULK_BOOKING}
            />
          </>

          {/* {isCenterManager && (
            <SideBarButton
              label="Manage Courts"
              link={ROUTES.COURT_TABLE_PAGE}
              Icon={Assets.Icons.manageCourt}
              showSideBar={false}
              active={router.pathname === ROUTES.COURT_TABLE_PAGE}
            />
          )} */}

          <NavLink
            label="Booking"
            px="xl"
            leftSection={<Assets.Icons.Booking />}
            styles={{
              collapse: {
                width: "100%",
              },
            }}
          >
            <SideBarButton
              label="Users"
              link={ROUTES.CENTER_TABLE_PAGE}
              Icon={Assets.Icons.manageCenter}
              active={router.pathname === ROUTES.CENTER_TABLE_PAGE}
              showSideBar={false}
            />
            <SideBarButton
              label="List"
              link={ROUTES.LIST_BOOKING}
              Icon={Assets.Icons.Booking}
              showSideBar={false}
              active={router.pathname === ROUTES.LIST_BOOKING}
            />
            <SideBarButton
              label="Calender"
              link={ROUTES.CALENDER}
              Icon={Assets.Icons.Booking}
              showSideBar={false}
              active={router.pathname === ROUTES.CALENDER}
            />
          </NavLink>

          <SideBarButton
            label="Report"
            link={ROUTES.REPORT_PAGE}
            Icon={Assets.Icons.Report}
            active={router.pathname === ROUTES.REPORT_PAGE}
          />

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
