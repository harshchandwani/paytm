import axios from "axios";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useBalance from "../hooks/useBalance";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const { balance, isLoading, error } = useBalance();
    const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
    const { width, height } = useWindowSize()
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching balance: {error.message}</div>;
    }
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    {isTransactionSuccess ? <h2 className="text-3xl font-bold text-center">Transaction Successfull</h2> : <h2 className="text-3xl font-bold text-center">Send Money</h2>}
                </div>
                {isTransactionSuccess && <Confetti tweenDuration = {5000}/>}
                <div className="p-6">
                    {!isTransactionSuccess && <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0]}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>}
                    <div className="space-y-4">
                        {!isTransactionSuccess && <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>}
                        {!isTransactionSuccess && <button onClick={async () => {
                            if(amount === 0 || amount < 0){
                                toast.error("Sorry, you can't transfer less than 0");
                                
                                return;
                            }
                            try {
                                await axios.post(
                                    'http://localhost:3000/api/v1/account/transfer',
                                    {
                                        to: id,
                                        amount,
                                    },
                                    {
                                        headers: {
                                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                                        },
                                    }
                                );
                                setIsTransactionSuccess(true);// Set the success state to true upon successful transfer
                                
                            } catch (error) {
                                console.error('Error initiating transfer:', error);
                            }
                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Transfer Money
                        </button>}
                        {isTransactionSuccess && <div>{amount} has been successfully transferred to {name}</div>}
                        <div>
                            <UpdateBalance amount={amount} balance={balance} />
                        </div>
                    </div>
                </div>
                <Link to={'/dashboard'}>
                    <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-black text-white">Back to Home</button>
                </Link>
            </div>
        </div>
    </div>
}
const UpdateBalance = ({ amount, balance }) => {
    // Assuming `amount` and `balance` are variables
    if (amount === 0) {
        return <div>Your balance: {balance.toFixed(2)}</div>;
    } else if (amount > balance) {
        return <div style={{ color: 'red' }}>Balance is Low</div>;
    } else {
        // Perform the balance update logic here (e.g., subtracting amount from balance)
        const updatedBalance = balance - amount;
        return <div>Your Updated balance: {updatedBalance.toFixed(2)}</div>;
    }
};

const handleTransfer = async () => {
    try {
        await axios.post(
            'http://localhost:3000/api/v1/account/transfer',
            {
                to: id,
                amount,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        );
        setIsTransactionSuccess(true); // Set the success state to true upon successful transfer
    } catch (error) {
        console.error('Error initiating transfer:', error);
    }
};
