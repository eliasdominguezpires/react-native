import React, { useContext, useEffect } from 'react'
import { Text, View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { WhiteLogo } from '../../components/WhiteLogo';

import { loginStyles } from '../../themes/loginTheme';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/auth/AuthContexts';

interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({ navigation }: Props) => {

   const { signUp, errorMessage, removeError } = useContext(AuthContext)

   const { email, password, name, onChange } = useForm({
      name: '',
      email: '',
      password: '',
   });

   useEffect(() => {
      if (errorMessage.length === 0) return;

      Alert.alert('Registro Incorrecto', errorMessage,
         [{
            text: 'Ok',
            onPress: removeError
         }]
      )
   }, [errorMessage])

   const onRegister = () => {
      console.log({ email, password, name });
      Keyboard.dismiss();
      signUp({
         nombre: name,
         correo: email,
         password
      });
   }

   return (

      <KeyboardAvoidingView
         style={{ flex: 1, backgroundColor: "#5856D6" }}
         behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
         <View style={loginStyles.formContainer}>
            {/* Keyboad avoid view */}

            <WhiteLogo />

            <Text style={loginStyles.title}>Create Account</Text>

            <Text style={loginStyles.label}>Nombre</Text>
            <TextInput
               placeholder="Name"
               placeholderTextColor="rgba(255,255,255,0.4)"
               underlineColorAndroid="white"
               style={[
                  loginStyles.inputField,
                  (Platform.OS == 'ios') && loginStyles.inputFieldIOS
               ]}
               selectionColor="grey"

               onChangeText={(value) => onChange(value, 'name')}
               value={name}
               onSubmitEditing={onRegister}

               autoCapitalize="words"
               autoCorrect={false}
            />

            <Text style={loginStyles.label}>Correo</Text>

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
               onSubmitEditing={onRegister}

               autoCapitalize="none"
               autoCorrect={false}
            />

            <Text style={loginStyles.label}>Contraseña</Text>
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
               onSubmitEditing={onRegister}

            />

            <View style={loginStyles.bottonContainer}>
               <TouchableOpacity
                  activeOpacity={0.7}
                  style={loginStyles.botton}
                  onPress={onRegister}
               >
                  <Text style={loginStyles.buttonText}>Create Account</Text>
               </TouchableOpacity>
            </View>

            <TouchableOpacity
               activeOpacity={0.7}
               onPress={() => navigation.replace('LoginScreen')}
               style={loginStyles.buttonReturn}
            >
               <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

         </View>
      </KeyboardAvoidingView>

   )
}