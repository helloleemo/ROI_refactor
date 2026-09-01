import { useState } from "react";

const useFormState = <T extends Record<string, any>>(initialForm: T) => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrorMessage("");
        setSubmitting(false);
    };

    return {
        form,
        submitting,
        errorMessage,
        loading,
        handleChange,
        resetForm,
        setSubmitting,
        setErrorMessage,
        setLoading,
    };
}

export default useFormState;