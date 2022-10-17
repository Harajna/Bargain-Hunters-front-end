import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getUsersDatesAction } from "../../redux/actions/users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const Chart = ({ aspect, title }) => {
  const dispatch = useDispatch();
  const dates = useSelector(state => state.users.dates);
  let data = [];
  console.log(dates)
  dates && dates.map(user => {
    let date = user.createdAt.split("T")[0];
    const index = data.findIndex(u => u.name == date)
    if (index == -1) {
      data.push({ name: date, Total: 1 })
    }
    else data[index].Total++;
  })

  useEffect(() => {
    const fetchDates = async () => {
      await dispatch(getUsersDatesAction())
    }
    fetchDates();
  }, []);


  return (
    <div className="chart">
      <div className="title text-center">{title}</div>
      <div className="d-flex justify-content-center align-items-center">
        {dates &&
          <ResponsiveContainer width="70%" aspect={aspect}>
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="gray" />
              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Total"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#total)"
              />
            </AreaChart>
          </ResponsiveContainer>
        }
      </div>
    </div>
  );
};

export default Chart;
