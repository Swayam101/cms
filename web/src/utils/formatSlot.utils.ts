export const formatSlot = (slot: string) => {
  return `${slot.split("_")[1]}:00 ${slot.split("_")[2]}`;
};
