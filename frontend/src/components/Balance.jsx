import useBalance from "../hooks/useBalance";

export const Balance = () => {
    
    const { balance, isLoading, error } = useBalance();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching balance: {error.message}</div>;
    }
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your Current Balance : 
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance.toFixed(2)}
            </div>
        </div>
    );
};
