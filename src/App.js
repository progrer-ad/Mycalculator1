import './App.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  }

  const clear = () => {
    setResult("");
  }

  const handleDelete = () => {
    setResult(result.slice(0, -1));
  }

  const calculate = () => {
    try {
      setResult(evaluateExpression(result));
    } catch {
      setResult("Error");
    }
  }

  const evaluateExpression = (expression) => {
    const ops = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const values = [];
    const operators = [];

    const precedence = (op) => {
      if (op === '+' || op === '-') return 1;
      if (op === '*' || op === '/') return 2;
      return 0;
    };

    const applyOp = () => {
      const b = values.pop();
      const a = values.pop();
      const op = operators.pop();
      values.push(ops[op](a, b));
    };

    let i = 0;
    while (i < expression.length) {
      if (!isNaN(expression[i])) {
        let value = '';
        while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
          value += expression[i++];
        }
        values.push(parseFloat(value));
      } else if (expression[i] in ops) {
        while (operators.length && precedence(operators[operators.length - 1]) >= precedence(expression[i])) {
          applyOp();
        }
        operators.push(expression[i]);
        i++;
      } else {
        i++;
      }
    }

    while (operators.length) {
      applyOp();
    }

    return values[0].toString();
  };

  return (
    <div className="App">
      <h1>Calculator</h1>

      <div className='container'>
        <form>
          <input type="text" value={result} readOnly />
        </form>

        <div className='keypad'>
          <button name="1" onClick={handleClick}>1</button>
          <button name="2" onClick={handleClick}>2</button>
          <button name="3" onClick={handleClick}>3</button>
          <button name="+" onClick={handleClick} className='highlight'>+</button>
          <button name="4" onClick={handleClick}>4</button>
          <button name="5" onClick={handleClick}>5</button>
          <button name="6" onClick={handleClick}>6</button>
          <button name='/' onClick={handleClick} className='highlight'>&divide;</button>
          <button name="7" onClick={handleClick}>7</button>
          <button name="8" onClick={handleClick}>8</button>
          <button name="9" onClick={handleClick}>9</button>
          <button name="-" onClick={handleClick} className='highlight'>-</button>
          <button onClick={clear} id='clear' className='danger'>C</button>
          <button name="0" onClick={handleClick}>0</button>
          <button name="." onClick={handleClick}>.</button>
          <button name="*" onClick={handleClick} className='highlight'>&times;</button>

          <button onClick={handleDelete} className='highlight'>DEL</button>
          <button onClick={calculate} id='equal' className='highlight'>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
