import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Trophy, Medal, Crown, Zap, Target } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

type LeaderboardEntry = {
  rank: number;
  name: string;
  level: number;
  score: number;
  gamesPlayed: number;
};

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'ScamSlayer99', level: 25, score: 8750, gamesPlayed: 156 },
  { rank: 2, name: 'FraudFighter', level: 24, score: 8420, gamesPlayed: 148 },
  { rank: 3, name: 'CyberSamurai', level: 23, score: 8100, gamesPlayed: 142 },
  { rank: 4, name: 'PhishingHunter', level: 22, score: 7850, gamesPlayed: 138 },
  { rank: 5, name: 'SecureShield', level: 21, score: 7600, gamesPlayed: 132 },
  { rank: 6, name: 'TrustGuardian', level: 20, score: 7320, gamesPlayed: 128 },
  { rank: 7, name: 'VigilantEye', level: 19, score: 6950, gamesPlayed: 122 },
  { rank: 8, name: 'SafetyNinja', level: 18, score: 6580, gamesPlayed: 115 },
  { rank: 9, name: 'AlertWarrior', level: 17, score: 6200, gamesPlayed: 108 },
  { rank: 10, name: 'DefendMaster', level: 16, score: 5890, gamesPlayed: 102 },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'allTime'>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return Crown;
      case 2:
      case 3:
        return Medal;
      default:
        return Trophy;
    }
  };

  const getRankGradient = (rank: number): readonly [string, string, ...string[]] => {
    switch (rank) {
      case 1:
        return Gradients.gold;
      case 2:
        return ['#E8E8E8', '#C0C0C0'] as const;
      case 3:
        return ['#E6A875', '#CD7F32'] as const;
      default:
        return Gradients.card;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.backgroundSecondary]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.periodSelector}>
          {(['daily', 'weekly', 'allTime'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
              activeOpacity={0.7}
            >
              {selectedPeriod === period && (
                <LinearGradient
                  colors={Gradients.primary}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {leaderboardData.slice(0, 3).map((entry) => {
            const RankIcon = getRankIcon(entry.rank);
            return (
              <View key={entry.rank} style={styles.topCard}>
                <LinearGradient
                  colors={getRankGradient(entry.rank)}
                  style={styles.topCardGradient}
                >
                  <View style={styles.topCardRank}>
                    <RankIcon size={32} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={styles.topCardRankNumber}>#{entry.rank}</Text>
                  </View>

                  <View style={styles.topCardContent}>
                    <Text style={styles.topCardName}>{entry.name}</Text>
                    <View style={styles.topCardStats}>
                      <View style={styles.topCardStat}>
                        <Zap size={16} color="#FFFFFF" opacity={0.9} />
                        <Text style={styles.topCardStatText}>Lv {entry.level}</Text>
                      </View>
                      <View style={styles.topCardStat}>
                        <Target size={16} color="#FFFFFF" opacity={0.9} />
                        <Text style={styles.topCardStatText}>{entry.gamesPlayed} games</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.topCardScore}>
                    <Text style={styles.topCardScoreValue}>{entry.score.toLocaleString()}</Text>
                    <Text style={styles.topCardScoreLabel}>Score</Text>
                  </View>
                </LinearGradient>
              </View>
            );
          })}

          <View style={styles.listContainer}>
            {leaderboardData.slice(3).map((entry) => (
              <View key={entry.rank} style={styles.listItem}>
                <View style={styles.listItemRank}>
                  <Text style={styles.listItemRankText}>#{entry.rank}</Text>
                </View>

                <View style={styles.listItemContent}>
                  <Text style={styles.listItemName}>{entry.name}</Text>
                  <View style={styles.listItemStats}>
                    <Zap size={14} color={Colors.dark.textSecondary} />
                    <Text style={styles.listItemStatText}>Lv {entry.level}</Text>
                    <Text style={styles.listItemDivider}>•</Text>
                    <Target size={14} color={Colors.dark.textSecondary} />
                    <Text style={styles.listItemStatText}>{entry.gamesPlayed} games</Text>
                  </View>
                </View>

                <View style={styles.listItemScore}>
                  <Text style={styles.listItemScoreValue}>{entry.score.toLocaleString()}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.yourRankCard}>
            <LinearGradient
              colors={[Colors.dark.primary + '30', Colors.dark.primary + '10']}
              style={styles.yourRankGradient}
            >
              <View style={styles.yourRankContent}>
                <Text style={styles.yourRankLabel}>Your Rank</Text>
                <View style={styles.yourRankInfo}>
                  <Text style={styles.yourRankNumber}>#142</Text>
                  <Text style={styles.yourRankScore}>4,850 pts</Text>
                </View>
              </View>
              <View style={styles.yourRankBadge}>
                <Trophy size={24} color={Colors.dark.primary} />
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardBorder,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.dark.text,
  },
  periodSelector: {
    flexDirection: 'row' as const,
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.card,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  },
  periodButtonActive: {
    backgroundColor: 'transparent' as const,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.textSecondary,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  topCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden' as const,
  },
  topCardGradient: {
    padding: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 16,
  },
  topCardRank: {
    alignItems: 'center' as const,
    gap: 4,
  },
  topCardRankNumber: {
    fontSize: 14,
    fontWeight: '800' as const,
    color: '#FFFFFF',
  },
  topCardContent: {
    flex: 1,
  },
  topCardName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  topCardStats: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  topCardStat: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  topCardStatText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  topCardScore: {
    alignItems: 'flex-end' as const,
  },
  topCardScoreValue: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: '#FFFFFF',
  },
  topCardScoreLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  listItemRank: {
    width: 40,
    alignItems: 'center' as const,
  },
  listItemRankText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.dark.textSecondary,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  listItemStats: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  listItemStatText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  listItemDivider: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginHorizontal: 4,
  },
  listItemScore: {
    alignItems: 'flex-end' as const,
  },
  listItemScoreValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
  },
  yourRankCard: {
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  yourRankGradient: {
    padding: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  yourRankContent: {
    flex: 1,
  },
  yourRankLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  yourRankInfo: {
    flexDirection: 'row' as const,
    alignItems: 'baseline' as const,
    gap: 12,
  },
  yourRankNumber: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.dark.text,
  },
  yourRankScore: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.textSecondary,
  },
  yourRankBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.primary + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});
