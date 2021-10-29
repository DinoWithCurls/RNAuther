import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

function EnterEmailScreen({navigation}) {
  const [value, setValue] = React.useState('');
  const onPressContinue = () => {
    if (value) {
      navigation.navigate('EnterEmailOTP', {email:value});
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>Please enter your EMail</Text>
        <View style={styles.input}>
          <View>
          <TextInput
            style={{ height: 50, width: 300, borderColor: 'gray',}}
            onChangeText={text => setValue(text)}
            value={value}
	        placeholder="abc@email.com"
            placeholderTextColor='gray'
            />
          </View>
        </View>
        <View style={styles.submitButton}>
          <TouchableOpacity onPress={onPressContinue}>
            <View
              style={[
                styles.btnContinue,
                {backgroundColor: value ? '#244DB7' : 'gray'},
              ]}>
              <Text style={{color: '#ffffff', alignItems: 'center'}}>
                Send OTP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.btnChangeNumber}>
        <TouchableOpacity onPress={()=>navigation.navigate('Authentication')}>
          <Text style={styles.txtChange}>OR, SIGN IN WITH PHONE NUMBER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default EnterEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginBottom: 20,
    marginTop: 50,
    fontSize: 15,
  },
  input: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  submitButton: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnChangeNumber: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:70
  },
  
});
