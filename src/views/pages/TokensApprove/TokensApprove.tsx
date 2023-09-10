import TokensApproveTable from '@/components/blocks/tables/TokensApprove/TokensApproveTable'
import {
    TTableDataTokensApprove,
    tableDataTokensApprove,
} from '@/components/blocks/tables/TokensApprove/data'
import { Button, Input } from '@/components/ui'
import { ChangeEvent, useEffect, useState } from 'react'

type TTabs = 'Waiting' | 'Declined'

const TokensApprove = () => {
    const [tab, setTab] = useState<TTabs>('Waiting')
    const [searchText, setSearchText] = useState<string>('')
    const [dataTableState, setDataTableState] =
        useState<TTableDataTokensApprove>([])

    useEffect(() => {
        if (!dataTableState.length && !searchText.length)
            setDataTableState(tableDataTokensApprove)
    }, [dataTableState, searchText.length])

    useEffect(() => {
        const filteredDataTable = tableDataTokensApprove.filter(
            (token) =>
                token.name.toLowerCase().includes(searchText.toLowerCase()) ||
                token.contract.toLowerCase().includes(searchText.toLowerCase())
        )

        return setDataTableState(filteredDataTable)
    }, [searchText])

    const onBtnTabClick = (tabName: TTabs) => {
        setTab(tabName)
    }

    const onInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    return (
        <div>
            <div className={'flex justify-center gap-4 mb-4'}>
                <Button
                    active={tab === 'Waiting'}
                    onClick={() => onBtnTabClick('Waiting' as TTabs)}
                >
                    Waiting
                </Button>
                <Button
                    active={tab === 'Declined'}
                    onClick={() => onBtnTabClick('Declined' as TTabs)}
                >
                    Declined
                </Button>
            </div>
            <div>
                <Input
                    value={searchText}
                    placeholder="Search by name/contract"
                    onChange={onInputSearchChange}
                />
            </div>
            {dataTableState && (
                <div>
                    {tab === 'Waiting' ? (
                        <TokensApproveTable
                            withBtnDecline
                            dataTable={
                                dataTableState as TTableDataTokensApprove
                            }
                            headline={'Waiting'}
                        />
                    ) : (
                        <TokensApproveTable
                            dataTable={
                                dataTableState as TTableDataTokensApprove
                            }
                            headline={'Declined'}
                            withBtnDecline={false}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default TokensApprove
