import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
const { stores } = require('./stores');

function App() {
  return (
    <div className="App">
      <h1 className="site-title">I Want Fries</h1>
      <div className="site-subtitle">Because, let's be honest, all we really want are fries</div>
      <Grid container className="stores" direction="column" spacing={0}>
          {renderStores()}
      </Grid>
    </div>
  );
}



function renderStores() {
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
                    return <Grid className="single-store" key={store.name} item xs={4}>
                        <Store
                            storeName={store.name}
                            price={store.price}
                            thickness={store.thickness}
                            potatoyness={store.potatoyness}
                            saltiness={store.saltiness}
                            crispiness={store.crispiness}
                            overall={store.overall}
                            comments={store.comments}
                        />
                    </Grid>
                })}
            </Grid>);
    });
}

function Store(props) {
  return (
      <Grid container className="Store" direction="column">
          <Grid container item xs style={{padding:15}}>
              <Grid item xs={8}>
                  <div style={{fontSize:30}}><b>{props.storeName}</b></div>
              </Grid>
              <Grid item xs={4}>
                  <div style={{fontSize:25}}><b>{`$${props.price}`}</b></div>
              </Grid>
          </Grid>
          <Grid container item xs borderRadius={20}>
              <Grid className="store-section-left" item xs={4} justify="center">
                  <div className="all-stats">
                      <div className="stats"><b><i>Thickness: </i></b>{props.thickness}</div>
                      <div className="stats"><b><i>Saltiness: </i></b>{props.saltiness}</div>
                      <div className="stats"><b><i>Potatoiness: </i></b>{props.potatoyness}</div>
                      <div className="stats"><b><i>Crispiness: </i></b>{props.crispiness}</div>
                  </div>
              </Grid>
              <Grid className="store-section-right" item xs={8}>
                  <div style={{fontSize:20}}><b>Emma's Score</b></div>
                  <div style={{fontSize:50}}>{props.overall}</div>
                  <div><b><i>Comments:</i></b></div>
                  <div className="comments">{props.comments}</div>
              </Grid>
          </Grid>
      </Grid>
  );
}

export default App;
