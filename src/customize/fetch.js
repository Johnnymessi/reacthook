import { useEffect, useState } from "react"; // Add this line to import useState

import axios from "axios";
import moment from "moment/moment";

// Rest of your code...


//bắt buộc phải có useFetch đầu tiên để bắt đầu custom Hook
const useFetch = (url, isCovidData) => {
    // Lấy data người dùng

    // Khai báo một biến state có tên là "dataCovid" và một hàm để cập nhật giá trị của nó là "setDataCovid".
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Sử dụng useEffect để thực hiện các công việc phụ thuộc vào dữ liệu từ xa sau khi component được render lần đầu.
    useEffect(() => {

        // how to cancel abort ajax request in axios(cách hủy bỏ yêu cầu ajax trong axios)
        // Tài liệu tham khảm: 'https://stackoverflow.com/questions/38329209/how-to-cancel-abort-ajax-request-in-axios'

        const ourRequest = axios.CancelToken.source() // <-- 1st step



        async function fetchData() {
            try {
                // Sử dụng thư viện Axios để gửi yêu cầu HTTP GET đến URL 'https://api.covidtracking.com/v1/us/daily.json'.
                let res = await axios.get(url, {

                    cancelToken: ourRequest.token, // <-- 2st step

                });

                // Ghi log ra console để kiểm tra kết quả của yêu cầu HTTP.
                // console.log('>> check res: ', res);

                // Gán dữ liệu nhận được từ yêu cầu HTTP vào biến "data", nếu không có dữ liệu thì mặc định là một mảng rỗng.
                let data = res && res.data ? res.data : []; // true,false 

                // Cách viết dài:
                // let data = null;
                // if (res && res.data) { data = res.data } else { data = [] }

                // Nếu có dữ liệu và mảng "data" không rỗng, tiến hành xử lý dữ liệu.
                if (data && data.length > 0 && isCovidData === true) {
                    // Sử dụng phương thức "map" để duyệt qua từng phần tử trong mảng "data".
                    data.map(item => {
                        // Chuyển đổi định dạng ngày tháng từ 'YYYY/MM/DD' thành 'DD/MM/YYYY' bằng thư viện Moment.js.
                        item.date = moment(item.date, 'YYYY/MM/DD').format('DD/MM/YYYY');
                        return item;
                    });

                    //reverse: đảo ngược
                    // data = data.reverse()
                }

                // Cập nhật giá trị của "dataCovid" với dữ liệu đã được xử lý.
                setData(data);
                setIsLoading(false);
                setIsError(false);
            }
            catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }


            }

        }

        setTimeout(() => {
            fetchData();
        }, 2000);
        // fetchData();



        return () => {
            ourRequest.cancel('Operation canceled by the user') //<-- 3rd step
        }

    }, [url]);

    return {
        data, isLoading, isError
    }
}

export default useFetch;