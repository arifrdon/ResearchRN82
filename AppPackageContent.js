import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native'
import { ContainerStyles } from '../../assets'

import { SafeAreaView } from 'react-native-safe-area-context'
import MaskedView from '@react-native-masked-view/masked-view';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, addDays } from 'date-fns';
import { debounce } from "lodash";

import Clipboard from '@react-native-clipboard/clipboard';


const AppPackageContent = () => {

    // States & variables
    const [copiedText, setCopiedText] = useState('');
    const [storedValue, setStoredValue] = useState(null);
    const [text, setText] = useState('');
    const [resultDebounce, setResultDebounce] = useState('');
    const netInfo = useNetInfo();
    const today = new Date();
    const nextWeek = addDays(today, 7);


    // Handlers
    const copyToClipboard = () => {
        Clipboard.setString('hello world');
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('test-key', "~data async storage~");
            alert(`Data saved successfully! ✅`);
        } catch (e) {
            alert(`Failed to save data: ${e.message} ❌`);
        }
    };

    const loadData = async () => {
        try {
            const value = await AsyncStorage.getItem('test-key');
            if (value !== null) {
                setStoredValue(value);
                alert('Data loaded successfully! ✅');
            } else {
                alert('No data found for the key. 🤷‍♂️');
                setStoredValue(null);
            }
        } catch (e) {
            alert(`Failed to load data: ${e.message} ❌`);
        }
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('test-key');
            alert('Data removed successfully! ✅');
            setStoredValue(null);
        } catch (e) {
            alert(`Failed to remove data: ${e.message} ❌`);
        }
    };

    const onBlurDebounce = () => {
        // console.warn(text)
        setResultDebounce(text)
    }


    // Listeners

    // Effects

    // Renders

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
            <ScrollView>

                <View style={styles.columnDiv}>

                </View>
                
                <View style={styles.columnDiv}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setText}
                        value={text}
                        onBlur={debounce(onBlurDebounce, 1000)}
                        submitBehavior='blurAndSubmit'
                    />
                    <Text>result: {resultDebounce}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <Text>{format(nextWeek, 'yyyy-MM-dd')}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <View>
                        <Button title="Save Data" onPress={saveData} />
                    </View>
                    <View>
                        <Button color={"green"} title="Load Data" onPress={loadData} />
                    </View>
                    <View>
                        <Button color={"purple"} title="Remove Data" onPress={removeData} />
                    </View>

                    <Text>Stored Value:</Text>
                    <Text>{storedValue || 'No data stored'}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <Text>NetInfo Package Status</Text>
                    <Text>
                        <Text>Is Connected:</Text> {netInfo.isConnected ? '✅ YES' : '❌ NO'}
                    </Text>
                    <Text>
                        <Text>Connection Type:</Text> {netInfo.type || 'N/A'}
                    </Text>
                    <Text>
                        <Text>Is Internet Reachable:</Text> {netInfo.isInternetReachable ? '✅ YES' : '❌ NO'}
                    </Text>

                    <Text>Raw NetInfo Data:</Text>
                    <Text>
                        {JSON.stringify(netInfo, null, 2)}
                    </Text>
                </View>

                <View style={styles.columnDiv}>
                    <MaskedView
                        style={{ flex: 1, flexDirection: 'row', height: 100 }}
                        maskElement={
                            <View
                                style={{
                                    // Transparent background because mask is based off alpha channel.
                                    backgroundColor: 'transparent',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 60,
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Basic Mask
                                </Text>
                            </View>
                        }
                    >
                        {/* Shows behind the mask, you can put anything here, such as an image */}
                        <View style={{ flex: 1, height: 100, backgroundColor: '#324376' }} />
                        <View style={{ flex: 1, height: 100, backgroundColor: '#F5DD90' }} />
                        <View style={{ flex: 1, height: 100, backgroundColor: '#F76C5E' }} />
                        <View style={{ flex: 1, height: 100, backgroundColor: '#e1e1e1' }} />
                    </MaskedView>
                </View>

                <View style={styles.columnDiv}>
                    <Button
                        title="Click here to copy to Clipboard"
                        onPress={copyToClipboard}
                    />
                    <Button
                        title="View copied text"
                        color="green"
                        onPress={fetchCopiedText}
                    />
                    <Text>{copiedText}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    columnDiv: {
        flex: 1, backgroundColor: '#ededed', borderRadius: 12, padding: 12, marginTop: 12
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default AppPackageContent