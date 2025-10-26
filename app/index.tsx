import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Sword, Shield, Zap } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function IntroScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -20,
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
          toValue: -15,
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
          toValue: -25,
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
  }, [fadeAnim, scaleAnim, glowAnim, floatAnim1, floatAnim2, floatAnim3]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.backgroundSecondary, Colors.dark.background]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.floatingIcon,
          { top: 100, left: 50, transform: [{ translateY: floatAnim1 }] },
        ]}
      >
        <Shield size={40} color={Colors.dark.primary} opacity={0.3} />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingIcon,
          { top: 150, right: 60, transform: [{ translateY: floatAnim2 }] },
        ]}
      >
        <Zap size={35} color={Colors.dark.accent} opacity={0.3} />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingIcon,
          { bottom: 200, left: 70, transform: [{ translateY: floatAnim3 }] },
        ]}
      >
        <Sword size={45} color={Colors.dark.secondary} opacity={0.3} />
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={Gradients.primary}
            style={styles.logoGradient}
          >
            <Sword size={80} color="#FFFFFF" strokeWidth={2.5} />
          </LinearGradient>
        </View>

        <Text style={styles.title}>SCAMURAI</Text>
        <Text style={styles.subtitle}>Master the Art of Scam Defense</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.dark.primary + '20' }]}>
              <Sword size={24} color={Colors.dark.primary} />
            </View>
            <Text style={styles.featureText}>Learn Through Battles</Text>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.dark.accent + '20' }]}>
              <Shield size={24} color={Colors.dark.accent} />
            </View>
            <Text style={styles.featureText}>Earn Rewards</Text>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.dark.success + '20' }]}>
              <Zap size={24} color={Colors.dark.success} />
            </View>
            <Text style={styles.featureText}>Stay Protected</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push('/login' as any)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={Gradients.primary}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Animated.View
              style={[
                styles.buttonGlow,
                { opacity: glowOpacity },
              ]}
            />
            <Text style={styles.buttonText}>Get Started</Text>
            <Zap size={20} color="#FFFFFF" style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.tagline}>Join 100K+ Scamurai Warriors</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  floatingIcon: {
    position: 'absolute' as const,
  },
  content: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: '900' as const,
    color: Colors.dark.text,
    letterSpacing: 2,
    textShadowColor: Colors.dark.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.dark.textSecondary,
    marginTop: 8,
    marginBottom: 48,
    fontWeight: '500' as const,
  },
  featuresContainer: {
    flexDirection: 'row' as const,
    gap: 24,
    marginBottom: 48,
  },
  feature: {
    alignItems: 'center' as const,
    gap: 8,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  featureText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontWeight: '600' as const,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden' as const,
  },
  buttonGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  tagline: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
});
