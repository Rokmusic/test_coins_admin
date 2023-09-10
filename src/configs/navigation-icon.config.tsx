import {
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineAdjustments,
    HiOutlineBadgeCheck,
    HiOutlineLibrary,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    adManagment: <HiOutlineAdjustments />,
    tokensApprove: <HiOutlineBadgeCheck />,
    dexSwaps: <HiOutlineLibrary />,
}

export default navigationIcon
