import React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const PermissionWarningDenied = (props) => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={tw`text-lg text-center mb-8`}>{props.message}</Text>
            <Button
                buttonStyle={{ backgroundColor: '#1E0554' }}
                title="Permitir localización"
                onPress={Linking.openSettings}

            />
        </View>
    )
}

export default PermissionWarningDenied

const styles = StyleSheet.create({})
