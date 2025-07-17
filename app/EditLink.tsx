import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, useCardContext } from "../utils/CardContext";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function EditLinkScreen() {
  const router = useRouter();
  const { index }: { index?: string } = useLocalSearchParams();
  const { colors } = useTheme();

  const { cards, addCard, updateCard } = useCardContext();

  const [cardId, setCardId] = useState<string | null>(null);

  const [cardName, setCardName] = useState("");
  const [cardUrl, setCardUrl] = useState("");
  const [cardLabel, setCardLabel] = useState("");
  const [cardLabelColor, setCardLabelColor] = useState("#6495ed");

  const presetColors = ["#6495ed", "#f94144", "#f3722c", "#90be6d", "#f9c74f"];

  // If editing, load card data on mount or when cards/index change
  useEffect(() => {
    if (index !== undefined) {
      const idx = parseInt(index, 10);
      if (!isNaN(idx) && cards[idx]) {
        setCardId(cards[idx].id);
        setCardName(cards[idx].name);
        setCardUrl(cards[idx].url);
        setCardLabel(cards[idx].label ?? "#6495ed");
        setCardLabelColor(cards[idx].labelColor ?? "#6495ed");
      }
    }
  }, [index, cards]);

  const handleSave = () => {
    if (!cardName.trim() || !cardUrl.trim()) {
      Alert.alert("Missing Fields", "Please fill in both Name and URL.");
      return;
    }

    let fixedUrl = cardUrl.trim();
    if (!/^https?:\/\//i.test(fixedUrl)) {
      fixedUrl = "https://" + fixedUrl;
    }

    const newCard: Card = {
      id: cardId ?? uuidv4(), // <-- generate UUID if no id exists
      name: cardName.trim(),
      url: fixedUrl,
      label: cardLabel.trim() || undefined,
      labelColor: cardLabelColor,
    };

    if (index !== undefined) {
      updateCard(parseInt(index, 10), newCard);
    } else {
      addCard(newCard);
    }

    router.push("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Name</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="e.g., Twitch"
        placeholderTextColor={colors.text + "99"}
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>
        URL
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="https://www.twitch.tv/yourhandle"
        placeholderTextColor={colors.text + "99"}
        value={cardUrl}
        onChangeText={setCardUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={[styles.label, { color: colors.text, marginTop: 16 }]}>
        Label (optional)
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="e.g., Favorite"
        placeholderTextColor={colors.text + "99"}
        value={cardLabel}
        onChangeText={setCardLabel}
      />

      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {presetColors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setCardLabelColor(color)}
            style={[
              {
                backgroundColor: color,
                width: 32,
                height: 32,
                borderRadius: 16,
                marginRight: 12,
                borderWidth: cardLabelColor === color ? 3 : 0,
                borderColor: "#000",
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  saveButton: {
    marginTop: 32,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#6495ed",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
