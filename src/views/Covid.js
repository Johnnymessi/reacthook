import { useEffect, useState } from "react";

import useFetch from "../customize/fetch";


//componentDidMount
const Covid = () => {



  // Lấy data người dùng

  // Khai báo một biến state có tên là "dataCovid" và một hàm để cập nhật giá trị của nó là "setDataCovid".
  // const [dataCovid, setDataCovid] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  // const today = new DataTransfer(new Date().setHours(0, 0, 0, 0));
  // const priorDate = moment().subtract(30, 'days')

  const { data: dataCovid, isLoading, isError }
    = useFetch('https://api.covidtracking.com/v1/us/daily.json')


  // let dataCovid = useFetch(url).data


  return (
    <>
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
              <td colspan="5" style={{ 'textAlign': 'center', 'color': 'green' }}>Loading...</td>
            </tr>

          }

          {isError === true &&

            <tr>
              <td colspan="5" style={{ 'textAlign': 'center' }}>Something wrong....</td>
            </tr>

          }


        </tbody>

      </table>
    </>

  )
}

export default Covid;