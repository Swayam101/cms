export default (startTime: string, endTime: string): string[] => {
  const slots: string[] = [];
  let [startHour] = startTime.split(":").map(Number);
  let [endHour] = endTime.split(":").map(Number);
  if (endHour === 0) endHour = 24;
  // Normalize start time if minutes are not zero
  if (startTime.includes(":") && startTime.split(":")[1] !== "00") {
    startHour++;
    if (startHour === 24) startHour = 0; // Wrap around if needed
  }

  while (startHour < endHour) {
    const period = startHour < 12 ? "AM" : "PM";
    const hour12Format = startHour % 12 || 12; // Convert to 12-hour format
    const slotId = `SLOT_${String(hour12Format).padStart(2, "0")}_${period}`;
    slots.push(slotId);
    startHour++;
  }

  return slots;
};
