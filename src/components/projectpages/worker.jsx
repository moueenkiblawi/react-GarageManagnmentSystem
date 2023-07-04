import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../Layout/partials/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import '../../styles/worker.css'
import SearchIcon from '@mui/icons-material/Search';


function Worker() {

    const [worker,setWorker]=useState([]);
    const[search,setSearch]=useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 8;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = worker.slice(firstIndex, lastIndex);
    const npage = Math.ceil(worker.length / recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
  
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
      useEffect(()=>{
        axios.get('http://localhost:8081/Auth')
    
        .then(res=>{
          if(res.data.Status==="Success"){
    
          }else{
            navigate('/login')
          }
        })
      })


useEffect(()=>{
axios.get('http://localhost:8081/getWorker')
.then(res=>setWorker(res.data.reverse())) 

.catch(err => console.log(err));
},[])


useEffect(() => {
  axios.get(`http://localhost:8081/getWorker`)
  .then((res) => {
    const filteredWorkers = res.data.filter(data => {
      return (
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase()) ||
        data.role.toLowerCase().includes(search.toLowerCase())
              );
    });
    setWorker(filteredWorkers);
  });
}, [search]);




const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deleteWorker/`+id).then(() => {
      setWorker(worker.filter((data) => data.id !== id));
    });
  };


    return (
    <div className='home-sidebar'>
    <Sidebar/> 
<div className="homeContainer ">
    <div className='container'>
        <div  className='shadow' style={{background:"lightgrey"}}>
    <h1 style={{textAlign:"center"}}>Workers</h1>
    </div>


    <div style={{display:"flex",justifyContent:"space-between"}}>

<Link to="/addWorker" className='btn btn-success' style={{marginTop:"70px",width:'200px', marginBottom:"20px"}}>Add +</Link>
 <div>
  <SearchIcon/>
 <input
 style={{marginTop:"70px",width:'200px', marginBottom:"20px",borderRadius:"5rem"}}
   type="text"
   placeholder={"Search worker"}
   value={search}
   onChange={(event) => setSearch(event.target.value)}/>
   </div></div>


 <table className='table'>
            <thead >
            <tr style={{background:"rgb(9, 3, 99)" , color:"white"}} >
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Number</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                records.map((data,i)=>(
                    <tr key={i}  >
                    <td>{
                      <img src={'http://localhost:8081/images/'+data.image} alt='' className='worker-image'/>
                      }</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td>{data.number}</td>
                    <td>
                        <Link  to={"/editWorker/"+data.id} >
                        <button style={{color:"red"}} title='Edit'><EditIcon/></button></Link>
                        
                        <button onClick={() => handleDelete(data.id)} style={{color:"blue"}} title='Delete'><DeleteIcon/></button>
                        {/* <Link  to="" style={{color:"green"}} title='View'><VisibilityIcon/></Link> */}
                        </td></tr>
                    ))
            }
            
            </tbody>
        </table>
        

        <div>
                <ul className="pagination">
                    <li className='page-item'>
                      <a href="#d" onClick={prePage} className='page-link'>Prev</a>

                    </li>
                    {
                      numbers.map((n,i) => (
                        <li className={`page-item ${currentPage ===n ? 'active' : ''}`} key={i}>
                          <a href="#d" className="page-link" onClick={()=> changeCPage(n)}>{n}</a>
                        </li>
                      ))
                    }
                    <li className='page-item'>
                      <a href="#d"  className='page-link' onClick={nextPage}>Next</a>

                    </li>
                </ul>
              </div>
    </div>

</div>



</div>

  )
  function nextPage(){
    if(currentPage !==npage){
      setCurrentPage(currentPage+1);
  }}
  function prePage(){
    if(currentPage >1){
    setCurrentPage(currentPage-1);}
  }
  function changeCPage(i){
    setCurrentPage(i);
  }
}

export default Worker