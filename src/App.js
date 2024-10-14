import React, { useState } from 'react';
import Complex from 'complex.js';
import './App.css';

function CalculadoraCientifica() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleScientificFunction = (func) => {
    try {
      let newInput;
      switch (func) {
        case 'sin':
          newInput = Math.sin(eval(input)).toString();
          break;
        case 'cos':
          newInput = Math.cos(eval(input)).toString();
          break;
        case 'log':
          newInput = Math.log(eval(input)).toString();
          break;
        case 'pow':
          const [base, exponent] = input.split(',').map(eval);
          newInput = Math.pow(base, exponent).toString();
          break;
        default:
          return;
      }
      setResult(newInput);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleComplexOperation = (operation) => {
    try {
      const complexInput = new Complex(input);
      let newInput;
      switch (operation) {
        case 'abs':
          newInput = complexInput.abs().toString();
          break;
        case 'arg':
          newInput = complexInput.arg().toString();
          break;
        case 'conjugate':
          newInput = complexInput.conjugate().toString();
          break;
        default:
          return;
      }
      setResult(newInput);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="calculator-container">
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly className="input" />
        <input type="text" value={result} readOnly className="result" />
      </div>
      <div className="buttons">
        <button onClick={clearInput} className="clear">C</button>
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>
        <button onClick={() => handleClick('/')} className="operator">/</button>
        
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')} className="operator">*</button>
        
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')} className="operator">-</button>
        
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')} className="operator">+</button>
        
        <button onClick={() => handleClick('0')} className="zero">0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={calculate} className="equal">=</button>

        <button onClick={() => handleClick(',')}>,</button>
        <button onClick={() => handleScientificFunction('sin')}>sin</button>
        <button onClick={() => handleScientificFunction('cos')}>cos</button>
        <button onClick={() => handleScientificFunction('log')}>log</button>


        <button onClick={() => handleScientificFunction('pow')}>pow</button>
        <button onClick={() => handleComplexOperation('abs')}>|z|</button>
        <button onClick={() => handleComplexOperation('arg')}>arg(z)</button>
        <button onClick={() => handleComplexOperation('conjugate')}>conj(z)</button>
      </div>
    </div>
    </div>
  );
}

export default CalculadoraCientifica;