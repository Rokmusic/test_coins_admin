import {
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineAdjustments,
    HiOutlineBadgeCheck,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    adManagment: <HiOutlineAdjustments />,
    tokensApprove: <HiOutlineBadgeCheck />,
}

export default navigationIcon
