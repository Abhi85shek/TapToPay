# OTP-Based Authentication Flow Implementation

## Overview
This app now implements a secure OTP-based authentication flow where users must verify their phone number before accessing the main application features.

## How it works

### 1. Initial State
- When the app starts, users see the **OTP Login Screen** first
- The app checks if the user is authenticated using the `AuthContext`

### 2. OTP Login Process
- **Step 1**: Users enter their phone number and tap "Send OTP"
- **Step 2**: A 6-digit OTP is sent to their phone number (simulated)
- **Step 3**: Users enter the 6-digit OTP and tap "Verify OTP"
- **Step 4**: Upon successful verification, the `isAuthenticated` state is set to `true`
- **Step 5**: The app automatically navigates to the main app interface

### 3. Main App Interface
After successful login, users can access:
- **TapToPay**: Main payment functionality
- **Recent Payments**: View payment history
- **Payment Success**: Success page
- **Logout**: Button in the header to sign out

### 4. Logout
- Users can logout using the red "Logout" button in the header
- This resets the authentication state
- Users are automatically redirected back to the Login Screen

## Components Structure

### AuthContext (`components/AuthContext.js`)
- Manages authentication state globally
- Provides `sendOTP()`, `verifyOTP()`, and `logout()` functions
- Tracks `isAuthenticated` and `user` data
- Simulates OTP generation and verification

### LoginScreen (`components/LoginScreen.js`)
- Handles OTP-based authentication with phone number
- Uses the `useAuth()` hook to access OTP functions
- Shows loading state during OTP sending and verification
- Includes countdown timer for OTP resend functionality

### MainApp (`components/MainApp.js`)
- Contains all authenticated screens in a tab navigator
- Includes logout functionality
- Only accessible when `isAuthenticated` is `true`

### App.tsx
- Wraps the entire app with `AuthProvider`
- Conditionally renders `LoginScreen` or `MainApp` based on authentication state

## Usage

1. **Start the app** - You'll see the OTP login screen
2. **Enter your phone number** - Any valid phone number (10-15 digits)
3. **Tap "Send OTP"** - A 6-digit OTP will be generated (check console for testing)
4. **Enter the 6-digit OTP** - Use the OTP shown in the console
5. **Tap "Verify OTP"** - You'll be automatically taken to the main app
6. **Navigate between tabs** - Use the bottom tab navigation
7. **Logout** - Tap the red "Logout" button in the header to return to login

## OTP Features
- **60-second countdown** for resending OTP
- **Phone number validation** (10-15 digits)
- **OTP validation** (6 digits only)
- **Resend functionality** after countdown expires
- **Change phone number** option during OTP entry

## Future Enhancements
- Add real SMS integration for OTP delivery
- Implement persistent login (remember user session)
- Add phone number verification with country codes
- Implement rate limiting for OTP requests
- Add biometric authentication options
- Add backup email verification
