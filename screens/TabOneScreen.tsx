import * as React from 'react';
import {Text, View} from '../components/Themed';
import {StatusBar, ScrollView, StyleSheet, FlatList} from "react-native";
import task from "../assets/mockdata/task.js";
import CalendarPicker from "react-native-calendar-picker";
import TaskItem from "../components/TaskItem";
import {FloatingAction} from "react-native-floating-action";

const actions = [
    {
        text: "Add ToDo",
        name: "add_todo",
        position: 2,
        color: "#55BCF6"
    }
];
export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Hello Jo!!</Text>
                <View style={styles.calendarWrapper}>
                    <CalendarPicker
                        startFromMonday={true}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        minDate={new Date()}
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={(e) => {
                            console.log(e)
                        }}
                    />
                </View>
                <View style={styles.taskWrapper}>
                    <View style={styles.subSectionWrapper}>
                        <Text style={styles.title}>Your Task</Text>
                    </View>
                    <View style={styles.taskListWrapper}>
                        {task.map((item) => (<TaskItem key={item.id} item={item}/>))}
                    </View>
                </View>
            </ScrollView>
            <FloatingAction
                color="#55BCF6"
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: "4%",
        marginTop: StatusBar.currentHeight
    },
    title: {
        paddingHorizontal: "5%",
        fontSize: 24,
        fontFamily: "regular",
    },
    calendarWrapper: {
        backgroundColor: "#FFF",
        marginTop: "10%"
    },
    taskWrapper: {
        marginTop: "3%"
    },
    taskListWrapper: {
        marginTop: "3%"
    },
    subSectionWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "5%"
    },
    fabWrapper: {
        marginTop: "5%"
    }
});
