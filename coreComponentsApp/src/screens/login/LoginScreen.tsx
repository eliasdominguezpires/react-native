import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { Background } from '../../components/Background';
import { WhiteLogo } from '../../components/WhiteLogo';

import { loginStyles } from '../../themes/loginTheme';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/auth/AuthContexts';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {

   const { signIn, errorMessage, removeError } = useContext(AuthContext);

   const { email, password, onChange } = useForm({
      email: '',
      password: ''
   });

   useEffect(() => {
      if (errorMessage.length === 0) return;

      Alert.alert('Login Incorrecto', errorMessage,
         [{
            text: 'Ok',
            onPress: removeError
         }]
      )
   }, [errorMessage])

   const onLogin = () => {
      //console.log({ email, password });
      Keyboard.dismiss();
      signIn({ correo: email, password });
   }

   return (
      <>
         {/* Background */}
         <Background />

         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
         >

            <View style={loginStyles.formContainer}>
               {/* Keyboad avoid view */}

               <WhiteLogo />

               <Text style={loginStyles.title}>Login</Text>

               <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="email-address"
                  underlineColorAndroid="white"
                  style={[
                     loginStyles.inputField,
                     (Platform.OS == 'ios') && loginStyles.inputFieldIOS
                  ]}
                  selectionColor="grey"

                  onChangeText={(value) => onChange(value, 'email')}
                  value={email}
                  onSubmitEditing={onLogin}

                  autoCapitalize="none"
                  autoCorrect={false}
               />

               <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  underlineColorAndroid="white"
                  secureTextEntry={true}
                  style={[
                     loginStyles.inputField,
                     (Platform.OS == 'ios') && loginStyles.inputFieldIOS
                  ]}
                  selectionColor="grey"

                  onChangeText={(value) => onChange(value, 'password')}
                  value={password}
                  onSubmitEditing={onLogin}

               />
               <View style={loginStyles.bottonContainer}>
                  <TouchableOpacity
                     activeOpacity={0.7}
                     style={loginStyles.botton}
                     onPress={onLogin}
                  >
                     <Text style={loginStyles.buttonText}>Login</Text>
                  </TouchableOpacity>
               </View>

               <View style={loginStyles.newUserContainer}>
                  <TouchableOpacity
                     activeOpacity={0.7}
                     onPress={() => navigation.replace('RegisterScreen')}
                  >
                     <Text style={loginStyles.buttonText}>Create Account</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </KeyboardAvoidingView>
      </>
   )
}