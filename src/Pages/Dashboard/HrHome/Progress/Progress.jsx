import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import DashboardTitle from "../../../../Components/DashboardTitle/DashboardTitle";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const Progress = () => {
    
    const axiosSecure = useAxiosSecure()


  const { data: allWorks = [],  } = useQuery({
    queryKey: ["works"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works`);
      console.log(res.data);
      return res.data;
    },
  });
  const [selectedName, setSelectedName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredWorks = allWorks.filter((work) => {
    return (
      (!selectedName || work.name === selectedName) &&
      (!selectedMonth || new Date(work.date).getMonth() + 1 === parseInt(selectedMonth))
    );
  });

  return (
    <div>
        <Helmet>
            <title>Progress</title>
        </Helmet>
        <DashboardTitle heading="Progress"></DashboardTitle>
        <div className=" flex flex-col sm:flex-row mb-5 gap-5 px-2">
            <div className="w-full">
                <select onChange={handleNameChange}  className="select select-warning w-full">
                    <option disabled selected>Pick a Name</option>
                    <option>Rayan</option>
                    <option>Lucas</option>
                    <option>Devid</option>
                    <option>Jhon</option>
                    <option>Rashid</option>
                </select>
            </div>
            <div className="w-full">
                <select onChange={handleMonthChange} className="select select-warning w-full">
                    <option value="" disabled selected>Pick a Month</option>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                </select>
            </div>
        </div>
        <div className="overflow-x-auto rounded-md">
            <table className="table ">
            {/* head */}
            <thead className="bg-orange-300">
                <tr>
                <th>Task</th>
                <th>Worked Hours</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {filteredWorks.map((work) => ( <tr key={work._id}>
                    <td className=" uppercase">{work.task}</td>
                    <td>{work.hours}</td>
                    <td>{work.date}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
};

export default Progress;
