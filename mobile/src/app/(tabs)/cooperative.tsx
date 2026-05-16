import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, useIsFocused } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { authenticatedFetch } from '@/utils/auth-client';
import { env } from '@/config/env';

export default function CooperativeTabScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [myMembership, setMyMembership] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoopIndex, setSelectedCoopIndex] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await authenticatedFetch(`${env.API_BASE_URL}/api/user/dashboard`, {}, router);
        setDashboardData(data);
      } catch (e) {
        console.error('Error loading dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isFocused]);

  useEffect(() => {
    const coop = dashboardData?.cooperatives?.[selectedCoopIndex];
    if (!coop) return;
    async function loadMembership() {
      try {
        const { data } = await authenticatedFetch(`${env.API_BASE_URL}/api/cooperatives/${coop.id}/membership/me`, {}, router);
        setMyMembership(data);
      } catch (e) {
        setMyMembership(null);
      }
    }
    loadMembership();
  }, [selectedCoopIndex, dashboardData, isFocused]);

  const isAdmin = myMembership && (myMembership.grade === 'ADMIN' || myMembership.grade === 'TREASURER');

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2d936c" />
      </View>
    );
  }

  const cooperatives = dashboardData?.cooperatives || [];
  const coop = cooperatives[selectedCoopIndex];

  if (!coop) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="business-outline" size={48} color="#ccc" />
        <Text style={styles.emptyText}>Aucune coopérative</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coopérative</Text>
      </View>

      {cooperatives.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
          {cooperatives.map((c: any, i: number) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.coopTab, i === selectedCoopIndex && styles.coopTabActive]}
              onPress={() => setSelectedCoopIndex(i)}
            >
              <Text style={[styles.coopTabText, i === selectedCoopIndex && styles.coopTabTextActive]}>
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Text style={styles.coopName}>{coop.name}</Text>
      <Text style={styles.coopDesc}>{coop.description}</Text>

      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>PORTEFEUILLE DE LA COOPÉRATIVE</Text>
        <Text style={styles.walletValue}>{dashboardData?.balance || '0'} {dashboardData?.currency || 'FCFA'}</Text>
        {isAdmin && (
          <Button
            title="Proposer un vote"
            onPress={() => router.push(`/propose-vote?coopId=${coop.id}`)}
            variant="primary"
            style={styles.proposeBtn}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demandes d'adhésion</Text>
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push(`/membership-requests?coopId=${coop.id}`)}>
          <Text style={styles.viewAllText}>Voir tout</Text>
          <Ionicons name="chevron-forward" size={16} color="#2d936c" />
        </TouchableOpacity>
      </View>

      <View style={styles.emptyRequests}>
        <Ionicons name="people-outline" size={32} color="#ccc" />
        <Text style={styles.emptyText}>Aucune demande en attente</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
  },
  tabsRow: {
    marginBottom: 20,
  },
  coopTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 10,
  },
  coopTabActive: {
    backgroundColor: '#2d936c',
    borderColor: '#2d936c',
  },
  coopTabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'GoogleSansText-Medium',
  },
  coopTabTextActive: {
    color: '#fff',
  },
  coopName: {
    fontSize: 24,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
    marginBottom: 8,
  },
  coopDesc: {
    fontSize: 15,
    color: '#3e4943',
    fontFamily: 'GoogleSansText-Regular',
    marginBottom: 24,
    lineHeight: 22,
  },
  walletCard: {
    backgroundColor: '#2d936c',
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
  },
  walletLabel: {
    fontSize: 12,
    color: '#94f6c8',
    fontFamily: 'GoogleSansText-Medium',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  walletValue: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'GoogleSansText-Bold',
    marginBottom: 24,
  },
  proposeBtn: {
    borderRadius: 99,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Bold',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2d936c',
    fontFamily: 'GoogleSansText-Medium',
  },
  emptyRequests: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'GoogleSansText-Regular',
  },
});
