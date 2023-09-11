import { Button } from '@/components/ui'
import useOnClickOutsideCustom from '@/components/ui/hooks/custom/useOnClickOutsideCustom'
import { Dispatch, SetStateAction, FC, useRef } from 'react'

interface IConfirmatiotModal {
    setIsConfirm: Dispatch<SetStateAction<boolean | undefined>>
    code: string
}

const ConfirmationModal: FC<IConfirmatiotModal> = ({ setIsConfirm, code }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useOnClickOutsideCustom(modalRef, () => setIsConfirm(false))

    const onBtnConfirmClick = (answer: boolean) => {
        setIsConfirm(answer)
    }

    return (
        <div
            ref={modalRef}
            className={
                'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-3 bg-gray-600'
            }
        >
            <span>
                Confirm to Delete DEX - code{' '}
                <span className={'text-white'}>{code}</span>
            </span>
            <div className={'mt-2 flex'}>
                <Button
                    color={'green-400'}
                    variant="twoTone"
                    className={'mr-2'}
                    onClick={() => onBtnConfirmClick(true)}
                >
                    Yes
                </Button>
                <Button
                    color={'red-400'}
                    variant="twoTone"
                    onClick={() => onBtnConfirmClick(false)}
                >
                    No
                </Button>
            </div>
        </div>
    )
}

export default ConfirmationModal
