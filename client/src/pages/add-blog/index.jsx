import { useContext, useEffect } from 'react';
import classes from './styles.module.css';
import { GLobalContext } from '../../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddNewBlog() {
    const {formData, setFormData, setIsEdit, isEdit} = useContext(GLobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSaveBlogToDatabase(){
        let res = null;

        if(isEdit){
            res = await axios.put(`http://localhost:5000/api/blogs/update/${location.state.getCurrBlogItem._id}`, {
                title: formData.title,
                description: formData.description
            })
        }else{
            res = await axios.post('http://localhost:5000/api/blogs/add', {
                title: formData.title,
                description: formData.description
            })
        }

        const result = await res.data;
        
        if(result){
            setIsEdit(false)
            setFormData({
                title: '',
                description: ''
            });
            
            navigate('/');
        }
    }

    useEffect(() => {
        if(location.state){
            setIsEdit(true);
            
            const {getCurrBlogItem} = location.state;
            setFormData({
                title: getCurrBlogItem.title,
                description: getCurrBlogItem.description
            })
        }
    }, [location])

    return (
        <div className={classes.wrapper}>
            <h1>{isEdit ? 'Edit a blog' : 'Add a Blog'}</h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Blog Title'
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={((e) => setFormData({
                        ...formData,
                        title: e.target.value
                    }))}
                />
                <textarea
                    name='description'
                    placeholder='Enter Blog Description'
                    id='description'
                    value={formData.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                    })}
                />
                <button onClick={handleSaveBlogToDatabase}>
                    {
                        isEdit ? 'Edit Blog' : 'Add Blog'
                    }
                </button>
            </div>
        </div>
    )
}
