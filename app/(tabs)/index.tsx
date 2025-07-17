import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { Card, useCardContext } from "../../utils/CardContext";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { cards, setCards } = useCardContext();

  const [localCards, setLocalCards] = useState<Card[]>(cards);

  // Sync context to local state on load or update
  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  const handleAddCard = useCallback(() => {
    router.push("/EditLink");
  }, []);

  const handleCardPress = useCallback((card: Card, index: number) => {
    router.push({
      pathname: "/Details",
      params: { card: JSON.stringify(card), index: index.toString() },
    });
  }, []);

  const renderItem = useCallback(
    ({ item, drag, getIndex }: RenderItemParams<Card>) => {
      const index = getIndex?.();
      if (index === undefined) return null;

      return (
        <Pressable
          onPress={() => handleCardPress(item, index)}
          onLongPress={drag}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.name}
            </Text>
            {item.label && (
              <View
                style={[
                  styles.labelBadge,
                  { backgroundColor: item.labelColor || "#6495ed" },
                ]}
              >
                <Text style={styles.labelText}>{item.label}</Text>
              </View>
            )}
          </View>
          <Text
            style={[styles.cardUrl, { color: colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.url}
          </Text>
        </Pressable>
      );
    },
    [colors, handleCardPress],
  );

  return (
    <View style={styles.container}>
      {localCards.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            You haven&apos;t added any cards yet. Tap the + button below to add
            one.
          </Text>
        </View>
      )}

      <DraggableFlatList
        data={localCards}
        onDragEnd={({ data }) => {
          setLocalCards(data); // update UI
          setCards(data); // persist to context & AsyncStorage
        }}
        keyExtractor={(item) => item.id} // ✅ stable key
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      <Pressable style={styles.fab} onPress={handleAddCard}>
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.7,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: "600",
  },
  cardUrl: {
    fontSize: 18,
    color: "#555",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#6495ed",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  labelBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  labelText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
