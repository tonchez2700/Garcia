import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as Location from 'expo-location';
import * as rootNavigation from '../helpers/rootNavigation';

const initialState = {
    error: false,
    message: null,
    fetchingData: false,
    isVisible: false,
    isVisibleAlert: false,
    isVisibleIncident: false,
    reportTypeList: [],
    reportList: [],
    location: [],
    listPatients: [],
    file_number: '',
    dataFrom: [],
    dataReport: [],
}

const RegistrationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_CLEAR_FROM':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: false,
                dataReport: [],
            }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        case 'CHANGE_VALUE_STATE':
            let Type = action.payload.type;
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                [Type]: action.payload.value
            }
        case 'CHANGE_VISIBLE_MODAL':
            let visibleType = action.payload.type;
            let visibleCheck = !state[visibleType]
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                [visibleType]: visibleCheck
            }
        case 'CHANGE_ERROR':
            return {
                ...state,
                error: false,
                message: action.payload.message,
                fetchingData: false,
                isVisibleAlert: true
            }
        case 'SET_REPORTS_LIST':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                reportList: action.payload.response
            }
        case 'SET_TYPE_REPORTS_LIST':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                reportTypeList: action.payload.response
            }
        case 'SET_REPORTS':
            let typedata = action.payload.type
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                dataReport: {
                    ...state.dataReport,
                    [typedata]: action.payload.value,
                }
            }
        case 'SET_COORDS_REPORTS':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                dataReport: {
                    ...state.dataReport,
                    coords: action.payload.ubi,
                    address: action.payload.locationAddress
                }
            }
        case 'SET_REPORTS_I/V':
            let typeMedia = action.payload.media
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                dataReport: {
                    ...state.dataReport,
                    [typeMedia]: state.dataReport[typeMedia] ? [
                        ...state.dataReport[typeMedia],
                        action.payload.value
                    ] : [action.payload.value]
                }
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

const clearStateFrom = (dispatch) => {
    return () => {
        dispatch({ type: 'SET_CLEAR_FROM' });
    }
}

const handaleChangeValue = (dispatch) => {
    return async (type, value) => {
        dispatch({
            type: 'CHANGE_VALUE_STATE',
            payload: { type, value }
        })
    }
}
const locationRevers = (dispatch) => {
    return async (ubi) => {
        try {
            const address = await Location.reverseGeocodeAsync(ubi);
            const locationAddress = `${address[0].street}, ${address[0].district}, ${address[0].postalCode}, ${address[0].city}, ${address[0].region}`;

            dispatch({
                type: 'SET_COORDS_REPORTS',
                payload: { locationAddress, ubi }
            })
        } catch (error) {
            console.log(error);
        }

    }
}

const isVisibleModal = (dispatch) => {
    return async (type, message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL',
            payload: { type, message }
        })
    }
}

const setReportInfo = (dispatch) => {
    return async (value, type) => {
        dispatch({
            type: 'SET_REPORTS',
            payload: {
                value, type
            }
        })
    }

}

const setReportMedia = (dispatch) => {
    return async (value, media) => {
        dispatch({
            type: 'SET_REPORTS_I/V',
            payload: {
                value, media
            }
        })
    }

}

const handleVisibility = (dispatch) => {
    return async () => {
        dispatch({
            type: 'SET_VISIBILITY_STATE',
            payload: {
                isVisible: true,
            }
        })
    }

}

const getReportList = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`incidents`, {
                    'Authorization': `Bearer ${token}`,
                });
            if (response.status === false || response.message == 'Unauthenticated.') {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });

            } else {
                dispatch({
                    type: 'SET_TYPE_REPORTS_LIST',
                    payload: {
                        response
                    }
                })
            }
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

