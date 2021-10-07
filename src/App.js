import './App.css'
import { useEffect, useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

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
  //data variables
  const [groupedValue, setGroupedValue] = useState([]);
  const [groupValue, setGroupValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectValue, setSelectValue] = useState([]);








  const handleRemoveGroup = (groupItem) => {
    setGroup(group.filter(item => item !== groupItem))
  }

  const handleStart = () => {
    setStart(false)
    setStarted(true)
    setType()
  }

  const handleGroupValue = () => {
    setGroup([...groupValue, groupedValue])
    setGrouped('')
  }

  console.log(value);

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
            <h3 style={{ marginRight: 10 }}>Groups</h3>
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
              {group.map((value, number) => {
                return (<>
                  <p style={{ marginRight: 5, marginLeft: 5 }}>{value}:</p>
                  <InputText value={value} type="text" onChange={(e)=>setGroupedValue(e.target.value)}/>
                  <Button style={{ marginRight: 5 }} onClick={handleGroupValue} icon="pi pi-check" />
                </>)
              })}
            </div>
            <h3 style={{ marginRight: 10 }}>Fields</h3>
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
              {select.map((value) => {
                return (<>
                  <p style={{ marginRight: 5, marginLeft: 5 }}>{value}:</p>
                  <InputText />
                </>)
              })}
            </div>
            <div style={{ margin: 20 }}>
              <Button onClick={handleStart} label="Add Event" icon="pi pi-check" />
            </div>
          </div>)
          : <></>
        )}
      </div>
    </div>
  );
}

