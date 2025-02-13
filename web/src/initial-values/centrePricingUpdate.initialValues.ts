import { IPricingUpdateForm } from "../types";

export default (
  courtPrice: IPricingUpdateForm["courtPrice"],
  slotPrice: IPricingUpdateForm["slotPrice"],
  id: string
): IPricingUpdateForm => {
  return {
    courtPrice: {
      regular: Number(courtPrice.regular),
      weekend: Number(courtPrice.weekend),
    },
    slotPrice: {
      regular: Number(slotPrice.regular),
      weekend: Number(slotPrice.weekend),
    },
    id,
  };
};
