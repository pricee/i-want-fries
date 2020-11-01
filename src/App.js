import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
const { stores } = require('./stores');

function App() {
  return (
    <div className="App">
      <h1>I Want Fries</h1>
      <h2>By Emma Price</h2>
      <Grid container className="stores" direction="column" spacing={2}>
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
            <Grid container item justify="center" spacing={5}>
                {row.map(store => {
                    return <Grid key={store.name} item xs={4}>
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
          <Grid container item xs>
              <Grid item xs={8}>
                  <h3>{props.storeName}</h3>
              </Grid>
              <Grid item xs={4}>
                  <h5>{`$${props.price}`}</h5>
              </Grid>
          </Grid>
          <Grid container item xs>
              <Grid item xs={4}>
                <div className="stats">{`Thickness: ${props.thickness}`}</div>
                  <div className="stats">{`Saltiness: ${props.saltiness}`}</div>
                  <div className="stats">{`Potatoiness: ${props.potatoyness}`}</div>
                  <div className="stats">{`Crispiness: ${props.crispiness}`}</div>
              </Grid>
              <Grid item xs={8}>
                  <div>Emma's Score</div>
                  <div style={{fontSize:50}}>{props.overall}</div>
                  <div>Comments:</div>
                  <div>{props.comments}</div>
              </Grid>
          </Grid>
      </Grid>
  );
}

export default App;
