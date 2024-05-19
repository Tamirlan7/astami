import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPopupNotification} from "@/types/types.ts";


interface IState {
    popupNotification: IPopupNotification;
}

const initialState: IState = {
    popupNotification: {
        description: '',
        message: '',
        placement: 'topRight',
        type: 'info'
    },
};

const popupNotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        raisePopupNotification(state, action: PayloadAction<Partial<IPopupNotification>>) {
            /*
            * action.payload = {
            *   description: string,
            *   message: string,
            *   placement: string <- default value: topRight
            *   type: 'error' | 'info' | 'success' | 'warning' (check out antd documentation about notifications)
            * }
            * */

            if (action.payload?.description) {
                state.popupNotification.description = action.payload.description;
            }

            if (action.payload?.message) {
                state.popupNotification.message = action.payload.message;
            }

            if (action.payload?.placement) {
                state.popupNotification.placement = action.payload.placement;
            }

            if (action.payload?.type) {
                state.popupNotification.type = action.payload.type;
            }
        },
        resetPopupNotification(state) {
            state.popupNotification = {
                description: '',
                message: '',
                placement: 'topRight',
                type: 'info',
            };
        }
    }
});

export const {raisePopupNotification, resetPopupNotification} = popupNotificationSlice.actions;
export default popupNotificationSlice.reducer;
