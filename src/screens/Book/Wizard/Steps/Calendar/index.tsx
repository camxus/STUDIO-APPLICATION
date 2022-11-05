import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendario";
import { ProceedButton } from "../../../../../studio/components/Buttons/ProceedButton";

const ChooseDate = ({ wizard, date, setDate }) => {
  return (
    <View className="w-full h-full py-[100]">
      <Calendar

        onPress={(date) => setDate(date)}
        minDate={new Date()}
        startDate={date}
          endDate={date}
        theme={{
          activeDayColor: "black",
          monthTitleTextStyle: {
            color: "black",
            fontWeight: "400",
            fontSize: 20,
          },
          // emptyMonthContainerStyle: {},
          // emptyMonthTextStyle: {
          //   fontWeight: "200",
          // },
          // weekColumnsContainerStyle: {},
          // weekColumnStyle: {
          //   paddingVertical: 10,
          // },
          weekColumnTextStyle: {
            color: "darkgrey",
            fontSize: 13,
          },
          nonTouchableDayContainerStyle: {},
          nonTouchableDayTextStyle: {},
          startDateContainerStyle: {},
          endDateContainerStyle: {},
          dayContainerStyle: {backgroundColor: "transparent"},
          // dayTextStyle: {
          //   color: "#2d4150",
          //   fontWeight: "200",
          //   fontSize: 15,
          // },
          // dayOutOfRangeContainerStyle: {},
          // dayOutOfRangeTextStyle: {},
          todayContainerStyle: {
            backgroundColor: "grey",
            borderRadius: 100,
          },
          todayTextStyle: {
            color: "white",
          },
          activeDayContainerStyle: {
            backgroundColor: "black",
          },
          activeDayTextStyle: {
            color: "white",
          },
          nonTouchableLastMonthDayTextStyle: {},
        }}
        firstDayMonday={false}
        monthHeight={undefined}
        numberOfMonths={undefined}
      />
      <ProceedButton
        content="Next"
        disabled={!date}
        onPress={() => wizard.current.next()}
      ></ProceedButton>
    </View>
  );
};

export default ChooseDate;
