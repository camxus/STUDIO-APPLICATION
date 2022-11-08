import React from 'react'
import {Text, Incubator } from 'react-native-ui-lib'
import WheelPicker from 'react-native-ui-lib/src/incubator/WheelPicker'
import {Picker} from '@react-native-picker/picker'

function WheelPickerComponent({items, selected, setSelected}) {
    console.log(items)
    return (
        // <WheelPicker
        //     items={items}
        //     // initialValue={'yes'}
        //     onChange={(e) => setSelected(e.value)}
        // />
        <Picker
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) =>
                setSelected(itemValue)
        }>
            {items.map(item => (
                <Picker.Item label={item.label} value={item.label} />
            ))}
        </Picker>
    )
}

export default WheelPickerComponent