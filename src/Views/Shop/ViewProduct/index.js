import React from 'react'
import Loader from '../../../Components/Loader/index.js';
import { URI } from '../../../Api/index.js';
import Api from '../../../Api/Api.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../Redux/Actions/userActions.js';
import LivePlayer from '../../../Components/LivePlayer/index.js';
import SubHeader from '../../../Components/SubHeader/index.js';
import Notify from '../../../Components/Notify/index.js';
import { ShopBanner } from '../../../constant/images.js';
import CartComponent from '../../../Components/CartComponent/index.js';
import { MinusIcon, PlusIcon } from '../../../constant/svg.js';
import { isNullRetNull, isObjEmpty } from '../../../utils/index.js';
import ReadMoreAndLess from 'react-read-more-less';
import HeaderSearch from '../../../Components/HeaderSearch/index.js';

class ViewProduct extends React.Component {
    state = {
        product: this.props.history.location.state.product ? this.props.history.location.state.product : {},
        image: '',
        selected_quantity: 1,
        isShowCartComponent: false
    }

    componentWillMount() {
        const { images } = this.state.product
        this.setStateObj({ image: images.length > 0 ? images[0].img : '' })
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    doBackEndAddToCart(product, qty = 1){
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
        let tempArray = [];
        let status = true;
        
        getCartList.forEach(item => {
            if (product.product_id === item.product_id) {
                item['selected_qty'] = isNullRetNull(item.selected_qty, 0) + qty;
                tempArray.push(item);
                this.doBackEndAddToCart(product, item['selected_qty']);
                status = false;
            } else {
                tempArray.push(item)
                this.doBackEndAddToCart(product, item['selected_qty']);
            }
        });
        if (status) {
            product['selected_qty'] = isNullRetNull(qty, 0);
            tempArray.push(product)
            this.doBackEndAddToCart(product, product['selected_qty']);
        }
        this.props.setCartList(tempArray)
        this.setStateObj({ isShowCartComponent: true })
        setTimeout(() => { this.calculateCartAmount() }, 500)
    }

    calculateCartAmount() {
        const { getCartList } = this.props;
        let initialAmount = 0
        getCartList.forEach(item => {
            initialAmount = (Number(isNullRetNull(item.price, 0)) * Number(isNullRetNull(item.selected_qty, 0))) + initialAmount
        });
        this.props.setCartTotalAmount(initialAmount);
    }

    render() {
        const {
            loader,
            product,
            image,
            selected_quantity,
            isShowCartComponent
        } = this.state;

        return (<>
            <HeaderSearch />
            <LivePlayer banner={ShopBanner} />
            <SubHeader />
            <Loader isLoader={loader} />
            <CartComponent
                {...this.props}
                isShow={isShowCartComponent}
                onCartClick={() => { this.setStateObj({ isShowCartComponent: true }) }}
                onClose={() => { this.setStateObj({ isShowCartComponent: false }) }} />

            <div className="row m-0 p-0 product-main-div">
                <div className="col-md-2 row p-0 m-0 product-list-div">
                    {
                        product.images.map((img, i) => {
                            return (
                                <button
                                    type="button" className="product-list-image-btn"
                                    onClick={() => {
                                        this.setState({ image: img.img })
                                    }}>
                                    <img key={i} src={img.img} className="m-2 product-list-image" alt="Product" />
                                </button>
                            )
                        })
                    }
                </div>
                <div className="col-md-6 row p-0 m-0">
                    <img src={image} className="mt-2 product-show-image" alt="Product" />
                </div>
                <div className="col-md-4 row p-0 m-0">
                    <div className="mt-2 pl-3 pt-4 add-to-cart-panel">
                        <h6 className="p-0 h-01">New</h6>
                        <h6 className="p-0 h-02">{product.name}</h6>
                        <h6 className="p-0 h-02">Rs. {product.price}</h6>
                        <div className="row p-0 m-0 mt-3 quantity-selector">
                            <p className="p-0 m-0 p-01">Quantity</p>
                            <div className="row p-0 m-0 mr-5">
                                <button
                                    type="button"
                                    className="p-0"
                                    onClick={() => {
                                        this.setStateObj({ selected_quantity: selected_quantity > 1 ? selected_quantity - 1 : 1 })
                                    }}>
                                    <MinusIcon />
                                </button>
                                <p className="p-0 m-0 ml-2 mr-2 p-02">{selected_quantity}</p>
                                <button
                                    type="button"
                                    className="p-0"
                                    onClick={() => {
                                        this.setStateObj({ selected_quantity: selected_quantity < product.quantity ? selected_quantity + 1 : product.quantity })
                                    }}>
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <div className="row m-0 p-0 mt-4 mb-4">
                            <button
                                type="button"
                                className="btn add-to-cart-btn"
                                onClick={() => {
                                    product['img'] = product.images.length > 0 ? product.images[0].img : '';
                                    this.doAddToCart(product, selected_quantity)
                                }}>
                                <h6 className="m-0 text-light">Add to Cart</h6>
                            </button>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="product-details-div">
                        <div className="title-div">
                            <p className="m-0 p-0 mt-3">Product Details:</p>
                        </div>
                        <ReadMoreAndLess
                            className="product-description"
                            charLimit={150}
                            readMoreText="Read more"
                            readLessText="Read less">
                            {product.description}
                        </ReadMoreAndLess>
                    </div>
                </div>
            </div>

            <Notify {...this.props} />
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);