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

    if (results.isLoading) return <><span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span></>;

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                {Object.keys(initialValues).slice(2).map(key => (
                    <div className="form-group flex justify-between" key={key}>
                        <label htmlFor={key}>{key}</label>
                        <input
                            id={key}
                            name={key}
                            type="text"
                            className="form-control"
                            value={formik.values[key]}
                            onChange={formik.handleChange}
                        />
                    </div>
                ))}
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
