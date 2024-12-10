import {toast} from "react-toastify";
import {redirect} from "react-router-dom";
import {loginUser} from "../store/slices/userSlice.js";
import {userAPI} from "../store/apis/user.js";

export const action =
    (store) => async ({request}) => {


        try {
            const formData = await request.formData();
            const email = formData.get('email');
            const password = formData.get('password');
            const obj = {
                method: 'GET',
                payload: {
                    action: 'login',
                    values: {
                        func: 'USER',
                        params: {
                            email,
                            pass: password
                        },
                    },
                }}

            const resultAction = await store.dispatch(userAPI.endpoints.getRoles.initiate(obj));
            if (resultAction.status === 'fulfilled') {
                const data = resultAction.data;
                const {role} = data
                if (role === 'guest'){
                    store.dispatch(loginUser({ ...data }));
                    toast.error('Вам не можна сюди ))')
                } else {
                    store.dispatch(loginUser({ ...data}));
                    toast.success('Ви успішно авторизовані');
                }
                return redirect('/');
            } else {
                return null
            }


        } catch (error) {
            const errorMessage =
                error?.response?.data?.error?.message ||
                'please double check your credentials';
            toast.error(errorMessage);
            return null;
        }

    }
