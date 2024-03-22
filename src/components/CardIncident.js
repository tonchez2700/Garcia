import React, { useState } from 'react'
import {
    StyleSheet, View, Text, Image,Platform,
    Dimensions, UIManager, LayoutAnimation
} from 'react-native'
import Images from "../components/assets/images";
import { CardSytles } from '../theme/CardStyles';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const { width, height } = Dimensions.get('window');


const CardIncident = ({ data, fun }) => {


    const [isExpanded, setIsExpanded] = useState(true);
    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    return (
        <View style={CardSytles.container} >

            <View style={{ flex: 1 }}>
                {
                    data?.resources[0]?.url != undefined
                        ?
                        <Image
                            style={CardSytles.image}
                            source={{
                                uri: `https://www.appalaorden.garcia.gob.mx/garcia/${data.resources[0].url}`,
                            }}
                        />
                        :
                        <Image
                            style={CardSytles.image}
                            source={Images.warnning}
                        />
                }
            </View>
            <View style={{ flex: 1, paddingTop: 17, paddingLeft: 9 }}>
                <View style={{ position: 'absolute', alignSelf: 'flex-end', right: 5 }}>
                    <Icon
                        size={20}
                        name={'remove'}
                        onPress={() => fun('')}
                        type='font-awesome'
                        color={'#4267B2'} />
                </View>
                <Text style={{ textAlign: 'left', color: '#1E0554', fontSize: 14, fontWeight: '700', marginTop: 2 }}>{data.incident.name}</Text>
                <Text style={{ color: '#424242', fontSize: 12, marginTop: 14, marginBottom: 24, fontWeight: '500' }}>{data?.street},{data?.suburb.name},{data?.suburb.postal_code.code},{data?.suburb.municipality.name}, N.L.</Text>
                <Text style={{ color: '#FF8200', fontSize: 12, fontWeight: '700' }}>{data.report_status.name}</Text>
            </View>
        </View>
    );
};

export default CardIncident

const styles = StyleSheet.create({})
