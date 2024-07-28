import React from 'react'
import { Button, InputFile, InputForm, InputText, Textarea, Title } from '~/components'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';

const CreatePropertyType = () => {
  const {
    register, 
    formState: {errors}, 
    handleSubmit, 
    reset, 
    setValue
  } = useForm()
  const handleCreateNewPropertyType = (data) => {
    console.log(data)
  }
  return (
    <div className=''>
      <Title title='create New Property Type'>
        <Button handleOnClick={handleSubmit(handleCreateNewPropertyType)}> 
          <CiCirclePlus size = {20}/> 
          <span>Create</span> 
        </Button>
      </Title>
      <form className='p-4 flex-col flex gap-4'>
        <InputForm
          id='name'
          register={register}
          errors={errors}
          validate={{required: 'This field cannot empty.'}}
          label='Property Type Name'
        />
        <Textarea 
          id='description'
          register={register}
          errors={errors}
          validate={{required: 'This field cannot empty.'}}
          label='Description'
        />
        <InputFile 
          id='images'
          register={register}
          errors={errors}
          validate={{required: 'This field cannot empty.'}}
          label='Image'
          multiple={true}
          getImages={(images) => setValue('images', images?.(el => el.path ))}
        />
      </form>
    </div>
  )
}

export default CreatePropertyType