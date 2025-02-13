import { Slot } from "../utils/slotSelectionLogic";

export interface CourtTableData {
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  active: boolean;
  centre: string;
  _id?: string;
}
export interface AdminTableData {
  totalUploads: number;
  createdAt: string;
}
export interface UserTableData {
  _id: string;
  profileImg?: string;
  name: string;
  mobile: string;
  age: string;
  gender: string;
  email: string;
  active: boolean;
  dob: string;
}
export interface CenterTableData {
  img: FileList | null | string;
  name: string;
  description: string;
  priceSlot: { weekend: string; regular: string };
  priceCourt: { weekend: string; regular: string };
  address: string;
  openTime: string;
  closeTime: string;
  amenities: string[];
  active: boolean;
  _id: string;
}
export interface IAdminData {
  _id?: string;

  username?: string;
}

export interface IAdminForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  image: [];
  centre?: string;
  updatePassword?: boolean;
}

export interface IBookingForm {
  slotDate?: Date | string;
  slots?: Slot[];
  startTime?: string;
  endTime?: string;
  playerName?: string;
  phoneNumber?: string;
  paymentType?: "UPI" | "Card";
}
export interface IBlockedSlotsData {
  slots?: string[];
  note?: string;
  bookingDate: Date;
  centerId: string;
  courts?: string[];
}
interface IBlockedSlotsForm extends IBlockedSlotsData {
  startTime: string;
  endTime: string;
  blockedSlotId?: string;
}

export interface ICentreForm {
  centreId?: string;
  images: [];
  name: string;
  description: string;
  priceCourt: {
    regular: number;
    weekend: number;
  };
  priceSlot: {
    regular: number;
    weekend: number;
  };
  openTime: string;
  closeTime: string;
  address: string;
  amenities: string[];
  location: { lat: number; long: number };
  inActiveWeekOpenPlay: string[];
  openPlaySlots: string[];
  slots: string[];
}

export interface ICourtForm {
  name: string;
}

export interface IBookingUser {
  _id: string;
  name: string;
  email?: string;
  mobile?: string;
}
export interface IBookingList {
  _id: string;
  amount: number;
  bookingDate: string;
  centerId: string;
  createdAt: string;
  slots: string[];
  status: string;
  type: string;
  updatedAt: string;
  user: IBookingUser;
  isReschedule?: boolean;
  paymentOrderId?: string;
  paymentStatus?: string;
  paymentId?: string;
  refundStatus?: "failed" | "pending" | "processed";
  refundId?: string;
  bookedByAdmin?: boolean;
  centerName: string;
}

export interface IPricingUpdateForm {
  courtPrice: {
    regular: number;
    weekend: number;
  };
  slotPrice: {
    regular: number;
    weekend: number;
  };
  id: string;
}

export interface ICustomPricingTable {
  startDate: Date;
  endDate: Date;
  price: {
    court: string;
    slot: string;
  };
  note: string;
  id: string;
  center: string;
}

export interface IEditBlockedSlots {
  centre: string;
  slots: string[];
  courts: ICourtForm[];
  note: string;
  _id: string;
}

export interface ICustomPricingAddForm {
  startDate: Date;
  endDate: Date;
  price: {
    court: number;
    slot: number;
  };
  id: string | undefined;
  center: string;
  adjustOverlap: boolean;
}
export interface AcademyListsTableData {
  name: string;
  description: string;
  address: string;
  openTime: string;
  closeTime: string;
  active: boolean;
  _id: string;
}

export interface IAcademyListsForm {
  _id?: string;
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  address: string;
  location: { lat: number; long: number };
}

export interface TBatch {
  startTime: string;
  closeTime: string;
  _id?: string;
}
export interface IDuration {
  months: number;
  session: number;
}

export interface AcademyPlanTableData {
  academyImage?: string;
  image?: string;
  name: string;
  price: string;
  batchType: string;
  gst: number;
  batchStartDate: string;
  duration: IDuration;
  maximumIntake: string;
  day: [];
  batchTiming: TBatch[];
  active: boolean;
  _id: string;
}

export interface AcademyPlanForm {
  academyImage: { croppedImg: Blob; filename: string }[];
  academyListId: string;
  price: string;
  batchType: string;
  gst: number;
  batchStartDate: string;
  duration: IDuration;
  maximumIntake: string;
  day: string[];
  batch: TBatch[];
  _id?: string;
}

export interface IDuration {
  months: number;
  session: number;
}
export interface AcademyRegistrationTableData {
  name: string;
  mobileNumber: number;
  academyName: string;
  batchType: string;
  day: string;
  duration: IDuration;
  batchTime: string;
  batchStartDate: string;
  amount: number;
  bookingDate: string;
  paymentDetails: string;
  status: string;
  active: boolean;
  _id: string;
}
export interface IReportForm {
  reportType: string;
  centres: string[];
  emails: string;
}
export interface IReportTable {
  _id: string;
  reportType: string;
  emails: string;
  centres: { _id: string; name: string }[];
}

export interface AcademyListItem {
  _id: string;
  name: string;
}

export interface IBulkBooking {
  sport: "React" | "Angular" | "Vue";
}
