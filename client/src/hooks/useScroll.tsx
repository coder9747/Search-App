import { useEffect, useState } from 'react';
import axios from "axios";


let backendUrl = 'https://search-app-backend-slxn.onrender.com/api/v1/product';

let productPerPage = 12;

const useScroll = (query: string, pageNumber: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        let token: any;
        axios.post(`${backendUrl}/search`, {
            query, pageNumber
        }, { cancelToken: new axios.CancelToken(c => token = c) }).then(res => {

            const count = res.data?.dataCount;
            setHasMore((pageNumber * productPerPage) + productPerPage < count);
            setData((pre) => {
                return [...pre, ...res.data.data];
            });
            setLoading(false);

        }
        ).catch((error: any) => {
            console.log('error', error.message);
            setLoading(false);
        })

        return () => token();

    }, [query, pageNumber]);
    useEffect(() => {
        setData([]);
    }, [query])

    return (
        {
            loading,
            data,
            hasMore,
        }
    )
}

export default useScroll
