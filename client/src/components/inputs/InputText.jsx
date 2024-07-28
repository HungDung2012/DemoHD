import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const InputText = ({
    containerClassname, 
    label, 
    height=500, 
    register, 
    errors, 
    validate, 
    id, 
    setValue
}) => {
  return (
    <div className={twMerge(
        clsx('flex flex-col gap-2 w-full', containerClassname)
    )}>
        {label &&(
            <label className='font-medium text-main-700' htmlFor={id}>
                {label}
            </label>
        )}
        <Editor
            apiKey= {import.meta.env.VITE_TINYCME_API_KEY}
            {...register(id, validate)}
            onChange={e => setValue(id, e.target.getContent())}
            init={{
                height,
                menubar: true,
                plugins: '',
                toolbar: '',
                content_style: ''
            }}
        />
        {errors[id] && 
            <small className='text-red-500'>{errors[id]?.message}</small>
        }
    </div>
  );
}

export default InputText