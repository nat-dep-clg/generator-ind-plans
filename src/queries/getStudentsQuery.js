
export const getStudentsQuery = (user) => ({
    method: 'GET',
    payload: {
        action: user.role,
        values: {
            func: 'GROUPINFO',
            params: {
                role: user.role,
                email: user.email,
            },
        },
    },
});
