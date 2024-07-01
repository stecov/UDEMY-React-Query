import { queryKeys } from "./constants"

export const generateUserKey = (userId: number) => {
    // deliberately exclude the userToken from the dependency array
    return [queryKeys.user, userId];
}

export const generateUserAppointmentsKey = (userId: number, userToken: string) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken];
}