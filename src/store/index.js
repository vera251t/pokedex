import { configureStore } from "@reduxjs/toolkit";
import trainerName from './slices/trainerName.sclice'

export default configureStore({
    reducer: {
        trainerName
    }
})