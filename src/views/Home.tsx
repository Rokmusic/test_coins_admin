import RevenueCard from '@/components/blocks/cards/RevenueCard/RevenueCard'
import SalesReportChart from '@/components/blocks/charts/SalesReport'
import TokenSubmitsChart from '@/components/blocks/charts/TokenSubmits'
import LatestPurchasesTable from '@/components/blocks/tables/LatestPurchases'

const Home = () => {
    return (
        <div>
            <h2 className={'mb-8'}>Dashboard</h2>
            <div>
                <SalesReportChart />
            </div>
            <div>
                <TokenSubmitsChart />
            </div>
            <div className={'gap-6 flex mt-8 justify-around flex-wrap'}>
                <RevenueCard
                    revenue={13453}
                    count={185}
                    headline={'Month Revenue'}
                />
                <RevenueCard
                    revenue={453}
                    count={15}
                    headline={'Last Month Revenue'}
                />
            </div>
            <div>
                <LatestPurchasesTable />
            </div>
        </div>
    )
}

export default Home
