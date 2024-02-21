const mongoose = require('mongoose');
const Blog = require('../model/Blog');

//fetch list of blogs
//add a new blog
//delete a blog
//update a blog

const fetchListOfBlogs = async(req,res)=> {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (error) {
        console.log(error);
    }

    if(!blogList){
        return res.status(404).json({message: "No blogs found"})
    }

    return res.status(200).json({blogList});
}

const addNewBlog = async(req,res)=> {
    const {title, description} = req.body;
    const currentDate = new Date();

    const newlyCreateBlog = new Blog({
        title, description, date : currentDate
    })

    try {
        await newlyCreateBlog.save();
    } catch (error) {
        console.log(error);
    }

    try {
        const session= await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session);
        session.commitTransaction();
    } catch (error) {
        return res.send(500).json({message: e})
    }

    return res.status(200).json({newlyCreateBlog})
}

const deleteBlog = async(req,res)=> {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if(!findCurrentBlog) return res.status(404).json({message: 'Blog not found'});

        return res.status(200).json({message: 'Successfully Deleted'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Unable to delete !'})
    }
}

const updateBlog = async(req,res)=> {
    const id = req.params.id;
    const {title, description} = req.body;
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {title: title, description: description});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong white updating !'})
    }

    if(!currentBlogToUpdate) {
        return res.status(500).json({message: 'Unable to update'})
    }

    return res.status(200).json({currentBlogToUpdate})
}

module.exports = {
    fetchListOfBlogs,
    deleteBlog,
    updateBlog,
    addNewBlog
}