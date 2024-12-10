import React, {useEffect, useMemo} from 'react';
import {useState} from "react";
import {Outlet, useLoaderData, useNavigate, useParams} from "react-router-dom";


const CuratorContent = () => {
    const {students} = useLoaderData()
    const [group, setGroup] = useState('');

    const navigate = useNavigate();
    const { group: paramGroup } = useParams();

    const groups = useMemo(() => (
        students ? [...new Set(students.map(o => o.group))].sort() : []
    ), [students]);

    useEffect(() => {
        if (paramGroup && paramGroup !== group) {
            setGroup(paramGroup);
        }
    }, [paramGroup, group]);

    if (groups.length === 0) return <> Не має даних!</>;



    const handleGroupClick = (gr) => {
        setGroup(group);
        navigate(`/ind-plans/${gr}`);
    };

    return (
        <>
            <div role="tablist" className="tabs tabs-lifted">
                {groups.map((group) => {
                    return (
                        <React.Fragment key={group}>
                            <input type="radio"
                                   name="my_tabs_2"
                                   role="tab"
                                   className={`tab ${group === paramGroup && 'tab-active text-primary [--tab-bg:yellow] [--tab-border-color:orange]'}`}
                                   aria-label={`${group}`}
                                   value={group}
                                   checked={group === paramGroup}
                                   onChange={() => handleGroupClick(group)}
                                   style={{width: '100px'}}
                            />
                            {group === paramGroup && (
                                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                                    <Outlet />
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>



        </>

    );
};

export default React.memo(CuratorContent);
