import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { general } from '../theme/customTheme';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const EntryList = ({ data, dalete, edit }) => {

    const navigation = useNavigation();
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    return (

        <View style={{ flex: 1, marginTop: '2%', borderBottomColor: 'gray', borderRadius: 5, elevation: 5, backgroundColor: 'white', borderBottomColor: 'white', borderTopWidth: 1 }}>
            <FlatList
                data={sortedData}
                pagingEnabled={true}
                refreshing={true}
                removeClippedSubviews={true}
                initialNumToRender={10}
                renderItem={({ item }) =>
                    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00000029', padding: '2%'}}>
                        <Text style={{ flex: 1, fontSize: 21 }}>{item.admissions.file_number}</Text>
                        <Text style={{ flex: 2, fontSize: 21 }}>{item.name}{item.paternal_surname}{item.maternal_surname}</Text>
                        <Text style={{ flex: 1, fontSize: 21 }}>{item.admissions.admission_date}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Icon name='edit' size={32} type='font-awesome' color='green' />
                            <Icon name='trash-o' size={32} type='font-awesome' color='#FF0000' />
                        </View>

                    </View>
                }
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default EntryList

const styles = StyleSheet.create({

    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
