import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../customize/fetch";
import './Blog.scss'

const DetailBlog = () => {
    // Sử dụng hook useParams để trích xuất tham số 'id' từ URL
    let { id } = useParams();

    // Sử dụng hook useHistory để truy cập đối tượng history, cho phép điều hướng trang
    let history = useHistory();


    const { data: dataBlogDetail, isLoading, isError } =
        useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false);


    const handleBackData = () => {
        history.push("/blog")
    }

    return (

        <>
            <div>
                <span onClick={handleBackData}>Click vô đây để quay lại</span>
            </div>

            <div className="blog-detail">
                {dataBlogDetail &&
                    <>
                        <div className="title">
                            Blog ID: {id} ----- {isLoading ? 'Loading data...' : dataBlogDetail.title}
                        </div>


                        <div className="content">
                            {dataBlogDetail.body}

                        </div>

                    </>
                }
            </div>
        </>

    )
}

export default DetailBlog;