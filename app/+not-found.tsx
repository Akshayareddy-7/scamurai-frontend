import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { AlertCircle } from "lucide-react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found", headerShown: false }} />
      <View style={styles.container}>
        <AlertCircle size={80} color={Colors.dark.danger} />
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>This path doesn&apos;t exist in the Scamurai realm</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: Colors.dark.text,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginTop: 8,
  },
  link: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700" as const,
  },
});
