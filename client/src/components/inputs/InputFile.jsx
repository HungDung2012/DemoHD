import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from "react-icons/fa";
import { apiUpLoadImages } from '~/apis/beyond';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import {AiOutlineCloseCircle} from "react-icons/ai"
import { toast } from 'react-toastify';


const InputFile = ({
    containerClassname, 
    label, 
    id, 
    validate,
    multiple,
    getImages,
    errors,
}) => {
    const {register, watch} = useForm()
    const rawImages = watch(id)
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleUpLoad = async(files) => {
        const formData = new FormData()
        const imageLink = []
        setIsLoading(true)
        const upLoadPromises = []
        for(let file of files){
            formData.append('file', file)
            formData.append(
                'upload_preset', 
                import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS
            )
            upLoadPromises.push(apiUpLoadImages(formData))        
        }
        const response = await Promise.all(upLoadPromises)
        setIsLoading(false)
        if( response && response.length > 0){
            const tempArrImage = []
            for(let result of response){
                if(result.status === 200){
                    tempArrImage.push({ id: result.data.public_id, path: result.data.secure_url})
                }
            }
            setImages(tempArrImage)
        }else toast.error('Upload images failed.')
    }
    useEffect(() => {
        if(rawImages && rawImages instanceof FileList && rawImages.length > 0 ) {
            handleUpLoad(rawImages)
        }
    }, [rawImages])

    useEffect(() => {
        getImages(images)
    }, [images])

    const handleDeleteImage = (e, imageId) => {
        e.preventDefault()
        setImages(prev => prev.filter((el) => el.id !== imageId))
    }

    return (
        <div 
            className={twMerge(
                clsx('flex flex-col gap-2 w-full', containerClassname)
            )}
        >
            {label &&(
                <span className='font-medium text-main-700'>
                    {label}
                </span>
            )}
            <input 
                type='file'
                id={id} 
                {...register(id, validate)} 
                className='hidden'
                multiple={multiple}
            />
            <label 
                className='bg-gray-100 w-full p-16 flex flex-col gap-2 justify-center items-center ' 
                htmlFor={id}
            >
                {isLoading ? 
                    <span className='animate-spin text-main-600'> 
                        <CgSpinner size = {25} /> 
                    </span> 
                    : 
                    images?.length > 0 ? 
                        <div className='grid grid-cols-4 gap-4 '>
                            {images?.map((el, idx) => 
                                <div key = {idx} className='col-span-1 relative'>
                                    <span 
                                        onClick={(e) => 
                                            handleDeleteImage(e, el.id)
                                        } 
                                        className='w-6 h-6 bg-gray-100 round-full flex items-center justify-center cursor-pointer absolute top-1 right-1'
                                    > 
                                        <AiOutlineCloseCircle size= {18} /> 
                                    </span>
                                    <img src={el.path} alt="" className='w-full object-contain' />
                                </div>
                            )}
                        </div>
                        : 
                        <>
                            <span className='text-5xl text-gray-300'>
                                <FaCloudUploadAlt/>
                            </span>
                            <small className='tttttext-gray-300 italic'>
                                Only support image with extention JPEG, PNG, JPG.
                            </small>
                        </>
                }
            </label>
            {errors[id] && 
                <small className='text-red-500'>{errors[id]?.message}</small>
            }
        </div>
    )
}

export default InputFile