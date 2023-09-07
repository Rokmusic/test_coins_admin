import { FC } from 'react'

interface RevenueCardProps {
    revenue: number
    count: number
    headline: string
}

const RevenueCard: FC<RevenueCardProps> = ({ revenue, count, headline }) => {
    return (
        <div className={'flex flex-col items-center'}>
            <h6>{headline}</h6>
            <div className={'flex flex-col items-center p-4 text-2xl gap-1'}>
                <span className={'text-3xl'}>${revenue}</span>
                <span>{count} sales</span>
            </div>
        </div>
    )
}

export default RevenueCard
