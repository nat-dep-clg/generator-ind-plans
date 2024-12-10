import {FaList} from "react-icons/fa";
import {FaBookBookmark} from "react-icons/fa6";
import {useNavigate, useParams} from "react-router-dom";


const GroupSubjectsPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <>
            <GroupView
                onToListClick={()=>{navigate(`/ind-plans/${params.group}`)}}
                onToSubjectsClick={()=>{navigate(`/ind-plans/${params.group}/subjects`)}}
            />
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

export default GroupSubjectsPage;
