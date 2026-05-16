import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authClient } from '@/utils/auth-client';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>Informations personnelles</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color="#2d936c" />
          <View style={styles.info}>
            <Text style={styles.label}>Nom complet</Text>
            <Text style={styles.value}>{user?.name || 'Non renseigné'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="call-outline" size={20} color="#2d936c" />
          <View style={styles.info}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{user?.phoneNumber || 'Non renseigné'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color="#2d936c" />
          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || 'Non renseigné'}</Text>
          </View>
        </View>
      </View>
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
  card: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'GoogleSansText-Regular',
  },
  value: {
    fontSize: 16,
    color: '#1a1c1c',
    fontFamily: 'GoogleSansText-Medium',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
});
