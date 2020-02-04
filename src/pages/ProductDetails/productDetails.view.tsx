import React from 'react'
import { useParams } from 'react-router-dom'
import data from "../../utils/const"
import {Button} from "antd"

interface ProductDetailsProps {}

const ProductDetail: React.FC<ProductDetailsProps> = props => {
    const {productId} = useParams()
    let id = 1
    if (productId !== undefined) {
         id = parseInt(productId)
    }
    console.log(data[id])
    return (<div>
        <h1>{data[id].name}</h1>
    <div>{data[id].category}</div>
        <img src = {data[id].image} height = "200px" width="150px"/>
    <div>{data[id].price}</div>
    <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quam dolorem distinctio quisquam aspernatur non eligendi deserunt ex tempore expedita mollitia, eveniet dolor aperiam recusandae quidem. Omnis nesciunt assumenda et.
        </p>
        <div >
            <Button type="primary">Checkout <i className="fa fa-check-circle" aria-hidden="true"></i>
            </Button>
            <br />
            <br />
            <Button type="primary">Add to cart <i className="fa fa-cart-plus" aria-hidden="true"></i>
            </Button>
        </div>
    </div>
)
}

export default ProductDetail