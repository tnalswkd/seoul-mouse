export type HousingType = "apartment" | "office" | "oneroom" | "tworoom" | null;

export const getApartmentDepositOptions = () => ({
  row1: ["~5천", "6천", "7천", "8천", "9천"],
  row2: ["1억", "2억", "3억", "4억", "5억~"],
});

export const getOfficeDepositOptions = () => ({
  row1: ["~5천", "6천", "7천", "8천", "9천"],
  row2: ["1억", "2억", "3억", "4억", "5억~"],
});

export const getOneroomDepositOptions = () => ({
  row1: ["100", "300", "500", "800", "1천"],
  row2: ["2천", "3천", "4천", "5천", "1억~"],
});

export const getTworoomDepositOptions = () => ({
  row1: ["100", "300", "500", "800", "1천"],
  row2: ["2천", "3천", "4천", "5천", "1억~"],
});

export const getDepositOptions = (type: HousingType) => {
  switch (type) {
    case "apartment":
      return getApartmentDepositOptions();
    case "office":
      return getOfficeDepositOptions();
    case "oneroom":
      return getOneroomDepositOptions();
    case "tworoom":
      return getTworoomDepositOptions();
    default:
      return getOneroomDepositOptions();
  }
};
