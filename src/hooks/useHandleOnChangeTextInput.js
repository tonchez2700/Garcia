import { useState } from 'react'

const useHandleOnChangeTextInput = (fields) => {
    const [inputState, setInputState] = useState(fields)

    const handleInputChange = (value, name) => {
        setInputState({
            ...inputState,
            [name]: value,
        })
    }

    return [inputState, handleInputChange]
}

export default useHandleOnChangeTextInput
