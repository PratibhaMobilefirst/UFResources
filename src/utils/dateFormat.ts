import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("MM-DD-YYYY");
};
