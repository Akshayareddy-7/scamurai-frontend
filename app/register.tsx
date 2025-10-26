import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Sword, Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleRegister = () => {
    router.replace('/dashboard' as any);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.backgroundSecondary]}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <LinearGradient colors={Gradients.success} style={styles.iconGradient}>
                    <Sword size={40} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>Join the Warriors</Text>
                <Text style={styles.subtitle}>Start your scam defense journey today</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <User size={20} color={Colors.dark.success} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Mail size={20} color={Colors.dark.success} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Lock size={20} color={Colors.dark.success} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleRegister}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={Gradients.success}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>Create Account</Text>
                    <ArrowRight size={20} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.terms}>
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </Text>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={() => router.back()}
                >
                  <Text style={styles.loginText}>
                    Already a warrior? <Text style={styles.loginTextBold}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center' as const,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center' as const,
  },
  header: {
    alignItems: 'center' as const,
    marginBottom: 48,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: Colors.dark.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark.text,
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    shadowColor: Colors.dark.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  terms: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 18,
  },
  divider: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.cardBorder,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '600' as const,
  },
  loginLink: {
    alignItems: 'center' as const,
  },
  loginText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  loginTextBold: {
    color: Colors.dark.success,
    fontWeight: '700' as const,
  },
});
