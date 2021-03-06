import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import App from './App';
import ProductIndexContainer from './products/product_index_container';
import ProductItemContainer from './products/product_item_container';
import CartContainer from './cart/cart_container';
import SellContainer from './sell/sell_container';
import { ProtectedRoute } from '../util/route_util';
import SearchPageContainer from './search_page/search_page_container';
import TestContainer from './test/test_container';
import AboutPage from './about_page/about_page';
import ComingSoon from './coming_soon/coming_soon';
import ProfileContainer from './profile/profile_container';

const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/products/:productId' exact component={ProductItemContainer} />
                <Route path='/' exact component={App} />
                <Route path='/products/' exact component={ProductIndexContainer}/>
                <Route path='/search=:searchValue' component={SearchPageContainer} />
                <Route path='/test' exact component={TestContainer} />
                <Route path='/about' exact component={AboutPage} />
                <Route path='/soon' exact component={ComingSoon} />
                <Route path='/profile' exact component={ProfileContainer} />
                <ProtectedRoute path='/cart' exact component={CartContainer}/>
                <ProtectedRoute path='/sell' exact component={SellContainer} />
            </Switch>
        </HashRouter>
    </Provider>
);

export default Root;