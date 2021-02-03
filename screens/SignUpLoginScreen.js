import * as React from "react";
import {TextInput, View, StyleSheet,Text,TouchableOpacity,Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId:"",
            password:"",
            isPasswordVisible:true,
            isModalPasswordVisible:true,
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
        }
    }

    showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {this.state.isModalPasswordVisible}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {this.state.isModalPasswordVisible}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity 
                    style = {styles.loginShowPassword}
                    onPress = {()=>{
                        this.setState({
                            isModalPasswordVisible:false
                        })
                    }}>
                        <Text style = {styles.passwordText}>Show Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.loginShowPassword}
                    onPress = {()=>{
                        this.setState({
                            isModalPasswordVisible:true
                        })
                    }}>
                        <Text style = {styles.passwordText}>Hide Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }

      userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address,
              password:this.state.password
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            return Alert.alert("User Login Successfully")
        })
        .catch(function(error){
            var errorCode = error.Code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View style = {styles.constainer}>
                {this.showModal()}
                <View>
                    <Text style = {styles.title}>Barter</Text>
                </View>
                <View>
                    <TextInput
                    style = {styles.login}
                    placeholder = "enter your emailId."
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                    />
                    <TextInput
                    style = {styles.login}
                    placeholder = "enter your password."
                    secureTextEntry = {this.state.isPasswordVisible}
                    onChangeText = {(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    />
                </View>
                <View>
                <TouchableOpacity 
                    style = {styles.loginShowPassword}
                    onPress = {()=>{
                        this.setState({
                            isPasswordVisible:false
                        })
                    }}>
                        <Text style = {styles.passwordText}>Show Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.loginShowPassword}
                    onPress = {()=>{
                        this.setState({
                            isPasswordVisible:true
                        })
                    }}>
                        <Text style = {styles.passwordText}>Hide Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {[styles.Buttonlogin,{marginBottom:50,marginTop:60}]}
                    onPress = {()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
                        <Text style = {styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.ButtonsignUp}
                    onPress = {()=>{
                        this.setState({isModalVisible:true})
                    }}>
                        <Text style = {styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    constainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'skyblue',
    },
    title:{
        textAlign:'center',
        fontSize:50,
        fontWeight:'200',
        marginTop:100,
        paddingBottom:90,
        color:'red',
    },
    login:{
        marginTop:10,
        width:350,
        height:50,
        borderBottomWidth:1.5,
        borderColor:"yellow",
        fontSize:22,
        alignSelf:"center",
        color:"black",
        paddingLeft:10,
        paddingRight:10,
    },
    loginShowPassword:{
        width:150,
        height:40,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"lightgreen",
        marginTop:10,
    },
    passwordText:{
        color:'red',
        fontWeight:'100',
        fontSize:15,
    },
    Buttonlogin:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"orange",
        shadowColor: "black",
        alignSelf:"center",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10,
    },
    loginText:{
        color:'blue',
        fontWeight:'200',
        fontSize:20,
    },
    ButtonsignUp:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"orange",
        shadowColor: "black",
        alignSelf:"center",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10,
        marginBottom:50,
    },
    signUpText:{
        color:'blue',
        fontWeight:'200',
        fontSize:20,
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'black',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"pink",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:55,
        color:'red',
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:250,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
})