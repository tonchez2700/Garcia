import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import useDatePicker from './../hooks/useDatePicker'
import { RegisterStyle } from '../theme/customTheme';
import tw from 'tailwind-react-native-classnames';

const DateRange = ({ double, titleDate, titleTime, onChangeDate, onChangeTime }) => {
    const { state, handleVisibility, handleOnChangePicker } = useDatePicker()

    const onChangePicker = (event, selectedDate) => {
        handleOnChangePicker(selectedDate, state.mode)
    }

    // useEffect(() => {
    //     onChangeDate(state.date)
    // }, [state.date]);

    // useEffect(() => {
    //     onChangeTime(state.time)
    // }, [state.time]);

    return (
        <View style={{ flex: 1 }}>
            {
                double ?
                    <View style={tw`flex-row`}>
                        <TouchableOpacity style={[RegisterStyle.ViewBoder, { flex: 1 }]} onPress={() => handleVisibility('date')}>
                            <Text style={RegisterStyle.TextBoder}>Fecha</Text>
                            <TextInput
                                placeholder={'Fecha de admisión'}
                                fontSize={24}
                                style={RegisterStyle.Input}
                                value={state.date ? state.date.toString() : null}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[RegisterStyle.ViewBoder, { flex: 1 }]} onPress={() => handleVisibility('time')}>
                            <Text style={RegisterStyle.TextBoder}>Hora</Text>
                            <TextInput
                                placeholder={'01:00 PM'}
                                fontSize={24}
                                style={RegisterStyle.Input}
                                value={state.date ? state.date.toString() : null}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={[RegisterStyle.ViewBoder, { flex: 1 }]} onPress={() => handleVisibility('date')}>
                        <Text style={RegisterStyle.TextBoder}>Fecha de nacimiento<Text style={{ color: 'red' }}> * </Text></Text>
                        <TextInput
                            placeholder={'Fecha de nacimiento'}
                            fontSize={24}
                            style={RegisterStyle.Input}
                            value={state.date ? state.date.toString() : null}
                            editable={false}
                        />
                    </TouchableOpacity>
            }
            {
                state.isVisible && (
                    <DateTimePicker
                        testID="tmpDate"
                        dateFormat="year month day"
                        value={state.tmpDate}
                        mode={state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangePicker}
                    />
                )
            }
        </View >
    )
}

export default DateRange

const styles = StyleSheet.create({})
