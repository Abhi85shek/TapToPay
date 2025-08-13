import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';

export default function TapToPay({ paymentIntent, goBack }) {
  const [loading, setLoading] = useState(true);
  const terminal = useStripeTerminal();

  useEffect(() => {
    const init = async () => {
      const initResult = await terminal.initialize({
        fetchConnectionToken: async () => '', // Not used here, already handled in provider
        onUnexpectedReaderDisconnect: () => {
          Alert.alert('Reader disconnected');
        },
      });

      if (initResult.error) {
        console.error('Init error:', initResult.error);
        Alert.alert('Error', initResult.error.message);
        return;
      }

      const discoverResult = await terminal.discoverReaders({
        simulated: false,
        discoveryMethod: 'internet',
      });

      if (discoverResult.error) {
        console.error('Discover error:', discoverResult.error);
        Alert.alert('Error', discoverResult.error.message);
        return;
      }

      const reader = discoverResult.discoveredReaders[0];
      if (!reader) {
        Alert.alert('No readers found');
        return;
      }

      const connectResult = await terminal.connectReader(reader);
      if (connectResult.error) {
        console.error('Connect error:', connectResult.error);
        Alert.alert('Error', connectResult.error.message);
        return;
      }

      setLoading(false);
    };

    init();
  }, []);

  const handlePayment = async () => {
    try {
      const collectResult = await terminal.collectPaymentMethod(paymentIntent.client_secret);
      if (collectResult.error) {
        Alert.alert('Error', collectResult.error.message);
        return;
      }

      const processResult = await terminal.processPayment(collectResult.paymentIntent.id);
      if (processResult.error) {
        Alert.alert('Error', processResult.error.message);
      } else {
        Alert.alert('Payment Successful', `ID: ${processResult.paymentIntent.id}`);
        goBack();
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Initializing terminal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ready to Tap</Text>
      <Text style={styles.info}>Amount: ${paymentIntent.amount / 100}</Text>
      <Button title="Start Tap to Pay" onPress={handlePayment} />
      <View style={{ marginTop: 20 }}>
        <Button title="Back to Payments" onPress={goBack} color="#666" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 24,
  },
});
