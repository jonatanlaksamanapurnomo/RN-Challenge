import * as  React from 'react';
import {View} from "./Themed";
import {StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const SwipeAction = () => {
    const handleDelete = () => {
        console.log("Delete")
    }

    const handleDone = () => {
        console.log("Done")
    }
    return (
        <View style={styles.rowBack}>
            <View>
                <Ionicons onPress={handleDelete} style={styles.deleteIcon} name="trash-outline" size={15}/>
            </View>
            <View>
                <Ionicons onPress={handleDone} style={styles.doneIcon} name="checkmark-done-outline" size={15}/>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#E8EAED',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: "10%",
        paddingVertical: "10%"
    },
    deleteIcon: {
        color: 'red',
    },
    doneIcon: {
        color: 'green',
    },
})

export default SwipeAction;