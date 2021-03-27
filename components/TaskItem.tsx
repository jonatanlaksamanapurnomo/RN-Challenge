import * as  React from 'react';
import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {useState} from "react";

const TaskItem = ({item}) => {
    let [visible, setVisible] = useState(false);
    const handleOnTouchHeader = () => {
        setVisible(!visible)
    }
    return (
        <View style={styles.itemContainer}>
            <View onTouchStart={handleOnTouchHeader} style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={[styles.square, {backgroundColor: item.id % 2 === 0 ? "#55BCF6" : "orange"}]}></View>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <View style={styles.circular}></View>
            </View>
            <View style={[styles.itemDetail, {display: visible ? "flex" : "none"}]}>
                <Text style={styles.itemText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                    delectus dolore, dolores
                    eaque expedita modi non quas quo quos tenetur.</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 20,
        paddingHorizontal: "5%"
    },
    item: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

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
        backgroundColor: "#fff",
        borderRadius: 10,
    }
});

export default TaskItem;