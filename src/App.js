import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
const { ratedStores, unratedStores } = require('./stores1');

function App() {
  const screenWidth = useWindowSize();

  return (
    <div className="App">
      <h1 className="site-title">I Want Fries</h1>
      <div className="site-subtitle">Because, let's be honest, all we really want are fries</div>
      <Grid container className="stores" direction="column" spacing={0}>
          {renderStores(ratedStores, screenWidth)}
          {renderStores(unratedStores, screenWidth)}
      </Grid>
      <div className="bottom-text">By <a href="https://github.com/pricee/i-want-fries" target="_blank" rel="noreferrer">Emma Price</a></div>
      <div>Think I'm wrong? Have a recommendation? Email emmalinprice@gmail.com</div>
    </div>
  );
}

function useWindowSize() {
    const [width, setWidth] = React.useState(0);
    React.useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return width;
}

function renderStores(stores, screenWidth) {
    const storesGrid = [];
    let rowSize = 3;
    if (screenWidth < 800) {
        rowSize = 1;
    } else if (screenWidth < 1200) {
        rowSize = 2;
    }
    for (let i = 0; i < stores.length; i += rowSize) {
        if (i + rowSize > stores.length) {
            storesGrid.push(stores.slice(i, stores.length));
        } else {
            storesGrid.push(stores.slice(i, i + rowSize));
        }
    }
    return storesGrid.map((row, index) => {
        return (
            <Grid className="row" key={`row-${index}`} container item justify="center" spacing={3}>
                {row.map((store, rowIndex) => {
                    let spacing = 4;
                    if (rowSize === 2) {
                        spacing = 6;
                    } else if (rowSize === 1) {
                        spacing = 12;
                    }
                    return <Grid className="single-store" key={store.Location} item xs={spacing}>
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

function showSizes(sizes, location) {
    return sizes.map(sizeInfo =>
            <div style={{fontSize:18}} key={`${location}-${sizeInfo.size}`}><b>{sizeInfo.size + ": " + getPrice(sizeInfo.price)}</b></div>
    )
}

function Store(props) {
  if (props.thickness === "") {
      return (
          <Grid container className="Store comingSoon" direction="column">
              <Grid container item xs style={{ padding:15 }} justify="center">
                      <div style={{fontSize:30 }}><b>{props.storeName}</b></div>
              </Grid>
              <Grid container item xs justify="center">
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
          <Grid container item xs>
              <Grid className="store-section left" container item xs={4} justify="center">
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
          <Grid className="address" container item xs justify="center">
              <div><i>{props.address}</i></div>
          </Grid>
      </Grid>
  );
}

export default App;
