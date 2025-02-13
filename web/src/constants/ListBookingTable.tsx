import moment from "moment";
import ListBookingActionBar from "../components/ActionBar/ListBookingActionBar";
import { IBookingList } from "../types";
import { Box, Chip, Flex } from "@mantine/core";
import FTypography from "../ui/typography/FTypography";
import { changePaymentStatus } from "../utils/paymentStatusRazorPay";
import { capitalizeWords } from "../utils/capitalize";

export const ListBookingTable: TTableColumns<IBookingList>[] = [
  {
    key: "name",
    label: "Name",
    minWidth: "220px",
    renderCell: (value) => capitalizeWords(value.user.name) ?? "NA",
  },
  {
    key: "email",
    label: "Email",
    minWidth: "150px",
    renderCell: (value) => value.user.email ?? "N/A",
  },
  {
    key: "email",
    label: "Contact",
    minWidth: "150px",
    renderCell: (value) => value.user.mobile ?? "N/A",
  },
  {
    key: "slots",
    label: "Slot",
    minWidth: "180px",
    renderCell: (value) => (
      <Flex direction={"column"} gap={"5px"}>
        {value.slots.map((item) => (
          <Chip checked={false} key={item}>{`${item.split("_")[1]}:00 ${
            item.split("_")[2]
          }`}</Chip>
        ))}
      </Flex>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    minWidth: "100px",
    renderCell: (value) => value.amount + "/-",
  },
  {
    key: "bookingDate",
    label: "Booked On",
    minWidth: "150px",
    renderCell: (value) => moment(value.bookingDate).format("DD-MM-YYYY"),
  },
  {
    key: "paymentOrderId",
    label: "Payment Details",
    minWidth: "220px",
    renderCell: (value: IBookingList) => (
      <div>
        <Box style={{ textAlign: "left" }}>
          <FTypography text="Order Id : " fontSize={12} variant="oswald500" />
          <FTypography
            text={value.paymentOrderId ?? "NA"}
            fontSize={12}
            variant="nunito400"
          />
        </Box>
        {value.paymentId && (
          <Box style={{ textAlign: "left" }}>
            <FTypography
              text="Payment Id : "
              fontSize={12}
              variant="oswald500"
            />
            <FTypography
              text={value.paymentId ?? "NA"}
              fontSize={12}
              variant="nunito400"
            />
          </Box>
        )}
        {value.paymentStatus && (
          <Box style={{ textAlign: "left" }}>
            <FTypography
              text="Payment Status : "
              fontSize={12}
              variant="oswald500"
            />
            <FTypography
              text={changePaymentStatus(value.paymentStatus)}
              fontSize={12}
              variant="nunito400"
            />
          </Box>
        )}
      </div>
    ),
  },
  {
    key: "refundId",
    label: "Refund Details",
    minWidth: "200px",
    renderCell: (value: IBookingList) =>
      value.refundId ? (
        <div>
          <Box style={{ textAlign: "left" }}>
            <FTypography
              text="Refund Id : "
              fontSize={12}
              variant="oswald500"
            />
            <FTypography
              text={value.refundId ?? "NA"}
              fontSize={12}
              variant="nunito400"
            />
          </Box>

          <Box style={{ textAlign: "left" }}>
            <FTypography
              text="Refund Status : "
              fontSize={12}
              variant="oswald500"
            />
            <FTypography
              text={value.refundStatus ?? "NA"}
              fontSize={12}
              variant="nunito400"
            />
          </Box>
        </div>
      ) : (
        <p>NA</p>
      ),
  },
  {
    key: "bookedByAdmin",
    label: "Booked By",
    minWidth: "5%",
    renderCell: (value) => (
      <Chip
        checked={true}
        color={value.bookedByAdmin ? "grape" : "blue"}
        styles={{
          iconWrapper: { display: "none" },
        }}
      >
        {value.bookedByAdmin ? "ADMIN" : "USER"}
      </Chip>
    ),
  },
  {
    key: "type",
    label: "Type",
    minWidth: "5%",
    renderCell: (value) => (
      <Chip
        checked={true}
        color={value.type === "court" ? "lime" : "blue"}
        styles={{
          iconWrapper: { display: "none" },
        }}
      >
        {value.type.toUpperCase()}
      </Chip>
    ),
  },
  {
    key: "status",
    label: "Status",
    minWidth: "5%",
    renderCell: (value) => (
      <Chip
        checked={true}
        color={getStatusColor(value.status)}
        styles={{
          iconWrapper: { display: "none" },
        }}
      >
        {value.status.toUpperCase()}
      </Chip>
    ),
  },
  {
    key: "action",
    label: "Action",
    minWidth: "210px",
    renderCell: (value) => <ListBookingActionBar data={value} />,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "green";
    case "failed":
      return "red";
    case "cancel":
      return "#dc143c";

    default:
      return "yellow";
  }
};
