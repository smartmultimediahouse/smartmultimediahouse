import React from 'react'
import Api from '../../../Api/Api.js';
import { URI } from '../../../Api/index.js';
import { isNullRetNull, isObjEmpty, splitArrayIntoChunks } from '../../../utils/index.js';
import Loader from '../../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../Redux/Actions/userActions.js';
import LivePlayer from '../../../Components/LivePlayer/index.js';
import SubHeader from '../../../Components/SubHeader/index.js';
import Notify from '../../../Components/Notify/index.js';
import { ShopBanner } from '../../../constant/images.js';
import CartComponent from '../../../Components/CartComponent/index.js';
import HeaderSearch from '../../../Components/HeaderSearch/index.js';

class Shop extends React.Component {
  state = {
    notify: {},
    productsList: [],
    loader: false,
    isShowCartComponent: false
  }

  componentWillMount() {
    this.getProducts()
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj })
  }

  getProducts() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.GET_MARCHANDIES_PRODUCT,
      method: 'post',
      data: { user_id: this.props.userData.user_id }
    }
    Api(payload)
      .then((res) => {
        if (res.data.message === 'success') {
          this.setStateObj({ productsList: res.data.data, loader: false });
          this.props.setProductsList(res.data.data)
        } else {
          this.setStateObj({ loader: false })
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err)
      })
  }

  getSingleProduct(id) {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.GET_SINGLE_PRODUCT,
      method: 'post',
      data: { id: id }
    }
    Api(payload)
      .then((res) => {
        this.setStateObj({ loader: false })
        if (res.data.message === 'success') {
          if (res.data.data.images.length > 0 && !isObjEmpty(res.data.data)) {
            this.props.history.push("View-Product", { product: res.data.data })
          }
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err)
      })
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
    let tempArray = []
    let status = true;

    getCartList.forEach(item => {
      if (product.product_id === item.product_id) {
        item['selected_qty'] = isNullRetNull(item['selected_qty'], 0) + qty;
        tempArray.push(item);
        this.doBackEndAddToCart(product, item['selected_qty']);
        status = false;
      } else {
        tempArray.push(item);
        this.doBackEndAddToCart(product);
      }
    });
    if (status) {
      product['selected_qty'] = qty;
      tempArray.push(product);
      this.doBackEndAddToCart(product, product['selected_qty']);
    }
    this.props.setCartList(tempArray);
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
    const { loader, isShowCartComponent } = this.state;
    const { productsList } = this.props;
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
      {
        splitArrayIntoChunks(productsList, 4).map((chunk, i) => {
          return (
            <div key={i} className="row m-0 p-0 product-panel-row">
              {
                chunk.map((product, j) => {
                  return (
                    <div key={j} className="col-md-3 col-sm-6 m-0 p-0 p-2 product-panel">
                      <div
                        className="product-panel-inner-card">
                        <div
                          onClick={() => {
                            this.getSingleProduct(product.product_id)
                          }}
                          disabled={isNullRetNull(product.quantity, 0) < 1}>
                          <img src={product.img} alt="product" />
                          <p className="pl-2 pr-2 product-name">{product.name}</p>
                          <p className="pl-2 pr-2 product-price">Rs. {product.price}</p>
                        </div>
                        <div className="row p-0 m-0 text-center mb-2 mt-2">
                          <button
                            type="button"
                            className="btn add-to-cart-btn"
                            disabled={isNullRetNull(product.quantity, 0) < 1}
                            onClick={() => {
                              this.doAddToCart(product)
                            }}>
                            <h6 className="p-0 m-0">
                              {
                                isNullRetNull(product.quantity, 0) > 0 ?
                                  "Add to Cart" : "Out of Stock"
                              }
                            </h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }

      <Notify {...this.props} />
    </>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);