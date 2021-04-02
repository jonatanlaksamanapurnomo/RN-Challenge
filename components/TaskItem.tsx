import * as  React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Button} from "react-native";
import {useState} from "react";
import {timeStampToDate} from "../models/TodoModel";
import EditOverlay from "../components/EditOverlay";

const TaskItem = ({item}: any) => {
    let [visible, setVisible] = useState(false);
    let [modalEditStatus, setModalEdit] = useState(false);
    const handleOnTouchHeader = () => {
        setVisible(!visible)
    }
    const handleOnLongPress = () => {
        setModalEdit(true)
    }
    const handleOnCloseModal = () => {
        setModalEdit(false)
    }
    return (
        <TouchableHighlight activeOpacity={0.6}
                            onLongPress={handleOnLongPress} underlayColor="#DDDDDD" onPress={handleOnTouchHeader}
                            style={styles.item}>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <View style={[styles.square, {backgroundColor: item.status ? "#55BCF6" : "green"}]}></View>
                    <Text style={styles.itemText}>{item.taskName}</Text>
                </View>
                <View style={[styles.itemDetail, {display: visible ? "flex" : "none"}]}>
                    <Text style={styles.itemText}>{timeStampToDate(item.taskDate * 1000).toDateString()}</Text>
                </View>
                <EditOverlay isVisible={modalEditStatus} dataId={item.id} onClose={handleOnCloseModal}/>
            </View>
        </TouchableHighlight>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        paddingHorizontal: "5%"
    },
    item: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 30,
        marginBottom: "5%",

    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '100%',
        fontFamily: "regular"
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    itemDetail: {
        marginTop: "5%",
        backgroundColor: "#fff",
        borderRadius: 10,
    }
});

export default TaskItem;