export const changePaymentStatus = (status: string) => {
  switch (status) {
    case "created":
      return "Unpaid";
    case "attempted":
      return "Failed";
    case "paid":
      return "Paid";
    default:
      return "NA";
  }
};
