import * as React from 'react';
import {Text} from "./Themed";
import Overlay from 'react-native-modal-overlay';
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {addTodo} from "../models/TodoModel";
import {Ionicons} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditOverlay = ({isVisible, onClose}: any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<Boolean>(false);
    const [message, setMessage] = useState<String>("");
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
        hideDatePicker();
    };
    const handleCreateTask = () => {
        // addTodo(message, selectedDate).then(res => {
        //     if (res) {
        //         onClose()
        //     }
        // })
    }
    return (
        <Overlay visible={isVisible} onClose={onClose} closeOnTouchOutside animationType="zoomIn"
                 containerStyle={styles.containerStyle}
                 childrenWrapperStyle={styles.childrenWrapperStyle}
                 animationDuration={500}>

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
                is24Hour={true}
                onConfirm={handleConfirmHour}
                onCancel={hideDatePicker}
            />
        </Overlay>

    );
};
const styles = StyleSheet.create({
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
export default EditOverlay;