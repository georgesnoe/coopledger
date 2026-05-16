import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authenticatedFetch } from '@/utils/auth-client';
import { env } from '@/config/env';

export default function MembershipRequestsScreen() {
  const router = useRouter();
  const { coopId } = useLocalSearchParams();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        if (!coopId) return;
        const { data } = await authenticatedFetch(`${env.API_BASE_URL}/api/cooperatives/${coopId}/members`, {}, router);
        setRequests(data.filter((m: any) => m.status === 'PENDING'));
      } catch (e) {
        console.error('Error loading membership requests:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [coopId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>Demandes d'adhésion</Text>
        <View style={styles.spacer} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2d936c" />
        </View>
      ) : requests.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="people-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Aucune demande en attente</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {requests.map((req: any, index: number) => (
            <View key={req.id || index} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={24} color="#2d936c" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.userName}>{req.user?.name || 'Utilisateur'}</Text>
                  <Text style={styles.userPhone}>{req.user?.phoneNumber || ''}</Text>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.acceptBtn}>
                  <Ionicons name="checkmark" size={18} color="#fff" />
                  <Text style={styles.btnText}>Accepter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                  <Ionicons name="close" size={18} color="#ef4444" />
                  <Text style={[styles.btnText, { color: '#ef4444' }]}>Refuser</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 24 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  title: { flex: 1, fontSize: 24, color: '#1a1c1c', fontFamily: 'GoogleSansText-Bold', textAlign: 'center' },
  spacer: { width: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 16, color: '#999', fontFamily: 'GoogleSansText-Regular' },
  list: { paddingHorizontal: 24, gap: 12, paddingBottom: 40 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#eee', gap: 16 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  userName: { fontSize: 16, color: '#1a1c1c', fontFamily: 'GoogleSansText-Medium' },
  userPhone: { fontSize: 13, color: '#666', fontFamily: 'GoogleSansText-Regular', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12 },
  acceptBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#2d936c', borderRadius: 99, paddingVertical: 10 },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fff', borderRadius: 99, borderWidth: 1, borderColor: '#fee2e2', paddingVertical: 10 },
  btnText: { fontSize: 14, color: '#fff', fontFamily: 'GoogleSansText-Medium' },
});
