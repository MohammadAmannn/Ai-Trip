import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option, selectTraveler }) {
    return (
        <View
            style={[
                {
                    padding: 20,
                    borderRadius: 15,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: Colors.aman,
                },
                selectTraveler === option.tittle && { borderWidth: 2 },  // Correct comparison
            ]}
        >
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "medium",
                    }}
                >
                    {option?.tittle}
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "regular",
                        color: Colors.gray,
                    }}
                >
                    {option?.desc}
                </Text>
            </View>

            <Text
                style={{
                    fontSize: 20,
                    fontFamily: "outfit",
                }}
            >
                {option?.icon}
            </Text>
        </View>
    );
}
