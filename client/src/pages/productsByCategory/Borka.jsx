import React from 'react'
import Products from '../../components/products/Products'
import { useGetProductsQuery } from '../../redux/api/api'

const Borka = () => {
  const {data:productsData,isLoading,error} = useGetProductsQuery("borka")
    
  return (
    <Products productsData={productsData} isLoading={isLoading} checkedItem={"Borka"}/>
  )
}

export default Borka