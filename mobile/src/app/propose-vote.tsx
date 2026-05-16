import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authenticatedFetch } from '@/utils/auth-client';
import { env } from '@/config/env';

type VoteType = 'VOTE_GENERAL' | 'COTISATION' | 'RETRAIT' | 'CANDIDATURE_BUREAU';

const VOTE_TYPE_LABELS: Record<VoteType, string> = {
  VOTE_GENERAL: 'Vote général',
  COTISATION: 'Cotisation',
  RETRAIT: 'Retrait',
  CANDIDATURE_BUREAU: 'Candidature au bureau',
};

export default function ProposeVoteScreen() {
  const router = useRouter();
  const { coopId } = useLocalSearchParams();
  const [voteType, setVoteType] = useState<VoteType>('VOTE_GENERAL');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [proposalsText, setProposalsText] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !proposalsText || !endDate) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires');
      return;
    }

    if ((voteType === 'COTISATION' || voteType === 'RETRAIT') && !amount) {
      Alert.alert('Erreur', 'Veuillez indiquer un montant');
      return;
    }

    if (voteType === 'RETRAIT' && !beneficiary) {
      Alert.alert('Erreur', 'Veuillez indiquer le bénéficiaire');
      return;
    }

    setLoading(true);
    try {
      const body: any = {
        subject,
        description,
        proposals: proposalsText.split('\n').map(p => p.trim()).filter(Boolean),
        endDate: new Date(endDate).toISOString(),
        type: voteType,
        cooperativeId: coopId,
      };

      if (voteType === 'COTISATION' || voteType === 'RETRAIT') {
        body.amount = Number(amount);
      }
      if (voteType === 'RETRAIT') {
        body.beneficiary = beneficiary;
      }

      await authenticatedFetch(`${env.API_BASE_URL}/api/votes/propose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }, router);

      Alert.alert('Succès', 'Votre vote a été proposé !');
      router.back();
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1c" />
        </TouchableOpacity>
        <Text style={styles.title}>Proposer un vote</Text>
        <View style={styles.spacer} />
      </View>

      <Text style={styles.label}>Type de vote</Text>
      <View style={styles.typeRow}>
        {(Object.keys(VOTE_TYPE_LABELS) as VoteType[]).map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, voteType === t && styles.typeBtnActive]}
            onPress={() => setVoteType(t)}
          >
            <Text style={[styles.typeBtnText, voteType === t && styles.typeBtnTextActive]}>
              {VOTE_TYPE_LABELS[t]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input label="Sujet" value={subject} onChangeText={setSubject} placeholder="Titre du vote" />
      <Input label="Description" value={description} onChangeText={setDescription} placeholder="Description optionnelle" multiline />
      <Input label="Propositions (une par ligne)" value={proposalsText} onChangeText={setProposalsText} placeholder="Option 1&#10;Option 2" multiline />
      <Input label="Date de fin" value={endDate} onChangeText={setEndDate} placeholder="2026-06-15" />

      {(voteType === 'COTISATION' || voteType === 'RETRAIT') && (
        <Input label="Montant (FCFA)" value={amount} onChangeText={setAmount} placeholder="50000" keyboardType="numeric" />
      )}

      {voteType === 'RETRAIT' && (
        <Input label="Bénéficiaire" value={beneficiary} onChangeText={setBeneficiary} placeholder="+228 XX XX XX XX" />
      )}

      <Button title="Proposer" onPress={handleSubmit} loading={loading} variant="primary" style={{ marginTop: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  title: { flex: 1, fontSize: 24, color: '#1a1c1c', fontFamily: 'GoogleSansText-Bold', textAlign: 'center' },
  spacer: { width: 40 },
  label: { fontSize: 14, color: '#666', fontFamily: 'GoogleSansText-Medium', marginBottom: 12 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  typeBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  typeBtnActive: { backgroundColor: '#2d936c', borderColor: '#2d936c' },
  typeBtnText: { fontSize: 13, color: '#666', fontFamily: 'GoogleSansText-Medium' },
  typeBtnTextActive: { color: '#fff' },
});
