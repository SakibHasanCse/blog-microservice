import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import Comments from './Comments'
import CommentsList from './GetComment'

export default  () => {

    const [posts ,setPosts] = useState({})
    const fatchPosts = async ()=>{ 
        await axios.get('http://localhost:4000/posts').then(result => {
            setPosts(result.data)
          
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fatchPosts ()

    },[])
    

    const renderPosts = Object.values(posts).map(post =>{
       
        return (
            <div className="card" style={{width:'30%' , marginBottom:'20px'}}  key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <p>{post.id}</p>
                    <CommentsList postsId={post.id}/>
                    <Comments postsId={post.id} />
                </div>
            </div>
        ) ;
    
    })

    return  <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
    </div>
}