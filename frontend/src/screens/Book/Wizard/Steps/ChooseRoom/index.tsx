import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native-ui-lib";
import { capitalizeText } from "../../../../../utilities/utils";

const ChooseRoom = ({ wizard, setRoom }) => {
  const ROOMS = [
    {
      name: "recording",
    },
    {
      name: "photo",
    },
  ];

  const handleNext = (room) => {
    setRoom(room);
    wizard.current.next();
  };
  return (
    <SafeAreaView className="flex flex-col items-center justify-center h-full w-full">
      {ROOMS.map((room) => (
        <Button key={room.name} className="bg-black w-[150] mb-[15]" onPress={() => handleNext(room)}>
          <Text className={`font-semibold text-white`}>{capitalizeText(room.name)}</Text>
        </Button>
      ))}
    </SafeAreaView>
  );
};

export default ChooseRoom;
