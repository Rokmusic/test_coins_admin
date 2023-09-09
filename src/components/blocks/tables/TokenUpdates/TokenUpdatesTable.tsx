import Table from '@/components/ui/Table'
import { dataTable } from '../LatestPurchases/data'
import TokenUpdatesTableBody from './components/TokenUpdatesTableBody'

const { Tr, Th, THead, TBody } = Table

const TokenUpdatesTable = () => {
    return (
        <div className={'mt-6'}>
            <h3 className={'mb-4'}>Token Updates</h3>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Coin</Th>
                        <Th>Update data</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    <TokenUpdatesTableBody dataTable={dataTable} />
                </TBody>
            </Table>
        </div>
    )
}
export default TokenUpdatesTable
