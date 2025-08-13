import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const PaymentSuccessful = ({ navigation }) => {
  const transactionData = {
    amount: '$45.00',
    merchant: 'Local Coffee Shop',
    date: 'October 26, 2023',
    time: '3:30 PM',
    transactionId: 'TXN-9876543210',
  };

  const handleMakeAnotherPayment = () => {
    // Navigate to payment screen
    navigation.navigate('Payment');
  };

  const handleReturnToHome = () => {
    // Navigate to home screen
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      


      {/* Navigation Header */}
      {/* <View style={styles.navigationHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Successful</Text>
        <View style={styles.headerSpacer} />
      </View> */}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Main Content Card */}
        <View style={styles.mainCard}>
          {/* Success Icon and Message */}
          <View style={styles.successSection}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successSubtitle}>
              Your transaction was processed successfully.
            </Text>
          </View>

          {/* Transaction Details */}
          <View style={styles.transactionSection}>
            <Text style={styles.sectionTitle}>Transaction Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>{transactionData.amount}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Merchant</Text>
              <Text style={styles.detailValue}>{transactionData.merchant}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{transactionData.date}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{transactionData.time}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text style={styles.detailValue}>{transactionData.transactionId}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleMakeAnotherPayment}
          >
            <Text style={styles.primaryButtonText}>Make Another Payment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleReturnToHome}
          >
            <Text style={styles.secondaryButtonText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Status Bar
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
  },
  statusBarTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 12,
  },
  signalBar1: {
    width: 3,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  signalBar2: {
    width: 3,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  signalBar3: {
    width: 3,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  signalBar4: {
    width: 3,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  wifiIcon: {
    width: 16,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 2,
    padding: 1,
  },
  batteryLevel: {
    width: 18,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 1,
  },

  // Navigation Header
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Main Card
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Success Section
  successSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Transaction Section
  transactionSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },

  // Button Container
  buttonContainer: {
    marginTop: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
});

export default PaymentSuccessful;
