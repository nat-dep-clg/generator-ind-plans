import {useFormik, FormikProvider, Field} from 'formik';
import {userAPI} from "../../store/apis/user.js";
import {store} from "../../store/index.js";
import {UniversalField} from "../formik/index.js";


const Titulka = ({ data}) => {
    const {user} = store.getState().userState
    const [edit, results] = userAPI.endpoints.updateStudentData.useMutation()

    const {titulka} = data;

    const initialValues = titulka !== "" ? JSON.parse(titulka) : {available: true,
        sheetName: "титульна сторінка", "№": '', photo: '', pip: data.pip, group: data.group, 'Галузь знань': '', 'Спеціальність': ''};

    const formik = useFormik({
        initialValues: {...initialValues},
        onSubmit: values => {
            console.log(values);
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
            <form onSubmit={formik.handleSubmit} className="p-1 border-2 rounded-xl">
                <UniversalField
                    name={'№'}
                    label={'Номер'}
                    type={'text'}
                    placeholder={'номер з ЄДЕБО'}
                />
                <UniversalField
                    name={'photo'}
                    label={'Фото'}
                    type={'file'}
                />

                <UniversalField
                    name={'group'}
                    label={'Група'}
                    type={'text'}
                    disabled={true}
                />

                <UniversalField
                    name={'Галузь знань'}
                    label={'Галузь знань'}
                    type={'text'}
                    disabled={true}
                />
                <UniversalField
                    name={'Спеціальність'}
                    label={'Спеціальність'}
                    type={'text'}
                    disabled={true}
                />
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
