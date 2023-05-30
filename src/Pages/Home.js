import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();
    
    React.useEffect(() => {
        
    
    }, [])
    
    return(
        <>

            <div>
                <Header />
                <h1>Hello welcome to Student Trax,</h1>
                
                <p>Welcome to Student Tracker, your ultimate resource for efficient student tracking and management! We understand the challenges educators and administrators face when it comes to monitoring student progress, attendance, and performance. With our cutting-edge technology and comprehensive tracking solutions, we aim to streamline the process, enhance communication, and empower educational institutions to make informed decisions.

In today's fast-paced educational landscape, it is crucial to have accurate and real-time insights into student data. Whether you are a school administrator, teacher, or parent, our platform offers a user-friendly interface and robust features to track and monitor student information seamlessly. By leveraging advanced analytics and customizable dashboards, Student Tracker provides a comprehensive overview of student performance, attendance records, behavior patterns, and academic achievements.

Gone are the days of sifting through stacks of paperwork and relying on manual record-keeping. With Student Tracker, you can say goodbye to cumbersome spreadsheets and hello to a streamlined digital solution. Our platform not only simplifies administrative tasks but also fosters collaboration among teachers, parents, and students. By promoting transparency and accountability, we help create a supportive educational ecosystem that facilitates student success.

At Student Tracker, we prioritize data security and privacy. We understand the sensitive nature of student information and adhere to strict protocols to safeguard confidentiality. Our state-of-the-art infrastructure and encryption methods ensure that your data remains protected at all times, giving you peace of mind.

Whether you are an educational institution looking to optimize your student tracking systems or a parent eager to stay connected with your child's academic journey, Student Tracker is here to assist you every step of the way. Join us in revolutionizing the way we track and support student progress, fostering a brighter future for all learners. Explore our website and discover the power of efficient student tracking today!</p>
                <div>
        			<button onClick={() => navigate("/login")}>Login</button>
        		</div>
            </div>

        </>
    )
}
 
export default Home;