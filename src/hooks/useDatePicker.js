import { useReducer } from 'react'
import moment from 'moment';

const initialState = { 
    date: null,
    time: null,
    tmpDate: null,
    mode: 'date',
    isVisible: false
};

const datePickerReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CLEAR_STATE':
            return initialState
        case 'HIDE_PICKER':
            return { ...state, isVisible: false }
        case 'SET_INITIAL_DATA':
            return { ...state, date: action.payload.date }
        case 'SET_VISIBILITY_STATE':
            return { 
                ...state, 
                tmpDate: state.tmpDate ? state.tmpDate : new Date(),
                isVisible: action.payload.isVisible,  
                mode: action.payload.mode 
            }
        case 'SET_DATE_VALUE':
            return { 
                ...state, 
                date: action.payload.date,
                tmpDate: action.payload.tmpDate,
                isVisible: false 
            }
        case 'SET_TIME_VALUE':
            return { 
                ...state, 
                time: action.payload.time,
                tmpDate: action.payload.tmpDate,
                isVisible: false 
            }
        default:
            return state
    }
}

const getFormatedDate = (date, format) => {
    return moment(date).format(format)   
}

const useDatePicker = (initialDate) => {
        
    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const handleVisibility = (mode) => {
        dispatch({ 
            type: 'SET_VISIBILITY_STATE', 
            payload: { 
                isVisible: true,
                mode 
            } 
        })
    }

    const handleOnChangePicker = (selectedDate, mode) => {
        const currentDate = selectedDate || state.date;
        if(selectedDate){
            if(mode === 'date'){
                dispatch({ 
                    type: 'SET_DATE_VALUE', 
                    payload: {
                        date: getFormatedDate(currentDate, 'DD-MM-YYYY'),
                        tmpDate: new Date(selectedDate)
                    } 
                })
            }else{
                dispatch({ 
                    type: 'SET_TIME_VALUE', 
                    payload: {
                        time: getFormatedDate(currentDate, 'HH:mm'),
                        tmpDate: new Date(selectedDate)
                    } 
                })
            }
        }else{
            dispatch({ type: 'HIDE_PICKER' })
        }
    }

    return {
        state,
        handleVisibility,
        handleOnChangePicker
    };
}

export default useDatePicker
