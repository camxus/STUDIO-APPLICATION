import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-ui-lib";

interface IProceedButton {
  content: string;
  onPress?: (any: any) => void;
  children?: ReactNode;
  disabled?: boolean;
}

export function ProceedButton({ content, onPress, children, disabled }: IProceedButton) {
  return (
    <View className="absolute bottom-4 mx-auto z-50 w-full p-10 gap-2">
      <Button className="bg-primary" onPress={onPress} disabled={disabled}>
        <Text className={`font-semibold  p-1 ${disabled ? "text-neutral-400" : "text-white"}`}>{content}</Text>
      </Button>
      {children}
    </View>
  );
}
