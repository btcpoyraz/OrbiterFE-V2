import { ref, reactive } from './'

const defaultArbitrationData = {
    haxOptions: [
        {label: '0x69d3d70077e9...a130007eth17', value: '0x09d80949728054cf5c971abb31b681b3dfb4d4b3b43d2670f020323d319437b6'},
        {label: '0x69d3d70077e9...a130007eth18', value: '0x09d80949728054cf5c971abb31b681b3dfb4d4b3b43d2670f020323d319437b7'},
        {label: '0x69d3d70077e9...a130007eth19', value: '0x09d80949728054cf5c971abb31b681b3dfb4d4b3b43d2670f020323d319437b8'},
    ]
}
export const haxItem = ref('0x09d80949728054cf5c971abb31b681b3dfb4d4b3b43d2670f020323d319437b6')
export const arbitrationData = reactive({...defaultArbitrationData})
export const isConfirm = ref(false)
export const detailStatus = ref(1)
export const isWithdraw = ref(true)
