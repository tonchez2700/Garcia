

import createDataContext from './createDataContext'
import httpClient from '../services/httpClient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rootNavigation from '../helpers/rootNavigation';
import moment from 'moment';

const initialState = {
    error: false,
    message: null,
    fetchingData: false,
    user: null,
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return initialState
        case 'FETCHING_DATA':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: action.payload.fetchingData
            }
        case 'SIGNIN':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: false,
                user: action.payload.user
            }
        case 'SIGNOUT':
            return { ...state, user: null, message: null }
        case 'SET_RESPONSE_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false,
                user: null
            }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false,
                user: null
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

const tryLocalSignin = (dispatch) => {
    return async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        if (user) {
            dispatch({ type: 'SIGNIN', payload: { user } });
            rootNavigation.navigate('WrapperInnerScreens')
        } else {
            rootNavigation.navigate('AuthScreen')
        }
    }
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        try {
            tryAuth(email, password, dispatch);
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('user')
        dispatch({ type: 'SIGNOUT' });
        rootNavigation.navigate('AuthScreen')
    }
}

const tryAuth = async (email, password, dispatch) => {
    dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });

    const data = {
        email: email,
        password: password
    }
    const response = await httpClient.post('auth/login', data)
    if (response.status) {
        const user = {
            userData: {
                id: response.user.id,
                role_id: response.user.role_id,
                name: response.user.name,
                paternal_surname: response.user.paternal_surname,
                maternal_surname: response.user.maternal_surname,
                picture: response.user.picture,
                email: response.user.email
            },
            token: response.token
        }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'SIGNIN', payload: { user } });
        rootNavigation.navigate('WrapperInnerScreens')
    } else {
        dispatch({
            type: 'SET_RESPONSE_ERROR',
            payload: {
                error: true,
                message: 'Los accesos son incorrectos, favor de verificarlos.'
            }
        });
    }
}

export const { Context, Provider } = createDataContext(
    loginReducer,
    { signin, signout, tryLocalSignin, clearState },
    initialState
);