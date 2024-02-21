import { useContext, useEffect } from "react"
import { GLobalContext } from "../../context"
import axios from 'axios'
import classes from './styles.module.css'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const {blogList, setBlogList, pending, setPending} = useContext(GLobalContext);
    const navigate = useNavigate()

    async function fetchListOfBlogs(){
        setPending(true);
        const res = await axios.get('http://localhost:5000/api/blogs');
        const result = await res.data;

        if(result && result.blogList && result.blogList.length){
            setBlogList(result.blogList);
        }else{
            setBlogList([]);
        }

        setPending(false);
    }

    async function handleDeleteBlog(getCurrId){
        const res = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrId}`);
        const result = await res.data;

        if(result?.message){
            fetchListOfBlogs()
        }
    }

    function handleEditBlog(getCurrBlogItem){
        navigate('/add-blog', {state: {getCurrBlogItem}})
    }

    useEffect(() => {
        fetchListOfBlogs()
    }, [])
    
    return (
        <div className={classes.wrapper}>
            <h1>Blog List</h1>
            {
                pending ? <h1>LoadingBlogs !</h1>
                : (
                    <div className={classes.blogList}>
                        {   blogList && blogList.length
                            ? blogList.map(blogItem => (
                                <div key={blogItem._id}>
                                    <p>{blogItem.title}</p>
                                    <p>{blogItem.description}</p>
                                    <FaEdit onClick={() => handleEditBlog(blogItem)} size={20}/>
                                    <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={20}/>
                                </div>
                            ))
                            : <h3>No Blogs Added</h3>
                        }
                    </div>
                )
            }
        </div>
    )
}
