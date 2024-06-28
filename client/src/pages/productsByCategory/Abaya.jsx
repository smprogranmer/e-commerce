import React from 'react'
import Products from '../../components/products/Products'
import { useGetProductsQuery } from '../../redux/api/api'

const Abaya = () => {
    const {data:productsData,isLoading,error} = useGetProductsQuery("abaya")
  return (
    <Products productsData={productsData} isLoading={isLoading} checkedItem={"Abaya"}/>
  )
}

export default Abaya