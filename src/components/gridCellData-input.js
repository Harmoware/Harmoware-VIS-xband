import * as React from 'react';

export default class GridCellDataInput extends React.Component {
  onSelect(e) {
    const { actions, setGridcelldataDic } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    actions.setMovesBase([]);
    reader.readAsText(file);
    const file_name = file.name;
    reader.onload = () => {
      let readdata = null;
      try {
        readdata = JSON.parse(reader.result.toString());
      } catch (exception) {
        window.alert(exception);
        return;
      }
      if (!Array.isArray(readdata)) { // Not Array?
        window.alert('type MovesbaseFile is not supported.');
        return;
      }
      const setGridcelldata = {};
      const movebase = readdata.reduce((movebase,readdataelement)=>{
        const {meshId, operation:sourceoperation, ...other1} = readdataelement;
        const operation = sourceoperation.reduce((operation,operationelement)=>{
            const {gridcelldata, elapsedtime, ...other2} = operationelement;
            const key = meshId+String(elapsedtime);
            setGridcelldata[key] = gridcelldata;
            operation.push({gridcelldata:key, elapsedtime, ...other2});
            return operation;
        },[]);
        movebase.push({meshId, operation, ...other1});
        return movebase;
      },[]);
      setGridcelldataDic(setGridcelldata)
      actions.setInputFilename({ movesFileName: file_name });
      actions.setMovesBase(movebase);
      actions.setAnimatePause(false);
      actions.setAnimateReverse(false);
    };
  }

  onClick(e) {
    const { actions, setGridcelldataDic } = this.props;
    setGridcelldataDic({})
    actions.setInputFilename({ movesFileName: null });
    actions.setMovesBase([]);
    e.target.value = '';
  }

  render() {
    const { id, className, style } = this.props;

    return (
      <input type="file" accept=".json"
      id={id} className={className} style={style}
      onClick={this.onClick.bind(this)}
      onChange={this.onSelect.bind(this)}
      />
    );
  }
}
