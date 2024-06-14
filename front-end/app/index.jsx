import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white font-nunito">
      <Text className="text-3xl">H2Orta!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
