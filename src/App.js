import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import { useState, useEffect } from 'react';
import Todo from './views/Todo';
import Covid from './views/Covid';

// template + logic
//  JSX

/**
 * Sự khác biệt giữa vòng lặp for & foreach (2 vòng lặp này làm ảnh hưởng tới dữ liệu)
 * 
 * for: lặp theo index
 * 
 * foreach: lặp theo phần tử(1 đối tượng bên trong)
 * 
 * vòng lặp map: trả về một array mới ko làm ảnh hướng tới dữ liệu
*/

const App = () => {
  // let name = 'Mkey';
  // let number = 2023;
  // let obj = { name: 'MKEY', channel: 'MKEY IT', number: 2023 };
  // let link = 'https://www.youtube.com/watch?v=Y9gTouaZJ5s&list=PLncHg6Kn2JT4xzJyhXfmJ53dzwVbq-S_E&index=10';


  //STRING
  let [name, setName] = useState('Mkey');

  const [address, setAddress] = useState('');

  //ARRAY
  const [todos, setTodos] = useState([
    { id: 'todo 1', title: 'MKEY IT CHANNEL', type: 'mkey' },
    { id: 'todo 2', title: 'Doing homework', type: 'mkey' },
    { id: 'todo 3', title: 'Playing Game', type: 'mkeyit' }
  ])

  //didmount
  useEffect(() => {
    console.log('run use effect')
  }, [address]);

  useEffect(() => {
    console.log('run use effect todos')
  }, [todos]);

  const handleEventClick = (event) => {

    // khi dùng vs hook
    // setName(address);

    // this.setState - khi dùng class

    // console.log('>> Click me', name)

    if (!address) {
      alert('empty input')
      return;
    }

    let newTodo = {
      id: Math.floor((Math.random() * 100) + 1),
      title: address,
      type: 'mkey'
    }
    // hook not merge state - không tự động cộng gộp dữ liệu cũ vào với dữ liệu mới

    //...spread syntax array js
    setTodos([...todos, newTodo])
    setAddress('')

  }

  // cập nhật thay đổi giá trị sau khi gõ bàn phím sẽ được cập nhật
  const handleOnchangeInput = (event) => {

    setAddress(event.target.value)

  }

  const deleteDataTodo = (id) => {
    let currentTodos = todos
    currentTodos = currentTodos.filter(item => item.id !== id)
    setTodos(currentTodos)
  }


  return (
    <div className="App">

      <header className="App-header">
        <Nav />

        <img src={logo} className="App-logo" alt="logo" />

        {/* <h1>Hello ReactJs and {obj.name} in {obj.number}</h1> */}

        {/* <p style={{ color: 'red', fontSize: 12, }}>{JSON.stringify(obj)}</p>

        <a href={link} >Visit my channel</a> */}

        <h1>Hello ReactJs and {name} </h1>
        <Covid />


        <Todo
          todos={todos}
          title={'All todos'}
          deleteDataTodo={deleteDataTodo}
        />

        {/* vòng lặp filter: lọc phần tử có type == 'mkey' */}
        <Todo
          todos={todos.filter(item => item.type === 'mkey')}
          title={'Mkey todos'}
          deleteDataTodo={deleteDataTodo}
        />


        <input type='text' value={address} onChange={(event) => handleOnchangeInput(event)} />

        <button type='button' onClick={(event) => handleEventClick(event)}>Click me</button>
      </header>
    </div>
  );
}

export default App;
