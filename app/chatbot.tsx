import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send, Bot, User } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! I\'m your Scamurai AI assistant. I can help you identify potential scams and answer questions about fraud protection. What would you like to know?',
    isBot: true,
    timestamp: new Date(),
  },
];

export default function ChatbotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('phishing') || input.includes('email')) {
      return 'Phishing is a common scam where attackers impersonate legitimate organizations to steal your information. Always verify the sender\'s email address, never click suspicious links, and contact companies directly through official channels if you receive unexpected requests.';
    } else if (input.includes('bank') || input.includes('payment')) {
      return 'Banks will NEVER ask you to verify your account via text or email links. If you receive such messages, don\'t click any links. Instead, call your bank directly using the number on their official website or your bank card.';
    } else if (input.includes('lottery') || input.includes('prize')) {
      return 'Remember: if you didn\'t enter a lottery, you can\'t win it! Legitimate lotteries never ask for upfront fees. These "advance-fee scams" are designed to steal your money. Delete such emails and report them as spam.';
    } else if (input.includes('romance') || input.includes('love')) {
      return 'Romance scams are heartbreaking. Scammers build emotional connections then create urgent situations requiring money. NEVER send money to someone you haven\'t met in person. Always insist on video calls to verify identity.';
    } else if (input.includes('help') || input.includes('what')) {
      return 'I can help you with:\n• Identifying phishing attempts\n• Understanding different types of scams\n• Learning protective measures\n• Reporting fraud\n\nWhat specific topic would you like to explore?';
    } else {
      return 'That\'s a great question! While I don\'t have specific information about that, here are some general tips: Never share personal information online, verify sender identities, use strong passwords, and trust your instincts. If something feels off, it probably is!';
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
          <View style={styles.headerContent}>
            <View style={styles.botAvatar}>
              <Bot size={24} color={Colors.dark.success} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Fraud Detective AI</Text>
              <Text style={styles.headerSubtitle}>Always here to help</Text>
            </View>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.isBot ? styles.messageWrapperBot : styles.messageWrapperUser,
                ]}
              >
                {message.isBot && (
                  <View style={styles.messageAvatar}>
                    <Bot size={20} color={Colors.dark.success} />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isBot ? styles.messageBubbleBot : styles.messageBubbleUser,
                  ]}
                >
                  {message.isBot ? (
                    <View style={styles.botBubbleContent}>
                      <Text style={styles.messageTextBot}>{message.text}</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={Gradients.primary}
                      style={styles.userBubbleContent}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.messageTextUser}>{message.text}</Text>
                    </LinearGradient>
                  )}
                </View>
                {!message.isBot && (
                  <View style={styles.messageAvatarUser}>
                    <User size={20} color={Colors.dark.text} />
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask about scams..."
                placeholderTextColor={Colors.dark.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  inputText.trim() === '' && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={inputText.trim() === ''}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={inputText.trim() !== '' ? Gradients.success : ['#333', '#333']}
                  style={styles.sendButtonGradient}
                >
                  <Send size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  headerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.success + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.dark.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    flexDirection: 'row' as const,
    marginBottom: 16,
    gap: 8,
  },
  messageWrapperBot: {
    justifyContent: 'flex-start' as const,
  },
  messageWrapperUser: {
    justifyContent: 'flex-end' as const,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.success + '20',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginTop: 4,
  },
  messageAvatarUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  messageBubbleBot: {
    backgroundColor: Colors.dark.card,
  },
  messageBubbleUser: {
    backgroundColor: 'transparent' as const,
  },
  botBubbleContent: {
    padding: 12,
  },
  userBubbleContent: {
    padding: 12,
  },
  messageTextBot: {
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  messageTextUser: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.cardBorder,
  },
  inputWrapper: {
    flexDirection: 'row' as const,
    gap: 12,
    alignItems: 'flex-end' as const,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark.text,
    maxHeight: 120,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden' as const,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});
