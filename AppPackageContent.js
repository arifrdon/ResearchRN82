import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native'


import { SafeAreaView } from 'react-native-safe-area-context'
import Clipboard from '@react-native-clipboard/clipboard';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, addDays } from 'date-fns';
import { debounce } from "lodash";
import moment from 'moment';
import PropTypes from 'prop-types';
import { hierarchy, tree } from 'd3-hierarchy';
import axios from 'axios';
import Lottie from 'lottie-react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
// import Bugsnag from '@bugsnag/react-native'
// import BugsnagPerformance from '@bugsnag/react-native-performance'
import { Mixpanel } from "mixpanel-react-native";
import { configureStore } from '@reduxjs/toolkit'
import { Picker } from '@react-native-picker/picker';


import { ContainerStyles } from '../../assets'
import { LOTTIE_TYPING_INDICATOR } from './assets';


const AppPackageContent = () => {

    // States & variables
    const [copiedText, setCopiedText] = useState('');
    const [storedValue, setStoredValue] = useState(null);
    const [text, setText] = useState('');
    const [resultDebounce, setResultDebounce] = useState('');
    const [dataAxios, setDataAxios] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const netInfo = useNetInfo();
    const bsRef = useRef < BottomSheet > (null);
    const today = new Date();
    const nextWeek = addDays(today, 7);
    const myPropTypes = {
        name: PropTypes.string,
        age: PropTypes.number,
        // ... define your prop validations
    };
    const props = {
        name: 'hello', // is valid
        age: 'world', // not valid
    };

    const trackAutomaticEvents = false
    const mixpanel = new Mixpanel('Your Api Key', trackAutomaticEvents)
    mixpanel.init()
    mixpanel.setLoggingEnabled(true)

    // Handlers

    const handlerCloseBottomSheet = () => bsRef.current?.close();

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

    const checkPropTypes = () => {
        PropTypes.checkPropTypes(myPropTypes, props, 'prop', 'MyComponent');
    }

    const checkD3Hierarchy = () => {
        // Example data
        const data = {
            name: 'Root',
            children: [
                { name: 'Child A', children: [{ name: 'Grandchild A1' }, { name: 'Grandchild A2' }] },
                { name: 'Child B' },
            ],
        };

        // Convert to a D3 hierarchy
        const root = hierarchy(data);

        // Create a tree layout with a fixed size (x/y positions)
        const layout = tree().size([400, 200]);
        const treeData = layout(root);

        console.log('Hierarchy nodes:', treeData.descendants());
        console.log('Hierarchy links:', treeData.links());
    }

    const checkAxiosGet = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                console.log('Axios GET response:', response.data);
                setDataAxios(response.data);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    }

    const handlerOpenBs = (index) => () => {
        bsRef.current?.snapToIndex(0);
    }

    const checkBugsnag = () => {
        //note: enabling this must config bugsnag start on android & ios, also provide it with correct key
        // console.log("start bugsnag")
        // Bugsnag.start({
        //     apiKey: '00000000000000000000000000000000',
        //     endpoints: { notify: 'http://localhost', sessions: 'http://localhost' },
        //     autoTrackSessions: false,
        //     onError: (error) => console.log(error),

        // })
        // console.log('✅ Bugsnag initialized')
    }

    const checkBugsnagPerformance = () => {
        //note: enabling this must config bugsnag start on android & ios, also provide it with correct key
        // console.log("start bugsnag performance")
        // BugsnagPerformance.start({ 
        //     apiKey: '00000000000000000000000000000000', 
        //     onError: (error) => console.log(error),
        // })
        //  console.log("end bugsnag performance")
    }

    const checkMixPanel = () => {
        try {
            mixpanel.track('Sent Message')
            console.log('✅ Mixpanel track called successfully')

        } catch (err) {
            console.error('❌ Mixpanel error:', err)
        }
    }

    const checkReduxToolkit = () => {
        const store = configureStore({ reducer: (s = {}) => s })
        console.log('✅ Redux store:', !!store.dispatch)
    }
    // Listeners

    // Effects

    // Renders

    const renderBackdropFilter = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            onPress={() => {
                bsRef.current?.close();
            }}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
            <ScrollView>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@react-native-picker/picker</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@reduxjs/toolkit</Text>
                    <Button title={'Test console log @reduxjs/toolkit'} onPress={checkReduxToolkit} />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>mixpanel-react-native</Text>
                    <Button title={'Test console log mixpanel'} onPress={checkMixPanel} />
                </View>

                {/* <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@bugsnag/react-native-performance</Text>
                    <Button title={'Test log bugsnag'} onPress={checkBugsnagPerformance} />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@bugsnag/react-native</Text>
                    <Button title={'Test log bugsnag'} onPress={checkBugsnag} />
                </View> */}

                {/* <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@gorhom/bottom-sheet</Text>
                    <Button title={'open bottomsheet'} onPress={handlerOpenBs} />
                </View> */}

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@ptomasroos/react-native-multi-slider</Text>
                    <MultiSlider
                        values={[100]}
                        sliderLength={100}
                        min={1}
                        max={100}
                    />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>lottie-react-native</Text>
                    <Lottie
                        source={LOTTIE_TYPING_INDICATOR}
                        autoPlay
                        loop
                        style={{ height: 24, width: 64, alignSelf: 'center' }}
                    />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>axios</Text>
                    <Button title={'GET Request Axios'} onPress={checkAxiosGet} />
                    <Text>Axios Result: {JSON.stringify(dataAxios, null, 2)}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>d3-hierarchy</Text>
                    <Button title={'Check console.log d3-hierarchy'} onPress={checkD3Hierarchy} />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>prop-types</Text>
                    <Button title={'Check Failed Prop Types'} onPress={checkPropTypes} />
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>moment</Text>
                    <Text>Moment now: {moment(new Date()).format("YYYY-MM-DD")}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>lodash</Text>
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
                    <Text style={styles.textPackageName}>date-fns</Text>
                    <Text>{format(nextWeek, 'yyyy-MM-dd')}</Text>
                </View>

                <View style={styles.columnDiv}>
                    <Text style={styles.textPackageName}>@react-native-async-storage/async-storage</Text>
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
                    <Text style={styles.textPackageName}>@react-native-community/netinfo</Text>
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
                    <Text style={styles.textPackageName}>@react-native-masked-view/masked-view</Text>
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
                    <Text style={styles.textPackageName}>@react-native-clipboard/clipboard</Text>
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
            {/* <GestureHandlerRootView> //note: currently failed at 17-oct-2025
                <BottomSheet
                    ref={bsRef}
                    snapPoints={[200]}
                    backdropComponent={renderBackdropFilter}>
                    <BottomSheetView>
                        <Text>haloo</Text>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView> */}
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
    textPackageName: {
        fontWeight: 'bold', marginBottom: 6, textAlign: 'center'
    }
})

export default AppPackageContent