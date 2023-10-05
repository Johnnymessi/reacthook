import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";


//componentDidMount
const Covid = () => {

  // Lấy data người dùng

  // Khai báo một biến state có tên là "dataCovid" và một hàm để cập nhật giá trị của nó là "setDataCovid".
  const [dataCovid, setDataCovid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Sử dụng useEffect để thực hiện các công việc phụ thuộc vào dữ liệu từ xa sau khi component được render lần đầu.
  useEffect(async () => {

    try {
      // Sử dụng thư viện Axios để gửi yêu cầu HTTP GET đến URL 'https://api.covidtracking.com/v1/us/daily.json'.
      let res = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

      // Ghi log ra console để kiểm tra kết quả của yêu cầu HTTP.
      console.log('>> check res: ', res);

      // Gán dữ liệu nhận được từ yêu cầu HTTP vào biến "data", nếu không có dữ liệu thì mặc định là một mảng rỗng.
      let data = res && res.data ? res.data : []; // true,false 

      // Cách viết dài:
      // let data = null;
      // if (res && res.data) { data = res.data } else { data = [] }

      // Nếu có dữ liệu và mảng "data" không rỗng, tiến hành xử lý dữ liệu.
      if (data && data.length > 0) {
        // Sử dụng phương thức "map" để duyệt qua từng phần tử trong mảng "data".
        data.map(item => {
          // Chuyển đổi định dạng ngày tháng từ 'YYYY/MM/DD' thành 'DD/MM/YYYY' bằng thư viện Moment.js.
          item.date = moment(item.date, 'YYYY/MM/DD').format('DD/MM/YYYY');
          return item;
        });

        //reverse: đảo ngược
        data = data.reverse()
      }

      // Cập nhật giá trị của "dataCovid" với dữ liệu đã được xử lý.
      setDataCovid(data);
      setIsLoading(false);
      setIsError(false);

    } catch (e) {
      setIsError(true);
      setIsLoading(false);

    }



  }, []);


  return (
    <table>

      {console.log('>>> check data covid: '.dataCovid)}
      <thead>

        <tr>
          <th>Date</th>
          <th>States</th>
          <th>Positive</th>
          <th>Death</th>
        </tr>

      </thead>

      <tbody>
        {isError === false && isLoading === false && dataCovid && dataCovid.length > 0 &&
          dataCovid.map(item => {
            return (
              <tr key={item.ID}>

                <td>{item.date}</td>
                <td>{item.states}</td>
                <td>{item.positive}</td>
                <td>{item.death}</td>

              </tr>
            )
          })
        }

        {isLoading === true &&

          <tr>
            <td colspan="5" style={{ 'textAlign': 'center' }}>Loading...</td>
          </tr>

        }

        {isError === true &&

          <tr>
            <td colspan="5" style={{ 'textAlign': 'center' }}>Something wrong....</td>
          </tr>

        }


      </tbody>

    </table>
  )
}

export default Covid;