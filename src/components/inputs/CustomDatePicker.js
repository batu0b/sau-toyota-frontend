import { useField } from "formik";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SelectDatepicker } from "react-select-datepicker";

export const CustomDatePicker = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { t } = useTranslation();
  const CustomMonth = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
  };

  const onDateChange = useCallback(
    (date) => {
      helpers.setValue(date);
    },
    [field.value]
  );

  return (
    <SelectDatepicker
      selectedDate={field.value}
      onDateChange={onDateChange}
      labels={{
        yearLabel: `${t("Year")}`,
        dayLabel: `${t("Day")}`,
        monthLabel: `${t("Month")}`,
        monthPlaceholder: `${t("Month")}`,
        yearPlaceholder: `${t("Year")}`,
        dayPlaceholder: `${t("Day")}`,
        months: { ...CustomMonth },
      }}
      order={"day/month/year"}
      className="DatePicker"
      hideLabels={true}
    />
  );
};
