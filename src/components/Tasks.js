import './Tasks.css';
import { useState } from 'react';
/* import React, { useEffect } from 'react'; */

function Tasks() {
    const [data, setData] = useState({
        items : [],
        inputValue : '',
    });

    const [users, setUsers] = useState({
        user : [],
        inputName : '',
        inputImage : null,
    });

    /* const [currentTime, setCurrentTime] = useState(new Date()); */

    /* useEffect = (() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    },[]); */

    const handleInputChange = (e) => {
        const newData = e.target.value;
        setData(prevData => ({
            ...prevData,
            inputValue : newData,
        }));
        if (newData.split('').length <= 4) {
            document.getElementById('description').innerHTML = "Must have Atleast 5 Character"
        }
        else {
            document.getElementById('description').innerHTML = ""
        }
    }

    const handleKeyDown = (e) => {
        const newData = {
            id : Date.now(),
            task : data.inputValue,
            status : 'remaining',
            time : '',
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            if (data.inputValue.split('').length > 4) {
                setData(prevData => ({
                    ...prevData,
                    items : [...prevData.items, newData],
                    inputValue : '',
                }));
            }
        }
    }

    const deleteData = (i) => {
        setData(prevData => ({
            ...prevData,
            items : prevData.items.filter(item => item.id !== i),
        }))
    }

    const remainingData = data.items.filter(item => item.status === 'remaining');
    const mappedRemaining = remainingData.map((item) =>
        <div className='remaining' key={item.id}>
            <div className='member'>
                <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80' alt='member1' className='image'/>
                <p className='task'>{item.task} add by {users.user[0].name}</p>
            </div>
            <div className='icon'>
                <button className='check icon-button' onClick={() => updateStatus(item.id)}><i className="bi bi-check-lg"></i></button>
                <button className='bin icon-button' onClick={() => deleteData(item.id)}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    )


    const completedData = data.items.filter(item => item.status === 'completed');
    const mappedCompleted = completedData.map((item) =>
        <div className='completed'>
            <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80' alt='member1' className='image'/>
            <div>
                <p className='task'>{item.task} add by {users.user[0].name}</p>
                <p className='time'>{item.time}Time</p>
            </div>
        </div>
    )

    const updateStatus = (i) => {
        /* const submitTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); */
        const changeStatus = data.items.map(item => {
            if (item.id === i) {
                return { ...item, status : 'completed', /* time : submitTime */}
            }
            return item;
        });
        setData({
            ...data,
            items : changeStatus
        })
    }
    
    const handleChangeUser = (e) => {
        const nameUser = e.target.value;
        setUsers(prevData => ({
            ...prevData,
            inputName : nameUser
        }))

        console.log(users)
    }

    /* const handleChangeImageUser = (e) => {
        const image = e.target.file[0]
        setUsers(prevData => ({
            ...prevData,
            inputImage : image
        }))
    } */

    const handleSubmitUser = (e) => {
        e.preventDefault();
        const newUser = {
            name : users.inputName,
            /* image : users.inputImage */
        }

        setUsers(prevData => ({
            ...prevData,
            user : [...prevData.user, newUser],
            inputName : '',
            /* image : null, */
        }))

        console.log(users);
    }

    return(
        <div className='todolist'>
            <container className="users-container">
                <section className='box0'>
                    <h1 className='topic topic-0'>User</h1>
                    <form className='adduser-form' onSubmit={handleSubmitUser}>
                        <label className='label-user'>Enter your name : 
                            <input type='text' className='inputName' value={users.inputName} onChange={handleChangeUser}/>
                        </label>
                        {/* <label className='label-user'>Add your profile image : 
                            <input type='file' className='inputImage' onChange={handleChangeImageUser}/>
                        </label> */}
                        <label className='label-user'>
                            <button type='submit' className='saveUser'>Save Profile</button>
                        </label>
                    </form>
                </section>
            </container>
            <container className="tasks-container">
                <section className='box1 tasks-section'>
                    <h1 className='topic-1 topic'>React Todo list app</h1>
                    <form className='addtask-form'>
                        <fieldset className='addtask-fieldset'>
                            <legend className='addtask-legend'>Press Enter Add Regular Task</legend>
                            <input type='text' className='inputTask' value={data.inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                        </fieldset>
                        <p className='description' id='description'></p>
                    </form>
                </section>
                <section className='box2 tasks-section'>
                    <h1 className='topic'>Remaining Task</h1>
                    {mappedRemaining}
                </section>
                <section className='box3 tasks-section'>
                    <h1 className='topic'>Completed Task</h1>
                    {mappedCompleted}
                </section>
            </container>
        </div>
    );
}

export default Tasks;