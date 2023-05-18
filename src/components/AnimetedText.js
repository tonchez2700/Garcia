import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, UIManager, LayoutAnimation } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const AnimetedText = ({ title, content }) => {

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
        <View>
            <TouchableWithoutFeedback onPress={toggleAccordion}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#003C71', flex: 1, padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', }}>{title}</Text>
                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', }}>{isExpanded ? '-' : '+'}</Text>
                </View>
            </TouchableWithoutFeedback>
            {isExpanded && (
                <View>
                    {content}
                </View>
            )}
        </View>
    );
};

export default AnimetedText

const styles = StyleSheet.create({

    Atext: {
        backgroundColor: '#F6DA7B',
        color: '#8B793B',
        textAlign: 'center',
        width: '100%',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 19,
        fontSize: 10

    },
})
