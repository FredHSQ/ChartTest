import './App.css'
import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Chart } from 'primereact/chart';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export function App() {

  //general variables
  const [type, setType] = useState();
  const [started, setStarted] = useState(false);

  const typeSelector = (typeSelected) => {
    setType(typeSelected)
    if (typeSelected === 'Data') {
      setStart(false)
      setData(true)
    } else if (typeSelected === 'Start') {
      setStart(true)
      setData(false)
    }
  }

  //type variables
  const [data, setData] = useState(false);
  const [start, setStart] = useState(false);

  const optionsNotStarted = [
    { label: 'Start', value: 'Start' },
  ]

  const optionsStarted = [
    { label: 'Data', value: 'Data' },
    { label: 'Span', value: 'Span' },
    { label: 'Stop', value: 'Stop' },
  ]

  const handleStart = () => {
    setStart(false)
    setStarted(true)
    setType()
  }

  //start variables
  const [grouped, setGrouped] = useState();
  const [group, setGroup] = useState([]);
  const [selected, setSelected] = useState();
  const [select, setSelect] = useState([]);

  const handleSelect = () => {
    setSelect([...select, selected])
    setSelected('')
  }

  const handleRemoveSelect = (selectItem) => {
    setSelect(select.filter(item => item !== selectItem))
  }

  const handleGroup = () => {
    setGroup([...group, grouped])
    setGrouped('')
  }

  const handleRemoveGroup = (groupItem) => {
    setGroup(group.filter(item => item !== groupItem))
  }

  //data variables
  const [groupedValue, setGroupedValue] = useState([]);
  const [groupValue, setGroupValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const handleGroupValue = () => {
    setGroupValue([...groupValue, groupedValue])
  }

  const handleSelectValue = () => {
    setSelectValue([...selectValue, selectedValue])
  }

  const handleData = () => {
    setDataValues([...dataValues, [...groupValue, ...selectValue]])
    setGroupValue([]);
    setSelectValue([]);
  }

  const handleRemoveData = (dataItem) => {
    setDataValues(dataValues.filter(item => item !== dataItem))
  }

  //chart variables

  const basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: .4
        }
    ]
  };

  // const basicData = {
  //   labels: groupValue,
  //   datasets: [ dataValues.map((item, number)=>{ 
  //     const groupDataValues = item.slice(0, group.length)
  //     const selectDataValues = item.slice(group.length, group.length+select.length )
  //     return (
  //       {
  //         label: {groupDataValues},
  //         data: {selectDataValues},
  //         fill: false,
  //         borderColor: '#52A5F5',
  //         tension: .4
  //       }
  //     )}
  //   )]
  // };

  const getLightTheme = () => {
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
    return {
      basicOptions,
    }
  }

  const { basicOptions } = getLightTheme();

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
                      <InputText disabled={selectValue[number]} value={selectValue[number]} onChange={(e) => setSelectedValue(e.target.value)} />
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
          : <></>
        )}
        <div className="card">
          <h5>Basic</h5>
          <Chart type="line" data={basicData} options={basicOptions} />
        </div>: <></>
      </div>
    </div>
  );
}

