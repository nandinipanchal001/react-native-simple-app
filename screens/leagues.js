import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView, FlatList, StyleSheet, Pressable, StatusBar } from "react-native";


const LeagueInfo = ({ strLeague,strLeagueAlternate,strSport}) => (
    <View  style={styles.item}>
        <Text style={styles.text} >
            League : {strLeague}
        </Text>
        <Text style={styles.text}>
            League Alternate : {strLeagueAlternate}
        </Text>
        <Text style={styles.text}>
            Sport : {strSport}
        </Text>
    </View>
)

const League = ({ navigation }) => {
    const [LeagueState, setLeague] = useState({
        LeagueData: [],
        isloading: false
    })

    const [error, setError] = useState('')

    useEffect(() => {
        getDataLeagues()
    }, [])

    const getDataLeagues = async () => {
        setLeague({
            LeagueData: [],
            isloading: true
        })
        await fetch('https://www.thesportsdb.com/api/v1/json/2/all_leagues.php', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Result', data)
                setLeague({ LeagueData: [data.leagues], isloading: false })
            })
            .catch(err => {
                console.error(err)
                setLeague({ LeagueData: [], isloading: false })
                setError('Network Error ! Please try after some time')
            })
    }

    const { LeagueData, isloading } = LeagueState
    console.log('legueState', LeagueState)
    console.log('legaue state data', LeagueData)

    let newData = []

    LeagueData.map((leagues) => {
        return (
            newData = leagues.map((league) => {
                return league
            })
        )
    })

    console.log('newData', newData)

    const renderLeagueItem = ({item}) =>(
        <LeagueInfo strLeague={item.strLeague} strLeagueAlternate={item.strLeagueAlternate} strSport={item.strSport}/>
    )

    return (
        <View>

            <Pressable onPress={() => {
                console.log('clicked')
                navigation.navigate('Sport')
            }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: '600' }}>Go to Sports</Text>
            </Pressable>
            <View>
                <Text style={{ textAlign: 'center' }}>{isloading ? <ActivityIndicator size="large" color="#0000ff" /> : null}</Text>
                <Text style={{ textAlign: 'center' }}>{error}</Text>
            </View>
            
            <FlatList
                data={newData}
                renderItem={renderLeagueItem}
                keyExtractor={item => item.idLeague}
            />
           

        </View>


    )
}

export default League

const styles = StyleSheet.create({
    item: {
        margin: 10,
        backgroundColor: '#BAABDA',
        padding: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Times New Roman',
        color: 'black'
    }
})

