import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import { useCardContext } from "../utils/CardContext";

export default function DetailsScreen() {
  const router = useRouter();
  // const { card } = useLocalSearchParams<{ card: string }>();
  const { colors } = useTheme();
  const { deleteCard } = useCardContext();
  const { card, index } = useLocalSearchParams<{
    card: string;
    index?: string;
  }>();
  const cardIndex = index ? parseInt(index, 10) : undefined;

  if (!card) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No card data found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let parsedCard: { name: string; url: string; index?: number };
  try {
    parsedCard = JSON.parse(card);
  } catch {
    parsedCard = { name: "Invalid card", url: "" };
  }

  const handleQuickShare = async () => {
    try {
      await Share.share({
        title: "Check out my link:",
        message: parsedCard.url,
        url: parsedCard.url,
      });
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this card?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (cardIndex !== undefined) {
              deleteCard(cardIndex);
              router.push("/");
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {parsedCard.name}
      </Text>

      <View style={styles.qrContainer}>
        <SvgQRCode value={parsedCard.url} size={250} />
      </View>

      <Text style={[styles.urlText, { color: colors.primary }]}>
        {parsedCard.url}
      </Text>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/EditLink",
                params: { index: parsedCard.index?.toString() },
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleQuickShare}
            style={styles.iconButton}
          >
            <FontAwesome name="share-alt" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.button, { backgroundColor: "#f94144" }]}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  qrContainer: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
  },
  urlText: {
    fontSize: 18,
    marginBottom: 36,
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 250,
    gap: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "#6495ed",
    paddingVertical: 14,
    paddingHorizontal: 24, // Match button style
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#6495ed",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
