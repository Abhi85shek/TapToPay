import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecentPayment from './RecentPayment';
import PaymentSuccessfull from './PaymentSuccessfull';
// import TapToPay from './TapToPay';
import DummyPage from './DummyPage';
import { useAuth } from './AuthContext';
import LoginScreen from './LoginScreen';
  
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const { logout, isAuthenticated } = useAuth();

  if(!isAuthenticated)
  {
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* <Tab.Screen 
        // name="TapToPay"
        name="DummyPage"
        component={DummyPage}
        options={{
          title: 'TapToPay',
          tabBarIcon: ({ color, size }) => (
            <Icon name="payment" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen 
        name="RecentPayment" 
        component={RecentPayment}
        options={{
          title: 'Recent Payments',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="PaymentSuccessfull" 
        component={PaymentSuccessfull}
        options={{
          title: 'Payment Success',
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="DummyPage" 
        component={DummyPage}
        options={{
          title: 'Dummy Page',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MainApp;
