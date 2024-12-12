import {Outlet, useNavigate, useParams} from "react-router-dom";
import { FaBookBookmark, FaMagnifyingGlass} from "react-icons/fa6";
import {FaEdit, FaList, FaLock} from "react-icons/fa";
import {userAPI} from "../store/apis/user.js";
import {getStudentsQuery} from "../queries/getStudentsQuery.js";
import {store} from "../store/index.js";

const GroupPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {user} = store.getState().userState
    // Формуємо аргументи для запиту
    const queryArgs = getStudentsQuery(user);

    // Отримуємо селектор для кешованих даних
    // const selectStudents = userAPI.endpoints.getStudents.select(queryArgs);
    // const cachedData = selectStudents(store.getState());

    const { data: cachedData, isSuccess } = userAPI.endpoints.getStudents.useQuery(queryArgs);

    const students = isSuccess && cachedData ? cachedData.students : [];
    // const students = cachedData?.status === 'fulfilled' && cachedData?.data ? cachedData.data.students : [];

    // const students = []

    const groupList = students.filter(o => o.group === params.group)

    const handleEditClick = (id) => {
        navigate(`/ind-plans/${params.group}/${id}`);
    };

    const handleViewClick = (id) => {
        navigate(`/ind-plans/${params.group}/${id}/view`);
    }

    return (
        <>

            {!params.studID ? (<div className="overflow-x-auto">
<GroupView
    onToListClick={()=>{navigate(`/ind-plans/${params.group}`)}}
    onToSubjectsClick={()=>{navigate(`/ind-plans/${params.group}/subjects`)}}
/>
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>ПІП</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {groupList.map((item, index) => (<tr key={item.id}>
                        <td>{index + 1}</td>
                        <th>{item.pip}</th>
                        <td>
                            <ButtonsLine
                                item={item}
                                onEditClick={() => handleEditClick(item.id)}
                                onViewClick={() => handleViewClick(item.id)}
                            />
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>) : <>
                <button
                    type={"button"}
                    className="btn btn-block"
                    onClick={()=>{navigate(`/ind-plans/${params.group}`)}}>До списку групи</button>
                <Outlet />
            </>}
        </>
    );
};

const GroupView = ({onToListClick, onToSubjectsClick}) => {
    return (
        <div className="flex justify-end">
            <div className="join">
                <button className="btn join-item" onClick={onToListClick}>
                    <FaList size={48} className="p-1"/>
                </button>
                <button className="btn join-item" onClick={onToSubjectsClick}>
                    <FaBookBookmark size={48} className="p-1"/>
                </button>
            </div>
        </div>
    )
}

const ButtonsLine = ({item, onEditClick, onViewClick}) => {
    return (
        <div className="flex justify-center">
        <div className="join">
            <button className="btn join-item" onClick={onViewClick}>
                <FaMagnifyingGlass className="h-full text-blue-500"/>
            </button>
            <button className="btn join-item" onClick={!item.status ? onEditClick : undefined}>{item.status
                ? <FaLock color="red"  />
                : <FaEdit color="green" />}</button>
        </div>
        </div>
    )
}

export default GroupPage;
