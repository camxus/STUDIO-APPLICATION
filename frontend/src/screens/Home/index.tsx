import { View, Text, SafeAreaView } from "react-native";
import React, { useMemo } from "react";
import { ProceedButton } from "../../studio/components/Buttons/ProceedButton";
import Layout from "../../studio/components/Buttons/Layout";

const MS = 1000;
const S = 60 * MS;
const H = 60 * S;

function HomeScreen({ navigation }) {
  // TODO get from api
  const BOOKED_DATES = [
    {
      from: +new Date(),
      to: +new Date(+new Date() + 1 * H),
    },
  ];

  // 15 minute buffer
  const CURRENT_DATES = useMemo(() => {
    return BOOKED_DATES.filter(
      (d) => +new Date(+new Date() - 15 * 60000) < d.from && +new Date() < d.to
    );
  }, [BOOKED_DATES]);

  //"Fri Nov 04"
  const formatDate = (date) => {
    return new Date(date).toString().split(" ").slice(1, 3).join(" ");
  };

  const timeFromDate = (date) => {
    return new Date(date)
      .toISOString()
      .split("T")[1]
      .split(":")
      .slice(0, 2)
      .join(":");
  };

  return (
    <>
      <Layout header navigation={navigation} />
      <SafeAreaView className="flex items-center justify-center w-full h-full">
        <View className="flex w-full p-8">
          {CURRENT_DATES && (
            <>
              <Text className="text-4xl uppercase font-black italic">Now</Text>
              {CURRENT_DATES.map((d) => (
                <View key={d.from}>
                  <View className="relative flex flex-row items-center w-full my-0.5">
                    <Text className="font-black uppercase italic mr-3">
                      {formatDate(d.from)}
                    </Text>
                    <View className="flex items-center justify-center bg-primary rounded-full p-3 flex-grow">
                      <Text className="text-white font-semibold uppercase">
                        {timeFromDate(d.from)} - {timeFromDate(d.to)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              <View className="h-[1] flex-grow bg-neutral-400 m-4" />
            </>
          )}
          {BOOKED_DATES && (
            <>
              <Text className="text-4xl uppercase font-black italic">
                Booked Dates
              </Text>
              {BOOKED_DATES.map((d) => (
                <>
                <View key={d.from}>
                  <View className="relative flex flex-row items-center w-full my-0.5">
                    <Text className="font-black uppercase italic mr-3">
                      {formatDate(d.from)}
                    </Text>
                    <View className="flex items-center justify-center bg-secondary rounded-full p-3 flex-grow">
                      <Text className="text-black font-semibold uppercase">
                        {timeFromDate(d.from)} - {timeFromDate(d.to)}
                      </Text>
                    </View>
                  </View>
                </View>
                </>
              ))}
            </>
          )}
        </View>
      </SafeAreaView>
      <ProceedButton
        content="Book"
        onPress={() => navigation.navigate("Book")}
      />
    </>
  );
}

export default HomeScreen;
