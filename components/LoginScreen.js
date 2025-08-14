import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { DOMAIN_URL } from '../config/config';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';  
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [uid, setUid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { login } = useAuth();
  const otpInputRef = useRef(null);
  const navigation = useNavigation();
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getOtp = async () => {
    if (email && email.includes('@') && email.includes('.')) {
      setIsLoading(true);
      const reqUrl = DOMAIN_URL + '/get_otp/login';
      console.log(reqUrl);
      try {
        const res = await axios.post(reqUrl, { email });
        console.log('OTP Response:', res.data);
        setUid(res.data.uid); 
        ToastAndroid.show('Auth Code sent to email', ToastAndroid.SHORT,ToastAndroid.TOP);
        setOtpSent(true);
        setOtp('');
        startCountdown();
      } catch (err) {
        setOtp('');
        Alert.alert(
          'Error',
          err.response?.data?.message || 'Something went wrong'
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setOtp('');
      Alert.alert('Error', 'Please enter a valid Email');
    }
  };
  async function verifyOtp() {
    if (otp && otp.length === 6) {
      const reqUrl = DOMAIN_URL + '/login';
      console.log("reqUrl",reqUrl);
      try {
        const res = await axios.post(reqUrl, { email, otp, uid });
        console.log("res",res);
        console.log(res.data);
        if(res.data.token)
        {
          ToastAndroid.show('Logged-In Successfully!', ToastAndroid.LONG);
          AsyncStorage.setItem('token', res.data.token);
          console.log(res.data.token);
          login();
          setOtp('');
          setOtpSent(false);
          setCountdown(0);
          setEmail('');
          setUid('');
        }
         
        
      } catch (err) {
        console.log(err);
        setOtp('');
        Alert.alert('Error', err || 'Login failed');
      }
      
    } else {
      setOtp('');
      Alert.alert('Error', 'Please enter a valid Auth Code');
    }
  }
  

  // const handleVerifyOTP = async () => {
  //   if (!otp) {
  //     Alert.alert('Error', 'Please enter the OTP');
  //     return;
  //   }

  //   if (otp.length !== 6) {
  //     Alert.alert('Error', 'Please enter a valid 6-digit OTP');
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     await verifyOTP(email, otp);
  //     // Navigation can happen here if verifyOTP is successful
  //   } catch (error) {
  //     Alert.alert('Error', 'Invalid OTP. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    await getOtp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>TapToPay</Text>
            <Text style={styles.subtitle}>
              {otpSent ? 'Enter OTP to continue' : 'Sign in with OTP'}
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {!otpSent ? (
              <>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Send OTP Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isLoading && styles.loginButtonDisabled,
                  ]}
                  onPress={getOtp}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Enter OTP</Text>
                  <TextInput
                    ref={otpInputRef}
                    style={styles.textInput}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#9CA3AF"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={6}
                  />
                </View>

                {/* Resend OTP Link */}
                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={handleResendOTP}
                  disabled={countdown > 0}
                >
                  <Text
                    style={[
                      styles.forgotPasswordText,
                      countdown > 0 && styles.disabledText,
                    ]}
                  >
                    {countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>

                {/* Verify OTP Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isLoading && styles.loginButtonDisabled,
                  ]}
                  onPress={verifyOtp}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Text>
                </TouchableOpacity>

                {/* Back to Email */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => {
                    setOtpSent(false);
                    setOtp('');
                    setCountdown(0);
                  }}
                >
                  <Text style={styles.backButtonText}>Change Email</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  formSection: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    fontWeight: '400',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: '#3B82F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});

export default LoginScreen;
