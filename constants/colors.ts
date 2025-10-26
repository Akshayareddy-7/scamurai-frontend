// colors.ts - KEEP AS IS
export const Colors = {
  dark: {
    background: '#0A0E27',
    backgroundSecondary: '#151938',
    primary: '#00D9FF',
    secondary: '#6C5CE7',
    accent: '#FFD700',
    danger: '#FF3B5C',
    success: '#00E096',
    text: '#FFFFFF',
    textSecondary: '#A0AEC0',
    card: '#1A1F3A',
    cardBorder: '#2D3357',
    overlay: 'rgba(10, 14, 39, 0.95)',
  }
} as const;

export const Gradients = {
  primary: ['#00D9FF', '#6C5CE7'],
  danger: ['#FF3B5C', '#FF6B9D'],
  success: ['#00E096', '#00D9FF'],
  gold: ['#FFD700', '#FFA500'],
  dark: ['#0A0E27', '#151938'],
  card: ['#1A1F3A', '#151938'],
} as const;
