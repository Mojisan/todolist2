import './Main.css';
import { useState } from 'react';
/* import React, { useEffect } from 'react'; */

function Main() {
    const [data, setData] = useState({
        items : [],
        inputValue : '',
    });
    const [currentTime, setCurrentTime] = useState(new Date());

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
                <p className='task'>{item.task}</p>
            </div>
            <div className='icon'>
                <button className='check' onClick={() => updateStatus(item.id)}><i className="bi bi-check-lg"></i></button>
                <button className='bin' onClick={() => deleteData(item.id)}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    )


    const completedData = data.items.filter(item => item.status === 'completed');
    const mappedCompleted = completedData.map((item) =>
        <div className='completed'>
            <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80' alt='member1' className='image'/>
            <div>
                <p className='task'>{item.task}</p>
                <p className='time'>{item.time}</p>
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
        console.log(data);
    }

    return(
        <container>
            <section className='box1'>
                <h1 className='topic'>React Todo list app</h1>
                <form>
                    <fieldset>
                        <legend>Press Enter Add Regular Task</legend>
                        <input type='text' className='inputTask' value={data.inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    </fieldset>
                    <p className='description' id='description'></p>
                </form>
            </section>
            <section className='box2'>
                <h1>Remaining Task</h1>
                {mappedRemaining}
            </section>
            <section className='box3'>
                <h1>Completed Task</h1>
                {mappedCompleted}
            </section>
        </container>
    );
}

export default Main;