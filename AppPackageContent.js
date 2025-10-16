import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ContainerStyles } from '../../assets'
import { SafeAreaView } from 'react-native-safe-area-context'

import Clipboard from '@react-native-clipboard/clipboard';


const AppPackageContent = () => {

    // States & variables
    const [copiedText, setCopiedText] = useState('');

    // Handlers
    const copyToClipboard = () => {
        Clipboard.setString('hello world');
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    // Listeners

    // Effects

    // Renders

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 12}}>
            <ScrollView>
                <View style={{flex: 1, backgroundColor: 'grey', borderRadius: 12, padding: 12}}>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Text>Click here to copy to Clipboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fetchCopiedText}>
                        <Text>View copied text</Text>
                    </TouchableOpacity>
                    <Text>{copiedText}</Text>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default AppPackageContent