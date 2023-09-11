import {
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineAdjustments,
    HiOutlineBadgeCheck,
    HiOutlineLibrary,
    HiOutlineNewspaper,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    adManagment: <HiOutlineAdjustments />,
    tokensApprove: <HiOutlineBadgeCheck />,
    dexSwaps: <HiOutlineLibrary />,
    chains: <HiOutlineNewspaper />,
}

export default navigationIcon
