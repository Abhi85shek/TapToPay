import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';

// Mock data for recent payments - replace with actual API calls
const mockRecentPayments = [
  {
    id: '1',
    amount: 2500, // in cents
    currency: 'USD',
    status: 'completed',
    merchant: 'Coffee Shop',
    date: '2024-01-15T10:30:00Z',
    paymentMethod: 'card',
    last4: '4242',
  },
  {
    id: '2',
    amount: 1500,
    currency: 'USD',
    status: 'completed',
    merchant: 'Grocery Store',
    date: '2024-01-14T16:45:00Z',
    paymentMethod: 'card',
    last4: '4242',
  },
  {
    id: '3',
    amount: 5000,
    currency: 'USD',
    status: 'failed',
    merchant: 'Restaurant',
    date: '2024-01-13T19:20:00Z',
    paymentMethod: 'card',
    last4: '4242',
  },
  {
    id: '4',
    amount: 1200,
    currency: 'USD',
    status: 'completed',
    merchant: 'Gas Station',
    date: '2024-01-12T08:15:00Z',
    paymentMethod: 'card',
    last4: '4242',
  },
  {
    id: '5',
    amount: 3500,
    currency: 'USD',
    status: 'completed',
    merchant: 'Pharmacy',
    date: '2024-01-11T14:30:00Z',
    paymentMethod: 'card',
    last4: '4242',
  },
];

export default function RecentPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRecentPayments();
  }, []);

  const loadRecentPayments = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPayments(mockRecentPayments);
    } catch (error) {
      console.error('Error loading recent payments:', error);
      Alert.alert('Error', 'Failed to load recent payments');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecentPayments();
    setRefreshing(false);
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'failed':
        return '#F44336';
      case 'pending':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentItem}
      onPress={() => {
        Alert.alert(
          'Payment Details',
          `Amount: ${formatAmount(item.amount, item.currency)}\nMerchant: ${item.merchant}\nDate: ${formatDate(item.date)}\nStatus: ${getStatusText(item.status)}`
        );
      }}
    >
      <View style={styles.paymentHeader}>
        <Text style={styles.merchantName}>{item.merchant}</Text>
        <Text style={styles.amount}>{formatAmount(item.amount, item.currency)}</Text>
      </View>
      
      <View style={styles.paymentDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        
        <View style={styles.cardInfo}>
          <Text style={styles.cardText}>•••• {item.last4}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No recent payments found</Text>
      <Text style={styles.emptyStateSubtext}>Your payment history will appear here</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading recent payments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Payments</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={refreshing}
        >
          <Text style={styles.refreshButtonText}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={payments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  paymentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  paymentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#666666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});
