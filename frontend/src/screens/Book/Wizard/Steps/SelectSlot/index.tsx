import {
  View,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { Button } from "react-native-ui-lib";
import { ProceedButton } from "../../../../../studio/components/Buttons/ProceedButton";

const MONTHNAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SelectSlot = ({ wizard, date, form, setForm, handleSubmit }) => {
  const month = MONTHNAMES[date.getMonth()];
  const day = useMemo(() => {
    return date.getDate()
  }, [date]);

  const slots = useMemo(() => {
    const _slots = [];
    for (let i = 0; i < 24; i++) {
      _slots.push({
        value: {
          from: date.setHours(i, 0, 0),
          to: date.setHours(i + 1, 0, 0),
        },
        label: `${i < 10 ? `0${i}:00` : `${i}:00`} - ${
          i === 23 ? "00:00" : i < 9 ? `0${i + 1}:00` : `${i + 1}:00`
        }`,
      });
    }
    return _slots;
  }, []);
  const BOOKED_SLOTS = [
    {
      from: +new Date().setHours(14, 0, 0),
      to: +new Date().setHours(14, 0, 0),
    },
  ];

  const slotSelected: (slot: any) => boolean = (slot) => {
    return form?.slots?.find(
      (_slot) => _slot.from.toString() === slot.value.from.toString()
    )
      ? true
      : false;
  };

  const isBooked: (slot: any) => boolean = (slot) =>
    BOOKED_SLOTS.find((_slot) => _slot.from === slot.value.from) ? true : false;

  const handleSetForm = (slot) => {
    setForm((form) => {
      if (!slotSelected(slot)) {
        return {
          ...form,
          slots: [
            ...form?.slots,
            {
              from: slot.value.from,
              to: slot.value.to,
            },
          ],
        };
      } else {
        return {
          ...form,
          slots: form.slots.filter((_slot) => _slot.from !== slot.value.from),
        };
      }
    });
  };

  return (
    <SafeAreaView className="flex flex-col items-center justify-center h-full w-full">
      <View className="flex flex-col items-center pl-[36] gap-[-36]">
        <Text className="font-black italic text-[200px]">{day}</Text>
        <Text className="font-black text-[36px] uppercase italic">{month}</Text>
      </View>
      <ScrollView
        className="max-h-[310] overflow-hidden flex gap-0.5"
        showsVerticalScrollIndicator={false}
        snapToInterval={310}
        decelerationRate={0}
      >
        <View className="w-full flex flex-col flex-wrap h-[300] gap-3 ">
          {slots.slice(0, 12).map((slot) => (
            <Button
              key={slot.label}
              onPress={() => handleSetForm(slot)}
              disabled={isBooked(slot)}
              className={`rounded-full w-[150] ${
                slotSelected(slot) ? "bg-primary" : "bg-secondary"
              }`}
              color={slotSelected(slot) ? "white" : "black"}
            >
              <Text
                className={`font-semibold ${
                  slotSelected(slot) ? "text-white" : "text-black"
                }`}
              >
                {slot.label}
              </Text>
            </Button>
          ))}
        </View>
        <View className="w-full flex flex-col flex-wrap h-[300] gap-3">
          {slots.slice(12, 25).map((slot) => (
            <Button
              key={slot.label}
              onPress={() => handleSetForm(slot)}
              disabled={isBooked(slot)}
              className={`rounded-full w-[150] ${
                slotSelected(slot) ? "bg-primary" : "bg-secondary"
              }`}
              color={slotSelected(slot) ? "white" : "black"}
            >
              <Text
                className={`font-semibold ${
                  isBooked(slot)
                    ? "text-neutral-400"
                    : slotSelected(slot)
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {slot.label}
              </Text>
            </Button>
          ))}
        </View>
      </ScrollView>
      <ProceedButton
        content="Next"
        onPress={() => handleSubmit()}
      ></ProceedButton>
    </SafeAreaView>
  );
};

export default SelectSlot;
