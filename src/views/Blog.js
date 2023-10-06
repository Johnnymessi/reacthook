// Import các thành phần cần thiết từ thư viện react-router-dom và custom hook useFetch
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../customize/fetch";
import { Link } from 'react-router-dom'

// Import file stylesheet Blog.scss
import './Blog.scss'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AddNewBlog from "./AddNewBlog";

// Tạo một functional component có tên là DetailBlog
const Blog = () => {
    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Sử dụng hook useParams để trích xuất tham số 'id' từ URL
    let { id } = useParams();

    // Sử dụng hook useHistory để truy cập đối tượng history, cho phép điều hướng trang
    let history = useHistory();

    // Sử dụng custom hook useFetch để tải dữ liệu từ API
    // Dùng biến id từ useParams để xây dựng URL của API
    const { data: dataBlogs, isLoading, isError } =
        useFetch(`https://jsonplaceholder.typicode.com/posts`, false);


    useEffect(() => {
        if (dataBlogs && dataBlogs.length > 0) {
            let data = dataBlogs.slice(0, 9);
            setNewData(data);
        }
    }, [dataBlogs]);

    // Hàm xử lý sự kiện khi người dùng nhấn nút quay lại
    const handleAddNew = (blog) => {
        // history.push("/blog"); // Điều hướng đến đường dẫn "/blog"

        let data = newData;
        newData.unshift(blog);

        setShow(false);
        setNewData(data);
        // console.log('>>> check handle add new data bigs: ', newData)
    }

    const deletePost = (id) => {
        let data = newData;
        data = data.filter(item => item.id !== id)
    }

    // Trả về JSX (giao diện) của component
    return (
        <>


            <Button variant="primary" className="my-3" onClick={handleShow}>
                + Add New Blog
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>

                    <Modal.Title>Add New Blog</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <AddNewBlog handleAddNew={handleAddNew} />

                </Modal.Body>


            </Modal>


            <div className="blogs-container">

                {isLoading === false && newData && newData.length > 0 && newData.map(item => {
                    return (
                        <div className="single-blog" key={item.id}>
                            <div className="title">

                                <span>{item.title}</span>
                                <span onClick={() => deletePost(item.id)}>X</span>

                            </div>

                            <div className="content">{item.body}</div>

                            <button>
                                <Link to={`/blog/${item.id}`}>View Detail</Link>
                            </button>
                        </div>


                    )
                })

                }

            </div>
        </>
    )
}

// Xuất component DetailBlog để sử dụng ở các thành phần khác
export default Blog;


