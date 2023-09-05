import {createSlice} from "@reduxjs/toolkit";

// Redux toolkit cho phép định nghĩa state (VD: "pageIsError"), định nghĩa các reducers/action (VD: setPageIsError)
// ngay trong 1 file JS, cho phép code dễ bảo trì hơn

// định nghĩa giá trị khởi tạo của state
// các state chứa dữ liệu lấy từ API (server) về thì cần có state.status:
// init (-1): mới khởi tạo; success (0): lấy thành công dữ liệu từ API; error (1): có lỗi lấy dữ liệu
// state.data: dữ liệu lấy từ server về (nếu thành công)
const initialState = {
    convSelected: {},
    convList: [],
    msgList: []
};

// định nghĩa state name, reducers, actions
const slice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setConvSelectedStore: (state, action) => {
            console.log('setConvSelectedStore', action.payload)
            const conv = action.payload;
            state.convSelected = conv;
        },
        setConvListStore: (state, action) => {
            state.convList = action.payload;
        },
        unshiftItemToConvList: (state, action) => {
            state.convList.unshift(action.payload);
        },
        setMsgListStore: (state, action) => {
            state.msgList = action.payload;
        },
        pushItemToMsgList: (state, action) => {
            console.log('pushItemToMsgList', action.payload);
            state.msgList.push(action.payload);
        },

    }
});

// export state, actions, reducer để các components sử dụng
// lưu ý: quy định đặt tên giống như sample này để dễ hiểu, dễ bảo trì code
export const convSelectedState = (state) => state.chat.convSelected;
export const convListState = (state) => state.chat.convList;
export const msgListState = (state) => state.chat.msgList;
export const {
    setConvSelectedStore,
    setConvListStore,
    setMsgListStore,
    unshiftItemToConvList,
    pushItemToMsgList
} = slice.actions;
export default slice.reducer;
