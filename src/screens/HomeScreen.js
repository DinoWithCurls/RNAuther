import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Back to Login Screen"
          onPress={() => navigation.navigate('Authentication')}
        />
      </View>
    );
  }
export default HomeScreen;