import { useEffect, useState } from "react"
import { getCrypto } from "../../api/external";
import { Loader } from "../../components";

const Crypto = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // IIFE
    (async () => {
        const response = await getCrypto();
        setData(response);
    })();
    
    // Cleanup
    setData([]);
    
  }, []);

  console.log(data)
  

  return data.length === 0 ? <Loader text={"Crypto"} /> : (
    <div className="flex flex-col items-center">

        {/* header */}
      <div className="text-4xl font-bold w-[inherit] text-center py-8">
        Latest Coin Market
      </div>

        <table className="w-2/3">
            <thead>
                <tr className="text-xl font-bold">
                    <th>#</th>
                    <th>Coin</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>24h</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {data.map(({id, market_cap_rank: index, image, name, symbol, current_price: price, price_change_percentage_24h: h24}) => (
                    <tr key={id} className="text-lg font-bold border-b-[1px] border-[#f2f2f2]">
                    <td className="p-2">{index}</td>
                    <td className="p-2 flex justify-center">
                        <div className="w-[60%] flex items-center gap-10 p-2">
                            <img src={image} width={40} height={40} alt=""/>
                            {name}
                        </div>
                    </td>
                    <td className="p-2">{symbol}</td>
                    <td className="p-2">{price}</td>
                    <td className={`p-2 ${Number(h24) < 0 ? "text-red-500" : "text-green-500"}`}>{h24}</td>
                </tr>
                ))}
            </tbody>
        </table>



    </div>
  )
}

export default Crypto