import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authenticatedFetch } from '@/utils/auth-client';
import { env } from '@/config/env';

export default function CooperativeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [cooperative, setCooperative] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCooperative() {
      try {
        const { data } = await authenticatedFetch(`${env.API_BASE_URL}/api/user/dashboard`, {}, router);
        const coop = data.cooperatives?.find((c: any) => c.id === id);
        setCooperative(coop);
      } catch (e) {
        console.error('Error loading cooperative:', e);
      } finally {
        setLoading(false);
      }
    }
    loadCooperative();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2d936c" />
      </View>
    );
  }

  if (!cooperative) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.emptyText}>Coopérative introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>Coopérative</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.card}>
        <View style={styles.nameRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{cooperative.name?.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.nameInfo}>
            <Text style={styles.coopName}>{cooperative.name}</Text>
            <Text style={styles.coopStatus}>Active</Text>
          </View>
        </View>

        <Text style={styles.description}>{cooperative.description}</Text>

        {cooperative.founders?.length > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{cooperative.founders.join(', ')}</Text>
          </View>
        )}

        {cooperative.latitude && cooperative.longitude && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{cooperative.latitude.toFixed(4)}, {cooperative.longitude.toFixed(4)}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    flex: 1,
    fontSize: 24,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
    textAlign: 'center',
  },
  spacer: { width: 40 },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'GoogleSansText-Regular',
  },
  card: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2d936c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'GoogleSansText-Bold',
  },
  nameInfo: {
    flex: 1,
  },
  coopName: {
    fontSize: 20,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
  },
  coopStatus: {
    fontSize: 14,
    color: '#2d936c',
    fontFamily: 'GoogleSansText-Medium',
  },
  description: {
    fontSize: 15,
    color: '#3e4943',
    fontFamily: 'GoogleSansText-Regular',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'GoogleSansText-Regular',
    flex: 1,
  },
});
