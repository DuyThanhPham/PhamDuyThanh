interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string; // add type for blockchain property
}

// don't need FormattedWalletBalance interface because we going to calculate formatted value directly below

// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface Props extends BoxProps {
  children: React.ReactNode; // add type for children component
}

// This function can be separated into a separate file and reused in many places, for example in the folder utility
const getPriority = (blockchain?: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // I haven't seen children use it anywhere, so if you don't use it, you can remove it.
  const balances = useWalletBalances();
  const prices = usePrices();

  // write more concise  
  // don't need put prices into dependencies array because the result value not belong with prices value, it could lead to re-calculate unnecessary
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]); 

  //   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //     return {
  //       ...balance,
  //       formatted: balance.amount.toFixed(),
  //     };
  //   });

  // can calculate formattedAmount value directly instead use function above and use directly in HTML instead of save in a variable

  return (
    <div {...rest}>
      {sortedBalances?.map((balance: WalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />
        );
      })}
    </div>
  );
};

export default WalletPage;
