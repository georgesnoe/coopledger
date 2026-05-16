import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authenticatedFetch } from '@/utils/auth-client';
import { env } from '@/config/env';

export default function ActivityScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const { data } = await authenticatedFetch(`${env.API_BASE_URL}/api/user/dashboard`, {}, router);
        setTransactions(data.transactions || []);
      } catch (e) {
        console.error('Error loading transactions:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>Activité</Text>
        <View style={styles.spacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2d936c" />
        </View>
      ) : (
        <View style={styles.list}>
          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Aucune transaction</Text>
            </View>
          ) : (
            transactions.map((tx: any, index: number) => (
              <View key={tx.id || index} style={styles.activityItem}>
                <View style={[styles.activityIcon, {
                  backgroundColor: tx.type === 'COTISATION' ? '#d1fae5' : tx.type === 'RETRAIT' ? '#fee2e2' : '#dbeafe'
                }]}>
                  <Ionicons
                    name={tx.type === 'COTISATION' ? "arrow-down" : tx.type === 'RETRAIT' ? "arrow-up" : "cube"}
                    size={20}
                    color={tx.type === 'COTISATION' ? "#2d936c" : tx.type === 'RETRAIT' ? "#ef4444" : "#3b82f6"}
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{tx.description || tx.type}</Text>
                  <Text style={styles.activityDate}>
                    {new Date(tx.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Text style={tx.type === 'COTISATION' ? styles.amountPositive : styles.amountNegative}>
                  {tx.type === 'COTISATION' ? '+' : '-'} {tx.amount} FCFA
                </Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
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
  spacer: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'GoogleSansText-Regular',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Medium',
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'GoogleSansText-Regular',
  },
  amountPositive: {
    fontSize: 15,
    color: '#2d936c',
    fontFamily: 'GoogleSansText-Bold',
  },
  amountNegative: {
    fontSize: 15,
    color: '#ef4444',
    fontFamily: 'GoogleSansText-Bold',
  },
});
