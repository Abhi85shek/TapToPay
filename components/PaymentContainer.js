// components/Home.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Payments from './Payments';
import TapToPay from './TapToPay';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';

export default function PaymentContainer() {
  const [selectedPaymentIntent, setSelectedPaymentIntent] = useState(null);
  const [connectionToken, setConnectionToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);

  useEffect(() => {
    const fetchConnectionToken = async () => {
      try {
        const res = await fetch('https://your-backend.com/terminal/connection_token', {
          method: 'POST'
        });
        const data = await res.json();
        setConnectionToken(data.secret);
      } catch (error) {
        console.error('Error fetching connection token:', error);
      } finally {
        setLoadingToken(false);
      }
    };

    fetchConnectionToken();
  }, []);

  if (loadingToken) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <StripeTerminalProvider
      fetchConnectionToken={() => Promise.resolve(connectionToken)}
    >
      <View style={{ flex: 1 }}>
        {selectedPaymentIntent ? (
          <TapToPay paymentIntent={selectedPaymentIntent} goBack={() => setSelectedPaymentIntent(null)} />
        ) : (
          <Payments onSelectPaymentIntent={setSelectedPaymentIntent} />
        )}
      </View>
    </StripeTerminalProvider>
  );
}
