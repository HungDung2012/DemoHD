import path from './path';
import { RiDashboardLine } from "react-icons/ri";
import { BsHouseGearFill } from "react-icons/bs";

export const navigations = [
    {
        id: 1,
        path: '/',
        text: 'HOME',
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: 'ABOUT US',
    },
    {
        id: 3,
        path:  `/${path.OUR_AGENTS}`,
        text: 'OUR AGENTS',
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: 'PROPERTIES',
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: 'SEARCH',
    },
]

export const adminSidebar = [
    {
        id: 12,
        name: 'Dashboard',
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <RiDashboardLine />,
        type: 'SINGLE',
    },
    {
        id: 132,
        name: 'Property Types',
        icon: <BsHouseGearFill/>,
        type: 'PARENT',
        sub: [
            {
                id: 121,
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: 'Create new',
            },
            {
                id: 1231,
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
                name: 'Manage',
            },
        ],
    },
    
]