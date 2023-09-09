import { FC } from 'react'
import Table from '@/components/ui/Table'
import { Button } from '@/components/ui'
import { TOKEN_URL } from '@/constants/app.constant'
import { TTableDataTokensApprove } from '../data'
import {
    CoinMarketcapSvg,
    CoingeckoSvg,
    TelegramSvg,
    TwitterSvg,
} from '@/assets/svg'

const { Tr, Td } = Table

interface ITableBody {
    dataTable: TTableDataTokensApprove
    withBtnDecline: boolean
}

const TokensApproveTableBody: FC<ITableBody> = ({
    dataTable,
    withBtnDecline,
}) => {
    const onBtnApproveClick = (coin: TTableDataTokensApprove[0]) => {
        console.log(coin, 'coin Approve')
    }

    const onBtnDeclineClick = (coin: TTableDataTokensApprove[0]) => {
        console.log(coin, 'coin Decline')
    }

    return (
        <>
            {dataTable.map((coin, idx) => (
                <Tr key={idx}>
                    <Td>
                        <img src={coin.logoSrc} alt={coin.name} />
                    </Td>
                    <Td>
                        <a
                            className={'underline'}
                            href={TOKEN_URL + coin.contract}
                            target={'_blank'}
                            rel="noreferrer"
                        >
                            {coin.name}
                        </a>
                    </Td>
                    <Td>
                        <span>${coin.liquidity}</span>
                    </Td>
                    <Td>
                        <span>{coin.honeypot ? 'Yes' : 'No'}</span>
                    </Td>
                    <Td>
                        <span>
                            {coin.coinMarketcap ? <CoinMarketcapSvg /> : ''}
                        </span>
                    </Td>
                    <Td>
                        <span>{coin.coinGecko ? <CoingeckoSvg /> : ''}</span>
                    </Td>
                    <Td>
                        {coin.telegramUrl.length ? (
                            <a href={coin.telegramUrl}>
                                <TelegramSvg />
                            </a>
                        ) : (
                            ''
                        )}
                    </Td>
                    <Td>
                        {coin.twitterUrl.length ? (
                            <a href={coin.twitterUrl}>
                                <TwitterSvg />
                            </a>
                        ) : (
                            ''
                        )}
                    </Td>
                    <Td>
                        <Button
                            className="mr-2 mb-2"
                            variant="twoTone"
                            color="green-600"
                            onClick={() => onBtnApproveClick(coin)}
                        >
                            Approve
                        </Button>
                        {withBtnDecline && (
                            <Button
                                className="mr-2 mb-2"
                                variant="twoTone"
                                color="red-600"
                                onClick={() => onBtnDeclineClick(coin)}
                            >
                                Decline
                            </Button>
                        )}
                    </Td>
                </Tr>
            ))}
        </>
    )
}

export default TokensApproveTableBody
