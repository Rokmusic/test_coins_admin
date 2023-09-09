import { FC } from 'react'
import { TTableDataTokensApprove } from './data'
import { Table } from '@/components/ui'
import TokensApproveTableBody from './components/TokensApproveTableBody'

const { Tr, Th, THead, TBody } = Table

interface ITokensApproveTable {
    dataTable: TTableDataTokensApprove
    headline: string
    withBtnDecline: boolean
}

const TokensApproveTable: FC<ITokensApproveTable> = ({
    dataTable,
    headline,
    withBtnDecline,
}) => {
    return (
        <div className={'mt-6'}>
            <h3 className={'mb-4'}>{headline}</h3>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Logo</Th>
                        <Th>Coin URL</Th>
                        <Th>Liquidity</Th>
                        <Th>Honeypot</Th>
                        <Th>CoinMarketcap</Th>
                        <Th>CoinGecko</Th>
                        <Th>Telegram</Th>
                        <Th>Twitter</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    <TokensApproveTableBody
                        dataTable={dataTable}
                        withBtnDecline={withBtnDecline}
                    />
                </TBody>
            </Table>
        </div>
    )
}

export default TokensApproveTable
