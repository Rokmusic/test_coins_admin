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

import { Button } from '@/components/ui'
import AddEditFrom from './components/AddEditForm'
import ConfirmationModal from './components/ConfirmationModal'

type TTableDataChains = {
    name: string
    code: string
    url: string
    explorerUrl: string
    fullChainName: string
}

const { Tr, Th, Td, THead, TBody } = Table

const tableData = (): TTableDataChains[] => {
    const arr = []
    for (let i = 0; i < 100; i++) {
        arr.push({
            name: `test name ${i}`,
            url: i + 'url',
            code: i + 'code',
            explorerUrl: i + 'explorerUrl',
            fullChainName: i + 'fullChainName',
        })
    }

    return arr
}

const totalData = tableData().length

const initialObjToEditAdd = {
    code: '',
    name: '',
    url: '',
    explorerUrl: '',
    fullChainName: '',
}

export type TInitialObjToEditAdd = typeof initialObjToEditAdd

const ChainsTable = () => {
    const [toDeleteItem, setToDeleteItem] =
        useState<TTableDataChains['code']>('')
    const [isConfirm, setIsConfirm] = useState<boolean | undefined>(undefined)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const [itemDataToEditAdd, setItemDataToEditAdd] =
        useState<TInitialObjToEditAdd>(initialObjToEditAdd)

    useEffect(() => {
        setToDeleteItem('')
        setIsOpenModal(false)
        setIsConfirm(undefined)

        if (isConfirm) console.log(toDeleteItem, 'toDeleteItem')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfirm])

    const columns = useMemo<ColumnDef<TTableDataChains>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Code',
                accessorKey: 'code',
            },
            {
                header: 'URL',
                accessorKey: 'url',
            },
            {
                header: 'Explorer URL',
                accessorKey: 'explorerUrl',
            },
            {
                header: 'Full chain name',
                accessorKey: 'fullChainName',
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

    const onBtnDeleteClick = (row: Row<TTableDataChains>) => {
        console.log(row.getVisibleCells()[0].getValue(), '')

        const itemCodeToDelete = row
            .getVisibleCells()
            .filter(
                (cell) => cell.column.id === ('code' as keyof TTableDataChains)
            )[0]
            .getValue() as string

        setToDeleteItem(itemCodeToDelete)
        setIsOpenModal(true)
    }

    const onBtnEditClick = (row: Row<TTableDataChains>) => {
        const itemCode = row
            .getVisibleCells()
            .filter(
                (cell) => cell.column.id === ('code' as keyof TTableDataChains)
            )[0]
            .getValue() as string
        const itemName = row
            .getVisibleCells()
            .filter(
                (cell) => cell.column.id === ('name' as keyof TTableDataChains)
            )[0]
            .getValue() as string
        const itemUrl = row
            .getVisibleCells()
            .filter(
                (cell) => cell.column.id === ('url' as keyof TTableDataChains)
            )[0]
            .getValue() as string
        const itemExplorerUrl = row
            .getVisibleCells()
            .filter(
                (cell) =>
                    cell.column.id === ('explorerUrl' as keyof TTableDataChains)
            )[0]
            .getValue() as string
        const itemFullChainName = row
            .getVisibleCells()
            .filter(
                (cell) =>
                    cell.column.id ===
                    ('fullChainName' as keyof TTableDataChains)
            )[0]
            .getValue() as string

        const objToEdit = {
            code: itemCode,
            name: itemName,
            url: itemUrl,
            explorerUrl: itemExplorerUrl,
            fullChainName: itemFullChainName,
        }

        setItemDataToEditAdd(objToEdit)
        setIsOpenModalEdit(true)
    }

    const onBtnNewItemClick = () => {
        setItemDataToEditAdd(initialObjToEditAdd)
        setIsOpenModalEdit(true)
    }

    return (
        <div className={'mt-4'}>
            <Button
                color={'green-600'}
                variant="twoTone"
                className={'mb-4'}
                onClick={onBtnNewItemClick}
            >
                Add chain
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
                                        ('iconSrc' as keyof TTableDataChains)
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
                                        className={'mt-2 lg:mt-0 lg:ml-2'}
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
                    code={toDeleteItem}
                />
            )}
            {isOpenModalEdit && (
                <AddEditFrom
                    data={itemDataToEditAdd}
                    setIsOpenModalEdit={setIsOpenModalEdit}
                />
            )}
        </div>
    )
}

export default ChainsTable
