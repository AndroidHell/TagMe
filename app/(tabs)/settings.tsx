import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export default function SettingsScreen() {
  // Function to open external links
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link:", err),
    );
  };

  return (
    <View style={styles.container}>
      {/* Donation Section */}
      <Text style={styles.sectionTitle}>Buy Me a Coffee</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          openLink(
            "https://www.paypal.com/donate/?business=ZR758PD8QQ7TC&no_recurring=1&currency_code=USD",
          )
        }
      >
        <Text style={styles.buttonText}>Paypal</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="paypal" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink("https://venmo.com/rouxination")}
      >
        <Text style={styles.buttonText}>Venmo</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="money" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink("https://cash.app/rouxination")}
      >
        <Text style={styles.buttonText}>Cashapp</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="dollar" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Attribution Section */}
      <Text style={styles.sectionTitle}>About Me</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink("https://github.com/AndroidHell")}
      >
        <Text style={styles.buttonText}>GitHub</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="github" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink("https://yellowcityweb.dev/")}
      >
        <Text style={styles.buttonText}>I make websites!</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="code" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink("https://android-hell.netlify.app/")}
      >
        <Text style={styles.buttonText}>My Portfolio</Text>
        <View style={styles.iconSpacer} />
        <FontAwesome name="terminal" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align items to the edges
    padding: 12,
    backgroundColor: "#6495ed",
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconSpacer: {
    flex: 1, // Add space between text and icon
  },
});
