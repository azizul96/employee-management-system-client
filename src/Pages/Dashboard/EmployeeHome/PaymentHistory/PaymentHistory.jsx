import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import DashboardTitle from "../../../../Components/DashboardTitle/DashboardTitle";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments =[], } = useQuery({
        queryKey: ['payments'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments`)
            const filterPayment = res.data.filter(payment => payment.email == user.email)
            
            const monthMap = {
                January: 1,
                February: 2,
                March: 3,
                April: 4,
                May: 5,
                June: 6,
                July: 7,
                August: 8,
                September: 9,
                October: 10,
                November: 11,
                December: 12,
            };
            const sortedPayments = filterPayment.sort((a, b) => {
                const monthA = monthMap[a.month];
                const monthB = monthMap[b.month];

                return monthA - monthB;
            });

            return sortedPayments;
        }
    })

  return (
    <div>
      <Helmet>
        <title>Payment-History</title>
      </Helmet>
      <DashboardTitle heading="Payment-History"></DashboardTitle>
      <div className="overflow-x-auto rounded-md">
        <table className="table ">
          {/* head */}
          <thead className="bg-orange-300">
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.month}</td>
                <td>${payment.salary}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
