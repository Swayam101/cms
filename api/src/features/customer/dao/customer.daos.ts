import customerDao from "./customer.dao";
import customerUploadLogDao from "./customerUploadLog.dao";

export default {
  customer: customerDao,
  customerUpload: customerUploadLogDao,
};
