import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Sword,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Coins,
  Zap,
} from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';



type ScenarioOption = {
  text: string;
  isScam: boolean;
  explanation: string;
};

type Scenario = {
  id: number;
  title: string;
  description: string;
  message: string;
  options: ScenarioOption[];
};

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Urgent Payment Request',
    description: 'You receive a text from an unknown number',
    message: 'Hi! This is your bank. Your account has been suspended due to suspicious activity. Click this link immediately to verify your identity: bit.ly/verify-acc',
    options: [
      {
        text: 'Click the link to verify',
        isScam: true,
        explanation: 'Never click suspicious links! Banks never ask you to verify via text links. This is a phishing attempt.',
      },
      {
        text: 'Call my bank directly using the number on their official website',
        isScam: false,
        explanation: 'Correct! Always verify suspicious messages by contacting your bank through official channels.',
      },
      {
        text: 'Reply to ask for more information',
        isScam: true,
        explanation: 'Engaging with scammers can confirm your number is active and lead to more scam attempts.',
      },
    ],
  },
  {
    id: 2,
    title: 'Too Good To Be True',
    description: 'An email promises you won a lottery',
    message: 'Congratulations! You have won $1,000,000 in the International Email Lottery! To claim your prize, please send $500 for processing fees to our account.',
    options: [
      {
        text: 'Send the processing fee',
        isScam: true,
        explanation: 'Legitimate lotteries never ask winners to pay fees upfront. This is a classic advance-fee scam.',
      },
      {
        text: 'Delete the email and report it as spam',
        isScam: false,
        explanation: 'Perfect! If you didn\'t enter a lottery, you can\'t win it. Always delete and report such emails.',
      },
      {
        text: 'Ask them to deduct the fee from the prize',
        isScam: true,
        explanation: 'While smarter than paying directly, engaging with scammers wastes time and confirms your email is active.',
      },
    ],
  },
  {
    id: 3,
    title: 'Romance Scam',
    description: 'Someone you met online needs financial help',
    message: 'Hey love, I\'m stuck abroad and my wallet was stolen. Can you send me $2,000 via wire transfer? I\'ll pay you back as soon as I get home. Please hurry!',
    options: [
      {
        text: 'Send the money immediately',
        isScam: true,
        explanation: 'Romance scammers build trust then create urgent situations. Never send money to someone you haven\'t met in person.',
      },
      {
        text: 'Suggest a video call first to verify identity',
        isScam: false,
        explanation: 'Smart! Scammers avoid video calls. This helps verify if the person is who they claim to be.',
      },
      {
        text: 'Send a smaller amount first',
        isScam: true,
        explanation: 'Any amount sent is still a loss. Scammers will keep asking for more with new excuses.',
      },
    ],
  },
];

