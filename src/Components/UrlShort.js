import Axios from 'axios';
import { useRef, useState } from 'react';
import Loader from './Loader';

function UrlShort() {
    const [data, setData] = useState()
    const [id, setId] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [copy,setCopy]=useState("Copy")
    const inpRef=useRef() //Reference for copying the short link

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const isValidUrl = urlString=> {
        try { 
            return Boolean(new URL(urlString)); 
        }
        catch(e){ 
            return false; 
        }
    }
    const createShortUrl = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (isValidUrl(data.url)) {
            await Axios.post("https://url-backend-delta.vercel.app/url/create", data).then(res => {
                setId(window.location.href+res.data.id)
            }).catch(err => {
                switch(err.status){
                    case 404:
                        alert("No Data!")
                        break
                        case 500:
                            alert("Internal error")
                            break
                            default:
                        alert("Unknown Error")
                        break
                }
            })
        }else{
            alert("Url Invalid")
        }
        setIsLoading(false)
    }

    return (
        <div className="flex-col h-screen w-screen bg-gray-100 flex justify-center items-center">
            {isLoading?<Loader/>:null}
            <form onSubmit={createShortUrl} className='sm:w-3/6 w-5/6 bg-white p-10 rounded-xl flex flex-col'>
                {id ? <input ref={inpRef} disabled type='text' className='py-2 px-4 focus:outline-none border-0 border-b-2 border-blue-600' value={id} /> : <input onChange={onChangeHandler} type="text" required placeholder='Enter Url' className='py-2 px-4 focus:outline-none border-0 border-b-2 border-blue-600' name='url' />}
                {id?<button key="copy" className='focus:outline-none px-4 py-2 my-2 bg-blue-600 text-white rounded-md' onClick={()=>{navigator.clipboard.writeText(inpRef.current.value); setCopy("Copied!!")}} >{copy}</button>:<input key="generate" type="submit" value="Generate Short Url" className='focus:outline-none px-4 py-2 my-2 bg-blue-600 text-white rounded-md' />}
            </form>
            <span className='fixed bottom-0 mb-2 font-semibold'> Made by <a href="https://ayushkashyap.netlify.app" target='_blank' className='underline'>Ayush Kashyap</a></span>
        </div>
    );
}

export default UrlShort;
