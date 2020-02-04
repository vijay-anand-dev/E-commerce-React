import React, { useState } from 'react'
import Table from "../../components/Table"

import data from "../../utils/const"

interface HomeProps {}

const Home: React.FC<HomeProps> = props => {
    
    const [searchText, setSearchText] = useState()
    const [searchedColumn, setSearchedColumn] = useState('')
    const [filteredInfo, setFilteredInfo] = useState(null)
    const [sortedInfo, setSortedInfo] = useState({})

    const handleSearch = (selectedKeys:any, confirm:any, dataIndex:any) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
      };
    
      const handleReset = (clearFilters : any) => {
        clearFilters();
        setSearchText('')        
      };

      const handleChange = (pagination : any, filters : any, sorter : any) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters)
        setSortedInfo(sorter)
      };
    
      const clearFilters = () => {
        setFilteredInfo(null)
      };
    
      const clearAll = () => {
        setFilteredInfo(null)
        setSortedInfo({})
      };
    
      const setCategorySort = () => {
          setSortedInfo({
            order: 'descend',
            columnKey: 'age'
          })
        }

    return (
        <Table data = {data} searchText= {searchText} searchedColumn={searchedColumn} handleReset = {handleReset} handleSearch = {handleSearch} filteredInfo = {filteredInfo} sortedInfo = {sortedInfo} handleChange = {handleChange}
        clearFilters = {clearFilters} clearAll = {clearAll} setCategorySort = {setCategorySort}/>
    )
}

export default Home

