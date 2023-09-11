import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { TInitialObjToEditAdd } from '../ChainsTable'
import { Button, Input } from '@/components/ui'
import { HiPlus } from 'react-icons/hi'
import useOnClickOutsideCustom from '@/components/ui/hooks/custom/useOnClickOutsideCustom'

interface IAddEditFrom {
    data: TInitialObjToEditAdd
    setIsOpenModalEdit: Dispatch<SetStateAction<boolean>>
}

const AddEditFrom: FC<IAddEditFrom> = ({ data, setIsOpenModalEdit }) => {
    const [dataState, setDataState] = useState<TInitialObjToEditAdd>(data)

    const modalRef = useRef<HTMLDivElement>(null)

    useOnClickOutsideCustom(modalRef, () => setIsOpenModalEdit(false))

    const onInputChange = (
        value: HTMLInputElement['value'],
        type: keyof TInitialObjToEditAdd
    ) => {
        setDataState((prev) => ({
            ...prev,
            [type]: (prev[type] = value),
        }))
    }

    const onBtnCloseClick = () => {
        setIsOpenModalEdit(false)
    }

    const onBtnSaveClick = () => {
        console.log(dataState, 'data to post')
    }

    return (
        <div className={'relative'}>
            <div
                ref={modalRef}
                className={
                    'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-3 bg-gray-700 min-w-[100%] lg:min-w-[30%]'
                }
            >
                <div>
                    {dataState.code ? (
                        <span className={'text-blue-600'}>Edit</span>
                    ) : (
                        <span className={'text-green-600'}>New</span>
                    )}{' '}
                    Chain{' '}
                    <span className={'text-white'}>
                        {dataState.name ? `- ${dataState.name}` : ''}
                    </span>
                </div>
                <div>
                    <label>
                        Name
                        <Input
                            value={dataState.name}
                            className={'mt-2'}
                            type="text"
                            onChange={(e) =>
                                onInputChange(e.target.value, 'name')
                            }
                        />
                    </label>
                    <label>
                        Code
                        <Input
                            value={dataState.code}
                            className={'mt-2'}
                            type="text"
                            onChange={(e) =>
                                onInputChange(e.target.value, 'code')
                            }
                        />
                    </label>
                    <label>
                        Trade URL
                        <Input
                            value={dataState.url}
                            className={'mt-2'}
                            type="text"
                            onChange={(e) =>
                                onInputChange(e.target.value, 'url')
                            }
                        />
                    </label>
                    <label>
                        Explorer URL
                        <Input
                            value={dataState.explorerUrl}
                            className={'mt-2'}
                            type="text"
                            placeholder={
                                'Example: https://bscscan.com/address/{address}'
                            }
                            onChange={(e) =>
                                onInputChange(e.target.value, 'explorerUrl')
                            }
                        />
                    </label>
                    <label>
                        Full chain name
                        <Input
                            value={dataState.fullChainName}
                            className={'mt-2'}
                            type="text"
                            onChange={(e) =>
                                onInputChange(e.target.value, 'fullChainName')
                            }
                        />
                    </label>
                </div>
                <div className={'flex justify-end'}>
                    <Button className={'mt-4'} onClick={onBtnSaveClick}>
                        Save
                    </Button>
                </div>
                <Button
                    size="xs"
                    icon={<HiPlus className={'rotate-45'} />}
                    className={'absolute top-2 right-1 lg:top-1'}
                    onClick={onBtnCloseClick}
                />
            </div>
        </div>
    )
}

export default AddEditFrom
