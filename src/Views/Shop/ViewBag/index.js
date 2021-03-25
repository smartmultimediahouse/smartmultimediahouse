import React from 'react';
import { Modal, Button, Form, Col } from "react-bootstrap";
import Loader from '../../../Components/Loader/index.js';
import './styles.css';
import { URI } from '../../../Api/index.js';
import Api from '../../../Api/Api.js';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../Redux/Actions/userActions.js';
import LivePlayer from '../../../Components/LivePlayer/index.js';
import SubHeader from '../../../Components/SubHeader/index.js';
import Notify from '../../../Components/Notify/index.js';
import { ShopBanner } from '../../../constant/images.js';
import CartComponent from '../../../Components/CartComponent/index.js';
import { MinusIcon, PlusIcon } from '../../../constant/svg.js';
import { isNullRetNull, isObjEmpty } from '../../../utils/index.js';
import HeaderSearch from '../../../Components/HeaderSearch/index.js';

class ViewFullBag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCartComponent: false,
            checkOutModal: false
        }
        this.inserOrder = this.inserOrder.bind(this);
    }

    componentWillMount() {
        // const { images } = this.state.product
        // this.setStateObj({ image:images.length > 0 ? images[0].img : '' })
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    openModal = () => this.setStateObj({ checkOutModal: true });
    closeModal = () => this.setStateObj({ checkOutModal: false });

    doBackEndAddToCart(product, qty = 1) {
        const { userData } = this.props;
        if (!isObjEmpty(userData)) {
            this.setStateObj({ loader: true })
            let payload = {
                uri: URI.ADD_TO_CART,
                method: 'post',
                data: {
                    user_id: userData.user_id,
                    product_id: product.product_id,
                    quantity: qty,
                }
            }
            Api(payload)
                .then(() => {
                    this.setStateObj({ loader: false })
                })
                .catch((err) => {
                    this.setStateObj({ loader: false });
                    alert("Unkown Error \n" + err);
                    return;
                })
        }
    }

    doAddToCart(product, qty = 1) {
        const { getCartList } = this.props;
        let tempArray = []
        let status = true
        getCartList.forEach(item => {
            if (product.product_id === item.product_id) {
                item['selected_qty'] = isNullRetNull(item.selected_qty, 0) + qty;
                tempArray.push(item);
                this.doBackEndAddToCart(product, item['selected_qty']);
                status = false;
            } else {
                tempArray.push(item);
                this.doBackEndAddToCart(product);
            }
        });
        if (status) {
            product['selected_qty'] = isNullRetNull(qty, 0);
            tempArray.push(product);
            this.doBackEndAddToCart(product, product['selected_qty']);
        }
        this.props.setCartList(tempArray)
        this.setStateObj({ isShowCartComponent: true })
        setTimeout(() => { this.calculateCartAmount() }, 500)
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

    doRemoveAllFromCart() {
        let tempArray = [];
        this.props.setCartList(tempArray);
        setTimeout(() => { this.calculateCartAmount() }, 500);
    }

    calculateCartAmount() {
        const { getCartList } = this.props;
        let initialAmount = 0
        getCartList.forEach(item => {
            initialAmount = (Number(isNullRetNull(item.price, 0)) * Number(isNullRetNull(item.selected_qty, 0))) + initialAmount
        });
        this.props.setCartTotalAmount(initialAmount);
    }

    inserOrder(e) {
        e.preventDefault();
        this.setStateObj({ loader: true })
        const { userData, getCartList } = this.props;
        getCartList.forEach((x) => {
            this.doBackEndAddToCart(x, x.selected_qty);
        })
        let payload = {
            uri: URI.ORDER_PRODUCTS,
            method: 'post',
            data: {
                user_id: userData.user_id,
                billing_first_name: e.target.billingFirstName.value,
                billing_last_name: e.target.billingLastName.value,
                billing_address_1: e.target.billingAddress1.value,
                billing_address_2: e.target.billingAddress2.value,
                billing_country: e.target.billingCountry.value,
                order_comments: e.target.orderComments.value,
                billing_phone: e.target.billingNumber.value,
                zip_code: e.target.billingZip.value,
            }
        }
        Api(payload)
            .then((res) => {
                this.setStateObj({ loader: false })
                if (res.data.message === 'success') {
                    this.props.setNotify({ isShow: true, msg: "Ordered successfully", title: 'Success' });
                    this.closeModal();
                    this.doRemoveAllFromCart();
                } else {
                    this.props.setNotify({ isShow: true, msg: res.data.data, title: 'Failed' });
                    this.closeModal();
                }
            })
            .catch((err) => {
                this.setStateObj({ loader: false });
                this.closeModal();
                alert("Unkown Error \n" + err);
            })
    }

    render() {
        const {
            loader,
            isShowCartComponent
        } = this.state;
        const { getCartList, userData, cartTotalAmount } = this.props;
        return (<>
            <HeaderSearch />
            <LivePlayer banner={ShopBanner} />
            <SubHeader />
            <div className="col-12 pl-1 mt-3">
                <p className="title01 mt-1">Cart</p>
            </div>
            <Loader isLoader={loader} />
            <CartComponent
                {...this.props}
                isShow={isShowCartComponent}
                onCartClick={() => { this.setStateObj({ isShowCartComponent: true }) }}
                onClose={() => { this.setStateObj({ isShowCartComponent: false }) }} />
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th>
                            S/NO
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Unit Price
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            line total
                        </th>
                        <th>
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {getCartList.map((x, key) => {
                        if (x.selected_qty > 0) {
                            return (
                                <tr key={key.toString()}>
                                    <td>
                                        {++key}
                                    </td>
                                    <td>
                                        {x.name}
                                    </td>
                                    <td>
                                        {x.price}
                                    </td>
                                    <td className="quantity-selector" style={{ width: 110 }}>
                                        <button
                                            type="button"
                                            className="p-0 float-left"
                                            onClick={() => {
                                                this.doAddToCart(x, -1)
                                            }}>
                                            <MinusIcon />
                                        </button>
                                        <span className="p-0 m-0 ml-2 mr-2 p-02 float-left">{x.selected_qty}</span>
                                        <button
                                            type="button"
                                            className="p-0 float-left"
                                            onClick={() => {
                                                this.doAddToCart(x)
                                            }}>
                                            <PlusIcon />
                                        </button>
                                        {/* <button className="mr-3" onClick={() => this.doAddToCart(x, -1)}>-</button>{x.selected_qty}<button className="ml-3" onClick={() => this.doAddToCart(x)}>+</button> */}
                                    </td>
                                    <td>
                                        {(x.price * x.selected_qty)}
                                    </td>
                                    <td className="quantity-selector">
                                        <button type="button" onClick={() => this.doRemoveFromCart(x)}>Remove</button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })
                    }
                    <tr>
                        <td className="text-right" colSpan="4">
                            Subtotal
                        </td>
                        <td>
                            {cartTotalAmount}
                        </td>
                        <td className="quantity-selector">
                            <button type="button" onClick={() => this.doRemoveAllFromCart()}>Empty cart</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="4">
                            Total
                        </td>
                        <td>
                            {cartTotalAmount}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            {/* <div className="row m-0 p-0 product-main-div">
                <div className="col-md-8 row p-0 m-0">

                </div>
                <div className="col-md-4 row p-0 m-0">
                    <div className="mt-2 pl-3 pt-4 add-to-cart-panel">
                        <h6 className="p-0 h-01">New</h6>
                        <h6 className="p-0 h-02">{'product.name'}</h6>
                        <h6 className="p-0 h-02">Rs. {'product.price'}</h6>
                        
                        <div className="row m-0 p-0 mt-4 mb-4">
                            <button
                                type="button"
                                className="btn add-to-cart-btn"
                                onClick={()=>{
                                }}>
                                <h6 className="m-0 text-light">Add to Cart</h6>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div> */}
            {
                getCartList.length > 0 &&
                <div className="row justify-content-end">
                    <div className="col align-self-end col-auto">
                        <button style={{ backgroundColor: '#119922', color: 'white', fontWeight: 500, border: 0 }} onClick={this.openModal} type="button">Proceed to checkout</button>
                    </div>
                </div>
            }
            <Modal show={this.state.checkOutModal} onHide={this.closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Community Suggested Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isObjEmpty(userData) &&
                        <Form onSubmit={this.inserOrder}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="billingFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required name="billingFirstName" type="text" placeholder="Enter First Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="billingLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required name="billingLastName" type="text" placeholder="Enter Last Name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="billingAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required name="billingAddress1" placeholder="1234 Main St" />
                            </Form.Group>

                            <Form.Group controlId="billingAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control name="billingAddress2" placeholder="Apartment, studio, or floor" />
                            </Form.Group>

                            <Form.Group controlId="billingNumber">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control required name="billingNumber" placeholder="03xxxxxxxxx" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="billingCountry">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" required name="billingCountry" placeholder="Pakistan" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="billingZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text" required name="billingZip" placeholder="xxxxx" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="orderComments">
                                <Form.Label>Order Comments</Form.Label>
                                <Form.Control as="textarea" name="orderComments" placeholder="" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                        </Form>
                    }
                    {isObjEmpty(userData) &&
                        <p>Please Login first</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.closeModal()} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
            <Notify {...this.props} />
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFullBag);