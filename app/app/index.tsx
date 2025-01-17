import { Text, View } from "react-native";
import {TEST_ENV} from "@env";

export default function Index() {
  console.log(TEST_ENV)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
