import React, { Component } from 'react';
import './styles.css';
import Api from '../../Api/Api.js';
import { URI } from '../../Api/index.js';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { isNullRetNull, isObjEmpty } from '../../utils';

class CartComponent extends Component {
    state = {

    }

    componentWillMount() {
        this.calculateCartAmount()
    }

    doBackEndRemoveFromCart(product) {
        const { userData } = this.props;
        if (!isObjEmpty(userData)) {
            let payload = {
                uri: URI.REMOVE_CART,
                method: 'post',
                data: {
                    user_id: userData.user_id,
                    product_id: product.product_id,
                }
            }
            Api(payload)
                .then(() => {
                   
                })
                .catch((err) => {
                    alert("Unkown Error \n" + err);
                    return;
                })
        }
    }


    doRemoveFromCart(product) {
        const { getCartList } = this.props;
        let tempArray = [];
        getCartList.forEach(item => {
            if (product.product_id !== item.product_id) {
                tempArray.push(item);
            }
        });
        this.doBackEndRemoveFromCart(product);
        this.props.setCartList(tempArray);
        setTimeout(() => { this.calculateCartAmount() }, 500);
    }

    calculateCartAmount() {
        const { getCartList } = this.props;
        let initialAmount = 0;
        getCartList.forEach(item => {
            initialAmount = (Number(isNullRetNull(item.price, 0)) * Number(isNullRetNull(item.selected_qty, 0))) + initialAmount
        });
        this.props.setCartTotalAmount(initialAmount);
    }

    render() {
        const {
            isShow,
            onCartClick,
            onClose,
            getCartList,
            cartTotalAmount
        } = this.props;
        return (<>
            {
                !isShow &&
                <button
                    type="button"
                    className="btn p-0 m-0 lhs-cart-btn"
                    onClick={() => { if (onCartClick) onCartClick() }}>
                    <h5>Cart</h5>
                </button>
            }
            {
                isShow &&
                <div className="lhs-cart-main-div">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => { if (onClose) onClose() }}>
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <p className="mt-2 mb-0 my-bag">My Bag ({getCartList.length})</p>
                    <button
                        type="button"
                        className="btn mt-2 view-my-full-bag"
                        onClick={() => {
                            this.props.history.push("View-Full-Bag")
                        }}>
                        <h6 className="p-0 m-0">View Full Bag</h6>
                    </button>

                    <div className="cart-simple-line mt-3 mb-1" />

                    <div className="lhs-cart-list-body">

                        {
                            getCartList.map((product, i) => {
                                if (product.selected_qty > 0) {
                                    return (
                                        <div key={i} className="row m-0 p-0 lhs-cart-list-card">
                                            <img src={product.img} className="lhs-cart-product-img" alt="product" />
                                            <div className="p-1">
                                                <p className="p-0 m-0 title">{product.name}</p>
                                                <p className="p-0 m-0">Quantity: {isNullRetNull(product['selected_qty'], 0)}</p>
                                                <p className="p-0 m-0">Rs. {product.price}</p>

                                                <button
                                                    type="button"
                                                    className="close-btn remove-item-btn"
                                                    onClick={() => {
                                                        this.doRemoveFromCart(product)
                                                    }}>
                                                    <p className="m-0 p-0">Remove</p>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }

                    </div>


                    <div className="row p-0 m-0 pr-1 sub-total-view">
                        <h6 className="m-0 p-0">Sub Total Rs {cartTotalAmount < 1 ? '0.00' : isNullRetNull(cartTotalAmount, '0.00')}</h6>
                    </div>
                </div>
            }
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent)