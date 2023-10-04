const Todo = (props) => {
    // properties: truyền dữ liệu từ cha xuống con , trên xuống dưới
    // parent => child, top => bottom
    // props giúp tái sử dụng components

    // const todos = props.todos;
    const { todos, title, deleteDataTodo } = props;

    const handleDelete = (id) => {
        deleteDataTodo(id)
    }

    return (
        <div className='todos-container'>

            {/* vòng lặp map */}
            {/* biến bắt buộc : key={todo.id} */}

            <div className="title">
                {title}
            </div>


            {todos.map(todo => {

                // console.log('>> check todo list: ', todo)

                return (
                    <div key={todo.id}>

                        <li className='todo-child' >
                            {todo.title}

                            &nbsp;&nbsp;

                            <span onClick={() => handleDelete(todo.id)}>X</span>
                        </li>


                    </div>


                )

            })}

            <hr />


        </div>
    )
}

export default Todo;