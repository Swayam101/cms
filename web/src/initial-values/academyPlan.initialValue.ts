import { AcademyPlanForm } from "../types";

export interface TBatch {
  startTime: string;
  closeTime: string;
}

export interface IDuration {
  months: number;
  session: number;
}

const defaultBatch: TBatch = {
  startTime: "",
  closeTime: "",
};

const defaultDuration: IDuration = {
  months: 0,
  session: 0,
};

export const academyPlanInitialValues: AcademyPlanForm = {
  academyImage: [],
  academyListId: "",
  price: "",
  batchType: "",
  gst: 0,
  batchStartDate: "",
  duration: defaultDuration,
  maximumIntake: "",
  day: [],
  batch: [defaultBatch],
  _id: "",
};
