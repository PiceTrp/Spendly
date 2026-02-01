# Chat-to-Rich 🐱💰

A cross-platform mobile financial tracker that combines a **Chat Interface** with **Gamification** (virtual pet). The core UX relies on users "talking" to the app to record expenses, which then generates interactive transaction cards.

## Features

### 🗣️ **Chat Interface**
- Natural language expense tracking
- Interactive transaction cards within chat flow
- AI-powered expense parsing and categorization
- Quick prompt suggestions for easy expense logging

### 📊 **Financial Dashboard**  
- Real-time "Money Left to Spend" calculation
- Financial heartbeat pulse graph
- Monthly budget tracking
- Recent transaction history with smart grouping

### 🐱 **Virtual Pet Gamification**
- Cat avatar that reacts to your financial health
- **Rich Mode**: Cat wears sunglasses & gold chain when finances are good
- **Poor Mode**: Cat looks sad with begging bowl when overspending
- **Neutral Mode**: Happy and balanced cat

### 🏆 **Streak & Rewards System**
- Daily activity tracking
- 30-day streak calendar
- Unlockable themes and achievements
- Progress-based reward system

## Tech Stack

- **Framework**: React Native with Expo (Managed Workflow)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **State Management**: Zustand
- **Navigation**: Expo Router (File-based routing)
- **Local Storage**: AsyncStorage
- **Charts**: React Native Chart Kit

## Project Structure

```
/app                        # Expo Router screens
  /(tabs)                   # Tab navigation group
    /_layout.tsx           # Tab layout configuration
    /index.tsx             # HOME_CHAT screen
    /dashboard.tsx         # DASHBOARD_MAIN screen  
    /pet.tsx               # GAMIFICATION_PET screen
  /_layout.tsx             # Root layout

/src
  /components              # Reusable UI components
    /InteractiveTransactionCard.tsx  # Editable transaction form in chat
    /ChatBubble.tsx        # User/system message bubbles
    /CatAvatar.tsx         # Virtual pet component
    /LoadingBubble.tsx     # Chat loading animation
    /PulseGraph.tsx        # Financial heartbeat chart
  
  /store
    /useAppStore.ts        # Zustand global state management
  
  /types
    /index.ts              # TypeScript type definitions
  
  /utils
    /constants.ts          # Colors, categories, configurations
  
  /hooks
    /useMockAI.ts          # Mock AI service for chat responses
```

## Key Components

### **InteractiveTransactionCard**
The centerpiece component that appears within the chat interface. Features:
- Editable title and amount inputs
- Category selection modal
- Income/Expense toggle
- Confirm/Delete actions
- Locked state after confirmation

### **Chat Interface Logic**
- Parses natural language like "Bought Pad Thai $15"
- Generates appropriate transaction cards
- Maintains conversation flow
- Provides loading states and quick prompts

### **Financial Calculations**
- Money Left = Monthly Budget - Total Expenses
- Pet mood changes based on spending ratio
- Streak tracking with calendar visualization
- Progress-based achievements

## Design System

### **Color Palette**
- **Primary**: Emerald Green (`#10b981`) - Income/Wealth
- **Danger**: Rose Red (`#ec4899`) - Expenses/Over-budget
- **Accent**: Gold (`#f59e0b`) - Rich status highlights
- **Neutral**: Slate Gray (`#64748b`) - Text and backgrounds

### **Theme Philosophy**
Clean Fintech meets Playful Gamification with rounded corners, soft shadows, and highly responsive touch targets.

## Getting Started

### Prerequisites
- Node.js (LTS version)
- Expo CLI
- iOS Simulator or Android Emulator (for mobile testing)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd chat-to-rich
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on different platforms:**
   ```bash
   npm run web     # Web browser
   npm run ios     # iOS Simulator  
   npm run android # Android Emulator
   ```

### Key Scripts
- `npm start` - Start Expo development server
- `npm run web` - Launch web version
- `npm run ios` - Launch iOS simulator
- `npm run android` - Launch Android emulator

## App Flow

### **First Launch**
1. Welcome screen with cat avatar
2. Quick prompt suggestions
3. Onboarding guidance

### **Daily Usage**
1. User opens chat interface
2. Types expense like "Coffee $5"
3. AI generates transaction card
4. User confirms or edits details
5. Transaction saved to dashboard
6. Pet mood updates based on spending
7. Streak continues if daily activity maintained

### **Dashboard Review**
- View financial health at a glance
- Check spending trends with pulse graph
- Review recent transaction history

### **Pet Interaction**
- Check cat's current mood/status
- View streak calendar
- Track progress toward rewards
- Unlock new themes and achievements

## Mock Data & AI

The app includes a sophisticated mock AI service (`useMockAI.ts`) that:
- Parses natural language expense descriptions
- Extracts amounts, categories, and transaction types
- Provides realistic response delays
- Categorizes expenses automatically

## State Management

Uses Zustand for clean, simple state management:
- **User Stats**: Balance, budget, expenses, streak
- **Transactions**: Full transaction history with persistence
- **Chat History**: Message and transaction card history  
- **Pet Mood**: Dynamic mood based on financial health

Data persists locally using AsyncStorage for offline capability.

## Responsive Design

- **Keyboard Handling**: Chat input moves up correctly
- **Touch Targets**: Minimum 44px for accessibility
- **Cross-platform**: Works on iOS, Android, and web
- **Adaptive UI**: Responsive layouts for different screen sizes

## Future Enhancements

- Real voice-to-text integration
- Camera-based receipt scanning
- Push notifications for spending alerts
- Social features and spending challenges
- Bank account integration
- Export capabilities

## Contributing

This project demonstrates modern React Native development patterns:
- TypeScript for type safety
- Expo Router for navigation
- Zustand for state management  
- Component-driven architecture
- Mock AI integration patterns

Perfect for learning mobile development, financial app patterns, and gamification techniques.

## License

MIT License - Feel free to use this as a learning resource or starting point for your own financial tracking app!