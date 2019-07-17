const express= require ('express');
const router= express.Router();
const pool= require('../database')

router.get('/add', (req,res) => {
res.render('links/add');
});

router.post('/add', async (req,res) => {
    const {title,url,description}=req.body;
    const newLink={
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success', 'The new link has been added');
    res.redirect('/links');
  
    });

 router.get('/', async (req,res) => {
     const links = await pool.query('SELECT * FROM links');      
     console.log(links);
     req.flash('success', 'The new link has been added');
     res.render('links/list',{links});
         });


router.get('/delete/:id',async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID=?', [id]);
    req.flash('success', 'The new link has been removed');
    res.redirect('/links'); 
});

router.get('/edit/:id',async (req,res) => {
    const {id} = req.params;
    const links= await pool.query('SELECT * FROM links WHERE id=?', [id]);
    
    res.render('links/edit', {link:links[0]}); 
    });

    router.post('/edit/:id',async (req,res) => {
        const {id}= req.params;
        const {title,url,description} = req.body;
        const newLink={
            title,
            url,
            description
        };
        console.log(newLink)
       await pool.query('UPDATE links set ? WHERE id=?', [newLink, id]);
       req.flash('success', 'The new link has been updated');
        res.redirect('/links'); 
        });


module.exports=router;



