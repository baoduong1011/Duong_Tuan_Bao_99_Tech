interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const blockchainRecords: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  
  const getPriority = (blockchain: string): number => blockchainRecords[blockchain] ?? -99;
  
  const WalletPage: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => {
          const balancePriority = getPriority(balance.blockchain);
          return balancePriority > -99 && balance.amount > 0;
        })
        .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);
  
    const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  
    const rows = formattedBalances.map((balance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={balance.currency} 
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  
    return <div {...rest}>{rows}</div>;
  };
  