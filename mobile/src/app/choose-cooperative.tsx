import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import { authClient } from '@/lib/auth-client';

export default function ChooseCooperativeScreen() {
  const router = useRouter();
  const [cooperatives, setCooperatives] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCooperatives();
  }, []);

  const fetchCooperatives = async () => {
    try {
      const token = await authClient.getToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/cooperatives`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setCooperatives(data);
    } catch (e: any) {
      console.error('Failed to fetch cooperatives:', e);
    }
  };

  const handleCreate = async () => {
    if (!name) {
      Alert.alert('Erreur', 'Le nom de la coopérative est requis');
      return;
    }

    setLoading(true);
    try {
      const token = await authClient.getToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/cooperatives`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) throw new Error('Failed to create cooperative');

      Alert.alert('Succès', 'Coopérative créée avec succès !');
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (cooperativeId: string) => {
    setLoading(true);
    try {
      const token = await authClient.getToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/cooperatives/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cooperativeId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to join cooperative');
      }

      Alert.alert('Succès', 'Vous avez rejoint la coopérative !');
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma Coopérative</Text>
        <Text style={styles.subtitle}>Créez votre propre coopérative ou rejoignez-en une existante pour commencer.</Text>
      </View>

      {!creating ? (
        <View style={styles.selectionSection}>
          <Text style={styles.sectionTitle}>Rejoindre une coopérative</Text>
          <FlatList
            data={cooperatives}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.coopItem}>
                <View style={styles.coopInfo}>
                  <Text style={styles.coopName}>{item.name}</Text>
                  <Text style={styles.coopDesc}>{item.description}</Text>
                </View>
                <Button
                  title="Rejoindre"
                  onPress={() => handleJoin(item.id)}
                  variant="primary"
                  style={styles.joinButton}
                />
              </View>
            )}
            scrollEnabled={false}
            ListEmptyComponent={<Text style={styles.emptyText}>Aucune coopérative disponible pour le moment.</Text>}
          />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.line} />
          </View>

          <Button
            title="Créer une coopérative"
            onPress={() => setCreating(true)}
            variant="secondary"
          />
        </View>
      ) : (
        <View style={styles.creationSection}>
          <Text style={styles.sectionTitle}>Créer une nouvelle coopérative</Text>
          <Input
            label="Nom de la coopérative"
            value={name}
            onChangeText={setName}
            placeholder="ex: Coop-Café Togo"
          />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez vos objectifs..."
          />
          <View style={styles.buttonGroup}>
            <Button
              title="Annuler"
              onPress={() => setCreating(false)}
              variant="tertiary"
            />
            <Button
              title="Créer"
              onPress={handleCreate}
              loading={loading}
              variant="primary"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#3e4943',
    textAlign: 'center',
    fontFamily: 'GoogleSansText-Regular',
    paddingHorizontal: 20,
  },
  selectionSection: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
    marginBottom: 12,
  },
  coopItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  coopInfo: {
    flex: 1,
    marginRight: 12,
  },
  coopName: {
    fontSize: 18,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
  },
  coopDesc: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'GoogleSansText-Regular',
  },
  joinButton: {
    paddingHorizontal: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#3e4943',
    fontSize: 12,
    fontFamily: 'GoogleSansText-Regular',
    textTransform: 'uppercase',
  },
  creationSection: {
    gap: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontFamily: 'GoogleSansText-Regular',
    marginVertical: 20,
  },
});
