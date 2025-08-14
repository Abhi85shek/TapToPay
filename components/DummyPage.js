import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DummyPage = () => {
  const [inputText, setInputText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dummyData = [
    { id: 1, title: 'Sample Item 1', description: 'This is a sample description for item 1', price: '$10.99' },
    { id: 2, title: 'Sample Item 2', description: 'This is a sample description for item 2', price: '$15.50' },
    { id: 3, title: 'Sample Item 3', description: 'This is a sample description for item 3', price: '$8.75' },
    { id: 4, title: 'Sample Item 4', description: 'This is a sample description for item 4', price: '$22.00' },
    { id: 5, title: 'Sample Item 5', description: 'This is a sample description for item 5', price: '$12.25' },
  ];

  const handleItemPress = (item) => {
    setSelectedItem(item);
    Alert.alert('Item Selected', `You selected: ${item.title}`);
  };

  const handleButtonPress = () => {
    Alert.alert('Button Pressed', 'This is a dummy button action!');
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      Alert.alert('Form Submitted', `You entered: ${inputText}`);
      setInputText('');
    } else {
      Alert.alert('Error', 'Please enter some text');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="dashboard" size={32} color="#3B82F6" />
        <Text style={styles.headerTitle}>Dummy Page</Text>
        <Text style={styles.headerSubtitle}>This is a sample page for testing</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Elements</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Text Input:</Text>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter some text here..."
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Toggle Switch:</Text>
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
            thumbColor={isEnabled ? '#3B82F6' : '#F3F4F6'}
            onValueChange={setIsEnabled}
            value={isEnabled}
          />
          <Text style={styles.switchLabel}>{isEnabled ? 'Enabled' : 'Disabled'}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleButtonPress}>
          <Icon name="touch-app" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Press Me!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Data List</Text>
        {dummyData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.itemCard,
              selectedItem?.id === item.id && styles.selectedItem
            ]}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <View style={styles.itemFooter}>
              <Icon name="info" size={16} color="#6B7280" />
              <Text style={styles.itemFooterText}>Tap to select</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="trending-up" size={24} color="#10B981" />
            <Text style={styles.statNumber}>1,234</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="people" size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>567</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>This is a dummy page for demonstration purposes</Text>
        <Text style={styles.footerSubtext}>TapToPay App - Dummy Content</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  actionButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemFooterText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default DummyPage;
