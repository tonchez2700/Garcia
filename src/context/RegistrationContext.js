import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import httpClientId from '../services/httpClientId';
import { Base64 } from 'js-base64';
import * as rootNavigation from '../helpers/rootNavigation';

const initialState = {
    error: false,
    message: null,
    isVisible: false,
    fetchingData: false,
    catalog: [],
    listPatients: [],
    file_number: '',
    dataFrom: [],
    dateB: '',
}

const RegistrationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_CLEAR':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: false,
                dataFrom: [],
            }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        case 'CHANGE_VISIBLE_MODAL':
            let visibleCheck = !state.isVisible
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                isVisible: visibleCheck
            }
        case 'SET_CATALOG':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                catalog: action.payload.data,
                file_number: action.payload.file_number,
            }
        case 'SET_CATALOG':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                catalog: action.payload.data,
                file_number: action.payload.file_number,
            }
        case 'SET_MASK':
            let type = action.payload.typedata
            return {
                ...state,
                [type]: action.payload.value,
            }
        case 'SET_PATIENTS':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                listPatients: action.payload.response
            }
        case 'SET_DATA':
            let typedata = action.payload.typedata
            let category = action.payload.category
            return {
                ...state,
                fetchingData: false,
                dataFrom: {
                    ...state.dataFrom,
                    [category]: {
                        ...state.dataFrom[category],
                        [typedata]: action.payload.value
                    }
                }
            }
        case 'SET_SCAN':
            return {
                ...state,
                error: false,
                message: '',
                fetchingData: false,
                dataFrom: {
                    patient: {
                        name: action.payload.response.result.fullName,
                        paternal_surname: action.payload.response.result.fathersName,
                        maternal_surname: action.payload.response.result.mothersName,
                        gender_id: (action.payload.response.result.sex == 'H' ? 1 : 2),
                        birthdate: action.payload.response.result.dateOfBirth.originalString,
                        document_id: (action.payload.response.result.classInfo.type == 'TYPE_VOTER_ID' ? 2 : ''),
                        document_number: action.payload.response.result.documentAdditionalNumber,
                        age: action.payload.response.result.age,


                    }
                }
            }
        default:
            return state
    }

}


// dataFrom: {
//     ...state.dataFrom,
//     [category]: { ...category, [typedata]: action.payload.value }
// }
const clearState = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE' });
    }
}

const isVisibleModal = (dispatch) => {
    return async (message) => {
        dispatch({
            type: 'CHANGE_VISIBLE_MODAL',
            payload: { message }
        })
    }
}

const handleInputChange = (dispatch) => {
    return async (value, typedata, category) => {

        dispatch({
            type: 'SET_DATA',
            payload: { value, typedata, category }
        })
    }
}

const handleInputChangeMask = (dispatch) => {
    return async (value, typedata) => {

        dispatch({
            type: 'SET_MASK',
            payload: { value, typedata, }
        })
    }
}

const getCatalog = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token

            const countries = await httpClient
                .get(`countries`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const genders = await httpClient
                .get(`genders`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const relations = await httpClient
                .get(`relations`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const documents = await httpClient
                .get(`documents`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const civil_statuses = await httpClient
                .get(`civil_statuses`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const file_number = await httpClient
                .get(`file_number`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const data = {
                countries,
                genders,
                relations,
                documents,
                civil_statuses,
            }
            if (data != '') {
                dispatch({
                    type: 'SET_CATALOG',
                    payload: { data, file_number }
                });
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
const getPatients = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`px_patients`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            dispatch({
                type: 'SET_PATIENTS',
                payload: { response }
            })
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


const ScanIdCard = (dispatch) => {
    return async (Image) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const data = {
                returnFullDocumentImage: false,
                returnFaceImage: false,
                returnSignatureImage: false,
                allowBlurFilter: false,
                allowUnparsedMrzResults: false,
                allowUnverifiedMrzResults: true,
                validateResultCharacters: true,
                anonymizationMode: "FULL_RESULT",
                anonymizeImage: true,
                ageLimit: 0,
                imageSource: Image,
                scanCroppedDocumentImage: false,
            }
            const apiKey = '6a29f1c02df5452fabbb1fc7fa0ba16c';
            const apiSecret = '293d80d9-777d-40bc-9354-692affb2aaed';
            const authHeader = Base64.encode(apiKey + ':' + apiSecret);
            const response = await httpClientId
                .post(`recognizers/blinkid`, data,
                    {
                        'Authorization': `Bearer ${authHeader}`,
                    }
                )
            dispatch({
                type: 'SET_SCAN',
                payload: { response }
            })
            rootNavigation.navigate('RegisterScreen')
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


const storePxPatients = (dispatch) => {
    return async (data) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            // const validated = validateData(data)
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .post(`px_patients`, data, {
                    'Authorization': `Bearer ${token}`,
                });
            if (response.status) {
                Alert.alert(
                    "Correcto",
                    "Se agrego paciente correctamente",
                    [{
                        text: "Aceptar",
                    }]
                )
                dispatch({ type: 'SET_CLEAR' });
                rootNavigation.navigate('HomeScreen')
            } else {
                Alert.alert(
                    "Error ",
                    response.message,
                    [{
                        text: "Aceptar",
                    }]
                )
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
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
        handleVisibility,
        isVisibleModal,
        handleInputChange,
        handleInputChangeMask,
        ScanIdCard,
        storePxPatients,
        getPatients,
        getCatalog

    },
    initialState
);