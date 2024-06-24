import { CartDTO } from '../types/dtos';
import { NotificationState, User } from '../types/types';
import { createContext } from 'react';


export const defaultNotificationState: NotificationState = {
    text: "",
    type: "INFO",
    show: false
}

export const defaultOrderState: CartDTO = {
    items: []
}

export const defaultUserState: User = {
    id: -1,
    email: "",
    firstName: "",
    lastName: "",
    dateJoined: '2024-05-30T05:01:25.000Z',
    subscribingTo: [],
}

export const AppContext = createContext({
    user: defaultUserState,
    notification: defaultNotificationState,
    setUser: (user: any) => {},
    setNotification: (notification: any) => {}
});

export const UserContext = createContext({
    user: defaultUserState,
    setUser: (user: any) => {},
});

export const NotificationContext = createContext({
    notification: defaultNotificationState,
    setNotification: (notification: any) => {},
});

export const OrderContext = createContext({
    order: defaultOrderState,
    setOrder: (order: any) => {},
});
  