import firebase from "../config/firebase";

const db = firebase.firestore().collection('tasks');


const getTasks = async (selectedDate = null) => {
    let tasks: any[] = [];

    return await db.get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                tasks.push({
                    id: doc.id,
                    taskDate: doc.data().task_date,
                    status: doc.data().status,
                    taskName: doc.data().task_name,
                });
            });

            if (selectedDate !== null) {
                return [];
            } else {
                return tasks
            }

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

export {getTasks, addTodo, deleteTodo}