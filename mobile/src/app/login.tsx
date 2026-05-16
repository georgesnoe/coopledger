import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { authClient } from "@/utils/auth-client";

WebBrowser.maybeCompleteAuthSession();

type LoginMethod = "phone" | "email";

export default function LoginScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (method === "phone" && (!phone || !password)) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    if (method === "email" && (!email || !password)) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const loginEmail = method === "phone" ? `${phone}@coopledger.tg` : email;

      const result = await authClient.signIn.email({
        email: loginEmail,
        password,
      });

      if (result.data?.user) {
        router.replace("/");
      }
    } catch (e: any) {
      Alert.alert("Échec de la connexion", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerIllustration}>
        <Image
          source={{
            uri: "https://www.figma.com/api/mcp/asset/ee257560-e9bb-4bfd-b55f-5bb58f2cc7f4",
          }}
          style={styles.illustration}
        />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Bon retour !</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.methodRow}>
            <TouchableOpacity
              style={[styles.methodBtn, method === "phone" && styles.methodBtnActive]}
              onPress={() => setMethod("phone")}
            >
              <Ionicons name="call-outline" size={16} color={method === "phone" ? "#fff" : "#666"} />
              <Text style={[styles.methodBtnText, method === "phone" && styles.methodBtnTextActive]}>
                Téléphone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodBtn, method === "email" && styles.methodBtnActive]}
              onPress={() => setMethod("email")}
            >
              <Ionicons name="mail-outline" size={16} color={method === "email" ? "#fff" : "#666"} />
              <Text style={[styles.methodBtnText, method === "email" && styles.methodBtnTextActive]}>
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {method === "phone" ? (
            <Input
              label="Numéro de téléphone"
              value={phone}
              onChangeText={setPhone}
              placeholder="XX XX XX XX"
              prefix="+228"
              icon={<Ionicons name="call-outline" size={20} color="#666" />}
            />
          ) : (
            <Input
              label="Adresse Email"
              value={email}
              onChangeText={setEmail}
              placeholder="exemple@mail.com"
              keyboardType="email-address"
              icon={<Ionicons name="mail-outline" size={20} color="#666" />}
            />
          )}

          <Input
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            placeholder="Entrez votre mot de passe"
            secureTextEntry
            icon={
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
            }
          />

          <Button
            title="Connexion"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas encore de compte ? </Text>
          <Text style={styles.link} onPress={() => router.push("/signup")}>
            S'inscrire
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
  },
  headerIllustration: {
    height: 240,
    width: "100%",
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    overflow: "hidden",
  },
  illustration: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: "#1a1c1c",
    fontFamily: "GoogleSansText-Bold",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  methodRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  methodBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  methodBtnActive: {
    backgroundColor: "#2d936c",
    borderColor: "#2d936c",
  },
  methodBtnText: {
    fontSize: 13,
    color: "#666",
    fontFamily: "GoogleSansText-Medium",
  },
  methodBtnTextActive: {
    color: "#fff",
  },
  forgotPassword: {
    textAlign: "right",
    fontSize: 12,
    color: "#006494",
    fontFamily: "GoogleSansText-Medium",
    marginBottom: 24,
    marginTop: -8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#3e4943",
    fontSize: 12,
    fontFamily: "GoogleSansText-Regular",
    textTransform: "uppercase",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 16,
    color: "#3e4943",
    fontFamily: "GoogleSansText-Regular",
  },
  link: {
    fontSize: 16,
    color: "#006494",
    fontWeight: "600",
    fontFamily: "GoogleSansText-Medium",
  },
});
