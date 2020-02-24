import React, { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import Bar from './components/progress-bar/bar'
import pass from 'zxcvbn';

interface IOptions{
  uppercase?: boolean,
  special_c?: boolean,
  numbers?: boolean
}

const generatePassword = (length: number, options?: IOptions) =>  { 

   let result = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   if(options){
    options.numbers && (characters += '0123456789');
    options.uppercase && (characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    options.special_c && (characters += '!@#$~{}[]');
   }
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
  
}

const App: React.FC<{}> = () => {

  const [text, setText] = useState<string>('');
  const [range, setRange] = useState<number>(5);
  const [points, setPoints] = useState<number>(0);
  const [options, setOptions] = useState<IOptions>({});

  const info:Array<string> = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Really Strong' ]
  const color:Array<string> = ['red', 'orange',  'yellow',  'green', '#15ff15']

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleRangeChange = (e:ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value));
  }

  const buttonClick = () => {
    setText(generatePassword(range, options))
  }

  const addOption = (e:ChangeEvent<HTMLInputElement>) => {
    setOptions(Object.assign(options, {[e.target.name] : e.target.checked}));
  }

  let inputText:HTMLInputElement | null;

  const copyToClipboard = () => {
    const el = inputText;
    el && el.select()
    document.execCommand("copy")
  }

  useEffect(() => {
    setText(text.slice(0, range));
    setPoints(pass(text).score);
  });

  return (
    <div className="App">
        <h1>PASSWORD GENERATOR</h1>
        <div className="input-group">
        <input ref={(input) => inputText = input} onChange={handleChange} placeholder="Type your password here" type="text" value={text} maxLength={range}/>
        <a className="copy" onClick={copyToClipboard}>copy to clipboard</a>
        </div>
        <div className="flex spb range">
          <label>Max password length: {range}</label>
          <input onChange={handleRangeChange} value={range} type="range" min="5" max="20"/>
        </div>
        <div className="options">
          <label>
          <input type="checkbox" onChange={addOption} name="uppercase"/>
            Include Uppercase Characters
          </label>
          <label>
          <input type="checkbox" onChange={addOption} name="special_c"/>
            Include Especial Characters
          </label>
          <label>
          <input type="checkbox" onChange={addOption} name="numbers"/>
            Include Numbers
          </label>
        </div>
        <button onClick={buttonClick} className="generate-button">Generate</button>
        <Bar color={color[points]} completed={points * 25}/>
        <label>{info[points]}</label>
    </div>
  );
}

export default App;
