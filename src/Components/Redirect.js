import React, { useEffect } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Redirect() {
    const params=useParams()
    useEffect(()=>{
        const getUrl=async()=>{
            await Axios.get(`https://url-backend-delta.vercel.app/url/get/${params.id}`).then(res=>[
                document.location.href=res.data.url
            ]).catch(err=>{
                alert("Some Error")
            })
        }
        getUrl()
    },[])
  return (
    <div>Redirecting...</div>
  )
}