export default function GameScreen() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const scenario = scenarios[currentScenario];

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [currentScenario, fadeAnim]);

  const handleOptionSelect = (index: number) => {
    if (showResult) return;

    setSelectedOption(index);
    setShowResult(true);

    const option = scenario.options[index];
    if (!option.isScam) {
      setScore(score + 100);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setLives(lives - 1);
    }
  };

  const handleNext = () => {
    if (lives === 0) {
      router.back();
      return;
    }

    if (currentScenario < scenarios.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentScenario(currentScenario + 1);
        setSelectedOption(null);
        setShowResult(false);
        fadeAnim.setValue(1);
      });
    } else {
      router.back();
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
          <View style={styles.headerStats}>
            <View style={styles.statBadge}>
              <Coins size={20} color={Colors.dark.accent} />
              <Text style={styles.statText}>{score}</Text>
            </View>
            <View style={styles.statBadge}>
              <Zap size={20} color={Colors.dark.danger} />
              <Text style={styles.statText}>{lives}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View
            style={[
              styles.scenarioCard,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.scenarioHeader}>
              <View style={styles.scenarioIcon}>
                <AlertTriangle size={32} color={Colors.dark.danger} />
              </View>
              <View style={styles.scenarioHeaderText}>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                <Text style={styles.scenarioDescription}>{scenario.description}</Text>
              </View>
            </View>

            <View style={styles.messageCard}>
              <LinearGradient
                colors={[Colors.dark.card, Colors.dark.backgroundSecondary]}
                style={styles.messageGradient}
              >
                <Shield size={24} color={Colors.dark.primary} style={styles.messageIcon} />
                <Text style={styles.messageText}>{scenario.message}</Text>
              </LinearGradient>
            </View>

            <Text style={styles.questionText}>What should you do?</Text>

            <View style={styles.optionsContainer}>
              {scenario.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const showCorrect = showResult && !option.isScam;
                const showWrong = showResult && isSelected && option.isScam;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      showCorrect && styles.optionCardCorrect,
                      showWrong && styles.optionCardWrong,
                    ]}
                    onPress={() => handleOptionSelect(index)}
                    activeOpacity={0.8}
                    disabled={showResult}
                  >
                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionText,
                          (showCorrect || showWrong) && styles.optionTextBold,
                        ]}
                      >
                        {option.text}
                      </Text>
                      {showCorrect && (
                        <CheckCircle size={24} color={Colors.dark.success} />
                      )}
                      {showWrong && (
                        <XCircle size={24} color={Colors.dark.danger} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {showResult && selectedOption !== null && (
              <Animated.View
                style={[
                  styles.explanationCard,
                  {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <LinearGradient
                  colors={
                    scenario.options[selectedOption].isScam
                      ? Gradients.danger
                      : Gradients.success
                  }
                  style={styles.explanationGradient}
                >
                  {scenario.options[selectedOption].isScam ? (
                    <XCircle size={32} color="#FFFFFF" />
                  ) : (
                    <CheckCircle size={32} color="#FFFFFF" />
                  )}
                  <View style={styles.explanationText}>
                    <Text style={styles.explanationTitle}>
                      {scenario.options[selectedOption].isScam ? 'Wrong!' : 'Correct!'}
                    </Text>
                    <Text style={styles.explanationDescription}>
                      {scenario.options[selectedOption].explanation}
                    </Text>
                  </View>
                </LinearGradient>
              </Animated.View>
            )}

            {showResult && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <LinearGradient colors={Gradients.primary} style={styles.nextGradient}>
                  <Text style={styles.nextButtonText}>
                    {lives === 0
                      ? 'Game Over'
                      : currentScenario < scenarios.length - 1
                      ? 'Next Challenge'
                      : 'Complete'}
                  </Text>
                  <Sword size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            )}
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
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  headerStats: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statText: {
    fontSize: 16,
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
  scenarioCard: {
    gap: 20,
  },
  scenarioHeader: {
    flexDirection: 'row' as const,
    gap: 16,
    alignItems: 'flex-start' as const,
  },
  scenarioIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.danger + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  scenarioHeaderText: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  scenarioDescription: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
  messageCard: {
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  messageGradient: {
    padding: 20,
  },
  messageIcon: {
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.dark.cardBorder,
    overflow: 'hidden' as const,
  },
  optionCardSelected: {
    borderColor: Colors.dark.primary,
  },
  optionCardCorrect: {
    borderColor: Colors.dark.success,
    backgroundColor: Colors.dark.success + '20',
  },
  optionCardWrong: {
    borderColor: Colors.dark.danger,
    backgroundColor: Colors.dark.danger + '20',
  },
  optionContent: {
    padding: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  optionTextBold: {
    fontWeight: '600' as const,
  },
  explanationCard: {
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  explanationGradient: {
    padding: 20,
    flexDirection: 'row' as const,
    gap: 16,
  },
  explanationText: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  explanationDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    opacity: 0.95,
  },
  nextButton: {
    marginTop: 8,
  },
  nextGradient: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
});
