import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
function EnterOTPScreen({route, navigation}) {
  const [internalVal, setInternalVal] = React.useState('');
  const defaultCountdown = 30;
  let clockCall = null;
  const [countdown, setCountdown] = React.useState(defaultCountdown);
  const [enableResend, setEnableResend] = React.useState(false);
  let phone = route.params.paramKey;
  console.log(phone);
  verifyOTP = async (phone, internalVal) => {
    number = phone.substring(1);
    axios
      .get(
        `https://df1490d365e4.ngrok.io/verify?phonenumber=${number}&code=${internalVal}`,
      )
      .then(res => res.data)
      .then(res => {
        if (res.valid) {
          navigation.navigate('Home');
        } else {
          Alert.alert("Wrong OTP Entered")
        }
      })
      .catch(err => console.log('Error', err));
  };
  
  const lengthInput = 6;
  let textInput = React.useRef(null);
  const onChangeText = val => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      verifyOTP(phone, val);
    }
  };
  React.useEffect(() => {
    textInput.focus();
  }, []);
  const onChangeNumber = () => {
    setInternalVal('');
    navigation.navigate('Authentication');
  };
  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock(0);
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>Input Your OTP Code sent via SMS</Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === internalVal.length ? '#FB6C6A' : '#234DB7',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.txtChange}>Change Number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.txtResend,
                  {color: enableResend ? '#234DB7' : 'gray'},
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
export default EnterOTPScreen;

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
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtResend: {
    alignItems: 'center',
    fontSize: 15,
  },
});
