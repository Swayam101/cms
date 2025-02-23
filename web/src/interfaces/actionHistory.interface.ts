export interface IActionHistory {
  actionBy: string;
  actionFor: "status" | "assigned";
  date: Date;
  action?: string;
  note?:string
}
