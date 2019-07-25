const Post = require('../models/Post');
const Author = require('../models/Author');

//Post Controller
module.exports = {
    index:async (req,res)=>{
    	try{
    		let posts = await Post.find().populate('author');
        	res.status(200).json(posts);
    	}
    	catch(error){
        	res.status(400).json({message:"Could not fetch posts"});
    	}

    },
    store:(req,res)=>{
    	let { title,description,category,author,body } = req.body;
    	if(title && description && category && author && body){

    		const post = new Post({
    			title:title,
    			description:description,
    			category:category,
				author:author,
				body:body
    		});

    		post.save()
    			.then(async postdoc =>{
					try{
						await Author.findByIdAndUpdate(postdoc.author,{
							$push:{posts:postdoc._id}
						})
						
					}catch(error){
						res.status(400).json({message:"Could not save post"});
					}

    				res.status(200).json({
    					message:"success"
    				});
    			}, error =>{
    				res.status(400).json({
    					message:"failed"
    				});
    			})
			

    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    show:async (req,res)=>{
    	let { id } = req.params;
    	if(id){
    			try{
    				let post = await Post.findById(id);
    		    	res.status(200).json(post);
    			}
    			catch(error){
    		    	res.status(400).json({message:"Could not fetch user"});
    			}
    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    update:async (req,res)=>{
    	let { id } = req.params;
    	let { title,description,category,author,body } = req.body;
    	
    	if(id){
    		if(title && description && category && author && body){
    				try{
    					let post = await Post.findByIdAndUpdate(id,{
    						$set:{
								title:title,
								description:description,
								category:category,
								author:author,
								body:body
    						}
    					});
    					if(post){
    			    		res.status(200).json({message:"Post Updated",post:post});
    					} else {
    						res.status(422).json({
    							message:"Post not found"
    						});
    					}
    				}
    				catch(error){
    			    	res.status(400).json({message:"Could not update post"});
    				}
    		} else {
    			res.status(422).json({
    				message:"invalid inputs"
    			});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}

    },
    delete:async (req,res)=>{
    	let { id } = req.params;
    	if(id){
    		try{
    			let post = await Post.findByIdAndDelete(id);
    			if(post){
    				res.status(200).json({message:"Post Deleted",post:post});
    			} else {
    				res.status(422).json({
    					message:"Post not found"
    				});
    			}
    			
    		}
    		catch(error){
				res.status(400).json({message:"Could not delete post"});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}
    }
    
};