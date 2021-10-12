import './App.css'
import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Line } from 'react-chartjs-2';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export function App() {

  //general variables
  const [type, setType] = useState();// store input value of event
  const [events, setEvents] = useState([]);// store all events that happened
  const [started, setStarted] = useState(false);//used to make other events appears
  
  const optionsNotStarted = [ //options for dropdown menu in case not started
    { label: 'Start', value: 'Start' },
  ]
  
  const optionsStarted = [ //options for dropdown menu in case started
    { label: 'Data', value: 'Data' },
    { label: 'Span', value: 'Span' },
    { label: 'Stop', value: 'Stop' },
  ]
  
  //type variables
  
  const [data, setData] = useState(false);//makes input to event Data appear
  const [start, setStart] = useState(false);//makes input to event Start appear
  const [stop, setStop] = useState(false)//makes input to event Stop appear
  
  const typeSelector = (typeSelected) => { //verify event choice and change screen
    setType(typeSelected)
    if (typeSelected === 'Data') {
      setStart(false)
      setData(true)
      setStop(false)
    } else if (typeSelected === 'Start') {
      setStart(true)
      setData(false)
      setStop(false)
    } else if (typeSelected === 'Stop') {
      setStop(true)
      setData(false)
      setStart(false)
    }
  }
  
  //start variables
  const [grouped, setGrouped] = useState(); // input value for group
  const [group, setGroup] = useState([]); // all input values for group
  const [selected, setSelected] = useState(); // input value for select
  const [select, setSelect] = useState([]); // all input values for select
  
  const handleStart = () => {// create event, make other events appear
    setEvents([...events, ['start', new Date, [...select], [...group]]])
    setStart(false)
    setStarted(true)
    setType()
  }

  const handleSelect = () => {//organize selected inside select
    setSelect([...select, selected])
    setSelected('')
  }

  const handleRemoveSelect = (selectItem) => {// remove Select from array of Select
    setSelect(select.filter(item => item !== selectItem))
  }

  const handleGroup = () => {//organize grouped inside group
    setGroup([...group, grouped])
    setGrouped('')
  }

  const handleRemoveGroup = (groupItem) => {// remove Group from array of Group
    setGroup(group.filter(item => item !== groupItem))
  }

  //data variables

  const [groupedValue, setGroupedValue] = useState([]); //input value for group
  const [groupValue, setGroupValue] = useState([]);//all input values for group
  const [selectedValue, setSelectedValue] = useState([]); // input value for select
  const [selectValue, setSelectValue] = useState([]); // all input values for select
  const [dataValues, setDataValues] = useState([]); // combination of select and group values
  const [arrayData, setArrayData] = useState([]) // values that are used to make the chart
  

  const handleGroupValue = () => { // save grouped value so it's possible to right the next
    setGroupValue([...groupValue, groupedValue])
  }

  const handleSelectValue = () => {// save selected value so it's possible to right the next
    setSelectValue([...selectValue, selectedValue])
  }

  const handleData = () => {//organize data inside their needed fields
    setEvents([...events, ['Data', new Date, [...groupValue], [...selectValue]]])
    setDataValues([...dataValues, [...groupValue, ...selectValue]])
    setGroupValue([]);
    setSelectValue([]);
    chartValues();
  }

  const handleRemoveData = (dataItem) => {// remove Data from array of Data
    // if to make chart desapear in case there is no data
    if (dataValues.length - 1 === 0) {
      setGenerated(false)
    }
    setDataValues(dataValues.filter(item => item !== dataItem))
    setArrayData([]);
  }

  //stop variables
  
  const handleStop = () => { // set most variables to null so it can start a new chart
    setEvents([...events, ['Stop', new Date]])
    setGenerated(false)
    setDataValues([])
    setGroup([])
    setSelect([])
    setStarted(false)
    setStop(false)
    setArrayData([]);
  }

  //chart variables

  const [generated, setGenerated] = useState(false)// makes chart appear

  const chartValues = () => {
    //if to only loops if there is at least two values
    if (dataValues[1]) {
      //loops to compare every item inside dataValues
      for (var i = 0; i < dataValues.length; i++) {
        for (var j = 0; j < dataValues.length; j++) {
          // if to not compare the same values
          if(dataValues[i]!==dataValues[j]){
          // if to se if groups are the same
          if ((JSON.stringify(dataValues[i].slice(0, group.length)) === JSON.stringify(dataValues[j].slice(0, group.length)))) {
            // loop to get the position of the correct values that will make the chart
            for (var k = 0; k < select.length; k++) {
              setArrayData([...arrayData,
              ['{' + dataValues[i].slice(0, group.length) + ',' + select[k-1] + '}',
              dataValues[j][group.length + k - 1],
              dataValues[i][group.length + k - 1]],
              ['{' + dataValues[i].slice(0, group.length) + ',' + select[k] + '}',
              dataValues[j][group.length + k],
              dataValues[i][group.length + k]]
              ])
            }
          }
        }
        }
      }
    }
  }

  const dataChart = {// the data required to make chart
    labels: select.map((item, index) => { return index }),
    datasets: arrayData.map((item3, number3) => {
      return (
        {
          label: (generated ? item3[0] : 'Titulo'),
          data: (generated ? item3.slice(1, item3.length) : 0),
          fill: false,
          backgroundColor: (number3 % 5 === 0 ? 'rgb(255, 99, 132)' : number3 % 4 === 0 ? 'rgb(96, 141, 29)' : number3 % 3 === 0 ? 'rgb(79, 151, 163)' : number3 % 2 === 0 ? 'rgb(185, 24, 156)' : 'rgb(255, 219, 36)'),
          borderColor: (number3 % 5 === 0 ? 'rgb(255, 99, 132)' : number3 % 4 === 0 ? 'rgb(96, 141, 29)' : number3 % 3 === 0 ? 'rgb(79, 151, 163)' : number3 % 2 === 0 ? 'rgb(185, 24, 156)' : 'rgb(255, 219, 36)'),
          yAxisID: 'y-axis-1',
        }
      )
    })
  };

  const options = { // style options chart
    plugins: {
      legend: {
        position: 'right'
      },
    }
  }

  return (
    <div className="App">
      <h1 className='title'>Fred's Challenge</h1>
      <div>
        <div>
          <Dropdown className={'p-dropdown'} value={type} options={started ? optionsStarted : optionsNotStarted} onChange={(e) => typeSelector(e.value)} placeholder="Select a Type" />
        </div>
        {start ? (//start event manual input
          <>
            <div style={{ margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ marginRight: 5 }}>Fields:</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputText value={selected} onChange={(e) => setSelected(e.target.value)} />
                  <Button style={{ marginRight: 5 }} onClick={handleSelect} icon="pi pi-check" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ marginRight: 5 }}>Groups:</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputText value={grouped} onChange={(e) => setGrouped(e.target.value)} />
                  <Button style={{ marginRight: 5 }} onClick={handleGroup} icon="pi pi-check" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                <p>Selected Fields:</p>
                {select.map((value) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                      <small style={{ marginRight: 5, marginLeft: 5 }}>{value}</small>
                      <Button onClick={() => handleRemoveSelect(value)} style={{ height: 20, width: 20, fontSize: '5em', }} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Selected Groups:</p>
                {group.map((value) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                      <small style={{ marginRight: 5, marginLeft: 5 }}>{value}</small>
                      <Button onClick={() => handleRemoveGroup(value)} style={{ height: 20, width: 20, fontSize: '5em', }} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
                    </div>
                  )
                })}
              </div>
              <div style={{ margin: 20 }}>
                <Button onClick={handleStart} label="Add Event" icon="pi pi-check" />
              </div>
            </div>
          </>
        ) : (data ? (//data event manual input
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <small>Instructions: Do it one by one.When all set, click on Add Event.Verify, delete if needed.</small>
                <h3 style={{ marginRight: 10 }}>Groups</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
                  {group.map((value, number) => {
                    return (<>
                      <p style={{ marginRight: 5, marginLeft: 5 }}>{value}:</p>
                      <InputText disabled={groupValue[number]} value={groupValue[number]} onChange={(e) => setGroupedValue(e.target.value)} />
                      <Button disabled={groupValue[number]} style={{ marginRight: 5 }} onClick={handleGroupValue} icon="pi pi-check" />
                    </>)
                  })}
                </div>
                <h3 style={{ marginRight: 10 }}>Fields</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
                  {select.map((value, number) => {
                    return (<>
                      <p style={{ marginRight: 5, marginLeft: 5 }}>{value}:</p>
                      <InputNumber disabled={selectValue[number]} value={selectValue[number]} onValueChange={(e) => setSelectedValue(e.target.value)} mode='decimal' minFractionDigits={1} locale="de-DE" />
                      <Button disabled={selectValue[number]} style={{ marginRight: 5 }} onClick={handleSelectValue} icon="pi pi-check" />
                    </>)
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Data:</p>
                {dataValues.map((value) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
                      <small style={{ marginRight: 5, marginLeft: 5 }}>{'{' + value + '}'}</small>
                      <Button onClick={() => handleRemoveData(value)} style={{ height: 20, width: 20, fontSize: '5em', }} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ margin: 20 }}>
              <Button disabled={!((selectValue.length + groupValue.length) === (select.length + group.length))} onClick={handleData} label="Add Event" icon="pi pi-check" />
            </div>
          </div>)
          : (stop ? // stop event
          <Button style={{ margin: 5 }} onClick={handleStop} label="Delete chart and stop this set of data." icon="pi pi-check" /> 
          : <></>)
        )}
        {generated ? (
          <div className="card">
            <Line data={dataChart} options={options} />
          </div>) : <></>}
      </div>
      <footer>
        <div style={{ width: '100%', padding: 5, backgroundColor: '#414141', height: 50, alignItems: 'center' }}>
          <Button disabled={generated ? generated : arrayData.length === 0} onClick={() => setGenerated(true)} label="Generate Chart" />
        </div>
      </footer>
    </div>
  );
}