const PutUSerProfile = (dispatch) => {
    return async (data) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .put(`users/${user.userData.id}`, data,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                )
            if (response.status == true) {
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
                    token: token
                }
                Alert.alert(
                    "Éxito",
                    "Los cambios se aplicaron correctamente.",
                    [{
                        text: "Aceptar"
                    }]
                )
                await AsyncStorage.setItem('user', JSON.stringify(user))
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            console.log(error);
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

const getReports = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token

            const response = await httpClient
                .get(`reports?user_id=${user.userData.id}`, {
                    'Authorization': `Bearer ${token}`,
                });
            if (response.message === 'Unauthenticated.') {
                Alert.alert(
                    "Tiempo agotado",
                    "Lo sentimos, la sesión ha expirado",
                    [{
                        text: "Aceptar"
                    }]
                )
                await AsyncStorage.removeItem('user');
                rootNavigation.reset()
            } else {
                if (response.length != 0) {
                    if (response.message != 'Reporte no registrado') {
                        dispatch({
                            type: 'SET_REPORTS_LIST',
                            payload: { response }
                        })
                    } else {
                        dispatch({
                            type: 'SET_REPORTS_LIST',
                            payload: { response: [] }
                        })
                    }
                } else {
                    dispatch({
                        type: 'SET_REQUEST_ERROR',
                        payload: {
                            error: true,
                            message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                        }
                    });
                }
            }
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


const store = (dispatch) => {
    return async (data) => {
        try {

            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const separatedData = {
                user_id: user.userData.id,
                notes_citizen: data.note,
                latitude: data.coords.latitude.toString(),
                longitude: data.coords.longitude.toString(),
                postalCode: (data.address && typeof data.address === 'string') ? data.address.split(',')[2]?.trim() || '' : '',
                city: (data.address && typeof data.address === 'string') ? data.address.split(',')[3]?.trim() || '' : '',
                street: (data.address && typeof data.address === 'string') ? data.address.split(',')[0]?.trim() || '' : '',
                disctrict: (data.address && typeof data.address === 'string') ? data.address.split(',')[1]?.trim() || '' : '',
                incident_id: data.incident_id,
                resource: {
                    images: (data.images && data.images.length > 0) ? data.images : [],
                    videos: (data.videos && data.videos.length > 0) ? data.videos : [],
                }
            };

            const response = await httpClient
                .post(`reports`, separatedData,
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                );
            if (response.exception) {
                // Manejar el error de servidor y mostrar un mensaje genérico.
                Alert.alert(
                    "Error",
                    "Ocurrió un problema. Inténtelo de nuevo más tarde.",
                    [{
                        text: "Aceptar"
                    }]
                );
            } else {
                if (response.status != false) {
                    dispatch({ type: 'SET_CLEAR_FROM' });
                    dispatch({
                        type: 'CHANGE_VISIBLE_MODAL',
                        payload: { type: 'isVisibleIncident', }
                    })
                    Alert.alert(
                        "Éxito",
                        "Reporte agregado exitosamente.",
                        [{
                            text: "Aceptar"
                        }]
                    )
                    const response = await httpClient.get(`reports?user_id=${user.userData.id}`, {
                        'Authorization': `Bearer ${token}`,
                    });
                    if (response.length != 0) {
                        if (response.message != 'Reporte no registrado') {
                            dispatch({
                                type: 'SET_REPORTS_LIST',
                                payload: { response }
                            })
                        }
                    } else {
                        dispatch({
                            type: 'SET_REQUEST_ERROR',
                            payload: {
                                error: true,
                                message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                            }
                        });
                    }
                } else {
                    let errorMessage = "";
                    if (typeof response.message === "object") {
                        const errorKey = Object.keys(response.message)[0];
                        errorMessage = response.message[errorKey][0];
                    } else if (typeof response.message === "string") {
                        errorMessage = response.message;
                    }
                    dispatch({
                        type: 'CHANGE_ERROR',
                        payload: {
                            message: errorMessage
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
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

const validateData = (data) => {
    let result = { error: false }
    if (!data.email)
        return { ...result, error: true, message: 'El Email es requerido.' }
    if (!data.phone)
        return { ...result, error: true, message: 'El Teléfono es requerido.' }
    if (!data.name)
        return { ...result, error: true, message: 'El Nombre es requerido.' }
    if (!data.paternal_surname)
        return { ...result, error: true, message: 'El Apellido paterno es requerido.' }
    if (!data.maternal_surname)
        return { ...result, error: true, message: 'El Apellido materno es requerido.' }
    if (!data.city_id)
        return { ...result, error: true, message: 'El Cuidad es requerido.' }
    if (!data.birthdate)
        return { ...result, error: true, message: 'El Fecha es requerido es requerido.' }
    if (!data.gender_id)
        return { ...result, error: true, message: 'El Género es requerido.' }
    if (!data.job_id)
        return { ...result, error: true, message: 'El Ocupación es requerido.' }
    if (!data.media_origin_id)
        return { ...result, error: true, message: 'El Medio de origen es requerido.' }


    return result
}

export const { Context, Provider } = createDataContext(
    RegistrationReducer,
    {
        clearState,
        clearStateFrom,
        handleVisibility,
        isVisibleModal,
        getReports,
        setReportInfo,
        setReportMedia,
        getReportList,
        PutUSerProfile,
        locationRevers,
        store,

    },
    initialState
);