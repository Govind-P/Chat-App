import React,{useState} from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import SearchCard from './SearchCard';

const AddPerson = ({onClose}) => {
    const [search, setSearch] = useState('');
    const [person,setPerson] = useState([1,2]);
    const [loading, setLoading] = useState(false);
    const set=new Array(4).fill(null);
    const handleChange = (e) => {
        setSearch(e.target.value);
        
    }
  return (
    <div className='fixed  h-screen w-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 z-10'>
        <div className='h-full w-full flex flex-col items-center justify-center '>
            <div className='w-full h-26 flex justify-end p-3 items-start gap-2'>
                <IoMdCloseCircle className='text-5xl  text-slate-100 cursor-pointer' onClick={onClose} />
            </div>
            <div className=' md:w-[40%]'>
                <div className='px-2 py-1 h-14 w-full  flex justify-between items-center bg-gray-300 opacity-80  border-2 border-gray-300 focus:outline-none rounded-lg '>
                    <div className='px-2 py-1 w-full'>
                        <input type='text' className='py-2 px-3 w-full text-slate-800 bg-inherit placeholder:text-slate-800 focus:outline-none '
                        name="search"
                        value={search}
                        onChange={handleChange}
                        placeholder='Search'/>
                    </div>
                    <div className='px-2'>
                        <IoSearchOutline className='text-2xl '/>
                    </div>
                </div>
            </div>
            <div className='flex-1 md:w-[40%] py-3 '>
                {
                    loading &&(
                        <div className='p-5 pt-7 text-center w-full h-fit flex justify-center items-start rounded-md bg-slate-100'>
                            {
                                set.map((data, index) => (
                                    <div key={index}
                                    className="h-3 w-3 mr-3 bg-blue-800 rounded-full"
                                    style={{
                                        animation: `bounce 1s ease-in-out infinite`,
                                        animationDelay: `${index * 0.2}s`, // Adjust the delay as needed
                                    }} ></div>
                                ))
                            }
                            
                        </div>
                    )
                }
                {
                    !loading && person.length > 0 && search.length>0 && (
                        <div className='p-2 text-center w-full h-fit flex-col  justify-center rounded-lg items-start bg-white'>
                            {
                                person.map((data, index) => (
                                    <SearchCard key={index} person={data}/>
                                ))
                            }
                        </div>
                    )

                }
                {
                    !loading && person.length==0 && search.length>0 && (
                        <div className='p-2 text-center w-full h-fit flex justify-center items-start rounded-md bg-slate-100'>
                            <p className='font-semibold'>Sorry no user Found...</p>
                        </div>
                    )

                }
    
            </div>
        </div>
    </div>
  )
}

export default AddPerson