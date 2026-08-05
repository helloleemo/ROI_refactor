import { useState } from "react";

const useInputbar = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleClearInput = () => {
        setInputValue("");
    }



    return {
        inputValue,
        setInputValue,
        handleClearInput,
        handleInputChange,
    };
};

export default useInputbar