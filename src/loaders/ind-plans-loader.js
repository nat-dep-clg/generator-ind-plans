import {userAPI} from "../store/apis/user.js";
import {getStudentsQuery} from "../queries/getStudentsQuery.js";



export const loader = (store) => async  ({params}) =>{
    const { user } = store.getState().userState;

    const queryArgs = getStudentsQuery(user);
    const selectStudents = userAPI.endpoints.getStudents.select(queryArgs);

    const cachedData = selectStudents(store.getState());

    if (cachedData?.status === 'fulfilled' && cachedData?.data) {

        return {
            role: user.role,
            students: cachedData.data.students,
        };
    }


    try {
        const resultAction = await store.dispatch(userAPI.endpoints.getStudents.initiate(queryArgs));
        if (resultAction.status === 'fulfilled') {

            return { query: queryArgs, role: user.role, students: resultAction.data.students };
        } else {
            return null;
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials';
        console.error('Error in loader:', errorMessage);
        return null;
    }
};
