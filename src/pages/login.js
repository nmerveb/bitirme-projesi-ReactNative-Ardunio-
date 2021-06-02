import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform
} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {Logo} from '../components/logo';

export function Login()
{ 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ogrNo, setOgrNo] = useState("");
    const [sube, setSube] = useState("");
    const [ogrtSayi, setOgrtSayi] = useState("");
    const [veliSayi, setVeliSayi] = useState("");
    const navigation =useNavigation();

    //#region Giriş yapan kişinin gerekli kontrollerini yapar. 
    function doLogin(){
        if(username&& username!="")
        {
            if(password && password!="")
            {
                //Öğretmen sayısını çeker.
                database()
                .ref('/öğretmenler')
                .once('value')
                .then(snapshot => {
                    setOgrtSayi(snapshot.numChildren());
                });
                //Veli sayısını çeker.
                database()
                .ref('/veliler')
                .once('value')
                .then(snapshot => {
                    setVeliSayi(snapshot.numChildren());
                });
                //Giriş kontrolü
                database()
                .ref('/')
                .once('value')
                .then(snapshot => {
                   var i;
                   var ogrtPK;
                   for(i=1;i<ogrtSayi; i++)
                   {
                        ogrtPK="ogrt"+i;
                        ogretmenler= snapshot.child('öğretmenler/'+ogrtPK).val();
                        if(ogretmenler.kullanıcıadı==username)
                        {
                            if(ogretmenler.sifre==password)
                            {
                                setSube(ogretmenler.sube);
                                console.log("giriş başarılı ogrt");
                            }else{
                                alert("Yanlış şifre girdiniz ogrt")
                            }
                        }
                   }
                   if(sube==""||sube==null){i=0;}
                   for(i=1;i<veliSayi; i++)
                   {
                        veliPK="veli"+i;
                        veliler=snapshot.child('veliler/'+veliPK).val();
                        if(veliler.kullanıcıadı==username)
                        {
                            if(veliler.sifre==password)
                            {
                                setOgrNo(veliler.ogrno);
                                console.log("giriş başarılı veli");
                            }else{
                                alert("Yanlış şifre girdiniz veli")
                            }
                        }
                   }
                });

            }else{
                alert("Şifrenizi girin");
            }

        }else{
            alert("Kullanıcı adınızı girin");
        }
    }
    ////#endregion Giriş yapan kişinin gerekli kontrollerini yapar. 
    return(
        <View style= {styles.mainContainer}>
            <View style={styles.logoArea}><Logo/></View>
            <View style={styles.inputArea}>
                <TextInput autoCapitalize="none" value={username} 
                onChangeText={(text)=>{ setUsername(text);}} placeholder="Kullanıcı Adı" style={styles.usernameField}>
                </TextInput>
                <TextInput autoCapitalize="none" value={password} 
                onChangeText={(text)=>{ setPassword(text);}} placeholder="Şifre" style={styles.passwordField} secureTextEntry={true}>
                </TextInput>
                <TouchableOpacity onPress={()=>{
                    doLogin();
                    if(ogrNo&&ogrNo!=null&&ogrNo!='')
                    {
                        navigation.navigate("DashboardVeli",{ogrenciNo:ogrNo});
                    }else if(sube&&sube!=null&&sube!='')
                    {
                        navigation.navigate("DashboardOgrt", {ogrenciSube: sube});
                    }
                    }} style={styles.loginButton}>
                    <Text style={{color:'#FFFFEF'}}>Giriş</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: "#FFFFEF",
        alignContent:"center",
        margin:0,
        padding:0
    },
    logoArea:{
        flex: 2,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin:0
    },
    inputArea:{
        flex:2,
        alignContent:"center"
    },
    usernameField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        borderWidth:2,
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        borderColor:"#ACA195"
    },
    passwordField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        borderWidth:2,
        borderTopWidth:0,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
        borderColor:"#ACA195"
    },
    loginButton:{
        height:50,
        backgroundColor:"#958A79",
        margin:20,
        marginBottom:10,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center"
    }
})