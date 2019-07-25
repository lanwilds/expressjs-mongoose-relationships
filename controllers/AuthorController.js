const Author = require('../models/Author');

//Author Controller
module.exports = {
    index:async (req,res)=>{
    	try{
    		let authors = await Author.find();
        	res.status(200).json(authors);
    	}
    	catch(error){
        	res.status(400).json({message:"Could not fetch authors"});
    	}

    },
    store:(req,res)=>{
    	let { name,email } = req.body;
    	if(name && email){

    		const author = new Author({
    			name:name,
    			email:email
    		});

    		author.save()
    			.then(authordoc =>{
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
    				let author = await Author.findById(id);
    		    	res.status(200).json(author);
    			}
    			catch(error){
    		    	res.status(400).json({message:"Could not fetch author"});
    			}
    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    update:async (req,res)=>{
    	let { id } = req.params;
    	let { name,email } = req.body;
    	if(id){
    		if(name && email){
    				try{
    					let author = await Author.findByIdAndUpdate(id,{
    						$set:{
    							name:name,
    							email:email
    						}
    					});
    					if(author){
    			    		res.status(200).json({message:"Author Updated",author:author});
    					} else {
    						res.status(422).json({
    							message:"Author not found"
    						});
    					}
    				}
    				catch(error){
    			    	res.status(400).json({message:"Could not update author"});
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
    			let author = await Author.findByIdAndDelete(id);
    			if(user){
    				res.status(200).json({message:"Author Deleted",author:author});
    			} else {
    				res.status(422).json({
    					message:"Author not found"
    				});
    			}
    			
    		}
    		catch(error){
				res.status(400).json({message:"Could not delete author"});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}
    }
    
};