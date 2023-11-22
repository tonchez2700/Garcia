import { Alert, Linking } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as Location from 'expo-location';
import * as rootNavigation from '../helpers/rootNavigation';

const initialState = {
    error: false,
    message: null,
    location: '',
    coords: '',
    fetchingData: false,
    hasPermission: false
}

const LocationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return { ...initialState }
        case 'SET_VALID_SCANNED_CODE':
            return {
                ...state,
                fetchingData: action.payload.fetchingData,
                isValidCode: action.payload.isValidCode,
                scanned: action.payload.scanned,
            }
        case 'SET_SUCCESS_PERMISSION':
            return { ...state, hasPermission: action.payload }
        case 'SET_DENIED_PERMISSION':
            return {
                ...state,
                hasPermission: action.payload.hasPermission,
                message: action.payload.message
            }
        case 'SET_LOCATION':
            return {
                ...state,
                fetchingData: false,
                message: null,
                location: action.payload.ubi.coords,
                coords: action.payload.ubi
            }
        default:
            return state
    }

}

const clearState = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE' });
    }
}

const requestForegroundPermissions = (dispatch) => {
    return async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            dispatch({ type: 'SET_SUCCESS_PERMISSION', payload: true })
            
        }
        else {
            dispatch({
                type: 'SET_DENIED_PERMISSION',
                payload: {
                    hasPermission: false,
                    message: 'No tiene los permisos para el uso de la ubicacion'
                }
            })
        }
    }
}




export const { Context, Provider } = createDataContext(
    LocationReducer,
    {
        clearState,
        requestForegroundPermissions,


    },
    initialState
);