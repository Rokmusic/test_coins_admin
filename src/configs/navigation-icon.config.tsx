import {
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineAdjustments,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    adManagment: <HiOutlineAdjustments />,
}

export default navigationIcon
