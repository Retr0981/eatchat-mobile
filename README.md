# 📱 EatChat Mobile App — Build It From Scratch (Beginner Guide)

> **Who this is for:** Someone who has never built a mobile app before. This guide explains everything in plain English — what each tool does, why we use it, and how every piece fits together. You'll understand how to build this app yourself from zero.

---

## 📖 Table of Contents

1. [What Are We Building?](#1-what-are-we-building)
2. [Big Picture: How Mobile Apps Work](#2-big-picture-how-mobile-apps-work)
3. [Tools You Need to Install](#3-tools-you-need-to-install)
4. [Creating the Project from Scratch](#4-creating-the-project-from-scratch)
5. [Understanding the Folder Structure](#5-understanding-the-folder-structure)
6. [Core Concepts You Need to Know](#6-core-concepts-you-need-to-know)
7. [Building the App Step-by-Step](#7-building-the-app-step-by-step)
8. [Running and Viewing Your App](#8-running-and-viewing-your-app)
9. [How to Edit and Customize](#9-how-to-edit-and-customize)
10. [Connecting a Real Backend (Supabase)](#10-connecting-a-real-backend-supabase)
11. [Publishing to the App Store](#11-publishing-to-the-app-store)
12. [Glossary of Terms](#12-glossary-of-terms)

---

## 1. What Are We Building?

EatChat is a social food app where:
- You post what you're craving ("I want ramen!")
- The app matches you with someone nearby who wants the same thing
- You chat with them, pick a restaurant, and eat together!

This repository is the **mobile app** — the actual iOS/Android app people download on their phones.

The app has these screens:
- 🔐 **Welcome / Login / Signup** — Onboarding flow
- 🍽️ **Feed** — See nearby cravings on a map or list
- ➕ **Post Craving** — Share what you want to eat
- 🎯 **Matches** — People you've matched with
- 💬 **Chat** — Message your matches
- 👤 **Profile** — Your profile and settings

---

## 2. Big Picture: How Mobile Apps Work

A 60-second explanation:

```
You write React Native code (looks like HTML/CSS but for mobile)
        ↓
Expo packages your code into an iOS and Android app
        ↓
The app runs on a real phone (or simulator)
        ↓
The app talks to a "backend" (database) to save and load data
```

### The three layers:

1. **Frontend (this app)** — What the user sees and taps. Built with React Native.
2. **Backend (Supabase)** — The server and database. Stores users, cravings, messages.
3. **The phone** — Runs the app. iOS (iPhone) or Android.

**React Native** lets you write code ONCE and it works on both iPhone and Android. No need to learn two different languages! The code looks like web code (HTML/CSS/JS), but it renders native phone UI.

**Expo** is a set of tools that makes React Native much easier. Without Expo, you'd need to configure Xcode, Android Studio, native modules... it's a nightmare. Expo handles all that for you so you can focus on writing your app.

---

## 3. Tools You Need to Install

### Step 1: Install Node.js

(Same as the website — Node lets your computer run JavaScript.)

1. Go to **https://nodejs.org**
2. Download the **LTS version**
3. Install it
4. Verify: type `node --version` in your terminal → should show `v20.x.x`

### Step 2: Install VS Code

1. Go to **https://code.visualstudio.com**
2. Download and install
3. Open it

### Step 3: Install the Expo Go app on your phone

This is the magic trick — you can run your app on your REAL phone without any setup!

- **iPhone:** Download "Expo Go" from the App Store
- **Android:** Download "Expo Go" from Google Play

### Step 4: Optional — Install simulators

If you want to test on your computer instead of your phone:

- **Mac only:** Install Xcode from the Mac App Store (for iOS Simulator)
- **Any computer:** Install Android Studio (for Android Emulator)

> 💡 **Beginner tip:** Start with Expo Go on your phone. It's the easiest way!

### Step 5: Verify

```bash
node --version     # v20.x.x
npm --version      # 10.x.x
```

---

## 4. Creating the Project from Scratch

### Option A: Use the existing code

If you have this folder, skip to [Section 8](#8-running-and-viewing-your-app).

### Option B: Create from scratch (for learning)

```bash
# Go to where you want the project
cd ~/Desktop

# Create a new Expo project
npx create-expo-app@latest eatchat-mobile

# Answer: choose the "blank" template

# Go into the folder
cd eatchat-mobile

# Install the extra libraries we need
npx expo install expo-router expo-linking expo-constants expo-status-bar react-native-safe-area-context react-native-screens react-native-maps

# Install state management and backend
npm install zustand @supabase/supabase-js

# Start the dev server
npm start
```

Now you can scan the QR code with the Expo Go app on your phone to see it running!

---

## 5. Understanding the Folder Structure

```
eatchat-mobile/
│
├── app/                          ← ALL screens (Expo Router uses folders for navigation)
│   ├── _layout.tsx               ← Root layout — wraps the entire app
│   │
│   ├── auth/                     ← Login/signup screens
│   │   ├── _layout.tsx           ← Stack navigator for auth screens
│   │   ├── index.tsx             ← Welcome screen (first thing you see)
│   │   ├── login.tsx             ← Login form
│   │   ├── signup.tsx            ← Registration form
│   │   ├── verify-phone.tsx      ← Phone OTP verification
│   │   └── complete-profile.tsx  ← Profile setup (avatar, food prefs)
│   │
│   ├── (tabs)/                   ← Main app screens with bottom tab bar
│   │   ├── _layout.tsx           ← Tab bar configuration
│   │   ├── index.tsx             ← Feed (home) — see nearby cravings
│   │   ├── craving.tsx           ← Post a new craving
│   │   ├── matches.tsx           ← Your matches
│   │   ├── chat.tsx              ← Chat list
│   │   └── profile.tsx           ← Profile + settings
│   │
│   ├── chat/[id].tsx             ← Individual chat conversation
│   └── craving/[id].tsx          ← Craving detail page
│
├── stores/                       ← State management (Zustand)
│   ├── authStore.ts              ← Tracks if user is logged in
│   ├── cravingStore.ts           ← Stores the cravings list
│   ├── matchStore.ts             ← Stores matches
│   └── chatStore.ts              ← Stores conversations + messages
│
├── types/
│   └── index.ts                  ← TypeScript type definitions
│
├── lib/                          ← Helper code
│   ├── supabase.ts               ← Backend connection setup
│   └── mockData.ts               ← Fake data for demo mode
│
├── constants/
│   └── theme.ts                  ← Colors and spacing values
│
├── assets/                       ← App icon, splash screen images
├── app.json                      ← App configuration (name, icon, etc.)
├── package.json                  ← List of dependencies
└── tsconfig.json                 ← TypeScript settings
```

### The key concept: File-based navigation

Just like the website, Expo Router uses folders to decide what screen shows when. But it's even cooler:

| File | What happens |
|------|-------------|
| `app/auth/index.tsx` | Shows the welcome screen |
| `app/auth/login.tsx` | Shows at `/auth/login` |
| `app/(tabs)/index.tsx` | The first tab in the bottom bar |
| `app/(tabs)/craving.tsx` | The "Post" tab |
| `app/chat/[id].tsx` | A dynamic route — `[id]` is a variable |

The `(tabs)` folder name has parentheses — this means "group these screens under a tab bar, but don't show 'tabs' in the URL."

---

## 6. Core Concepts You Need to Know

Before we build, here are 4 concepts that power the whole app. Don't worry if they're fuzzy — you'll understand them as you see the code.

### Concept 1: Components

A component is a reusable piece of UI. Think of it like a Lego brick.

```tsx
// A simple component called "CravingCard"
function CravingCard({ food, description }) {
  return (
    <View style={styles.card}>
      <Text>{food}</Text>
      <Text>{description}</Text>
    </View>
  );
}

// Using it 3 times with different data
<CravingCard food="🍕" description="I want pizza!" />
<CravingCard food="🍣" description="Craving sushi" />
<CravingCard food="🌮" description="Taco time!" />
```

Instead of `<div>` and `<p>` (web HTML), React Native uses `<View>` and `<Text>`.

### Concept 2: Props

Props are inputs you pass to a component — like settings.

```tsx
// Component that takes props
function Button({ label, color }) {
  return (
    <TouchableOpacity style={{ backgroundColor: color }}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

// Passing different props
<Button label="Save" color="blue" />
<Button label="Delete" color="red" />
```

### Concept 3: State (useState)

State is memory — it lets a component remember things.

```tsx
function Counter() {
  const [count, setCount] = useState(0);  // Start at 0

  return (
    <TouchableOpacity onPress={() => setCount(count + 1)}>
      <Text>You clicked {count} times</Text>
    </TouchableOpacity>
  );
}
```

Every time you tap, `setCount` updates the number, and the screen instantly refreshes.

### Concept 4: Navigation

Moving between screens. With Expo Router, you do it like this:

```tsx
import { useRouter } from "expo-router";

function WelcomeScreen() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/auth/login")}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
  );
}
```

`router.push("/auth/login")` is like clicking a link on a website — it takes you to that screen.

---

## 7. Building the App Step-by-Step

### Step 7.1: Configure the app (app.json)

**File:** `app.json`

This is your app's ID card. It tells Expo:
- The app name ("EatChat")
- The icon
- The splash screen
- iOS and Android settings

```json
{
  "expo": {
    "name": "EatChat",
    "slug": "eatchat",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "scheme": "eatchat"   ← Needed for navigation
  }
}
```

### Step 7.2: Define your data types (types/index.ts)

**File:** `types/index.ts`

TypeScript lets us define the "shape" of our data. This prevents bugs — if you try to put a number where a string should be, TypeScript catches it before the app runs.

```tsx
export interface Craving {
  id: string;
  user_id: string;
  food_type: string;        // "pizza", "sushi", etc.
  description: string;
  location: LocationData;
  expires_at: string;
  is_active: boolean;
}
```

This says: "A Craving has an id (text), a description (text), etc."

We also define all the food categories with their emojis:

```tsx
export const FOOD_CATEGORY_CONFIG = {
  pizza: { emoji: "🍕", label: "Pizza" },
  sushi: { emoji: "🍣", label: "Sushi" },
  tacos: { emoji: "🌮", label: "Tacos" },
  // ... 13 categories total
};
```

### Step 7.3: Set up state management (stores/)

We use **Zustand** to manage data that multiple screens need to share. Think of it like a global clipboard that any screen can read from or write to.

**File:** `stores/authStore.ts`

```tsx
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,                    // Currently logged-in user
  isAuthenticated: false,        // Are they logged in?
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

We have 4 stores:
- `authStore` — Login state
- `cravingStore` — List of cravings
- `matchStore` — List of matches
- `chatStore` — Conversations and messages

**How to use a store in any screen:**

```tsx
const { user, logout } = useAuthStore();
// Now `user` and `logout` are available in this screen!
```

### Step 7.4: Set up demo data (lib/mockData.ts)

**File:** `lib/mockData.ts`

Here's a brilliant trick: **the app works without a backend!** We created fake "mock" data — sample users, cravings, and messages. This lets you explore the entire app immediately, before connecting a real database.

```tsx
export const mockCravings = [
  {
    id: "craving-1",
    user: { name: "Sarah M.", ... },
    food_type: "ramen",
    description: "Craving some tonkotsu ramen after work!",
    ...
  },
  // ... more fake cravings
];
```

When you're ready, you replace this with real data from Supabase (see Section 10).

### Step 7.5: Set up Supabase connection (lib/supabase.ts)

**File:** `lib/supabase.ts`

This file connects to your backend. But it's smart — if you haven't set up Supabase yet, it returns `null` and the app uses mock data instead.

```tsx
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const supabase = supabaseUrl ? createClient(...) : null;
export const isSupabaseConfigured = !!supabaseUrl;
```

### Step 7.6: Build the root layout (app/_layout.tsx)

**File:** `app/_layout.tsx`

This wraps the entire app. It sets up:
- The SafeAreaView (so content doesn't go under the notch/camera)
- The StatusBar (time, battery at top)
- The Stack navigator (for moving between screens)

### Step 7.7: Build the auth screens

**Folder:** `app/auth/`

These are the screens users see before logging in:

1. **`index.tsx`** (Welcome) — Big logo, tagline, "Get Started" button
2. **`login.tsx`** — Email/password fields + Google/Apple buttons
3. **`signup.tsx`** — Name, email, phone, password fields
4. **`verify-phone.tsx`** — 6-digit OTP input (auto-advances as you type)
5. **`complete-profile.tsx`** — Pick avatar, write bio, select food preferences

**Example — the OTP input auto-advance:**

When you type a digit in box 1, it automatically moves focus to box 2. This is done with refs:

```tsx
const inputRefs = useRef([]);

const handleCodeChange = (text, index) => {
  // ... update the code
  if (text && index < 5) {
    inputRefs.current[index + 1]?.focus();  // Jump to next box
  }
};
```

### Step 7.8: Build the tab bar (app/(tabs)/_layout.tsx)

**File:** `app/(tabs)/_layout.tsx`

This creates the bottom tab bar with 5 tabs. Each tab has an emoji icon and label:

```tsx
<Tabs.Screen
  name="index"
  options={{
    title: "Feed",
    tabBarIcon: () => <Text>🍽️</Text>,
  }}
/>
```

### Step 7.9: Build the Feed screen

**File:** `app/(tabs)/index.tsx`

The home screen shows nearby cravings. Features:
- **Map/List toggle** — Switch between map view and list view
- **Category filter** — Horizontal scroll of food types (All, Pizza, Sushi, etc.)
- **Craving cards** — Each shows user avatar, food emoji, description, time left

The map view is a placeholder (ready for react-native-maps integration). The list view shows `FlatList` — a performant way to render long lists:

```tsx
<FlatList
  data={cravings}
  renderItem={({ item }) => <CravingCard craving={item} />}
  keyExtractor={(item) => item.id}
/>
```

### Step 7.10: Build the Post Craving screen

**File:** `app/(tabs)/craving.tsx`

Where users post what they want to eat:
- **13 food categories** in a grid (tap to select)
- **Description** text field
- **Location** card (uses current location)
- **Expiry** picker (1 hour, 4 hours, 24 hours)
- **Photo upload** button

When you tap "Post Craving," it validates the inputs and shows a success message.

### Step 7.11: Build the Matches screen

**File:** `app/(tabs)/matches.tsx`

Shows people you've matched with. Features:
- **Filter tabs** — All / Accepted / Pending
- **Match cards** — User avatar, name, bio, shared craving, status badge
- **Empty state** — Friendly message if no matches yet

### Step 7.12: Build the Chat list and Chat room

**Files:** `app/(tabs)/chat.tsx` and `app/chat/[id].tsx`

The chat list shows all your conversations. Tapping one opens the chat room.

The **chat room** is where it gets fun:
- Message bubbles (orange for you, gray for them)
- Text input at the bottom
- **Auto-reply simulation** — When you send a message, the app waits 1.5 seconds and generates a reply! This makes the demo feel real.

```tsx
const handleSend = () => {
  // Add your message
  addMessage({ content: inputText, sender_id: "user-1", ... });
  setInputText("");

  // Simulate a reply after 1.5 seconds
  setTimeout(() => {
    addMessage({ content: getAutoReply(inputText), sender_id: "other-user", ... });
  }, 1500);
};
```

### Step 7.13: Build the Profile screen

**File:** `app/(tabs)/profile.tsx`

Your profile with:
- Avatar, name, bio, location
- Stats (matches, meals shared, rating)
- Food preference chips
- Settings list (notifications, privacy, language, etc.)
- Logout button

### Step 7.14: Build the Craving Detail screen

**File:** `app/craving/[id].tsx`

When you tap a craving in the feed, you see full details:
- Big food emoji and type
- Poster's profile (avatar, name, bio)
- Full description
- Details grid (location, time left, category, expiry)
- "Match Me!" button and "Message Them" button

The `[id]` in the filename means it's a dynamic route — the URL is like `/craving/craving-1`. We read the ID like this:

```tsx
const { id } = useLocalSearchParams();
const craving = mockCravings.find((c) => c.id === id);
```

---

## 8. Running and Viewing Your App

### Step 1: Start the dev server

Open your terminal in VS Code and run:

```bash
cd eatchat-mobile
npm start
```

You'll see a QR code in the terminal.

### Step 2: Run it on your phone (easiest)

1. Open the **Expo Go** app on your phone
2. Scan the QR code with your phone camera (iPhone) or the Expo Go app (Android)
3. The app loads on your phone! 🎉

**Requirements:** Your phone and computer must be on the same WiFi.

### Step 3: Or run on a simulator

Press these keys in the terminal:

| Key | What it does |
|-----|-------------|
| `i` | Open iOS Simulator (Mac only) |
| `a` | Open Android Emulator |
| `w` | Open in web browser (limited) |

### The magic of hot reload

Just like the website, any change you make instantly appears on your phone! Try it:

1. Open `app/auth/index.tsx`
2. Change "EatChat" to "My Food App"
3. Save the file
4. Look at your phone — it updated instantly!

### To stop the server

Press **Ctrl + C** in the terminal.

---

## 9. How to Edit and Customize

### Change the app name and icon

Open `app.json`:

```json
{
  "expo": {
    "name": "My Food App",
    "icon": "./assets/my-icon.png"
  }
}
```

### Change the colors

Open `constants/theme.ts`:

```tsx
export const Colors = {
  primary: "#ff6b35",   // ← Change this to any hex color
};
```

### Change the food categories

Open `types/index.ts` and add to `FOOD_CATEGORY_CONFIG`:

```tsx
export const FOOD_CATEGORY_CONFIG = {
  pizza: { emoji: "🍕", label: "Pizza" },
  // Add your own:
  pasta: { emoji: "🍝", label: "Pasta" },
};
```

### Add a new screen

1. Create a file: `app/settings.tsx`
2. Add content:

```tsx
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings coming soon!</Text>
    </View>
  );
}
```

3. Navigate to it from anywhere:

```tsx
router.push("/settings");
```

---

## 10. Connecting a Real Backend (Supabase)

Right now the app uses fake "mock" data. To make it real (actual users, real cravings, live chat), you connect **Supabase** — a free backend service.

### What is Supabase?

Supabase is like having a database + login system + file storage, all hosted for you. It's an open-source alternative to Firebase.

### Step 1: Create a free account

1. Go to **https://supabase.com**
2. Sign up (free — no credit card needed)
3. Click "New Project"
4. Name it "EatChat"
5. Wait 2 minutes for it to set up

### Step 2: Get your API keys

1. In your Supabase dashboard, go to **Settings → API**
2. Copy two things:
   - **Project URL** (looks like `https://xyz.supabase.co`)
   - **Anon Key** (a long string of letters/numbers)

### Step 3: Add keys to your app

Create a file called `.env` in the `eatchat-mobile` folder:

```env
EXPO_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-long-key-here
```

### Step 4: Create the database tables

1. In Supabase, go to **SQL Editor**
2. Open the file `../docs/SUPABASE_SCHEMA.md` (in this project)
3. Copy all the SQL code
4. Paste it into Supabase SQL Editor
5. Click **Run**

This creates 5 tables: `profiles`, `cravings`, `matches`, `messages`, `reports`.

### Step 5: Replace mock data with real queries

The app is designed to make this easy. In any screen, replace:

```tsx
// OLD (mock data):
import { mockCravings } from "@/lib/mockData";
useEffect(() => { setCravings(mockCravings); }, []);

// NEW (real data from Supabase):
const { data } = await supabase
  .from("cravings")
  .select("*")
  .eq("is_active", true);
setCravings(data);
```

### Step 6: Enable real-time chat

Supabase can push new messages to your app instantly (no refreshing needed):

```tsx
supabase
  .channel("messages")
  .on("postgres_changes", { event: "INSERT", table: "messages" }, (payload) => {
    addMessage(payload.new);  // Instantly add the new message!
  })
  .subscribe();
```

Full instructions are in `../docs/SETUP_GUIDE.md`.

---

## 11. Publishing to the App Store

Once your app is ready, here's how to get it on the App Store and Google Play.

### Step 1: Build the app with EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo
eas login

# Configure the build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Step 2: Submit to stores

```bash
# Submit to App Store (requires Apple Developer account — $99/year)
eas submit --platform ios

# Submit to Google Play (requires Google Developer account — $25 once)
eas submit --platform android
```

### Costs:

| Store | Cost |
|-------|------|
| Apple App Store | $99/year (Apple Developer Program) |
| Google Play Store | $25 one-time fee |

---

## 12. Glossary of Terms

| Term | What it means |
|------|--------------|
| **React Native** | Write code once, runs on iOS AND Android |
| **Expo** | Tools that make React Native easier (no Xcode/Android Studio config) |
| **Expo Go** | App for your phone that runs your code during development |
| **Expo Router** | Navigation system based on folder structure |
| **Component** | Reusable piece of UI (like a Lego brick) |
| **Props** | Inputs passed to a component |
| **State** | Memory — lets a component remember things (`useState`) |
| **Hook** | A React function (`useState`, `useEffect`) that adds behavior |
| **Zustand** | Lightweight state management (shared memory across screens) |
| **Supabase** | Free backend service (database + auth + storage) |
| **Mock data** | Fake data used for development before connecting a real backend |
| **Backend** | Server + database that stores and serves data |
| **API** | How apps talk to servers (request data, get response) |
| **RLS** | Row Level Security — database rules for who can see what |
| **OTP** | One-Time Password (the 6-digit phone verification code) |
| **EAS** | Expo Application Services — builds and submits your app |
| **Simulator** | A fake phone that runs on your computer for testing |
| **Hot reload** | Instant updates when you save a file |

---

## 🎯 Quick Reference Cheat Sheet

```bash
# Install dependencies (first time)
npm install

# Start the dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

**Expo Go dev server keys (when server is running):**

| Key | Action |
|-----|--------|
| `r` | Reload the app |
| `i` | Open iOS simulator |
| `a` | Open Android emulator |
| `w` | Open web browser |
| `j` | Open debugger |
| `Ctrl+C` | Stop the server |

**Useful links:**
- Expo docs: https://docs.expo.dev
- React Native docs: https://reactnative.dev/docs
- Supabase docs: https://supabase.com/docs
- Free emojis: https://emojipedia.org

---

## ❓ Frequently Asked Questions

**Q: Do I need a Mac to build iOS apps?**
A: For development, no — Expo Go works on any phone. To publish to the App Store, yes, you need a Mac (or use EAS cloud builds which handles it for you).

**Q: How is this different from the website?**
A: The website (`eatchat-web`) is the marketing site. This (`eatchat-mobile`) is the actual phone app. Different codebases, same brand.

**Q: The app won't load on my phone**
A: Make sure your phone and computer are on the same WiFi. If still stuck, try the simulator instead (`i` for iOS).

**Q: Can I see real-time chat working?**
A: Yes! Open the chat screen and send a message — the app auto-replies after 1.5 seconds. This simulates the other person responding.

**Q: How do I add push notifications?**
A: Run `npx expo install expo-notifications` and follow the Expo docs. Full roadmap in `../docs/SETUP_GUIDE.md`.

**Q: My app shows "Demo Mode" — is that normal?**
A: Yes! The app runs with fake data until you connect Supabase. This is intentional so you can explore everything immediately.

---

## 🎉 You Did It!

You now understand how to build a complete social app from scratch — authentication, navigation, state management, chat, matching, and backend integration.

**Next steps to keep learning:**
1. Run the app and explore every screen
2. Try changing the colors and food categories
3. Create a free Supabase project and connect it
4. Add push notifications with `expo-notifications`
5. Build a real version with `eas build` and test on your phone

The same skills apply to building ANY mobile app — Instagram clones, todo apps, fitness trackers, anything!

**Happy coding!** 🚀📱🍔
