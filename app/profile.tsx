import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  User,
  Award,
  Coins,
  Target,
  Shield,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  const achievements = [
    { id: 1, name: 'First Victory', description: 'Complete your first scenario', icon: Award, unlocked: true },
    { id: 2, name: 'Scam Detector', description: 'Identify 10 scams correctly', icon: Shield, unlocked: true },
    { id: 3, name: 'Streak Master', description: '7-day login streak', icon: TrendingUp, unlocked: true },
    { id: 4, name: 'Coin Collector', description: 'Earn 1000 coins', icon: Coins, unlocked: true },
    { id: 5, name: 'Perfect Score', description: 'Complete a game with no mistakes', icon: Target, unlocked: false },
    { id: 6, name: 'Master Guardian', description: 'Block 100 scams', icon: Shield, unlocked: false },
  ];

  const stats = [
    { label: 'Games Played', value: '28', icon: Target },
    { label: 'Success Rate', value: '87%', icon: TrendingUp },
    { label: 'Total Coins', value: '1,250', icon: Coins },
    { label: 'Rank', value: '#142', icon: Award },
  ];

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
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <Settings size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileCard}>
            <LinearGradient colors={Gradients.card} style={styles.profileGradient}>
              <View style={styles.avatarContainer}>
                <LinearGradient colors={Gradients.primary} style={styles.avatar}>
                  <User size={48} color="#FFFFFF" strokeWidth={2.5} />
                </LinearGradient>
              </View>

              <Text style={styles.userName}>Warrior Alex</Text>
              <Text style={styles.userLevel}>Level 12 Scamurai</Text>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <LinearGradient
                    colors={Gradients.primary}
                    style={[styles.progressBarFill, { width: '65%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.progressText}>650 / 1000 XP to Level 13</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient
                  colors={[Colors.dark.card, Colors.dark.backgroundSecondary]}
                  style={styles.statGradient}
                >
                  <stat.icon size={24} color={Colors.dark.primary} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.achievementCardLocked,
                  ]}
                >
                  <View
                    style={[
                      styles.achievementIcon,
                      { backgroundColor: achievement.unlocked ? Colors.dark.accent + '20' : Colors.dark.card },
                    ]}
                  >
                    <achievement.icon
                      size={28}
                      color={achievement.unlocked ? Colors.dark.accent : Colors.dark.textSecondary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.achievementName,
                      !achievement.unlocked && styles.achievementNameLocked,
                    ]}
                  >
                    {achievement.name}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
            <View style={styles.logoutButtonContent}>
              <LogOut size={20} color={Colors.dark.danger} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
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
  settingsButton: {
    width: 44,
    height: 44,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden' as const,
  },
  profileGradient: {
    padding: 32,
    alignItems: 'center' as const,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    fontWeight: '600' as const,
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.dark.backgroundSecondary,
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center' as const,
    fontWeight: '600' as const,
  },
  statsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  statGradient: {
    padding: 16,
    alignItems: 'center' as const,
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    textAlign: 'center' as const,
    marginBottom: 4,
  },
  achievementNameLocked: {
    color: Colors.dark.textSecondary,
  },
  achievementDescription: {
    fontSize: 11,
    color: Colors.dark.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 16,
  },
  logoutButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.danger + '40',
    overflow: 'hidden' as const,
  },
  logoutButtonContent: {
    padding: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.danger,
  },
});
