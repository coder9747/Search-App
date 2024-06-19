import { useCallback, useEffect, useRef, useState } from 'react';
import useScroll from './hooks/useScroll';
import { motion } from "framer-motion"
import Card from './component/Card';
import Skelton from './component/Skelton';

let items = ['Lipstic', "Shoes", "Perfume", "Brand", "Apple", "Ice Cream", "calvin klein"];

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [activeHolderIndex, setActiveHolderIndex] = useState<number>(1);
  const [holder, setHolder] = useState<string>(items[activeHolderIndex]);
  const observer = useRef();
  const handleSetPlaceHolder = () => {
    setActiveHolderIndex((pre) => (pre + 1) % items.length);
    setHolder(() => items[activeHolderIndex]);
  }
  useEffect(() => {
    const intervalId = setInterval(handleSetPlaceHolder, 2000);
    return () => clearInterval(intervalId);

  }, [activeHolderIndex, holder]);
  useEffect(() => {
    setPageNumber(1);
  }, [query])

  const { data, loading, hasMore } = useScroll(query, pageNumber);
  const lastElement = useCallback((node: any) => {
    if (loading) return;
    //@ts-ignore
    if (observer.current) observer.current.disconnect();
    //@ts-ignore
    observer.current = new IntersectionObserver(ent => {
      if (ent[0].isIntersecting && hasMore) {
        setPageNumber((pre) => pre + 1);
      }
    });
    //@ts-ignore
    if (node) observer.current.observe(node);

  }, [loading, hasMore])

  return (

    <div className='relative min-h-screen bg-slate-200'>
      <div className='sm:h-[300px] h-[200px]  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-green-400'>
        <motion.div
          animate={{
            borderRadius: '10px',
          }}
          transition={{
            delay: 2,
            duration: 2
          }}

          className='absolute px-2 sm:px-5 h-8 sm:h-12  top-20 left-[50%] translate-x-[-50%] bg-slate-100 py-1 
          gap-1 sm:gap-4 sm:w-max w-[200px] border   flex  items-center'>
          <i className="fa-solid fa-magnifying-glass "></i>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={holder} type="text" className='h-full w-28 sm:w-max outline-none border-0 p-2 bg-slate-100 rounded-xl ' />
          <motion.button
            initial={{ scale: .8 }}
            animate={{ scale: [1.1, 1] }}
            transition={{ delay: 1 }}
            className='bg-green-500 h-7 p-1 sm:h-10 w-16 sm:text-xl text-[12px]  sm:w-32 rounded-xl'>Search
          </motion.button>
        </motion.div>


      </div>
      <div className='bg-white  relative rounded-xl top-[-30px] sm:top-[-100px] w-[80%] mx-auto min-h-screen border '>
        <h1 className='text-center my-2 font-bold text-xl text-slate-600'>Search For {query.length == 0 ? "All" : query}</h1>
        <div className='grid p-5  sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 place-items-center gap-2 '>
          {data.length > 0 && data.map((item, idx) => {
            if (data.length - 1 == idx) {
              return <Card key={idx} {...item} callback={lastElement} />
            }
            return <Card ref={null} key={idx} {...item} />
          })
          }


        </div>
        {data.length == 0 && !loading && <div className='text-center font-bold '>No Result Found</div>}
        {loading && <Skelton />}



      </div>
    </div>


  )
}

export default App
