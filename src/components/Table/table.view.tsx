import React, {useRef} from 'react'
import { Table as AntDTable, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import 'antd/es/table/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/dist/antd.css';
import { FilterDropdownProps } from 'antd/lib/table';



interface TableProps {
    data?: Array<{}>
    searchText: any,
    searchedColumn?: string,
    filteredInfo?: any,
    sortedInfo?:any,
    handleSearch: (selectedKeys:any, confirm:any, dataIndex:any) => void,
    handleReset: (clearFilters:any) => void,
    handleChange: (pagination : any, filters : any, sorter : any) => void,
    clearFilters: () => void,
    clearAll: () => void,
    setCategorySort: () => void
}



const Table: React.FC<TableProps> = props => {
    const searchInputRef = useRef<Input>(null)

    
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ( {setSelectedKeys , selectedKeys, confirm , clearFilters}: FilterDropdownProps ) => (
          <div style={{ padding: 8 }}>

            <Input
              ref={searchInputRef
              }

              placeholder={`Search ${dataIndex}`}
              value={selectedKeys && selectedKeys[0]}
              onChange={e => setSelectedKeys && setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => props.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}

            />

            <Button
              type="primary"
              onClick={() => props.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>


            <Button onClick={() => props.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>

          </div>
        ),
        
        filterIcon: (filtered : any) => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),

        onFilter: (value: any, record:any) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible : any) => {
          if (visible) {
            setTimeout(() => searchInputRef.current?.select());
          }
        },

        render: (text:any) =>
          props.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[props.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });
    
      
    
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          ...getColumnSearchProps("name"),
          sorter: (a:any, b:any) => a.name.length - b.name.length,
          sortOrder: props.sortedInfo.columnKey === 'name' && props.sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'category',
          dataIndex: 'category',
          key: 'category',
          width: '20%',
          ...getColumnSearchProps('category'),
          sorter: (a:any, b:any) => a.category.length - b.category.length,
          sortOrder: props.sortedInfo.columnKey === 'category' && props.sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          ...getColumnSearchProps('price'),
          sorter: (a:any, b:any) => a.price.length - b.price.length,
          sortOrder: props.sortedInfo.columnKey === 'price' && props.sortedInfo.order,
          ellipsis: true,
        },
      ]
    return (
        <React.Fragment>
        <div>
        <div className="table-operations">
          <Button onClick={props.setCategorySort}>Sort Category</Button>
          <Button onClick={props.clearFilters}>Clear filters</Button>
          <Button onClick={props.clearAll}>Clear filters and sorters</Button>
        </div>
        <AntDTable columns={columns} dataSource={props.data} onChange={props.handleChange}/>
      </div>
         </React.Fragment>
    )
}

export default Table