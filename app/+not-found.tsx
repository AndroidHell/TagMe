// /app/+not-found.tsx
import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Optional: Hide header for clean look */}
      <Stack.Screen options={{ title: "Page Not Found" }} />

      <Text style={styles.title}>Oops! Page Not Found</Text>
      <Text style={styles.subtitle}>
        The page you are looking for does not exist.
      </Text>

      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Go Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6495ed",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
