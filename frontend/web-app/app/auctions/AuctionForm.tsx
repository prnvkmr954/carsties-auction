'use client'

import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';

export default function AuctionForm() {

  const router = useRouter();  
  const {control, handleSubmit, setFocus, 
        formState: {isSubmitting, isValid, isDirty}} = useForm({
          mode:'onTouched'
        });  

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            
            <Input name='make' label='Make' control={control} rules={{required: 'Make is required'}}/>
            <Input name='model' label='Model' control={control} rules={{required: 'Model is required'}}/>
            <Input name='color' label='Color' control={control} rules={{required: 'Color is required'}}/>

            <div className='grid grid-cols-2 gap-3'> 
                  <Input name='year' label='Year' control={control} type='number' rules={{required: 'Year is required'}}/>
                  <Input name='mileage' label='Mileage' control={control} rules={{required: 'Mileage is required'}}/>
            </div>

            <div className='grid grid-cols-2 gap-3'> 
                  <Input 
                        name='reservePrice' 
                        label='Reserve Price (Enter 0 if no reserve)' 
                        control={control} 
                        type='number' 
                        rules={{required: 'Reserve price is required'}}
                   />
                  <DateInput 
                        name='auctionEnd' 
                        label='Auction end date/time' 
                        control={control} 
                        showTimeSelect 
                        dateFormat='dd MMMM yyyy h:mm a' 
                        type='datetime-local' 
                        rules={{required: 'Auction end date is required'}}
                  />
            </div>

            <div className='flex justify-between'>
                <Button color='alternative' onClick={() => router.push('/')}>Cancel</Button>
                <Button outline 
                        color='green' 
                        type='submit'
                        disabled= {!isValid || !isDirty}
                        >
                    {isSubmitting && <Spinner size='sm'/> }
                    Submit
                </Button>
            </div>
        </form>  
  )
}
