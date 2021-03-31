import React, {useState} from 'react';
import Overlay from 'react-native-modal-overlay';
import {TextInput, StyleSheet, TouchableOpacity} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Ionicons} from "@expo/vector-icons";
import {Text} from "./Themed";
import {addTodo} from "../models/TodoModel";


const AddOverlay = ({modalVisible, onClose, selectedDate}: any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<Boolean>(false);
    const [message, setMessage] = useState<String>("");
    const [finalDate, setFinalDate] = useState<Date>(selectedDate)
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleChangeText = (e: String) => {
        setMessage(e)
    }
    const handleConfirmHour = (date: Date) => {
        setFinalDate(date);
        hideDatePicker();
    };
    const handleCreateTask = () => {
        addTodo(message, selectedDate).then(res => {
            if (res) {
                onClose()
            }
        })
    }
    return (
        <Overlay visible={modalVisible} onClose={onClose} closeOnTouchOutside animationType="zoomIn"
                 containerStyle={styles.containerStyle}
                 childrenWrapperStyle={styles.childrenWrapperStyle}
                 animationDuration={500}>
            <Text style={styles.selectedDate}>Create ToDo
                for: {selectedDate.toString().split(" ").slice(0, 4).join(" ")}</Text>
            <TextInput onChangeText={handleChangeText} style={styles.textInputStyle} placeholder={"write here.."}/>
            <TouchableOpacity onPress={showDatePicker} style={styles.addBtnStyle}>
                <Ionicons name="time-outline" size={20} color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateTask} style={styles.addBtnStyle}>
                <Ionicons name="add-outline" size={20} color={"white"}/>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={selectedDate}
                is24Hour={true}
                onConfirm={handleConfirmHour}
                onCancel={hideDatePicker}
            />
        </Overlay>
    );
};

const styles = StyleSheet.create({
    selectedDate: {
        fontFamily: "regular",
        paddingHorizontal: "5%",
        marginBottom: "5%",
        backgroundColor: "#f2b722",
        color: "white",
        alignItems: "center"
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    childrenWrapperStyle: {
        flexWrap: "wrap",
        backgroundColor: '#eee',
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 20,
    },
    textInputStyle: {
        width: "100%",
        justifyContent: "center",
        borderRadius: 20,
        paddingVertical: "2%",
        borderWidth: 1,
        borderColor: "#C0C0C0",
        paddingHorizontal: 15,
    },
    addBtnStyle: {
        marginVertical: "5%",
        width: 30,
        height: 30,
        marginLeft: "2%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#55BCF6"
    }
})
export default AddOverlay;