'use client'
import { Pagination } from 'flowbite-react'
import React, { useState } from 'react'


type Props = {
    currentPage: number;
    pagecount: number;
}
export default function AppPagination({currentPage, pagecount}: Props) {
 
 console.log("PageCount: ", pagecount);
 const [pageNumber, setPageNumber] = useState(currentPage);


  return (
    <Pagination 
        currentPage={pageNumber}
        onPageChange={e => setPageNumber(e)}
        totalPages={pagecount}
        layout="pagination"
        showIcons={true}
        className="text-blue-500 mb-5"
    />
  )
}
