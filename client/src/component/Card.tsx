import { motion } from "framer-motion"

const Card = ({ images, title, description, callback, idx }: {
  images: Array<string>,
  title: string,
  description: string,
  callback: any,
  idx: number,
}) => {
  return (
    <motion.div key={idx} ref={callback} className="sm:max-w-sm
    
    sm:h-[400px] lg:h-96 flex  sm:w-full  flex-col justify-between  h-max bg-white border border-gray-200 sm:rounded-lg sm:shadow "
      initial={{
        y: 100,
        opacity: .5,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{ duration: 1, delay: .2 }}


    >
      <a href="#" className='flex justify-center items-center'>
        <img className="rounded-t-lg bg-center h-40  " src={images[0] ? images[0] : ""} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-[11px] font-medium   sm:text-xl sm:font-bold tracking-tight text-gray-900 ">{title}</h5>
        </a>
        <p className="mb-3 text-[10px] lg:text-sm font-normal text-gray-700 ">{description.slice(0, 90)}...</p>
        <motion.a
          whileTap={{ scale: .9 }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded text-white bg-green-500">
          Add To Cart
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default Card
