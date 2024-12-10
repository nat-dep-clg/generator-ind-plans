import { createSelector } from 'reselect';
import {userAPI} from "../store/apis/user.js";
import {getStudentsQuery} from "../queries/getStudentsQuery.js";

// Базовий селектор для отримання userState
const selectUserState = (state) => state.userState;

// Меморізований селектор для отримання даних студентів з кешу
export const selectStudentsData = createSelector(
    [selectUserState, (state) => state], // додаємо state як аргумент
    (userState, state) => {
        const { user } = userState;

        // Формуємо аргументи для запиту
        const queryArgs = getStudentsQuery(user);

        // Використовуємо функцію select для отримання результатів
        const selectStudents = userAPI.endpoints.getStudents.select(queryArgs);

        // Повертаємо результат виклику
        return selectStudents(state);
    }
);
