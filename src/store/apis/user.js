import {rootapi, commonQueryConfig} from "./root.js";
import {showErrorToast,showLoadingToast,showSuccessToast,dismissToast} from "../../utils/toastUtils.js";

export const userAPI = rootapi.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            providesTags: ['Roles'],
            query: (obj) => ({
                ...commonQueryConfig,
                body: JSON.stringify(obj),
            })
        }),
        getStudents: builder.query({
            providesTags: (result, error, arg) => {

                if (result?.students) {
                    // Повертаємо список тегів для кожного студента
                    return result.students.map((student) => ({ type: 'Student', id: student.id }));
                } else {
                    return ['Students']; // Загальний тег для списку студентів
                }
            },
            query: (obj) => ({
                ...commonQueryConfig,
                body: JSON.stringify(obj),
            }),
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
                let toastId;
                try {
                    await cacheDataLoaded;
                    toastId = showSuccessToast(null, 'Успішне ОНОВЛЕННЯ даних');
                } catch {
                    toastId = showErrorToast(null, 'При завантаженні виникла помилка');
                }
                await cacheEntryRemoved;
                if (toastId) {
                    dismissToast(toastId);
                }
            },
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                const id = showLoadingToast("Завантаження списку студентів ...");
                try {
                    await queryFulfilled;
                    showSuccessToast(id, { render: "Список студентів завантажено", type: "success", isLoading: false });
                } catch (err) {
                    showErrorToast(id, { render: "При завантаженні виникла помилка", type: "error", isLoading: false });
                } finally {
                    dismissToast(id);
                }
            },
        }),
        viewINP: builder.mutation({
            invalidatesTags: (result, error, arg) => {

                const {id} = arg
                return [{ type: 'Student', id }]
            },
            query: (arg) => {
                const {obj} = arg
                return {
                    ...commonQueryConfig,
                    body: JSON.stringify(obj),
                }
            },
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                const id = showLoadingToast("Оновлення ІНП ...");
                try {
                    const { data } = await queryFulfilled;
                    showSuccessToast(id, { render: `Оновлення успішне: ${data.message}`, type: "success", isLoading: false });
                } catch (err) {
                    const errorMessage = err.error?.message || "виникла помилка";
                    showErrorToast(id, { render: `Помилка: ${errorMessage}`, type: "error", isLoading: false });
                } finally {
                    dismissToast(id);
                }
            },
        }),
        updateStudentData: builder.mutation({
            invalidatesTags: (result, error, arg) => {
                const {id} = arg
                return [{ type: 'Student', id }]
            },
            query: (arg) => {
                const {obj} = arg
                return {
                    ...commonQueryConfig,
                    body: JSON.stringify(obj),
                }
            },
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                const id = showLoadingToast("Оновлення запису ...");
                try {
                    const { data } = await queryFulfilled;
                    showSuccessToast(id, { render: `Оновлення успішне: ${data.message}`, type: "success", isLoading: false });
                } catch (err) {
                    const errorMessage = err.error?.message || "виникла помилка";
                    showErrorToast(id, { render: `Помилка: ${errorMessage}`, type: "error", isLoading: false });
                } finally {
                    dismissToast(id);
                }
            },
        })
    })
})

