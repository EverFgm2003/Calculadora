import React, { useState } from 'react';
import Complex from 'complex.js';
import './App.css';

function CalculadoraCientifica() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const isValidComplexString = (str) => {
    const complexRegex = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:[-+](?:\d+\.?\d*|\.\d+))?i?)?$/;
    return complexRegex.test(str.trim());
  };

  const parseComplex = (str) => {
    str = str.trim().replace(/\s/g, '');
    if (str === 'i') return new Complex(0, 1);
    if (str === '-i') return new Complex(0, -1);
    if (!str.includes('i')) return new Complex(parseFloat(str), 0);
    
    let parts = str.split(/(?=[-+])/);
    let real = 0, imag = 0;
    
    parts.forEach(part => {
      if (part.includes('i')) {
        imag += part === 'i' ? 1 : part === '-i' ? -1 : parseFloat(part.replace('i', ''));
      } else {
        real += parseFloat(part);
      }
    });
    
    return new Complex(real, imag);
  };

  const calculate = () => {
    try {
      const terms = input.split(/([+\-*/])/).map(term => term.trim()).filter(term => term !== '');
      
      const processedTerms = terms.map(term => {
        if (['+', '-', '*', '/'].includes(term)) {
          return term;
        } else if (isValidComplexString(term)) {
          return parseComplex(term);
        } else {
          throw new Error('Término inválido: ' + term);
        }
      });

      let result = processedTerms[0];
      for (let i = 1; i < processedTerms.length; i += 2) {
        const operator = processedTerms[i];
        const nextTerm = processedTerms[i + 1];
        switch (operator) {
          case '+': result = result.add(nextTerm); break;
          case '-': result = result.sub(nextTerm); break;
          case '*': result = result.mul(nextTerm); break;
          case '/': result = result.div(nextTerm); break;
          default: throw new Error('Operador no válido: ' + operator);
        }
      }

      setResult(result.toString().replace(/j/g, 'i'));
    } catch (error) {
      setResult('Error: ' + error.message);
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
      if (!isValidComplexString(input)) {
        throw new Error('Entrada inválida para operación compleja');
      }
      const complexInput = parseComplex(input);
      let result;
      switch (operation) {
        case 'abs': result = complexInput.abs(); break;
        case 'arg': result = complexInput.arg(); break;
        case 'conjugate': result = complexInput.conjugate(); break;
        default: throw new Error('Operación no reconocida');
      }
      setResult(result.toString().replace(/j/g, 'i'));
    } catch (error) {
      setResult('Error: ' + error.message);
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
          <button onClick={() => handleClick('i')} className="complex">i</button>

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