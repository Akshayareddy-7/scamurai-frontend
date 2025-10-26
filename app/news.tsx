import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, AlertTriangle, TrendingUp, Clock, ExternalLink } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewsArticle = {
  id: number;
  title: string;
  summary: string;
  category: 'phishing' | 'malware' | 'fraud' | 'alert';
  timestamp: string;
  trending: boolean;
};

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'New Phishing Campaign Targets Mobile Banking Users',
    summary: 'Security researchers have identified a sophisticated phishing campaign targeting major banking apps. Scammers are sending SMS messages with fake security alerts.',
    category: 'phishing',
    timestamp: '2 hours ago',
    trending: true,
  },
  {
    id: 2,
    title: 'Romance Scam Losses Reach Record High in 2024',
    summary: 'The FBI reports that romance scams have cost victims over $1.3 billion this year. Experts warn about increased activity on dating platforms.',
    category: 'fraud',
    timestamp: '5 hours ago',
    trending: true,
  },
  {
    id: 3,
    title: 'Fake Cryptocurrency Investment Apps Removed from App Stores',
    summary: 'Tech giants removed dozens of fraudulent crypto apps after reports of users losing millions. Always verify app authenticity before investing.',
    category: 'fraud',
    timestamp: '1 day ago',
    trending: false,
  },
  {
    id: 4,
    title: 'Tax Season Scams: What to Watch For',
    summary: 'IRS warns about phishing emails claiming tax refunds. Remember, the IRS never contacts taxpayers via email about refunds or penalties.',
    category: 'alert',
    timestamp: '1 day ago',
    trending: false,
  },
  {
    id: 5,
    title: 'QR Code Scams on the Rise in Parking Lots',
    summary: 'Scammers are placing fake QR codes over legitimate parking payment codes. Always verify the URL before entering payment information.',
    category: 'phishing',
    timestamp: '2 days ago',
    trending: false,
  },
  {
    id: 6,
    title: 'AI-Generated Voice Scams Targeting Elderly',
    summary: 'Criminals are using AI to clone voices of family members to trick elderly victims into sending money. Always verify identity through multiple channels.',
    category: 'fraud',
    timestamp: '3 days ago',
    trending: true,
  },
];

const getCategoryColor = (category: NewsArticle['category']) => {
  switch (category) {
    case 'phishing':
      return Colors.dark.danger;
    case 'malware':
      return Colors.dark.secondary;
    case 'fraud':
      return Colors.dark.accent;
    case 'alert':
      return Colors.dark.primary;
  }
};

const getCategoryGradient = (category: NewsArticle['category']): readonly [string, string, ...string[]] => {
  switch (category) {
    case 'phishing':
      return Gradients.danger;
    case 'malware':
      return [Colors.dark.secondary, Colors.dark.primary] as const;
    case 'fraud':
      return Gradients.gold;
    case 'alert':
      return Gradients.primary;
  }
};

export default function NewsScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
          <Text style={styles.headerTitle}>Fraud News</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.alertBanner}>
              <LinearGradient
                colors={[Colors.dark.danger + '30', Colors.dark.danger + '10']}
                style={styles.alertGradient}
              >
                <AlertTriangle size={24} color={Colors.dark.danger} />
                <View style={styles.alertText}>
                  <Text style={styles.alertTitle}>Stay Alert</Text>
                  <Text style={styles.alertSubtitle}>
                    New scam alerts updated daily
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={20} color={Colors.dark.accent} />
                <Text style={styles.sectionTitle}>Trending Now</Text>
              </View>

              {newsArticles
                .filter((article) => article.trending)
                .map((article) => (
                  <TouchableOpacity
                    key={article.id}
                    style={styles.newsCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.newsCardContent}>
                      <View style={styles.newsHeader}>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: getCategoryColor(article.category) + '20' },
                          ]}
                        >
                          <Text
                            style={[
                              styles.categoryText,
                              { color: getCategoryColor(article.category) },
                            ]}
                          >
                            {article.category.toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.timestamp}>
                          <Clock size={14} color={Colors.dark.textSecondary} />
                          <Text style={styles.timestampText}>{article.timestamp}</Text>
                        </View>
                      </View>

                      <Text style={styles.newsTitle}>{article.title}</Text>
                      <Text style={styles.newsSummary}>{article.summary}</Text>

                      <View style={styles.readMore}>
                        <Text style={styles.readMoreText}>Read more</Text>
                        <ExternalLink size={16} color={Colors.dark.primary} />
                      </View>
                    </View>

                    <View style={styles.newsCardAccent}>
                      <LinearGradient
                        colors={getCategoryGradient(article.category)}
                        style={styles.accentGradient}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={20} color={Colors.dark.textSecondary} />
                <Text style={styles.sectionTitle}>Recent Updates</Text>
              </View>

              {newsArticles
                .filter((article) => !article.trending)
                .map((article) => (
                  <TouchableOpacity
                    key={article.id}
                    style={styles.newsCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.newsCardContent}>
                      <View style={styles.newsHeader}>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: getCategoryColor(article.category) + '20' },
                          ]}
                        >
                          <Text
                            style={[
                              styles.categoryText,
                              { color: getCategoryColor(article.category) },
                            ]}
                          >
                            {article.category.toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.timestamp}>
                          <Clock size={14} color={Colors.dark.textSecondary} />
                          <Text style={styles.timestampText}>{article.timestamp}</Text>
                        </View>
                      </View>

                      <Text style={styles.newsTitle}>{article.title}</Text>
                      <Text style={styles.newsSummary}>{article.summary}</Text>

                      <View style={styles.readMore}>
                        <Text style={styles.readMoreText}>Read more</Text>
                        <ExternalLink size={16} color={Colors.dark.primary} />
                      </View>
                    </View>

                    <View style={styles.newsCardAccent}>
                      <LinearGradient
                        colors={getCategoryGradient(article.category)}
                        style={styles.accentGradient}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </Animated.View>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  alertBanner: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  alertGradient: {
    padding: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 16,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
  },
  newsCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
    overflow: 'hidden' as const,
  },
  newsCardContent: {
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  timestamp: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  timestampText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.primary,
  },
  newsCardAccent: {
    height: 4,
  },
  accentGradient: {
    flex: 1,
  },
});
