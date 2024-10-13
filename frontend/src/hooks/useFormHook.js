import { useState } from "react";
import toast from "react-hot-toast";

const useFormHook = (defaultState, navigate, apiCall, setAuth) => {
  const [state, setState] = useState(defaultState);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const res = await apiCall(state);
      toast.success(res.message);
      setAuth && setAuth(true);
      navigate && navigate("/");
      setState(defaultState);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  return { state, handleSubmit, handleFormData };
};

export { useFormHook };
