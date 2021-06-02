import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    StatusBar
} from 'react-native';
import database from '@react-native-firebase/database';
import {ListItem} from '../components/listItem'
export function DashboardOgrt({route, navigation})
{
    var sube = route.params.ogrenciSube; //Navigasyon sırasında aldığı parametre
    const [ogrenciler, setOgrenciler]=useState([]);
    const [ toplamchild, setToplamChild]= useState("");
   //#region Öğrenci bilgilerini çeker.
    function getData()
    {   var ogr;
        var i=0;
        //Toplam öğrenci sayısını bulur.
        database()
        .ref('/öğrenciler')
        .once('value')
        .then(snapshot => {
            setToplamChild(snapshot.numChildren());
        });
        for(i=1; i<=toplamchild;i++)
        {
            var ref= "ogr";
            ref+=i;
            database()
            .ref('/öğrenciler/'+ref)
            .once('value')
            .then(snapshot => {
                ogr=snapshot.val();
                if(ogr.sube==sube){
                    setOgrenciler(ogr);
                } 
            });
        }
    }
   //#endregion Öğrenci bilgilerini çeker.
    getData();

    return(
        <View style= {styles.mainContainer}>
           <View style={{marginTop:10, marginBottom:10}}>
               <Text>Öğrenci Listesi</Text>
               <View>
                    <FlatList 
                    data={ogrenciler} renderItem={({item})=>{
                       return <ListItem  key={item.key} adSoyad={item.adSoyad} servisGörevlisi={item.servisGörevlisi} servisteMi={item.servisteMi}/>
                     }} />
               </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#FFFFEF"
    }
})