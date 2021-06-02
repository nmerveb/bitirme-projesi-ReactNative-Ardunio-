import React from 'react';
import { View, Text,StyleSheet} from 'react-native';

//componentler birbirleriyle proplarla haberleşirler.
export function ListItem(props){

    
    return (
        <View  style={{flex:1,
                      height:120,
                      alignContent:"center",
                      justifyContent:"flex-start",
                      marginTop:10,
                      backgroundColor:"#60311B", 
                      borderWidth:2,

                      }}>
            <Text style={styles.textStyle}> Ad Soyad: {props.adSoyad}</Text>
            <Text style={styles.textStyle}> Servis Görevlisi: {props.servisGörevlisi}</Text>
            <Text style={styles.textStyle}> Serviste Mi: {props.servisteMi}</Text>         
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        height:40,
        fontSize:15, 
        color:"#ACA195"
    }
})