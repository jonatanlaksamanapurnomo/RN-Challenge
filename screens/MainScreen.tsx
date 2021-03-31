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
import {getTasks, deleteTodo} from "../models/TodoModel";


const actions = [
    {
        text: "Add Task",
        name: "add_todo",
        position: 2,
        color: "#55BCF6",
        icon: require("../assets/images/clipboard.png")
    }
];
export default function MainScreen() {
    const [modalVisible, setVisible] = useState<Boolean>(false);
    const [selectedDate, setDate] = useState<Date>(new Date());
    const [taskUpdate, setTaskUpdate] = useState<Boolean>(false);
    const [tasks, setTasks] = useState([])
    const getTasksCallBacks = useCallback(() => {
        getTasks().then(snap => {
            setTasks(snap)
        })
    }, [])

    useEffect(() => {
        getTasksCallBacks()
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
        getTasks(e).then((res: any) => {
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
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.calendarWrapper}>
                    <CalendarPicker
                        startFromMonday={true}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={handleDateChange}
                    />
                </View>
                <View style={styles.taskWrapper}>
                    <View style={styles.subSectionWrapper}>
                        <Text style={styles.title}>Your Task</Text>
                    </View>
                    <View style={styles.taskListWrapper}>
                        <SwipeListView
                            data={tasks}
                            keyExtractor={(item, index) => item.id}
                            onSwipeValueChange={handleSwipe}
                            renderItem={(data) => (<TaskItem item={data.item}/>)}
                            renderHiddenItem={(data) => (<SwipeAction/>)}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                    </View>
                </View>
            </ScrollView>
            <FloatingAction
                color="#55BCF6"
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
        paddingVertical: "4%",
        marginTop: StatusBar.currentHeight,
        flexDirection: "column"
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
