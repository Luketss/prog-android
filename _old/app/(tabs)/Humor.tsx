import { StyleSheet, Image, Platform } from 'react-native';
import Homepage from "@/components/Homepage";

export default function TabTwoScreen() {
  return (
    <>
      <Homepage></Homepage>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
