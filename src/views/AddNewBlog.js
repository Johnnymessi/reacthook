import './Blog.scss';
import { useState } from 'react';
import axios from 'axios';

const AddNewBlog = (props) => {
    const [title, setTitle] = useState('');

    const [content, setContent] = useState('');


    // event.preventDefault(); //ngăn chặn re-load  lại trang

    const handleSubmitBtn = async () => {
        // event.preventDefault(); // Ngăn chặn hành động mặc định của form 
        if (!title) {
            alert('empty title');
            return;
        }
        if (!content) {
            alert('empty content');
            return;
        }

        let data = {
            title: title,
            body: content,
            userId: 1,
        }

        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);

        if (res && res.data) {
            let newBlog = res.data;
            props.handleAddNew(newBlog);

            // console.log('>> check new blogs: ', newBlogs);
        }

        // console.log('>>> check data before send >>> title: ', title, 'content: ', content);
        console.log('check res post data: ', res)
    }

    return (

        <form onSubmit={handleSubmitBtn}>
            <div className="add-new-container">
                <div className="text-add-new">---- ADD NEW BLOG -----</div>
                <div className='inputs-data'>
                    <label>Title: </label>

                    <input type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className='inputs-data'>
                    <label>Content: </label>
                    <input type="text"
                        value={content}
                        onChange={(event) => setContent(event.target.value)} />
                </div>

                {/* <button className='btn-add-new' onClick={handleSubmitBtn}>Submit</button> */}

                <button className='btn-add-new' type='submit'>Submit</button>

            </div>
        </form>

    )
}

export default AddNewBlog;