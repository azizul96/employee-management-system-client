import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import DashboardTitle from "../../../../Components/DashboardTitle/DashboardTitle";


const WorkSheet = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: works =[], refetch} = useQuery({
        queryKey: ['works'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/works`)
            const filterWork = res.data.filter(work => work.email == user.email)
            return filterWork
        }
    })

    const handleWorkSheet = e =>{
        e.preventDefault()
        const form = e.target
        const task = form.task.value
        const hours = form.hours.value 
        const date = form.date.value 
        // console.log(task, hours, date);
        const workInfo = {
            task, 
            hours, 
            date,
            name: user.displayName,
            email: user.email,
            createdAt: new Date().getTime()
        }
        axiosSecure.post('/works', workInfo)
                .then(res => {
                    console.log(res.data);
                if(res.data.insertedId){
                    toast.success('Work data uploaded!');
                    refetch()
                }
            })
    }
    return (
        <>
            <Helmet>
                <title>Work Sheet</title>
            </Helmet>
            <DashboardTitle heading="Work - Sheet"></DashboardTitle>
            <div className="flex flex-col-reverse md:flex-row gap-2">
                <div className="flex-1">
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
                            {
                                works.map(work => <tr key={work._id}>
                                    
                                    
                                    <td className="uppercase">
                                        {work.task}
                                    </td>
                                    <td >
                                        {work.hours}
                                    </td>
                                    <td >
                                        {work.date}
                                    </td>
                                    
                                </tr>)
                            }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                <div className="">
                    <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        
                        <div className="card shrink-0 w-full  shadow-2xl bg-slate-300">
                        <form onSubmit={handleWorkSheet} className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Task</span>
                            </label>
                            <select
                            className="select select-primary w-full"
                            name="task"
                            required 
                            >
                            <option value="" disabled selected>
                                Select
                            </option>
                            <option value="sales">Sales</option>
                            <option value="support">Support</option>
                            <option value="content">Content</option>
                            <option value="paper-work">Paper-Work</option>
                            </select>
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Worked Hours</span>
                            </label>
                            <input type="number" name="hours" placeholder="Hours" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" placeholder="Date" className="input input-bordered" required />
                            
                            </div>
                            <div className="form-control mt-6">
                            <button className="btn btn-success text-white">Add</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkSheet;