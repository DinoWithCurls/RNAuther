import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import webClientID from '../../keys';
import axios from 'axios';
GoogleSignin.configure({
  webClientId:webClientID,
  offlineAccess: false,
});
function AuthenticationScreen({navigation}) {
  const [value, setValue] = React.useState('');
  const phoneInput = React.useRef(PhoneInput);
  const onPressContinue = () => {
    if (value) {
      sendOTP(value);
      navigation.navigate('EnterOTP',{paramKey: value});
    }
  };
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(() => navigation.navigate('Home'));
      console.log('Pressed');
    } catch (error) {
      console.log(error.message);
    }
  };
  sendOTP = async(phonenumber) => {
    var phone = phonenumber.substring(1);
    axios.get(`https://df1490d365e4.ngrok.io/login?phonenumber=${phone}&channel=sms`);
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>Please enter your mobile number</Text>
        <View style={styles.input}>
          <View>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              onChangeFormattedText={text => {
                setValue(text);
                console.log(value);
              }}
              withShadow
              autoFocus
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
      <View style={styles.btnChangeEmail}>
        <TouchableOpacity onPress={()=>navigation.navigate('EnterEmail')}>
          <Text style={styles.txtChange}>SIGN IN WITH EMAIL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.GoogleIconView}>
        <Text style={{fontSize: 15, marginBottom: 20}}>OR, SIGN IN WITH</Text>
        <View
          style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <GoogleSigninButton
            onPress={this.signIn}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Light}
            style={{flex: 1, height: '100%', width: '100%'}}
          />
        </View>
      </View>
    </View>
  );
}
export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  GoogleIconView: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
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
  btnChangeEmail: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
