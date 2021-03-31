import firebase from "../config/firebase";

const db = firebase.firestore().collection('tasks');

const isSameDay = (firstTimeStamp, secondTimeStamp) => {
    return (new Date(firstTimeStamp).getDate() === (new Date(secondTimeStamp).getDate()))
}

const timeStampToDate = (timeStamp) => {
    return (new Date(timeStamp))
}

const getTasks = async (selectedDate = null) => {
    let tasks: any[] = [];
    let dateNow = new Date().setHours(0, 0, 0, 0)
    if (selectedDate !== null) {
        dateNow = Date.parse(selectedDate)
    }
    // console.log(dateNow)
    return await db.get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                if (isSameDay(doc.data().task_date.seconds * 1000, dateNow)) {
                    tasks.push({
                        id: doc.id,
                        taskDate: doc.data().task_date.seconds,
                        status: doc.data().status,
                        taskName: doc.data().task_name,
                    });
                }
            });
            return tasks;
        }).catch((e) => {
            new Error(e.message)
        });
}

const addTodo = async (task_name: String, task_date: any) => {
    const res = await db.add({
        task_name,
        task_date,
        status: true,
    });
    return res.id;
}

const deleteTodo = async (id: String) => {
    await db.doc(id).delete()
    return "sukses";
}

export {getTasks, addTodo, deleteTodo, timeStampToDate}