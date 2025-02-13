import { ICentreForm } from "../../../types";

interface Props {
  centreId?: string;
  data: ICentreForm;
  imagesState: string[];
}

export default ({ data, centreId, imagesState }: Props) => {
  const formData = new FormData();
  formData.append("name", data.name.trim());
  formData.append("description", data.description);
  formData.append("priceCourt", JSON.stringify(data.priceCourt));
  formData.append("priceSlot", JSON.stringify(data.priceSlot));
  formData.append("openTime", data.openTime.toString());
  formData.append("closeTime", data.closeTime.toString());
  formData.append("address", data.address);
  formData.append("_id", centreId!);

  data.amenities.forEach((e) => {
    formData.append("amenities[]", e);
  });
  imagesState.forEach((e) => {
    formData.append("allImages[]", e);
  });
  formData.append("location[lat]", data.location.lat.toString());
  formData.append("location[long]", data.location.long.toString());
  if (data.images.length > 0) {
    data.images.forEach((image: { croppedImg: Blob; filename: string }) => {
      if (image.croppedImg) {
        formData.append("images", image.croppedImg, image.filename);
      }
    });
  }

  data.inActiveWeekOpenPlay.forEach((e) => {
    formData.append("inActiveWeekOpenPlay[]", e);
  });

  data.openPlaySlots.forEach((e) => {
    formData.append("openPlaySlots[]", e);
  });

  data.slots.forEach((e) => {
    formData.append("slots[]", e);
  });

  return formData;
};
