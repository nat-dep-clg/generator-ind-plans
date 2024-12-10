import { useFormik, FormikProvider } from 'formik';
import {userAPI} from "../../store/apis/user.js";
import {store} from "../../store/index.js";

const Titulka = ({ data}) => {
    const {user} = store.getState().userState
    const [edit, results] = userAPI.endpoints.updateStudentData.useMutation()

    const {titulka} = data;

    const initialValues = titulka !== "" ? JSON.parse(titulka) : {available: true,
        sheetName: "титульна сторінка", "№": '', photo: '', pip: data.pip, group: data.group, 'Галузь знань': '', 'Спеціальність': ''};

    const formik = useFormik({
        initialValues: {...initialValues},
        onSubmit: values => {

            const [row, ...old] = Object.values(data)
            const newObj = {...values}
            const arr = Object.values({...data, titulka: JSON.stringify(newObj)}).slice(1)

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

            edit({ obj, id: +data.id });
        }
    })

    if (results.isLoading) return <>Loading</>;

    return (
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
    );
};

export default Titulka;
