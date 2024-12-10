import {userAPI} from "../store/apis/user.js";

export const loader = (store) => async ({params}) => {
    const {group} = params
    const { user } = store.getState().userState;
    try {
        const query = {
            method: 'GET',
            payload: {
                action: user.role,
                values: {
                    func: 'GROUPINFO',
                    params: {
                        role: user.role,
                        email: user.email,
                    },
                },
            }
        };
        // toast.info('Loading ...');
        const resultAction = await store.dispatch(userAPI.endpoints.getStudents.initiate(query));
        if (resultAction.status === 'fulfilled') {
            // toast.dismiss();
            return { groupList: resultAction.data.students.filter(o => o.group === group), ['students']: resultAction.data.students };
        } else {
            return null;
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials';
        // toast.error(errorMessage);
        return null;
    }
}
