import {motion} from "framer-motion"

const Card = ({ images, title, description, callback, idx }: {
  images: Array<string>,
  title: string,
  description: string,
  callback: any,
  idx: number,
}) => {
  return (
    <motion.div key={idx} ref={callback} className="max-w-sm
    l
    
    sm:h-max  h-max bg-white border border-gray-200 rounded-lg shadow "
    initial={{
      y:100,
      opacity:0,
    }}
    whileInView={{
      y:0,
      opacity:1,
    }}
    viewport={{
      once:true,
    }}
    transition={{duration:1,delay:.2}}
    
    
    >
      <a href="#" className='flex justify-center items-center'>
        <img className="rounded-t-lg h-40  " src={images[0] ? images[0] : ""} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2  text-[12px] text-xl font-bold tracking-tight text-gray-900 ">{title}</h5>
        </a>
        <p className="mb-3 md:text-sm  font-normal text-gray-700 ">{description.slice(0, 100)}...</p>
        <a  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded text-white bg-green-500">
          Add To Cart
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

export default Card
