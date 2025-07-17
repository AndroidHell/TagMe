import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Card = {
  id: string;
  name: string;
  url: string;
  label?: string;
  labelColor?: string;
};

type CardContextType = {
  cards: Card[];
  addCard: (card: Omit<Card, "id"> & Partial<Pick<Card, "id">>) => void;
  updateCard: (index: number, card: Card) => void;
  deleteCard: (index: number) => void;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);

  // Load from AsyncStorage once
  useEffect(() => {
    AsyncStorage.getItem("cards").then((stored) => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Ensure all cards have a valid id
          const validated = parsed.map((card: any, index: number) => ({
            ...card,
            id: card.id || `card-${index}-${Date.now()}`,
          }));
          setCards(validated);
        } catch (err) {
          console.error("Error parsing cards from AsyncStorage", err);
          setCards([]);
        }
      }
    });
  }, []);

  // Persist to AsyncStorage on any change
  useEffect(() => {
    AsyncStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = (card: Omit<Card, "id"> & Partial<Pick<Card, "id">>) => {
    const newCard: Card = {
      ...card,
      id: card.id ?? uuidv4(),
    };
    setCards((prev) => [...prev, newCard]);
  };

  const updateCard = (index: number, card: Card) => {
    const updated = [...cards];
    updated[index] = card;
    setCards(updated);
  };

  const deleteCard = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CardContext.Provider
      value={{ cards, addCard, updateCard, deleteCard, setCards }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCardContext must be used in provider");
  return context;
};
