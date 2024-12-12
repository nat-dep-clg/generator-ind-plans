import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import Titulka from "../components/student/Titulka.jsx";
import Semester from "../components/student/Semester.jsx";
import {FaBookBookmark, FaMagnifyingGlass} from "react-icons/fa6";
import {FaList} from "react-icons/fa";
import {store} from "../store/index.js";
import {getStudentsQuery} from "../queries/getStudentsQuery.js";
import {userAPI} from "../store/apis/user.js";

const semestersByYear = {
    '1' : [1,2],
    '2' : [3,4],
    '3' : [5,6],
    '4' : [7,8],
}

const StudentPage = () => {
    const navigate = useNavigate();
    // const {students} = useLoaderData();
    const params = useParams();

    // const navigate = useNavigate();
    const {user} = store.getState().userState
    // Формуємо аргументи для запиту
    const queryArgs = getStudentsQuery(user);


    const { data: cachedData, isSuccess } = userAPI.endpoints.getStudents.useQuery(queryArgs);

    const students = isSuccess && cachedData ? cachedData.students : [];

    const student = students.filter(o => o.id === +params.studID)[0];
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">{student.pip}</h1>
                <div className="flex justify-end">
                    <div className="join">
                        <button className="btn join-item" onClick={()=>{
                            navigate(`/ind-plans/${params.group}`);
                        }}>
                            <FaList size={48} className="p-1"/>
                        </button>
                        <button
                            type="button"
                            className="btn  join-item"
                            onClick={() => {
                                navigate(`/ind-plans/${params.group}/${params.studID}/view`);
                            }}
                        >
                            <FaMagnifyingGlass className="h-full text-blue-500"/>
                        </button>
                    </div>
                </div>

            </div>

            <div className="collapse collapse-arrow">
                <input type="radio" name="student-ind-plan" defaultChecked/>
                <div className="collapse-title text-xl font-medium">Титулка</div>
                <div className="collapse-content">
                <Titulka data={student}/>
                </div>
            </div>

            {semestersByYear[student.group[0]].map(sem => (<div className="collapse collapse-arrow" key={sem}>
                    <input type="radio" name="student-ind-plan"/>
                    <div className="collapse-title text-xl font-medium">{sem}-й семестр</div>
                    <div className="collapse-content">
                        <Semester number={sem} data={student} />
                    </div>
                </div>

            ))}


        </>
    );
};


export default StudentPage;
