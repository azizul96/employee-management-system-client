import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import image1 from '../../../assets/p1.webp'
import image2 from '../../../assets/p2.jpg'


const Portfolio = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <SectionTitle heading="Our Portfolio"></SectionTitle>
            <div className="container mb-20 mx-auto">
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">
                    <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage: `url(${image1})`}}>
                        <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                            <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Salary and Benefits</h2>
                            <p className="mt-2 text-md tracking-wider text-[#fb8500] font-semibold">Manage employee salaries, bonuses, and benefits.</p>
                        </div>
                    </div>

                    <div className="flex items-end overflow-hidden bg-cover rounded-lg h-96" style={{backgroundImage: `url(${image2})`}}>
                        <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 ">
                            <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">Employee Profiles</h2>
                            <p className="mt-2 text-md tracking-wider text-[#fb8500] font-semibold">Allow employees to create and manage their profiles.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Portfolio;