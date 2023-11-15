

import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import httpClient from '../services/httpClient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rootNavigation from '../helpers/rootNavigation';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import moment from 'moment';



GoogleSignin.configure({
    offlineAccess: true,
    iosClientId: '851474503024-ac4gu1n447c9jn75ge0qffffd3j74i0d.apps.googleusercontent.com',
    webClientId: '851474503024-h4eltil6qbffdr4tr99p040ek5ajhg6c.apps.googleusercontent.com',
});
const initialState = {
    error: false,
    message: null,
    fetchingData: false,
    user: null,
    stateView: 1
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
        case 'SET_STATE_VIEW':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: false,
                stateView: action.payload.value
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
            rootNavigation.reset()
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
        GoogleSignin.signOut();
        rootNavigation.reset();
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
                full_name: response.user.full_name,
                paternal_surname: response.user.paternal_surname,
                maternal_surname: response.user.maternal_surname,
                picture: response.user.picture,
                facebook_id: response.user.facebook_id,
                google_id: response.user.google_id,
                phone: response.user.phone,
                address: response.user.address,
                postal_code: response.user.postal_code,
                email: response.user.email
            },
            token: response.token
        }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: 'SIGNIN', payload: { user } });
        rootNavigation.navigate('WrapperInnerScreens')
    } else {
        GoogleSignin.signOut();
        dispatch({
            type: 'SET_RESPONSE_ERROR',
            payload: {
                error: true,
                message: 'Los accesos son incorrectos, favor de verificarlos.'
            }
        });
    }
}

const setStateView = (dispatch) => {
    return async (value) => {
        dispatch({
            type: 'SET_STATE_VIEW',
            payload: {
                value
            }
        })
    }

}
const register = (dispatch) => {
    return async (data) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const response = await httpClient.post('auth/register', data)
            if (response.status) {
                dispatch({
                    type: 'SET_STATE_VIEW',
                    payload: {
                        value: 1
                    }
                })
                Alert.alert(
                    "Correcto",
                    "Usuario creado exitosamente.",
                    [{
                        text: "Aceptar"
                    }]
                )
            } else {
                let errorMessage = "";
                if (typeof response.message === "object") {
                    const errorKey = Object.keys(response.message)[0];
                    errorMessage = response.message[errorKey][0];
                } else if (typeof response.message === "string") {
                    errorMessage = response.message;
                }
                Alert.alert(
                    "Ha ocurrido un error",
                    errorMessage,
                    [{
                        text: "Aceptar"
                    }]
                )
            }
        } catch (error) {
            dispatch({
                type: 'SET_RESPONSE_ERROR',
                payload: {
                    error: true,
                    message: 'Error al llenar los campos.'
                }
            });
        }
    }
}
const passwordRecovery = (dispatch) => {
    return async (email) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const response = await httpClient.get(`auth/password_recovery?email=${email}`)
            if (response.status) {
                dispatch({
                    type: 'SET_STATE_VIEW',
                    payload: {
                        value: 1
                    }
                })
                Alert.alert(
                    "Correcto",
                    response.message,
                    [{
                        text: "Aceptar"
                    }]
                )

            } else {
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                Alert.alert(
                    "Ha ocurrido un error",
                    response.message,
                    [{
                        text: "Aceptar"
                    }]
                )

            }
        } catch (error) {
            dispatch({
                type: 'SET_RESPONSE_ERROR',
                payload: {
                    error: true,
                    message: 'Error al llenar los campos.'
                }
            });
        }
    }
}

const authFacebook = (dispatch) => {
    return async (info) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
            const data = {
            }
            const response = await httpClient.post(`auth/login/facebook`, data)
            if (response.status) {
                const user = {
                    userData: {
                        id: response.user.id,
                        role_id: response.user.role_id,
                        name: response.user.name,
                        full_name: response.user.full_name,
                        paternal_surname: response.user.paternal_surname,
                        maternal_surname: response.user.maternal_surname,
                        picture: response.user.picture,
                        facebook_id: response.user.facebook_id,
                        google_id: response.user.google_id,
                        phone: response.user.phone,
                        address: response.user.address,
                        postal_code: response.user.postal_code,
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
        } catch (error) {
            Alert.alert(
                "Ha ocurrido un error",
                error,
                [{
                    text: "Aceptar"
                }]
            )
            dispatch({
                type: 'SET_RESPONSE_ERROR',
                payload: {
                    error: true,
                    message: 'Error al llenar los campos.'
                }
            });
        }
    }
}

const authGoogle = (dispatch) => {
    return async (info) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const data = {
                google_id: info.user.id,
                name: info.user.name,
                email: info.user.email,
                picture: info.user.photo
            };
            const response = await httpClient.post(`auth/login/google`, data)
            if (response.status) {
                const user = {
                    userData: {
                        id: response.user.id,
                        role_id: response.user.role_id,
                        name: response.user.name,
                        full_name: response.user.full_name,
                        paternal_surname: response.user.paternal_surname,
                        maternal_surname: response.user.maternal_surname,
                        picture: response.user.picture,
                        facebook_id: response.user.facebook_id,
                        google_id: response.user.google_id,
                        phone: response.user.phone,
                        address: response.user.address,
                        postal_code: response.user.postal_code,
                        email: response.user.email

                    },
                    token: response.token
                };
                await AsyncStorage.removeItem('user')
                dispatch({ type: 'SIGNOUT' });
                await AsyncStorage.setItem('user', JSON.stringify(user))
                dispatch({ type: 'SIGNIN', payload: { user } });
                rootNavigation.navigate('WrapperInnerScreens')
            } else {
                GoogleSignin.signOut();
                dispatch({
                    type: 'SET_RESPONSE_ERROR',
                    payload: {
                        error: true,
                        message: 'Los accesos son incorrectos, favor de verificarlos.'
                    }
                });
            }
        } catch (error) {
            Alert.alert(
                "Ha ocurrido un error",
                error,
                [{
                    text: "Aceptar"
                }]
            )
            dispatch({
                type: 'SET_RESPONSE_ERROR',
                payload: {
                    error: true,
                    message: 'Error al llenar los campos.'
                }
            });
        }
    }
}


export const { Context, Provider } = createDataContext(
    loginReducer,
    {
        signin,
        signout,
        tryLocalSignin,
        authFacebook,
        authGoogle,
        register,
        setStateView,
        passwordRecovery,
        clearState
    },
    initialState
);