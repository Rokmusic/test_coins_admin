import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { TInitialObjToEditAdd } from '../DexSwapsTable'
import { Avatar, Button, Input, Upload } from '@/components/ui'
import { HiOutlinePlus, HiPlus } from 'react-icons/hi'
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

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            onInputChange(URL.createObjectURL(files[0]), 'iconSrc')
        }
    }

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
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
                    Edit Dex{' '}
                    <span className={'text-white'}>
                        {dataState.name ? `- ${dataState.name}` : ''}
                    </span>
                </div>
                <div>
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
                    <div className={'mt-2'}>
                        <div>Icon</div>
                        <Upload
                            multiple
                            className="cursor-pointer"
                            showList={false}
                            uploadLimit={1}
                            beforeUpload={beforeUpload}
                            onChange={onFileUpload}
                        >
                            <Avatar
                                size={100}
                                src={dataState.iconSrc}
                                icon={<HiOutlinePlus />}
                            />
                        </Upload>
                    </div>
                    <label>
                        Trade URL
                        <Input
                            value={dataState.tradeUrl}
                            className={'mt-2'}
                            type="text"
                            onChange={(e) =>
                                onInputChange(e.target.value, 'tradeUrl')
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
                    className={'absolute top-1 right-1'}
                    onClick={onBtnCloseClick}
                />
            </div>
        </div>
    )
}

export default AddEditFrom
