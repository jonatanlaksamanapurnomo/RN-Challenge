import * as React from 'react';
import {Text, View} from '../components/Themed';
import {StatusBar, ScrollView, StyleSheet} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import TaskItem from "../components/TaskItem";
import {FloatingAction} from "react-native-floating-action";
import {SwipeListView} from 'react-native-swipe-list-view';
import SwipeAction from "../components/SwipeAction";
import AddOverlay from "../components/AddOverlay";
import {useState, useEffect, useCallback} from "react";
import {getTasksByDate, deleteTodo, getTasks, updateTodo} from "../models/TodoModel";
import Colors from "../constants/Colors";

import moment from "moment";

const actions = [
    {
        text: "Add Task",
        name: "add_todo",
        position: 2,
        color: Colors.light.blue,
        icon: require("../assets/images/clipboard.png")
    }
];
export default function MainScreen() {
    const [modalVisible, setVisible] = useState<Boolean>(false);
    const [selectedDate, setDate] = useState<Date>(new Date());
    const [taskUpdate, setTaskUpdate] = useState<Boolean>(false);
    const [tasks, setTasks] = useState([])
    const [taskLists, setAllTaskLists] = useState([])

    const getTasksCallBacks = useCallback(() => {
        getTasksByDate().then((snap: any) => {
            setTasks(snap)
        })
    }, [taskUpdate])

    const getAllTask = useCallback(() => {
        getTasks().then((snap: any) => {
            // console.log(moment(snap[0].taskDate * 1000))
            let taskList: any = [];
            snap.forEach((item: any) => {
                taskList.push({
                    date: moment(item.taskDate * 1000),
                    // Random colors
                    style: {backgroundColor: Colors.light.calendar.dateColor},
                    textStyle: {color: 'black'}, // sets the font color
                    containerStyle: [], // extra styling for day container
                    allowDisabled: true, // allow custom style to apply to disabled dates
                })
            })
            setAllTaskLists(taskList)

        })
    }, [])


    useEffect(() => {
        getTasksCallBacks()
        getAllTask()
    }, [taskUpdate])

    const handleOnCloseModal = () => {
        setTaskUpdate(!taskUpdate)
        setVisible(false)
    }

    const handleFabClick = (name: String) => {
        if (name === "add_todo") {
            setVisible(true)
        }
    }
    const handleDateChange = (e: any) => {
        getTasksByDate(e).then((res: any) => {
            setTasks(res)
        })
        setDate(e.toDate())
    }
    const handleSwipe = ({direction, value, key}: any) => {
        if (direction === "left") {
            if (value >= 150) {
                deleteTodo(key).then(() => {
                    setTaskUpdate(!taskUpdate)
                })
            }
        } else {
            if (value <= -150) {
                updateTodo(key).then(() => {
                    setTaskUpdate(!taskUpdate)
                })
            }
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.calendarWrapper}>
                    <CalendarPicker
                        customDatesStyles={taskLists}
                        startFromMonday={true}
                        todayBackgroundColor={Colors.light.tint}
                        selectedDayColor={Colors.light.calendar.selectedColor}
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={handleDateChange}
                    />
                </View>
                <View style={styles.taskWrapper}>
                    <View style={styles.subSectionWrapper}>
                        <Text style={styles.title}>Today's Task</Text>
                    </View>
                    {tasks.length > 0 && (<View style={styles.taskListWrapper}>
                        <SwipeListView
                            data={tasks}
                            keyExtractor={(item: any, index) => item.id}
                            onSwipeValueChange={handleSwipe}
                            renderItem={(data) => (<TaskItem item={data.item}/>)}
                            renderHiddenItem={(data) => (<SwipeAction data={data}/>)}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                    </View>)}
                    {tasks.length <= 0 && (
                        <Text style={{textAlign: "center"}}>No Task's For Today</Text>
                    )}

                </View>
            </ScrollView>
            <FloatingAction
                color={Colors.light.blue}
                actions={actions}
                position="right"
                onPressItem={handleFabClick}
            />

            <AddOverlay modalVisible={modalVisible} selectedDate={selectedDate} onClose={handleOnCloseModal}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: "4%",
        marginTop: StatusBar.currentHeight,
        flexDirection: "row"
    },
    title: {
        paddingHorizontal: "5%",
        fontSize: 24,
        fontFamily: "bold",
    },
    calendarWrapper: {
        backgroundColor: "#FFF"
    },
    taskWrapper: {
        flex: 1,
        marginTop: "3%"
    },
    taskListWrapper: {
        marginTop: "3%"
    },
    subSectionWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%"
    },
    fabWrapper: {
        marginTop: "5%"
    },
    instruction: {
        fontSize: 8,
        color: "blue",
        fontFamily: "regular"
    }

});
