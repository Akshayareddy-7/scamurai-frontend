import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Sword,
  Shield,
  MessageCircle,
  Newspaper,
  User,
  Trophy,
  Menu,
  X,
  Coins,
  Zap,
  Target,
  Star,
  Award,
  Flame,
  Crown,
  ArrowRight,
} from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = 300;

// Custom Particle Component
const Particle = ({ delay = 0 }: { delay?: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;
  
  const randomX = Math.random() * width;
  const randomSize = Math.random() * 6 + 2;
  const randomDuration = Math.random() * 8000 + 6000;

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: -height - 100,
              duration: randomDuration,
              delay: delay,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.2,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    startAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: randomX,
          width: randomSize,
          height: randomSize,
          borderRadius: randomSize / 2,
          transform: [{ translateY: animatedValue }],
          opacity: opacity,
        },
      ]}
    />
  );
};

export default function DashboardScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 30,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animations for platform elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: -20,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: -12,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation for coins
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for main button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: menuOpen ? 0 : -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: menuOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const menuItems = [
    { icon: Sword, label: 'Start Game', route: '/game', gradient: Gradients.primary },
    { icon: MessageCircle, label: 'Fraud Chatbot', route: '/chatbot', gradient: Gradients.success },
    { icon: Newspaper, label: 'Fraud News', route: '/news', gradient: Gradients.danger },
    { icon: User, label: 'Profile', route: '/profile', gradient: Gradients.gold },
    { icon: Trophy, label: 'Leaderboard', route: '/leaderboard', gradient: Gradients.primary },
  ];

  const quickStats = [
    { icon: Shield, label: 'Scams Blocked', value: '45', color: Colors.dark.success, trend: '+12%' },
    { icon: Target, label: 'Accuracy', value: '87%', color: Colors.dark.primary, trend: '+3%' },
    { icon: Zap, label: 'Streak', value: '7 days', color: Colors.dark.accent, trend: '+2' },
    { icon: Trophy, label: 'Rank', value: '#12', color: Colors.dark.secondary, trend: '+5' },
  ];

  return (
    <View style={styles.container}>
      {/* Animated Gradient Background */}
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.backgroundSecondary, '#1a1038']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Custom Particle Background */}
      <View style={styles.particlesContainer}>
        {Array.from({ length: 40 }).map((_, index) => (
          <Particle key={index} delay={index * 200} />
        ))}
      </View>

      {/* Floating Decorative Elements (Subway Surfer style) */}
      <Animated.View
        style={[
          styles.floatingCoin,
          styles.coin1,
          { transform: [{ translateY: floatAnim1 }] },
        ]}
      >
        <LinearGradient colors={Gradients.gold} style={styles.coinGradient}>
          <Coins size={24} color="#FFFFFF" />
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCoin,
          styles.coin2,
          { transform: [{ translateY: floatAnim2 }] },
        ]}
      >
        <LinearGradient colors={Gradients.success} style={styles.coinGradient}>
          <Shield size={28} color="#FFFFFF" />
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCoin,
          styles.coin3,
          { transform: [{ translateY: floatAnim3 }] },
        ]}
      >
        <LinearGradient colors={Gradients.danger} style={styles.coinGradient}>
          <Star size={20} color="#FFFFFF" />
        </LinearGradient>
      </Animated.View>

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <LinearGradient colors={Gradients.primary} style={styles.menuButtonGradient}>
              <Menu size={24} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.levelBadgeHeader}>
            <LinearGradient colors={Gradients.gold} style={styles.levelBadgeGradient}>
              <Crown size={18} color="#FFFFFF" />
              <Text style={styles.levelBadgeText}>Level 12</Text>
            </LinearGradient>
          </View>

          <View style={styles.coinsContainer}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Coins size={22} color={Colors.dark.accent} />
            </Animated.View>
            <Text style={styles.coinsText}>1,250</Text>
          </View>
        </Animated.View>

        {/* Main Content - Platform Style */}
        <Animated.View
          style={[
            styles.mainContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim }],
            },
          ]}
        >
          {/* Game Logo/Title Platform */}
          <View style={styles.titlePlatform}>
            <LinearGradient
              colors={['#1a1f3a', '#252b48']}
              style={styles.platformBase}
            >
              {/* Glowing Title */}
              <Text style={styles.mainTitle}>SCAMURAI</Text>
              <View style={styles.titleGlow} />
              <Text style={styles.subtitle}>Master Fraud Detection</Text>

              {/* Character/Icon Placeholder */}
              <View style={styles.characterContainer}>
                <LinearGradient colors={Gradients.primary} style={styles.characterCircle}>
                  <Shield size={64} color="#FFFFFF" strokeWidth={3} />
                </LinearGradient>
                <View style={styles.characterShadow} />
              </View>
            </LinearGradient>
          </View>

          {/* Quick Stats Mini Cards (Ludo King style) */}
          <View style={styles.miniStatsContainer}>
            {quickStats.slice(0, 3).map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.miniStatCard,
                  { transform: [{ translateY: floatAnim1 }] },
                ]}
              >
                <LinearGradient colors={Gradients.card} style={styles.miniStatGradient}>
                  <stat.icon size={20} color={stat.color} />
                  <Text style={styles.miniStatValue}>{stat.value}</Text>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>

          {/* Main CTA Button (Subway Surfer style) */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => router.push('/game')}
              activeOpacity={0.85}
            >
              <LinearGradient colors={Gradients.primary} style={styles.mainButtonGradient}>
                <View style={styles.buttonGlow} />
                <Flame size={28} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.mainButtonText}>START MISSION</Text>
                <ArrowRight size={24} color="#FFFFFF" strokeWidth={3} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Quick Action Tiles (Gaming style) */}
          <View style={styles.quickActionTiles}>
            <TouchableOpacity
              style={styles.actionTile}
              onPress={() => router.push('/chatbot')}
            >
              <LinearGradient colors={Gradients.success} style={styles.tileGradient}>
                <MessageCircle size={32} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.tileText}>AI Assistant</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionTile}
              onPress={() => router.push('/leaderboard')}
            >
              <LinearGradient colors={Gradients.gold} style={styles.tileGradient}>
                <Trophy size={32} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.tileText}>Leaderboard</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Daily Challenge Banner */}
          <View style={styles.challengeBanner}>
            <LinearGradient
              colors={['#6C5CE7', '#FF3B5C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerContent}>
                <Award size={28} color="#FFFFFF" />
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle}>DAILY CHALLENGE</Text>
                  <Text style={styles.bannerSubtitle}>Complete 3 scenarios • +500 coins</Text>
                </View>
                <ArrowRight size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </SafeAreaView>

      {/* Menu Overlay */}
      {menuOpen && (
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
        </TouchableOpacity>
      )}

      {/* Side Menu */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <LinearGradient colors={['#0A0E27', '#151938']} style={styles.menuGradient}>
          <SafeAreaView style={styles.menuContent} edges={['top', 'bottom']}>
            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <View style={styles.menuHeaderTop}>
                <View style={styles.menuLogo}>
                  <LinearGradient colors={Gradients.primary} style={styles.menuLogoGradient}>
                    <Shield size={28} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <TouchableOpacity onPress={toggleMenu}>
                  <X size={28} color={Colors.dark.text} />
                </TouchableOpacity>
              </View>
              <Text style={styles.menuUserName}>Warrior Alex</Text>
              <View style={styles.menuLevelContainer}>
                <Flame size={16} color={Colors.dark.accent} />
                <Text style={styles.menuUserLevel}>Level 12 Scamurai</Text>
              </View>
            </View>

            <ScrollView style={styles.menuScrollView} showsVerticalScrollIndicator={false}>
              {/* Stats Section */}
              <View style={styles.menuSection}>
                <Text style={styles.menuSectionTitle}>YOUR STATS</Text>
                <View style={styles.menuStatsGrid}>
                  {quickStats.map((stat, index) => (
                    <View key={index} style={styles.menuStatCard}>
                      <LinearGradient colors={Gradients.card} style={styles.menuStatGradient}>
                        <stat.icon size={18} color={stat.color} />
                        <Text style={styles.menuStatValue}>{stat.value}</Text>
                        <Text style={styles.menuStatLabel}>{stat.label}</Text>
                      </LinearGradient>
                    </View>
                  ))}
                </View>
              </View>

              {/* Menu Items */}
              <View style={styles.menuSection}>
                <Text style={styles.menuSectionTitle}>NAVIGATE</Text>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      setMenuOpen(false);
                      router.push(item.route as any);
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient colors={item.gradient} style={styles.menuItemIcon}>
                      <item.icon size={22} color="#FFFFFF" strokeWidth={2.5} />
                    </LinearGradient>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                    <ArrowRight size={18} color={Colors.dark.textSecondary} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
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

  // Particle Background
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    bottom: height,
    backgroundColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },

  // Floating Coins/Elements
  floatingCoin: {
    position: 'absolute',
    zIndex: 1,
  },
  coin1: {
    top: '15%',
    right: 30,
  },
  coin2: {
    top: '35%',
    left: 20,
  },
  coin3: {
    bottom: '25%',
    right: 40,
  },
  coinGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,
  },
  menuButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  menuButtonGradient: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeHeader: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  levelBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.dark.accent,
    elevation: 4,
  },
  coinsText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
  },

  // Main Content
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Title Platform
  titlePlatform: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
  },
  platformBase: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.dark.primary,
    borderRadius: 24,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 4,
    textShadowColor: Colors.dark.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    zIndex: 2,
  },
  titleGlow: {
  position: 'absolute',
  top: 24,
  width: '80%',
  height: 40,
  backgroundColor: Colors.dark.primary,
  opacity: 0.3,
  borderRadius: 20,
  // Remove 'blur' - it's not a valid React Native style property
},
  subtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  characterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 12,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  characterShadow: {
    width: 80,
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 40,
    marginTop: 8,
    opacity: 0.6,
  },

  // Mini Stats
  miniStatsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  miniStatCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  miniStatGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: Colors.dark.cardBorder,
    borderRadius: 16,
  },
  miniStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark.text,
  },

  // Main Button
  mainButton: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 12,
  },
  mainButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 28,
  },
  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },

  // Quick Action Tiles
  quickActionTiles: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  actionTile: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
  },
  tileGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
  },
  tileText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Challenge Banner
  challengeBanner: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
  },
  bannerGradient: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  // Menu
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
  },
  menuGradient: {
    flex: 1,
    elevation: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuScrollView: {
    flex: 1,
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.cardBorder,
  },
  menuHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuLogo: {
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 4,
  },
  menuLogoGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 28,
  },
  menuUserName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark.text,
    marginBottom: 6,
  },
  menuLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuUserLevel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '600',
  },

  // Menu Sections
  menuSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardBorder,
  },
  menuSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.dark.textSecondary,
    marginBottom: 16,
    letterSpacing: 1.5,
  },
  menuStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  menuStatCard: {
    width: (MENU_WIDTH - 60) / 2,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  menuStatGradient: {
    padding: 12,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
    borderRadius: 12,
  },
  menuStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  menuStatLabel: {
    fontSize: 10,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.dark.card,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark.text,
    fontWeight: '700',
  },
});
