import { useFormik, FormikProvider } from 'formik';
import {store} from "../../store/index.js";
import {userAPI} from "../../store/apis/user.js";


const Semester = ({number, data}) => {
    const {user} = store.getState().userState
    const [edit, results] = userAPI.endpoints.updateStudentData.useMutation()
    const {[`sem${number}`]: sem} = data

    const initialValues = sem !== "" ? JSON.parse(sem) : {available: true};

    const formik = useFormik({
        initialValues: {...initialValues},
        onSubmit: values => {

            const [row, ...old] = Object.values(data)
            const newObj = {...values}
            const arr = Object.values({...data, [`sem${number}`]: JSON.stringify(newObj)}).slice(1)

            const obj = {
                method: 'PATCH',
                payload: {
                    action: 'updateRowInTable',
                    values: {
                        row,
                        arr,
                        sheetName: 'ind-plans',
                        old,
                    },
                }
            };

            edit({ obj, id: user.email });
        }
    })
    if (results.isLoading) return <>Loading</>;

    return (
        <>
            <h1>{number}-й семестр</h1>

            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>

                    <div className="card">
                        <div className="card-body">
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" type='submit'> ОНОВИТИ</button>
                            </div>
                        </div>
                    </div>
                </form>

            </FormikProvider>
        </>
    );
};

export default Semester;
