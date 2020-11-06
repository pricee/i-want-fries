import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
const { ratedStores, unratedStores } = require('./stores1');

function App() {
  return (
    <div className="App">
      <h1 className="site-title">I Want Fries</h1>
      <div className="site-subtitle">Because, let's be honest, all we really want are fries</div>
      <Grid container className="stores" direction="column" spacing={0}>
          {renderStores(ratedStores)}
          {renderStores(unratedStores)}
      </Grid>
      <div className="bottom-text">By <a href="https://github.com/pricee/i-want-fries" target="_blank">Emma Price</a></div>
    </div>
  );
}



function renderStores(stores) {
    const storesGrid = [];
    for (let i = 0; i < stores.length; i +=3) {
        if (i + 3 > stores.length) {
            storesGrid.push(stores.slice(i, stores.length));
        } else {
            storesGrid.push(stores.slice(i, i + 3));
        }
    }
    return storesGrid.map(row => {
        return (
            <Grid className="row" container item justify="center" spacing={3}>
                {row.map(store => {
                    return <Grid className="single-store" key={store.Location} item xs={4}>
                        <Store
                            storeName={store.Location}
                            address={store.Address}
                            sizes={store.sizes}
                            thickness={store.Thickness}
                            potatoyness={store.Potatoyness}
                            saltiness={store.Saltiness}
                            crispiness={store.Crispiness}
                            overall={store.EmmaOverall}
                            comments={store.Comments}
                        />
                    </Grid>
                })}
            </Grid>);
    });
}

function getPrice(price) {
    if (price === "") {
        return "";
    } else {
        return "$" + parseFloat(price).toFixed(2);
    }
}

function showSizes(sizes) {
    return sizes.map(sizeInfo =>
            <div style={{fontSize:18}}><b>{sizeInfo.size + ": " + getPrice(sizeInfo.price)}</b></div>
    )
}

function Store(props) {
  if (props.thickness === "") {
      return (
          <Grid container className="Store comingSoon" direction="column">
              <Grid container item xs style={{ padding:15 }} justify="center">
                      <div style={{fontSize:30 }}><b>{props.storeName}</b></div>
              </Grid>
              <Grid container item xs borderRadius={20} justify="center">
                  <div style={{ fontSize:20, paddingBottom:20 }}><b>Coming Soon...</b></div>
              </Grid>
          </Grid>);
  }

  return (
      <Grid container className="Store" direction="column">
          <Grid className="store-top" container item xs>
              <Grid item xs={8}>
                  <div style={{fontSize:30}}><b>{props.storeName}</b></div>
              </Grid>
              <Grid item xs={4}>
                  {showSizes(props.sizes)}
              </Grid>
          </Grid>
          <Grid container item xs borderRadius={20}>
              <Grid className="store-section left" item xs={4} justify="center">
                  <div className="all-stats">
                      <div className="stats"><b><i>Thickness: </i></b>{props.thickness}</div>
                      <div className="stats"><b><i>Saltiness: </i></b>{props.saltiness}</div>
                      <div className="stats"><b><i>Potatoiness: </i></b>{props.potatoyness}</div>
                      <div className="stats"><b><i>Crispiness: </i></b>{props.crispiness}</div>
                  </div>
              </Grid>
              <Grid className="store-section right" item xs={8}>
                  <div style={{fontSize:20}}><b>Emma's Score</b></div>
                  <div style={{fontSize:50}}>{props.overall}</div>
                  <div><b><i>Comments:</i></b></div>
                  <div className="comments">{props.comments}</div>
              </Grid>
          </Grid>
          <Grid className="address" item xs justify="center">
              <div><i>{props.address}</i></div>
          </Grid>
      </Grid>
  );
}

export default App;
