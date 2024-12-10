import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {store} from "../store/index.js";
import {userAPI} from "../store/apis/user.js";
import {useCallback, useEffect, useRef} from "react";
import {getStudentsQuery} from "../queries/getStudentsQuery.js";
import {useSelector} from "react-redux";
import {selectStudentsData} from "../selectors/select-students-data.js";

const DriveIframe = ({ id}) => {

    if (!id) {
        return null;
    }

    return (
        <iframe
            src={`https://drive.google.com/embeddedfolderview?id=${id}#grid`}
            width="100%"
            height="500px"
            frameBorder="1"
            title="Google Drive Folder"
        ></iframe>
    );
};

const ViewStudentPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { user } = store.getState().userState;


    const cachedData = useSelector(selectStudentsData);

    const [view, results] = userAPI.endpoints.viewINP.useMutation();

    // Використання useRef для відстеження, чи була мутація вже викликана
    const hasCalledMutation = useRef(false);

    // Використання useEffect для виклику мутації та оновлення кешу
    useEffect(() => {
        if (!hasCalledMutation.current && cachedData?.status === 'fulfilled' && !results.isLoading && !results.isSuccess) {
            const students = cachedData.data?.students || [];
            const student = students.find(o => o.id === +params.studID);
            if (student && !student.IND_id) {
                const obj = {
                    method: 'PATCH',
                    payload: {
                        action: 'curator',
                        values: {
                            func: 'CREATEIND',
                            params: {
                                student,
                            },
                        },
                    },
                };
                view({ obj, id: +params.studID }).then(() => {
                });
                hasCalledMutation.current = true; // Позначаємо, що мутація була викликана
            }
        }
    }, [cachedData, results.isLoading, results.isSuccess, view, params.studID]);

    // Якщо запит ще виконується або кешовані дані відсутні
    const isPending = cachedData?.status === 'pending';
    const isRejected = cachedData?.status === 'rejected';

    // Якщо дані успішно завантажені
    const students = cachedData?.status === 'fulfilled' && cachedData?.data ? cachedData.data.students : [];
    const student = students.find(o => o.id === +params.studID);

    return (
        <>
            {isPending && <>Pending...</>}
            {isRejected && <>Помилка завантаження даних. Спробуйте пізніше.</>}
            {student && (
                <>
                    <button
                        type="button"
                        className="btn btn-block"
                        onClick={() => {
                            navigate(`/ind-plans/${params.group}/${params.studID}`);
                        }}
                    >
                        до редагування
                    </button>

                    <DriveIframe id={student.IND_id} />

                </>
            )}
            {!isPending && !isRejected && !student && <>Студента не знайдено!</>}
        </>
    );
};

export default ViewStudentPage;
