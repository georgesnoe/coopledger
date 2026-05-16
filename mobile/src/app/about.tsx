import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>À propos</Text>
        <View style={styles.spacer} />
      </View>
      <View style={styles.card}>
        <Text style={styles.appName}>CoopLedger</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.description}>
          Plateforme de gestion coopérative basée sur la blockchain.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 60 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    flex: 1,
    fontSize: 24,
    color: "#1a1c1c",
    fontFamily: "GoogleSansText-Bold",
    textAlign: "center",
  },
  spacer: { width: 40 },
  card: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    gap: 12,
  },
  appName: {
    fontSize: 24,
    color: "#1a1c1c",
    fontFamily: "GoogleSansText-Bold",
  },
  version: {
    fontSize: 14,
    color: "#999",
    fontFamily: "GoogleSansText-Regular",
  },
  description: {
    fontSize: 15,
    color: "#3e4943",
    fontFamily: "GoogleSansText-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
});
