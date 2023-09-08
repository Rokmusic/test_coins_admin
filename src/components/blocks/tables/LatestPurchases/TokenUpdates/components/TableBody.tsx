import { FC } from 'react'
import { TDataTable } from '../data'
import Table from '@/components/ui/Table'
import { Button, Tooltip } from '@/components/ui'
import { TOKEN_URL } from '@/constants/app.constant'
import { ReactElement } from 'react-markdown/lib/react-markdown'
const { Tr, Td } = Table

const updateDataRender = (coin: TDataTable[0]) => {
    const toUpdateNodes: React.ReactNode[] = []

    const toUpdateCoinData = coin.toUpdate
    const updateNameItem = toUpdateCoinData.name
    const updateLogoItem = toUpdateCoinData.logoSrc
    const updateAboutItem = toUpdateCoinData.about

    if (updateLogoItem.length) {
        const imgNewLogo = (
            <img src={updateLogoItem} alt={updateNameItem || 'coin logo'} />
        )
        const updateItemNode = (
            <div key={updateNameItem}>
                <Tooltip title={imgNewLogo}>
                    <span className="cursor-pointer">Logo</span>
                </Tooltip>
            </div>
        )
        toUpdateNodes.push(updateItemNode)
    }

    if (updateAboutItem.length) {
        const updateItemNode = (
            <div key={updateAboutItem}>
                <Tooltip
                    // isOpen={true}
                    placement={'bottom'}
                    className={
                        'whitespace-break-spaces overflow-y-scroll min-w-[380px] max-h-[300px] lg:overflow-y-hidden lg:min-w-auto lg:max-w-[60%] lg:max-h-max'
                    }
                    title={updateAboutItem}
                >
                    <span className="cursor-pointer">Description</span>
                </Tooltip>
            </div>
        )
        toUpdateNodes.push(updateItemNode)
    }

    for (const prop in toUpdateCoinData) {
        if (prop !== 'logoSrc' && prop !== 'about') {
            const updateItemNode = (
                <div key={prop}>
                    <span key={prop}>{prop}: </span>
                    <span className={'text-white'}>
                        {
                            toUpdateCoinData[
                                prop as keyof TDataTable[0]['toUpdate']
                            ]
                        }
                    </span>
                </div>
            )
            toUpdateNodes.push(updateItemNode)
        }
    }

    return toUpdateNodes
}

const btnsControlRender = (coin: TDataTable[0]) => {
    const controlsNodes: React.ReactNode[] = []

    const controlItem = (
        <div key={coin.tokenName}>
            <div>
                <Button
                    onClick={() => onBtnApproveClick(coin.toUpdate)}
                    className="mr-2 mb-2"
                    variant="twoTone"
                    color="green-600"
                >
                    Approve
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => onBtnDeleteClick(coin.contract)}
                    className="mr-2 mb-2"
                    variant="twoTone"
                    color="red-600"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
    controlsNodes.push(controlItem)

    return controlsNodes
}

const onBtnDeleteClick = (contract: TDataTable[0]['contract']) => {
    console.log(contract, 'contract')
}

const onBtnApproveClick = (dataToUpdate: TDataTable[0]['toUpdate']) => {
    console.log(dataToUpdate, 'dataToUpdate')
}

interface ITableBody {
    dataTable: TDataTable
}

const TableBody: React.FC<ITableBody> = ({ dataTable }) => {
    return (
        <>
            {dataTable.map((coin, idx) => (
                <Tr key={idx}>
                    <Td>
                        <a
                            className={'underline'}
                            href={TOKEN_URL + coin.contract}
                            target={'_blank'}
                        >
                            {coin.tokenName}
                        </a>
                    </Td>
                    <Td>{updateDataRender(coin)}</Td>
                    <Td>{btnsControlRender(coin)}</Td>
                </Tr>
            ))}
        </>
    )
}

export default TableBody
