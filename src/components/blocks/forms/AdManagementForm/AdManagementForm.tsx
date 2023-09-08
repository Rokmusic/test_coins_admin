import { Avatar, Button, Input, Select, Upload } from '@/components/ui'
import { useState, ChangeEvent, useRef } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { SingleValue } from 'react-select'

const adOptions = [
    { value: 'promotedSpot', label: 'Promoted spot' },
    { value: 'bannerS', label: 'Banner 600x240' },
    { value: 'bannerM', label: 'Banner 1022x115' },
]

const durationOptions = [
    { value: '1day', label: '1 day' },
    { value: '3days', label: '3 days' },
    { value: '7days', label: '7 days (1 week)' },
    { value: '14days', label: '14 days (2 week)' },
    { value: '30days', label: '30 days (1 month)' },
]

type TAdOptions = typeof adOptions
type TAdOption = TAdOptions[0]
type TDurationOptions = typeof durationOptions

const AdManagementForm = () => {
    const [adOption, setAdOption] = useState<TAdOption | null>(null)
    const [durationOption, setDurationOption] = useState<
        TDurationOptions[0] | null
    >(null)
    const [price, setPrice] = useState<string>('')
    const [bannerImg, setBannerImg] = useState<string | null>(null)
    const [contract, setContract] = useState<string>('')

    const inputLabelTypeRef = useRef<HTMLLabelElement>(null)
    const inputLabelDurationRef = useRef<HTMLLabelElement>(null)
    const inputLabelPriceRef = useRef<HTMLLabelElement>(null)
    const inputLabelContractRef = useRef<HTMLLabelElement>(null)
    const inputLabelBannerRef = useRef<HTMLLabelElement>(null)

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            setBannerImg(URL.createObjectURL(files[0]))
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

    const onSelectAdOptionChange = (newValue: SingleValue<TAdOption>) => {
        if (!newValue) return
        return setAdOption(newValue)
    }

    const onSelectDurationOptionChange = (newValue: SingleValue<TAdOption>) => {
        if (!newValue) return
        return setDurationOption(newValue)
    }

    const onInputPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }

    const onInputContractChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContract(e.target.value)
    }

    const onAddPromotionClick = () => {
        const promotionToPost =
            adOption?.value === 'promotedSpot'
                ? {
                      type: adOption?.value,
                      duration: durationOption,
                      price: price,
                      contract: contract,
                  }
                : {
                      type: adOption?.value,
                      duration: durationOption,
                      price: price,
                      banner: bannerImg,
                  }

        for (const prop in promotionToPost) {
            const valueOfKey =
                promotionToPost[prop as keyof typeof promotionToPost]
            if (!valueOfKey) {
                const emptyInputRef = getRefByKey(prop)
                emptyInputRef?.current?.click()
                return
            }
        }

        console.log(promotionToPost, 'promotionToPost')
    }

    const getRefByKey = (objKey: string) => {
        switch (objKey) {
            case 'type':
                return inputLabelTypeRef
            case 'contract':
                return inputLabelContractRef
            case 'duration':
                return inputLabelDurationRef
            case 'price':
                return inputLabelPriceRef
            case 'banner':
                return inputLabelBannerRef
        }
    }

    return (
        <div className={'lg:max-w-[60%]'}>
            <div className={'mb-3'}>
                <label ref={inputLabelTypeRef} className={'cursor-pointer'}>
                    Type
                    <Select
                        value={adOption}
                        options={adOptions}
                        placeholder="Select type"
                        className={'mt-2'}
                        onChange={onSelectAdOptionChange}
                    ></Select>
                </label>
            </div>
            <div className={'mb-3'}>
                <label ref={inputLabelDurationRef} className={'cursor-pointer'}>
                    Duration
                    <Select
                        value={durationOption}
                        options={durationOptions}
                        placeholder="Select Duration"
                        className={'mt-2'}
                        onChange={onSelectDurationOptionChange}
                    ></Select>
                </label>
            </div>
            <div className={'mb-3'}>
                <label ref={inputLabelPriceRef} className={'cursor-pointer'}>
                    Price in USD
                    <Input
                        value={price}
                        placeholder="Price in USD"
                        className={'mt-2'}
                        onChange={onInputPriceChange}
                    />
                </label>
            </div>
            {adOption && adOption.value !== 'promotedSpot' ? (
                <div className={'mb-3'}>
                    <label
                        ref={inputLabelBannerRef}
                        className="cursor-pointer block w-fit max-w-[360px]"
                    >
                        Setup banner
                        <Upload
                            className="cursor-pointer block w-fit mt-2"
                            showList={false}
                            uploadLimit={1}
                            beforeUpload={beforeUpload}
                            onChange={onFileUpload}
                        >
                            {bannerImg && (
                                <Avatar
                                    className={'aspect-[5/2] w-[360px] h-auto'}
                                    src={bannerImg as string}
                                    icon={<HiOutlinePlus />}
                                />
                            )}
                        </Upload>
                    </label>
                </div>
            ) : (
                <div className={'mb-3'}>
                    <label ref={inputLabelContractRef}>
                        Coin Contract Address
                        <Input
                            value={contract}
                            placeholder="Contract Address"
                            className={'mt-2'}
                            onChange={onInputContractChange}
                        />
                    </label>
                </div>
            )}
            <Button
                className="mr-2 mb-2"
                variant="twoTone"
                color="green-600"
                onClick={onAddPromotionClick}
            >
                Add Promotion
            </Button>
        </div>
    )
}

export default AdManagementForm
