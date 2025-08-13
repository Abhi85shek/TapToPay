# TapToPay

A React Native mobile application for payment processing with tab navigation.

## Features

- **Tab Navigation**: Bottom tab navigation with icons
- **Login Screen**: User authentication interface
- **Recent Payments**: View payment history
- **Payment Success**: Success confirmation screen
- **Dark/Light Mode**: Automatic theme switching

## Tab Navigation Setup

The app uses React Navigation with bottom tabs and includes:

### Icons Used:
- **Login Tab**: Person icon (filled/outline)
- **Recent Tab**: Time icon (filled/outline) 
- **Success Tab**: Checkmark circle icon (filled/outline)

### Navigation Structure:
```
Tab Navigator
├── LoginPage (LoginScreen)
├── RecentPayment (RecentPayment)
└── PaymentSuccessfull (PaymentSuccessfull)
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. For Android, the vector icons are automatically configured via the build.gradle file.

3. Run the app:
```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

## Dependencies

- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `react-native-vector-icons`
- `react-native-safe-area-context`
- `react-native-screens`

## Project Structure

```
TapToPay/
├── App.tsx                 # Main app with tab navigation
├── components/
│   ├── LoginScreen.js      # Login interface
│   ├── RecentPayment.js    # Payment history
│   ├── PaymentSuccessfull.js # Success screen
│   └── ...
└── ...
```

## Customization

To modify the tab navigation:

1. **Change Icons**: Update the `iconName` variables in `App.tsx`
2. **Add New Tabs**: Add new `Tab.Screen` components
3. **Styling**: Modify the `screenOptions` in the `Tab.Navigator`

## Available Icons

The app uses Ionicons from react-native-vector-icons. You can find all available icons at: https://ionic.io/ionicons
