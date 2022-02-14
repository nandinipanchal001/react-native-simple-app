import React, { useEffect, useState } from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { FlatList} from "react-native";

const SportsInfo = ({ strFormat, strSport, strSportIconGreen }) => (
    <View style={styles.item}>
        <Text style={styles.text}>
            Format :{strFormat}
        </Text>
        <Text style={styles.text}>
            Sport: {strSport}
        </Text>
        <Image
            style={styles.icon}
            source={{
                uri: `${strSportIconGreen}`
            }}
        />
    </View>
)

const Sport = ({ navigation }) => {

    const [Sports, setSports] = useState({
        SportsData: [],
        isloading: false
    })

    const [error, setError] = useState('')

    useEffect(() => {
        getSportsData()
    }, [])

    const getSportsData = async () => {
        setSports({
            SportsData: [],
            isloading: true
        })
        await fetch('https://www.thesportsdb.com/api/v1/json/2/all_sports.php', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSports({ SportsData: [data.sports], isloading: false })
            })
            .catch(error => {
                console.error(error)
                setSports({ SportsData: [], isloading: false })
                setError('Network Error ! Please try after some time')
            })
    }

    const { SportsData, isloading } = Sports
    console.log('sport state', SportsData)
    
    let newData = []
    
    SportsData.map((sports)=>{
       return (
            newData=sports.map((sport)=>{
            return sport
            })
       )
    })
    
    console.log('new data',newData)
  
    const renderSportItem = ({item}) => (
        <SportsInfo strFormat={item.strFormat} strSport={item.strSport} strSportIconGreen={item.strSportIconGreen}  />
    )

    
    return (
        <View>
            <Pressable onPress={() => {
                console.log('clicked inside sports')
                navigation.navigate('League')
            }
            }>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'black' }}>Go to Leagues</Text>
            </Pressable>
            <View>
                <Text style={{ textAlign: 'center' }}>{isloading ? <ActivityIndicator size="large" color="#0000ff" /> : null}</Text>
                <Text style={{ textAlign: 'center' }}>{error}</Text>
            </View>

                <FlatList
                    data={newData}
                    renderItem={renderSportItem}
                    keyExtractor={item => item.idSport}
                />
           
        </View>
    )
}

export default Sport

const styles = StyleSheet.create({
    item: {
        margin: 10,
        backgroundColor: '#ACB992',
        padding: 10,
        borderRadius: 10

    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Times New Roman',
        color: 'black'
    },
    icon: {
        height: 50,
        width: 50
    }

})