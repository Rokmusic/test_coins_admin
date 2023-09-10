import { useState, useMemo, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    Row,
} from '@tanstack/react-table'

import coinLogo from '@/assets/image/bitcoin.png'
import { Button } from '@/components/ui'
import AddEditFrom from './components/AddEditForm'
import ConfirmationModal from './components/ConfirmationModal'

type TTableDataDexSwaps = {
    name: string
    code: string
    iconSrc: string
}

const { Tr, Th, Td, THead, TBody } = Table

const tableData = (): TTableDataDexSwaps[] => {
    const arr = []
    for (let i = 0; i < 100; i++) {
        arr.push({
            name: `test name ${i}`,
            iconSrc: coinLogo,
            code: i + 'code',
        })
    }

    return arr
}

const totalData = tableData().length

const initialObjToEditAdd = {
    code: '',
    name: '',
    iconSrc: '',
    tradeUrl: '',
}

export type TInitialObjToEditAdd = {
    code: string
    name: string
    iconSrc: string
    tradeUrl: string
}

const DexSwapsTable = () => {
    const [toDeleteDex, setToDeleteDex] =
        useState<TTableDataDexSwaps['code']>('')
    const [isConfirm, setIsConfirm] = useState<boolean | undefined>(undefined)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const [dexDataToEditAdd, setDexDataToEditAdd] =
        useState<TInitialObjToEditAdd>(initialObjToEditAdd)

    useEffect(() => {
        setToDeleteDex('')
        setIsOpenModal(false)
        setIsConfirm(undefined)

        if (isConfirm) console.log(toDeleteDex, 'toDeleteDex')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfirm])

    const columns = useMemo<ColumnDef<TTableDataDexSwaps>[]>(
        () => [
            {
                header: 'Icon',
                accessorKey: 'iconSrc',
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Code',
                accessorKey: 'code',
            },
        ],
        []
    )

    const [data] = useState(() => tableData())

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onBtnDeleteClick = (row: Row<TTableDataDexSwaps>) => {
        console.log(row.getVisibleCells()[0].getValue(), '')

        const dexCodeToDelete = row
            .getVisibleCells()
            .filter((cell) => cell.column.id === 'code')[0]
            .getValue() as string

        setToDeleteDex(dexCodeToDelete)
        setIsOpenModal(true)
    }

    const onBtnEditClick = (row: Row<TTableDataDexSwaps>) => {
        const dexCode = row
            .getVisibleCells()
            .filter((cell) => cell.column.id === 'code')[0]
            .getValue() as string
        const dexName = row
            .getVisibleCells()
            .filter((cell) => cell.column.id === 'name')[0]
            .getValue() as string
        const dexIcon = row
            .getVisibleCells()
            .filter((cell) => cell.column.id === 'iconSrc')[0]
            .getValue() as string

        const objToEdit = {
            code: dexCode,
            name: dexName,
            iconSrc: dexIcon,
            tradeUrl: '',
        }

        setDexDataToEditAdd(objToEdit)
        setIsOpenModalEdit(true)
    }

    const onBtnNewDexClick = () => {
        setDexDataToEditAdd(initialObjToEditAdd)
        setIsOpenModalEdit(true)
    }

    return (
        <div className={'mt-4'}>
            <Button
                color={'green-600'}
                variant="twoTone"
                className={'mb-4'}
                onClick={onBtnNewDexClick}
            >
                New DEX
            </Button>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                            <Th>Actions</Th>
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    if (
                                        cell.column.id ===
                                        ('iconSrc' as keyof TTableDataDexSwaps)
                                    ) {
                                        const imageSrc = cell.getValue()
                                        return (
                                            <Td key={cell.id}>
                                                <img
                                                    src={imageSrc as string}
                                                    alt="icon"
                                                />
                                            </Td>
                                        )
                                    }
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                                <Td>
                                    <Button
                                        color={'blue-400'}
                                        variant="twoTone"
                                        onClick={() => onBtnEditClick(row)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className={'ml-2'}
                                        color={'red-400'}
                                        variant="twoTone"
                                        onClick={() => onBtnDeleteClick(row)}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
            </div>
            {isOpenModal && (
                <ConfirmationModal
                    setIsConfirm={setIsConfirm}
                    code={toDeleteDex}
                />
            )}
            {isOpenModalEdit && (
                <AddEditFrom
                    data={dexDataToEditAdd}
                    setIsOpenModalEdit={setIsOpenModalEdit}
                />
            )}
        </div>
    )
}

export default DexSwapsTable
