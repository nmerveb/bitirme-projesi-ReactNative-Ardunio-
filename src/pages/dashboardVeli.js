import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar
} from 'react-native';
import database from '@react-native-firebase/database';
import {Logo} from '../components/logo';
import PushNotification from "react-native-push-notification";

export function DashboardVeli({route, navigation})
{
    var ogrno=route.params.ogrenciNo; //Navigasyon sırasında aldığı parametre
    
    const [ogrenci, setOgrenci] = useState("");
    const [ogretmen, setOgretmen]= useState("");
    const [servis, setServis]= useState("");
    const [servistemi, setServisteMi]= useState("");
    const [kontrolSaati, setkontrolSaati]= useState("");
    const [ toplamchild, setToplamChild]= useState("");

    //#region Öğrenci bilgilerini çeker
    function getData()
    {   var ogr;
        var i=0;
        //toplam child sayısını bulur.
        database()
            .ref('/öğrenciler')
            .once('value')
            .then(snapshot => {
                setToplamChild(snapshot.numChildren());
            });
        //Bilgisi eşleşen child'ı arar, bilgilerini sabite atar.
        for(i=1; i<=toplamchild;i++)
        {
            var ref= "ogr";
            ref+=i;
            database()
            .ref('/öğrenciler/'+ref)
            .once('value')
            .then(snapshot => {
                ogr=snapshot.val();
                if(ogr.ogrNo==ogrno){
                    setOgrenci(ogr.adSoyad);
                    setOgretmen(ogr.ogretmen);
                    setServis(ogr.servisGörevlisi);
                    if(ogr.servisteMi== "Evet")
                    {
                        setServisteMi("Öğrenci servistedir.");
                    }else if(ogr.servisteMi=="Hayır")
                    {
                        setServisteMi("Öğrenci serviste değildir.");
                    }
                } 
            });
        }
    }
    //#endregion Öğrenci bilgilerini çeker
   
    //#region Bildirim kontrol saatini çeker.
    database()
    .ref('/kontrolSaati')
    .once('value')
    .then(snapshot => {
        setkontrolSaati(snapshot.val());
    });
   //#endregion Bildirim kontrol saatini çeker.
    
   //Bildirim başlığı ve içeriğini tutar.
   function bildirim(){
        PushNotification.localNotification({
            title: "Servis Takip Uygulaması", 
            message: "Çocuğunuz hala serviste" 
         }) ;  
    }

    var zaman= date.getHours()+":"+date.getMinutes();
    if((zaman>kontrolSaati)&&(servistemi=="Öğrenci servistedir.")) //Bildirim atılmasını kontrol eder.
    {
        bildirim();
    }

   


    getData();
    var date = new Date();


    return(
        <View style= {styles.mainContainer}>
            <Text style={{marginTop:10, height:40, fontSize:20, color:"#ACA195"}}>Öğrenci Bilgileri</Text>
          <View style={styles.infoArea}>
            <Text style={styles.nameField}> Ad Soyad: { ogrenci}</Text>
            <Text style={styles.teacherNameField}>Öğretmen:{ ogretmen}</Text>
            <Text style={styles.stuffNameField}>Görevli:{ servis}</Text>
            <Text style={styles.isInThereField}>{ servistemi}</Text>
          </View>
          <View style={styles.logoArea}><Logo/></View>
        </View>
    );
}

PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: "#FFFFEF",
        alignContent:"center",
        margin:0,
        padding:0,
        
    },
    infoArea:{
        flex:2,
        alignContent:"center",
        marginTop:50
    },
    nameField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        borderWidth:2,
        borderBottomWidth:1,
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        borderColor:"#ACA195",
        justifyContent:"center",
        alignContent:"center",
        fontSize:20,
        color: "#60311B"
    },
    teacherNameField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        borderWidth:2,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#ACA195",
        justifyContent:"center",
        alignContent:"center",
        fontSize:20,
        color: "#60311B"
    },
    stuffNameField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        borderWidth:2,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#ACA195",
        justifyContent:"center",
        alignContent:"center",
        fontSize:20,
        color: "#60311B"
    },
    isInThereField:{
        height:50,
        marginLeft:20,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        borderWidth:2,
        borderTopWidth:1,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
        borderColor:"#ACA195",
        justifyContent:"center",
        alignContent:"center",
        fontSize:20,
        color: "#60311B"
    },
    logoArea:{
        flex: 2,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin:0
    }
})