import { FC } from 'react'
import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
import { TOKEN_URL } from '@/constants/app.constant'

const { Tr, Th, Td, THead, TBody } = Table

const dataTable = [
    {
        type: 'Promoted Spot',
        tokenName: 'Candy Chain Coin (WCCC)',
        contract: '0x70A8546f70d404AFa13912CD4f35584f56fe03cc',
        status: 'Active',
        duration: 25,
        dateStart: dayjs(),
        dateEnd: dayjs(),
        renevue: 1242,
    },
    {
        type: 'Banner 600x240',
        tokenName: '',
        contract: '',
        status: 'Active',
        duration: 125,
        dateStart: dayjs(),
        dateEnd: dayjs(),
        renevue: 12242,
    },
    {
        type: 'Banner 1022x115',
        tokenName: '',
        contract: '',
        status: 'Ended',
        duration: 12,
        dateStart: dayjs(),
        dateEnd: dayjs(),
        renevue: 1222,
    },
]

const dataTableRender = () => {
    return dataTable.map((row) => {
        return (
            <Tr>
                <Td>
                    {row.type === 'Promoted Spot' ? (
                        <a
                            className={'underline'}
                            href={TOKEN_URL + row.contract}
                            target={'_blank'}
                        >
                            {row.tokenName}
                        </a>
                    ) : (
                        '-'
                    )}
                </Td>
                <Td>{row.status}</Td>
                <Td>{row.type}</Td>
                <Td>{row.duration} days</Td>
                <Td>{row.dateStart.format('DD.MM.YYYY')}</Td>
                <Td>{row.dateEnd.format('DD.MM.YYYY')}</Td>
                <Td>${row.renevue}</Td>
            </Tr>
        )
    })
}

const LatestPurchasesTable: FC = () => {
    return (
        <div className={'mt-6'}>
            <h3 className={'mb-4'}>Latest Purchases</h3>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Token</Th>
                        <Th>Status</Th>
                        <Th>Type</Th>
                        <Th>Duration</Th>
                        <Th>Date start</Th>
                        <Th>Date end</Th>
                        <Th>Renevue</Th>
                    </Tr>
                </THead>
                <TBody>{dataTableRender()}</TBody>
            </Table>
        </div>
    )
}

export default LatestPurchasesTable
