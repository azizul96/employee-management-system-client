import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import DashboardTitle from "../../../../Components/DashboardTitle/DashboardTitle";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];

const EmployeeDetails = () => {
    const {id} = useParams()
    console.log(id);
    const axiosSecure = useAxiosSecure()
    const {data: user = {}, } = useQuery({
        queryKey: ['users'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`users/${id}`)
            console.log(res.data);
            return res.data
        }
    })
    const {data: chartData = [], } = useQuery({
        queryKey: ['payments'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/payments')
            // console.log(res.data);
            // return res.data 
            const items = res.data.map((payment) => ({
            salary: `${payment.month} ${payment.year}`,
            month: parseInt(payment.salary),
            }));
            console.log(items);
            return items
        }
    })
    

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}L${x + width},${y + height}L${x + width},${y}L${x},${y}Z`;
      };
      
      const RectangleBar = props => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    return (
        <div>
            <DashboardTitle heading="Details"></DashboardTitle>
            <div className="w-full  px-8 py-4 mt-16 rounded-lg shadow-lg dark:bg-gray-800 mx-auto bg-orange-200">
                <div className="flex justify-center -mt-16 md:justify-start">
                    <img className="object-cover w-20 h-20 border-2 border-[#8a50fb] rounded-full "src={user.image} alt="avatar" />
                </div>

                <h2 className="mt-2 text-xl text-end font-semibold text-gray-800 dark:text-white md:mt-0">{user.name}</h2>

                <div className="flex justify-start mt-4">
                    <p className="font-bold uppercase">{user.designation }</p>
                </div>
            </div>
            <div className="my-5">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={400}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="salary" />
                    <YAxis />
                    <Bar dataKey="month" fill="#8884d8" shape={<RectangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                        ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EmployeeDetails;