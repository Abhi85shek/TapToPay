import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TapToPay from './components/TapToPay';
import PaymentContainer from './components/PaymentContainer';
import LoginScreen from './components/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentPayment from './components/RecentPayment';
import PaymentSuccessfull from './components/PaymentSuccessfull';

const Tab = createBottomTabNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
    <NavigationContainer> 
    <Tab.Navigator 
     screenOptions={{
      headerTitleAlign: 'center', 
    }}>
        <Tab.Screen name="LoginPage" component={LoginScreen} />
        <Tab.Screen name="RecentPayment" component={RecentPayment} />
        <Tab.Screen name="PaymentSuccessfull" component={PaymentSuccessfull} /> 
    </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
