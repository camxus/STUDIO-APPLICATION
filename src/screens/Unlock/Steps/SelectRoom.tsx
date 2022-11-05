import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-ui-lib";
import { capitalizeText } from "../../../utilities/utils";

const SelectRoom = ({ wizard, handleUnlock }) => {
  const ROOMS = [
    {
      name: "recording",
    },
    {
      name: "photo",
    },
    {
      name: "main",
    },
  ];

  return (
    <View className="flex items-center justify-center">
      <Text>Keys</Text>
      <View>
        {ROOMS.map((room) => (
          <Button onPress={() => handleUnlock(room)}>
            <Text className={`font-semibold text-white`}>
              {capitalizeText(room.name)}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

export default SelectRoom;
