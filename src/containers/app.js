import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';

const MAPBOX_TOKEN = ''; //Acquire Mapbox accesstoken

class App extends Container {
  render() {
    const { actions, inputFileName, viewport, movedData } = this.props;
    const { movesFileName } = inputFileName;
    const gridcelldata = movedData.filter((x)=>x.gridcelldata);

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="flex_list">
            <li className="flex_row">
              <div className="harmovis_input_button_column">
              <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput" />
              </label>
              <div>{movesFileName}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              gridcelldata.length > 0  ?
              gridcelldata.map((data,idx)=>{
                return new GridCellLayer({
                  id: 'xband-mesh-layer-' + String(idx),
                  data: data.gridcelldata,
                  getElevation:(x)=>x.elevation,
                  getFillColor:(x)=>x.color,
                  opacity: 1,
                  cellSize: 100,
                  elevationScale: 10,
                  pickable: true
                })
              }):null
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
