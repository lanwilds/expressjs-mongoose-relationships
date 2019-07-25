const Ebook = require('../models/Ebook');
const Author = require('../models/Author');

//Ebook Controller
module.exports = {
    index:async (req,res)=>{
    	try{
    		let ebooks = await Ebook.find().populate('author');
        	res.status(200).json(ebooks);
    	}
    	catch(error){
        	res.status(400).json({message:"Could not fetch ebooks"});
    	}

    },
    store:(req,res)=>{
    	let { title,category,source,author } = req.body;
    	if(title && category && source && Array.isArray(author)){

    		const ebook = new Ebook({
    			title:title,
    			category:category,
    			source:source,
    			author:author
    		});

    		ebook.save()
    			.then(async ebookdoc =>{
					try{
						await Author.findByIdAndUpdate(ebookdoc.author,{
							$push:{ebooks:ebookdoc._id}
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
    				let ebook = await Ebook.findById(id);
    		    	res.status(200).json(ebook);
    			}
    			catch(error){
    		    	res.status(400).json({message:"Could not fetch ebook"});
    			}
    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    update:async (req,res)=>{
    	let { id } = req.params;
		let { title,category,source,author } = req.body;
    	
    	if(id){
    		if(title && category && source && author){
    				try{
    					let ebook = await Ebook.findByIdAndUpdate(id,{
    						$set:{
								title:title,
								category:category,
								source:source,
								author:author
    						}
    					});
    					if(ebook){
    			    		res.status(200).json({message:"ebook Updated",ebook:ebook});
    					} else {
    						res.status(422).json({
    							message:"ebook not found"
    						});
    					}
    				}
    				catch(error){
    			    	res.status(400).json({message:"Could not update ebook"});
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
    			let ebook = await Ebook.findByIdAndDelete(id);
    			if(user){
    				res.status(200).json({message:"Ebook Deleted",ebook:ebook});
    			} else {
    				res.status(422).json({
    					message:"Ebook not found"
    				});
    			}
    			
    		}
    		catch(error){
				res.status(400).json({message:"Could not delete ebook"});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}
    }
    
};